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

  // Static decorative items - ORIGINAL für Mobile (unverändert)
  const decorativeItemsMobile: DecorativeItem[] = [
    { id: 'lamp4', left: 786, top: 43, width: 297, height: 422, rotation: 6.687, src: '/images/assets/lamp4.webp', alt: lang === 'de' ? 'Lampe 4' : 'Lamp 4' },
    { id: 'lamp1', left: 585, top: 133, width: 194, height: 182, rotation: -7.105, src: '/images/assets/lamp1.webp', alt: lang === 'de' ? 'Lampe 1' : 'Lamp 1' },
    { id: 'loffel', left: 495, top: 555, width: 190, height: 285, rotation: 18.7, src: '/images/assets/loffel.webp', alt: lang === 'de' ? 'Löffel' : 'Spoon' },
    { id: 'kaennchen', left: 860, top: 495, width: 195, height: 210, rotation: -15.2, src: '/images/assets/kaennchen.webp', alt: lang === 'de' ? 'Kännchen' : 'Little pot' },
    { id: 'cup2', left: 615, top: 605, width: 230, height: 345, rotation: -8.5, src: '/images/assets/cup2.webp', alt: lang === 'de' ? 'Tasse 2' : 'Cup 2' },
    { id: 'pomidoro', left: 335, top: 625, width: 240, height: 175, rotation: 12.3, src: '/images/assets/pomidoro.webp', alt: 'Pomidoro' },
    { id: 'books2', left: 805, top: 680, width: 270, height: 305, rotation: -6.2, src: '/images/assets/books2.webp', alt: lang === 'de' ? 'Bücher 2' : 'Books 2' },
  ];

  // Desktop decorative items - VERKLEINERT für Desktop
  const decorativeItemsDesktop: DecorativeItem[] = [
    { id: 'lamp4', left: 746, top: 773, width: 162, height: 230, rotation: 6.687, src: '/images/assets/lamp4.webp', alt: lang === 'de' ? 'Lampe 4' : 'Lamp 4' },
    { id: 'lamp1', left: 545, top: 863, width: 106, height: 100, rotation: -7.105, src: '/images/assets/lamp1.webp', alt: lang === 'de' ? 'Lampe 1' : 'Lamp 1' },
    { id: 'loffel', left: 455, top: 1135, width: 104, height: 157, rotation: 18.7, src: '/images/assets/loffel.webp', alt: lang === 'de' ? 'Löffel' : 'Spoon' },
    { id: 'kaennchen', left: 820, top: 1075, width: 107, height: 115, rotation: -15.2, src: '/images/assets/kaennchen.webp', alt: lang === 'de' ? 'Kännchen' : 'Little pot' },
    { id: 'cup2', left: 575, top: 1185, width: 126, height: 189, rotation: -8.5, src: '/images/assets/cup2.webp', alt: lang === 'de' ? 'Tasse 2' : 'Cup 2' },
    { id: 'pomidoro', left: 295, top: 1205, width: 131, height: 96, rotation: 12.3, src: '/images/assets/pomidoro.webp', alt: 'Pomidoro' },
    { id: 'books2', left: 765, top: 1260, width: 148, height: 167, rotation: -6.2, src: '/images/assets/books2.webp', alt: lang === 'de' ? 'Bücher 2' : 'Books 2' },
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
              src="/images/assets/IMG_4886.webp"
              alt="Café Interior im phil"
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 0px"
            />
          </div>
          {/* Bordüre: darüber, als Rahmen - muss transparente Bereiche haben */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
            <Image
              src="/images/assets/bordüre 1.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Collage-Elemente oberhalb – wild über die Ebene verteilt */}
        <div className="relative w-full min-h-[140px] -mb-4 overflow-visible">
          {[
            { id: "lamp4", left: "0%", top: "5%" },
            { id: "lamp1", left: "22%", top: "0%" },
            { id: "loffel", left: "38%", top: "12%" },
            { id: "kaennchen", left: "58%", top: "2%" },
            { id: "cup2", left: "78%", top: "8%" },
          ].map(({ id, left, top }) => {
            const item = decorativeItemsMobile.find((i) => i.id === id);
            if (!item) return null;
            const scale = id === "lamp1" ? 0.32 : id === "cup2" ? 0.32 : 0.28;
            const w = Math.round(item.width * scale);
            const h = Math.round(item.height * scale);
            return (
              <div
                key={id}
                className="absolute rounded-2xl overflow-hidden z-10"
                style={{ left, top, width: w, height: h }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={w}
                  height={h}
                  className="object-contain w-full h-full"
                  loading="lazy"
                  unoptimized
                />
              </div>
            );
          })}
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

        {/* 2 Bilder unterhalb – wild verteilt */}
        <div className="relative w-full min-h-[100px] mb-3 overflow-visible">
          {[
            { id: "pomidoro", left: "8%", top: "0%" },
            { id: "books2", left: "62%", top: "-50%" },
          ].map(({ id, left, top }) => {
            const item = decorativeItemsMobile.find((i) => i.id === id);
            if (!item) return null;
            const scale = id === "books2" ? 0.36 : 0.28;
            const w = Math.round(item.width * scale);
            const h = Math.round(item.height * scale);
            return (
              <div
                key={id}
                className="absolute rounded-2xl overflow-hidden z-10"
                style={{ left, top, width: w, height: h }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={w}
                  height={h}
                  className="object-contain w-full h-full"
                  loading="lazy"
                  unoptimized
                />
              </div>
            );
          })}
        </div>

        {/* Besuch-uns-Button + Hinweis "walk in's only" – auf Mobile etwas kleiner, Text direkt unter dem Button zentriert */}
        <div className="mt-4 flex flex-col items-center gap-1">
          <a
            href="https://maps.app.goo.gl/pV95cu8bmQELWfgS8"
            target="_blank"
            rel="noopener noreferrer"
            className="border-[2px] border-primary px-4 py-1.5 inline-flex items-center justify-center transition-all duration-150 text-[#D72333] hover:bg-primary hover:text-cream active:bg-primary active:text-cream active:scale-95"
            style={{
              fontFamily: "Vollkorn, serif",
              fontSize: "16px",
              fontStyle: "italic",
              fontWeight: 900,
              lineHeight: "150%",
            }}
          >
            {lang === "de" ? "Besuch uns" : "Visit Us"}
          </a>

          <p
            className="text-center"
            style={{
              color: "#D72333",
              fontFamily: "Vollkorn, serif",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "150%",
            }}
          >
            {lang === "de" ? "walk ins only" : "walk ins only"}
          </p>
        </div>

        {/* Foto-Grid – weit unten, unter Besuch uns + allen Dekoelementen (Pomidoro, Tassen etc.) */}
        <div className="mt-24 w-full max-w-[900px] mx-auto grid grid-cols-3 gap-4">
          {[
            { file: "1_Lokal", alt: "phil Lokal" },
            { file: "2_Spiegel", alt: "phil Spiegel" },
            { file: "3_Abend", alt: "phil Abend" },
            { file: "4_Lampen", alt: "phil Lampen" },
            { file: "5_Eingang", alt: "phil Eingang" },
            { file: "6_Bedienung", alt: "phil Bedienung" },
          ].map(({ file, alt }) => (
            <div key={file} className="relative aspect-square overflow-hidden">
              <Image
                src={`/images/assets/${file}.webp`}
                alt={alt}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 33vw, 300px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Collage-Layout – nur auf Desktop (Besuch uns, Pomidoro, Tassen etc.) */}
      <div className="hidden md:block relative w-[1440px] mx-auto" style={{ minHeight: '1650px' }}>
        {/* Handwritten text graphic "wo-kaffee-2 1.svg" - positioned relative to centered container */}
        <div className="absolute left-[420px] w-[550px] h-[203px]" style={{ top: '980px', transform: 'rotate(4.548deg)' }}>
          <Image
            src="/images/assets/wo-kaffee-2 1.svg"
            alt={lang === 'de' ? 'Wo Kaffee, Bücher & Kultur in Wien zusammenkommen' : 'Where coffee, books & culture come together in Vienna'}
            width={550}
            height={203}
            className="object-contain"
            loading="lazy"
          />
        </div>

        {/* Outer container - positioned relative to centered container */}
        <div 
          className="absolute left-[326px] w-[1130px] h-[1500px]"
          style={{ top: '40px' }}
        >
          {/* phil-items container - inner container with all items */}
          <div className="absolute left-0 top-0 w-[1130px] h-[1500px] flex-shrink-0">
        
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

            {/* Foto mit Bordüre – Café-Innenraum, direkt unter der Überschrift – zentriert zur Seitenmitte (720px) */}
            <div 
              className="absolute overflow-hidden"
              style={{ width: '794px', height: '596px', left: 'calc(720px - 326px - 397px)', top: '190px' }}
            >
              <div className="absolute inset-[12%] overflow-hidden" style={{ zIndex: 1 }}>
                <Image
                  src="/images/assets/IMG_4886.webp"
                  alt="Café Interior im phil"
                  fill
                  className="object-cover"
                  priority
                  sizes="794px"
                />
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
                <Image
                  src="/images/assets/bordüre 1.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Decorative Floating Images - Desktop only */}
            {decorativeItemsDesktop.map((item) => {
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
              className="absolute left-[-120px] w-[189px] h-[73px] border-[5px] border-primary flex items-center justify-center transition-all duration-200 hover:bg-primary group z-20"
              style={{
                top: '1300px',
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
            className="absolute left-[-120px] w-[324px] h-[66px] flex flex-col justify-center"
            style={{
              top: '1373px',
              textAlign: 'left',
              color: '#D72333',
              fontFamily: 'Vollkorn, serif',
              fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '150%',
              }}
            >
              {lang === 'de' ? "walk ins only" : "walk ins only"}
            </div>

          </div>
        </div>
      </div>

      {/* Foto-Grid – Desktop: weit unten unter Collage (Besuch uns, Pomidoro, Tassen etc.) */}
      <div className="hidden md:block w-full max-w-[950px] mx-auto px-6 pt-8 pb-16">
        <div className="grid grid-cols-3 gap-5">
          {[
            { file: "1_Lokal", alt: "phil Lokal" },
            { file: "2_Spiegel", alt: "phil Spiegel" },
            { file: "3_Abend", alt: "phil Abend" },
            { file: "4_Lampen", alt: "phil Lampen" },
            { file: "5_Eingang", alt: "phil Eingang" },
            { file: "6_Bedienung", alt: "phil Bedienung" },
          ].map(({ file, alt }) => (
            <div key={file} className="relative aspect-square overflow-hidden">
              <Image
                src={`/images/assets/${file}.webp`}
                alt={alt}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(min-width: 768px) 310px, 300px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
