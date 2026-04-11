// ============================================================
//  EVENTS – hier neue Veranstaltungen hinzufügen oder entfernen
//
//  signupLink:  "ja"          → Anmelden-Button sichtbar
//               "geschlossen" → "Anmeldung geschlossen" Text
//               "nein"        → kein Button
//
//  Das Datum bestimmt automatisch ob ein Event unter
//  "Kommende" oder "Vergangene Veranstaltungen" erscheint.
//  Kein manuelles Verschieben nötig!
// ============================================================

export type EventItem = {
  /** Format: "TT.MM.JJJJ, HH:MM Uhr"  z.B. "15.04.2026, 19:00 Uhr" */
  date_de: string;
  /** Format: "DD Mon YYYY, H:MM pm"    z.B. "15 Apr 2026, 7:00 pm" */
  date_en: string;
  title_de: string;
  title_en: string;
  description_de: string;
  description_en: string;
  /** Pfad zum Bild, z.B. "/images/events/mein-event.webp"
   *  Leer lassen "" wenn kein Bild vorhanden */
  imageUrl: string;
  /** "ja" | "geschlossen" | "nein" */
  signupLink: string;
};

// ──────────────────────────────────────────────────────────────
//  ✏️  HIER NEUE EVENTS EINTRAGEN (neueste zuerst)
// ──────────────────────────────────────────────────────────────
export const ALL_EVENTS: EventItem[] = [
  // ── NEUES EVENT EINTRAGEN ──
  // {
  //   date_de: "TT.MM.JJJJ, HH:MM Uhr",
  //   date_en: "DD Mon YYYY, H:MM pm",
  //   title_de: "",
  //   title_en: "",
  //   description_de: "",
  //   description_en: "",
  //   imageUrl: "/images/events/",
  //   signupLink: "ja",
  // },

  {
    date_de: "09.03.2026, ab 15:30 Uhr",
    date_en: "09 Mar 2026, from 3:30 pm",
    title_de: "Weltfrauentag im phil",
    title_en: "International Women's Day at phil",
    description_de:
      `<strong>15:30 Uhr</strong> Lesung mit Christine Heuer aus dem Sachbilderbuch von Linda Olafsdottir zum Frauenstreik in Island vor 50 Jahren – für alle von 7 bis 99 Jahren.<br/><br/>` +
      `<strong>16:30 Uhr</strong> Caroline Peters liest aus ihrem Roman &#8222;Ein anderes Leben&#8220; über eine Frau, die patriarchale Rollenerwartungen sprengt.<br/><br/>` +
      `<strong>17–18 Uhr</strong> Prosecco Happy Hour<br/><br/>` +
      `<strong>19 Uhr</strong> Lenka Reschenbach präsentiert ihr preisgekröntes Buch &#8222;Der Patriarchatsindex&#8220; – illustrierte Infografiken zum Patriarchat in Österreich.<br/><br/>` +
      `<strong>20:15 Uhr</strong> Pub-Quiz &#8222;Female Edition&#8220; mit Tex Rubinowitz. Tolle Preise zu gewinnen.`,
    description_en:
      "<strong>3:30 pm</strong> Reading with Christine Heuer from Linda Olafsdottir's picture book about the women's strike in Iceland 50 years ago – for everyone aged 7 to 99.<br/><br/>" +
      "<strong>4:30 pm</strong> Caroline Peters reads from her novel \"A Different Life\" about a woman who breaks free from patriarchal role expectations.<br/><br/>" +
      "<strong>5–6 pm</strong> Prosecco Happy Hour<br/><br/>" +
      "<strong>7 pm</strong> Lenka Reschenbach presents her award-winning book \"The Patriarchy Index\" – illustrated infographics on patriarchy in Austria.<br/><br/>" +
      "<strong>8:15 pm</strong> Pub quiz \"Female Edition\" with Tex Rubinowitz. Great prizes to be won.",
    imageUrl: "/images/assets/Weltfrauentag-phil-Instagrampost-mit-Tex.webp",
    signupLink: "nein",
  },
  {
    date_de: "27.11.2025, 19:00 Uhr",
    date_en: "27 Nov 2025, 7:00 pm",
    title_de: "Lesung mit Gertraud Klemm",
    title_en: "Reading with Gertraud Klemm",
    description_de:
      "Wir freuen uns auf einen spannenden Abend: Gertraud Klemm stellt ihre neue, kraftvolle Streitschrift »Abschied vom Phallozän« bei uns vor. Sei dabei!",
    description_en:
      "We're looking forward to an exciting evening: Gertraud Klemm presents her powerful new polemic »Farewell to the Phallocene« here at phil. Come join us!",
    imageUrl: "/images/events/klemm-cover.webp",
    signupLink: "nein",
  },
  {
    date_de: "18.09.2025, 19:00 Uhr",
    date_en: "18 Sep 2025, 7:00 pm",
    title_de: "Spoken Word Abend",
    title_en: "Spoken Word Night",
    description_de:
      "FIKTION ALS REVOLUTION Gedichte, Kurzgeschichten, Performance – alles, was ihr mit Worten ausdrücken könnt und in zehn Minuten Platz findet. Außerdem Musik, Getränke und viele tolle Literaturliebhaber:innen.",
    description_en:
      "FICTION AS REVOLUTION – poetry, short stories, performance – anything you can express with words and fit into ten minutes. Plus music, drinks and plenty of fellow lovers of literature.",
    imageUrl: "/images/events/spoken_word.webp",
    signupLink: "nein",
  },
  {
    date_de: "25.08.2025, 10:00 Uhr",
    date_en: "25 Aug 2025, 10:00 am",
    title_de: "Bücherflohmarkt",
    title_en: "Book flea market",
    description_de:
      "Am Montag, den 25. August ab 10 Uhr, verwandelt sich das phil in ein Bücherparadies! Ob neu, gebraucht oder alt – stöbere dich durch eine bunte Auswahl an Büchern zum Schnäppchenpreis.",
    description_en:
      "On Monday 25 August from 10 a.m., phil turns into a book paradise! Whether new, second-hand or well-loved – browse your way through a colourful selection of books at bargain prices.",
    imageUrl: "/images/events/bücherflohmarkt.webp",
    signupLink: "nein",
  },
];

// ──────────────────────────────────────────────────────────────
//  Hilfsfunktion: Datum aus "TT.MM.JJJJ, ..." parsen
// ──────────────────────────────────────────────────────────────
export function parseEventDate(dateDE: string): Date | null {
  const datePart = dateDE.split(",")[0].trim();
  const [day, month, year] = datePart.split(".").map(Number);
  if (!day || !month || !year) return null;
  return new Date(year, month - 1, day);
}

// ──────────────────────────────────────────────────────────────
//  Upcoming & Past automatisch aufteilen
// ──────────────────────────────────────────────────────────────
export function getUpcomingEvents(): EventItem[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return ALL_EVENTS
    .filter(e => { const d = parseEventDate(e.date_de); return d && d >= today; })
    .sort((a, b) => (parseEventDate(a.date_de)?.getTime() ?? 0) - (parseEventDate(b.date_de)?.getTime() ?? 0));
}

export function getPastEvents(): EventItem[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return ALL_EVENTS
    .filter(e => { const d = parseEventDate(e.date_de); return d && d < today; })
    .sort((a, b) => (parseEventDate(b.date_de)?.getTime() ?? 0) - (parseEventDate(a.date_de)?.getTime() ?? 0));
}
