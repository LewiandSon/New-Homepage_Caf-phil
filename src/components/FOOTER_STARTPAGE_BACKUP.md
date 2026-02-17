# Footer Startseite – Backup zum Wiederaufbau

Folgende Elemente waren im Footer und im zugehörigen Modal. Beim Neubau hierher schauen.

---

## State (in QuoteSection)

```ts
const [footerModal, setFooterModal] = useState<"imprint" | "privacy" | "terms" | null>(null);
const [showInstagramStrichFooter, setShowInstagramStrichFooter] = useState(false);
```

- In `useEffect` für body overflow: `footerModal` mit prüfen (wie lightboxIndex, showEventLightbox).

---

## Footer – Inhalt (Desktop + Mobile gleich)

- **Hintergrund:** `#D72333`
- **Layout:** `flex flex-col items-center justify-center py-16 px-6`

### 1. Engel

- Bild: `/images/assets/engel.svg`
- Container: `w-[90px] h-[140px] relative mb-8`
- Image: `fill`, `object-contain`, `unoptimized`

### 2. Text

- „phil Cafe & Bookshop“ (strong)
- Zeilenumbruch
- „2026. All rights reserved“
- Stil: `color: #F9F1DA`, Vollkorn, `clamp(14px, 2vw, 18px)`, fontWeight 500, lineHeight 150%
- Container: `w-full max-w-[1440px] mx-auto text-left`

### 3. Legal-Links

- Drei Buttons: Imprint | Privacy Policy | Terms & Conditions
- `gap-[12px]`, `flex-wrap`, `opacity-60`, `max-w-[1440px] mx-auto`
- Stil: #F9F1DA, Vollkorn, `clamp(12px, 1.5vw, 16px)`, underline
- `onClick` → `setFooterModal(item.id)` mit id: `"imprint" | "privacy" | "terms"`
- Trennzeichen: `|` zwischen den Links

### 4. Instagram

- Link: `https://www.instagram.com/phil.in.wien/`
- Container: `block w-[300px] h-[120px] relative`, `mt-12 flex flex-col items-center`
- Bild: `/images/assets/instagram 1.svg`, fill, object-contain
- Hover: zwei Unterstreichungen (beige), Bild `/images/assets/unterstreichung-beige.png`, 110x16, `bottom-[50px]` und `bottom-[8px]`, `left-[43%]`, rotate -3deg
- State dafür: `showInstagramStrichFooter`, onMouseEnter/Leave setzen

---

## Footer Modal (Imprint / Privacy / Terms)

- Overlay: `fixed inset-0 z-[9999]`, `backgroundColor: "rgba(0, 0, 0, 0.5)"`, `onClick={() => setFooterModal(null)}`
- Innen: `relative w-[90%] max-w-[520px] bg-[#D72333] text-[#F9F1DA] px-6 md:px-8 py-8 md:py-10`, `onClick={(e) => e.stopPropagation()}`
- Schließen-Button: rechts oben, ×, `setFooterModal(null)`

### Imprint

- phil Cafe & Bookshop, Gumpendorfer Straße 10 – 12, 1060 Vienna, Austria, Phone: 01 581 04 89, E-Mail: info@phil.info, Owner: Lewi & Son GmbH

### Privacy Policy

- Text: This website does not collect personal data except for what is necessary to process contact requests. For more information, please contact us at info@phil.info.

### Terms & Conditions

- Text: By using this website, you agree to our terms and conditions. For more information, please contact us at info@phil.info.

---

## Varianten

- **Desktop:** Footer war zuletzt in einem Wrapper mit `transform: scale(1/0.855)`, `transformOrigin: top center` (weil er im Scale-Wrapper der Startseite stand). Beim Neubau entscheiden: entweder wieder als letztes im Scale-Wrapper mit diesem Wrapper, oder außerhalb (z. B. eigenes Layout ohne Scale).
- **Mobile:** Footer mit `md:hidden mt-4`, sonst gleicher Inhalt wie oben.

---

## Imports (für Neubau)

- `Image` von `next/image`
- `Fragment` von `react`
- `useLanguage` für evtl. sprachabhängige Texte (aktuell waren alle Texte EN)
