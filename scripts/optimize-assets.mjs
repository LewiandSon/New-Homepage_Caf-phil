#!/usr/bin/env node
/**
 * Converts large SVG assets (with embedded raster) to WebP.
 * Extracts embedded base64 images and converts to optimized WebP.
 */
import { readFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

const CONVERSIONS = [
  ['IMG_4886 1.svg', 'IMG_4886.webp'],
  ['IMG_5028 1.svg', 'IMG_5028.webp'],
  ['IMG_4843-2 1.svg', 'IMG_4843-2.webp'],
  ['IMG_4905 1.svg', 'IMG_4905.webp'],
  ['I91A2497 1.svg', 'I91A2497.webp'],
  ['mirror1 1.svg', 'mirror1.webp'],
  ['disco 1.svg', 'disco.webp'],
  ['bild 1.svg', 'bild.webp'],
  ['cup2 1.svg', 'cup2.webp'],
  ['pomidoro 1.svg', 'pomidoro.webp'],
  ['löffel 1.svg', 'loeffel.webp'],
  ['kaennchen 1.svg', 'kaennchen.webp'],
  ['lamp1 1.svg', 'lamp1.webp'],
  ['lamp4 1.svg', 'lamp4.webp'],
  ['lamp2 1.svg', 'lamp2.webp'],
  ['books2 1.svg', 'books2.webp'],
  ['books1 1.svg', 'books1.webp'],
  ['cup 1.svg', 'cup.webp'],
  ['monstera 1.svg', 'monstera.webp'],
  ['bordüre 1.svg', 'bordure.webp'],
  ['bordüre2.svg', 'bordure2.webp'],
  ['saltpepper 1.svg', 'saltpepper.webp'],
  ['sugar 1.svg', 'sugar.webp'],
  ['sieb 1.svg', 'sieb.webp'],
  ['cursor 1.svg', 'cursor.webp'],
  ['cursor 2.svg', 'cursor2.webp'],
  ['pfeil 1.svg', 'pfeil.webp'],
  ['wo-kaffee-2 1.svg', 'wo-kaffee-2.webp'],
  ['ausgesprochen_viel 1.svg', 'ausgesprochen_viel.webp'],
];

function extractBase64FromSvg(svgPath) {
  const content = readFileSync(svgPath, 'utf8');
  const match = content.match(/xlink:href="data:image\/(jpeg|png|webp);base64,([^"]+)"/);
  if (match) return Buffer.from(match[2], 'base64');
  return null;
}

async function convertSvgToWebp(sourceName, outputName) {
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
  await sharp(buffer).webp({ quality: 85 }).toFile(outputPath);
  const outputSize = (statSync(outputPath).size / 1024).toFixed(0);
  console.log(`✅ ${sourceName} → ${outputName} (${inputSize}KB → ${outputSize}KB)`);
  return { outputName };
}

async function main() {
  console.log('Optimizing assets (SVG → WebP)...\n');
  for (const [source, output] of CONVERSIONS) {
    try { await convertSvgToWebp(source, output); } catch (e) { console.error(`❌ ${source}:`, e.message); }
  }
  console.log('\nDone.');
}

main();
