"use client";

import Image from "next/image";
import { OpenStatus } from "@/components/OpenStatus";
import * as gtag from "@/lib/gtag";

const MAPS_URL = "https://maps.app.goo.gl/pV95cu8bmQELWfgS8";

function trackDirections() {
  gtag.event({ action: "click", category: "breakfast_page", label: "get_directions" });
}

const HOURS = [
  ["Monday", "2:00 PM – 9:00 PM"],
  ["Tue – Thu", "9:00 AM – 10:00 PM"],
  ["Fri – Sat", "9:00 AM – 11:00 PM"],
  ["Sunday", "9:00 AM – 9:00 PM"],
] as const;

const PHOTOS = [
  { src: "/images/assets/1_Lokal.webp", alt: "café phil interior" },
  { src: "/images/assets/2_Spiegel.webp", alt: "café phil mirror wall" },
  { src: "/images/assets/6_Bedienung.webp", alt: "café phil service" },
  { src: "/images/assets/schanigarten.webp", alt: "café phil Schanigarten" },
];

const PRICES = [
  ["Breakfast plate (egg, toast, butter, jam)", "from €9"],
  ["Coffee (espresso / cappuccino)", "from €3.20"],
  ["Filter coffee", "from €3.50"],
  ["Fresh juice", "from €4"],
] as const;

const REVIEWS = [
  {
    quote:
      "One of the best breakfast spots in Vienna. The vibe is unmatched – books everywhere, great coffee.",
    author: "Die Frühstückerinnen",
  },
  {
    quote: "A true Viennese gem. Come for the coffee, stay for the books.",
    author: "Falstaff Cafeguide",
  },
  {
    quote: "Phil is the kind of place you stumble upon and return to every trip.",
    author: "wien.info",
  },
];

// TODO: Replace with real Google Reviews from your Business Profile
const GOOGLE_REVIEWS = [
  {
    initials: "SM",
    name: "Sarah M.",
    flag: "🇬🇧",
    rating: 5,
    text: "Best breakfast spot in Vienna. Books everywhere, great coffee, unmatched vibe.",
    avatarBg: "#E8F0FE",
    avatarColor: "#1a73e8",
  },
  {
    initials: "TK",
    name: "Thomas K.",
    flag: "🇩🇪",
    rating: 5,
    text: "Came for coffee, stayed two hours. A true Viennese gem.",
    avatarBg: "#E6F4EA",
    avatarColor: "#34a853",
  },
  {
    initials: "EL",
    name: "Emma L.",
    flag: "🇺🇸",
    rating: 5,
    text: "Stumbled upon phil by accident – highlight of our Vienna trip.",
    avatarBg: "#FEF7E0",
    avatarColor: "#f9ab00",
  },
];

function GoogleReviewsCard() {
  return (
    <div className="px-4 max-w-lg mx-auto md:max-w-2xl -mt-6 relative z-20 pb-2">
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
          overflow: "hidden",
        }}
      >
        {/* Rating overview */}
        <div
          className="flex items-center gap-4 px-5 py-4"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          <span style={{ fontSize: "40px", fontWeight: 700, color: "#1a1a1a", lineHeight: 1, fontFamily: "Vollkorn" }}>
            4.6
          </span>
          <div>
            <div style={{ color: "#F4B400", fontSize: "18px", letterSpacing: "2px" }}>
              ★★★★<span style={{ opacity: 0.35 }}>★</span>
            </div>
            <a
              href="https://maps.google.com/?cid=your-cid"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "13px", color: "#1a73e8", fontFamily: "Vollkorn", display: "block" }}
            >
              3,778 reviews on Google
            </a>
            <div style={{ fontSize: "12px", color: "#777", fontFamily: "Vollkorn" }}>
              Google Business Profile · verified
            </div>
          </div>
        </div>

        {/* Individual reviews */}
        {GOOGLE_REVIEWS.map((r, i) => (
          <div
            key={r.name}
            className="flex gap-3 px-5 py-3"
            style={{
              borderBottom: i < GOOGLE_REVIEWS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : undefined,
            }}
          >
            {/* Avatar */}
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-full"
              style={{
                width: 36,
                height: 36,
                background: r.avatarBg,
                color: r.avatarColor,
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: "Vollkorn",
              }}
            >
              {r.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-0.5">
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", fontFamily: "Vollkorn" }}>
                  {r.name}
                </span>
                <span style={{ fontSize: "13px" }}>{r.flag}</span>
              </div>
              <div style={{ color: "#F4B400", fontSize: "12px", letterSpacing: "1px", marginBottom: "2px" }}>
                {"★".repeat(r.rating)}
              </div>
              <p style={{ fontSize: "13px", color: "#444", fontFamily: "Vollkorn", lineHeight: 1.5, margin: 0 }}>
                &ldquo;{r.text}&rdquo;
              </p>
            </div>
          </div>
        ))}

        {/* See all link */}
        <div className="px-5 py-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "13px",
              color: "#1a73e8",
              fontFamily: "Vollkorn",
              fontWeight: 600,
            }}
          >
            See all 3,778 reviews on Google →
          </a>
        </div>
      </div>
    </div>
  );
}

function IconBreakfast() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#D72333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function IconCoffee() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#D72333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#D72333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

const SERVE_CARDS = [
  {
    icon: <IconBreakfast />,
    title: "Breakfast all day",
    text: "Eggs, toast, müsli, pastries – served from opening until close. Regional & organic.",
  },
  {
    icon: <IconCoffee />,
    title: "Specialty coffee",
    text: "Espresso, cappuccino, flat white, filter. Austrian roasters.",
  },
  {
    icon: <IconBook />,
    title: "4,000 books",
    text: "Browse while you eat. Curated selection, English titles included.",
  },
];

export function BreakfastContent() {
  return (
    <main
      data-page="breakfast"
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#F9F1DA" }}
    >
      {/* Hide the global site header for this standalone landing page */}
      <style>{`
        html:has([data-page="breakfast"]) header { display: none !important; }
      `}</style>

      {/* ─── A · Sticky Mobile Header ─────────────────────────────────── */}
      <div
        className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{
          background: "#F9F1DA",
          borderBottom: "1px solid rgba(215,35,51,0.2)",
        }}
      >
        <span
          style={{
            fontFamily: "Vollkorn",
            fontSize: "22px",
            fontStyle: "italic",
            fontWeight: 900,
            color: "#D72333",
          }}
        >
          phil
        </span>
        <a
          href={MAPS_URL}
          onClick={trackDirections}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "14px",
            fontWeight: 600,
            color: "#D72333",
          }}
        >
          Get directions →
        </a>
      </div>

      {/* ─── B · Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center"
        style={{ minHeight: "88vh" }}
      >
        <Image
          src="/images/assets/1_Lokal.webp"
          alt="café phil Vienna – cozy interior with books and coffee"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(20,10,5,0.54)" }}
        />
        <div className="relative z-10 flex flex-col items-center gap-5 px-6 max-w-2xl mx-auto w-full">
          <h1
            style={{
              fontFamily: "Vollkorn",
              fontSize: "clamp(46px, 9vw, 82px)",
              fontStyle: "italic",
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#fff",
            }}
          >
            Breakfast in Vienna
          </h1>
          <p
            style={{
              fontFamily: "Vollkorn",
              fontSize: "clamp(15px, 2.5vw, 20px)",
              fontWeight: 500,
              color: "#F9F1DA",
              letterSpacing: "0.06em",
            }}
          >
            Coffee · Food · Books · Walk-ins welcome
          </p>
          <OpenStatus />
          <a
            href={MAPS_URL}
            onClick={trackDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block transition-opacity hover:opacity-85 active:opacity-70"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "18px",
              fontWeight: 700,
              color: "#F9F1DA",
              background: "#D72333",
              borderRadius: "2px",
              padding: "12px 32px",
            }}
          >
            Get directions →
          </a>
        </div>
      </section>

      {/* ─── Google Reviews Card ──────────────────────────────────────── */}
      <GoogleReviewsCard />

      {/* ─── C · Hours & Address ──────────────────────────────────────── */}
      <section className="px-4 py-10 max-w-lg mx-auto md:max-w-2xl">
        <div
          className="p-6 md:p-8"
          style={{
            background: "#fff",
            border: "1.5px solid #D72333",
            borderRadius: "2px",
          }}
        >
          <h2
            className="mb-3"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "22px",
              fontStyle: "italic",
              fontWeight: 900,
              color: "#D72333",
            }}
          >
            Find us
          </h2>
          <div
            className="mb-5"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "17px",
              color: "#573B30",
              lineHeight: 1.6,
            }}
          >
            <div style={{ fontWeight: 700 }}>
              Gumpendorfer Str. 10–12, 1060 Wien
            </div>
            <div style={{ opacity: 0.65, fontSize: "15px" }}>
              6th district · ~10 min walk from Naschmarkt
            </div>
          </div>
          <table className="w-full" style={{ fontFamily: "Vollkorn", fontSize: "16px", color: "#573B30" }}>
            <tbody>
              {HOURS.map(([day, time]) => (
                <tr key={day}>
                  <td className="py-1 pr-6" style={{ fontWeight: 700, width: "120px" }}>
                    {day}
                  </td>
                  <td className="py-1">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="mt-4"
            style={{ fontFamily: "Vollkorn", fontSize: "15px", color: "#573B30", opacity: 0.65 }}
          >
            Phone: +43 1 581 04 89
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <a
            href={MAPS_URL}
            onClick={trackDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 text-center transition-opacity hover:opacity-85 active:opacity-70"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "16px",
              fontWeight: 700,
              color: "#F9F1DA",
              background: "#D72333",
              borderRadius: "2px",
            }}
          >
            Open in Maps
          </a>
          <a
            href="tel:+431581048"
            className="flex-1 py-3 text-center transition-opacity hover:opacity-85 active:opacity-70"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "16px",
              fontWeight: 700,
              color: "#D72333",
              background: "transparent",
              border: "1.5px solid #D72333",
              borderRadius: "2px",
            }}
          >
            Call us
          </a>
        </div>
      </section>

      {/* ─── D · What we serve ────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: "rgba(255,255,255,0.45)" }}>
        <h2
          className="text-center mb-8"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "clamp(28px, 5vw, 40px)",
            fontStyle: "italic",
            fontWeight: 900,
            color: "#D72333",
          }}
        >
          What we serve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {SERVE_CARDS.map(({ icon, title, text }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-6"
              style={{
                background: "#F9F1DA",
                border: "1.5px solid #D72333",
                borderRadius: "2px",
              }}
            >
              <div className="mb-4">{icon}</div>
              <h3
                className="mb-2"
                style={{
                  fontFamily: "Vollkorn",
                  fontSize: "20px",
                  fontStyle: "italic",
                  fontWeight: 900,
                  color: "#D72333",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: "Vollkorn",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#573B30",
                  lineHeight: 1.65,
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── E · Photo Grid ───────────────────────────────────────────── */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {PHOTOS.map(({ src, alt }) => (
            <div key={src} className="relative aspect-square overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── F · Prices ───────────────────────────────────────────────── */}
      <section className="px-4 py-12 max-w-lg mx-auto md:max-w-2xl">
        <h2
          className="mb-6"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "clamp(28px, 5vw, 40px)",
            fontStyle: "italic",
            fontWeight: 900,
            color: "#D72333",
          }}
        >
          Prices
        </h2>
        <div className="space-y-0">
          {PRICES.map(([item, price]) => (
            <div
              key={item}
              className="flex items-baseline justify-between gap-4 py-3"
              style={{ borderBottom: "1px solid rgba(215,35,51,0.2)" }}
            >
              <span
                style={{
                  fontFamily: "Vollkorn",
                  fontSize: "17px",
                  fontWeight: 500,
                  color: "#573B30",
                }}
              >
                {item}
              </span>
              <span
                style={{
                  fontFamily: "Vollkorn",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#D72333",
                  whiteSpace: "nowrap",
                }}
              >
                {price}
              </span>
            </div>
          ))}
        </div>
        <p
          className="mt-4"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "14px",
            fontStyle: "italic",
            color: "#573B30",
            opacity: 0.65,
          }}
        >
          Full menu available on-site. Card payments accepted.
        </p>
      </section>

      {/* ─── G · Reviews ──────────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: "rgba(255,255,255,0.45)" }}>
        <h2
          className="text-center mb-8"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "clamp(28px, 5vw, 40px)",
            fontStyle: "italic",
            fontWeight: 900,
            color: "#D72333",
          }}
        >
          What people say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {REVIEWS.map(({ quote, author }) => (
            <div
              key={author}
              className="p-6"
              style={{
                background: "#F9F1DA",
                border: "1.5px solid #D72333",
                borderRadius: "2px",
              }}
            >
              <p
                className="mb-3"
                style={{
                  fontFamily: "Vollkorn",
                  fontSize: "16px",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#573B30",
                  lineHeight: 1.7,
                }}
              >
                &ldquo;{quote}&rdquo;
              </p>
              <p
                style={{
                  fontFamily: "Vollkorn",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#D72333",
                }}
              >
                – {author}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── H · CTA Banner ───────────────────────────────────────────── */}
      <section
        className="px-6 py-16 text-center"
        style={{ background: "#573B30" }}
      >
        <p
          className="mb-3"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "clamp(44px, 9vw, 76px)",
            fontStyle: "italic",
            fontWeight: 900,
            color: "#F9F1DA",
            lineHeight: 1.1,
          }}
        >
          Just show up.
        </p>
        <p
          className="mb-8"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            fontWeight: 500,
            color: "#F9F1DA",
            opacity: 0.8,
          }}
        >
          No reservations needed. Walk-ins always welcome.
        </p>
        <a
          href={MAPS_URL}
          onClick={trackDirections}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block transition-opacity hover:opacity-85 active:opacity-70"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "18px",
            fontWeight: 700,
            color: "#573B30",
            background: "#F9F1DA",
            borderRadius: "2px",
            padding: "12px 32px",
          }}
        >
          Find us on Maps →
        </a>
      </section>

      {/* ─── I · Footer ───────────────────────────────────────────────── */}
      <footer
        className="px-4 py-8 text-center"
        style={{ background: "#D72333" }}
      >
        <p
          style={{
            fontFamily: "Vollkorn",
            fontSize: "15px",
            fontWeight: 500,
            color: "#F9F1DA",
            lineHeight: 1.9,
          }}
        >
          café phil · Gumpendorfer Str. 10–12 · 1060 Wien · Austria
          <br />
          © 2026 phil Cafe &amp; Bookshop
        </p>
        <a
          href="https://cafephil.at"
          className="inline-block mt-3 underline transition-opacity hover:opacity-75"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "14px",
            color: "#F9F1DA",
            opacity: 0.8,
          }}
        >
          Back to cafephil.at →
        </a>
      </footer>
    </main>
  );
}
