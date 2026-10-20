// Gängige Absage-Gründe, zweisprachig vorübersetzt. Wird von Studio-Schema,
// Website-Bannern und der Absage-Mail genutzt – eine Quelle für alles.
// Formuliert als Einschub, der in beide Muster passt:
//   Banner: "Leider abgesagt <grund>"
//   Mail:   "… am <Datum> <grund> absagen."

export type AbsageGrund = { key: string; de: string; en: string };

export const ABSAGE_GRUENDE: AbsageGrund[] = [
  { key: "krankheit", de: "aufgrund von Krankheit", en: "due to illness" },
  { key: "wetter", de: "aufgrund des Wetters", en: "due to the weather" },
  { key: "technisch", de: "aus technischen Gründen", en: "for technical reasons" },
  { key: "zu_wenige", de: "mangels Anmeldungen", en: "due to insufficient registrations" },
  { key: "kurzfristig", de: "aus kurzfristigen Gründen", en: "at short notice" },
  { key: "unvorhergesehen", de: "aus unvorhergesehenen Gründen", en: "for unforeseen reasons" },
];

/** Löst den Absage-Grund in die passende Sprache auf.
 *  - bekannter Dropdown-Key  → vorübersetzter Text (DE/EN)
 *  - "sonstiges"             → Freitext (nur DE, EN leer)
 *  - alter Freitext (Legacy) → wie Freitext (nur DE)
 *  - leer                    → "" */
export function absageGrundText(
  grund: string | undefined | null,
  frei: string | undefined | null,
  lang: "de" | "en",
): string {
  if (!grund) return "";
  if (grund === "sonstiges") return lang === "de" ? (frei?.trim() ?? "") : "";
  const found = ABSAGE_GRUENDE.find((g) => g.key === grund);
  if (found) return found[lang];
  return lang === "de" ? grund.trim() : ""; // Legacy-Freitext
}
