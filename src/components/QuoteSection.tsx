"use client";

import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
import { useLanguage } from "../LanguageContext";

const MENU_ITEMS_DE = [
  { src: "/images/assets/Kaffee.svg", alt: "Kaffee Karte" },
  { src: "/images/assets/fruhstueck.svg", alt: "Frühstück Karte" },
  { src: "/images/assets/snacks.svg", alt: "Snacks Karte" },
  { src: "/images/assets/Wein.svg", alt: "Wein Karte" },
  { src: "/images/assets/Limo.svg", alt: "Limo Karte" },
];

const MENU_ITEMS_EN = [
  { src: "/images/assets/kaffee-en.svg", alt: "Coffee menu" },
  { src: "/images/assets/fruhstueck-en.svg", alt: "Breakfast menu" },
  { src: "/images/assets/snacks-en.svg", alt: "Snacks menu" },
  { src: "/images/assets/wein-en.svg", alt: "Wine menu" },
  { src: "/images/assets/limo-en.svg", alt: "Soft drinks menu" },
];

export function QuoteSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showEventLightbox, setShowEventLightbox] = useState(false);
  const [footerModal, setFooterModal] = useState<"imprint" | "privacy" | "terms" | null>(null);
  const { lang } = useLanguage();
  const menuItems = lang === "de" ? MENU_ITEMS_DE : MENU_ITEMS_EN;

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null || showEventLightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex, showEventLightbox]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % menuItems.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + menuItems.length) % menuItems.length);
    }
  };

  return (
    <>
    {/* Mobile layout: vereinfachte, schmale Version */}
    <section className="block md:hidden px-4 pb-24 max-w-[720px] mx-auto" id="speisekarte">
      {/* Speisekarte-Teaser */}
      <div className="mb-8 mt-2">
        <h2
          className="mb-4 text-center"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "28px",
            fontStyle: "italic",
            fontWeight: 900,
            color: "#D72333",
          }}
        >
          {lang === "de" ? "Unsere Speisekarte" : "Our menu"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="cursor-pointer p-0 border-0 bg-transparent text-left w-full hover:scale-[1.02] transition-transform duration-300"
          >
            <Image
              src={lang === "de" ? "/images/assets/Kaffee.svg" : "/images/assets/kaffee-en.svg"}
              alt={lang === "de" ? "Kaffee Karte" : "Coffee menu"}
              width={400}
              height={600}
              className="w-full h-auto object-contain"
            />
          </button>
          <button
            type="button"
            onClick={() => openLightbox(1)}
            className="cursor-pointer p-0 border-0 bg-transparent text-left w-full hover:scale-[1.02] transition-transform duration-300"
          >
            <Image
              src={lang === "de" ? "/images/assets/fruhstueck.svg" : "/images/assets/fruhstueck-en.svg"}
              alt={lang === "de" ? "Frühstück Karte" : "Breakfast menu"}
              width={400}
              height={600}
              className="w-full h-auto object-contain"
            />
          </button>
          <button
            type="button"
            onClick={() => openLightbox(2)}
            className="cursor-pointer p-0 border-0 bg-transparent text-left w-full hover:scale-[1.02] transition-transform duration-300"
          >
            <Image
              src={lang === "de" ? "/images/assets/snacks.svg" : "/images/assets/snacks-en.svg"}
              alt={lang === "de" ? "Snacks Karte" : "Snacks menu"}
              width={400}
              height={600}
              className="w-full h-auto object-contain"
            />
          </button>
          <button
            type="button"
            onClick={() => openLightbox(3)}
            className="cursor-pointer p-0 border-0 bg-transparent text-left w-full hover:scale-[1.02] transition-transform duration-300"
          >
            <Image
              src={lang === "de" ? "/images/assets/Wein.svg" : "/images/assets/wein-en.svg"}
              alt={lang === "de" ? "Wein Karte" : "Wine menu"}
              width={400}
              height={600}
              className="w-full h-auto object-contain"
            />
          </button>
        </div>
      </div>

      {/* Lewis Carroll Quote & Saltpepper - Mobile */}
      <div className="mb-12 flex flex-col items-center">
        <div
          style={{
            color: "#D72333",
            fontFamily: 'Iosevka, "Courier New", monospace',
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "150%",
            textAlign: "left",
            maxWidth: "100%",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          {lang === "de" ? (
            <>
              <p>
                "Manchmal habe ich schon vor dem Frühstück an sechs unmögliche Dinge geglaubt."
              </p>
              <p style={{ marginTop: "1rem" }}>-Lewis Carroll</p>
            </>
          ) : (
            <>
              <p>
                "Sometimes I've believed as many as six impossible things before breakfast."
              </p>
              <p style={{ marginTop: "1rem" }}>-Lewis Carroll</p>
            </>
          )}
        </div>
        <div className="mt-6">
          <Image
            src="/images/assets/saltpepper 1.svg"
            alt="Salt & Pepper"
            width={150}
            height={150}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Schanigarten Section - Mobile */}
      <div className="mb-16" id="schanigarten">
        <h2
          className="mb-6 text-center"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "28px",
            fontStyle: "italic",
            fontWeight: 900,
            color: "#D72333",
          }}
        >
          {lang === "de" ? "Schanigarten" : "Outdoor seating"}
        </h2>
        {/* Foto mit Bordüre */}
        <div className="relative w-full max-w-[400px] mx-auto aspect-[3/4] mb-8">
          <div className="absolute inset-[12%] overflow-hidden rounded-sm">
            <Image
              src="/images/assets/IMG_5028 1.svg"
              alt="Schanigarten"
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/images/assets/bordüre2.svg"
              alt=""
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
        <p
          className="text-center max-w-[600px] mx-auto"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "150%",
            color: "#D72333",
          }}
        >
          {lang === "de" ? (
            <>
              Genieße Kaffee, Frühstück und Bücher auch draußen in unserem gemütlichen Schanigarten mitten in Wien. Ob Sonne oder Schatten – hier findest du deinen Lieblingsplatz im Freien. Mehr zu{" "}
              <a href="#speisekarte" className="underline">
                unseren Kaffee- und Frühstücksangeboten.
              </a>
            </>
          ) : (
            <>
              Enjoy coffee, breakfast and books outside as well, in our cosy outdoor seating right in the heart of Vienna. Whether you prefer sun or shade – here you'll find your favourite spot in the open air.{" "}
              <a href="#speisekarte" className="underline">
                Learn more about our coffee and breakfast options.
              </a>
            </>
          )}
        </p>
      </div>

      {/* Veranstaltungen Section - Mobile (Weltfrauentag Platzhalter) */}
      <div className="mb-16 relative overflow-hidden rounded-lg bg-[#F9F1DA] px-6 py-8" id="veranstaltungen">
        {/* Disco Ball links neben dem Titel */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-shrink-0">
            <Image
              src="/images/assets/disco 1.svg"
              alt=""
              width={36}
              height={48}
              className="object-contain"
              loading="lazy"
            />
          </div>
          <h2
            className="flex-1 text-left"
              style={{
                fontFamily: "Vollkorn",
                fontSize: "28px",
                fontStyle: "italic",
                fontWeight: 900,
                color: "#D72333",
              }}
            >
            {lang === "de" ? "Unsere nächsten Veranstaltungen" : "Our upcoming events"}
          </h2>
        </div>

        {/* Event-Poster (Weltfrauentag Platzhalter) – auf Mobile nur noch dekorativ, nicht klickbar */}
        <div className="relative w-full max-w-[320px] aspect-[4/5] mx-auto mb-6">
          <Image
            src="/images/assets/veranstaltung_1.jpg"
            alt={lang === "de" ? "Weltfrauentag im phil" : "International Women's Day at phil"}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Beschreibungstext */}
        <p
          className="text-center max-w-[600px] mx-auto mb-4"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "150%",
            color: "#D72333",
          }}
        >
          {lang === "de" ? (
            <>
              Gemeinsamer Abend zum Weltfrauentag im phil – mit Literatur, Gesprächen und einem feministisch geprägten Programm. Weitere Details folgen in Kürze.
            </>
          ) : (
            <>
              A shared evening for International Women's Day at phil – with literature, conversation and a programme shaped by feminist perspectives. Further details coming soon.
            </>
          )}
        </p>

        {/* Button zu allen Veranstaltungen */}
        <div className="mt-4 flex justify-center">
          <a
            href="/events"
            className="inline-flex items-center justify-center px-5 py-2 border-2 border-[#D72333] text-[#D72333] hover:bg-[#D72333] hover:text-[#F9F1DA] transition-colors"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "16px",
              fontStyle: "italic",
              fontWeight: 900,
              whiteSpace: "nowrap",
            }}
          >
            {lang === "de" ? "Alle Veranstaltungen" : "All events"}
          </a>
        </div>
      </div>

      {/* Events & Bar – Mobile */}
      <div className="mb-2" id="events-bar">
        <h2
          className="mb-6 text-center"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "28px",
            fontStyle: "italic",
            fontWeight: 900,
            color: "#D72333",
          }}
        >
          Events &amp; Bar
        </h2>

        {/* Foto mit überlagertem GIF/Video */}
        <div className="relative w-full max-w-[420px] mx-auto aspect-[3/4] mb-10 overflow-hidden rounded-sm">
          <Image
            src="/images/assets/IMG_4843-2 1.svg"
            alt={lang === "de" ? "Events & Bar im phil" : "Events & bar at phil"}
            fill
            className="object-cover"
            loading="lazy"
          />

          {/* Video-GIF unten über das Foto gelegt (größer) */}
          <div className="absolute -bottom-8 right-0 w-[80%] shadow-lg overflow-hidden">
          <video
            src="/images/assets/events-diashow-website.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          />
        </div>
        </div>

        {/* Textblöcke */}
        <div className="max-w-[600px] mx-auto space-y-8 text-[#D72333]">
          {/* Events Block */}
          <div>
            <h3
              className="mb-2"
              style={{
                fontFamily: "Vollkorn",
                fontSize: "22px",
                fontStyle: "italic",
                fontWeight: 900,
              }}
            >
              {lang === "de" ? "Events" : "Events"}
            </h3>
            <p
              style={{
                fontFamily: "Vollkorn",
                fontSize: "16px",
                lineHeight: "150%",
              }}
            >
              {lang === "de" ? (
                <>
                  Im phil findest du alles philhältig: Lesungen, Buchpräsentationen und DJ-Sets. Unser Programm reicht von literarischen Highlights über spannende Buchpräsentationen bis hin zu elektrisierenden DJ-Sets. Folge uns auf{" "}
                  <a href="https://www.instagram.com/philcafe" target="_blank" rel="noreferrer" className="underline">
                    Instagram
                  </a>{" "}
                  oder kontaktiere uns direkt{" "}
                  <a href="/events" className="underline">
                    hier
                  </a>
                  .
                </>
              ) : (
                <>
                  At phil you’ll find everything that makes our programme so very “phil”: readings, book launches and DJ sets. Our line‑up ranges from literary highlights and exciting book presentations to electrifying DJ nights. Follow us on{" "}
                  <a href="https://www.instagram.com/philcafe" target="_blank" rel="noreferrer" className="underline">
                    Instagram
                  </a>{" "}
                  or get in touch with us{" "}
                  <a href="/events" className="underline">
                    here
                  </a>
                  .
                </>
              )}
            </p>
          </div>

          {/* Bar Block */}
          <div>
            <h3
              className="mb-2"
              style={{
                fontFamily: "Vollkorn",
                fontSize: "22px",
                fontStyle: "italic",
                fontWeight: 900,
              }}
            >
              {lang === "de" ? "Bar" : "Bar"}
            </h3>
            <p
              style={{
                fontFamily: "Vollkorn",
                fontSize: "16px",
                lineHeight: "150%",
              }}
            >
              {lang === "de"
                ? "Am Abend verwandelt sich unser Café-Buchhandel in eine gemütliche Bar, in der im Diskokugelschein und bei sanften Beats auch Longdrinks und Espresso Martini geschlürft werden können."
                : "In the evenings our café‑bookshop turns into a cosy bar where, under the disco ball and to gentle beats, you can sip long drinks and espresso martinis."}
            </p>
          </div>
        </div>
      </div>

      {/* Reservierungen + Adresse/Öffnungszeiten – Mobile Version */}
      <section className="mt-12 mb-20" id="kontakt">
        {/* Lampe + Besuch-uns-Button */}
        <div className="flex flex-col items-center mb-10">
          <div className="mb-4">
            <Image
              src="/images/assets/lamp2 1.svg"
              alt={lang === "de" ? "Lampe" : "Lamp"}
              width={140}
              height={210}
              className="object-contain"
              unoptimized
            />
          </div>
          <a
            href="https://maps.app.goo.gl/pV95cu8bmQELWfgS8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border-[3px] border-[#D72333] px-6 py-2 transition-colors duration-200 hover:bg-[#D72333] group"
          >
            <span
              className="text-[#D72333] group-hover:text-[#F9F1DA] transition-colors duration-200"
              style={{
                fontFamily: "Vollkorn",
                fontSize: "18px",
                fontStyle: "italic",
                fontWeight: 900,
                lineHeight: "150%",
              }}
            >
              {lang === "de" ? "Besuch uns" : "Visit us"}
            </span>
          </a>
        </div>

        {/* Reservierungen Text */}
        <div className="mb-10 px-2">
          <h3
            className="mb-3"
            style={{
              color: "#D72333",
              fontFamily: "Vollkorn",
              fontSize: "20px",
              fontStyle: "italic",
              fontWeight: 900,
              lineHeight: "150%",
            }}
          >
            {lang === "de" ? "Reservierungen" : "Reservations"}
          </h3>
          <p
            style={{
              color: "#D72333",
              fontFamily: "Vollkorn",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "150%",
            }}
          >
            {lang === "de"
              ? "Grundsätzlich brauchst du bei uns keine Reservierung – komm einfach vorbei und genieße deinen Aufenthalt!"
              : "In most cases you don’t need a reservation – just drop by and enjoy your time with us."}
          </p>
        </div>

        {/* Adresse & Öffnungszeiten Karten */}
        <div className="space-y-6">
          {/* Adresse */}
          <div
            className="px-6 py-6"
            style={{
              backgroundColor: "#D72333",
            }}
          >
            <h3
              className="mb-3"
              style={{
                color: "#F9F1DA",
                fontFamily: "Vollkorn",
                fontSize: "22px",
                fontStyle: "italic",
                fontWeight: 900,
                lineHeight: "150%",
              }}
            >
              {lang === "de" ? "Adresse" : "Address"}
            </h3>
            <div
              style={{
                color: "#F9F1DA",
                fontFamily: "Vollkorn",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "150%",
              }}
            >
              <p>Gumpendorfer Straße 10 – 12</p>
              <p>1060 Wien, {lang === "de" ? "Österreich" : "Austria"}</p>
              <p>01 581 04 89</p>
              <p>
                <a href="mailto:info@phil.info">info@phil.info</a>
              </p>
            </div>
          </div>

          {/* Öffnungszeiten */}
          <div
            className="px-6 py-6"
            style={{
              backgroundColor: "#D72333",
            }}
          >
            <h3
              className="mb-3"
              style={{
                color: "#F9F1DA",
                fontFamily: "Vollkorn",
                fontSize: "22px",
                fontStyle: "italic",
                fontWeight: 900,
                lineHeight: "150%",
              }}
            >
              {lang === "de" ? "Öffnungszeiten" : "Opening hours"}
            </h3>
            <div
              style={{
                color: "#F9F1DA",
                fontFamily: "Vollkorn",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "150%",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: "24px",
              }}
            >
              <span>{lang === "de" ? "Mo:" : "Mon:"}</span>
              <span>14:00 – 21:00</span>
              <span>{lang === "de" ? "Di – Do:" : "Tue – Thu:"}</span>
              <span>9:00 – 22:00</span>
              <span>{lang === "de" ? "Fr – Sa:" : "Fri – Sat:"}</span>
              <span>9:00 – 23:00</span>
              <span>{lang === "de" ? "So:" : "Sun:"}</span>
              <span>9:00 – 21:00</span>
            </div>
          </div>
        </div>
      </section>

      {/* Willkommen-Section – Bildrahmen, Zuckerstreuer & Text (Mobile Version) */}
      <section className="mt-10 mb-1 flex flex-col items-center">
        {/* Bildrahmen */}
        <div className="mb-6">
          <Image
            src="/images/assets/bild 1.svg"
            alt={lang === "de" ? "Person mit Büchern" : "Person with books"}
            width={260}
            height={330}
            className="object-contain"
            loading="lazy"
          />
        </div>

        {/* Zuckerstreuer, mit moderatem Abstand unter dem Bild */}
        <div className="mt-6 mb-8">
          <Image
            src="/images/assets/sugar 1.svg"
            alt={lang === "de" ? "Zuckerstreuer" : "Sugar dispenser"}
            width={140}
            height={220}
            className="object-contain -rotate-12"
            unoptimized
          />
        </div>

        {/* Willkommen-Text – mit kompaktem Abstand zum Zuckerstreuer */}
        <p
          className="text-center px-6 mt-4"
          style={{
            color: "#D72333",
            fontFamily: "Vollkorn",
            fontSize: "18px",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: "150%",
          }}
        >
          {lang === "de"
            ? "Das Team phil heißt dich herzlich willkommen!"
            : "The phil team is happy to welcome you!"}
        </p>
      </section>
    </section>

    {/* Lightbox Overlay - funktioniert auf Mobile und Desktop */}
    {lightboxIndex !== null && (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={closeLightbox}
      >
        <button
          onClick={prevImage}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors p-2 z-10 rounded-full hover:bg-white/10"
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div
          className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={menuItems[lightboxIndex].src}
            alt={menuItems[lightboxIndex].alt}
            width={558}
            height={793}
            className="object-contain max-h-[85vh] w-auto bg-[#F8F7F6]"
            unoptimized
          />
        </div>
        <button
          onClick={nextImage}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors p-2 z-10 rounded-full hover:bg-white/10"
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 text-white hover:text-primary text-3xl p-2 z-10"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    )}

    {/* Footer Modal Overlay – jetzt auch auf Mobile sichtbar */}
    {footerModal && (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={() => setFooterModal(null)}
      >
        <div
          className="relative w-[90%] max-w-[520px] bg-[#D72333] text-[#F9F1DA] px-6 md:px-8 py-8 md:py-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setFooterModal(null)}
            className="absolute right-4 top-4 text-[#F9F1DA] transition-colors duration-200"
            style={{ fontSize: "28px", fontWeight: 900 }}
            aria-label="Close"
          >
            ×
          </button>

          {footerModal === "imprint" && (
            <div
              style={{
                fontFamily: "Vollkorn",
                fontSize: "18px",
                lineHeight: "150%",
              }}
            >
              <div style={{ fontStyle: "italic", fontWeight: 900, marginBottom: "8px" }}>
                Imprint
              </div>
              <div>phil Cafe &amp; Bookshop</div>
              <div>Gumpendorfer Straße 10 – 12</div>
              <div>1060 Vienna, Austria</div>
              <div>Phone: 01 581 04 89</div>
              <div>E-Mail: info@phil.info</div>
              <div>Owner: Lewi &amp; Son GmbH</div>
            </div>
          )}

          {footerModal === "privacy" && (
            <div
              style={{
                fontFamily: "Vollkorn",
                fontSize: "18px",
                lineHeight: "150%",
                textAlign: "center",
              }}
            >
              <div style={{ fontStyle: "italic", fontWeight: 900, marginBottom: "8px" }}>
                Privacy Policy
              </div>
              <div>
                This website does not collect personal data except for what is necessary to
                process contact requests. For more information, please contact us at
                info@phil.info.
              </div>
            </div>
          )}

          {footerModal === "terms" && (
            <div
              style={{
                fontFamily: "Vollkorn",
                fontSize: "18px",
                lineHeight: "150%",
                textAlign: "center",
              }}
            >
              <div style={{ fontStyle: "italic", fontWeight: 900, marginBottom: "8px" }}>
                Terms &amp; Conditions
              </div>
              <div>
                By using this website, you agree to our terms and conditions. For more
                information, please contact us at info@phil.info.
              </div>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Desktop-Layout: ursprüngliche, absolut positionierte Version */}
    <section className="hidden md:block relative w-full" style={{ minHeight: '15000px' }}>
      {/* Quote container */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '2653px' }}>
        <div 
          className="absolute"
          style={{
            display: 'flex',
            width: '567px',
            height: '292px',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#D72333',
            fontFamily: 'Iosevka, "Courier New", monospace',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: '150%',
            left: '751px',
            top: '0px',
          }}
        >
          {lang === 'de' ? (
            <>
              <p>
                "Wie andere in den Park oder in den Wald, lief ich immer ins Kaffehaus, um mich abzulenken und zu beruhigen, mein -ganzes Leben."
              </p>
              <p style={{ marginTop: '1rem' }}>
                -Thomas Bernhard
              </p>
            </>
          ) : (
            <>
              <p>
                "While others went to the park or into the woods, I always went to the coffeehouse to distract and calm myself – my whole life."
              </p>
              <p style={{ marginTop: '1rem' }}>
                -Thomas Bernhard
              </p>
            </>
          )}
        </div>
      </div>

      {/* Cup 1 image - decorative element */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '2971px' }}>
        <div 
          className="absolute"
          style={{
            width: '234px',
            height: '191px',
            left: '230px',
            top: '0px',
            transform: 'rotate(10deg)',
            transformOrigin: 'center center',
          }}
        >
          <Image
            src="/images/assets/cup 1.svg"
            alt="Cup"
            width={234}
            height={191}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Analog cafe video - animated element */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '3057px' }}>
        <div 
          className="absolute"
          style={{
            width: '623px',
            height: '392px',
            left: '647px',
            top: '0px',
          }}
        >
          <video
            src="/images/assets/analog-cafe-giff.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>

      {/* IMG_4905 1 image */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '3492px' }}>
        <div 
          className="absolute"
          style={{
            width: '479px',
            height: '571px',
            left: '181px',
            top: '0px',
          }}
        >
          <Image
            src="/images/assets/IMG_4905 1.jpg"
            alt=""
            width={479}
            height={571}
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* "Bücher" Heading */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '3505px' }}>
        <div 
          className="absolute"
          style={{
            display: 'flex',
            width: '561px',
            height: '147px',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#D72333',
            fontFamily: 'Vollkorn',
            fontSize: '35px',
            fontStyle: 'italic',
            fontWeight: 900,
            lineHeight: '150%',
            left: '715px',
            top: '0px',
          }}
        >
          {lang === 'de' ? 'Bücher' : 'Books'}
        </div>
      </div>

      {/* I91A2497 1 image */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '3670px' }}>
        <div 
          className="absolute"
          style={{
            width: '589px',
            height: '393px',
            left: '701px',
            top: '0px',
          }}
        >
          <Image
            src="/images/assets/I91A2497 1.jpg"
            alt=""
            width={589}
            height={393}
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Text block: Bücherwelt */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '3960px' }}>
        <div 
          className="absolute"
          style={{
            display: 'flex',
            width: '590px',
            height: '465px',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#D72333',
            fontFamily: 'Vollkorn',
            fontSize: '23px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '150%',
            left: '700px',
            top: '0px',
          }}
        >
          {lang === 'de' ? (
            <p>
              In unserem Café findest du mehr als 4.000 Bücher – eine sorgsam ausgewählte Sammlung, die manchmal etwas außergewöhnlich und schräg sein mag, aber auf jeden Fall sehr besonders ist. Stöber durch unsere Regale, entdecke verborgene Schätze oder erfahre <a href="/bucher" className="underline">hier mehr</a> über unsere Bücherwelt.
            </p>
          ) : (
            <p>
              In our café you’ll find more than 4,000 books – a carefully curated collection that may at times be a little unusual or quirky, but is always something special. Browse our shelves, discover hidden treasures or learn <a href="/bucher" className="underline">more here</a> about our world of books.
            </p>
          )}
        </div>
      </div>

      {/* Second Quote: Cicero */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '4098px' }}>
        <div 
          className="absolute"
          style={{
            display: 'flex',
            width: '479px',
            height: '170px',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#D72333',
            fontFamily: 'Iosevka, "Courier New", monospace',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: '150%',
            left: '181px',
            top: '0px',
          }}
        >
          {lang === 'de' ? (
            <>
              <p>
                "Ein Raum ohne Bücher ist wie ein Körper ohne Seele."
              </p>
              <p style={{ marginTop: '1rem' }}>
                -Marcus Tullius Cicero
              </p>
            </>
          ) : (
            <>
              <p>
                "A room without books is like a body without a soul."
              </p>
              <p style={{ marginTop: '1rem' }}>
                -Marcus Tullius Cicero
              </p>
            </>
          )}
        </div>
      </div>

      {/* Monstera 1 image */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '4425px' }}>
        <div 
          className="absolute"
          style={{
            width: '162px',
            height: '199px',
            left: '218px',
            top: '0px',
          }}
        >
          <Image
            src="/images/assets/monstera 1.svg"
            alt=""
            width={162}
            height={199}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Books1 1 image */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '4495px' }}>
        <div 
          className="absolute"
          style={{
            width: '222px',
            height: '194px',
            left: '309px',
            top: '0px',
          }}
        >
          <Image
            src="/images/assets/books1 1.svg"
            alt=""
            width={222}
            height={194}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* "Entdecke unsere Bücherwelt" Heading */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '4426px' }}>
        <a 
          href="/bucher"
          className="absolute transition-colors duration-300 text-[#D72333] hover:bg-[#D72333] hover:text-[#f9f1da] cursor-pointer"
          style={{
            display: 'flex',
            width: 'fit-content',
            padding: '15px 40px',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Vollkorn',
            fontSize: '25px',
            fontStyle: 'italic',
            fontWeight: 900,
            lineHeight: '150%',
            left: '803.5px', // Centered based on original position
            top: '0px',
            transform: 'translateX(-50%)',
            border: '3px solid #D72333',
            whiteSpace: 'nowrap',
          }}
        >
          {lang === "de" ? "Entdecke unsere Bücherwelt" : "Discover our world of books"}
        </a>
      </div>

      {/* Cursor 1 image */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '4512px' }}>
        <div 
          className="absolute"
          style={{
            width: '59px',
            height: '111px',
            left: '1031px',
            top: '0px',
            transform: 'rotate(10deg)', // Adjusted to point to button (upper left)
            transformOrigin: 'center center',
          }}
        >
          <Image
            src="/images/assets/cursor 1.svg"
            alt=""
            width={59}
            height={111}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* "Unsere Speisekarte" Heading */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '4737px' }}>
        <div 
          className="absolute"
          style={{
            display: 'flex',
            width: '561px',
            height: '147px',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#D72333',
            textAlign: 'center',
            fontFamily: 'Vollkorn',
            fontSize: '35px',
            fontStyle: 'italic',
            fontWeight: 900,
            lineHeight: '150%',
            left: '449px',
            top: '0px',
          }}
        >
          {lang === "de" ? "Unsere Speisekarte" : "Our menu"}
        </div>
      </div>

      {/* Speisekarte Image (Left) */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '4900px' }}>
        <div 
          className="absolute"
          style={{
            width: '558px',
            height: '793px',
            left: '132px',
            top: '0px',
          }}
        >
          <Image
            src={lang === "de" ? "/images/assets/Kaffee.svg" : "/images/assets/kaffee-en.svg"}
            alt={lang === "de" ? "Kaffee Karte" : "Coffee menu"}
            width={558}
            height={793}
            className="object-contain cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            unoptimized
            onClick={() => openLightbox(0)}
          />
        </div>

        {/* Frühstück Image (Right) */}
        <div 
          className="absolute"
          style={{
            width: '558px',
            height: '793px',
            left: '750px',
            top: '0px',
          }}
        >
          <Image
            src={lang === "de" ? "/images/assets/fruhstueck.svg" : "/images/assets/fruhstueck-en.svg"}
            alt={lang === "de" ? "Frühstück Karte" : "Breakfast menu"}
            width={558}
            height={793}
            className="object-contain cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            unoptimized
            onClick={() => openLightbox(1)}
          />
        </div>
      </div>

      {/* Row 2: Snacks & Wein */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '5753px' }}>
        {/* Snacks Image (Left) */}
        <div 
          className="absolute"
          style={{
            width: '558px',
            height: '793px',
            left: '132px',
            top: '0px',
          }}
        >
          <Image
            src={lang === "de" ? "/images/assets/snacks.svg" : "/images/assets/snacks-en.svg"}
            alt={lang === "de" ? "Snacks Karte" : "Snacks menu"}
            width={558}
            height={793}
            className="object-contain cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            unoptimized
            onClick={() => openLightbox(2)}
          />
        </div>

        {/* Wein Image (Right) */}
        <div 
          className="absolute"
          style={{
            width: '558px',
            height: '793px',
            left: '750px',
            top: '0px',
          }}
        >
          <Image
            src={lang === "de" ? "/images/assets/Wein.svg" : "/images/assets/wein-en.svg"}
            alt={lang === "de" ? "Wein Karte" : "Wine menu"}
            width={558}
            height={793}
            className="object-contain cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            unoptimized
            onClick={() => openLightbox(3)}
          />
        </div>
      </div>

        {/* Row 3: Limo & Quote */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '6606px' }}>
        {/* Limo Image (Left) */}
        <div 
          className="absolute"
          style={{
            width: '558px',
            height: '793px',
            left: '132px',
            top: '0px',
          }}
        >
          <Image
            src={lang === "de" ? "/images/assets/Limo.svg" : "/images/assets/limo-en.svg"}
            alt={lang === "de" ? "Limo Karte" : "Soft drinks menu"}
            width={558}
            height={793}
            className="object-contain cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            unoptimized
            onClick={() => openLightbox(4)}
          />
        </div>

        {/* Quote & Saltpepper (Right) */}
        <div 
          className="absolute"
          style={{
            width: '558px',
            height: '793px',
            left: '750px',
            top: '0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ 
            color: '#D72333', 
            fontFamily: 'Vollkorn', 
            fontSize: '20px', 
            fontStyle: 'normal', 
            fontWeight: 500,
            marginBottom: '40px',
            width: '400px'
          }}>
            {lang === "de" ? (
              <>
                <p>
                  "Manchmal habe ich schon vor dem Frühstück an sechs unmögliche Dinge geglaubt."
                </p>
                <p style={{ marginTop: '1rem' }}>
                  -Lewis Carroll
                </p>
              </>
            ) : (
              <>
                <p>
                  "Sometimes I've believed as many as six impossible things before breakfast."
                </p>
                <p style={{ marginTop: '1rem' }}>
                  -Lewis Carroll
                </p>
              </>
            )}
          </div>

          <Image
            src="/images/assets/saltpepper 1.svg"
            alt="Salt & Pepper"
            width={200}
            height={200}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Schanigarten Section */}
      
      {/* Heading: Schanigarten */}
      <div id="schanigarten" className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '7546px' }}>
        <div 
          className="absolute"
          style={{
            display: 'flex',
            width: '561px',
            height: '147px',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#D72333',
            textAlign: 'center',
            fontFamily: 'Vollkorn',
            fontSize: '35px',
            fontStyle: 'italic',
            fontWeight: 900,
            lineHeight: '150%',
            left: '50%', // Centered
            top: '0px',
            transform: 'translateX(-50%)',
          }}
        >
          {lang === "de" ? "Schanigarten" : "Outdoor seating"}
        </div>
      </div>


      {/* Bordüre 2 */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '7636px', zIndex: 1 }}>
        <div 
          className="absolute"
          style={{
            width: '674px', 
            height: '860px', 
            left: '377px', // Centered relative to image (was 557)
            top: '0px',
          }}
        >
          <Image
            src="/images/assets/bordüre2.svg"
            alt="Bordüre"
            width={674}
            height={860}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Schanigarten Image (IMG_5028 1) */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '7719px', zIndex: 10 }}>
        <div 
          className="absolute"
          style={{
            width: '456px', 
            height: '685px', 
            left: '486px',
            top: '0px',
          }}
        >
          <Image
            src="/images/assets/IMG_5028 1.svg"
            alt="Schanigarten"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Text: Genieße Kaffee... */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '8417px' }}>
        <div 
          className="absolute"
          style={{
            display: 'flex',
            width: '679px',
            height: '339px',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#D72333',
            fontFamily: 'Vollkorn',
            fontSize: '23px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '150%',
            left: '420px',
            top: '0px',
            textAlign: 'left',
            letterSpacing: '-0.6px',
          }}
        >
          {lang === "de" ? (
            <>
              Genieße Kaffee, Frühstück und Bücher auch draußen in unserem gemütlichen Schanigarten mitten in Wien. Ob Sonne oder Schatten – hier findest du deinen Lieblingsplatz im Freien. Mehr zu&nbsp;unseren&nbsp;
              <a href="#speisekarte" className="underline">
                Kaffee- und Frühstücksangeboten.
              </a>
            </>
          ) : (
            <>
              Enjoy coffee, breakfast and books outside as well, in our cosy outdoor seating right in the heart of Vienna. Whether you prefer sun or shade – here you’ll find your favourite spot in the open air.{" "}
              <a href="#speisekarte" className="underline">
                Learn more about our coffee and breakfast options.
              </a>
            </>
          )}
        </div>
      </div>

      {/* Veranstaltungen Heading */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '8800px' }}>
        <div 
          className="absolute"
          style={{
            display: 'flex',
            width: '698px',
            height: '147px',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#D72333',
            textAlign: 'center',
            fontFamily: 'Vollkorn',
            fontSize: '35px',
            fontStyle: 'italic',
            fontWeight: 900,
            lineHeight: '150%',
            left: '50%',
            top: '0px',
            transform: 'translateX(-50%)',
          }}
        >
          {lang === "de" ? "Unsere nächsten Veranstaltungen" : "Our upcoming events"}
        </div>
      </div>

      {/* Disco Ball Image */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '8950px' }}>
        <div 
          className="absolute"
          style={{
            width: '214px', 
            height: '304px', 
            left: '100px',
            top: '0px',
          }}
        >
          <Image
            src="/images/assets/disco 1.svg"
            alt="Disco Kugel"
            width={214}
            height={304}
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Single Event Image */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '9050px', zIndex: 10 }}>
        <div 
          className="absolute cursor-pointer transition-transform duration-300 hover:scale-105"
          style={{
            width: '400px', 
            height: '500px',
            left: '50%',
            top: '0px',
            transform: 'translateX(-50%)', // Removed rotation
          }}
          onClick={() => setShowEventLightbox(true)}
        >
           <Image
            src="/images/assets/veranstaltung_1.jpg"
            alt={lang === "de" ? "Weltfrauentag im phil" : "International Women's Day at phil"}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Arrow pointing to Event */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '9300px' }}>
        <div 
          className="absolute"
          style={{
            width: '356px', 
            height: '383px', 
            left: '200px',
            top: '0px',
          }}
        >
          <Image
            src="/images/assets/pfeil 1.svg"
            alt="Pfeil"
            width={356}
            height={383}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* "aktuelle Veranstaltung" Text */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '9700px' }}>
        <div 
          className="absolute"
          style={{
            width: '324px',
            height: '66px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#D72333',
            fontFamily: 'Vollkorn',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '150%',
            left: '200px', // Aligned with arrow
            top: '0px',
          }}
        >
          {lang === "de" ? "aktuelle Veranstaltung" : "Current event"}
        </div>
      </div>

      {/* Anmeldung Button */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '9700px' }}>
        <a 
          href="/events"
          className="absolute transition-colors duration-300 text-[#D72333] hover:bg-[#D72333] hover:text-[#f9f1da] cursor-pointer"
          style={{
            display: 'flex',
            width: 'fit-content',
            padding: '15px 40px',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Vollkorn',
            fontSize: '25px',
            fontStyle: 'italic',
            fontWeight: 900,
            lineHeight: '150%',
            left: '900px', // Estimated position (right side)
            top: '0px',
            transform: 'translateX(-50%)',
            border: '3px solid #D72333',
            whiteSpace: 'nowrap',
          }}
        >
          {lang === "de" ? "Anmeldung" : "Register"}
        </a>
      </div>

      {/* Events & Bar Section */}
      
      {/* Heading: Events & Bar */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '10000px' }}>
        <div 
          className="absolute"
          style={{
            width: '100%',
            textAlign: 'center',
            color: '#D72333',
            fontFamily: 'Vollkorn',
            fontSize: '35px',
            fontStyle: 'italic',
            fontWeight: 900,
            left: '0px',
            top: '0px',
          }}
        >
          Events & Bar
        </div>
      </div>

      {/* Main Image (IMG_4843-2 1.svg) */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '10150px' }}>
        <div 
          className="absolute"
          style={{
            width: '759px',
            height: '1074px',
            left: '100px',
            top: '0px',
          }}
        >
          <Image
            src="/images/assets/IMG_4843-2 1.svg"
            alt="Events & Bar Atmosphere"
            width={759}
            height={1074}
            className="object-contain"
            unoptimized
          />
          
          {/* Text Container: Events & Bar */}
          <div style={{
            position: 'absolute',
            left: '40px',
            top: '600px', // Moved much further down (was 350px/bottom-aligned)
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px', // Much smaller gap between text boxes
          }}>
            {/* Events Block */}
            <div>
              <h3 style={{
                color: '#D72333',
                fontFamily: 'Vollkorn',
                fontSize: '30px',
                fontStyle: 'italic',
                fontWeight: 900,
                marginBottom: '10px',
              }}>
                {lang === 'de' ? 'Events' : 'Events'}
              </h3>
              <p style={{
                color: '#f9f1da',
                fontFamily: 'Vollkorn',
                fontSize: '18px',
                lineHeight: '1.4',
              }}>
                {lang === 'de' ? (
                  <>
                    Im phil findest du alles philhältig: Lesungen, Buchpräsentationen und DJ-Sets. Unser Programm reicht von literarischen Highlights über spannende Buchpräsentationen bis hin zu elektrisierenden DJ-Sets. Folge uns auf{" "}
                    <a href="#" className="underline">Instagram</a> oder kontaktiere uns direkt{" "}
                    <a href="#" className="underline">hier</a>.
                  </>
                ) : (
                  <>
                    At phil you’ll find everything that makes our programme so very “phil”: readings, book launches and DJ sets. Our line‑up ranges from literary highlights and exciting book presentations to electrifying DJ nights. Follow us on{" "}
                    <a href="#" className="underline">Instagram</a> or get in touch with us{" "}
                    <a href="#" className="underline">here</a>.
                  </>
                )}
              </p>
            </div>

            {/* Bar Block */}
            <div>
              <h3 style={{
                color: '#D72333',
                fontFamily: 'Vollkorn',
                fontSize: '30px',
                fontStyle: 'italic',
                fontWeight: 900,
                marginBottom: '10px',
              }}>
                {lang === 'de' ? 'Bar' : 'Bar'}
              </h3>
              <p style={{
                color: '#f9f1da',
                fontFamily: 'Vollkorn',
                fontSize: '18px',
                lineHeight: '1.4',
              }}>
                {lang === 'de'
                  ? 'Am Abend verwandelt sich unser Café-Buchhandel in eine gemütliche Bar, in der im Diskokugelschein und bei sanften Beats auch Longdrinks und Espresso Martini geschlürft werden können.'
                  : 'In the evenings our café‑bookshop turns into a cosy bar where, under the disco ball and to gentle beats, you can sip long drinks and espresso martinis.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video (Overlapping) */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '10550px', zIndex: 20 }}>
        <div 
          className="absolute"
          style={{
            width: '623px',
            height: '392px',
            left: '790px',
            top: '0px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)', // Shadow for separation
          }}
        >
          <video
            src="/images/assets/events-diashow-website.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      {/* Quote Right */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '11000px' }}>
        <div 
          className="absolute"
          style={{
            width: '400px',
            left: '930px',
            top: '0px',
            color: '#D72333',
            fontFamily: 'Vollkorn',
            fontSize: '20px',
          }}
        >
          {lang === 'de' ? (
            <>
              <p className="italic font-medium">
                „Ich meine nicht, dass es mir etwas ausmachen würde, reich und berühmt zu sein ... Ich möchte immer noch ich selbst sein, wenn ich eines schönen Morgens aufwache und bei Tiffany's frühstücke.“
              </p>
              <p style={{ marginTop: '1rem' }}>
                -Truman Capote
              </p>
            </>
          ) : (
            <>
              <p className="italic font-medium">
                “It’s not that I mind being rich and famous … I just want to still be myself when I wake up some fine morning and have breakfast at Tiffany’s.”
              </p>
              <p style={{ marginTop: '1rem' }}>
                -Truman Capote
              </p>
            </>
          )}
        </div>
      </div>

      {/* Mirror Image */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '11350px' }}>
        <div 
          className="absolute"
          style={{
            width: '290px',
            height: '338px',
            left: '100px',
            top: '0px',
            transform: 'rotate(3.65deg)',
          }}
        >
          <Image
            src="/images/assets/mirror1 1.svg"
            alt="Mirror"
            width={290}
            height={338}
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Reviews Section */}
      
      {/* Heading */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '12000px' }}>
        <div 
          className="absolute"
          style={{
            width: '100%',
            textAlign: 'center',
            color: '#D72333',
            fontFamily: 'Vollkorn',
            fontSize: '35px',
            fontStyle: 'italic',
            fontWeight: 900,
            left: '0px',
            top: '0px',
          }}
        >
          {lang === 'de' ? 'Was andere über uns sagen' : 'What others say about us'}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '12150px' }}>
        {/* Row 1 */}
        <div className="absolute left-[100px] flex gap-[30px]">
          {/* Box 1 */}
          <a 
            href="https://www.wien.info/de/essen-trinken/cafes/phil-355232"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center border-[5px] border-[#D72333] p-6 w-[380px] h-[180px] text-center cursor-pointer transition-colors duration-300 hover:bg-[#D72333] group"
          >
            <h3 className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300 mb-2" style={{ fontFamily: 'Vollkorn', fontSize: '25px', fontStyle: 'italic', fontWeight: 900, lineHeight: '150%' }}>wien.info</h3>
            <p className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300" style={{ fontFamily: 'Vollkorn', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: '150%' }}>Kaffee und Bücher im "phil"</p>
          </a>
          {/* Box 2 */}
          <a 
            href="https://www.diefruehstueckerinnen.at/wien/phil/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center border-[5px] border-[#D72333] p-6 w-[380px] h-[180px] text-center cursor-pointer transition-colors duration-300 hover:bg-[#D72333] group"
          >
            <h3 className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300 mb-2" style={{ fontFamily: 'Vollkorn', fontSize: '25px', fontStyle: 'italic', fontWeight: 900, lineHeight: '150%' }}>Die Frühstückerinnen</h3>
            <p className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300" style={{ fontFamily: 'Vollkorn', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: '150%' }}>Frühstück im phil, 1060 Wien</p>
          </a>
          {/* Box 3 */}
          <a 
            href="https://www.falter.at/lokal/5631/phil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center border-[5px] border-[#D72333] p-6 w-[380px] h-[180px] text-center cursor-pointer transition-colors duration-300 hover:bg-[#D72333] group"
          >
            <h3 className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300 mb-2" style={{ fontFamily: 'Vollkorn', fontSize: '25px', fontStyle: 'italic', fontWeight: 900, lineHeight: '150%' }}>Falter</h3>
            <p className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300" style={{ fontFamily: 'Vollkorn', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: '150%' }}>Lokalprofil auf Falter.at</p>
          </a>
        </div>

        {/* Row 2 */}
        <div className="absolute left-[100px] top-[210px] flex gap-[30px]">
          {/* Box 4 */}
          <a 
            href="https://lokalfuehrer.stadtbekannt.at/restaurants/phil-cafe/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center border-[5px] border-[#D72333] p-6 w-[380px] h-[180px] text-center cursor-pointer transition-colors duration-300 hover:bg-[#D72333] group"
          >
            <h3 className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300 mb-2" style={{ fontFamily: 'Vollkorn', fontSize: '25px', fontStyle: 'italic', fontWeight: 900, lineHeight: '150%' }}>Stadtbekannt.at</h3>
            <p className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300" style={{ fontFamily: 'Vollkorn', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: '150%' }}>phil - Cafe, Bar, Buchgeschäft<br/>& Frühstückslokal</p>
          </a>
          {/* Box 5 */}
          <a 
            href="https://www.falstaff.com/at/cafes/phil"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex flex-col items-center justify-center border-[5px] border-[#D72333] p-6 w-[380px] h-[180px] text-center cursor-pointer transition-colors duration-300 hover:bg-[#D72333] group"
          >
            <h3 className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300 mb-2" style={{ fontFamily: 'Vollkorn', fontSize: '25px', fontStyle: 'italic', fontWeight: 900, lineHeight: '150%' }}>Falstaff</h3>
            <p className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300" style={{ fontFamily: 'Vollkorn', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: '150%' }}>phil in Wien -<br/>Falstaff Cafeguide</p>
            
            {/* Cursor */}
            <div className="absolute -right-[160px] bottom-[0px] w-[100px] h-[100px]">
               <Image
                src="/images/assets/cursor 2.svg"
                alt="Cursor"
                width={100}
                height={100}
                className="object-contain"
                unoptimized
              />
            </div>
          </a>
        </div>

        {/* Row 3 */}
        <div className="absolute left-[100px] top-[420px] flex gap-[30px]">
          {/* Box 6 */}
          <a 
            href="https://www.1000thingsmagazine.com/de/a/2668/wiener-buechercafes/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center border-[5px] border-[#D72333] p-6 w-[380px] h-[180px] text-center cursor-pointer transition-colors duration-300 hover:bg-[#D72333] group"
          >
            <h3 className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300 mb-2" style={{ fontFamily: 'Vollkorn', fontSize: '25px', fontStyle: 'italic', fontWeight: 900, lineHeight: '150%' }}>1000things</h3>
            <p className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300" style={{ fontFamily: 'Vollkorn', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: '150%' }}>8 gemütliche Büchercafés<br/>in Wien</p>
          </a>
          {/* Box 7 */}
          <a 
            href="https://www.1000thingsmagazine.com/de/a/5240/die-besten-cafes-sechster-bezirk/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center border-[5px] border-[#D72333] p-6 w-[380px] h-[180px] text-center cursor-pointer transition-colors duration-300 hover:bg-[#D72333] group"
          >
            <h3 className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300 mb-2" style={{ fontFamily: 'Vollkorn', fontSize: '25px', fontStyle: 'italic', fontWeight: 900, lineHeight: '150%' }}>1000things</h3>
            <p className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300" style={{ fontFamily: 'Vollkorn', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: '150%' }}>Unsere liebsten Cafés<br/>im 6. Bezirk</p>
          </a>
        </div>
      </div>

      {/* Reservations Section */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '13000px' }}>
        
        {/* Lamp Image */}
        <div className="absolute left-[380px] top-[0px] w-[200px] h-[300px]">
          <Image
            src="/images/assets/lamp2 1.svg"
            alt="Lampe"
            width={200}
            height={300}
            className="object-contain"
            unoptimized
          />
        </div>

        {/* Besuch uns Button */}
        <a
          href="https://maps.app.goo.gl/pV95cu8bmQELWfgS8"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-1/2 -translate-x-1/2 top-[50px] flex items-center justify-center border-[5px] border-[#D72333] px-8 py-4 cursor-pointer transition-colors duration-300 hover:bg-[#D72333] group"
        >
          <span 
            className="text-[#D72333] group-hover:text-[#f9f1da] transition-colors duration-300"
            style={{
              // color removed here to allow hover override
              textAlign: 'center',
              fontFamily: 'Vollkorn',
              fontSize: '25px',
              fontStyle: 'italic',
              fontWeight: 900,
              lineHeight: '150%',
            }}
          >
            {lang === 'de' ? 'Besuch uns' : 'Visit us'}
          </span>
        </a>

        {/* Content Container */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[320px] w-[600px] text-left">
          <h3 
            className="mb-4"
            style={{
              color: '#D72333',
              fontFamily: 'Vollkorn',
              fontSize: '25px',
              fontStyle: 'italic',
              fontWeight: 900,
              lineHeight: '150%',
            }}
          >
            {lang === 'de' ? 'Reservierungen' : 'Reservations'}
          </h3>
          <p 
            style={{
              color: '#D72333',
              fontFamily: 'Vollkorn',
              fontSize: '23px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '150%',
            }}
          >
            {lang === 'de'
              ? 'Grundsätzlich brauchst du bei uns keine Reservierung – komm einfach vorbei und genieße deinen Aufenthalt!'
              : 'In most cases you don’t need a reservation – just drop by and enjoy your time with us.'}
          </p>
        </div>

      </div>

      {/* Info Section (Footer) */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '13600px' }}>
        <div className="flex justify-center gap-[60px]">
          
          {/* Box 1: Adresse */}
          <div 
            style={{
              width: '510px',
              height: '293px',
              backgroundColor: '#D72333',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '408px' }}>
              <h3 style={{
                color: '#F9F1DA',
                fontFamily: 'Vollkorn',
                fontSize: '30px',
                fontStyle: 'italic',
                fontWeight: 900,
                lineHeight: '150%',
                marginBottom: '20px', // Increased margin
                textAlign: 'left', // Force left
              }}>
                {lang === 'de' ? 'Adresse' : 'Address'}
              </h3>
              <div style={{
                color: '#F9F1DA',
                fontFamily: 'Vollkorn',
                fontSize: '30px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '150%',
                textAlign: 'left', // Force left
              }}>
                <p>Gumpendorfer Straße 10 – 12</p>
                <p>1060 Wien, {lang === 'de' ? 'Österreich' : 'Austria'}</p>
                <p>01 581 04 89</p>
                <p><a href="mailto:info@phil.info">info@phil.info</a></p>
              </div>
            </div>
          </div>

          {/* Box 2: Öffnungszeiten */}
          <div 
            style={{
              width: '510px',
              height: '293px',
              backgroundColor: '#D72333',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '408px' }}>
              <h3 style={{
                color: '#F9F1DA',
                fontFamily: 'Vollkorn',
                fontSize: '30px',
                fontStyle: 'italic',
                fontWeight: 900,
                lineHeight: '150%',
                marginBottom: '20px', // Increased margin
                textAlign: 'left', // Force left
              }}>
                {lang === 'de' ? 'Öffnungszeiten' : 'Opening hours'}
              </h3>
              <div style={{
                color: '#F9F1DA',
                fontFamily: 'Vollkorn',
                fontSize: '30px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '150%',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '0px 40px', // Adjusted gap (larger col gap)
                textAlign: 'left', // Force left
              }}>
                <span>{lang === 'de' ? 'Mo:' : 'Mon:'}</span><span>14:00 – 21:00</span>
                <span>{lang === 'de' ? 'Di – Do:' : 'Tue – Thu:'}</span><span>9:00 – 22:00</span>
                <span>{lang === 'de' ? 'Fr – Sa:' : 'Fri – Sat:'}</span><span>9:00 – 23:00</span>
                <span>{lang === 'de' ? 'So:' : 'Sun:'}</span><span>9:00 – 21:00</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Welcome Section */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '14200px' }}>
        
        {/* Picture Frame */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[0px] w-[300px] h-[375px]">
          <Image
            src="/images/assets/bild 1.svg"
            alt="Bild"
            width={300}
            height={375}
            className="object-contain"
            loading="lazy"
          />
        </div>

        {/* Sugar Dispenser (Overlapping) */}
        <div className="absolute left-[450px] top-[250px] w-[200px] h-[333px]">
          <Image
            src="/images/assets/sugar 1.svg"
            alt="Zucker"
            width={200}
            height={333}
            className="object-contain transform -rotate-12"
            unoptimized
          />
        </div>

        {/* Welcome Text */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[680px] w-full text-center">
          <p style={{
            color: '#D72333',
            fontFamily: 'Vollkorn',
            fontSize: '23px',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: '150%',
          }}>
            {lang === 'de'
              ? 'Das Team phil heißt dich herzlich willkommen!'
              : 'The phil team is happy to welcome you!'}
          </p>
        </div>

      </div>

      {/* Sieve Image (Bottom Left) */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]" style={{ top: '11450px', zIndex: 10 }}>
        <div 
          className="absolute"
          style={{
            width: '252px', // Estimated
            height: '252px',
            left: '230px', // Moved Right to overlap edge
            top: '0px',
          }}
        >
          <Image
            src="/images/assets/sieb 1.svg"
            alt="Sieb"
            width={252}
            height={252}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

    </section>

    {/* Footer - außerhalb des section Elements, gleicher Stil wie Unterseiten */}
    <footer
      className="mt-4 flex flex-col items-center justify-center py-16 px-6"
      style={{ backgroundColor: "#D72333" }}
    >
      <div className="w-[90px] h-[140px] relative mb-8">
        <Image
          src="/images/assets/engel.svg"
          alt="phil Engel"
          fill
          className="object-contain"
          unoptimized
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
            unoptimized
          />
        </a>
      </div>
    </footer>
    </>
  );
}
