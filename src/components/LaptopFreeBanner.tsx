"use client";

import Image from "next/image";
import { useLanguage } from "../LanguageContext";

// Banner ganz oben auf der Startseite – außerhalb des Scale-Wrappers eingehängt
// (wie zuvor der ClimateBanner), damit das absolute Figma-Layout unberührt bleibt.
// Macht sofort sichtbar, dass das phil ein laptopfreier Ort ist.
export function LaptopFreeBanner() {
  const { lang } = useLanguage();

  const headline = lang === "de" ? "Ein laptopfreier Ort" : "A laptop-free space";
  const subline =
    lang === "de"
      ? "Tagträumen, Plaudern, Schreiben, Küssen – ausdrücklich erwünscht!"
      : "Daydreaming, chatting, writing, kissing – very much encouraged!";

  return (
    <section aria-label={headline} className="w-full" style={{ background: "#D72333" }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 md:py-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-7 text-center">
        <div className="flex-shrink-0">
          <Image
            src="/images/assets/no-laptop-cream.webp"
            alt={lang === "de" ? "Kein-Laptop-Symbol" : "No-laptop symbol"}
            width={420}
            height={449}
            className="object-contain w-[64px] h-auto md:w-[92px]"
            unoptimized
            priority
          />
        </div>
        <div>
          <p
            style={{
              fontFamily: "Vollkorn",
              fontSize: "clamp(26px, 5vw, 46px)",
              fontStyle: "italic",
              fontWeight: 900,
              color: "#F9F1DA",
              lineHeight: "120%",
              margin: 0,
            }}
          >
            {headline}
          </p>
          <p
            className="mt-1.5 md:mt-2.5"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "clamp(15px, 2.6vw, 22px)",
              fontWeight: 500,
              color: "#F9F1DA",
              opacity: 0.92,
              lineHeight: "150%",
              margin: 0,
            }}
          >
            {subline} <span aria-hidden>♥</span>
          </p>
        </div>
      </div>
    </section>
  );
}
