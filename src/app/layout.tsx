import type { Metadata } from "next";
import { Vollkorn, Caveat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../LanguageContext";

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
        url: "/images/assets/IMG_4886.webp",
        width: 806,
        height: 531,
        alt: "Café Interior im phil",
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
    <html lang="de">
      <body className={`${vollkorn.variable} ${caveat.variable} font-serif antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

