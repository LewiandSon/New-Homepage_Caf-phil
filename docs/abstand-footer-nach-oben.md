# Analyse: Abstand Footer nach oben zum nächsten Element (Desktop Startseite)

## Struktur (von unten nach oben)

```
#main-footer (Footer, portaled)
       ↑ direkt angrenzend, kein Abstand
Scale-Wrapper (div.md:scale-[0.855])
  └── QuoteSection
        └── Desktop-Section (minHeight: 13160px)
              └── nur absolut positionierte Blöcke mit festen top-Werten
```

Der Footer hängt direkt unter dem Scale-Wrapper. Es gibt **kein** margin/padding zwischen Scale-Wrapper und `#main-footer` (page.tsx hat dort nichts, der Footer selbst hat kein `mt-*` mehr).

Der Abstand wirkt „groß“, weil **innerhalb** der Desktop-Section viel Leerraum liegt – zwischen dem **letzten sichtbaren Inhalt** und dem **Ende der Section** (13160px) bzw. zwischen dem **Kontakt-Block** und der **Welcome-Section**.

---

## 1. Wo der große Leerraum herkommt

Alle Inhalte in der Desktop-Section sind **absolut positioniert** mit festen `top`-Werten (in px). Die Section hat eine **feste Höhe** von **13160px**. Dadurch entstehen zwei Abstände:

### A) Abstand zwischen Kontakt-Block und Welcome-Section (**~600px**)

| Block | Datei/Zeile | `top` | Höhe (ca.) | Ende (top + Höhe) |
|-------|-------------|-------|------------|-------------------|
| Kontakt (Adresse + Öffnungszeiten) | QuoteSection ~2138 | **12111px** | 293px | **12404px** |
| Welcome Section (Bild + Text) | QuoteSection ~2232 | **12711px** | – | – |

- **Oberkante Kontakt** = 12111px  
- **Oberkante Welcome** = 12711px  
- **Differenz = 600px** → das ist der **große Leerraum** zwischen den beiden Blöcken.

Der Kontakt-Block endet bei ca. 12404px. Von **12404px bis 12711px** sind also **307px** „leer“. Oder man nimmt die volle Lücke von Oberkante zu Oberkante = **600px**. Beides ist der gleiche Leerraum, nur anders gemessen.

**Ursache:** Die `top`-Werte sind fest gesetzt (12111 und 12711). Der Abstand ist nicht durch margin/padding entstanden, sondern durch diese **600px Differenz** zwischen den beiden Blöcken.

### B) Abstand zwischen Welcome-Text und Section-Ende (~10–15px)

- Welcome-Text: innerhalb des Blocks bei `top: 400px`, also bei **12711 + 400 = 13111px** (Oberkante), eine Zeile ~40px → Ende ca. **13151px**.
- Section endet bei **13160px** (minHeight).
- **Leerraum** = 13160 − 13151 ≈ **9px** (nur dieser Teil ist „direkt über dem Footer“).

---

## 2. Warum der Abstand so groß wirkt

- **Hauptgrund:** Die **600px** (bzw. 307px sichtbarer Leerraum) zwischen **Kontakt** und **Welcome** sind fest einprogrammiert durch die `top`-Werte **12111px** und **12711px**. Das ist kein CSS-Margin, sondern „Luft“ in der absolut positionierten Szene.
- Zusätzlich: Die Section ist mit **minHeight: 13160px** bewusst hoch. Alles darunter ist absolut positioniert; wo kein Element sitzt, bleibt Leerraum.
- Der Footer sitzt direkt unter dem Scale-Wrapper; zwischen Section-Ende und Footer gibt es praktisch keinen Abstand mehr. Der **wahrgenommene** große Abstand ist also der Leerraum **oberhalb** des Footers, also vor allem die **600px-Lücke** zwischen Kontakt und Welcome.

---

## 3. Kurzfassung

| Abstand | Größe | Ursache |
|--------|--------|--------|
| Section-Ende ↔ Footer | 0 | Kein Margin/Padding zwischen Wrapper und #main-footer. |
| Letzter Inhalt (Welcome-Text) ↔ Section-Ende | ~9px | minHeight 13160px, Content endet ~13151px. |
| **Kontakt-Block ↔ Welcome-Section** | **600px** (Oberkante zu Oberkante) | Feste `top`: Kontakt **12111px**, Welcome **12711px**. |

**Warum der Abstand so groß ist:** Die **600px** zwischen den beiden Blöcken sind durch die festen `top`-Werte vorgegeben. Um den Abstand zu verkleinern, müsste man die **Welcome Section** nach oben verschieben (z. B. `top: 12711` auf etwa **12450** oder **12500** reduzieren), dann schrumpft die Lücke zwischen Kontakt und Welcome.
