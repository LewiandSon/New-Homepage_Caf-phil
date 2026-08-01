"use client";

import { useLanguage } from "../../LanguageContext";

const RED = "#D72333";
const CREAM = "#F9F1DA";
const PDF_URL = "/phil-jobinserat-buchhandel-fr-sa.pdf";

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

        {/* Embedded PDF (A4 aspect ratio). Mobile browsers that can't render
            it inline fall back to the message + link below. */}
        <div
          style={{
            width: "100%",
            aspectRatio: "595 / 842",
            maxHeight: "82vh",
            border: `2px solid ${RED}`,
            background: "#fff",
          }}
        >
          <object
            data={`${PDF_URL}#view=FitH&toolbar=1`}
            type="application/pdf"
            width="100%"
            height="100%"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <div
              className="flex flex-col items-center justify-center gap-3 h-full text-center px-6 py-10"
              style={{ fontFamily: "Vollkorn", color: RED }}
            >
              <p style={{ fontSize: "17px", fontWeight: 500 }}>{t.fallback}</p>
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ fontSize: "18px", fontStyle: "italic", fontWeight: 700 }}
              >
                {t.fallbackLink} ↗
              </a>
            </div>
          </object>
        </div>

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
