"use client";

import Image from "next/image";
import { useLanguage } from "../LanguageContext";

interface DecorativeItem {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
  src: string;
  alt: string;
}

export function HeroSection() {
  const { lang } = useLanguage();

  // Static decorative items - positions from Builder.io
  const decorativeItems: DecorativeItem[] = [
    { id: 'lamp4', left: 786, top: 43, width: 297, height: 422, rotation: 6.687, src: '/images/assets/lamp4.webp', alt: lang === 'de' ? 'Lampe 4' : 'Lamp 4' },
    { id: 'lamp1', left: 585, top: 133, width: 194, height: 182, rotation: -7.105, src: '/images/assets/lamp1.webp', alt: lang === 'de' ? 'Lampe 1' : 'Lamp 1' },
    { id: 'loffel', left: 527, top: 585, width: 120, height: 182, rotation: 11.949, src: '/images/assets/loffel.webp', alt: lang === 'de' ? 'Löffel' : 'Spoon' },
    { id: 'kaennchen', left: 830, top: 526, width: 124, height: 134, rotation: -9.647, src: '/images/assets/kaennchen.webp', alt: lang === 'de' ? 'Kännchen' : 'Little pot' },
    { id: 'cup2', left: 644, top: 634, width: 156, height: 234, rotation: 0, src: '/images/assets/cup2.webp', alt: lang === 'de' ? 'Tasse 2' : 'Cup 2' },
    { id: 'pomidoro', left: 363, top: 655, width: 217, height: 157, rotation: 1.856, src: '/images/assets/pomidoro.webp', alt: 'Pomidoro' },
    { id: 'books2', left: 776, top: 655, width: 251, height: 282, rotation: 0, src: '/images/assets/books2.webp', alt: lang === 'de' ? 'Bücher 2' : 'Books 2' },
  ];

  return (
    <div className="relative w-full max-w-[1440px] mx-auto">
      {/* Mobile layout – phil-Heading, Foto, Collage, dann handschriftliche Grafik */}
      <div className="block md:hidden px-4 pt-6 pb-12 max-w-[720px] mx-auto">
        <h1
          className="mb-6 text-center"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "24px",
            fontStyle: "italic",
            fontWeight: 900,
            lineHeight: "150%",
            color: "#D72333",
          }}
        >
          {lang === "de"
            ? "phil - Café, Buchhandlung & Bar in Wien"
            : "phil - café, bookshop & bar in Vienna"}
        </h1>

        {/* Foto mit Bordüre – auf Mobile über die Innenränder hinausziehen */}
        <div
          className="relative mb-8"
          style={{
            width: "calc(100% + 3rem)", // noch ein kleines Stück über den Rand hinaus
            marginLeft: "-1.5rem",
            marginRight: "-1.5rem",
            aspectRatio: "4/3",
            minHeight: "300px",
          }}
        >
          {/* Hauptfoto: zuerst im DOM, als Hintergrund - zurück zur ursprünglichen Datei wie auf Desktop */}
          <div className="absolute inset-[16%] overflow-hidden" style={{ zIndex: 1 }}>
            <Image
              src="/images/assets/IMG_4886 1.svg"
              alt="Café Interior im phil"
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 0px"
              unoptimized
            />
          </div>
          {/* Bordüre: darüber, als Rahmen - muss transparente Bereiche haben */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
            <Image
              src="/images/assets/bordüre 1.svg"
              alt=""
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* Collage-Elemente oberhalb – Lampen, Löffel, Kännchen, Tasse */}
        <div className="flex flex-wrap justify-center gap-3 -mb-4">
          {decorativeItems
            .filter((item) => ["lamp4", "lamp1", "loffel", "kaennchen", "cup2"].includes(item.id))
            .map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden shrink-0"
                style={{
                  width: Math.round(item.width * 0.28),
                  height: Math.round(item.height * 0.28),
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={Math.round(item.width * 0.35)}
                  height={Math.round(item.height * 0.35)}
                  className="object-contain w-full h-full"
                  loading="lazy"
                  unoptimized
                />
              </div>
            ))}
        </div>

        {/* Handschriftlicher Spruch */}
        <div className="w-full mb-8">
          <Image
            src="/images/assets/wo-kaffee-2 1.svg"
            alt={lang === "de" ? "Wo Kaffee, Bücher & Kultur in Wien zusammenkommen" : "Where coffee, books & culture come together in Vienna"}
            width={800}
            height={300}
            className="w-full h-auto object-contain"
            loading="lazy"
            unoptimized
          />
        </div>

        {/* 2 Bilder unterhalb – Dosen (Pomidoro) und Bücher */}
        <div className="flex flex-wrap justify-center gap-3 mb-3">
          {decorativeItems
            .filter((item) => ["pomidoro", "books2"].includes(item.id))
            .map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden shrink-0"
                style={{
                  width: Math.round(item.width * 0.28),
                  height: Math.round(item.height * 0.28),
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={Math.round(item.width * 0.35)}
                  height={Math.round(item.height * 0.35)}
                  className="object-contain w-full h-full"
                  loading="lazy"
                  unoptimized
                />
              </div>
            ))}
        </div>

        {/* Besuch-uns-Button + Hinweis "walk in's only" – auf Mobile etwas kleiner, Text direkt unter dem Button zentriert */}
        <div className="mt-4 flex flex-col items-center gap-1">
          <a
            href="https://maps.app.goo.gl/pV95cu8bmQELWfgS8"
            target="_blank"
            rel="noopener noreferrer"
            className="border-[2px] border-primary px-4 py-1.5 inline-flex items-center justify-center transition-all duration-200 hover:bg-primary group"
            style={{
              color: "#D72333",
              fontFamily: "Vollkorn, serif",
              fontSize: "16px",
              fontStyle: "italic",
              fontWeight: 900,
              lineHeight: "150%",
            }}
          >
            <span className="group-hover:text-cream transition-colors duration-200">
              {lang === "de" ? "Besuch uns" : "Visit us"}
            </span>
          </a>

          <p
            className="text-center"
            style={{
              color: "#D72333",
              fontFamily: "Vollkorn, serif",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "150%",
            }}
          >
            {lang === "de" ? "walk in's only" : "walk-ins only"}
          </p>
        </div>
      </div>

      {/* Collage-Layout – nur auf Desktop, damit die Seite auf Mobile nicht 1440px breit wird */}
      <div className="hidden md:block relative w-[1440px] mx-auto">
        {/* Handwritten text graphic "wo-kaffee-2 1.svg" - positioned relative to centered container */}
        <div className="absolute left-[272px] w-[643px] h-[237px]" style={{ top: '400px', transform: 'rotate(4.548deg)' }}>
          <Image
            src="/images/assets/wo-kaffee-2 1.svg"
            alt={lang === 'de' ? 'Wo Kaffee, Bücher & Kultur in Wien zusammenkommen' : 'Where coffee, books & culture come together in Vienna'}
            width={643}
            height={237}
            className="object-contain"
            loading="lazy"
          />
        </div>

        {/* Outer container - positioned relative to centered container */}
        <div 
          className="absolute left-[326px] w-[1130px] h-[878px]"
          style={{ top: '40px' }}
        >
          {/* phil-items container - inner container with all items */}
          <div className="absolute left-0 top-0 w-[1130px] h-[878px] flex-shrink-0">
        
            {/* Main heading: "phil - Café, Buchhandlung & Bar in Wien" */}
            {/* From Figma: color: #D72333, font-family: Vollkorn, font-size: 35px, font-style: italic, font-weight: 900, line-height: 150% */}
            <div 
              className="absolute left-[106px] w-[561px] h-[147px] flex flex-col justify-center"
              style={{
                top: '24px',
                textAlign: 'center',
                color: '#D72333',
                fontFamily: 'Vollkorn, serif',
                fontSize: '35px',
                fontStyle: 'italic',
                fontWeight: 900,
                lineHeight: '150%',
              }}
            >
              {lang === 'de' ? (
                <>
                  phil - Café, Buchhandlung<br />
                  & Bar in Wien
                </>
              ) : (
                <>
                  phil - café, bookshop<br />
                  & bar in Vienna
                </>
              )}
            </div>

            {/* Decorative Floating Images */}
            {decorativeItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="absolute select-none z-10"
                  style={{
                    left: `${item.left}px`,
                    top: `${item.top}px`,
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                    transform: `rotate(${item.rotation}deg)`,
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="object-contain pointer-events-none"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              );
            })}

            {/* "Besuch uns" button with hover effect and Google Maps link */}
            {/* From Figma: color: #D72333, font-family: Vollkorn, font-size: 25px, font-style: italic, font-weight: 900, line-height: 150% */}
            <a
              href="https://maps.app.goo.gl/pV95cu8bmQELWfgS8"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-[-180px] w-[189px] h-[73px] border-[5px] border-primary flex items-center justify-center transition-all duration-200 hover:bg-primary group z-20"
              style={{
                top: '671px',
                textAlign: 'center',
                color: '#D72333',
                fontFamily: 'Vollkorn, serif',
                fontSize: '25px',
                fontStyle: 'italic',
                fontWeight: 900,
                lineHeight: '150%',
              }}
            >
              <span className="group-hover:text-cream transition-colors duration-200">
                {lang === 'de' ? 'Besuch uns' : 'Visit us'}
              </span>
            </a>

            {/* "walk in's only" text - wie ursprünglich auf Desktop (breiter, linksbündig) */}
            {/* From Figma: color: #D72333, font-family: Vollkorn, font-size: 30px, font-style: normal, font-weight: 500, line-height: 150% */}
            <div 
              className="absolute left-[-180px] w-[324px] h-[66px] flex flex-col justify-center"
              style={{
                top: '744px',
                textAlign: 'left',
                color: '#D72333',
                fontFamily: 'Vollkorn, serif',
                fontSize: '30px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '150%',
              }}
            >
              {lang === 'de' ? "walk in's only" : "walk-ins only"}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
