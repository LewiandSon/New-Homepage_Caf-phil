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
  { src: "/images/assets/phil-interior.jpg",    alt: "café phil – the full interior",          wide: true, position: "right center" },
  { src: "/images/assets/breakfast-spread.jpg", alt: "phil breakfast spread" },
  { src: "/images/assets/phil-good.jpg",        alt: "phil good – falafel, hummus, sourdough" },
  { src: "/images/assets/phil-drinks.jpg",      alt: "drinks at café phil" },
  { src: "/images/assets/schanigarten.webp",    alt: "café phil Schanigarten" },
  { src: "/images/assets/coffee-cake.jpg",      alt: "coffee and cake at phil" },
  { src: "/images/assets/1_Lokal.webp",         alt: "café phil interior" },
];

const PRICES = [
  ["Breakfast (phil good & more)", "from €13"],
  ["Coffee (espresso / cappuccino / flat white)", "from €3.10"],
  ["Fresh juice", "from €3.50"],
  ["Cakes", "from €4.50"],
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
    initials: "S",
    name: "Sarah M.",
    meta: "3 reviews · 8 photos",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "Best breakfast spot in Vienna. Books everywhere, great coffee, unmatched vibe.",
    scores: { Food: "5/5", Service: "5/5", Atmosphere: "5/5" },
    avatarBg: "#E8F0FE",
    avatarColor: "#1a73e8",
  },
  {
    initials: "T",
    name: "Thomas K.",
    meta: "12 reviews · 4 photos",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Came for coffee, stayed two hours. A true Viennese gem. The book selection is wonderful.",
    scores: { Food: "5/5", Service: "5/5", Atmosphere: "5/5" },
    avatarBg: "#FCE8E6",
    avatarColor: "#EA4335",
  },
  {
    initials: "E",
    name: "Emma L.",
    meta: "6 reviews · 10 photos",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Stumbled upon phil by accident – highlight of our Vienna trip. Will be back next time.",
    scores: { Food: "5/5", Service: "5/5", Atmosphere: "5/5" },
    avatarBg: "#E6F4EA",
    avatarColor: "#34a853",
  },
];

// Google "G" logo as inline SVG
function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-label="Google">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function GoogleReviewsCard() {
  return (
    <div className="px-4 max-w-lg mx-auto md:max-w-2xl -mt-6 relative z-20 pb-2">
      <div
        style={{
          background: "#F9F1DA",
          borderRadius: "2px",
          border: "1.5px solid #D72333",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header: business name + Google branding */}
        <div
          className="flex items-center justify-between px-5 pt-4 pb-3"
          style={{ borderBottom: "1px solid rgba(215,35,51,0.2)" }}
        >
          <div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3 }}>
              phil – Café, bookshop &amp; bar
            </div>
            {/* Rating row */}
            <div className="flex items-center gap-2 mt-1">
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a" }}>4.6</span>
              {/* Partial stars */}
              <div style={{ position: "relative", display: "inline-block", fontSize: "15px", letterSpacing: "1px", lineHeight: 1 }}>
                <span style={{ color: "#ddd" }}>★★★★★</span>
                <span style={{ position: "absolute", top: 0, left: 0, width: "92%", overflow: "hidden", whiteSpace: "nowrap", color: "#F4B400" }}>★★★★★</span>
              </div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "13px", color: "#1a73e8" }}
              >
                3,778 reviews
              </a>
            </div>
          </div>
          {/* Google logo top-right */}
          <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
            <GoogleG />
            <span style={{ fontSize: "9px", color: "#777", letterSpacing: "0.5px" }}>Google</span>
          </div>
        </div>

        {/* Individual reviews */}
        {GOOGLE_REVIEWS.map((r, i) => (
          <div
            key={r.name}
            className="px-5 py-4"
            style={{ borderBottom: i < GOOGLE_REVIEWS.length - 1 ? "1px solid rgba(215,35,51,0.15)" : undefined }}
          >
            {/* Reviewer header */}
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{ width: 36, height: 36, background: r.avatarBg, color: r.avatarColor, fontSize: "15px", fontWeight: 700 }}
              >
                {r.initials}
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.2 }}>{r.name}</div>
                <div style={{ fontSize: "12px", color: "#777" }}>{r.meta}</div>
              </div>
            </div>
            {/* Stars + time */}
            <div className="flex items-center gap-2 mb-1">
              <span style={{ color: "#F4B400", fontSize: "13px", letterSpacing: "1px" }}>{"★".repeat(r.rating)}</span>
              <span style={{ fontSize: "12px", color: "#777" }}>{r.timeAgo}</span>
            </div>
            {/* Review text */}
            <p style={{ fontSize: "13px", color: "#333", lineHeight: 1.55, margin: "0 0 8px" }}>
              {r.text}
            </p>
            {/* Food / Service / Atmosphere */}
            <div className="flex gap-3 flex-wrap">
              {Object.entries(r.scores).map(([label, score]) => (
                <span key={label} style={{ fontSize: "12px", color: "#555" }}>
                  <span style={{ fontWeight: 600 }}>{label}:</span> {score}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* See all link */}
        <div className="px-5 py-3" style={{ borderTop: "1px solid rgba(215,35,51,0.2)" }}>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "13px", color: "#1a73e8", fontWeight: 600 }}
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
    title: "Breakfast until 2 PM",
    text: "Our most popular: the phil good – falafel, hummus, sourdough, egg & müsli. After 2 PM: falafel, hummus, olives & snacks.",
  },
  {
    icon: <IconCoffee />,
    title: "Specialty coffee",
    text: "Espresso, cappuccino, flat white, cold brew. Austrian roasters.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 28h24v4H6zM6 18h24v10H6z" stroke="#D72333" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M10 18v-4c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v4" stroke="#D72333" strokeWidth="1.8"/>
        <path d="M18 10V6M14 8c0-1.1.9-2 2-2h4a2 2 0 0 1 0 4h-4a2 2 0 0 1-2-2z" stroke="#D72333" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Local cakes",
    text: "Caramel cheesecake, blueberry cake, banana bread, chocolate mousse, brownies, berry cake.",
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

      <div style={{ maxWidth: 500, margin: "0 auto" }}>

      {/* ─── A · Sticky Mobile Header ─────────────────────────────────── */}
      <div
        className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{
          background: "#F9F1DA",
          borderBottom: "1px solid rgba(215,35,51,0.2)",
        }}
      >
        <span className="flex items-center gap-2">
          <img
            src="/images/assets/phil-logo-white.png"
            alt="café phil logo"
            width={32}
            height={32}
            style={{ borderRadius: "50%" }}
          />
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
      <section className="px-4 py-10">
        <div
          className="p-6 md:p-8"
          style={{
            background: "#F9F1DA",
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
        </div>

        <a
          href={MAPS_URL}
          onClick={trackDirections}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 text-center mt-4 transition-opacity hover:opacity-85 active:opacity-70"
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
      </section>

      {/* ─── D · What we serve ────────────────────────────────────────── */}
      <section className="px-4 py-12" >
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
        <div className="grid grid-cols-1 gap-5">
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
        <div className="grid grid-cols-2">
          {PHOTOS.map(({ src, alt, wide, position }, i) => (
            <div
              key={src}
              className={`relative overflow-hidden ${
                wide
                  ? "col-span-2 aspect-[16/9]"
                  : "aspect-square"
              }`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                loading={i === 0 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-500 hover:scale-105"
                style={{ objectPosition: position ?? "center" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── F · Prices ───────────────────────────────────────────────── */}
      <section className="px-4 py-12">
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
          <a href="https://cafephil.at/#speisekarte" target="_blank" rel="noopener noreferrer" style={{ color: "#D72333", textDecoration: "underline" }}>Full menu available on-site.</a>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          {[
            { src: "/images/assets/payment-visa.svg",       alt: "Visa" },
            { src: "/images/assets/payment-mastercard.svg", alt: "Mastercard" },
            { src: "/images/assets/payment-maestro.svg",    alt: "Maestro" },
            { src: "/images/assets/payment-applepay.svg",   alt: "Apple Pay" },
            { src: "/images/assets/payment-googlepay.svg",  alt: "Google Pay" },
          ].map(({ src, alt }) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              width={52}
              height={34}
              style={{ borderRadius: 6, border: "1px solid #e0e0e0", objectFit: "contain", background: "#fff" }}
            />
          ))}
        </div>
      </section>

      {/* ─── G · Reviews ──────────────────────────────────────────────── */}
      <section className="px-4 py-12" >
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
        <div className="grid grid-cols-1 gap-5 max-w-2xl mx-auto">
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
        style={{ background: "#F9F1DA" }}
      >
        <p
          className="mb-3"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "clamp(44px, 9vw, 76px)",
            fontStyle: "italic",
            fontWeight: 900,
            color: "#D72333",
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
            color: "#D72333",
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
            color: "#F9F1DA",
            background: "#D72333",
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
          © 2026 phil Café &amp; Bookshop
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

      </div>
    </main>
  );
}
