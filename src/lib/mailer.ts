import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// Versand über das Gmail/Workspace-Konto info@phil.info (App-Passwort).
// Mails kommen damit von der echten Adresse → beste Zustellbarkeit.

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      pool: true,
      maxConnections: 3,
    });
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
