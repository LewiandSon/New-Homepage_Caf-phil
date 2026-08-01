# Detailanalyse: Warum der Header früher funktionierte und jetzt nicht mehr

## Zeitstrahl der Änderungen

### ✅ a71ffbf („Menü-Navigation: scrollIntoView…“) – **FUNKTIONIERTE**
- **Header:** `fixed top-0 left-0 right-0` + `bg-background` (voll deckend)
- **Logo:** 80×80 / 100×100
- **Höhe:** 90px / 115px
- **Mobile-Menü:** `bg-background` (voll deckend)
- **Seiten:** `pt-[150px]` (bzw. pt-[120px] auf Mobile) für Abstand unter fixiertem Header

---

### ❌ 678afcc („Mobile UI improvements“) – **BEGINN DES PROBLEMS**
Änderungen:
- Header: `bg-background/80 backdrop-blur-sm` auf Mobile (statt `bg-background`)
- Mobile-Menü: `bg-background/95 backdrop-blur-sm` (statt `bg-background`)
- Logo: 60×60 auf Mobile (statt 80×80)
- Link-Styling: `active:bg-[#D72333]` für Touch-Feedback

**Warum das das Problem auslöst:**

1. **`backdrop-filter: blur()`**  
   Der Browser muss den Inhalt **hinter** dem Element samplen und verwischen. Beim Scrollen:
   - Das verwischte Bild aktualisiert sich ständig mit dem scrollenden Inhalt
   - Auf iOS Safari: bekanntes Bug-Verhalten – `position: fixed` + `backdrop-filter` führen dazu, dass das Element optisch mit dem Scroll „mitwandert“

2. **`bg-background/80` (halbtransparent)**  
   Der scrollende Inhalt scheint durch – visuell wirkt der Header, als würde er mit dem Inhalt scrollen.

---

### ❌ dc09141 („Make header completely transparent on mobile“) – **VERSCHLIMMERUNG**
- Header: `bg-transparent` auf Mobile
- Mobile-Menü: `bg-transparent`
- Hintergrund komplett weg – der scrollende Inhalt ist voll sichtbar, der Header wirkt als ob er mitscrollt.

---

### 🔄 7c5f3e4 („Header: remove transparency, keep only blur“)
- Header: `bg-background backdrop-blur-sm md:bg-background md:backdrop-blur-none`
- Transparenz entfernt, aber **backdrop-blur bleibt** – Problem bleibt bestehen.

---

### 🔄 Spätere Fix-Versuche (sticky, pt entfernt, etc.)
- `position: sticky` statt `fixed`: anderes Verhalten, Header scrollt zunächst mit
- `pt-[150px]` entfernt: passt zu sticky, aber nicht zu fixed

---

## Technische Ursache (iOS Safari)

`backdrop-filter` und `position: fixed` sind auf iOS Safari problematisch:
- Änderung der Viewport-Höhe (z.B. Adressleiste ein-/ausblenden)
- Compositing-Layer mit Blur verhält sich beim Scroll unvorhersehbar
- Das Element „klebt“ optisch am scrollenden Inhalt

## Lösung

Header auf den **exakten Stand von a71ffbf** zurücksetzen:
- `position: fixed`
- `bg-background` (voll deckend, keine Transparenz)
- **Kein** `backdrop-blur`
- Mobile-Menü: `bg-background` (voll deckend)
- `pt-[120px] md:pt-[150px]` auf allen Seiten für den fixierten Header wiederherstellen

Die anderen Mobile-UI-Verbesserungen (kleineres Logo, Touch-Feedback) können erhalten bleiben – nur Hintergrund und Blur müssen weg.
