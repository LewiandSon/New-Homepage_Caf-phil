import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// Versand über das Gmail/Workspace-Konto info@phil.info (App-Passwort).
// Mails kommen damit von der echten Adresse → beste Zustellbarkeit.

const SMTP = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
};

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    // Serverless-tauglich: kein Pool, mit Timeouts statt ewigem Hängen.
    transporter = nodemailer.createTransport({ ...SMTP, socketTimeout: 20000 });
  }
  return transporter;
}

const FROM_ADDRESS = process.env.GMAIL_USER ?? "info@phil.info";
export const MAIL_FROM = `phil Café <${FROM_ADDRESS}>`;

/** Sendet eine Mail über Gmail. Wirft nicht – gibt { ok, error } zurück. */
export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    await getTransporter().sendMail({
      from: MAIL_FROM,
      to: opts.to,
      replyTo: opts.replyTo ?? FROM_ADDRESS,
      subject: opts.subject,
      html: opts.html,
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export type BulkResult = { to: string; ok: boolean; skipped?: boolean; error?: string };

const BULK_CONNECTIONS = 4;

/** Massenversand (z.B. Absagen) über EINE wiederverwendete Gmail-Verbindung –
 *  ein Vielfaches schneller als sendMail() pro Empfänger, wichtig wegen des
 *  60-s-Limits auf Vercel. Nach `budgetMs` werden keine neuen Mails mehr
 *  begonnen; diese kommen als `skipped` zurück und können später nachgesendet
 *  werden. Wirft nicht. */
export async function sendMailBulk(
  messages: { to: string; subject: string; html: string }[],
  budgetMs: number,
): Promise<BulkResult[]> {
  // 4 parallele Verbindungen: gemessen ~0,55 s pro Mail (einzeln ~2 s).
  // Bewusst KEIN rateLimit – nodemailers Drossel hat im Test auf ~1,8 s/Mail gebremst.
  const pool = nodemailer.createTransport({
    ...SMTP,
    socketTimeout: 15000,
    pool: true,
    maxConnections: BULK_CONNECTIONS,
  });
  const deadline = Date.now() + budgetMs;
  const results: BulkResult[] = new Array(messages.length);
  let next = 0;

  async function worker() {
    while (next < messages.length) {
      const i = next++;
      const m = messages[i];
      if (Date.now() >= deadline) {
        results[i] = { to: m.to, ok: false, skipped: true };
        continue;
      }
      try {
        await pool.sendMail({ from: MAIL_FROM, to: m.to, replyTo: FROM_ADDRESS, subject: m.subject, html: m.html });
        results[i] = { to: m.to, ok: true };
      } catch (e) {
        results[i] = { to: m.to, ok: false, error: e instanceof Error ? e.message : String(e) };
      }
    }
  }

  try {
    await Promise.all(Array.from({ length: Math.min(BULK_CONNECTIONS, messages.length) }, worker));
  } finally {
    pool.close();
  }
  return results;
}
