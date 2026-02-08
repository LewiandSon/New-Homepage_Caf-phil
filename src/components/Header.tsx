"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "../LanguageContext";
import { useState, useEffect } from "react";

export function Header() {
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkStyle = {
    color: "#D72333",
    fontFamily: "Vollkorn",
    fontSize: "28px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname?.startsWith(path + "/");
  };

  // Findet das sichtbare Element für eine Section (Mobile/Desktop haben unterschiedliche Layouts)
  const scrollToSection = (sectionId: string) => {
    // Erst nach id suchen
    const byId = document.getElementById(sectionId);
    if (byId && byId.offsetParent !== null) {
      byId.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    // Fallback: data-section (für doppelte Sections auf Mobile/Desktop)
    const candidates = document.querySelectorAll(`[data-section="${sectionId}"]`);
    const visible = Array.from(candidates).find((el) => el instanceof HTMLElement && el.offsetParent !== null);
    if (visible) {
      visible.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDesktopNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: "uber-uns" | "speisekarte" | "kontakt"
  ) => {
    e.preventDefault();
    if (pathname !== "/") {
      window.location.href = `/#${target}`;
      return;
    }
    scrollToSection(target);
  };

  const handleInPageNav = () => {
    setMobileOpen(false);
  };

  // Hash beim Laden bzw. bei Navigation zur Startseite
  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") return;
    const hash = window.location.hash?.slice(1);
    if (hash) {
      setTimeout(() => scrollToSection(hash), 50);
    }
  }, [pathname]);

  // Hash-Wechsel auf der Startseite (z.B. Klick auf #speisekarte von Schanigarten)
  useEffect(() => {
    const onHashChange = () => {
      if (pathname !== "/") return;
      const hash = window.location.hash?.slice(1);
      if (hash) scrollToSection(hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[100] bg-background">
      <div className="w-full max-w-[1440px] h-[90px] md:h-[115px] mx-auto flex items-center justify-between px-4 md:px-10">
        {/* Logo */}
        <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex-shrink-0">
          <a
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              setMobileOpen(false);
            }}
          >
            <Image
              src="/images/assets/ausgesprochen_viel.webp"
              alt="phil logo"
              width={100}
              height={100}
              className="object-contain hover:opacity-80 transition-opacity"
              unoptimized
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-[32px]">
          <a
            href="/#uber-uns"
            className="nav-link hover:opacity-80 transition-opacity whitespace-nowrap"
            style={linkStyle}
            onClick={(e) => handleDesktopNav(e, "uber-uns")}
          >
            {lang === "de" ? "Über uns" : "About us"}
          </a>
          <a
            href="/#speisekarte"
            className="nav-link hover:opacity-80 transition-opacity whitespace-nowrap"
            style={linkStyle}
            onClick={(e) => handleDesktopNav(e, "speisekarte")}
          >
            {lang === "de" ? "Speisekarte" : "Menu"}
          </a>
          <a
            href="/bucher"
            className={`nav-link hover:opacity-80 transition-opacity whitespace-nowrap ${
              isActive("/bucher") ? "active" : ""
            }`}
            style={linkStyle}
          >
            {lang === "de" ? "Bücher" : "Books"}
          </a>
          <a
            href="/events"
            className={`nav-link hover:opacity-80 transition-opacity whitespace-nowrap ${
              isActive("/events") ? "active" : ""
            }`}
            style={linkStyle}
          >
            Events
          </a>
          <a
            href="/mieten"
            className={`nav-link hover:opacity-80 transition-opacity whitespace-nowrap ${
              isActive("/mieten") ? "active" : ""
            }`}
            style={linkStyle}
          >
            {lang === "de" ? "Mieten" : "Venue hire"}
          </a>
          <a
            href="/#kontakt"
            className="nav-link hover:opacity-80 transition-opacity whitespace-nowrap"
            style={linkStyle}
            onClick={(e) => handleDesktopNav(e, "kontakt")}
          >
            {lang === "de" ? "Kontakt" : "Contact"}
          </a>
          <a
            href="/faq"
            className={`nav-link hover:opacity-80 transition-opacity whitespace-nowrap ${
              isActive("/faq") ? "active" : ""
            }`}
            style={linkStyle}
          >
            FAQ
          </a>
        </nav>

        {/* Right side: language + mobile menu */}
        <div className="flex items-center gap-4">
          {/* Desktop language switcher */}
          <div className="hidden md:flex flex-col justify-center">
            <div style={linkStyle} className="flex items-center">
              <button
                onClick={() => setLang("de")}
                className={`inline-flex items-center justify-center transition-all duration-200 ${
                  lang === "de"
                    ? "bg-[#D72333] text-[#F9F1DA]"
                    : "bg-transparent text-[#D72333] hover:opacity-80"
                }`}
                style={{
                  width: "57px",
                  height: "40px",
                  fontFamily: "Vollkorn",
                  fontSize: "28px",
                  fontWeight: 500,
                  lineHeight: "1",
                }}
              >
                DE
              </button>
              <span className="text-[#D72333] ml-2">|</span>
              <button
                onClick={() => setLang("en")}
                className={`ml-2 inline-flex items-center justify-center transition-all duration-200 ${
                  lang === "en"
                    ? "bg-[#D72333] text-[#F9F1DA]"
                    : "bg-transparent text-[#D72333] hover:opacity-80"
                }`}
                style={{
                  width: "57px",
                  height: "40px",
                  fontFamily: "Vollkorn",
                  fontSize: "28px",
                  fontWeight: 500,
                  lineHeight: "1",
                }}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile language + burger */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="flex items-center">
              <button
                onClick={() => setLang("de")}
                className={`inline-flex items-center justify-center transition-all duration-200 ${
                  lang === "de"
                    ? "bg-[#D72333] text-[#F9F1DA]"
                    : "bg-transparent text-[#D72333] hover:opacity-80"
                }`}
                style={{
                  width: "44px",
                  height: "32px",
                  fontFamily: "Vollkorn",
                  fontSize: "22px",
                  fontWeight: 500,
                  lineHeight: "1",
                }}
              >
                DE
              </button>
              <span className="text-[#D72333] mx-1">|</span>
              <button
                onClick={() => setLang("en")}
                className={`inline-flex items-center justify-center transition-all duration-200 ${
                  lang === "en"
                    ? "bg-[#D72333] text-[#F9F1DA]"
                    : "bg-transparent text-[#D72333] hover:opacity-80"
                }`}
                style={{
                  width: "44px",
                  height: "32px",
                  fontFamily: "Vollkorn",
                  fontSize: "22px",
                  fontWeight: 500,
                  lineHeight: "1",
                }}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="text-[#D72333] hover:opacity-80 transition-opacity"
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            >
              <span className="block w-6 h-[2px] bg-[#D72333] mb-1" />
              <span className="block w-6 h-[2px] bg-[#D72333] mb-1" />
              <span className="block w-6 h-[2px] bg-[#D72333]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#D72333] bg-background">
          <nav className="flex flex-col px-6 py-4 gap-3">
            <a
              href="/#uber-uns"
              className="hover:opacity-80 transition-opacity"
              style={linkStyle}
              onClick={handleInPageNav}
            >
              {lang === "de" ? "Über uns" : "About us"}
            </a>
            <a
              href="/#speisekarte"
              className="hover:opacity-80 transition-opacity"
              style={linkStyle}
              onClick={handleInPageNav}
            >
              {lang === "de" ? "Speisekarte" : "Menu"}
            </a>
            <a
              href="/bucher"
              className="hover:opacity-80 transition-opacity"
              style={linkStyle}
              onClick={() => setMobileOpen(false)}
            >
              {lang === "de" ? "Bücher" : "Books"}
            </a>
            <a
              href="/events"
              className="hover:opacity-80 transition-opacity"
              style={linkStyle}
              onClick={() => setMobileOpen(false)}
            >
              Events
            </a>
            <a
              href="/mieten"
              className="hover:opacity-80 transition-opacity"
              style={linkStyle}
              onClick={() => setMobileOpen(false)}
            >
              {lang === "de" ? "Mieten" : "Venue hire"}
            </a>
            <a
              href="/#kontakt"
              className="hover:opacity-80 transition-opacity"
              style={linkStyle}
              onClick={handleInPageNav}
            >
              {lang === "de" ? "Kontakt" : "Contact"}
            </a>
            <a
              href="/faq"
              className="hover:opacity-80 transition-opacity"
              style={linkStyle}
              onClick={() => setMobileOpen(false)}
            >
              FAQ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
