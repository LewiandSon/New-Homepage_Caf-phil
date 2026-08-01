import type { Metadata } from "next";
import { JobsContent } from "./JobsContent";

export const metadata: Metadata = {
  title: "Buchhändler:in gesucht (Fr & Sa) | phil Wien",
  description:
    "phil sucht eine:n Buchhändler:in für Freitag & Samstag (16 Std., je 10–18 Uhr, ab September) in Wien-Mariahilf. Quereinsteiger:innen willkommen. Bewerbung an info@phil.info.",
  alternates: {
    canonical: "https://www.cafephil.at/jobs",
  },
  openGraph: {
    title: "Buchhändler:in gesucht (Fr & Sa) | phil Wien",
    description:
      "phil sucht eine:n Buchhändler:in für Freitag & Samstag, ab September, in Wien-Mariahilf. Quereinsteiger:innen willkommen.",
    url: "https://www.cafephil.at/jobs",
    siteName: "café phil",
    locale: "de_AT",
    type: "website",
  },
};

// JobPosting structured data (Google for Jobs).
// Hinweis: datePosted/validThrough sind sinnvolle Defaults – bei Bedarf anpassen.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Buchhändler:in (Freitag & Samstag)",
  description:
    "<p>phil ist seit 2004 das erweiterte Wohnzimmer von Mariahilf: Café, Bar und eine vollwertige Buchhandlung. Für Freitag &amp; Samstag (je 10–18 Uhr, 16 Stunden/Woche) suchen wir ab September eine:n Buchhändler:in – Quereinsteiger:innen willkommen.</p><p><strong>Aufgaben:</strong> Gäste beraten und Bücher verkaufen, Kundenbestellungen, Kassa und Tagesabrechnung, Warenübernahme und Remissionen, Gestaltung von Tischen und Auslage, Bücher für Instagram in Szene setzen, Mithilfe bei Lesungen und Events.</p><p><strong>Wir bieten:</strong> einen der schönsten Arbeitsorte Wiens, ein junges Team, gratis Speisen und Getränke, Bezahlung nach Handels-KV mit Überzahlung je nach Erfahrung.</p>",
  datePosted: "2026-08-01",
  validThrough: "2026-09-30T23:59:59+02:00",
  employmentType: "PART_TIME",
  hiringOrganization: {
    "@type": "Organization",
    name: "phil – Café, Buchhandlung & Bar",
    sameAs: "https://www.cafephil.at",
    logo: "https://www.cafephil.at/apple-icon.png",
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gumpendorfer Straße 10–12",
      addressLocality: "Wien",
      postalCode: "1060",
      addressCountry: "AT",
    },
  },
  directApply: false,
  industry: "Buchhandel",
  workHours: "Freitag & Samstag, je 10–18 Uhr (16 Std./Woche)",
};

export default function JobsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobsContent />
    </>
  );
}
