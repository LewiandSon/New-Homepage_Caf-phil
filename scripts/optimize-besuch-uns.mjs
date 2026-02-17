#!/usr/bin/env node
import sharp from 'sharp';
import { existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

const FILES = [
  '1_Lokal.jpg',
  '2_Spiegel.jpg',
  '3_Abend.jpg',
  '4_Lampen.jpg',
  '5_Eingang.jpg',
  '6_Bedienung.jpg',
];

async function convert(file) {
  const inputPath = join(ASSETS_DIR, file);
  const outputPath = join(ASSETS_DIR, file.replace('.jpg', '.webp'));

  if (!existsSync(inputPath)) {
    console.log(`⏭️  Skip ${file} (not found)`);
    return;
  }

  const inputSize = (statSync(inputPath).size / 1024 / 1024).toFixed(2);
  console.log(`🔄 ${file} → ${file.replace('.jpg', '.webp')} (${inputSize}MB)...`);

  await sharp(inputPath)
    .resize(912, 912, { fit: 'inside' }) // max 912px for retina grid
    .webp({ quality: 85 })
    .toFile(outputPath);

  const outputSize = (statSync(outputPath).size / 1024).toFixed(2);
  console.log(`   ✅ ${outputSize}KB\n`);
}

async function main() {
  console.log('Optimizing Besuch-uns images...\n');
  for (const file of FILES) {
    await convert(file);
  }
  console.log('Done!');
}

main();
