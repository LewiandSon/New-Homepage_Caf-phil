"use client";

import { AnmeldungModal } from "@/components/AnmeldungModal";
import { InstagramLink } from "@/components/InstagramLink";
import Image from "next/image";
import { useState, Fragment, useEffect } from "react";
import { useLanguage } from "../../LanguageContext";
import * as gtag from "@/lib/gtag";
import { client } from "@/sanity/client";
import { upcomingEventsQuery, pastEventsQuery } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";

// ── Typen ────────────────────────────────────────────────────────────────────

type SanityBlock = { _type: string; [key: string]: unknown };

type SanityEvent = {
  _id: string;
  title_de: string;
  title_en?: string;
  date: string;
  imageUrl?: string;
  description_de?: SanityBlock[];
  description_en?: SanityBlock[];
  signupType?: string;
  signupUrl?: string;
};

type LangEvent = {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
  description?: SanityBlock[];
  signupType?: string;
  signupUrl?: string;
};

// ── Hilfsfunktionen ──────────────────────────────────────────────────────────

function formatDate(iso: string, lang: string): string {
  const d = new Date(iso);
  if (lang === "de") {
    return d.toLocaleDateString("de-AT", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    }).replace(",", ",") + " Uhr";
  }
  return d.toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function toLangEvent(e: SanityEvent, lang: string): LangEvent {
  return {
    id: e._id,
    title: lang === "de" ? e.title_de : (e.title_en || e.title_de),
    date: formatDate(e.date, lang),
    imageUrl: e.imageUrl,
    description: lang === "de" ? e.description_de : (e.description_en ?? e.description_de),
    signupType: e.signupType,
    signupUrl: e.signupUrl,
  };
}

/** Portable Text Komponenten im phil-Stil */
const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ marginBottom: "0.75em" }}>{children}</p>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ display: "block", marginBottom: "4px" }}>{children}</strong>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong>{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
  },
};

/** Gibt nur den ersten Block zurück */
function shortBlocks(blocks?: SanityBlock[]): SanityBlock[] {
  if (!blocks || blocks.length === 0) return [];
  return [blocks[0]];
}

function isLong(blocks?: SanityBlock[]): boolean {
  return (blocks?.length ?? 0) > 1;
}

// ── Seite ────────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const { lang } = useLanguage();
  const [upcomingRaw, setUpcomingRaw] = useState<SanityEvent[]>([]);
  const [pastRaw, setPastRaw] = useState<SanityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [signupModal, setSignupModal] = useState<{ eventTitle: string; eventDate: string } | null>(null);
  const [footerModal, setFooterModal] = useState<"imprint" | "privacy" | "terms" | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [imageLightbox, setImageLightbox] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date().toISOString();
    Promise.all([
      client.fetch<SanityEvent[]>(upcomingEventsQuery, { now }),
      client.fetch<SanityEvent[]>(pastEventsQuery, { now }),
    ]).then(([upcoming, past]) => {
      setUpcomingRaw(upcoming);
      setPastRaw(past);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (imageLightbox) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [imageLightbox]);

  const upcomingEvents = upcomingRaw.map(e => toLangEvent(e, lang));
  const pastEvents = pastRaw.map(e => toLangEvent(e, lang));

  return (
    <main className="relative min-h-screen bg-[#F9F1DA] text-[#D72333] font-serif pt-[100px] md:pt-[150px] overflow-x-hidden">
      <div className="md:scale-[0.855] md:origin-top">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 pb-24">
        <h1
          className="text-center mb-12"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "clamp(28px, 4vw, 35px)",
            fontStyle: "italic",
            fontWeight: 900,
            lineHeight: "150%",
            color: "#D72333",
          }}
        >
          {lang === "de" ? "Unsere nächsten Veranstaltungen" : "Our Upcoming Events"}
        </h1>

        {loading && (
          <p className="text-center py-12" style={{ fontFamily: "Vollkorn", fontSize: "18px", color: "#D72333", opacity: 0.5 }}>
            {lang === "de" ? "Wird geladen …" : "Loading …"}
          </p>
        )}

        {!loading && upcomingEvents.length === 0 && (
          <p className="text-center py-12" style={{ fontFamily: "Vollkorn", fontSize: "18px", color: "#573B30" }}>
            {lang === "de"
              ? "Derzeit sind keine Veranstaltungen geplant. Schau bald wieder vorbei!"
              : "No upcoming events at the moment. Check back soon!"}
          </p>
        )}

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 ${upcomingEvents.length === 1 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
          {upcomingEvents.map((event) => {
            const imgSrc = event.imageUrl || "/images/assets/veranstaltung_1.webp";
            const signupAktiv = event.signupType === "ja";
            const signupExtern = event.signupType === "extern" && !!event.signupUrl;
            const signupGeschlossen = event.signupType === "geschlossen";
            const isExpanded = expandedEvent === event.id;

            return (
              <div
                key={event.id}
                className={`flex flex-col ${upcomingEvents.length === 1 ? "lg:col-start-1 lg:col-span-2 lg:mx-auto lg:max-w-[calc((100%-4rem)/3)]" : ""}`}
              >
                {event.imageUrl && (
                  <button
                    type="button"
                    className="relative w-full aspect-[4/5] mb-6 overflow-hidden bg-[#F9F1DA] block cursor-pointer border-0 p-0 text-left"
                    onClick={() => setImageLightbox(imgSrc)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgSrc}
                      alt={event.title}
                      className="w-full h-full object-cover border-2 border-[#D72333]"
                    />
                  </button>
                )}
                <div className="flex flex-col flex-1">
                  <p style={{ fontFamily: "Vollkorn", fontSize: "18px", fontWeight: 600, color: "#D72333", marginBottom: "4px" }}>
                    {event.date}
                  </p>
                  <h2 style={{ fontFamily: "Vollkorn", fontSize: "24px", fontWeight: 800, color: "#D72333", marginBottom: "8px", fontStyle: "italic" }}>
                    {event.title}
                  </h2>
                  {event.description && (
                    <div style={{ fontFamily: "Vollkorn", fontSize: "16px", lineHeight: "1.6", color: "#D72333", marginBottom: "12px" }}>
                      <PortableText
                        value={isExpanded ? event.description : shortBlocks(event.description)}
                        components={ptComponents}
                      />
                    </div>
                  )}
                  {isLong(event.description) && (
                    <button
                      type="button"
                      onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                      style={{ fontFamily: "Vollkorn", fontSize: "16px", fontWeight: 600, color: "#D72333", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: "12px" }}
                    >
                      {isExpanded
                        ? (lang === "de" ? "Weniger anzeigen" : "Show less")
                        : (lang === "de" ? "Vollständiges Programm anzeigen" : "Show full program")}
                    </button>
                  )}
                </div>

                {signupAktiv && (
                  <button
                    type="button"
                    onClick={() => {
                      setSignupModal({ eventTitle: event.title, eventDate: event.date });
                      gtag.event({ action: "click", category: "Event", label: `Anmelden: ${event.title}` });
                    }}
                    className="transition-all duration-200 w-fit"
                    style={{ padding: "14px 32px", fontFamily: "Vollkorn", fontSize: "18px", fontWeight: 600, color: "#D72333", backgroundColor: "#F9F1DA", border: "2px solid #D72333", cursor: "pointer" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#D72333"; e.currentTarget.style.color = "#F9F1DA"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#F9F1DA"; e.currentTarget.style.color = "#D72333"; }}
                  >
                    {lang === "de" ? "Anmelden" : "Sign Up"}
                  </button>
                )}
                {signupExtern && (
                  <a
                    href={event.signupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => gtag.event({ action: "click", category: "Event", label: `Extern-Anmeldung: ${event.title}` })}
                    className="transition-all duration-200 w-fit inline-flex items-center"
                    style={{ padding: "14px 32px", fontFamily: "Vollkorn", fontSize: "18px", fontWeight: 600, color: "#D72333", backgroundColor: "#F9F1DA", border: "2px solid #D72333", cursor: "pointer", textDecoration: "none" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#D72333"; e.currentTarget.style.color = "#F9F1DA"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#F9F1DA"; e.currentTarget.style.color = "#D72333"; }}
                  >
                    {lang === "de" ? "Jetzt anmelden" : "Register now"}
                  </a>
                )}
                {signupGeschlossen && (
                  <p style={{ padding: "14px 0", fontFamily: "Vollkorn", fontSize: "15px", color: "#d9534f", fontWeight: 700 }}>
                    {lang === "de" ? "Anmeldung geschlossen" : "Registration closed"}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Vergangene Veranstaltungen */}
        {pastEvents.length > 0 && (
          <>
            <h2
              className="text-center mb-12"
              style={{ fontFamily: "Vollkorn", fontSize: "clamp(28px, 4vw, 35px)", fontStyle: "italic", fontWeight: 900, lineHeight: "150%", color: "#D72333", marginTop: "72px" }}
            >
              {lang === "de" ? "Vergangene Veranstaltungen" : "Past Events"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-70">
              {pastEvents.map((event) => {
                const imgSrc = event.imageUrl || "/images/assets/veranstaltung_1.webp";
                const isExpanded = expandedEvent === `past-${event.id}`;

                return (
                  <div key={event.id} className="flex flex-col grayscale-[0.5] hover:grayscale-0 transition-all duration-300 md:max-w-[280px] md:mx-auto">
                    {event.imageUrl && (
                      <button
                        type="button"
                        className="relative w-full aspect-[4/5] mb-6 overflow-hidden bg-[#F9F1DA] block cursor-pointer border-0 p-0 text-left"
                        onClick={() => setImageLightbox(imgSrc)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imgSrc} alt={event.title} className="w-full h-full object-cover border-2 border-[#D72333]" />
                      </button>
                    )}
                    <div className="flex flex-col flex-1">
                      <p style={{ fontFamily: "Vollkorn", fontSize: "18px", fontWeight: 600, color: "#D72333", marginBottom: "4px" }}>
                        {event.date}
                      </p>
                      <h3 style={{ fontFamily: "Vollkorn", fontSize: "24px", fontWeight: 800, color: "#D72333", marginBottom: "8px", fontStyle: "italic" }}>
                        {event.title}
                      </h3>
                      {event.description && (
                        <div style={{ fontFamily: "Vollkorn", fontSize: "16px", lineHeight: "1.6", color: "#D72333" }}>
                          <PortableText
                            value={isExpanded ? event.description : shortBlocks(event.description)}
                            components={ptComponents}
                          />
                        </div>
                      )}
                      {isLong(event.description) && (
                        <button
                          type="button"
                          onClick={() => setExpandedEvent(isExpanded ? null : `past-${event.id}`)}
                          style={{ fontFamily: "Vollkorn", fontSize: "16px", fontWeight: 600, color: "#D72333", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: "8px" }}
                        >
                          {isExpanded
                            ? (lang === "de" ? "Weniger anzeigen" : "Show less")
                            : (lang === "de" ? "Vollständiges Programm anzeigen" : "Show full program")}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      </div>

      {/* Bild-Lightbox */}
      {imageLightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 md:px-12"
          onClick={() => setImageLightbox(null)}
        >
          <div className="relative max-w-[85vw] max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageLightbox} alt="" className="max-h-[90vh] w-auto object-contain" />
          </div>
          <button type="button" onClick={() => setImageLightbox(null)} className="absolute top-4 right-4 text-white text-3xl p-2 z-10" aria-label="Close">×</button>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-24 md:-mt-[260px] flex flex-col items-center justify-center py-16 px-6" style={{ backgroundColor: "#D72333" }}>
        <div className="w-[90px] h-[140px] relative mb-8">
          <Image src="/images/assets/engel.svg" alt="phil Engel" fill className="object-contain" unoptimized />
        </div>
        <p style={{ color: "#F9F1DA", textAlign: "center", fontFamily: "Vollkorn", fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 500, lineHeight: "150%" }}>
          2026 phil Cafe &amp; Bookshop. All rights reserved
        </p>
        <div className="flex items-center justify-center gap-[12px] mt-4 flex-wrap opacity-60">
          {([{ id: "imprint" as const, label: "Imprint" }, { id: "privacy" as const, label: "Privacy Policy" }, { id: "terms" as const, label: "Terms & Conditions" }]).map((item, i, arr) => (
            <Fragment key={item.id}>
              <button type="button" onClick={() => setFooterModal(item.id)} className="hover:opacity-80" style={{ color: "#F9F1DA", fontFamily: "Vollkorn", fontSize: "clamp(12px, 1.5vw, 16px)", fontWeight: 400, textDecoration: "underline", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                {item.label}
              </button>
              {i < arr.length - 1 && <span style={{ color: "#F9F1DA", fontFamily: "Vollkorn", fontSize: "clamp(12px, 1.5vw, 16px)" }}>|</span>}
            </Fragment>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center"><InstagramLink /></div>
      </footer>

      <AnmeldungModal isOpen={!!signupModal} onClose={() => setSignupModal(null)} eventTitle={signupModal?.eventTitle ?? ""} eventDate={signupModal?.eventDate ?? ""} />

      {footerModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setFooterModal(null)}>
          <div className="relative w-[min(520px,90vw)] bg-[#D72333] text-[#F9F1DA] px-8 py-10" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setFooterModal(null)} className="absolute right-4 top-4 hover:opacity-80" style={{ fontSize: "28px", fontWeight: 900, background: "none", border: "none", cursor: "pointer", color: "#F9F1DA" }} aria-label="Schließen">×</button>
            {footerModal === "imprint" && (
              <div style={{ fontFamily: "Vollkorn", fontSize: "22px", lineHeight: "150%" }}>
                <div style={{ fontStyle: "italic", fontWeight: 900, marginBottom: "8px" }}>Imprint</div>
                <div><strong>phil Cafe &amp; Bookshop</strong></div>
                <div>Gumpendorfer Straße 10 – 12</div><div>1060 Vienna, Austria</div>
                <div>Phone: 01 581 04 89</div><div>E-Mail: info@phil.info</div>
                <div>Owner: Lewi &amp; Son GmbH</div>
              </div>
            )}
            {footerModal === "privacy" && (
              <div style={{ fontFamily: "Vollkorn", fontSize: "22px", lineHeight: "150%", textAlign: "center" }}>
                <div style={{ fontStyle: "italic", fontWeight: 900, marginBottom: "8px" }}>Privacy Policy</div>
                <div>This website does not collect personal data except for what is necessary to process contact requests. For more information, please contact us at info@phil.info.</div>
              </div>
            )}
            {footerModal === "terms" && (
              <div style={{ fontFamily: "Vollkorn", fontSize: "22px", lineHeight: "150%", textAlign: "center" }}>
                <div style={{ fontStyle: "italic", fontWeight: 900, marginBottom: "8px" }}>Terms &amp; Conditions</div>
                <div>By using this website, you agree to our terms and conditions. For more information, please contact us at info@phil.info.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
