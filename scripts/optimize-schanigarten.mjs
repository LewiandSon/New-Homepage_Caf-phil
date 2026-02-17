#!/usr/bin/env node
import sharp from 'sharp';
import { existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

// Schanigarten_2.jpg → schanigarten.webp (für Mobile + Desktop, 456x608 = 3:4 aspect)
const INPUT = 'Schanigarten_2.jpg';
const OUTPUT = 'schanigarten.webp';

async function main() {
  const inputPath = join(ASSETS_DIR, INPUT);
  const outputPath = join(ASSETS_DIR, OUTPUT);

  if (!existsSync(inputPath)) {
    console.error(`❌ ${INPUT} not found`);
    process.exit(1);
  }

  const inputSize = (statSync(inputPath).size / 1024).toFixed(2);
  console.log(`🔄 Converting ${INPUT} → ${OUTPUT} (${inputSize}KB)...`);

  await sharp(inputPath)
    .resize(912, 1216, { fit: 'inside' }) // 2x for retina
    .webp({ quality: 85 })
    .toFile(outputPath);

  const outputSize = (statSync(outputPath).size / 1024).toFixed(2);
  console.log(`✅ Done (${outputSize}KB)`);
}

main();
