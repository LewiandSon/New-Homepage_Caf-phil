 "use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../LanguageContext";

export function AboutSection() {
  const { lang } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section id="uber-uns" className="relative w-full z-10">
      {/* Mobile layout – ohne Foto (steht schon im Hero), nur Text */}
      <div className="block md:hidden px-4 pb-24 pt-6 max-w-[720px] mx-auto">
        <h2
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
          {lang === "de" ? "Unsere Geschichte" : "Our story"}
        </h2>
        <div
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
                Im phil verschmelzen Café und Buchhandlung zu einem gemütlichen Wohnzimmer Wiens. Seit 2004 kannst du bei uns entspannen, eintauchen in Bücherwelten und den Alltagsstress hinter dir lassen. In der charmanten Retro‑Einrichtung genießt du erlesene Kaffeespezialitäten, während du in sorgfältig kuratierten Bücherregalen stöberst – unsere Auswahl lädt dich ein, neue Welten zu entdecken.
              </p>
              {isExpanded && (
                <>
                  <p className="mb-4">
                    Erfahre mehr über unseren{" "}
                    <a href="#schanigarten" className="underline">
                      Schanigarten
                    </a>
                    {" "}oder stöbere in unserer{" "}
                    <a href="/bucher" className="underline">
                      Büchersammlung
                    </a>
                    .
                  </p>
                  <p className="mb-4">
                    Unser Frühstück beziehen wir von regionalen Lieferanten und legen großen Wert auf Bio-Qualität. Für konzentriertes Arbeiten steht unter der Woche ein eigener Laptoptisch zur Verfügung. Am Wochenende bitten wir, auf Laptops zu verzichten, um die gemütliche Atmosphäre für alle zu bewahren.
                  </p>
                </>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="underline cursor-pointer"
                style={{
                  fontFamily: "Vollkorn",
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#D72333",
                }}
              >
                {isExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
              </button>
            </>
          ) : (
            <>
              <p className="mb-4">
                At phil, café and bookshop blend into one of Vienna’s cosiest living rooms. Since 2004, you’ve been able to relax here, dive into worlds of books and leave everyday stress at the door. In our charming retro interior you enjoy carefully selected coffee specialities while browsing lovingly curated shelves – our selection invites you to discover new worlds.
              </p>
              {isExpanded && (
                <>
                  <p className="mb-4">
                    Learn more about our{" "}
                    <a href="#schanigarten" className="underline">
                      outdoor seating
                    </a>
                    {" "}or explore our{" "}
                    <a href="/bucher" className="underline">
                      book collection
                    </a>
                    .
                  </p>
                  <p className="mb-4">
                    We source our breakfast from regional suppliers and care deeply about organic quality. During the week there’s a dedicated laptop table for focused work. On weekends we kindly ask you to keep laptops closed so that everyone can enjoy the relaxed atmosphere.
              </p>
            </>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="underline cursor-pointer"
                style={{
                  fontFamily: "Vollkorn",
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#D72333",
                }}
              >
                {isExpanded ? "Read less" : "Read more"}
              </button>
            </>
          )}

          {/* Thomas Bernhard Quote - Mobile */}
          <div className="mt-10 mb-2">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: '#D72333',
                fontFamily: 'Iosevka, "Courier New", monospace',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 300,
                lineHeight: '150%',
                textAlign: 'right',
                paddingLeft: '2rem',
              }}
            >
              {lang === 'de' ? (
                <>
                  <p>
                    "Wie andere in den Park oder in den Wald, lief ich immer ins Kaffehaus, um mich abzulenken und zu beruhigen, mein -ganzes Leben."
                  </p>
                  <p style={{ marginTop: '1rem' }}>
                    -Thomas Bernhard
                  </p>
                </>
              ) : (
                <>
                  <p>
                    "While others went to the park or into the woods, I always went to the coffeehouse to distract and calm myself – my whole life."
                  </p>
                  <p style={{ marginTop: '1rem' }}>
                    -Thomas Bernhard
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Cup Image - Mobile */}
          <div className="-mt-2 mb-4 flex justify-start">
            <div
              style={{
                width: '110px',
                height: '88px',
                transform: 'rotate(10deg)',
                transformOrigin: 'center center',
              }}
            >
              <Image
                src="/images/assets/cup 1.svg"
                alt="Cup"
                width={110}
                height={88}
                className="object-contain w-full h-full"
                unoptimized
              />
            </div>
          </div>

          {/* Analog cafe video - Mobile */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-[400px] bg-[#F9F1DA] rounded-lg overflow-hidden">
              <video
                src="/images/assets/analog-cafe-giff.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="w-full h-auto"
                style={{
                  objectFit: 'contain',
                  backgroundColor: '#F9F1DA',
                }}
              />
            </div>
          </div>

          {/* Bücher Section - Mobile */}
          <div className="mb-16 mt-16">
            {/* 1. Titel "Bücher" */}
            <div className="mb-8">
              <h2
                className="text-left"
                style={{
                  fontFamily: 'Vollkorn',
                  fontSize: '35px',
                  fontStyle: 'italic',
                  fontWeight: 900,
                  lineHeight: '150%',
                  color: '#D72333',
                }}
              >
                {lang === 'de' ? 'Bücher' : 'Books'}
              </h2>
            </div>

            {/* 2. Erstes Bild */}
            <div className="mb-8">
              <Image
                src="/images/assets/IMG_4905 1.jpg"
                alt=""
                width={479}
                height={571}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>

            {/* 3. Text */}
            <div className="mb-8">
              <div
                style={{
                  fontFamily: 'Vollkorn',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '150%',
                  color: '#D72333',
                }}
              >
                {lang === 'de' ? (
                  <p>
                    In unserem Café findest du mehr als 4.000 Bücher – eine sorgsam ausgewählte Sammlung, die manchmal etwas außergewöhnlich und schräg sein mag, aber auf jeden Fall sehr besonders ist. Stöber durch unsere Regale, entdecke verborgene Schätze oder erfahre <a href="/bucher" className="underline">hier mehr</a> über unsere Bücherwelt.
                  </p>
                ) : (
                  <p>
                    In our café you'll find more than 4,000 books – a carefully curated collection that may at times be a little unusual or quirky, but is always something special. Browse our shelves, discover hidden treasures or learn <a href="/bucher" className="underline">more here</a> about our world of books.
                  </p>
                )}
              </div>
            </div>

            {/* 4. Zweites Bild */}
            <div className="mb-8">
              <Image
                src="/images/assets/I91A2497 1.jpg"
                alt=""
                width={589}
                height={393}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>

            {/* Bottom: Quote left, decorative images */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Left: Cicero Quote */}
              <div className="w-full md:w-1/2">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: '#D72333',
                    fontFamily: 'Iosevka, "Courier New", monospace',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 300,
                    lineHeight: '150%',
                  }}
                >
                  {lang === 'de' ? (
                    <>
                      <p>
                        "Ein Raum ohne Bücher ist wie ein Körper ohne Seele."
                      </p>
                      <p style={{ marginTop: '1rem' }}>
                        -Marcus Tullius Cicero
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        "A room without books is like a body without a soul."
                      </p>
                      <p style={{ marginTop: '1rem' }}>
                        -Marcus Tullius Cicero
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Right: Decorative images */}
              <div className="w-full md:w-1/2 flex gap-4 justify-start md:justify-end items-end">
                <div style={{ width: '80px', height: 'auto' }}>
                  <Image
                    src="/images/assets/monstera 1.svg"
                    alt=""
                    width={162}
                    height={199}
                    className="w-full h-auto object-contain"
                    unoptimized
                  />
                </div>
                <div style={{ width: '110px', height: 'auto' }}>
                  <Image
                    src="/images/assets/books1 1.svg"
                    alt=""
                    width={222}
                    height={194}
                    className="w-full h-auto object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Button: Entdecke unsere Bücherwelt */}
            <div className="mt-8 flex justify-start">
              <a
                href="/bucher"
                className="inline-block transition-colors duration-300 text-[#D72333] hover:bg-[#D72333] hover:text-[#f9f1da] cursor-pointer border-[3px] border-[#D72333] px-6 py-3 whitespace-nowrap"
                style={{
                  fontFamily: 'Vollkorn',
                  fontSize: '16px',
                  fontStyle: 'italic',
                  fontWeight: 900,
                  lineHeight: '150%',
                }}
              >
                {lang === "de" ? "Entdecke unsere Bücherwelt" : "Discover our world of books"}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop layout – ursprüngliches Figma-Layout */}
      <div 
        className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[1440px] h-[1567px]"
        style={{ top: '1086px' }}
      >
        {/* Bordüre 1 - decorative border */}
        <div 
          className="absolute"
          style={{ 
            width: '1063.75px', 
            height: '851px', 
            left: '206px',
            top: '106px',
            zIndex: 1
          }}
        >
          <Image
            src="/images/assets/bordüre 1.svg"
            alt="Bordüre"
            width={1064}
            height={851}
            className="object-contain"
            style={{
              width: '100%',
              height: '100%',
            }}
            unoptimized
          />
        </div>

        {/* Image: IMG_4886 1 */}
        <div 
          className="absolute overflow-hidden"
          style={{
            width: '806px',
            height: '531px',
            left: '338px',
            top: '266px',
            zIndex: 10
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/assets/neues_foto.jpg"
              alt="Café Interior"
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Heading: "Unsere Geschichte" */}
        <div 
          className="absolute"
          style={{
            width: '561px',
            height: '147px',
            left: '217px',
            top: '957px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#D72333',
            fontFamily: 'Vollkorn',
            fontSize: '35px',
            fontStyle: 'italic',
            fontWeight: 900,
            lineHeight: '150%',
            zIndex: 20
          }}
        >
          {lang === "de" ? "Unsere Geschichte" : "Our story"}
        </div>

        {/* Main text block with underlined links */}
        <div 
          className="absolute"
          style={{
            width: '666px',
            height: '465px',
            left: '212px',
            top: '1055px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#D72333',
            fontFamily: 'Vollkorn',
            fontSize: '23px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '150%',
            zIndex: 30
          }}
        >
          {lang === "de" ? (
            <>
              <p>
                Im phil verschmelzen Café und Buchhandlung zu einem gemütlichen Wohnzimmer Wiens. Seit 2004 kannst du bei uns entspannen, eintauchen in Bücherwelten und den Alltagsstress hinter dir lassen. In der charmanten Retro‑Einrichtung genießt du erlesene Kaffeespezialitäten, während du in sorgfältig kuratierten Bücherregalen stöberst – unsere Auswahl lädt dich ein, neue Welten zu entdecken. Erfahre mehr über unseren{" "}
                <a href="#schanigarten" className="underline" style={{ color: "#D72333" }}>
                  Schanigarten
                </a>
                {" "}oder stöbere in unserer{" "}
                <a href="/bucher" className="underline" style={{ color: "#D72333" }}>
                  Büchersammlung
                </a>
                .
              </p>
              <p style={{ marginTop: "1rem" }}>
                Unser Frühstück beziehen wir von regionalen Lieferanten und legen großen Wert auf Bio-Qualität. Für konzentriertes Arbeiten steht unter der Woche ein eigener Laptoptisch zur Verfügung. Am Wochenende bitten wir, auf Laptops zu verzichten, um die gemütliche Atmosphäre für alle zu bewahren.
              </p>
            </>
          ) : (
            <>
              <p>
                At phil, café and bookshop blend into one of Vienna’s cosiest living rooms. Since 2004, you’ve been able to relax here, dive into worlds of books and leave everyday stress at the door. In our charming retro interior you enjoy carefully selected coffee specialities while browsing lovingly curated shelves – our selection invites you to discover new worlds. Learn more about our{" "}
                <a href="#schanigarten" className="underline" style={{ color: "#D72333" }}>
                  outdoor seating
                </a>
                {" "}or explore our{" "}
                <a href="/bucher" className="underline" style={{ color: "#D72333" }}>
                  book collection
                </a>
                .
              </p>
              <p style={{ marginTop: "1rem" }}>
                We source our breakfast from regional suppliers and care deeply about organic quality. During the week there’s a dedicated laptop table for focused work. On weekends we kindly ask you to keep laptops closed so that everyone can enjoy the relaxed atmosphere.
              </p>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
