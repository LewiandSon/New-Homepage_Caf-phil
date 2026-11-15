import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { client } from "@/sanity/client";
import {
  readSignupRows,
  getRegistrantsForEvent,
  absageAlreadySent,
  logAbsageSent,
  logAbsageRecipients,
  readAbsageProtokoll,
  notifiedEmails,
} from "@/lib/eventCapacity";
import { absageGrundText } from "@/lib/absageGruende";
import { sendMailBulk } from "@/lib/mailer";

export const maxDuration = 60;

// Zeit, in der neue Mails begonnen werden dürfen. Rest des 60-s-Limits bleibt
// für laufende Mails (Socket-Timeout 15 s) und das Schreiben ins Sheet.
const SEND_BUDGET_MS = 35_000;

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
      timeZone: "Europe/Vienna", // Server läuft in UTC – sonst 2 h zu früh
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
    const protokoll = await readAbsageProtokoll().catch(() => [] as string[][]);
    const now = Date.now();
    const list = events.map((e) => {
      const recipients = getRegistrantsForEvent(rows, {
        id: e._id,
        titles: [e.title_de, e.title_en ?? ""],
      });
      const done = notifiedEmails(protokoll, e.title_de);
      return {
        informiert: recipients.filter((r) => done.has(r.email.toLowerCase())).length,
        id: e._id,
        title: e.title_de,
        date: fmtDate(e.date),
        grund: absageGrundText(e.abgesagtGrund, e.abgesagtGrundFrei, "de"),
        empfaenger: recipients.length,
        gesendetAm: absageAlreadySent(rows, e._id),
        past: new Date(e.date).getTime() < now,
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
    // Schutz: keine Absage-Mails für bereits vergangene Veranstaltungen –
    // das wäre für die Angemeldeten sinnlos und peinlich.
    if (new Date(ev.date).getTime() < Date.now())
      return NextResponse.json(
        { status: "past", message: "Veranstaltung liegt in der Vergangenheit – kein Versand." },
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

    // Wer laut Absage-Protokoll schon eine Absage bekommen hat, wird übersprungen.
    // So kann nach Teilversand oder Fehlern gefahrlos erneut gesendet werden.
    const done = notifiedEmails(await readAbsageProtokoll(), ev.title_de);
    const todo = recipients.filter((r) => !done.has(r.email.toLowerCase()));

    if (body.dryRun) {
      return NextResponse.json({
        status: "dry_run",
        empfaenger: recipients.length,
        offen: todo.length,
        beispiel: todo.slice(0, 3).map((r) => r.email.replace(/^(..).*(@.*)$/, "$1***$2")),
      });
    }

    if (recipients.length === 0)
      return NextResponse.json({ status: "ok", sent: 0, failed: 0, message: "Keine Angemeldeten." });

    const dateStr = fmtDate(ev.date);
    const gDe = absageGrundText(ev.abgesagtGrund, ev.abgesagtGrundFrei, "de");
    const gEn = absageGrundText(ev.abgesagtGrund, ev.abgesagtGrundFrei, "en");
    const bulk = await sendMailBulk(
      todo.map((r) => ({ to: r.email, ...buildEmail(r.vorname, ev.title_de, dateStr, gDe, gEn) })),
      SEND_BUDGET_MS,
    );

    // Übersprungene (Zeitbudget) werden nicht protokolliert – sie bleiben offen.
    const attempted = bulk
      .map((b, i) => ({ name: todo[i].vorname, email: todo[i].email, ok: b.ok, skipped: b.skipped, error: b.error }))
      .filter((r) => !r.skipped);
    for (const r of attempted) if (!r.ok) console.error("Absage-Mail Fehler", r.email, r.error);
    const sent = attempted.filter((r) => r.ok).length;
    const failed = attempted.length - sent;
    const offen = todo.length - sent;

    // Nachweis ins Sheet (Tab „Absage-Protokoll"): eine Zeile pro Empfänger.
    let protokollOk = true;
    try {
      await logAbsageRecipients(ev.title_de, attempted);
    } catch (e) {
      protokollOk = false;
      console.error("Absage-Protokoll Fehler:", e);
    }

    // Der Marker sperrt weiteren Versand: setzen, sobald alle informiert sind –
    // oder wenn das Protokoll nicht geschrieben werden konnte (sonst würde ein
    // erneuter Klick dieselben Leute nochmal anschreiben).
    if (offen === 0 || (!protokollOk && sent > 0)) {
      try {
        await logAbsageSent(ev._id, done.size + sent);
      } catch (e) {
        console.error("Absage-Log Fehler:", e);
      }
    }

    return NextResponse.json({
      status: offen === 0 ? "ok" : "partial",
      sent,
      failed,
      offen,
      ...(protokollOk
        ? {}
        : { warnung: "Protokoll konnte nicht geschrieben werden – Versand gesperrt, um Doppel-Mails zu vermeiden." }),
    });
  } catch (err) {
    console.error("Absage-Versand Fehler:", err);
    return NextResponse.json({ status: "error", message: "Versand fehlgeschlagen." }, { status: 500 });
  }
}
