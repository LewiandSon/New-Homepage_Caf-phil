# Analyse: Buchsection Desktop (QuoteSection.tsx)

## Wo sitzt die Buchsection?

Die Buchsection auf der **Startseite (Desktop)** liegt in **`QuoteSection.tsx`** im großen absolut positionierten Block (Desktop-Layout). Sie umfasst grob die `top`-Werte **1439px bis 2684px** (danach startet „Unsere Speisekarte“).

**Reihenfolge der Blöcke (von oben nach unten):**

| top   | Element |
|-------|--------|
| 1439  | IMG_4905 1 image (Foto links) |
| 1452  | Überschrift „Bücher“ / „Books“ |
| 1617  | I91A2497 1 image |
| 1907  | Textblock Bücherwelt (4.000 Bücher, Link „hier mehr“) |
| 2045  | Zitat Cicero („Ein Raum ohne Bücher…“) |
| 2372  | Monstera-Bild |
| 2373  | Button „Entdecke unsere Bücherwelt“ |
| 2442  | Books1-Bild |
| 2459  | Cursor-Bild |
| 2684  | „Unsere Speisekarte“ (nächste Section) |

---

## Auffälligkeiten im Code

### 1. Tippfehler im Kommentar (Zeile 1157)

```tsx
{/* Books1 1 image */}
```

Doppeltes „1“ – wirkt wie Tippfehler. Besser: **„Books1 image“** oder **„Books 1 image“**.

---

### 2. Kommentar und Wert passen nicht zusammen (Zeile 1216, Cursor)

```tsx
transform: 'rotate(-20deg)', // 30° nach links (war 10deg, jetzt -20deg)
```

- Kommentar: „30° nach links“
- Tatsächlicher Wert: **-20deg**

Entweder Kommentar auf **-20°** anpassen oder, falls 30° gewollt ist, Wert auf **-30deg** stellen.

---

### 3. Leere `alt`-Attribute

Mehrere Bilder in der Buchsection haben **`alt=""`**:

- IMG_4905 1 (Zeile 1005)
- I91A2497 1 (Zeile 1052)
- Monstera (Zeile 1154)
- Books1 (Zeile 1172)
- Cursor (Zeile 1222)

Für **reine Deko-Bilder** ist `alt=""` in Ordnung. Wenn die Bilder inhaltlich wichtig sind (z. B. Bücherregal, Bücherstapel), wären kurze Beschreibungen (z. B. „Bücherstapel“, „Pflanze“, „Cursor-Zeiger“) besser für Barrierefreiheit und SEO.

---

### 4. Keine Anker-ID für die Buch-Section

- „Über uns“, „Speisekarte“, „Kontakt“ haben **id** bzw. **data-section** für Anker.
- Die Buch-Section hat **kein** `id` oder `data-section`.

Im Header führt „Bücher“ auf **/bucher** (eigene Seite), nicht auf einen Anker auf der Startseite. Das ist konsistent. Nur wenn ihr später einen Startseiten-Anker (z. B. `#bucher`) wollt, müsstet ihr z. B. an der „Bücher“-Überschrift (top 1452) ein `id="bucher"` setzen.

---

### 5. Sehr enge Abstände (Monstera / Button)

- Monstera: **top 2372px**
- Button „Entdecke unsere Bücherwelt“: **top 2373px**

Nur **1px** Abstand – bei Skalierung (z. B. 0.855) oder anderen Viewports kann das sehr eng oder überlappend wirken. Vermutlich bewusst so gesetzt, aber bei Änderungen im Layout im Blick behalten.

---

## Kurzfassung

| Thema              | Befund |
|--------------------|--------|
| Kommentar „Books1 1“ | Tippfehler, doppeltes „1“. |
| Cursor-Kommentar   | „30°“ im Kommentar, **-20deg** im Code – uneinheitlich. |
| `alt`-Texte        | Überall `alt=""` – bei inhaltlich relevanten Bildern kurze Beschreibung erwägen. |
| Anker              | Kein `id`/data-section für Buch-Section; nur relevant, wenn Anker auf Startseite gewünscht. |
| Abstände           | Monstera/Button nur 1px Abstand – bei Skalierung ggf. prüfen. |

Wenn du willst, können wir als Nächstes die konkreten Code-Änderungen (Kommentare, ggf. `alt`, Cursor-Winkel) durchgehen und einbauen.
