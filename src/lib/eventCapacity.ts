import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;

// Spalten im Anmelde-Sheet (0-basiert):
//  2 = Event-Titel, 5 = Vorname, 7 = E-Mail, 8 = Personenanzahl, 11 = Event-ID
const COL_TITLE = 2;
const COL_VORNAME = 5;
const COL_EMAIL = 7;
const COL_PERSONS = 8;
const COL_EVENT_ID = 11;

// Markierungszeile im Sheet, die festhält, dass eine Absage-Mail verschickt wurde.
const ABSAGE_MARKER = "ABSAGE_GESENDET";

function getSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "",
      private_key: (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

/** Liest alle Anmelde-Zeilen (ohne Kopfzeile). Wirft bei Fehler – Aufrufer entscheidet (fail-open). */
export async function readSignupRows(): Promise<string[][]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "A:L",
  });
  const values = (res.data.values ?? []) as string[][];
  // Erste Zeile könnte eine Kopfzeile sein – nur überspringen, wenn Spalte "Personen" keine Zahl ist.
  if (values.length && !/^\d+$/.test((values[0][COL_PERSONS] ?? "").trim())) {
    return values.slice(1);
  }
  return values;
}

type EventKey = { id: string; titles: string[] };

/** Gehört eine Zeile zu diesem Event? Match per Event-ID – oder (Alt-Anmeldungen
 *  ohne ID) per Titel. Markierungszeilen (Absage-Log) zählen nie dazu. */
function rowMatchesEvent(row: string[], ev: EventKey, titlesLc: string[]): boolean {
  if ((row[0] ?? "").trim() === ABSAGE_MARKER) return false;
  const rowId = (row[COL_EVENT_ID] ?? "").trim();
  if (rowId !== "") return rowId === ev.id;
  return titlesLc.includes((row[COL_TITLE] ?? "").trim().toLowerCase());
}

/** Summiert die angemeldeten Personen für ein Event. */
export function countPersonsForEvent(rows: string[][], ev: EventKey): number {
  const titlesLc = ev.titles.filter(Boolean).map((t) => t.trim().toLowerCase());
  let sum = 0;
  for (const row of rows) {
    if (rowMatchesEvent(row, ev, titlesLc)) {
      const n = parseInt((row[COL_PERSONS] ?? "1").trim(), 10);
      sum += Number.isFinite(n) && n > 0 ? n : 1;
    }
  }
  return sum;
}

export type Registrant = { email: string; vorname: string };

/** Eindeutige Empfänger (nach E-Mail) für ein Event – für den Absage-Versand. */
export function getRegistrantsForEvent(rows: string[][], ev: EventKey): Registrant[] {
  const titlesLc = ev.titles.filter(Boolean).map((t) => t.trim().toLowerCase());
  const byEmail = new Map<string, Registrant>();
  for (const row of rows) {
    if (!rowMatchesEvent(row, ev, titlesLc)) continue;
    const email = (row[COL_EMAIL] ?? "").trim();
    if (!email || !email.includes("@")) continue;
    const key = email.toLowerCase();
    if (!byEmail.has(key)) {
      byEmail.set(key, { email, vorname: (row[COL_VORNAME] ?? "").trim() });
    }
  }
  return [...byEmail.values()];
}

/** Datum (ISO) der bereits verschickten Absage für dieses Event – oder null. */
export function absageAlreadySent(rows: string[][], eventId: string): string | null {
  for (const row of rows) {
    if ((row[0] ?? "").trim() === ABSAGE_MARKER && (row[1] ?? "").trim() === eventId) {
      return (row[2] ?? "").trim() || "unbekannt";
    }
  }
  return null;
}

/** Hält im Sheet fest, dass die Absage-Mail verschickt wurde (Doppelversand-Schutz). */
export async function logAbsageSent(eventId: string, count: number): Promise<void> {
  const sheets = getSheets();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "A:D",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[ABSAGE_MARKER, eventId, new Date().toISOString(), String(count)]] },
  });
}
