import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendMail } from "@/lib/mailer";

export const maxDuration = 30;

// Zugangscode wie bei /api/absage (aus vorhandenem Secret abgeleitet).
function keyOk(key: string | null): boolean {
  if (!key) return false;
  const base = process.env.RESEND_API_KEY || process.env.GOOGLE_SHEET_ID || "";
  const exp = crypto.createHash("sha256").update("phil-absage-v1:" + base).digest("hex").slice(0, 20);
  return key.length === exp.length && crypto.timingSafeEqual(Buffer.from(key), Buffer.from(exp));
}

// Diagnose: versucht einen echten Gmail-Versand und gibt das Ergebnis zurück.
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (!keyOk(key)) return NextResponse.json({ status: "unauthorized" }, { status: 401 });

  // Diagnose: welche relevanten Env-Variablen sind überhaupt vorhanden (nur Namen)?
  const envKeys = Object.keys(process.env)
    .filter((k) => /^(GMAIL|RESEND|GOOGLE|NEXT_PUBLIC_SANITY|ABSAGE)/.test(k))
    .sort();

  const doSend = req.nextUrl.searchParams.get("send") === "1";
  let sendResult: { ok: boolean; error: string | null } | null = null;
  if (doSend) {
    const res = await sendMail({
      to: "info@phil.info",
      subject: "phil Mailtest (live) – bitte ignorieren",
      html: "<p>Live-Mailtest direkt von Vercel. Wenn diese Mail ankommt, funktioniert der Gmail-Versand.</p>",
    });
    sendResult = { ok: res.ok, error: res.error ?? null };
  }

  return NextResponse.json({
    vercelEnv: process.env.VERCEL_ENV ?? null,
    hasGmailUser: !!process.env.GMAIL_USER,
    hasGmailPass: !!process.env.GMAIL_APP_PASSWORD,
    envKeys,
    sendResult,
  });
}
