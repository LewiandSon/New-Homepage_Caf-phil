# Leerraum über dem Footer (Startseite, Desktop) – Identifikation

## DOM-Struktur

```
main
├── div.md:scale-[0.855]          ← Scale-Wrapper
│   ├── HeroSection
│   ├── AboutSection
│   └── QuoteSection
│       ├── [Mobile-Section]       (md:hidden)
│       └── [Desktop-Section]     (md:block)  ← hier entsteht der Leerraum
│
└── div#main-footer               ← Footer wird per Portal hier gerendert
```

Der Footer liegt also **direkt unter** dem Scale-Wrapper. Alles, was „über dem Footer“ leer wirkt, kommt von dem, was **innerhalb** des Scale-Wrappers zu viel Platz einnimmt – konkret von der Desktop-Section in `QuoteSection`.

---

## Ursache 1: Feste Höhe der Desktop-Section (Hauptursache)

**Datei:** `src/components/QuoteSection.tsx`  
**Zeile:** 891

```tsx
<section className="hidden md:block relative w-full" style={{ minHeight: '13200px' }}>
```

Die Section hat eine **feste Mindesthöhe von 13200px**. Sie füllt damit immer 13200px, egal wo der letzte Inhalt endet.

**Letzter Inhalt:** die **Welcome Section** („Das Team phil heißt dich herzlich willkommen!“)

- **Zeile:** 2232  
- **Position:** `top: 12711px`
- **Inhalt:** Bild (oben), Zucker, Text bei `top: 400px` im Block  
- **Unteres Ende des sichtbaren Inhalts:** ca. **12711 + 400 + 40 ≈ 13150px** (Text + etwas Abstand)

**Folge:** Von **~13150px** bis **13200px** ist die Section leer – das sind **ca. 50–60px Leerraum** direkt über dem Footer, die nur durch die feste `minHeight` entstehen.

---

## Ursache 2: Abstand am Footer selbst

**Datei:** `src/components/QuoteSection.tsx` (portaler Footer)  
**Zeile:** 2305

```tsx
<footer
  className="hidden md:flex mt-4 flex-col ..."
```

**`mt-4`** = 1rem = **16px** Abstand nach oben. Das addiert sich zum Leerraum aus der Section.

---

## Zusammenfassung

| Quelle | Wo | Effekt |
|--------|-----|--------|
| **minHeight der Desktop-Section** | QuoteSection.tsx, Zeile 891: `minHeight: '13200px'` | Ca. 50–60px leerer Bereich, weil der letzte Content ~13150px endet, die Section aber 13200px hoch ist. |
| **mt-4 am Footer** | QuoteSection.tsx, Footer-`className`: `mt-4` | 16px Abstand zwischen Section-Ende und Footer. |

**Gesamt:** Der Leerraum über dem Footer auf der Startseite (Desktop) setzt sich zusammen aus  
1. dem unteren, leeren Stück der Desktop-Section (durch `minHeight: 13200px`) und  
2. dem `mt-4` des Footers.

---

## Nächste Schritte (optional)

- **minHeight** auf den tatsächlichen Content-Schluss reduzieren (z. B. **13160px**), um den Leerraum in der Section zu entfernen.
- **mt-4** am Desktop-Footer entfernen oder verkleinern (z. B. `mt-0` oder `mt-1`), wenn der Abstand zum Content zu groß wirkt.
