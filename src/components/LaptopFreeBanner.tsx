"use client";

import Image from "next/image";
import { useLanguage } from "../LanguageContext";

// Dezenter Hinweis ganz oben auf der Startseite – außerhalb des Scale-Wrappers
// eingehängt, damit das absolute Figma-Layout unberührt bleibt.
// Creme-Hintergrund + feine Linien, fügt sich ruhig ein statt zu dominieren.
export function LaptopFreeBanner() {
  const { lang } = useLanguage();

  const headline = lang === "de" ? "Ein laptopfreier Ort" : "A laptop-free space";
  const subline =
    lang === "de"
      ? "Tagträumen, Plaudern, Schreiben, Küssen – ausdrücklich erwünscht!"
      : "Daydreaming, chatting, writing, kissing – very much encouraged!";

  return (
    <section
      aria-label={headline}
      className="w-full"
      style={{
        background: "#F9F1DA",
        borderTop: "1px solid rgba(215,35,51,0.18)",
        borderBottom: "1px solid rgba(215,35,51,0.18)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 md:py-3.5 flex items-center justify-center gap-3 md:gap-4 text-left">
        <div className="flex-shrink-0">
          <Image
            src="/images/assets/no-laptop-red.webp"
            alt={lang === "de" ? "Kein-Laptop-Symbol" : "No-laptop symbol"}
            width={420}
            height={449}
            className="object-contain w-[34px] h-auto md:w-[40px]"
            unoptimized
          />
        </div>
        <div>
          <span
            style={{
              fontFamily: "Vollkorn",
              fontSize: "clamp(16px, 2.3vw, 21px)",
              fontStyle: "italic",
              fontWeight: 900,
              color: "#D72333",
              lineHeight: "130%",
            }}
          >
            {headline}
          </span>
          <span
            className="hidden sm:inline"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "clamp(13px, 1.6vw, 15px)",
              fontWeight: 500,
              color: "#D72333",
              opacity: 0.8,
              lineHeight: "130%",
            }}
          >
            <span aria-hidden style={{ margin: "0 0.5em", opacity: 0.6 }}>·</span>
            {subline} <span aria-hidden>♥</span>
          </span>
        </div>
      </div>
    </section>
  );
}
