"use client";

import Image from "next/image";
import { useState, Fragment } from "react";
import { useLanguage } from "../../LanguageContext";

export default function BucherPage() {
  const [footerModal, setFooterModal] = useState<"imprint" | "privacy" | "terms" | null>(null);
  const [showInstagramStrich, setShowInstagramStrich] = useState(false);
  const { lang } = useLanguage();
  return (
    <main data-page="bucher" className="relative min-h-screen bg-[#F9F1DA] text-[#D72333] font-serif pt-[100px] md:pt-[150px] overflow-x-hidden">
      {/* Mobile layout */}
      <div className="block md:hidden px-4 pb-12 max-w-[720px] mx-auto overflow-visible">
        {/* Hero image */}
        <div className="w-full mb-8">
          <Image
            src="/images/assets/bucher_bordure_image.webp"
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
            fontSize: "20px",
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
              <ul className="mb-4 list-disc pl-5 space-y-2" style={{ listStylePosition: "outside" }}>
                <li>Über 4.000 Titel lagernd</li>
                <li>Alle lieferbaren Bücher <a href="mailto:info@phil.info" className="underline hover:opacity-80">bestellbar</a></li>
                <li>Besondere Titel, die du nicht überall findest</li>
                <li>Deutschsprachige & englischsprachige Bücher</li>
                <li>Perfekt als Geschenk oder Mitbringsel</li>
              </ul>
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
              <ul className="mb-4 list-disc pl-5 space-y-2" style={{ listStylePosition: "outside" }}>
                <li>Over 4,000 titles in stock</li>
                <li>Any available book can be <a href="mailto:info@phil.info" className="underline hover:opacity-80">ordered</a></li>
                <li>Special titles you won’t find everywhere</li>
                <li>German‑language & English‑language books</li>
                <li>Perfect as gifts or souvenirs</li>
              </ul>
              <p>
                You’re welcome to take books straight to your table and browse in peace – preferably with coffee or breakfast.
              </p>
            </>
          )}
        </div>

        {/* Books video */}
        <div className="mb-10 mt-20">
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
              <source src="/images/assets/books-website-mit-hg.webm" type="video/webm" />
              <source src="/images/assets/books-website-mit-hg.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Genre-Überschrift */}
        <div className="mb-4 mt-32">
          <h2
            className="mb-0 text-center leading-tight"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "24px",
              fontStyle: "italic",
              fontWeight: 900,
              color: "#D72333",
            }}
          >
            {lang === "de" ? "Genre" : "Genres"}
          </h2>
        </div>
      </div>

      {/* Raumplan - außerhalb des Parent-Containers für volle Breite (nur Mobile) */}
      <div className="block md:hidden relative w-screen left-1/2 -translate-x-1/2 -mt-20 mb-4">
        <Image
          src="/images/assets/raumplan-phil.webp"
          alt={lang === "de" ? "Raumplan - Bücher und wo sie zu finden sind" : "Room plan – books and where to find them"}
          width={1440}
          height={1920}
          className="w-full h-auto block"
        />
      </div>

      {/* Desktop: gleiche Runter skalierung wie Startseite (md:scale-[0.855]) */}
      <div className="md:scale-[0.855] md:origin-top">
      {/* Desktop layout */}
      <div className="relative hidden md:block w-[1440px] mx-auto" style={{ minHeight: '2960px' }}>
        
        {/* Main Image Section with Border */}
        {/* Border - rotated 90deg per Figma */}
        <div 
          className="absolute"
          style={{
            left: "158px",
            top: "-150px",
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
            top: "38px",
            width: "685px",
            height: "474px",
            zIndex: 2
          }}
        >
          <Image
            src="/images/assets/bucher_bordure_image.webp"
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
            top: "650px",
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
            top: "782px",
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
              <ul className="list-disc pl-5 space-y-2" style={{ listStylePosition: "outside", margin: "0.5rem 0" }}>
                <li>Über 4.000 Titel lagernd</li>
                <li>Alle lieferbaren Bücher <a href="mailto:info@phil.info" className="underline hover:opacity-80">bestellbar</a></li>
                <li>Besondere Titel, die du nicht überall findest</li>
                <li>Deutschsprachige & englischsprachige Bücher</li>
                <li>Perfekt als Geschenk oder Mitbringsel</li>
              </ul>
              <br /><br />
              Bei uns darfst du Bücher direkt an deinen Tisch mitnehmen und in Ruhe schmökern – gerne bei Kaffee oder Frühstück.
            </>
          ) : (
            <>
              phil is not just a café, but a fully fledged bookshop in the heart of Vienna–Mariahilf. Our selection is hand‑picked, unusual and inspiring – from new releases and bestsellers to special titles you won’t find in every bookshop. You’ll discover a colourful range of international authors in both German and English. Many of our books make perfect gifts or little treats to take home.
              <br /><br />
              <ul className="list-disc pl-5 space-y-2" style={{ listStylePosition: "outside", margin: "0.5rem 0" }}>
                <li>Over 4,000 titles in stock</li>
                <li>Any available book can be <a href="mailto:info@phil.info" className="underline hover:opacity-80">ordered</a></li>
                <li>Special titles you won’t find everywhere</li>
                <li>German‑language & English‑language books</li>
                <li>Perfect as gifts or souvenirs</li>
              </ul>
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
            top: "760px",
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
            <source src="/images/assets/books-website-mit-hg.webm" type="video/webm" />
            <source src="/images/assets/books-website-mit-hg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Raumplan (Karte mit Bildern) – auf Desktop ohne Genre-Überschrift, nach oben gerückt */}
        <div
          className="absolute left-0 right-0 w-full"
          style={{ top: "1560px" }}
        >
          <h2
            className="mb-0 text-center leading-tight md:hidden"
            style={{
              fontFamily: "Vollkorn",
              fontSize: "35px",
              fontStyle: "italic",
              fontWeight: 900,
              color: "#D72333",
            }}
          >
            {lang === "de" ? "Genre" : "Genres"}
          </h2>
          <div className="max-w-[1040px] w-full mx-auto -mt-12 px-4 md:mt-0">
            <Image
              src="/images/assets/raumplan-phil.webp"
              alt="Raumplan - Bücher und wo sie zu finden sind"
              width={1440}
              height={1920}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>
      </div>

      {/* Footer Modal Overlay – außerhalb Scale, damit fixed korrekt wirkt */}
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
                <div><strong>phil Cafe &amp; Bookshop</strong></div>
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

      {/* Footer – außerhalb Scale; Desktop: negativer Abstand damit er direkt unter Raumplan sitzt (≈ 665px) */}
      <footer
        className="mt-12 md:-mt-[520px] flex flex-col items-center justify-center py-16 px-6"
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
            className="block w-[300px] h-[120px] relative active:scale-95 transition-transform duration-150"
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
    </main>
  );
}
