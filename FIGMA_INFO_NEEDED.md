# Was ich aus Figma brauche - Schritt für Schritt

## Problem
Die Elemente werden nicht richtig positioniert, weil ich die exakten Positionen aus Figma brauche.

## Was ich für JEDES Element brauche:

### 1. Öffne Figma → Wähle das Element aus

### 2. Im rechten Panel unter "Eigenschaften von Ebenen" → "Layout" findest du:

**Für die BORDÜRE:**
```
Left: [X]px        ← Das ist die X-Position
Top: [Y]px         ← Das ist die Y-Position  
Width: 851px       ← Hast du schon gegeben ✓
Height: 1063.75px  ← Hast du schon gegeben ✓
```

**Für das BILD (IMG_4886):**
```
Left: [X]px        ← Das brauche ich!
Top: [Y]px         ← Das brauche ich!
Width: 806px       ← Hast du schon gegeben ✓
Height: 531px      ← Hast du schon gegeben ✓
```

**Für "Unsere Geschichte" (Überschrift):**
```
Left: [X]px        ← Das brauche ich!
Top: [Y]px         ← Das brauche ich!
Width: [W]px       ← Das brauche ich!
Height: [H]px      ← Das brauche ich!
```

**Für den Textblock:**
```
Left: [X]px        ← Das brauche ich!
Top: [Y]px         ← Das brauche ich!
Width: [W]px       ← Das brauche ich!
Height: [H]px      ← Das brauche ich!
```

## WICHTIG: Absolute vs. Relative Positionen

Die Werte im Figma "Layout"-Panel sind **ABSOLUT** relativ zum gesamten Frame "Landingpage".

Ich berechne dann automatisch:
- Welcher Container (Header/Hero/About/etc.)
- Relative Position innerhalb des Containers

## Format für die Übergabe:

```
BORDÜRE:
- Left: [X]px
- Top: [Y]px

BILD (IMG_4886):
- Left: [X]px
- Top: [Y]px

ÜBERSCHRIFT "Unsere Geschichte":
- Left: [X]px
- Top: [Y]px
- Width: [W]px
- Height: [H]px

TEXTBLOCK:
- Left: [X]px
- Top: [Y]px
- Width: [W]px
- Height: [H]px
```

## Alternative: Screenshot

Ein Screenshot vom Figma "Layout"-Panel für jedes Element reicht auch!

