"use client";

import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { QuoteSection } from "@/components/QuoteSection";
import { HomeFooter } from "@/components/HomeFooter";
import { ClimateBanner } from "@/components/ClimateBanner";
import { useState, useEffect } from "react";
import type { EventPreview } from "@/sanity/queries";

interface HomeClientProps {
  initialNextEvent: EventPreview | null;
}

export function HomeClient({ initialNextEvent }: HomeClientProps) {
  const [footerModal, setFooterModal] = useState<"imprint" | "privacy" | "terms" | null>(null);

  // Prevent body scroll when footer modal is open
  useEffect(() => {
    if (footerModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [footerModal]);

  return (
    <>
      <main data-page="home" className="relative min-h-screen bg-background text-primary font-serif pt-[100px] md:pt-[150px] overflow-x-hidden">
        <ClimateBanner />
        <div className="md:scale-[0.855] md:origin-top">
          <HeroSection />
          <AboutSection />
          <QuoteSection
            footerModal={footerModal}
            setFooterModal={setFooterModal}
            initialNextEvent={initialNextEvent}
          />
        </div>
      </main>
      <HomeFooter onModalOpen={setFooterModal} />

      {/* Footer Modal */}
      {footerModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setFooterModal(null)}
        >
          <div
            className="relative w-[90%] max-w-[520px] bg-[#D72333] text-[#F9F1DA] px-6 md:px-8 py-8 md:py-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setFooterModal(null)}
              className="absolute right-4 top-4 text-[#F9F1DA] transition-colors duration-200"
              style={{ fontSize: "28px", fontWeight: 900 }}
              aria-label="Close"
            >
              ×
            </button>

            {footerModal === "imprint" && (
              <div
                style={{
                  fontFamily: "Vollkorn",
                  fontSize: "18px",
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
                  fontSize: "18px",
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
                  fontSize: "18px",
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
    </>
  );
}
