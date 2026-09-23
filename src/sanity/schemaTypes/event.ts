import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Veranstaltung",
  type: "document",
  fields: [
    defineField({
      name: "title_de",
      title: "Titel (Deutsch)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title_en",
      title: "Titel (Englisch)",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Datum & Uhrzeit",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Bild (optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description_de",
      title: "Beschreibung (Deutsch)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "description_en",
      title: "Beschreibung (Englisch)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "signupType",
      title: "Anmeldung",
      type: "string",
      options: {
        list: [
          { title: "Kein Anmeldebutton", value: "nein" },
          { title: "Internes Formular (phil-Website)", value: "ja" },
          { title: "Externer Link (z.B. Eventbrite, eigene Seite …)", value: "extern" },
          { title: "Anmeldung geschlossen", value: "geschlossen" },
        ],
        layout: "radio",
      },
      initialValue: "nein",
    }),
    defineField({
      name: "signupUrl",
      title: "Externer Anmelde-Link oder E-Mail",
      type: "string",
      description:
        "Nur bei \"Externer Link\". Entweder eine URL (https://…) ODER eine E-Mail-Adresse (z. B. events@phil.info) – bei einer E-Mail öffnet der Button das Mailprogramm.",
      hidden: ({ document }) => document?.signupType !== "extern",
      validation: (r) =>
        r.custom((value) => {
          if (!value) return true; // Feld optional
          const s = String(value).trim();
          const ok =
            /^https?:\/\/.+/i.test(s) ||
            /^mailto:.+@.+/i.test(s) ||
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
          return ok || "Bitte eine gültige URL (https://…) oder E-Mail-Adresse eingeben.";
        }),
    }),
    defineField({
      name: "maxTeilnehmer",
      title: "Max. Teilnehmer (optional)",
      type: "number",
      description:
        "Maximale Anzahl anmeldbarer Personen. Leer lassen = unbegrenzt. Ist das Limit erreicht, wird der Anmelde-Button automatisch zu \"Ausgebucht\".",
      validation: (r) => r.min(1).integer(),
      hidden: ({ document }) => document?.signupType !== "ja",
    }),
  ],
  preview: {
    select: {
      title: "title_de",
      date: "date",
      media: "image",
    },
    prepare({ title, date, media }) {
      const d = date ? new Date(date).toLocaleDateString("de-AT") : "Kein Datum";
      return { title: title || "Unbenannte Veranstaltung", subtitle: d, media };
    },
  },
  orderings: [
    {
      title: "Datum (aufsteigend)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
