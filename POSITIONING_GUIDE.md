# Positionierungs-Guide für die Landingpage

## Aktuelle Struktur

Die Landingpage ist **1440px breit × 16256px hoch** und verwendet absolute Positionierung.

### Container-Hierarchie:

1. **Header** (top: 0px, height: 222px)
   - Alle Elemente relativ zu top: 0

2. **HeroSection** (Container startet bei top: 222px)
   - Zentrierter Container: `max-w-[1440px] mx-auto`
   - Innerer Container: `left-[326px] top-[222px]`
   - Elemente relativ zu diesem Container

3. **AboutSection** (Container startet bei top: 1193px)
   - Container: `left: 0, top: 1193px, width: 1440px, height: 1567px`
   - Elemente relativ zu diesem Container

## Was ich brauche für 100% genaue Positionierung

### Für jedes Element aus Figma:

1. **Absolute Position** (relativ zum gesamten Frame "Landingpage"):
   - `left` (X-Position in px)
   - `top` (Y-Position in px)

2. **Dimensionen**:
   - `width` (Breite in px)
   - `height` (Höhe in px)

3. **Zusätzliche Eigenschaften** (falls vorhanden):
   - `transform: rotate(...)` (Rotation)
   - `z-index` (Layering)

### Beispiel:

**Bordüre aus Figma:**
- Absolute Position: `left: 206px, top: 1299px`
- Dimensionen: `width: 851px, height: 1063.75px`
- Rotation: `-90deg`

**Berechnung für AboutSection:**
- Container startet bei: `top: 1193px`
- Relative Position: `top: 1299px - 1193px = 106px`
- Im Code: `left: 206px, top: 106px` (relativ zum Container)

## Beste Methode: Figma Inspect-Modus

1. Öffne Figma → Inspect-Modus
2. Wähle ein Element aus
3. Kopiere die Werte aus dem "Layout"-Panel:
   - **Left** (X)
   - **Top** (Y)
   - **Width**
   - **Height**
4. Falls Rotation vorhanden: **Transform** → **Rotation**

Diese Werte sind **absolut** relativ zum gesamten Frame. Ich berechne dann automatisch die relativen Positionen innerhalb der Container.

## Format für die Übergabe

Für jedes Element:
```
Element-Name:
- left: [X]px
- top: [Y]px
- width: [W]px
- height: [H]px
- rotation: [R]deg (optional)
- z-index: [Z] (optional)
```

Oder als Screenshot vom Figma Inspect-Panel mit den Layout-Werten.

