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
    default: "phil Café – Café, Buchhandlung & Bar in Wien",
    template: "%s | phil Café Wien",
  },
  description:
    "phil – Café, Buchhandlung & Bar in Wien-Mariahilf. Kaffee, Frühstück, Bücher, Schanigarten, Events und eine sorgfältig kuratierte Bücherauswahl.",
  metadataBase: new URL("https://phil.info"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "phil Café – Café, Buchhandlung & Bar in Wien",
    description:
      "Café, Buchhandlung & Bar im 6. Bezirk. Frühstück, Kaffee, Bücher, Schanigarten und Veranstaltungen im phil in Wien.",
    url: "/",
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
    title: "phil Café – Café, Buchhandlung & Bar in Wien",
    description:
      "Café, Buchhandlung & Bar im 6. Bezirk. Frühstück, Kaffee, Bücher, Schanigarten und Veranstaltungen im phil in Wien.",
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

