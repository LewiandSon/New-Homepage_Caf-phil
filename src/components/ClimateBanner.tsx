"use client";

import { useLanguage } from "../LanguageContext";

function SnowflakeIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F9F1DA"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07M12 2l2 4-2 2-2-2 2-4zM12 22l2-4-2-2-2 2 2 4zM2 12l4 2 2-2-2-4-4 2zM22 12l-4 2-2-2 2-4 4 2z" />
    </svg>
  );
}

export function ClimateBanner() {
  const { lang } = useLanguage();

  const headline =
    lang === "de" ? "Wir sind klimatisiert" : "We're air-conditioned";
  const subline =
    lang === "de"
      ? "Bei Hitze bei uns abkühlen – drinnen angenehm kühl."
      : "Escape the heat – cool and comfortable inside.";

  return (
    <section
      aria-label={headline}
      className="w-full"
      style={{ background: "#D72333" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-5 md:py-7 flex items-center justify-center gap-4 md:gap-6 text-center">
        <div className="hidden sm:block flex-shrink-0 opacity-90">
          <SnowflakeIcon />
        </div>
        <div>
          <p
            style={{
              fontFamily: "Vollkorn",
              fontSize: "clamp(22px, 4.5vw, 36px)",
              fontStyle: "italic",
              fontWeight: 900,
              color: "#F9F1DA",
              lineHeight: "130%",
              margin: 0,
            }}
          >
            {headline}
          </p>
          <p
            className="mt-1 md:mt-2"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "clamp(15px, 2.5vw, 20px)",
              fontWeight: 500,
              color: "#F9F1DA",
              opacity: 0.92,
              lineHeight: "150%",
              margin: 0,
            }}
          >
            {subline}
          </p>
        </div>
        <div className="hidden sm:block flex-shrink-0 opacity-90 scale-x-[-1]">
          <SnowflakeIcon />
        </div>
      </div>
    </section>
  );
}
