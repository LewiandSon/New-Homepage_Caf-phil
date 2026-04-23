"use client";

import { useState } from "react";
import { useLanguage } from "../LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MenuEntry {
  name: string;
  price: string;
  desc?: string;
}

interface MenuSection {
  heading: string;
  note?: string;
  entries: MenuEntry[];
}

// ─── German Drinks ────────────────────────────────────────────────────────────

const GETRAENKE_DE: MenuSection[] = [
  {
    heading: "Kaffee",
    note: "auch iced & mit Haferdrink erhältlich",
    entries: [
      { name: "Espresso / Macchiato [G]", price: "3,1" },
      { name: "Doppio / Macchiato [G]", price: "4,8" },
      { name: "Verlängerter", price: "3,8" },
      { name: "Cappuccino / Melange [G]", price: "4,6" },
      { name: "Flat White [G]", price: "5,8" },
      { name: "Latte / Latte Groß [G]", price: "5,3 / 6,5" },
      { name: "Salty Caramel Latte [G]", price: "6,5" },
    ],
  },
  {
    heading: "Not a Coffee",
    entries: [
      { name: "Matcha Latte [A]", price: "6,0", desc: "mit Haferdrink" },
      { name: "Bio-Chai Latte [G]", price: "5,9" },
      { name: "Kurkuma Latte [G]", price: "5,9" },
      { name: "Heiße Schokolade [G]", price: "4,9" },
      { name: "Cold Brew", price: "5,5" },
      { name: "Bumble Coffee", price: "6,0", desc: "mit Bio-Orangensaft" },
      { name: "Espresso Freddo", price: "5,0" },
      { name: "Espresso Tonic", price: "5,5" },
      { name: "Hausgemachte Limonade 0,5l", price: "5,8", desc: "mit Ingwer, Minze & Limette" },
    ],
  },
  {
    heading: "Bio-Tee",
    note: "Darjeeling, Earl Grey, Grüner Tee, Beerenmix, Pfefferminz, Kamille, Bergkräuter",
    entries: [
      { name: "Bio-Tee", price: "4,5" },
      { name: "Heißer Ingwer", price: "4,8" },
      { name: "Heiße Zitrone", price: "4,5", desc: "frischer Zitronensaft & Waldhonig" },
    ],
  },
  {
    heading: "Drinks",
    entries: [
      { name: "Espresso Martini", price: "12,0" },
      { name: "Gin Tonic", price: "10,5" },
      { name: "Murakami Gin Tonic", price: "12,0", desc: "Grapefruit-Sauerkirsch-Basilikum" },
      { name: "Averna Sour", price: "8,0" },
    ],
  },
  {
    heading: "Säfte",
    note: "0,25l  4,2  ·  auch gespritzt klein / groß  3,5 / 5,5",
    entries: [
      { name: "Bio-Apfel Naturtrüb", price: "" },
      { name: "Bio-Orange", price: "" },
      { name: "Roter Traubensaft", price: "" },
    ],
  },
  {
    heading: "Soda",
    entries: [
      { name: "Soda Zitron*", price: "0,25l  2,5  /  0,5l  4,5", desc: "mit frischem Zitronensaft" },
      { name: "Bio-Holunder-Soda*", price: "0,25l  2,2  /  0,5l  4,1" },
    ],
  },
  {
    heading: "Flaschenlimos 0,33l",
    entries: [
      { name: "Bio-Matcha-Eistee", price: "4,9" },
      { name: "Rhabarber-Limonade", price: "4,3" },
      { name: "Makava", price: "4,3" },
      { name: "Premium Cola", price: "4,3", desc: "auch zuckerfrei" },
    ],
  },
  {
    heading: "Bier vom Fass",
    note: "0,3l  4,5  ·  0,5l  5,5",
    entries: [
      { name: "Schnaitl Original", price: "" },
      { name: "Obertrumer Bio Zwickl", price: "" },
      { name: "Homemade Radler – Mandarine-Kumquat-Bergamotte", price: "" },
      { name: "Saurer Radler", price: "" },
      { name: "Trumer Freispiel (alkoholfrei)", price: "0,5l  5,5" },
    ],
  },
  {
    heading: "Weine",
    entries: [
      { name: "Grüner Veltliner (Burger)", price: "1/8l  3,9  |  1l  29,1" },
      { name: "Bio Riesling (Loimer)", price: "1/8l  5,4  |  0,75l  32,0" },
      { name: "Bio Rosé (Bründlmayer)", price: "1/8l  5,4  |  0,75l  32,0" },
      { name: "Naked Red Cuvée (Heinrich)", price: "1/8l  5,4  |  0,75l  32,0" },
    ],
  },
  {
    heading: "Spritzer",
    entries: [
      { name: "Weißer Spritzer", price: "4,3" },
      { name: "Maracuja Spritzer", price: "5,1" },
      { name: "Ingwer Spritzer", price: "5,1" },
      { name: "Kaiserspritzer", price: "4,5" },
    ],
  },
  {
    heading: "Bubbles",
    entries: [
      { name: "Prosecco – Mionetto DOC", price: "1/8l  4,9  |  0,75l  27,8" },
      { name: "Beauvoir Spritz", price: "7,9", desc: "Mandarine-Kumquat-Bergamotte" },
      { name: "Beeren Spritz", price: "7,9", desc: "mit Gamondi" },
      { name: "Aperol Spritz", price: "7,9 / 6,6", desc: "mit Prosecco / Wein" },
      { name: "Hugo", price: "6,5" },
    ],
  },
];

// ─── German Food ──────────────────────────────────────────────────────────────

const SPEISEN_DE: MenuSection[] = [
  {
    heading: "Frühstück",
    note: "DI–FR bis 13h  ·  SA&SO bis 14h  ·  mit Joseph Brot zubereitet",
    entries: [
      { name: "Pensions Frühstück [A,C,G,N,O]", price: "13,0", desc: "Rauchschinken, Kren, Gouda, Bio-Ei, Marmelade, Bio-Butter" },
      { name: "Alpen Frühstück [A,C,G,N,O]", price: "13,0", desc: "Schinkenspeck, Kren, Bio-Bergkäse, Bio-Ei, Waldhonig, Bio-Butter" },
      { name: "Philgood Frühstück [A,C,F,G,H,N,O]", price: "14,0", desc: "Hummus mit Antipastigemüse & Bio-Ei, Müsli mit Bio-Joghurt, frischen Früchten & Waldhonig" },
      { name: "Philgood vegan [A,F,H,N,O]", price: "14,0", desc: "Hummus mit Antipasti & Falafel, Overnight Oats mit Leinsamen, Kokosraspeln, frischen Früchten & Agavensirup" },
      { name: "Müsli [A,G,H]", price: "7,5", desc: "mit Bio-Joghurt, frischen Früchten & Waldhonig" },
      { name: "Overnight Oats [A,H]", price: "7,5", desc: "mit Leinsamen, Kokosraspeln, frischen Früchten & Agavensirup" },
      { name: "Schnittlauchbrot [A,G,C]", price: "4,9", desc: "mit Bio-Ei +2,7" },
      { name: "Croissant [A,C,G]", price: "3,5", desc: "mit Marmelade & Bio-Butter +2,0  ·  mit Nougatcreme +1,5" },
      { name: "Schinken-Käse-Toast [A,G,O]", price: "5,7", desc: "Roggentoast mit Rauchschinken, Gouda, Ketchup" },
      { name: "Käsetoast [A,G]", price: "5,7", desc: "Roggentoast mit Gouda, Bio-Bergkäse, Schnittlauch, Ketchup" },
    ],
  },
  {
    heading: "Speisen & Snacks",
    note: "ab 13h  ·  Kuchen, Mehlspeisen & Eis am Stiel in der Vitrine bei der Theke",
    entries: [
      { name: "Grilled-phil-Sandwich [A,G,N,O]", price: "7,2", desc: "Joseph Brot mit Schinkenspeck, Bio-Bergkäse, Gemüse & Salat" },
      { name: "Falafel [A,N,O]", price: "13,0", desc: "5 Stk. Falafel mit Hummus, Paradeisern, Gurke & Salat mit Joseph Brot" },
      { name: "Naschmarktblume [A,N,O]", price: "13,5", desc: "Hummus & Falafel, getrocknete Paradeiser, Artischocken, gegrillte Zucchini & Oliven mit Joseph Brot" },
      { name: "Oliven & Brot / Hummus & Brot [A,O,N]", price: "6,7" },
    ],
  },
];

const ALLERGENS_DE =
  "A: Gluten · B: Krebstiere · C: Eier · D: Fisch · E: Erdnüsse · F: Soja · G: Milch/Laktose · H: Schalenfrüchte · L: Sellerie · M: Senf · N: Sesam · O: Schwefeloxid & Sulfite · P: Lupinen · R: Weichtiere";

// ─── English Drinks ───────────────────────────────────────────────────────────

const DRINKS_EN: MenuSection[] = [
  {
    heading: "Coffee",
    note: "also available iced & with oat milk",
    entries: [
      { name: "Espresso / Macchiato [G]", price: "3.1" },
      { name: "Doppio / Macchiato [G]", price: "4.8" },
      { name: "Americano", price: "3.8" },
      { name: "Cappuccino / Melange [G]", price: "4.6" },
      { name: "Flat White [G]", price: "5.8" },
      { name: "Latte / Latte Large [G]", price: "5.3 / 6.5" },
      { name: "Salty Caramel Latte [G]", price: "6.5" },
    ],
  },
  {
    heading: "Not a Coffee",
    entries: [
      { name: "Matcha Latte [A]", price: "6.0", desc: "with oat drink" },
      { name: "Organic Chai Latte [G]", price: "5.9" },
      { name: "Turmeric Latte [G]", price: "5.9" },
      { name: "Hot Chocolate [G]", price: "4.9" },
      { name: "Cold Brew", price: "5.5" },
      { name: "Bumble Coffee", price: "6.0", desc: "with organic orange juice" },
      { name: "Espresso Freddo", price: "5.0" },
      { name: "Espresso Tonic", price: "5.5" },
      { name: "Homemade Lemonade 0.5l", price: "5.8", desc: "with ginger, mint & lime" },
    ],
  },
  {
    heading: "Organic Tea",
    note: "Darjeeling, Earl Grey, Green Tea, Wild Berry, Peppermint, Camomile, Mountain Herbs",
    entries: [
      { name: "Organic Tea", price: "4.5" },
      { name: "Hot Ginger", price: "4.8" },
      { name: "Hot Lemon", price: "4.5", desc: "freshly squeezed lemon juice & honey" },
    ],
  },
  {
    heading: "Drinks",
    entries: [
      { name: "Espresso Martini", price: "12.0" },
      { name: "Gin Tonic", price: "10.5" },
      { name: "Murakami Gin Tonic", price: "12.0", desc: "Grapefruit-Sour Cherry-Basil" },
      { name: "Averna Sour", price: "8.0" },
    ],
  },
  {
    heading: "Juices",
    note: "0.25l  4.2  ·  with soda small / large  3.5 / 5.5",
    entries: [
      { name: "Cloudy Apple Juice", price: "" },
      { name: "Organic Orange Juice", price: "" },
      { name: "Red Grape Juice", price: "" },
    ],
  },
  {
    heading: "Soda",
    entries: [
      { name: "Soda Lemon*", price: "0.25l  2.5  /  0.5l  4.5", desc: "freshly squeezed lemon" },
      { name: "Organic Elderflower Soda*", price: "0.25l  2.2  /  0.5l  4.1" },
    ],
  },
  {
    heading: "Bottled Lemonade 0.33l",
    entries: [
      { name: "Organic Matcha Iced Tea", price: "4.9" },
      { name: "Rhubarb Lemonade", price: "4.3" },
      { name: "Makava", price: "4.3" },
      { name: "Premium Cola", price: "4.3", desc: "regular & sugar-free" },
    ],
  },
  {
    heading: "Draft Beer",
    note: "0.3l  4.5  ·  0.5l  5.5",
    entries: [
      { name: "Schnaitl Original", price: "" },
      { name: "Obertrumer Organic Zwickl", price: "" },
      { name: "Homemade Radler – Mandarin-Kumquat-Bergamot", price: "" },
      { name: "Saurer Radler", price: "" },
      { name: "Trumer Freispiel (non-alcoholic)", price: "0.5l  5.5" },
    ],
  },
  {
    heading: "Wine",
    entries: [
      { name: "Grüner Veltliner (Burger)", price: "1/8l  3.9  |  1l  29.1" },
      { name: "Organic Riesling (Loimer)", price: "1/8l  5.4  |  0.75l  32.0" },
      { name: "Organic Rosé (Bründlmayer)", price: "1/8l  5.4  |  0.75l  32.0" },
      { name: "Naked Red Cuvée (Heinrich)", price: "1/8l  5.4  |  0.75l  32.0" },
    ],
  },
  {
    heading: "Spritzer",
    entries: [
      { name: "White Wine Spritzer", price: "4.3" },
      { name: "Passion Fruit Spritzer", price: "5.1" },
      { name: "Ginger Spritzer", price: "5.1" },
      { name: "Kaiserspritzer", price: "4.5" },
    ],
  },
  {
    heading: "Bubbles",
    entries: [
      { name: "Prosecco – Mionetto DOC", price: "1/8l  4.9  |  0.75l  27.8" },
      { name: "Beauvoir Spritz", price: "7.9", desc: "Mandarin-Kumquat-Bergamot" },
      { name: "Berry Spritz", price: "7.9", desc: "with Gamondi" },
      { name: "Aperol Spritz", price: "7.9 / 6.6", desc: "with Prosecco / Wine" },
      { name: "Hugo", price: "6.5" },
    ],
  },
];

// ─── English Food ─────────────────────────────────────────────────────────────

const FOOD_EN: MenuSection[] = [
  {
    heading: "Breakfast",
    note: "TUE–FRI until 13h  ·  SAT&SUN until 14h  ·  prepared with Joseph bread",
    entries: [
      { name: "Bed & Breakfast [A,C,G,N,O]", price: "13.0", desc: "Ham, horseradish, gouda, organic egg, jam, organic butter" },
      { name: "Alpine Breakfast [A,C,G,N,O]", price: "13.0", desc: "Smoked bacon, horseradish, organic mountain cheese, organic egg, honey, organic butter" },
      { name: "Philgood Breakfast [A,C,F,G,H,N,O]", price: "14.0", desc: "Hummus with marinated antipasti & organic egg, muesli with organic yogurt, fresh fruit & honey" },
      { name: "Philgood vegan [A,F,H,N,O]", price: "14.0", desc: "Hummus with antipasti & falafel, overnight oats with flaxseed, coconut flakes, fresh fruit & agave syrup" },
      { name: "Muesli [A,G,H]", price: "7.5", desc: "organic yogurt, fresh fruit, honey" },
      { name: "Overnight Oats [A,H]", price: "7.5", desc: "with flaxseed, coconut flakes, fresh fruit & agave syrup" },
      { name: "Bread with Butter & Chives [A,G,C]", price: "4.9", desc: "with organic egg +2.7" },
      { name: "Croissant [A,C,G]", price: "3.5", desc: "with jam & organic butter +2.0  ·  with nougat creme +1.5" },
      { name: "Ham & Cheese Toast [A,G,O]", price: "5.7", desc: "whole grain toast with smoked bacon & gouda, ketchup" },
      { name: "Cheese Toast [A,G]", price: "5.7", desc: "whole grain toast with gouda & organic mountain cheese, chives, ketchup" },
    ],
  },
  {
    heading: "Food & Snacks",
    note: "from 13h  ·  Cakes, pastries & ice cream bars available at the counter",
    entries: [
      { name: "Grilled-phil-Sandwich [A,G,N,O]", price: "7.2", desc: "Smoked bacon, organic mountain cheese, tomatoes & cucumber" },
      { name: "Falafel [A,N,O]", price: "13.0", desc: "5 pcs. Falafel with hummus, salad, tomatoes & cucumber" },
      { name: "Naschmarktflower [A,N,O]", price: "13.5", desc: "Hummus & falafel, dried tomatoes, artichokes, grilled zucchini & olives" },
      { name: "Olives & Bread / Hummus & Bread [A,O,N]", price: "6.7" },
    ],
  },
];

const ALLERGENS_EN =
  "A: Gluten · B: Crustaceans · C: Eggs · D: Fish · E: Peanuts · F: Soy · G: Milk/Lactose · H: Tree nuts · L: Celery · M: Mustard · N: Sesame · O: Sulphur oxides & sulphites · P: Lupins · R: Molluscs";

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionBlock({ section }: { section: MenuSection }) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <div
        style={{
          fontFamily: "Vollkorn",
          fontSize: "15px",
          fontStyle: "italic",
          fontWeight: 900,
          color: "#D72333",
          marginBottom: "2px",
          letterSpacing: "0.01em",
        }}
      >
        {section.heading}
      </div>
      {section.note && (
        <div
          style={{
            fontSize: "11px",
            color: "#9A7B6B",
            marginBottom: "6px",
            fontStyle: "italic",
            lineHeight: "1.4",
          }}
        >
          {section.note}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {section.entries.map((entry, i) => (
          <div key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "13px", color: "#3D2B1F", lineHeight: "1.3" }}>
                {entry.name}
              </span>
              {entry.price && (
                <span
                  style={{
                    fontSize: "13px",
                    whiteSpace: "nowrap",
                    color: "#3D2B1F",
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {entry.price}
                </span>
              )}
            </div>
            {entry.desc && (
              <div
                style={{
                  fontSize: "11px",
                  color: "#9A7B6B",
                  lineHeight: "1.35",
                  marginTop: "1px",
                }}
              >
                {entry.desc}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface DigitalMenuSectionProps {
  /** Force a specific tab for desktop 2-col layout */
  forceTab?: "drinks" | "food";
  className?: string;
  style?: React.CSSProperties;
}

export function DigitalMenuSection({ forceTab, className = "", style }: DigitalMenuSectionProps) {
  const { lang } = useLanguage();
  const [tab, setTab] = useState<"drinks" | "food">("drinks");

  const activeTab = forceTab ?? tab;

  const drinksData = lang === "de" ? GETRAENKE_DE : DRINKS_EN;
  const foodData = lang === "de" ? SPEISEN_DE : FOOD_EN;
  const allergens = lang === "de" ? ALLERGENS_DE : ALLERGENS_EN;

  const drinkLabel = lang === "de" ? "Getränke" : "Drinks";
  const foodLabel = lang === "de" ? "Frühstück & Speisen" : "Breakfast & Food";

  const sections = activeTab === "drinks" ? drinksData : foodData;

  return (
    <div
      className={className}
      style={{
        fontFamily: "Vollkorn",
        color: "#3D2B1F",
        background: "#F9F1DA",
        ...style,
      }}
    >
      {/* Tabs — only shown when not forced */}
      {!forceTab && (
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            borderBottom: "2px solid #D72333",
          }}
        >
          {(["drinks", "food"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              style={{
                fontFamily: "Vollkorn",
                fontSize: "15px",
                fontStyle: "italic",
                fontWeight: tab === t ? 900 : 500,
                color: tab === t ? "#F9F1DA" : "#D72333",
                background: tab === t ? "#D72333" : "transparent",
                border: "none",
                padding: "9px 20px",
                cursor: "pointer",
                transition: "all 0.15s",
                letterSpacing: "0.01em",
              }}
            >
              {t === "drinks" ? drinkLabel : foodLabel}
            </button>
          ))}
        </div>
      )}

      {/* Sections */}
      {sections.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}

      {/* Allergens */}
      <div
        style={{
          marginTop: "20px",
          paddingTop: "14px",
          borderTop: "1px solid rgba(215,35,51,0.3)",
          fontSize: "10.5px",
          color: "#9A7B6B",
          lineHeight: "1.6",
        }}
      >
        <span style={{ color: "#D72333", fontWeight: 700 }}>
          {lang === "de" ? "Allergene" : "Allergens"}:
        </span>{" "}
        {allergens}
      </div>
    </div>
  );
}
