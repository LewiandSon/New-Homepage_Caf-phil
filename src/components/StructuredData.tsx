"use client";

import { useLanguage } from "../LanguageContext";

export function StructuredData() {
  const { lang } = useLanguage();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": "https://phil.info/#business",
    name: "phil Café",
    alternateName: "phil",
    description: lang === "de" 
      ? "phil – Café, Buchhandlung & Bar in Wien-Mariahilf. Kaffee, Frühstück, Bücher, Schanigarten, Events und eine sorgfältig kuratierte Bücherauswahl."
      : "phil – café, bookshop & bar in Vienna-Mariahilf. Coffee, breakfast, books, outdoor seating, events and a carefully curated book selection.",
    url: "https://phil.info",
    telephone: "+4315810489",
    email: "info@phil.info",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gumpendorfer Straße 10-12",
      addressLocality: "Wien",
      postalCode: "1060",
      addressRegion: "Wien",
      addressCountry: "AT"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "48.1975",
      longitude: "16.3503"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Monday",
        opens: "14:00",
        closes: "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "09:00",
        closes: "23:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "21:00"
      }
    ],
    servesCuisine: "Austrian",
    priceRange: "€€",
    paymentAccepted: "Cash, Credit Card",
    currenciesAccepted: "EUR",
    image: [
      "https://phil.info/images/assets/IMG_4886.webp"
    ],
    sameAs: [
      // Add social media links here if available
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://phil.info/#organization",
    name: "phil Café",
    url: "https://phil.info",
    logo: "https://phil.info/images/assets/logo.svg", // Update with actual logo path
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+4315810489",
      contactType: "customer service",
      email: "info@phil.info",
      areaServed: "AT",
      availableLanguage: ["de", "en"]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
