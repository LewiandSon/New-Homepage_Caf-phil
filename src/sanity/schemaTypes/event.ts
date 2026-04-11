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
      title: "Externer Anmeldelink (URL)",
      type: "url",
      description: "Nur ausfüllen wenn oben \"Externer Link\" gewählt wurde.",
      hidden: ({ document }) => document?.signupType !== "extern",
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
