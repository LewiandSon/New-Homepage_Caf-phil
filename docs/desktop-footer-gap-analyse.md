# Warum der Abstand unter „Willkommen“ auf Desktop so groß wirkt (und warum kleine Änderungen nichts brachten)

## Was im Code passiert

1. **Scale-Wrapper** (`page.tsx`): Der gesamte Inhalt (Hero, About, QuoteSection) steckt in einem `div` mit **`md:scale-[0.855] md:origin-top`**.
2. **Layout vs. Darstellung**: `transform: scale(0.855)` ändert **nur die Darstellung**. Die **Layout-Höhe** des Wrappers bleibt die volle Höhe (Hero + About + Section mit `minHeight: 13152px`).
3. **Folge**: Der Inhalt wirkt auf 85,5 % Höhe zusammengedrückt, der Rest der Layout-Höhe bleibt „leer“ (Hintergrund sichtbar).  
   Das sind **ca. 14,5 %** der Section-Höhe: **13152 × (1 − 0.855) ≈ 1907px** Leerraum unter dem sichtbaren Ende des skalierten Inhalts.

## Warum die ersten Anpassungen kaum sichtbar waren

- **minHeight** von 13160 auf 13152 zu reduzieren spart nur **8px** – vernachlässigbar gegenüber ~1907px.
- **`-mt-2`** (8px) am Footer ist ebenfalls minimal.

Der sichtbare „riesen Abstand“ kommt also vom **Skalierungseffekt**, nicht von ein paar Pixeln Puffer in der Section.

## Umgesetzte Lösung

Der **Desktop-Footer** bekommt einen **negativen `marginTop`**, der genau diesen Skalierungs-Leerraum ausgleicht:

- **Formel:** `marginTop: calc(-1 * (13152px * (1 - 0.855)))` → etwa **-1907px**.
- Der Footer wird so weit nach oben gezogen, dass er direkt an den **sichtbaren** unteren Rand des skalierten Inhalts anschließt („Willkommen“-Text), ohne dass der Abstand von Hero/About hier eine Rolle spielt.

Damit sollte der große weiße/beige Streifen unter „Das Team phil heißt dich herzlich willkommen!“ auf Desktop verschwinden. Bitte im Browser prüfen (Hard-Refresh falls nötig: Cmd+Shift+R).
