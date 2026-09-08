import { NextRequest, NextResponse } from "next/server";
import { readSignupRows, countPersonsForEvent } from "@/lib/eventCapacity";

// Liefert für die angefragten Events die Summe der bereits angemeldeten Personen.
// Body: { events: [{ id, titles: string[] }] }  ->  { counts: { [id]: number } }
// Fail-open: bei Fehlern werden keine Zähler geliefert (die Seite blockt dann nicht).
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      events?: { id: string; titles?: string[] }[];
    };
    const events = Array.isArray(body.events) ? body.events : [];
    if (events.length === 0) return NextResponse.json({ counts: {} });

    const rows = await readSignupRows();
    const counts: Record<string, number> = {};
    for (const ev of events) {
      if (!ev?.id) continue;
      counts[ev.id] = countPersonsForEvent(rows, { id: ev.id, titles: ev.titles ?? [] });
    }
    return NextResponse.json({ counts });
  } catch (err) {
    console.error("event-availability Fehler (fail-open):", err);
    return NextResponse.json({ counts: {} });
  }
}
