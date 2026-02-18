"use client";

import Image from "next/image";
import { Fragment } from "react";
import { InstagramLink } from "./InstagramLink";

interface HomeFooterProps {
  onModalOpen: (modal: "imprint" | "privacy" | "terms") => void;
}

export function HomeFooter({ onModalOpen }: HomeFooterProps) {

  return (
    <footer
      className="hidden md:flex flex-col items-center justify-center py-16 px-6 mt-32"
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
        <InstagramLink />
      </div>
    </footer>
  );
}
