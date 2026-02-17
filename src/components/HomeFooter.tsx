"use client";

import Image from "next/image";
import { useState, Fragment } from "react";

interface HomeFooterProps {
  onModalOpen: (modal: "imprint" | "privacy" | "terms") => void;
}

export function HomeFooter({ onModalOpen }: HomeFooterProps) {
  const [showInstagramStrich, setShowInstagramStrich] = useState(false);

  return (
    <footer
      className="hidden md:flex flex-col items-center justify-center py-16 px-6 mt-16"
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
              onClick={() => onModalOpen(item.id)}
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
            src="/images/assets/instagram 1.svg"
            alt="Folge uns auf Instagram"
            fill
            className="object-contain"
            unoptimized
          />
          {showInstagramStrich && (
            <>
              <Image
                src="/images/assets/unterstreichung-beige.png"
                alt=""
                width={110}
                height={16}
                className="absolute bottom-[50px] left-[43%] object-contain pointer-events-none"
                style={{ zIndex: 10, transform: 'rotate(-3deg)' }}
                unoptimized
              />
              <Image
                src="/images/assets/unterstreichung-beige.png"
                alt=""
                width={110}
                height={16}
                className="absolute bottom-[8px] left-[43%] object-contain pointer-events-none"
                style={{ zIndex: 10, transform: 'rotate(-3deg)' }}
                unoptimized
              />
            </>
          )}
        </a>
      </div>
    </footer>
  );
}
