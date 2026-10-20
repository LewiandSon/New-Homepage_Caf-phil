import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { client } from "@/sanity/client";
import {
  readSignupRows,
  getRegistrantsForEvent,
  absageAlreadySent,
  logAbsageSent,
} from "@/lib/eventCapacity";
import { absageGrundText } from "@/lib/absageGruende";

export const maxDuration = 30;

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? "placeholder");

type EventDoc = {
  _id: string;
  title_de: string;
  title_en?: string;
  date: string;
  abgesagtGrund?: string;
  abgesagtGrundFrei?: string;
  abgesagt?: boolean;
};

// Zugangscode wird aus einem ohnehin vorhandenen Server-Secret abgeleitet –
// kein separater Env-Var/Setup nötig, aber trotzdem nicht erratbar.
function expectedKey(): string {
  const base = process.env.RESEND_API_KEY || process.env.GOOGLE_SHEET_ID || "";
  return crypto.createHash("sha256").update("phil-absage-v1:" + base).digest("hex").slice(0, 20);
}

function keyOk(key: string | null): boolean {
  if (!key) return false;
  const exp = expectedKey();
  return key.length === exp.length && crypto.timingSafeEqual(Buffer.from(key), Buffer.from(exp));
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("de-AT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) + " Uhr";
  } catch {
    return iso;
  }
}

function buildEmail(vorname: string, titleDe: string, dateStr: string, gDe: string, gEn: string) {
  const anrede = vorname ? ` ${vorname}` : "";
  const grundDe = gDe ? ` ${gDe}` : "";
  const grundEn = gEn ? ` ${gEn}` : "";
  const subject = `Absage: ${titleDe}`;
  const html = `
    <div style="font-family: Georgia, serif; color: #573B30; max-width: 560px; margin: 0 auto;">
      <div style="background: #D72333; padding: 24px 32px;">
        <h1 style="color: #F9F1DA; font-size: 24px; margin: 0;">phil Café &amp; Buchhandlung</h1>
      </div>
      <div style="background: #F9F1DA; padding: 32px;">
        <p style="font-size: 18px; margin-bottom: 4px;">Liebe/r${anrede},</p>
        <p style="font-size: 16px; line-height: 1.7;">
          leider müssen wir die Veranstaltung <strong>„${titleDe}"</strong> am <strong>${dateStr}</strong>${grundDe} absagen.
          Das tut uns sehr leid. Wir hoffen, sie zu einem späteren Zeitpunkt nachzuholen, und informieren dich rechtzeitig.
        </p>
        <p style="font-size: 16px; line-height: 1.7;">
          Du musst nichts weiter tun – deine Anmeldung ist damit hinfällig. Danke für dein Verständnis, und bis bald im phil!
        </p>
        <p style="font-size: 16px; line-height: 1.6;">Herzliche Grüße,<br/><strong>Dein phil-Team</strong></p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 32px 0;" />

        <p style="font-size: 18px; margin-bottom: 4px;">Dear${anrede},</p>
        <p style="font-size: 16px; line-height: 1.7;">
          unfortunately we have to cancel <strong>${titleDe}</strong> on <strong>${dateStr}</strong>${grundEn}.
          We're very sorry and hope to reschedule — we'll let you know in good time.
        </p>
        <p style="font-size: 16px; line-height: 1.7;">
          There's nothing you need to do; your registration is now void. Thank you for your understanding, and see you soon at phil!
        </p>
        <p style="font-size: 16px; line-height: 1.6;">Warm regards,<br/><strong>Your phil team</strong></p>

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 13px; color: #888; line-height: 1.8;">
          <strong style="color: #573B30;">phil – Café, Bookshop &amp; Bar</strong><br/>
          Gumpendorfer Straße 10–12, 1060 Wien<br/>
          <a href="mailto:info@phil.info" style="color: #D72333;">info@phil.info</a> &nbsp;|&nbsp;
          <a href="https://www.cafephil.at" style="color: #D72333;">cafephil.at</a>
        </div>
      </div>
    </div>`;
  return { subject, html };
}

// GET ?key=… → Liste der abgesagten Events mit Empfängerzahl + Sendestatus
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (!keyOk(key)) return NextResponse.json({ status: "unauthorized" }, { status: 401 });

  try {
    const events = await client.fetch<EventDoc[]>(
      `*[_type == "event" && abgesagt == true] | order(date desc){ _id, title_de, title_en, date, abgesagtGrund }`,
    );
    const rows = await readSignupRows();
    const list = events.map((e) => {
      const recipients = getRegistrantsForEvent(rows, {
        id: e._id,
        titles: [e.title_de, e.title_en ?? ""],
      });
      return {
        id: e._id,
        title: e.title_de,
        date: fmtDate(e.date),
        grund: absageGrundText(e.abgesagtGrund, e.abgesagtGrundFrei, "de"),
        empfaenger: recipients.length,
        gesendetAm: absageAlreadySent(rows, e._id),
      };
    });
    return NextResponse.json({ status: "ok", events: list });
  } catch (err) {
    console.error("Absage-Liste Fehler:", err);
    return NextResponse.json({ status: "error", message: "Konnte Events nicht laden." }, { status: 500 });
  }
}

// POST { key, eventId, dryRun? } → Absage-Mails verschicken
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    key?: string;
    eventId?: string;
    dryRun?: boolean;
  };
  if (!keyOk(body.key ?? null)) return NextResponse.json({ status: "unauthorized" }, { status: 401 });
  if (!body.eventId) return NextResponse.json({ status: "error", message: "eventId fehlt." }, { status: 400 });

  try {
    const ev = await client.fetch<EventDoc | null>(
      `*[_type == "event" && _id == $id][0]{ _id, title_de, title_en, date, abgesagt, abgesagtGrund }`,
      { id: body.eventId },
    );
    if (!ev) return NextResponse.json({ status: "error", message: "Event nicht gefunden." }, { status: 404 });
    if (!ev.abgesagt)
      return NextResponse.json(
        { status: "error", message: "Event ist nicht als abgesagt markiert." },
        { status: 400 },
      );

    const rows = await readSignupRows();
    const already = absageAlreadySent(rows, ev._id);
    if (already)
      return NextResponse.json({ status: "already_sent", gesendetAm: already });

    const recipients = getRegistrantsForEvent(rows, {
      id: ev._id,
      titles: [ev.title_de, ev.title_en ?? ""],
    });

    if (body.dryRun) {
      return NextResponse.json({
        status: "dry_run",
        empfaenger: recipients.length,
        beispiel: recipients.slice(0, 3).map((r) => r.email.replace(/^(..).*(@.*)$/, "$1***$2")),
      });
    }

    if (recipients.length === 0)
      return NextResponse.json({ status: "ok", sent: 0, failed: 0, message: "Keine Angemeldeten." });

    const resend = getResend();
    const dateStr = fmtDate(ev.date);
    const gDe = absageGrundText(ev.abgesagtGrund, ev.abgesagtGrundFrei, "de");
    const gEn = absageGrundText(ev.abgesagtGrund, ev.abgesagtGrundFrei, "en");
    let sent = 0;
    let failed = 0;
    for (const r of recipients) {
      const { subject, html } = buildEmail(r.vorname, ev.title_de, dateStr, gDe, gEn);
      try {
        const res = await resend.emails.send({
          from: "phil Café <noreply@cafephil.at>",
          to: r.email,
          replyTo: "info@phil.info",
          subject,
          html,
        });
        if (res.error) {
          failed++;
          console.error("Absage-Mail Fehler", r.email, res.error);
        } else {
          sent++;
        }
      } catch (e) {
        failed++;
        console.error("Absage-Mail Ausnahme", r.email, e);
      }
    }

    if (sent > 0) {
      try {
        await logAbsageSent(ev._id, sent);
      } catch (e) {
        console.error("Absage-Log Fehler:", e);
      }
    }

    return NextResponse.json({ status: "ok", sent, failed });
  } catch (err) {
    console.error("Absage-Versand Fehler:", err);
    return NextResponse.json({ status: "error", message: "Versand fehlgeschlagen." }, { status: 500 });
  }
}
