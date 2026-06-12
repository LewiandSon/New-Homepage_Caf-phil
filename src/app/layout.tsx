import type { Metadata } from "next";
import { Vollkorn, Caveat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../LanguageContext";
import { Header } from "@/components/Header";
import Script from "next/script";
import { GA_TRACKING_ID } from "@/lib/gtag";

const vollkorn = Vollkorn({
  subsets: ["latin"],
  variable: "--font-vollkorn",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "phil – Café, Buchhandlung & Bar in Wien | Gumpendorfer Straße",
    template: "%s | phil Café Wien",
  },
  description:
    "phil – laptopfreies Café, 4.000 Bücher & Bar in Wien-Mariahilf. Frühstück, Kaffee & Schanigarten auf der Gumpendorfer Straße seit 2004.",
  metadataBase: new URL("https://www.cafephil.at"),
  alternates: {
    canonical: "https://www.cafephil.at",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "phil – Café, Buchhandlung & Bar in Wien | Gumpendorfer Straße",
    description:
      "laptopfreies Café, 4.000 Bücher & Bar im 6. Bezirk. Frühstück, Kaffee, Schanigarten und Veranstaltungen im phil in Wien.",
    url: "https://www.cafephil.at",
    siteName: "phil Café",
    locale: "de_AT",
    type: "website",
    images: [
      {
        url: "/images/assets/ausgesprochen_viel.webp",
        width: 512,
        height: 512,
        alt: "phil Café Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "phil – Café, Buchhandlung & Bar in Wien | Gumpendorfer Straße",
    description:
      "laptopfreies Café, 4.000 Bücher & Bar im 6. Bezirk. Frühstück, Kaffee, Schanigarten und Veranstaltungen im phil in Wien.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Structured Data – CafeOrCoffeeShop */}
        <Script
          id="json-ld-cafe"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CafeOrCoffeeShop",
              name: "phil – Café, Buchhandlung & Bar",
              url: "https://www.cafephil.at",
              telephone: "+43 1 5810489",
              priceRange: "€€",
              servesCuisine: ["Frühstück", "Kaffee", "Kuchen"],
              foundingDate: "2004",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Gumpendorfer Straße 10–12",
                addressLocality: "Wien",
                postalCode: "1060",
                addressCountry: "AT",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 48.19672,
                longitude: 16.35691,
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
              sameAs: [
                "https://www.instagram.com/phil.in.wien/",
                "https://share.google/umRBhoVmFPwfBgmCY",
                "https://www.wien.info/de/essen-trinken/cafes/phil-355232",
                "https://www.falter.at/lokal/5631/phil",
              ],
            }),
          }}
        />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${vollkorn.variable} ${caveat.variable} font-serif antialiased`}>
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

