"use client";

import { Header } from "@/components/Header";
import Image from "next/image";
import { useState, Fragment } from "react";
import { useLanguage } from "../../LanguageContext";

type FAQItem = {
  question: string;
  answer: string | React.ReactNode;
};

const FAQ_DATA_DE: FAQItem[] = [
  {
    question: "Kann man bei euch reservieren?",
    answer: "Grundsätzlich brauchst du bei uns keine Reservierung – komm einfach vorbei und genieße deinen Aufenthalt.",
  },
  {
    question: "Wie sind eure Öffnungszeiten?",
    answer: "Unsere Öffnungszeiten findest du auf unserer Kontaktseite.",
  },
  {
    question: "Wie kann ich bei euch ein Buch bestellen?",
    answer: "Du kannst uns direkt kontaktieren oder vorbeikommen, um ein Buch zu bestellen.",
  },
  {
    question: "Habt ihr Gutscheine?",
    answer: "Ja, wir bieten Gutscheine an. Komm einfach vorbei oder kontaktiere uns.",
  },
  {
    question: "Kann man bei euch als Künstler*in ausstellen?",
    answer: "Ja, wir freuen uns über Vorschläge für Ausstellungen. Kontaktiere uns gerne.",
  },
  {
    question: "Ich möchte bei euch ein Event veranstalten - ist das möglich?",
    answer: "Ja, das ist möglich! Schau dir unsere Mieten-Seite an oder kontaktiere uns direkt.",
  },
  {
    question: "Kann man bei euch arbeiten oder studieren?",
    answer: "Unter der Woche steht ein eigener Laptoptisch zur Verfügung. Am Wochenende bitten wir, auf Laptops zu verzichten, um die gemütliche Atmosphäre für alle zu bewahren.",
  },
  {
    question: "Habt ihr WLAN?",
    answer: "Ja, wir bieten kostenloses WLAN für unsere Gäste.",
  },
  {
    question: "Seid ihr barrierefrei?",
    answer: "Bitte kontaktiere uns direkt, um Details zur Barrierefreiheit zu erfahren.",
  },
  {
    question: "Darf man Bücher lesen ohne sie zu kaufen?",
    answer: "Ja, du kannst gerne in unseren Büchern stöbern und lesen, auch ohne sie zu kaufen.",
  },
  {
    question: "Sind Hunde erlaubt?",
    answer: "Ja, Hunde sind bei uns willkommen.",
  },
  {
    question: "Kann man bei euch mit Bankomat zahlen?",
    answer: "Ja, wir akzeptieren sowohl Bar- als auch Kartenzahlung.",
  },
  {
    question: "Warum heißt es eigentlich phil?",
    answer: "phil steht für Philosophie, Literatur und das Philosophieren über Bücher und das Leben.",
  },
  {
    question: "Ich finde meine Frage hier nicht...",
    answer: (
      <>
        Kein Problem! Kontaktiere uns gerne direkt über unsere{" "}
        <a href="/#kontakt" className="underline hover:opacity-80">
          Kontaktseite
        </a>
        {" "}oder schreib uns eine E-Mail.
      </>
    ),
  },
];

const FAQ_DATA_EN: FAQItem[] = [
  {
    question: "Can I make a reservation?",
    answer: "Basically you don’t need a reservation with us – just drop by and enjoy your time.",
  },
  {
    question: "What are your opening hours?",
    answer: "You’ll find our opening hours on our contact page.",
  },
  {
    question: "How can I order a book from you?",
    answer: "You can contact us directly or simply drop by to order a book.",
  },
  {
    question: "Do you offer gift vouchers?",
    answer: "Yes, we do. Just drop in or get in touch with us.",
  },
  {
    question: "Can I exhibit as an artist at phil?",
    answer: "Yes, we’re happy to receive proposals for exhibitions. Just contact us.",
  },
  {
    question: "I’d like to host an event at phil – is that possible?",
    answer: "Yes, absolutely! Have a look at our rental page or contact us directly.",
  },
  {
    question: "Can I work or study at your café?",
    answer: "During the week there’s a dedicated laptop table. On weekends we kindly ask you to keep laptops closed to preserve the cosy atmosphere.",
  },
  {
    question: "Do you have Wi-Fi?",
    answer: "Yes, we offer free Wi‑Fi for our guests.",
  },
  {
    question: "Are you accessible?",
    answer: "Please contact us directly so we can give you detailed information about accessibility.",
  },
  {
    question: "Can I read books without buying them?",
    answer: "Yes, you’re very welcome to browse and read our books even if you don’t buy them.",
  },
  {
    question: "Are dogs allowed?",
    answer: "Yes, dogs are very welcome.",
  },
  {
    question: "Can I pay by card?",
    answer: "Yes, we accept both cash and card payments.",
  },
  {
    question: "Why is it called phil?",
    answer: "phil stands for philosophy, literature and philosophising about books and life.",
  },
  {
    question: "I can’t find my question here…",
    answer: (
      <>
        No problem! Feel free to contact us directly via our{" "}
        <a href="/#kontakt" className="underline hover:opacity-80">
          contact section
        </a>
        {" "}or send us an email.
      </>
    ),
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const [footerModal, setFooterModal] = useState<"imprint" | "privacy" | "terms" | null>(null);
  const { lang } = useLanguage();
  const FAQ_DATA = lang === "de" ? FAQ_DATA_DE : FAQ_DATA_EN;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="relative min-h-screen bg-[#F9F1DA] text-[#D72333] font-serif pt-[150px]">
      <Header />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 pb-24">
        {/* Table Image - unterhalb des Headers, oberhalb der FAQ-Box, weiter links */}
        <div className="relative w-full" style={{ minHeight: "282px", marginBottom: "40px", marginTop: "20px" }}>
          <div 
            className="absolute top-0 hidden md:block" 
            style={{ 
              width: "319px", 
              height: "282px",
              zIndex: 10,
              right: "150px",
            }}
          >
            <Image
              src="/images/assets/table.webp"
              alt="Tisch Illustration"
              fill
              className="object-contain"
              sizes="319px"
              unoptimized
            />
          </div>
        </div>

        {/* Heading: Frequently asked Questions - linksbündig mit FAQ-Box */}
        <div className="mb-16 max-w-[994px] mx-auto">
          <h1
            style={{
              fontFamily: "Vollkorn",
              fontSize: "35px",
              fontStyle: "italic",
              fontWeight: 900,
              color: "#D72333",
              lineHeight: "150%",
            }}
          >
            Frequently asked Questions
          </h1>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-[994px] mx-auto" style={{ position: "relative", zIndex: 1 }}>
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  border: "1px solid #D72333",
                  backgroundColor: "transparent",
                  marginBottom: "10px",
                }}
              >
                {/* Question Row - nur dieser Teil bekommt roten Hintergrund wenn geöffnet */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between cursor-pointer"
                  style={{
                    fontFamily: "Vollkorn",
                    fontSize: "30px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    color: "#D72333",
                    lineHeight: "150%",
                    textAlign: "left",
                    background: isOpen ? "rgba(215, 35, 51, 0.15)" : "transparent",
                    border: "none",
                    padding: "20px 25px",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <span>{faq.question}</span>
                  <span
                    style={{
                      fontFamily: "Vollkorn",
                      fontSize: "50px",
                      fontWeight: 700,
                      color: "#D72333",
                      lineHeight: "150%",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      display: "inline-block",
                      width: "48px",
                      textAlign: "center",
                    }}
                  >
                    ‸
                  </span>
                </button>

                {/* Answer (Collapsible) */}
                {isOpen && (
                  <div
                    style={{
                      padding: "25px",
                      fontFamily: "Vollkorn",
                      fontSize: "23px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      color: "#D72333",
                      lineHeight: "150%",
                      borderTop: "1px solid #D72333",
                      display: "flex",
                      alignItems: "center",
                      minHeight: "100px",
                    }}
                  >
                    {typeof faq.answer === "string" ? <p>{faq.answer}</p> : faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Footer */}
      <footer
        className="mt-24 flex flex-col items-center justify-center py-16 px-6"
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
                  onClick={() => setFooterModal(item.id)}
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
            >
              <Image
                src="/images/assets/instagram 1.svg"
                alt="Folge uns auf Instagram"
                fill
                className="object-contain"
                unoptimized
              />
            </a>
          </div>
        </footer>

      {/* Footer Legal Modal */}
      {footerModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setFooterModal(null)}
        >
          <div
            className="relative w-[min(520px,90vw)] bg-[#D72333] text-[#F9F1DA] px-8 py-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setFooterModal(null)}
              className="absolute right-4 top-4 text-[#F9F1DA] hover:opacity-80"
              style={{ fontSize: "28px", fontWeight: 900, background: "none", border: "none", cursor: "pointer" }}
              aria-label="Schließen"
            >
              ×
            </button>
            {footerModal === "imprint" && (
              <div style={{ fontFamily: "Vollkorn", fontSize: "22px", lineHeight: "150%" }}>
                <div style={{ fontStyle: "italic", fontWeight: 900, marginBottom: "8px" }}>Imprint</div>
                <div>phil Cafe &amp; Bookshop</div>
                <div>Gumpendorfer Straße 10 – 12</div>
                <div>1060 Vienna, Austria</div>
                <div>Phone: 01 581 04 89</div>
                <div>E-Mail: info@phil.info</div>
                <div>Owner: Lewi &amp; Son GmbH</div>
              </div>
            )}
            {footerModal === "privacy" && (
              <div style={{ fontFamily: "Vollkorn", fontSize: "22px", lineHeight: "150%", textAlign: "center" }}>
                <div style={{ fontStyle: "italic", fontWeight: 900, marginBottom: "8px" }}>Privacy Policy</div>
                <div>
                  This website does not collect personal data except for what is necessary to process contact
                  requests. For more information, please contact us at info@phil.info.
                </div>
              </div>
            )}
            {footerModal === "terms" && (
              <div style={{ fontFamily: "Vollkorn", fontSize: "22px", lineHeight: "150%", textAlign: "center" }}>
                <div style={{ fontStyle: "italic", fontWeight: 900, marginBottom: "8px" }}>Terms &amp; Conditions</div>
                <div>
                  By using this website, you agree to our terms and conditions. For more information, please
                  contact us at info@phil.info.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
