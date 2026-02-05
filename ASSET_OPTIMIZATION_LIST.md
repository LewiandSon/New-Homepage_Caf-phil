# Asset-Optimierungsliste für cafe-phil-web

**Erstellt:** 2026-02-05  
**Ziel:** Reduzierung der Total Byte Weight von ~54.3MB auf unter 10MB  
**Aktueller Performance-Score:** 0.58 (58%)

---

## 🎯 Kritische Assets (>5MB) - Höchste Priorität

### Videos
| Datei | Größe | Verwendung | Optimierungsvorschlag |
|-------|-------|------------|----------------------|
| `books-website-mit-hg.mp4` | **66MB** | `/bucher/page.tsx` (2x) | ✅ Bereits `preload="none"` gesetzt. **Konvertieren zu WebM/AV1**, Qualität reduzieren, oder durch statisches Bild ersetzen |
| `events-diashow-website.mp4` | **7.5MB** | `QuoteSection.tsx` (2x) | ✅ Bereits `preload="none"` gesetzt. **Konvertieren zu WebM**, Qualität reduzieren |

### Bilder (SVG → JPG/WebP konvertieren)
| Datei | Größe | Verwendung | Optimierungsvorschlag |
|-------|-------|------------|----------------------|
| `mirror1 1.svg` | **12MB** | `QuoteSection.tsx` | **Konvertieren zu JPG/WebP** (~200-300KB), `loading="lazy"` hinzufügen |
| `IMG_5028 1.svg` | **11MB** | `QuoteSection.tsx` (Schanigarten) | **Konvertieren zu JPG/WebP** (~300-400KB), bereits `loading="lazy"` |
| `IMG_4843-2 1.svg` | **9.3MB** | `QuoteSection.tsx` | **Konvertieren zu JPG/WebP** (~300-400KB), bereits `loading="lazy"` |
| `disco 1.svg` | **6.8MB** | `QuoteSection.tsx` (2x) | **Konvertieren zu JPG/WebP** (~200-300KB), bereits `loading="lazy"` |
| `cup2 1.svg` | **4.8MB** | `HeroSection.tsx` (draggable) | **Konvertieren zu PNG/JPG** (~100-150KB), `unoptimized` entfernen |
| `lamp2 1.svg` | **4.7MB** | Nicht gefunden | **Prüfen ob verwendet**, wenn ja: konvertieren |

---

## 🔴 Große Assets (1-5MB) - Hohe Priorität

### Bilder
| Datei | Größe | Verwendung | Optimierungsvorschlag |
|-------|-------|------------|----------------------|
| `pomidoro 1.svg` | **3.3MB** | `HeroSection.tsx` (draggable) | **Konvertieren zu PNG/JPG** (~80-120KB), `unoptimized` entfernen |
| `löffel 1.svg` | **3.3MB** | `HeroSection.tsx` (draggable) | **Konvertieren zu PNG/JPG** (~80-120KB), `unoptimized` entfernen |
| `kaennchen 1.svg` | **3.3MB** | `HeroSection.tsx` (draggable) | **Konvertieren zu PNG/JPG** (~80-120KB), `unoptimized` entfernen |
| `cup 1.svg` | **3.1MB** | Nicht gefunden | **Prüfen ob verwendet**, wenn ja: konvertieren |
| `monstera 1.svg` | **2.0MB** | Nicht gefunden | **Prüfen ob verwendet**, wenn ja: konvertieren |
| `bild 1.svg` | **1.5MB** | `QuoteSection.tsx` | **Konvertieren zu JPG/WebP** (~150-200KB), bereits `loading="lazy"` |

### Menü-Karten (SVG)
| Datei | Größe | Verwendung | Optimierungsvorschlag |
|-------|-------|------------|----------------------|
| `fruhstueck-en.svg` | **1.5MB** | `QuoteSection.tsx` | ✅ `unoptimized` bereits entfernt. **SVG optimieren** (SVGO) oder zu PNG konvertieren |
| `wein-en.svg` | **1.4MB** | `QuoteSection.tsx` | ✅ `unoptimized` bereits entfernt. **SVG optimieren** (SVGO) oder zu PNG konvertieren |
| `fruhstueck.svg` | **1.3MB** | `QuoteSection.tsx` | ✅ `unoptimized` bereits entfernt. **SVG optimieren** (SVGO) oder zu PNG konvertieren |
| `Wein.svg` | **1.3MB** | `QuoteSection.tsx` | ✅ `unoptimized` bereits entfernt. **SVG optimieren** (SVGO) oder zu PNG konvertieren |
| `limo-en.svg` | **1.2MB** | `QuoteSection.tsx` | ✅ `unoptimized` bereits entfernt. **SVG optimieren** (SVGO) oder zu PNG konvertieren |
| `Limo.svg` | **1.2MB** | `QuoteSection.tsx` | ✅ `unoptimized` bereits entfernt. **SVG optimieren** (SVGO) oder zu PNG konvertieren |
| `snacks.svg` | **995KB** | `QuoteSection.tsx` | ✅ `unoptimized` bereits entfernt. **SVG optimieren** (SVGO) oder zu PNG konvertieren |
| `Kaffee.svg` | **962KB** | `QuoteSection.tsx` | ✅ `unoptimized` bereits entfernt. **SVG optimieren** (SVGO) oder zu PNG konvertieren |
| `kaffee-en.svg` | **935KB** | `QuoteSection.tsx` | ✅ `unoptimized` bereits entfernt. **SVG optimieren** (SVGO) oder zu PNG konvertieren |
| `snacks-en.svg` | **893KB** | `QuoteSection.tsx` | ✅ `unoptimized` bereits entfernt. **SVG optimieren** (SVGO) oder zu PNG konvertieren |

---

## 🟡 Mittlere Assets (500KB-1MB) - Mittlere Priorität

| Datei | Größe | Verwendung | Optimierungsvorschlag |
|-------|-------|------------|----------------------|
| `lamp1 1.svg` | **1.0MB** | `HeroSection.tsx` (draggable) | **Konvertieren zu PNG/JPG** (~60-80KB), `unoptimized` entfernen |
| `ausgesprochen_viel 1.svg` | **905KB** | Nicht gefunden | **Prüfen ob verwendet**, wenn ja: konvertieren |
| `saltpepper 1.svg` | **804KB** | Nicht gefunden | **Prüfen ob verwendet**, wenn ja: konvertieren |
| `books2 1.svg` | **823KB** | `HeroSection.tsx` (draggable) | **Konvertieren zu PNG/JPG** (~60-80KB), `unoptimized` entfernen |
| `lamp4 1.svg` | **760KB** | `HeroSection.tsx` (draggable) | **Konvertieren zu PNG/JPG** (~50-70KB), `unoptimized` entfernen |
| `sugar 1.svg` | **1.2MB** | Nicht gefunden | **Prüfen ob verwendet**, wenn ja: konvertieren |
| `analog-cafe-giff.mp4` | **576KB** | `QuoteSection.tsx`, `AboutSection.tsx` | ✅ Bereits `preload="none"` gesetzt. **Konvertieren zu WebM** oder GIF optimieren |

---

## ✅ Bereits optimiert

| Datei | Größe | Status |
|-------|-------|--------|
| `neues_foto.jpg` | **87KB** | ✅ Ersetzt `IMG_4886 1.svg` (12MB) - **98% Reduktion** |
| `Bordüre2.png` | **427KB** | ✅ Ersetzt `bordüre 1.svg` (713KB) - **40% Reduktion**, `unoptimized` hinzugefügt (400-Fehler behoben) |

---

## 📋 Optimierungsstrategie

### Phase 1: Kritische Assets (Sofort)
1. **Videos konvertieren:**
   - `books-website-mit-hg.mp4` (66MB) → WebM/AV1 (~5-10MB)
   - `events-diashow-website.mp4` (7.5MB) → WebM (~2-3MB)

2. **Große SVG-Bilder konvertieren:**
   - `mirror1 1.svg` (12MB) → JPG/WebP (~200-300KB)
   - `IMG_5028 1.svg` (11MB) → JPG/WebP (~300-400KB)
   - `IMG_4843-2 1.svg` (9.3MB) → JPG/WebP (~300-400KB)
   - `disco 1.svg` (6.8MB) → JPG/WebP (~200-300KB)

**Erwartete Reduktion:** ~100MB → ~5MB (**95% Reduktion**)

### Phase 2: Draggable Items (HeroSection)
- Alle draggable SVG-Items konvertieren:
  - `cup2 1.svg` (4.8MB) → PNG/JPG (~100-150KB)
  - `pomidoro 1.svg` (3.3MB) → PNG/JPG (~80-120KB)
  - `löffel 1.svg` (3.3MB) → PNG/JPG (~80-120KB)
  - `kaennchen 1.svg` (3.3MB) → PNG/JPG (~80-120KB)
  - `books2 1.svg` (823KB) → PNG/JPG (~60-80KB)
  - `lamp4 1.svg` (760KB) → PNG/JPG (~50-70KB)
  - `lamp1 1.svg` (1.0MB) → PNG/JPG (~60-80KB)

**Erwartete Reduktion:** ~15MB → ~600KB (**96% Reduktion**)

### Phase 3: Menü-Karten (Optional)
- SVG mit SVGO optimieren oder zu PNG konvertieren
- Aktuell bereits `unoptimized` entfernt, aber Größe könnte noch reduziert werden

---

## 🛠️ Tools für Konvertierung

### Bilder (SVG → JPG/WebP)
```bash
# Mit ImageMagick
convert input.svg -quality 85 output.jpg
convert input.svg -quality 85 output.webp

# Mit Sharp (Node.js)
npx sharp-cli input.svg --output output.jpg --quality 85
```

### Videos (MP4 → WebM)
```bash
# Mit FFmpeg
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm

# Für AV1 (bessere Kompression)
ffmpeg -i input.mp4 -c:v libaom-av1 -crf 30 -b:v 0 -c:a libopus output.webm
```

### SVG optimieren
```bash
# Mit SVGO
npx svgo input.svg -o output.svg

# Oder online: https://jakearchibald.github.io/svgomg/
```

---

## 📊 Erwartete Ergebnisse

**Vorher:**
- Total Byte Weight: ~54.3MB
- Performance Score: 0.58 (58%)
- JavaScript Execution Time: 88.3s

**Nach Phase 1 + 2:**
- Total Byte Weight: ~6-8MB (**85-90% Reduktion**)
- Performance Score: ~0.75-0.85 (75-85%)
- JavaScript Execution Time: ~20-30s (**65-75% Reduktion**)

---

## ⚠️ Wichtige Hinweise

1. **Bildqualität:** Beim Konvertieren von SVG zu Raster-Formaten auf Qualität achten
2. **Aspect Ratio:** Beim Konvertieren das ursprüngliche Seitenverhältnis beibehalten
3. **Code-Updates:** Nach Konvertierung müssen alle Referenzen im Code aktualisiert werden
4. **Testing:** Nach jeder Konvertierung die Seite testen, um sicherzustellen, dass alles korrekt angezeigt wird

---

## 📝 Notizen

- Alle Videos haben bereits `preload="none"` → Gut für initiale Ladezeit
- Viele große Bilder haben bereits `loading="lazy"` → Gut für Performance
- `unoptimized` wurde bereits von vielen Bildern entfernt → Next.js Image Optimization aktiviert
- Bordüre2.png 400-Fehler wurde behoben durch `unoptimized` Prop
