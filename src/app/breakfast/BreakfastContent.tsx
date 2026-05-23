"use client";

import Image from "next/image";
import { OpenStatus } from "@/components/OpenStatus";
import * as gtag from "@/lib/gtag";

const MAPS_URL = "https://maps.app.goo.gl/pV95cu8bmQELWfgS8";

function trackDirections() {
  gtag.event({ action: "click", category: "breakfast_page", label: "get_directions" });
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const HOURS = [
  ["Monday", "2:00 PM – 9:00 PM"],
  ["Tue – Thu", "9:00 AM – 10:00 PM"],
  ["Fri – Sat", "9:00 AM – 11:00 PM"],
  ["Sunday", "9:00 AM – 9:00 PM"],
] as const;

// 6 gallery photos – mix of portrait and landscape ratios for visual interest
const GALLERY = [
  { src: "/images/assets/1_Lokal.webp",      alt: "café phil interior",            aspect: "aspect-square" },
  { src: "/images/assets/IMG_4886.webp",     alt: "café phil atmosphere",          aspect: "aspect-[3/4]" },
  { src: "/images/assets/4_Lampen.webp",     alt: "café phil lamps",               aspect: "aspect-[4/3]" },
  { src: "/images/assets/2_Spiegel.webp",    alt: "café phil mirror wall",         aspect: "aspect-square" },
  { src: "/images/assets/6_Bedienung.webp",  alt: "café phil service",             aspect: "aspect-[3/4]" },
  { src: "/images/assets/schanigarten.webp", alt: "café phil Schanigarten outdoor", aspect: "aspect-[4/3]" },
];

// Menu sections – prices are placeholders, fill from the real Speisekarte
const MENU_SECTIONS = [
  {
    title: "Breakfast",
    emoji: "🍳",
    items: [
      { name: "Phil breakfast plate", desc: "Egg, toast, butter, jam, orange juice", price: "€ –" },
      { name: "Müsli", desc: "With seasonal fruit and milk or oat milk", price: "€ –" },
      { name: "Avocado toast", desc: "Sourdough, avocado, chili flakes", price: "€ –" },
      { name: "Pastry of the day", desc: "Ask your server", price: "€ –" },
    ],
  },
  {
    title: "Coffee",
    emoji: "☕",
    items: [
      { name: "Espresso", desc: "", price: "€ –" },
      { name: "Cappuccino", desc: "", price: "€ –" },
      { name: "Flat white", desc: "", price: "€ –" },
      { name: "Filter coffee", desc: "", price: "€ –" },
      { name: "Oat / soy milk", desc: "surcharge", price: "+€ –" },
    ],
  },
  {
    title: "Drinks",
    emoji: "🥤",
    items: [
      { name: "Fresh orange juice", desc: "", price: "€ –" },
      { name: "Sparkling water", desc: "0.33 l", price: "€ –" },
      { name: "Soft drinks", desc: "", price: "€ –" },
      { name: "Wine (glass)", desc: "", price: "€ –" },
    ],
  },
];

// TODO: Replace with real Google Reviews from your Business Profile
const REVIEWS = [
  {
    author: "Sarah M.",
    flag: "🇬🇧",
    rating: 5,
    text: "One of the best breakfast spots in Vienna. The atmosphere is unmatched – books everywhere, great coffee, friendly staff.",
    date: "May 2026",
  },
  {
    author: "Thomas K.",
    flag: "🇩🇪",
    rating: 5,
    text: "A true Viennese gem. Came for coffee, stayed for two hours. The book selection is wonderful and the breakfast was delicious.",
    date: "April 2026",
  },
  {
    author: "Emma L.",
    flag: "🇺🇸",
    rating: 5,
    text: "Stumbled upon phil by accident and it was the highlight of our Vienna trip. Will be back next time for sure.",
    date: "March 2026",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <span style={{ color: "#F4B400", fontSize: "16px", letterSpacing: "1px" }}>
      {"★".repeat(count)}
    </span>
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

// ─── Page ──────────────────────────────────────────────────────────────────────

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

      {/* ─── 1 · Sticky Mobile Header ─────────────────────────────────── */}
      <div
        className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: "#F9F1DA", borderBottom: "1px solid rgba(215,35,51,0.2)" }}
      >
        <span style={{ fontFamily: "Vollkorn", fontSize: "22px", fontStyle: "italic", fontWeight: 900, color: "#D72333" }}>
          phil
        </span>
        <a
          href={MAPS_URL}
          onClick={trackDirections}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "Vollkorn", fontSize: "14px", fontWeight: 600, color: "#D72333" }}
        >
          Get directions →
        </a>
      </div>

      {/* ─── 2 · Hero ─────────────────────────────────────────────────── */}
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
        <div className="absolute inset-0" style={{ background: "rgba(20,10,5,0.54)" }} />
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

      {/* ─── 3 · Address, Hours & Map ─────────────────────────────────── */}
      <section className="px-4 py-10 max-w-lg mx-auto md:max-w-2xl">
        {/* Info card */}
        <div
          className="p-6 md:p-8"
          style={{ background: "#fff", border: "1.5px solid #D72333", borderRadius: "2px" }}
        >
          <h2
            className="mb-3"
            style={{ fontFamily: "Vollkorn", fontSize: "22px", fontStyle: "italic", fontWeight: 900, color: "#D72333" }}
          >
            Find us
          </h2>
          <div className="mb-5" style={{ fontFamily: "Vollkorn", fontSize: "17px", color: "#573B30", lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700 }}>Gumpendorfer Str. 10–12, 1060 Wien</div>
            <div style={{ opacity: 0.65, fontSize: "15px" }}>6th district · ~10 min walk from Naschmarkt</div>
          </div>
          <table className="w-full" style={{ fontFamily: "Vollkorn", fontSize: "16px", color: "#573B30" }}>
            <tbody>
              {HOURS.map(([day, time]) => (
                <tr key={day}>
                  <td className="py-1 pr-6" style={{ fontWeight: 700, width: "120px" }}>{day}</td>
                  <td className="py-1">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4" style={{ fontFamily: "Vollkorn", fontSize: "15px", color: "#573B30", opacity: 0.65 }}>
            Phone: +43 1 581 04 89
          </div>
        </div>

        {/* Google Maps embed */}
        {/* TODO: Replace src with the real embed URL from Google Maps "Share → Embed a map" for café phil */}
        <div className="mt-4 overflow-hidden" style={{ borderRadius: "2px", border: "1.5px solid #D72333" }}>
          <iframe
            src="https://maps.google.com/maps?q=Gumpendorfer+Str.+10-12,+1060+Wien&output=embed&z=16"
            width="100%"
            height="280"
            style={{ border: 0, display: "block" }}
            className="md:h-[320px]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="café phil on Google Maps"
          />
        </div>

        {/* CTA buttons */}
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
              border: "1.5px solid #D72333",
              borderRadius: "2px",
            }}
          >
            Call us
          </a>
        </div>
      </section>

      {/* ─── 4 · What we serve ────────────────────────────────────────── */}
      <section className="px-4 py-12" style={{ background: "rgba(255,255,255,0.45)" }}>
        <h2
          className="text-center mb-8"
          style={{ fontFamily: "Vollkorn", fontSize: "clamp(28px, 5vw, 40px)", fontStyle: "italic", fontWeight: 900, color: "#D72333" }}
        >
          What we serve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {SERVE_CARDS.map(({ icon, title, text }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-6"
              style={{ background: "#F9F1DA", border: "1.5px solid #D72333", borderRadius: "2px" }}
            >
              <div className="mb-4">{icon}</div>
              <h3
                className="mb-2"
                style={{ fontFamily: "Vollkorn", fontSize: "20px", fontStyle: "italic", fontWeight: 900, color: "#D72333" }}
              >
                {title}
              </h3>
              <p style={{ fontFamily: "Vollkorn", fontSize: "16px", fontWeight: 500, color: "#573B30", lineHeight: 1.65 }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5 · At phil – Photo Gallery ──────────────────────────────── */}
      <section className="py-10 px-4 md:px-0">
        <h2
          className="text-center mb-6 px-4"
          style={{ fontFamily: "Vollkorn", fontSize: "clamp(28px, 5vw, 40px)", fontStyle: "italic", fontWeight: 900, color: "#D72333" }}
        >
          At phil
        </h2>
        {/* Masonry-ish grid: 2 cols mobile, 3 cols desktop, mixed aspect ratios */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
          {GALLERY.map(({ src, alt, aspect }) => (
            <div
              key={src}
              className={`relative overflow-hidden ${aspect}`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── 6 · Menu ─────────────────────────────────────────────────── */}
      <section className="px-4 py-12 max-w-lg mx-auto md:max-w-2xl">
        <h2
          className="mb-1"
          style={{ fontFamily: "Vollkorn", fontSize: "clamp(28px, 5vw, 40px)", fontStyle: "italic", fontWeight: 900, color: "#D72333" }}
        >
          Menu
        </h2>
        <p
          className="mb-8"
          style={{ fontFamily: "Vollkorn", fontSize: "15px", fontStyle: "italic", color: "#573B30", opacity: 0.7 }}
        >
          Full menu served all day · Regional &amp; organic ingredients
        </p>

        {MENU_SECTIONS.map((section, si) => (
          <div key={section.title}>
            {si > 0 && (
              <div className="my-6" style={{ borderTop: "1px solid rgba(215,35,51,0.2)" }} />
            )}
            <div className="flex items-center gap-2 mb-4">
              <span style={{ fontSize: "20px" }}>{section.emoji}</span>
              <h3
                style={{ fontFamily: "Vollkorn", fontSize: "20px", fontStyle: "italic", fontWeight: 900, color: "#D72333" }}
              >
                {section.title}
              </h3>
            </div>
            <div className="space-y-0">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-baseline justify-between gap-3 py-2"
                  style={{ borderBottom: "1px solid rgba(215,35,51,0.12)" }}
                >
                  <div>
                    <span style={{ fontFamily: "Vollkorn", fontSize: "16px", fontWeight: 600, color: "#573B30" }}>
                      {item.name}
                    </span>
                    {item.desc && (
                      <span style={{ fontFamily: "Vollkorn", fontSize: "14px", color: "#573B30", opacity: 0.6, marginLeft: "6px" }}>
                        {item.desc}
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: "Vollkorn", fontSize: "15px", fontWeight: 700, color: "#D72333", whiteSpace: "nowrap" }}>
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p
          className="mt-6"
          style={{ fontFamily: "Vollkorn", fontSize: "13px", fontStyle: "italic", color: "#573B30", opacity: 0.6 }}
        >
          Prices include VAT. Card payments accepted.
        </p>
      </section>

      {/* ─── 7 · What guests say (Google Reviews) ─────────────────────── */}
      <section className="px-4 py-12" style={{ background: "rgba(255,255,255,0.45)" }}>
        <h2
          className="text-center mb-2"
          style={{ fontFamily: "Vollkorn", fontSize: "clamp(28px, 5vw, 40px)", fontStyle: "italic", fontWeight: 900, color: "#D72333" }}
        >
          What guests say
        </h2>
        {/* Overall rating */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <StarRating count={5} />
          <span style={{ fontFamily: "Vollkorn", fontSize: "16px", fontWeight: 600, color: "#573B30" }}>
            4.7 · Google Reviews
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {REVIEWS.map(({ author, flag, rating, text, date }) => (
            <div
              key={author}
              className="p-5 flex flex-col gap-2"
              style={{ background: "#F9F1DA", border: "1.5px solid #D72333", borderRadius: "2px" }}
            >
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: "Vollkorn", fontSize: "15px", fontWeight: 700, color: "#573B30" }}>
                  {flag} {author}
                </span>
                <span style={{ fontFamily: "Vollkorn", fontSize: "12px", color: "#573B30", opacity: 0.55 }}>
                  {date}
                </span>
              </div>
              <StarRating count={rating} />
              <p style={{ fontFamily: "Vollkorn", fontSize: "15px", fontStyle: "italic", fontWeight: 500, color: "#573B30", lineHeight: 1.65 }}>
                &ldquo;{text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* TODO: Replace PLACE_ID with your real Google Business Place ID */}
        <div className="text-center mt-8">
          <a
            href="https://search.google.com/local/reviews?placeid=EUER_PLACE_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-opacity hover:opacity-80"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "15px",
              fontWeight: 600,
              color: "#D72333",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            See all reviews on Google →
          </a>
        </div>
      </section>

      {/* ─── 8 · CTA Banner ───────────────────────────────────────────── */}
      <section className="px-6 py-16 text-center" style={{ background: "#573B30" }}>
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
          style={{ fontFamily: "Vollkorn", fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 500, color: "#F9F1DA", opacity: 0.8 }}
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

      {/* ─── 9 · Footer ───────────────────────────────────────────────── */}
      <footer className="px-4 py-8 text-center" style={{ background: "#D72333" }}>
        <p style={{ fontFamily: "Vollkorn", fontSize: "15px", fontWeight: 500, color: "#F9F1DA", lineHeight: 1.9 }}>
          café phil · Gumpendorfer Str. 10–12 · 1060 Wien · Austria
          <br />
          © 2026 phil Cafe &amp; Bookshop
        </p>
        <a
          href="https://cafephil.at"
          className="inline-block mt-3 underline transition-opacity hover:opacity-75"
          style={{ fontFamily: "Vollkorn", fontSize: "14px", color: "#F9F1DA", opacity: 0.8 }}
        >
          Back to cafephil.at →
        </a>
      </footer>
    </main>
  );
}
