"use client";

import { Header } from "@/components/Header";
import Image from "next/image";
import { useState, Fragment } from "react";
import { useLanguage } from "../../LanguageContext";

export default function MietenPage() {
  const [footerModal, setFooterModal] = useState<"imprint" | "privacy" | "terms" | null>(null);
  const { lang } = useLanguage();

  return (
    <main className="relative min-h-screen bg-[#F9F1DA] text-[#D72333] font-serif pt-[150px]">
      <Header />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 pb-24">
        {/* Abschnittsüberschrift über den Fotos */}
        <div className="w-full mb-8 text-center md:text-left md:pl-[70px]">
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

        {/* Galerie-Bereich: Fotos links (ab Mitte des Logos), Text rechts breiter */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-12 gap-y-10 md:gap-y-0 md:pl-[70px]">
            {/* Links: beide Fotos untereinander, mit Abstand */}
            <div className="flex flex-col gap-6 md:gap-8 order-1 md:order-1">
              <div className="relative w-full md:w-[532px] md:h-[399px]" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/assets/mieten_1.jpg"
                  alt="Galerie im phil – Innenansicht"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 532px"
                  priority
                  unoptimized
                />
              </div>
              <div className="relative w-full md:w-[532px] md:h-[399px]" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/assets/mieten_2.jpg"
                  alt="Galerie im phil – Atmosphäre"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 532px"
                  unoptimized
                />
              </div>
            </div>

            {/* Rechts: Text + Button */}
            <div className="flex flex-col justify-start order-2 md:order-2 md:pt-0 md:max-w-[680px] md:mt-[400px] lg:mt-[520px]">
              {/* Galerie mieten + Text */}
              <div
                style={{
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "0",
                }}
                className="md:mt-10 lg:mt-14"
              >
                <div
                  style={{
                    fontFamily: "Vollkorn",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    color: "#D72333",
                    lineHeight: "115%",
                    flex: 1,
                    overflow: "auto",
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
                        Wenn du eine Idee hast, die zum phil passt, schreib uns gern eine{" "}
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
                        If you have an idea that fits phil, we’d love to hear from you by{" "}
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

                {/* Mobile: Button unterhalb des Textes, etwas kleiner */}
                <div className="mt-6 md:hidden">
                  <a
                    href="/#kontakt"
                    className="transition-all duration-200 inline-block"
                    style={{
                      padding: "10px 24px",
                      fontFamily: "Vollkorn",
                      fontSize: "20px",
                      fontStyle: "italic",
                      fontWeight: 900,
                      color: "#D72333",
                      backgroundColor: "#F9F1DA",
                      border: "2px solid #D72333",
                      cursor: "pointer",
                      lineHeight: "140%",
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

                {/* Desktop: großer Button wie auf der Webversion, mit normalem Abstand zum Text */}
                <div className="mt-10 hidden md:block">
                  <a
                    href="/#kontakt"
                    className="transition-all duration-200 inline-block"
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
            </div>
          </div>
        </div>

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
