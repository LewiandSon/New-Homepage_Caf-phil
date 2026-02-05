"use client";

import { Header } from "@/components/Header";
import { AnmeldungModal } from "@/components/AnmeldungModal";
import Image from "next/image";
import { useState, Fragment } from "react";
import { useLanguage } from "../../LanguageContext";

type EventItem = {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  signupLink: string;
  status: string;
};

const UPCOMING_EVENTS_DE: EventItem[] = [
  {
    date: "09.03.2026, 19:00 Uhr",
    title: "Weltfrauentag im phil",
    description:
      "Gemeinsamer Abend zum Weltfrauentag im phil – mit Literatur, Gesprächen und einem feministisch geprägten Programm. Weitere Details folgen in Kürze.",
    imageUrl: "/images/assets/veranstaltung_1.jpg",
    signupLink: "nein",
    status: "Aktiv",
  },
];

const UPCOMING_EVENTS_EN: EventItem[] = [
  {
    date: "09.03.2026, 19:00",
    title: "International Women’s Day at phil",
    description:
      "A shared evening for International Women’s Day at phil – with literature, conversation and a programme shaped by feminist perspectives. Further details coming soon.",
    imageUrl: "/images/assets/veranstaltung_1.jpg",
    signupLink: "nein",
    status: "Aktiv",
  },
];

const PAST_EVENTS_DE: EventItem[] = [
  {
    date: "27.11.2025, 19:00 Uhr",
    title: "Lesung mit Gertraud Klemm",
    description: "Wir freuen uns auf einen spannenden Abend: Gertraud Klemm stellt ihre neue, kraftvolle Streitschrift »Abschied vom Phallozän« bei uns vor. Sei dabei!",
    imageUrl: "/images/events/klemm-cover.jpg",
    signupLink: "nein",
    status: "Aktiv",
  },
  {
    date: "18.09.2025, 19:00 Uhr",
    title: "Spoken Word Abend",
    description: "FIKTION ALS REVOLUTION Gedichte, Kurzgeschichten, Performance – alles, was ihr mit Worten ausdrücken könnt und in zehn Minuten Platz findet. Außerdem Musik, Getränke und viele tolle Literaturliebhaber:innen.",
    imageUrl: "/images/events/spoken_word.jpg",
    signupLink: "nein",
    status: "Aktiv",
  },
  {
    date: "25.08.2025, 10:00 Uhr",
    title: "Bücherflohmarkt",
    description: "Am Montag, den 25. August ab 10 Uhr, verwandelt sich das phil in ein Bücherparadies! Ob neu, gebraucht oder alt – stöbere dich durch eine bunte Auswahl an Büchern zum Schnäppchenpreis. Und nicht nur Bücher: auch DVDs mit tollen Filmen und CDs mit feiner Musik warten auf dich.",
    imageUrl: "/images/events/bücherflohmarkt.png",
    signupLink: "nein",
    status: "Aktiv",
  },
];

const PAST_EVENTS_EN: EventItem[] = [
  {
    date: "27.11.2025, 19:00",
    title: "Reading with Gertraud Klemm",
    description:
      "We’re looking forward to an exciting evening: Gertraud Klemm presents her powerful new polemic »Farewell to the Phallocene« here at phil. Come join us!",
    imageUrl: "/images/events/klemm-cover.jpg",
    signupLink: "nein",
    status: "Aktiv",
  },
  {
    date: "18.09.2025, 19:00",
    title: "Spoken Word Night",
    description:
      "FICTION AS REVOLUTION – poetry, short stories, performance – anything you can express with words and fit into ten minutes. Plus music, drinks and plenty of fellow lovers of literature.",
    imageUrl: "/images/events/spoken_word.jpg",
    signupLink: "nein",
    status: "Aktiv",
  },
  {
    date: "25.08.2025, 10:00",
    title: "Book flea market",
    description:
      "On Monday 25 August from 10 a.m., phil turns into a book paradise! Whether new, second‑hand or well‑loved – browse your way through a colourful selection of books at bargain prices. And it’s not just books: DVDs with great films and CDs full of fine music are waiting for you as well.",
    imageUrl: "/images/events/bücherflohmarkt.png",
    signupLink: "nein",
    status: "Aktiv",
  },
];

export default function EventsPage() {
  const { lang } = useLanguage();
  const upcomingEvents = lang === "de" ? UPCOMING_EVENTS_DE : UPCOMING_EVENTS_EN;
  const pastEvents = lang === "de" ? PAST_EVENTS_DE : PAST_EVENTS_EN;
  const [signupModal, setSignupModal] = useState<{ eventTitle: string; eventDate: string } | null>(null);
  const [footerModal, setFooterModal] = useState<"imprint" | "privacy" | "terms" | null>(null);

  return (
    <main className="relative min-h-screen bg-[#F9F1DA] text-[#D72333] font-serif pt-[150px]">
      <Header />

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
          {lang === "de" ? "Unsere nächsten Veranstaltungen" : "Our upcoming events"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {upcomingEvents.map((event, idx) => {
            const [datePartRaw, timePartRaw] = event.date.split(",");
            const datePart = (datePartRaw || event.date).trim();
            const timePart = timePartRaw?.trim() || "";
            const dateTimeLabel = timePart ? `${datePart}, ${timePart}` : datePart;
            const imgSrc =
              event.imageUrl?.startsWith("http") || event.imageUrl?.startsWith("/")
                ? event.imageUrl
                : "/" + (event.imageUrl || "images/assets/veranstaltung_1.jpg");
            const signupAktiv = event.signupLink?.trim().toLowerCase() === "ja";
            const signupGeschlossen = event.signupLink?.trim().toLowerCase() === "geschlossen";

            return (
              <div
                key={`upcoming-${event.title}-${event.date}-${idx}`}
                className="flex flex-col"
              >
                <div
                  className="relative w-full aspect-[4/5] mb-6 border-[3px] border-[#D72333]"
                  aria-hidden="true"
                />
                <div className="flex flex-col flex-1">
                  <p
                    style={{
                      fontFamily: "Vollkorn",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#573B30",
                      marginBottom: "4px",
                    }}
                  >
                    {dateTimeLabel}
                  </p>
                  <h2
                    style={{
                      fontFamily: "Vollkorn",
                      fontSize: "24px",
                      fontWeight: 800,
                      color: "#D72333",
                      marginBottom: "8px",
                      fontStyle: "italic"
                    }}
                  >
                    {event.title}
                  </h2>
                  <div
                    style={{
                      fontFamily: "Vollkorn",
                      fontSize: "16px",
                      lineHeight: "1.6",
                      color: "#573B30",
                      marginBottom: "20px"
                    }}
                    dangerouslySetInnerHTML={{ __html: event.description || "" }}
                  />
                </div>

                {signupAktiv && (
                  <button
                    type="button"
                    onClick={() =>
                      setSignupModal({ eventTitle: event.title, eventDate: event.date })
                    }
                    className="transition-all duration-200 w-fit"
                    style={{
                      padding: "14px 32px",
                      fontFamily: "Vollkorn",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#D72333",
                      backgroundColor: "#F9F1DA",
                      border: "2px solid #D72333",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#D72333";
                      e.currentTarget.style.color = "#F9F1DA";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#F9F1DA";
                      e.currentTarget.style.color = "#D72333";
                    }}
                  >
                    Anmelden
                  </button>
                )}
                {signupGeschlossen && (
                  <p
                    style={{
                      padding: "14px 32px",
                      fontFamily: "Vollkorn",
                      fontSize: "15px",
                      color: "#d9534f",
                      fontWeight: 700,
                    }}
                  >
                    Anmeldung geschlossen
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <>
            <h2
              className="text-center mb-12"
              style={{
                fontFamily: "Vollkorn",
                fontSize: "clamp(28px, 4vw, 35px)",
                fontStyle: "italic",
                fontWeight: 900,
                lineHeight: "150%",
                color: "#D72333",
                marginTop: "48px",
              }}
            >
              {lang === "de" ? "Vergangene Veranstaltungen" : "Past events"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-70">
              {pastEvents.map((event, idx) => {
                const [datePartRaw, timePartRaw] = event.date.split(",");
                const datePart = (datePartRaw || event.date).trim();
                const timePart = timePartRaw?.trim() || "";
                const dateTimeLabel = timePart ? `${datePart}, ${timePart}` : datePart;
                const imgSrc =
                  event.imageUrl?.startsWith("http") || event.imageUrl?.startsWith("/")
                    ? event.imageUrl
                    : "/" + (event.imageUrl || "images/assets/veranstaltung_1.jpg");

                return (
                  <div
                    key={`past-${event.title}-${event.date}-${idx}`}
                    className="flex flex-col grayscale-[0.5] hover:grayscale-0 transition-all duration-300"
                  >
                    <div className="relative w-full aspect-[4/5] mb-6">
                      <Image
                        src={imgSrc}
                        alt={event.title}
                        fill
                        className="object-contain"
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        onError={(e) => {
                          (e.target as HTMLImageElement).onerror = null;
                          (e.target as HTMLImageElement).src = "/images/assets/veranstaltung_1.jpg";
                        }}
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <p
                        style={{
                          fontFamily: "Vollkorn",
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "#573B30",
                          marginBottom: "4px",
                        }}
                      >
                        {dateTimeLabel}
                      </p>
                      <h3
                        style={{
                          fontFamily: "Vollkorn",
                          fontSize: "24px",
                          fontWeight: 800,
                          color: "#D72333",
                          marginBottom: "8px",
                          fontStyle: "italic"
                        }}
                      >
                        {event.title}
                      </h3>
                      <div
                        style={{
                          fontFamily: "Vollkorn",
                          fontSize: "16px",
                          lineHeight: "1.6",
                          color: "#573B30",
                        }}
                        dangerouslySetInnerHTML={{ __html: event.description || "" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {upcomingEvents.length === 0 && pastEvents.length === 0 && (
          <p
            className="text-center py-12"
            style={{ fontFamily: "Vollkorn", fontSize: "18px", color: "#573B30" }}
          >
            Derzeit sind keine Veranstaltungen geplant. Schau bald wieder vorbei!
          </p>
        )}

      </div>

      {/* Footer */}
      <footer
        className="mt-24 flex flex-col items-center justify-center py-16 px-6"
        style={{ backgroundColor: "#D72333" }}
      >
          <div className="w-[90px] h-[140px] relative mb-8">
            <Image
              src="/images/assets/engel.svg"
              alt="phil Engel"
              fill
              className="object-contain"
            />
          </div>
          <p
            style={{
              color: "#F9F1DA",
              textAlign: "center",
              fontFamily: "Vollkorn",
              fontSize: "clamp(14px, 2vw, 18px)",
              fontWeight: 500,
              lineHeight: "150%",
            }}
          >
            2026 phil Cafe &amp; Bookshop. All rights reserved
          </p>
          {/* Legal Links - klein, im Hintergrund */}
          <div className="flex items-center justify-center gap-[12px] mt-4 flex-wrap opacity-60">
            {[
              { id: "imprint" as const, label: "Imprint" },
              { id: "privacy" as const, label: "Privacy Policy" },
              { id: "terms" as const, label: "Terms & Conditions" },
            ].map((item, i, arr) => (
              <Fragment key={item.id}>
                <button
                  type="button"
                  onClick={() => setFooterModal(item.id)}
                  style={{
                    color: "#F9F1DA",
                    fontFamily: "Vollkorn",
                    fontSize: "clamp(12px, 1.5vw, 16px)",
                    fontWeight: 400,
                    textDecoration: "underline",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </button>
                {i < arr.length - 1 && (
                  <span style={{ color: "#F9F1DA", fontFamily: "Vollkorn", fontSize: "clamp(12px, 1.5vw, 16px)" }}>|</span>
                )}
              </Fragment>
            ))}
          </div>
          {/* Instagram - größer, prominent */}
          <div className="mt-12 flex flex-col items-center">
            <a
              href="https://www.instagram.com/phil.in.wien/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram: phil.in.wien"
              className="block w-[300px] h-[120px] relative"
            >
              <Image
                src="/images/assets/instagram 1.svg"
                alt="Folge uns auf Instagram"
                fill
                className="object-contain"
              />
            </a>
          </div>
        </footer>

      <AnmeldungModal
        isOpen={!!signupModal}
        onClose={() => setSignupModal(null)}
        eventTitle={signupModal?.eventTitle ?? ""}
        eventDate={signupModal?.eventDate ?? ""}
      />

      {/* Footer Legal Modal */}
      {footerModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setFooterModal(null)}
        >
          <div
            className="relative w-[min(520px,90vw)] bg-[#D72333] text-[#F9F1DA] px-8 py-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setFooterModal(null)}
              className="absolute right-4 top-4 text-[#F9F1DA] hover:opacity-80"
              style={{ fontSize: "28px", fontWeight: 900, background: "none", border: "none", cursor: "pointer" }}
              aria-label="Schließen"
            >
              ×
            </button>
            {footerModal === "imprint" && (
              <div style={{ fontFamily: "Vollkorn", fontSize: "22px", lineHeight: "150%" }}>
                <div style={{ fontStyle: "italic", fontWeight: 900, marginBottom: "8px" }}>Imprint</div>
                <div>phil Cafe &amp; Bookshop</div>
                <div>Gumpendorfer Straße 10 – 12</div>
                <div>1060 Vienna, Austria</div>
                <div>Phone: 01 581 04 89</div>
                <div>E-Mail: info@phil.info</div>
                <div>Owner: Lewi &amp; Son GmbH</div>
              </div>
            )}
            {footerModal === "privacy" && (
              <div style={{ fontFamily: "Vollkorn", fontSize: "22px", lineHeight: "150%", textAlign: "center" }}>
                <div style={{ fontStyle: "italic", fontWeight: 900, marginBottom: "8px" }}>Privacy Policy</div>
                <div>
                  This website does not collect personal data except for what is necessary to process contact
                  requests. For more information, please contact us at info@phil.info.
                </div>
              </div>
            )}
            {footerModal === "terms" && (
              <div style={{ fontFamily: "Vollkorn", fontSize: "22px", lineHeight: "150%", textAlign: "center" }}>
                <div style={{ fontStyle: "italic", fontWeight: 900, marginBottom: "8px" }}>Terms &amp; Conditions</div>
                <div>
                  By using this website, you agree to our terms and conditions. For more information, please
                  contact us at info@phil.info.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
