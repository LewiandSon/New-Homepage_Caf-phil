#!/usr/bin/env node
import sharp from 'sharp';
import { existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

// FAQ page images conversions
const CONVERSIONS = [
  { input: 'table.png', output: 'table.webp', width: null, height: null },
];

async function convertImage(conversion) {
  const inputPath = join(ASSETS_DIR, conversion.input);
  const outputPath = join(ASSETS_DIR, conversion.output);

  if (!existsSync(inputPath)) {
    console.log(`⏭️  Skip ${conversion.input} (not found)`);
    return;
  }

  const inputSize = (statSync(inputPath).size / 1024).toFixed(2);
  console.log(`\n🔄 ${conversion.input} → ${conversion.output} (${inputSize}KB)...`);

  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);

    const outputSize = (statSync(outputPath).size / 1024).toFixed(2);
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(0);
    console.log(`✅ Done (${outputSize}KB, ${reduction}% reduction)`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log('Optimizing FAQ page images...\n');
  for (const conv of CONVERSIONS) {
    await convertImage(conv);
  }
  console.log('\n✅ All FAQ page images converted!');
}

main();
