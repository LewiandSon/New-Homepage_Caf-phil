"use client";

import Image from "next/image";
import { useState, Fragment } from "react";
import { useLanguage } from "../../LanguageContext";

export default function MietenPage() {
  const [footerModal, setFooterModal] = useState<"imprint" | "privacy" | "terms" | null>(null);
  const [showInstagramStrich, setShowInstagramStrich] = useState(false);
  const { lang } = useLanguage();

  return (
    <main className="relative min-h-screen bg-[#F9F1DA] text-[#D72333] font-serif pt-[100px] md:pt-[150px] overflow-x-hidden">
      {/* Desktop: gleiche Runter-Skalierung wie Startseite, Bücher, Events */}
      <div className="md:scale-[0.855] md:origin-top">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 pb-24">
        {/* Abschnittsüberschrift – nur auf Desktop weiter rechts */}
        <div className="w-full mb-8 text-center md:text-left md:pl-[250px]">
          <h1
            style={{
              fontFamily: "Vollkorn",
              fontSize: "32px",
              fontStyle: "italic",
              fontWeight: 900,
              color: "#D72333",
              lineHeight: "150%",
            }}
          >
            {lang === "de" ? "Galerie mieten" : "Rent our gallery"}
          </h1>
        </div>

        {/* Desktop: Spalte 1 fest 520px (180+340), Spalte 2 breiter für Text; Bilder außerhalb */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[520px_480px] md:items-start gap-8 md:gap-x-12 md:gap-y-10 md:pl-[70px]">
          {/* 1. Video – auf Desktop in 520px-Spalte, Video 180px eingerückt, max 340px breit */}
          <div className="relative w-full max-w-[260px] mx-auto md:max-w-[340px] md:mx-0 md:ml-[180px]" style={{ aspectRatio: "9/16" }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
            >
              <source src="/images/assets/galerie-mieten.webm" type="video/webm" />
              <source src="/images/assets/galerie-mieten-opt.mp4" type="video/mp4" />
            </video>
          </div>

          {/* 2. Text + Button – breitere Spalte, eine Spur weiter rechts */}
          <div className="flex flex-col gap-4 md:gap-6 md:max-w-[480px] md:mt-16 md:ml-20">
          <div
            className="text-[20px] md:text-[23px]"
            style={{
              fontFamily: "Vollkorn",
              fontStyle: "normal",
              fontWeight: 500,
              color: "#D72333",
              lineHeight: "115%",
            }}
          >
                  {lang === "de" ? (
                    <>
                      <p style={{ marginBottom: "10px" }}>
                        Unsere Galerie kann auf Anfrage gemietet werden.
                      </p>
                      <p style={{ marginBottom: "10px" }}>
                        Sie eignet sich für größere Gruppen (bis ca. 40 Personen) und Formate, die Raum brauchen:
                      </p>
                      <p style={{ marginBottom: "10px" }}>
                        Lesungen, Vorträge, Kunst, Gespräche, Poetry, private Anlässe.
                      </p>
                      <p style={{ marginBottom: "10px" }}>
                        Wenn du ein Teil des Lokals mieten willst für ein Event, schreib uns gern eine{" "}
                        <a href="mailto:info@phil.info" className="underline hover:opacity-80">
                          E-Mail
                        </a>
                        .
                      </p>
                      <p>
                        Weitere Informationen teilen wir auf Anfrage.
                      </p>
                    </>
                  ) : (
                    <>
                      <p style={{ marginBottom: "10px" }}>
                        Our gallery can be rented on request.
                      </p>
                      <p style={{ marginBottom: "10px" }}>
                        It’s ideal for larger groups (up to around 40 people) and for formats that need space – readings, talks, art, conversations, poetry, private events.
                      </p>
                      <p style={{ marginBottom: "10px" }}>
                        If you want to rent part of the venue for an event, we’d love to hear from you by{" "}
                        <a href="mailto:info@phil.info" className="underline hover:opacity-80">
                          email
                        </a>
                        .
                      </p>
                      <p>
                        We’re happy to share further details on request.
                      </p>
                    </>
                  )}
          </div>

          {/* Anfrage senden Button – direkt unter dem Text */}
          <a
            href="/#kontakt"
            className="transition-all duration-200 inline-block w-fit"
            style={{
              padding: "15px 40px",
              fontFamily: "Vollkorn",
              fontSize: "25px",
              fontStyle: "italic",
              fontWeight: 900,
              color: "#D72333",
              backgroundColor: "#F9F1DA",
              border: "3px solid #D72333",
              cursor: "pointer",
              lineHeight: "150%",
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
            {lang === "de" ? "Anfrage senden" : "Send enquiry"}
          </a>
          </div>
        </div>

        {/* Bilder – außerhalb des Grids, nebeneinander, mittig zentriert */}
        <div className="flex flex-col md:flex-row md:justify-center gap-6 md:gap-6 w-full mt-8 md:mt-10">
          <div className="relative w-full md:w-[520px] md:h-[390px] md:shrink-0 mx-auto md:mx-0" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/images/assets/mieten_1.webp"
              alt="Galerie im phil – Innenansicht"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 520px"
              priority
              unoptimized
            />
          </div>
          <div className="relative w-full md:w-[520px] md:h-[390px] md:shrink-0 mx-auto md:mx-0" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/images/assets/mieten_2.webp"
              alt="Galerie im phil – Atmosphäre"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 520px"
              unoptimized
            />
          </div>
        </div>

      </div>
      </div>

      {/* Footer – außerhalb Scale; Desktop: negativer Abstand wegen Scale-Leerraum */}
      <footer
        className="mt-24 md:-mt-[100px] flex flex-col items-center justify-center py-16 px-6"
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
                  className="hover:opacity-80 active:opacity-60 transition-opacity"
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
              onMouseEnter={() => setShowInstagramStrich(true)}
              onMouseLeave={() => setShowInstagramStrich(false)}
            >
              <Image
                src="/images/assets/instagram-optimized.webp"
                alt="Folge uns auf Instagram"
                fill
                className="object-contain"
              />
              {showInstagramStrich && (
                <>
                  <Image
                    src="/images/assets/unterstreichung-beige.png"
                    alt=""
                    width={180}
                    height={22}
                    className="absolute bottom-[50px] left-[24%] object-contain pointer-events-none"
                    style={{ zIndex: 10, transform: 'rotate(-3deg) scaleY(1.4)' }}
                    unoptimized
                  />
                  <Image
                    src="/images/assets/unterstreichung-beige.png"
                    alt=""
                    width={130}
                    height={22}
                    className="absolute bottom-[8px] left-[40%] object-contain pointer-events-none"
                    style={{ zIndex: 10, transform: 'rotate(-3deg) scaleY(1.4)' }}
                    unoptimized
                  />
                </>
              )}
            </a>
          </div>
        </footer>

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
                <div><strong>phil Cafe &amp; Bookshop</strong></div>
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
