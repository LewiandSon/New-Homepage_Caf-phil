"use client";

import { Header } from "@/components/Header";
import Image from "next/image";
import { useState, Fragment } from "react";
import { useLanguage } from "../../LanguageContext";

export default function BucherPage() {
  const [footerModal, setFooterModal] = useState<"imprint" | "privacy" | "terms" | null>(null);
  const { lang } = useLanguage();
  return (
    <main className="relative min-h-screen bg-[#F9F1DA] text-[#D72333] font-serif pt-[120px] md:pt-[150px]">
      <Header />

      {/* Mobile layout */}
      <div className="block md:hidden px-4 pb-24 max-w-[720px] mx-auto">
        {/* Hero image */}
        <div className="w-full mb-8">
          <Image
            src="/images/assets/bucher_bordure_image.jpg"
            alt="Bücherregal"
            width={800}
            height={500}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Intro heading + text */}
        <h1
          className="mb-4 text-center"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "28px",
            fontStyle: "italic",
            fontWeight: 900,
            lineHeight: "150%",
            color: "#D72333",
          }}
        >
          {lang === "de" ? "Bücher, Geschenke & Mitbringsel" : "Books, gifts & little treasures"}
        </h1>

        <div
          className="mb-10"
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
              <p className="mb-4">
                Das phil ist nicht nur ein Café, sondern auch eine vollwertige Buchhandlung mitten in Wien-Mariahilf. Unsere Auswahl ist handverlesen, ungewöhnlich und inspirierend – von Neuerscheinungen und Bestsellern bis hin zu besonderen Titeln, die du nicht in jeder Buchhandlung findest.
              </p>
              <p className="mb-4">
                Eine bunte Auswahl an internationalen Autor:innen in deutschsprachiger und englischsprachiger Fassung. Viele unserer Bücher eignen sich perfekt als Geschenk oder Mitbringsel.
              </p>
              <p className="mb-4">
                ✓ Über 4.000 Titel lagernd<br />
                ✓ Alle lieferbaren Bücher bestellbar<br />
                ✓ Besondere Titel, die du nicht überall findest<br />
                ✓ Deutschsprachige & englischsprachige Bücher<br />
                ✓ Perfekt als Geschenk oder Mitbringsel
              </p>
              <p>
                Bei uns darfst du Bücher direkt an deinen Tisch mitnehmen und in Ruhe schmökern – gerne bei Kaffee oder Frühstück.
              </p>
            </>
          ) : (
            <>
              <p className="mb-4">
                phil is not just a café, but a fully fledged bookshop in the heart of Vienna–Mariahilf. Our selection is hand‑picked, unusual and inspiring – from new releases and bestsellers to special titles you won’t find in every bookshop.
              </p>
              <p className="mb-4">
                You’ll discover a colourful range of international authors in both German and English. Many of our books make perfect gifts or little treasures to take home.
              </p>
              <p className="mb-4">
                ✓ Over 4,000 titles in stock<br />
                ✓ Any available book can be ordered<br />
                ✓ Special titles you won’t find everywhere<br />
                ✓ German‑language & English‑language books<br />
                ✓ Perfect as gifts or souvenirs
              </p>
              <p>
                You’re welcome to take books straight to your table and browse in peace – preferably with coffee or breakfast.
              </p>
            </>
          )}
        </div>

        {/* Books video */}
        <div className="mb-10">
          <h2
            className="mb-4 text-center"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "24px",
              fontStyle: "italic",
              fontWeight: 900,
              color: "#D72333",
            }}
          >
            {lang === "de" ? "Bücher und wo sie zu finden sind..." : "Books – and where to find them..."}
          </h2>
          <div className="w-full max-w-full aspect-[3/4] mx-auto overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="w-full h-full object-cover"
            >
              <source src="/images/assets/books-website-mit-hg.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Genres heading + Room plan – Überschrift wie im Plan positioniert */}
        <div className="mb-10 relative">
          <Image
            src="/images/assets/raumplan2.jpg"
            alt={lang === "de" ? "Raumplan - Bücher und wo sie zu finden sind" : "Room plan – books and where to find them"}
            width={1280}
            height={900}
            className="w-full h-auto object-cover"
          />
          {/* Überschrift optisch über der linken Genre-Liste */}
          <h2
            className="absolute"
            style={{
              top: "124px",
              left: "16px",
              fontFamily: "Vollkorn",
              fontSize: "12px",
              fontStyle: "italic",
              fontWeight: 900,
              lineHeight: "150%",
              color: "#D72333",
            }}
          >
            {lang === "de" ? "Genre" : "Genres"}
          </h2>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="relative hidden md:block w-[1440px] mx-auto" style={{ minHeight: '2650px' }}>
        
        {/* Main Image Section with Border */}
        {/* Border - rotated 90deg per Figma */}
        <div 
          className="absolute"
          style={{
            left: "158px",
            top: "-100px",
            width: "650px",
            height: "850px",
            transform: "rotate(90deg)",
            zIndex: 1
          }}
        >
           <Image
             src="/images/assets/bordüre2.svg"
             alt="Border"
             fill
             className="object-contain"
             unoptimized
           />
        </div>

        {/* Main Image - inside border */}
        <div 
          className="absolute"
          style={{
            left: "140px",
            top: "88px",
            width: "685px",
            height: "474px",
            zIndex: 2
          }}
        >
          <Image
            src="/images/assets/bucher_bordure_image.jpg"
            alt="Bücherregal"
            fill
            className="object-cover"
          />
        </div>

        {/* Heading */}
        <h1 
          className="absolute"
          style={{
            left: "133px",
            top: "858px",
            fontFamily: "Vollkorn",
            fontSize: "35px",
            fontStyle: "italic",
            fontWeight: 900,
            lineHeight: "150%",
            color: "#D72333",
            whiteSpace: "nowrap"
          }}
        >
          {lang === "de" ? "Bücher, Geschenke & Mitbringsel" : "Books, gifts & little treasures"}
        </h1>

        {/* Body Text */}
        <div
          className="absolute"
          style={{
            left: "133px",
            top: "940px",
            width: "666px",
            fontFamily: "Vollkorn",
            fontSize: "23px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "150%",
            color: "#D72333",
            whiteSpace: "pre-line"
          }}
        >
          {lang === "de" ? (
            <>
              Das phil ist nicht nur ein Café, sondern auch eine vollwertige Buchhandlung mitten in Wien-Mariahilf. Unsere Auswahl ist handverlesen, ungewöhnlich und inspirierend – von Neuerscheinungen und Bestsellern bis hin zu besonderen Titeln, die du nicht in jeder Buchhandlung findest. Eine bunte Auswahl an internationalen Autoren in deutschsprachiger und englischsprachiger Fassung. Viele unserer Bücher eignen sich perfekt als Geschenk oder Mitbringsel.
              <br /><br />
              ✓ Über 4.000 Titel lagernd<br />
              ✓ Alle lieferbaren Bücher bestellbar<br />
              ✓ Besondere Titel, die du nicht überall findest<br />
              ✓ Deutschsprachige & englischsprachige Bücher<br />
              ✓ Perfekt als Geschenk oder Mitbringsel
              <br /><br />
              Bei uns darfst du Bücher direkt an deinen Tisch mitnehmen und in Ruhe schmökern – gerne bei Kaffee oder Frühstück.
            </>
          ) : (
            <>
              phil is not just a café, but a fully fledged bookshop in the heart of Vienna–Mariahilf. Our selection is hand‑picked, unusual and inspiring – from new releases and bestsellers to special titles you won’t find in every bookshop. You’ll discover a colourful range of international authors in both German and English. Many of our books make perfect gifts or little treats to take home.
              <br /><br />
              ✓ Over 4,000 titles in stock<br />
              ✓ Any available book can be ordered<br />
              ✓ Special titles you won’t find everywhere<br />
              ✓ German‑language & English‑language books<br />
              ✓ Perfect as gifts or souvenirs
              <br /><br />
              You’re welcome to take books straight to your table and browse in peace – preferably with coffee or breakfast.
            </>
          )}
        </div>

        {/* Heading: "Bücher und wo sie zu finden sind..." */}
        <div
          className="absolute"
          style={{
            left: "133px",
            top: "1550px",
            width: "641px",
            height: "147px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "#D72333",
            fontFamily: "Vollkorn",
            fontSize: "35px",
            fontStyle: "italic",
            fontWeight: 900,
            lineHeight: "150%",
            textAlign: "center",
            zIndex: 10
          }}
        >
          {lang === "de" ? "Bücher und wo sie zu finden sind..." : "Books – and where to find them..."}
        </div>

        {/* Video - automatically starting infinite loop */}
        <div
          className="absolute"
          style={{
            left: "1006px",
            top: "964px",
            width: "411px",
            height: "580px"
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-contain"
          >
            <source src="/images/assets/books-website-mit-hg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Room Plan Image */}
        <div
          className="absolute"
          style={{
            left: "80px",
            top: "1637px",
            width: "1281px",
            height: "906px",
            aspectRatio: "427/302"
          }}
        >
          <Image
            src="/images/assets/raumplan2.jpg"
            alt="Raumplan - Bücher und wo sie zu finden sind"
            fill
            className="object-cover"
          />
        </div>

        {/* Genre Heading */}
        <h2
          className="absolute"
          style={{
            left: "138px",
            top: "2077px",
            width: "171px",
            fontFamily: "Vollkorn",
            fontSize: "35px",
            fontStyle: "italic",
            fontWeight: 900,
            lineHeight: "150%",
            color: "#D72333"
          }}
        >
          {lang === "de" ? "Genre" : "Genres"}
        </h2>


        {/* Footer Modal Overlay */}
        {footerModal && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setFooterModal(null)}
          >
            <div
              className="relative w-[520px] bg-[#D72333] text-[#F9F1DA] px-8 py-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setFooterModal(null)}
                className="absolute right-4 top-4 text-[#F9F1DA] transition-colors duration-200"
                style={{ fontSize: "28px", fontWeight: 900 }}
                onMouseEnter={(e) => ((e.currentTarget.style.color = "#573B30"))}
                onMouseLeave={(e) => ((e.currentTarget.style.color = "#F9F1DA"))}
                aria-label="Close"
              >
                ×
              </button>

              {footerModal === "imprint" && (
                <div
                  style={{
                    fontFamily: "Vollkorn",
                    fontSize: "22px",
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
                    fontSize: "22px",
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
                    fontSize: "22px",
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

      </div>

      {/* Footer - außerhalb des absoluten Containers, gleicher Stil wie andere Unterseiten */}
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
    </main>
  );
}
