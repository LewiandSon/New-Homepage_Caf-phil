import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? "placeholder");

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const CAFE_EMAIL = "info@phil.info";

async function appendToGoogleSheet(row: string[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Anmeldungen!A:I",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const eventTitle   = formData.get("eventTitle")?.toString()     ?? "";
    const eventDate    = formData.get("eventDate")?.toString()      ?? "";
    const vorname      = formData.get("vorname")?.toString()        ?? "";
    const nachname     = formData.get("nachname")?.toString()       ?? "";
    const email        = formData.get("email")?.toString()          ?? "";
    const personen     = formData.get("personenanzahl")?.toString() ?? "1";
    const kommentar    = formData.get("kommentar")?.toString()      ?? "";
    const newsletter   = formData.get("newsletter")?.toString()     ?? "Nein";

    if (!email || !vorname || !eventTitle) {
      return NextResponse.json({ status: "error", message: "Pflichtfelder fehlen." }, { status: 400 });
    }

    // 1) Google Sheet speichern
    try {
      await appendToGoogleSheet([
        new Date().toLocaleString("de-AT"),
        eventTitle,
        eventDate,
        vorname,
        nachname,
        email,
        personen,
        kommentar,
        newsletter,
      ]);
    } catch (sheetError) {
      console.error("Google Sheet Fehler:", sheetError);
      // Sheet-Fehler soll die Anmeldung nicht blockieren
    }

    // 2) Bestätigungs-Mail an den Gast (DE + EN)
    await getResend().emails.send({
      from: "phil Café <noreply@cafephil.at>",
      to: email,
      subject: `Anmeldung bestätigt – ${eventTitle} / Registration confirmed – ${eventTitle}`,
      html: `
        <div style="font-family: Georgia, serif; color: #573B30; max-width: 560px; margin: 0 auto;">
          <div style="background: #D72333; padding: 24px 32px;">
            <h1 style="color: #F9F1DA; font-size: 24px; margin: 0;">phil Café &amp; Buchhandlung</h1>
          </div>
          <div style="background: #F9F1DA; padding: 32px;">

            <!-- DEUTSCH -->
            <p style="font-size: 18px; margin-bottom: 4px;">Sehr geehrte/r ${vorname} ${nachname},</p>
            <p style="font-size: 16px; line-height: 1.7;">
              vielen Dank, dass Sie sich für die Veranstaltung <strong>„${eventTitle}"</strong> am <strong>${eventDate}</strong> angemeldet haben. Wir freuen uns sehr auf Ihren Besuch!
            </p>
            <div style="background: #fff; border-left: 4px solid #D72333; padding: 16px 20px; margin: 20px 0;">
              <p style="margin: 0; font-size: 17px; font-weight: bold; color: #D72333;">${eventTitle}</p>
              <p style="margin: 6px 0 0; font-size: 15px;">${eventDate}</p>
              <p style="margin: 4px 0 0; font-size: 15px;">Anzahl Personen: ${personen}</p>
            </div>
            <p style="font-size: 16px; line-height: 1.6;">Mit freundlichen Grüßen,<br/><strong>Das phil-Team</strong></p>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 32px 0;" />

            <!-- ENGLISH -->
            <p style="font-size: 18px; margin-bottom: 4px;">Dear ${vorname} ${nachname},</p>
            <p style="font-size: 16px; line-height: 1.7;">
              thank you for registering for <strong>${eventTitle}</strong> on <strong>${eventDate}</strong>. We very much look forward to welcoming you!
            </p>
            <div style="background: #fff; border-left: 4px solid #D72333; padding: 16px 20px; margin: 20px 0;">
              <p style="margin: 0; font-size: 17px; font-weight: bold; color: #D72333;">${eventTitle}</p>
              <p style="margin: 6px 0 0; font-size: 15px;">${eventDate}</p>
              <p style="margin: 4px 0 0; font-size: 15px;">Number of guests: ${personen}</p>
            </div>
            <p style="font-size: 16px; line-height: 1.6;">Kind regards,<br/><strong>The phil team</strong></p>

            <!-- SIGNATUR -->
            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 13px; color: #888; line-height: 1.8;">
              <strong style="color: #573B30;">phil – buch bar mobiliar</strong><br/>
              Gumpendorfer Straße 10–12, 1060 Wien<br/>
              Mo 15–23 &nbsp;|&nbsp; Di–Do 9–23 &nbsp;|&nbsp; Fr &amp; Sa 9–1 &nbsp;|&nbsp; So 9–22<br/>
              Tel: <a href="tel:+43151810489" style="color: #888;">+43 1 581 04 89</a><br/>
              <a href="mailto:info@phil.info" style="color: #D72333;">info@phil.info</a> &nbsp;|&nbsp;
              <a href="https://www.cafephil.at" style="color: #D72333;">cafephil.at</a><br/>
              <a href="https://www.instagram.com/phil.in.wien/" style="color: #888;">Instagram</a> &nbsp;|&nbsp;
              <a href="https://www.facebook.com/prophil" style="color: #888;">Facebook</a>
            </div>

          </div>
        </div>
      `,
    });

    // 3) Benachrichtigung ans Café
    await getResend().emails.send({
      from: "phil Website <noreply@cafephil.at>",
      to: CAFE_EMAIL,
      subject: `Neue Anmeldung: ${eventTitle}`,
      html: `
        <div style="font-family: Georgia, serif; color: #333; max-width: 560px;">
          <h2 style="color: #D72333;">Neue Event-Anmeldung</h2>
          <table style="width:100%; border-collapse: collapse; font-size: 15px;">
            <tr><td style="padding:6px; font-weight:bold;">Veranstaltung:</td><td style="padding:6px;">${eventTitle}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">Datum:</td><td style="padding:6px;">${eventDate}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">Name:</td><td style="padding:6px;">${vorname} ${nachname}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">E-Mail:</td><td style="padding:6px;">${email}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">Personen:</td><td style="padding:6px;">${personen}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">Kommentar:</td><td style="padding:6px;">${kommentar || "–"}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">Newsletter:</td><td style="padding:6px;">${newsletter}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("Signup API Fehler:", err);
    return NextResponse.json({ status: "error", message: "Interner Fehler." }, { status: 500 });
  }
}
