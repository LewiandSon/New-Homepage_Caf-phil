"use client";

import Image from "next/image";

const PHOTOS = [
  { src: "/images/assets/1_Lokal.webp",      alt: "phil Lokal" },
  { src: "/images/assets/2_Spiegel.webp",    alt: "phil Spiegel" },
  { src: "/images/assets/3_Abend.webp",      alt: "phil Abend" },
  { src: "/images/assets/4_Lampen.webp",     alt: "phil Lampen" },
  { src: "/images/assets/5_Eingang.webp",    alt: "phil Eingang" },
  { src: "/images/assets/6_Bedienung.webp",  alt: "phil Bedienung" },
];

export function PhotoGrid() {
  return (
    <section className="w-full px-4 py-6 md:px-6 md:py-10 max-w-[950px] mx-auto">
      <div className="grid grid-cols-3 gap-3 md:gap-5">
        {PHOTOS.map(({ src, alt }, i) => (
          <div key={src} className="relative aspect-square overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              loading={i < 3 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 33vw, 310px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
