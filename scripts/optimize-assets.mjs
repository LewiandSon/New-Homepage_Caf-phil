#!/usr/bin/env node
/**
 * Converts SVG assets (with embedded raster) to WebP.
 * Output dimensions match SVG viewBox EXACTLY to preserve layout.
 */
import { readFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

// [sourceFile, outputWebP, width, height] - dimensions from SVG viewBox
const CONVERSIONS = [
  ['IMG_4886 1.svg', 'IMG_4886.webp', 806, 531],
  ['IMG_5028 1.svg', 'IMG_5028.webp', 456, 685],
  ['IMG_4843-2 1.svg', 'IMG_4843-2.webp', 759, 1074],
  ['IMG_4905 1.svg', 'IMG_4905.webp', 479, 571],
  ['I91A2497 1.svg', 'I91A2497.webp', 589, 393],
  ['mirror1 1.svg', 'mirror1.webp', 309, 354],
  ['disco 1.svg', 'disco.webp', 214, 304],
  ['bild 1.svg', 'bild.webp', 238, 319],
  ['cup2 1.svg', 'cup2.webp', 156, 234],
  ['pomidoro 1.svg', 'pomidoro.webp', 222, 165],
  ['löffel 1.svg', 'loeffel.webp', 155, 204],
  ['kaennchen 1.svg', 'kaennchen.webp', 146, 153],
  ['lamp1 1.svg', 'lamp1.webp', 216, 205],
  ['lamp4 1.svg', 'lamp4.webp', 328, 454],
  ['lamp2 1.svg', 'lamp2.webp', 209, 284],
  ['books2 1.svg', 'books2.webp', 251, 282],
  ['books1 1.svg', 'books1.webp', 222, 194],
  ['cup 1.svg', 'cup.webp', 189, 172],
  ['monstera 1.svg', 'monstera.webp', 162, 199],
  ['bordüre 1.svg', 'bordure.webp', 1064, 851],
  ['bordüre2.svg', 'bordure2.webp', 674, 860],
  ['saltpepper 1.svg', 'saltpepper.webp', 197, 203],
  ['sugar 1.svg', 'sugar.webp', 205, 275],
  ['sieb 1.svg', 'sieb.webp', 338, 195],
  ['cursor 1.svg', 'cursor.webp', 118, 123],
  ['cursor 2.svg', 'cursor2.webp', 118, 123],
  ['pfeil 1.svg', 'pfeil.webp', 356, 383],
  ['wo-kaffee-2 1.svg', 'wo-kaffee-2.webp', 660, 287],
  ['ausgesprochen_viel 1.svg', 'ausgesprochen_viel.webp', 127, 127],
];

function extractBase64FromSvg(svgPath) {
  const content = readFileSync(svgPath, 'utf8');
  const match = content.match(/xlink:href="data:image\/(jpeg|png|webp);base64,([^"]+)"/);
  if (match) return Buffer.from(match[2], 'base64');
  return null;
}

async function convertSvgToWebp(sourceName, outputName, targetWidth, targetHeight) {
  const sourcePath = join(ASSETS_DIR, sourceName);
  const outputPath = join(ASSETS_DIR, outputName);
  if (!existsSync(sourcePath)) {
    console.log(`⏭️  Skip ${sourceName} (not found)`);
    return { skipped: true };
  }
  const buffer = extractBase64FromSvg(sourcePath);
  if (!buffer) {
    console.log(`⏭️  Skip ${sourceName} (no embedded raster)`);
    return { skipped: true };
  }
  const inputSize = (readFileSync(sourcePath).length / 1024).toFixed(0);
  await sharp(buffer)
    .resize(targetWidth, targetHeight, { fit: 'fill' })
    .webp({ quality: 85 })
    .toFile(outputPath);
  const outputSize = (statSync(outputPath).size / 1024).toFixed(0);
  console.log(`✅ ${sourceName} → ${outputName} ${targetWidth}x${targetHeight} (${inputSize}KB → ${outputSize}KB)`);
  return { outputName };
}

async function main() {
  console.log('Optimizing assets (SVG → WebP, exact dimensions)...\n');
  for (const [source, output, w, h] of CONVERSIONS) {
    try { await convertSvgToWebp(source, output, w, h); } catch (e) { console.error(`❌ ${source}:`, e.message); }
  }
  console.log('\nDone.');
}

main();
