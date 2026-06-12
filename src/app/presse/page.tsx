import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pressestimmen | phil Wien",
  description:
    "Was Medien und Magazine über phil schreiben – Café, Buchhandlung & Bar in Wien-Mariahilf seit 2004.",
  alternates: {
    canonical: "https://www.cafephil.at/presse",
  },
};

type PressEntry = {
  medium: string;
  year: string;
  fragment: string;
  url: string;
  placeholder?: boolean;
};

const PRESS_ENTRIES: PressEntry[] = [
  {
    medium: "wien.info",
    year: "–",
    fragment: "Kaffee und Bücher im phil",
    url: "https://www.wien.info/de/essen-trinken/cafes/phil-355232",
  },
  {
    medium: "Falter Lokalführer",
    year: "–",
    fragment: "Lokalprofil phil auf Falter.at",
    url: "https://www.falter.at/lokal/5631/phil",
  },
  {
    medium: "Falstaff Cafeguide",
    year: "–",
    fragment: "phil in Wien – Falstaff Cafeguide",
    url: "https://www.falstaff.com/at/cafes/phil",
  },
  {
    medium: "Die Frühstückerinnen",
    year: "2024",
    fragment: "\u201Eentschleunigte Wohlfühlatmosphäre für Leseratten\u201C",
    url: "https://www.diefruehstueckerinnen.at/wien/phil/",
  },
  {
    medium: "1000things Magazine",
    year: "–",
    fragment: "Eines der gemütlichsten Büchercafés in Wien",
    url: "https://www.1000thingsmagazine.com/de/a/2668/wiener-buechercafes/",
  },
  {
    medium: "1000things Magazine",
    year: "–",
    fragment: "Unter den liebsten Cafés im 6. Bezirk",
    url: "https://www.1000thingsmagazine.com/de/a/5240/die-besten-cafes-sechster-bezirk/",
  },
  {
    medium: "Stadtbekannt.at",
    year: "–",
    fragment: "phil – Cafe, Bar, Buchgeschäft & Frühstückslokal",
    url: "https://lokalfuehrer.stadtbekannt.at/restaurants/phil-cafe/",
  },
  {
    medium: "Wiener Bezirksblatt",
    year: "–",
    fragment: "phil – Café, bookshop & bar",
    url: "https://wienerbezirksblatt.at/ort/phil-cafe-bookshop-bar/",
  },
  {
    medium: "Wiener Bezirksblatt",
    year: "–",
    fragment: "Unter den besten Buchhandlungen der Stadt",
    url: "https://wienerbezirksblatt.at/liste/die-besten-buchhandlungen-der-stadt/",
  },
  {
    medium: "Der Standard",
    year: "2025",
    fragment: "\u201Ein vielerlei Hinsicht ein Pionier\u201C",
    // URL zu verifizieren – derstandard.at, 18.10.2025
    url: "https://www.derstandard.at",
    placeholder: true,
  },
  {
    medium: "Der Standard",
    year: "2022",
    fragment: "Laptopfreies Konzept als Ort der Begegnung",
    url: "https://www.derstandard.at/story/2000135902556/nach-reaktionen-auf-laptopverbot-cafe-phil-voruebergehend-geschlossen",
  },
  {
    medium: "Creme Guides",
    year: "2019",
    fragment: "\u201EEine Institution im 6. Bezirk\u201C",
    // URL zu verifizieren – Creme Guides Archiv
    url: "https://www.creme.at",
    placeholder: true,
  },
  {
    medium: "Café Entropy",
    year: "–",
    fragment: "Literatur-Feature mit Autorin Susanne Gregor",
    // URL zu verifizieren – cafeentropy.com
    url: "https://www.cafeentropy.com",
    placeholder: true,
  },
  {
    medium: "Stadt Wien / ticket.wien.gv.at",
    year: "2025",
    fragment: "\u201EScience & Coffee\u201C \u2013 Quantenphysik im Café phil",
    url: "https://ticket.wien.gv.at/MDS/csqne/",
  },
  // {
  //   medium: "ERRR Magazine",
  //   year: "demnächst",
  //   fragment: "„Behind the shop" – erscheint demnächst",
  //   url: "#",
  //   placeholder: true,
  // },
];

export default function PressePage() {
  return (
    <main
      className="relative min-h-screen pt-[100px] md:pt-[150px] pb-24"
      style={{ background: "#F9F1DA" }}
    >
      <div className="max-w-[860px] mx-auto px-6 sm:px-8">
        <h1
          className="mb-3"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "clamp(28px, 5vw, 40px)",
            fontStyle: "italic",
            fontWeight: 900,
            color: "#D72333",
            lineHeight: "150%",
          }}
        >
          Pressestimmen
        </h1>
        <p
          className="mb-12"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "18px",
            fontWeight: 500,
            color: "#D72333",
            opacity: 0.7,
            lineHeight: "150%",
          }}
        >
          Was Medien und Magazine über phil schreiben.
        </p>

        <div className="flex flex-col gap-0">
          {PRESS_ENTRIES.map((entry, i) => (
            <a
              key={i}
              href={entry.placeholder ? undefined : entry.url}
              target={entry.placeholder ? undefined : "_blank"}
              rel={entry.placeholder ? undefined : "noopener noreferrer"}
              className={`group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-5 border-b transition-opacity duration-150 ${
                entry.placeholder
                  ? "cursor-default opacity-60"
                  : "hover:opacity-75 cursor-pointer"
              }`}
              style={{ borderColor: "#D72333" }}
            >
              <div className="flex items-baseline gap-3 sm:w-[220px] flex-shrink-0">
                <span
                  style={{
                    fontFamily: "Vollkorn",
                    fontSize: "17px",
                    fontStyle: "italic",
                    fontWeight: 900,
                    color: "#D72333",
                    lineHeight: "150%",
                  }}
                >
                  {entry.medium}
                </span>
                {entry.year !== "–" && (
                  <span
                    style={{
                      fontFamily: "Vollkorn",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#D72333",
                      opacity: 0.6,
                    }}
                  >
                    {entry.year}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontFamily: "Vollkorn",
                  fontSize: "17px",
                  fontWeight: 500,
                  color: "#D72333",
                  lineHeight: "150%",
                }}
              >
                {entry.fragment}
                {entry.placeholder && (
                  <span
                    style={{ fontSize: "13px", opacity: 0.5, marginLeft: "8px" }}
                  >
                    (Link wird ergänzt)
                  </span>
                )}
                {!entry.placeholder && (
                  <span
                    style={{
                      fontSize: "13px",
                      opacity: 0.5,
                      marginLeft: "8px",
                    }}
                  >
                    →
                  </span>
                )}
              </span>
            </a>
          ))}
        </div>

        <p
          className="mt-12"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "15px",
            fontWeight: 500,
            color: "#D72333",
            opacity: 0.5,
            lineHeight: "150%",
          }}
        >
          Presseanfragen: info@phil.info
        </p>
      </div>
    </main>
  );
}
