# CLAUDE.md — cafe-phil-web

Arbeitskontext für Claude. Kurz halten, bei Struktur-Änderungen mitpflegen.

## Projekt

Website von **phil – Café, Buchhandlung & Bar**, Gumpendorfer Straße 10–12, 1060 Wien.
Live: https://www.cafephil.at
Repo: https://github.com/LewiandSon/New-Homepage_Caf-phil (Branch `main`)
Deploy: Vercel, Auto-Deploy bei Push auf `main`.

## Stack

- **Next.js 16** (App Router) + **React 19**, TypeScript
- **Tailwind CSS 4** — Konfiguration liegt in `src/app/globals.css` unter `@theme`, **nicht** in einer `tailwind.config.js`
- **Sanity** als CMS (`next-sanity`), Studio eingebettet unter `/studio`
- **Framer Motion** für Animationen
- **Resend** für transaktionale Mails, **googleapis** für Google Sheets

## Befehle

```bash
npm run dev     # Dev-Server auf localhost:3000
npm run build   # Production-Build (vor jedem Push durchlaufen lassen)
npm run lint    # ESLint
```

## Struktur

```
src/
  app/                    Routen (App Router)
    api/signup/route.ts   Event-Anmeldung: Google Sheet + 2 Mails via Resend
    studio/[[...tool]]/   Sanity Studio, eingebettet
    page.tsx              Startseite
    breakfast/ bucher/ events/ faq/ impressum/ mieten/ presse/
    globals.css           Tailwind-Theme, Utilities, seitenspezifische CSS-Hacks
    layout.tsx  sitemap.ts  robots.ts  not-found.tsx
  components/             AboutSection, AnmeldungModal, ClimateBanner,
                          DigitalMenuSection, Header, HeroSection, HomeFooter,
                          InstagramLink, OpenStatus, QuoteSection
  sanity/
    client.ts             Sanity-Client (useCdn: false)
    queries.ts            GROQ: upcomingEvents / pastEvents / allEvents
    schemaTypes/event.ts  Einziges Schema: "event"
    structure.ts          Studio-Navigation
  data/events.ts          Statische Event-Daten (Altbestand)
  lib/gtag.ts             Google Analytics
  LanguageContext.tsx     Sprachumschaltung DE/EN
public/                   Bilder, Videos, Speisekarten-SVGs
docs/                     Analysen und Arbeitsnotizen aus früheren Sessions
```

## Design-Tokens

Definiert in `globals.css` unter `@theme`:

| Token | Wert | Bedeutung |
|---|---|---|
| `--color-background` / `--color-cream` | `#f9f1da` | Creme-Hintergrund |
| `--color-foreground` / `--color-secondary` | `#573b30` | Dunkelbraun |
| `--color-primary` | `#d72333` | phil-Rot |
| `--font-serif` / `--font-sans` | Vollkorn | Standardschrift, auch für "sans" |
| `--font-handwriting` | Caveat | Handschrift-Akzente |

Eigene Utilities: `heading-header`, `heading-content`, `body-text`.
Weitere Schriften im Projekt: Playfair Display, Lato (via `@fontsource`).

## Zweisprachigkeit

Kein i18n-Routing. Stattdessen `LanguageContext` (`useLanguage()` liefert `lang: "de" | "en"`), Texte werden im Component ternär ausgewählt. Default ist `de`, die Wahl wird **nicht** persistiert.

Bei neuen Texten immer beide Sprachen liefern. Sanity-Felder folgen dem Muster `title_de` / `title_en`.

## Sanity

- Project ID `30gl7gc9`, Dataset `production`
- Studio: https://www.cafephil.at/studio (bzw. localhost:3000/studio)
- Schema `event`: `title_de` (Pflicht), `title_en`, `date` (Pflicht, datetime), `image`, `description_de` / `description_en` (Portable Text), `signupType`, `signupUrl`
- `signupType`: `nein` | `ja` (internes Formular) | `extern` (dann `signupUrl` setzen) | `geschlossen`

Events pflegt das Café selbst im Studio — Event-Inhalte gehören **nicht** in den Code.

## Event-Anmeldung

`POST /api/signup` nimmt FormData entgegen und macht drei Dinge:
1. Zeile ins Google Sheet anhängen (schlägt das fehl, wird nur geloggt — die Anmeldung läuft trotzdem durch)
2. Zweisprachige Bestätigungsmail an den Gast
3. Benachrichtigung an `info@phil.info`

Absender: `noreply@cafephil.at` (Resend-Domain).
Mail-Templates stehen als Inline-HTML direkt in `route.ts`.

## Environment-Variablen

In `.env.local` (nicht im Repo) und in den Vercel Project Settings:

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
RESEND_API_KEY
GOOGLE_SHEET_ID
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY          # mit \n als Escape-Sequenz, wird im Code ersetzt
```

## Deploy & Redirects

Push auf `main` → Vercel baut automatisch.
`vercel.json` enthält die Redirects von der alten Website (`/veranstaltungen.html` → `/events`, `/buecher.html` → `/bucher`, `cafephil.at` → `www.cafephil.at` usw.). Beim Umbenennen von Routen prüfen, ob dort ein Eintrag nötig ist.

## Konventionen und Fallstricke

- **Header:** `position: fixed` mit **voll deckendem** `bg-background`. Kein `backdrop-blur`, keine Transparenz — die Kombination aus `fixed` und `backdrop-filter` bricht auf iOS Safari (der Header scrollt optisch mit). Details in `docs/HEADER_ANALYSE.md`.
- **Absolute Positionierung:** Startseite und Bücher-Seite sind aus Figma pixelgenau nachgebaut und arbeiten mit absoluten Positionen plus Scale-Wrapper. Layout-Änderungen dort sind heikel — siehe `docs/POSITIONING_GUIDE.md`.
- **Scroll-Verhalten:** Smooth Scroll ist auf Mobile und auf den Seiten mit Scale-Wrapper (`data-page="home"`, `data-page="bucher"`) bewusst deaktiviert.
- **Bilddateinamen:** keine Umlaute oder Sonderzeichen in `public/` — hat auf Vercel schon zu 400-Fehlern geführt (`bordüre` → `Bordure2.png`).
- **Assets:** Das Repo trägt sehr große Medien mit sich (Videos und SVGs im zweistelligen MB-Bereich). Offene Optimierungsliste in `docs/ASSET_OPTIMIZATION_LIST.md`.
- Sanity-Bilder kommen von `cdn.sanity.io` — in `next.config.ts` als `remotePattern` freigegeben.

## Bekannte Altlasten

- `src/data/events.ts` enthält statische Events aus der Zeit vor Sanity.
- Die GROQ-Queries selektieren ein Feld `signupLink`, das im Schema nicht mehr existiert — liefert immer `null`.
- `docs/EVENTS_ANMELDUNG_SCRIPT.md` beschreibt eine alte Google-Apps-Script-Lösung, die durch `/api/signup` ersetzt wurde. Nur noch als Historie relevant.
- `README.md` ist noch das unveränderte create-next-app-Boilerplate.
- Im Repo-Root liegen `Neuer Ordner/`, `phil-website-desktop (Kopie)_icon/` und `phil-website-desktop (Kopie)_img/` — vermutlich Reste aus dem Figma-Export.

## Arbeitsweise

- Vor größeren Änderungen `npm run build` laufen lassen, Vercel-Builds sind teurer als lokale.
- Texte auf der Seite sind Deutsch und Englisch — Änderungen konsequent in beiden Sprachen.
- Änderungen an `globals.css` betreffen alle Seiten; seitenspezifisches lieber im Component.
