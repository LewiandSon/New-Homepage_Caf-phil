import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;

// Spalten im Anmelde-Sheet (0-basiert):
//  2 = Event-Titel, 8 = Personenanzahl, 11 = Event-ID (neu, seit Teilnehmer-Limit)
const COL_TITLE = 2;
const COL_PERSONS = 8;
const COL_EVENT_ID = 11;

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

/** Summiert die angemeldeten Personen für ein Event.
 *  Match: Zeile hat exakt diese Event-ID – oder (Alt-Anmeldungen ohne ID) passender Titel. */
export function countPersonsForEvent(rows: string[][], ev: EventKey): number {
  const titles = ev.titles.filter(Boolean).map((t) => t.trim().toLowerCase());
  let sum = 0;
  for (const row of rows) {
    const rowId = (row[COL_EVENT_ID] ?? "").trim();
    const matchesById = rowId !== "" && rowId === ev.id;
    const matchesByTitle =
      rowId === "" && titles.includes((row[COL_TITLE] ?? "").trim().toLowerCase());
    if (matchesById || matchesByTitle) {
      const n = parseInt((row[COL_PERSONS] ?? "1").trim(), 10);
      sum += Number.isFinite(n) && n > 0 ? n : 1;
    }
  }
  return sum;
}
