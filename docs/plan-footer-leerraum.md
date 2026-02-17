# Plan: Leerraum zwischen „Willkommen“ und Footer reduzieren (Desktop)

## Ausgangslage

- **Desktop-Section** in `QuoteSection.tsx` hat feste **minHeight: 13261px** (Zeile 891).
- Letzter Inhalt: **„Das Team phil heißt dich herzlich willkommen!“** in der **Welcome Section** bei **top: 12711px** (Zeile 2232).
- In der Welcome Section: Bild (oben), Zucker, Text bei top 400px → sichtbare Höhe des Blocks ca. **12711 + 400 + ~80 ≈ 13190px**.
- Aktuell: Section endet bei **13261px** → **~70–80px** Leerraum unter dem Text.
- Zusätzlich: **Abstand Kontakt-Block → Welcome** = 12711 − 12111 = **600px** (kann als „viel Leerraum“ empfunden werden).

## Optionen

### 1. Section-Höhe an echten Content-Ende anpassen (schnell)

- **minHeight** von `13261px` auf **~13190px** setzen (z. B. **13200px** mit kleinem Puffer).
- **Effekt:** Kein sichtbarer Leerraum mehr direkt unter dem Willkommen-Text bis zum Footer.
- **Risiko:** Minimal; nur unteren Puffer verkleinern.

### 2. Welcome-Block nach oben rücken (stärkere Reduktion)

- **Welcome Section** von **top: 12711px** z. B. auf **12300px** oder **12400px** setzen.
- **Effekt:** Deutlich weniger Leerraum zwischen Kontakt/Öffnungszeiten und „Willkommen“, insgesamt kürzere Seite.
- **Risiko:** Layout/Abstände zu anderen Elementen prüfen (Überlappungen vermeiden).

### 3. Kombination (empfohlen)

- **minHeight** auf **~13200px** reduzieren (Leerraum unter Willkommen weg).
- Optional: **Welcome Section** etwas nach oben schieben (z. B. 12711 → 12400), wenn der Abstand zum Kontakt-Block noch zu groß wirkt.

## Nächster Schritt

- **Sofort umsetzbar:** Option 1 (minHeight auf 13200px).
- **Bei Bedarf:** Option 2 (top der Welcome Section verringern) danach anpassen.
