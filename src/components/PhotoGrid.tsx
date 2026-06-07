"use client";

import Image from "next/image";

const PHOTOS = [
  { src: "/images/assets/breakfast-spread.jpg", alt: "phil Frühstück" },
  { src: "/images/assets/phil-good.jpg",        alt: "phil good – Falafel, Hummus, Sourdough" },
  { src: "/images/assets/phil-drinks.jpg",      alt: "Getränke im phil" },
  { src: "/images/assets/schanigarten.webp",    alt: "Schanigarten" },
  { src: "/images/assets/coffee-cake.jpg",      alt: "Kaffee und Kuchen" },
  { src: "/images/assets/1_Lokal.webp",         alt: "phil Innenraum" },
];

export function PhotoGrid() {
  return (
    <section className="w-full overflow-hidden">
      {/* Mobile: 2 columns */}
      <div className="grid grid-cols-2 md:hidden">
        {PHOTOS.map(({ src, alt }, i) => (
          <div key={src} className="relative aspect-square overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              loading={i < 2 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="50vw"
            />
          </div>
        ))}
      </div>

      {/* Desktop: 3 columns */}
      <div className="hidden md:grid grid-cols-3">
        {PHOTOS.map(({ src, alt }, i) => (
          <div key={src} className="relative aspect-square overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              loading={i < 3 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
