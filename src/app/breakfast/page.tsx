import type { Metadata } from "next";
import { BreakfastContent } from "./BreakfastContent";

export const metadata: Metadata = {
  title: "Frühstück in Wien-Mariahilf | phil – Café & Buchhandlung",
  description:
    "Breakfast until 2 PM at café phil – 5 min from Naschmarkt, 10 min walk from the Opera. Falafel, hummus, sourdough, specialty coffee & 4,000 books. Walk-ins welcome.",
  alternates: {
    canonical: "https://www.cafephil.at/breakfast",
  },
  openGraph: {
    title: "Frühstück in Wien-Mariahilf | café phil",
    description:
      "Breakfast until 2 PM at café phil – 5 min from Naschmarkt, 10 min walk from the Opera. Falafel, hummus, sourdough, specialty coffee & 4,000 books. Walk-ins welcome.",
    url: "https://www.cafephil.at/breakfast",
    siteName: "café phil",
    images: [
      {
        url: "https://www.cafephil.at/images/assets/phil-good.jpg",
        width: 1200,
        height: 630,
        alt: "phil good breakfast – falafel, hummus, sourdough at café phil Vienna",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "phil – Café, Buchhandlung & Bar",
  description:
    "Café, bookshop & bar in Vienna's 6th district. Breakfast until 2 PM, specialty coffee, 4,000 books. Walk-ins always welcome.",
  url: "https://www.cafephil.at/breakfast",
  telephone: "+43 1 5810489",
  priceRange: "€€",
  servesCuisine: ["Frühstück", "Kaffee", "Kuchen"],
  menu: "https://www.cafephil.at/#speisekarte",
  image: "https://www.cafephil.at/images/assets/phil-good.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gumpendorfer Str. 10–12",
    addressLocality: "Wien",
    postalCode: "1060",
    addressCountry: "AT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.19672,
    longitude: 16.35691,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: "3778",
    bestRating: "5",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "14:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "09:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "21:00",
    },
  ],
};

export default function BreakfastPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreakfastContent />
    </>
  );
}
