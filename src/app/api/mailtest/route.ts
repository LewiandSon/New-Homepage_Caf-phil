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

  const started = Date.now();
  const res = await sendMail({
    to: "info@phil.info",
    subject: "phil Mailtest (live) – bitte ignorieren",
    html: "<p>Live-Mailtest direkt von Vercel. Wenn diese Mail ankommt, funktioniert der Gmail-Versand auf dem Server.</p>",
  });
  return NextResponse.json({
    ok: res.ok,
    error: res.error ?? null,
    ms: Date.now() - started,
    hasUser: !!process.env.GMAIL_USER,
    hasPass: !!process.env.GMAIL_APP_PASSWORD,
  });
}
