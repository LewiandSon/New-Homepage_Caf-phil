"use client";

import Image from "next/image";
import { useLanguage } from "../../LanguageContext";

const RED = "#D72333";
const CREAM = "#F9F1DA";
const PDF_URL = "/phil-jobinserat-buchhandel-fr-sa.pdf";
const POSTER_URL = "/images/assets/jobinserat-buchhandel-fr-sa.webp";

const CONTENT = {
  de: {
    title: "Buchhändler:in gesucht.",
    subtitle: "Freitag & Samstag im phil · Quereinsteiger:innen willkommen",
    openPdf: "PDF öffnen",
    apply: "Jetzt bewerben",
    mailSubject: "Bewerbung Buchhändler:in (Fr & Sa)",
    fallback: "Dein Browser kann das PDF nicht direkt anzeigen.",
    fallbackLink: "Stellenausschreibung als PDF öffnen",
    address: "phil · Gumpendorfer Straße 10–12, 1060 Wien",
  },
  en: {
    title: "Bookseller wanted.",
    subtitle: "Fridays & Saturdays at phil · Career changers welcome",
    openPdf: "Open PDF",
    apply: "Apply now",
    mailSubject: "Application Bookseller (Fri & Sat)",
    fallback: "Your browser can't display the PDF directly.",
    fallbackLink: "Open the job posting as a PDF",
    address: "phil · Gumpendorfer Straße 10–12, 1060 Vienna",
  },
};

export function JobsContent() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];
  const mailto = `mailto:info@phil.info?subject=${encodeURIComponent(t.mailSubject)}`;

  return (
    <main
      className="relative min-h-screen pt-[100px] md:pt-[150px] pb-20 px-6 sm:px-8"
      style={{ background: CREAM, color: RED }}
    >
      <div className="max-w-[760px] mx-auto">
        <h1
          className="mb-3"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "clamp(30px, 5.5vw, 48px)",
            fontStyle: "italic",
            fontWeight: 900,
            color: RED,
            lineHeight: 1.1,
          }}
        >
          {t.title}
        </h1>
        <p
          className="mb-6"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "clamp(16px, 2.2vw, 20px)",
            fontWeight: 500,
            color: RED,
            opacity: 0.8,
            lineHeight: "150%",
          }}
        >
          {t.subtitle}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href={mailto}
            className="inline-flex items-center justify-center transition-transform duration-150 active:scale-95"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "18px",
              fontStyle: "italic",
              fontWeight: 700,
              color: CREAM,
              background: RED,
              border: `3px solid ${RED}`,
              padding: "11px 26px",
            }}
          >
            {t.apply} →
          </a>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center transition-transform duration-150 active:scale-95"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "18px",
              fontStyle: "italic",
              fontWeight: 700,
              color: RED,
              background: "transparent",
              border: `3px solid ${RED}`,
              padding: "11px 26px",
            }}
          >
            {t.openPdf} ↗
          </a>
        </div>

        {/* Job posting rendered as a clean image (the PDF page), no viewer
            chrome. The actual PDF stays available via the buttons above. */}
        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          style={{
            border: `2px solid ${RED}`,
            boxShadow: "0 10px 40px rgba(87, 59, 48, 0.18)",
            lineHeight: 0,
          }}
        >
          <Image
            src={POSTER_URL}
            alt={
              lang === "de"
                ? "Stellenausschreibung: Buchhändler:in gesucht bei phil, Freitag & Samstag"
                : "Job posting: bookseller wanted at phil, Fridays & Saturdays"
            }
            width={1500}
            height={2122}
            priority
            className="w-full h-auto"
            sizes="(max-width: 760px) 100vw, 760px"
          />
        </a>

        <p
          className="mt-8 text-center"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "14px",
            fontWeight: 500,
            color: RED,
            opacity: 0.55,
            lineHeight: "150%",
          }}
        >
          {t.address} · cafephil.at · @phil.in.wien
        </p>
      </div>
    </main>
  );
}
