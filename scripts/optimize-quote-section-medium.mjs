#!/usr/bin/env node
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

// QuoteSection medium images conversions (using viewBox dimensions)
const CONVERSIONS = [
  { input: 'saltpepper 1.svg', output: 'saltpepper.webp', width: 197, height: 203 },
  { input: 'sugar 1.svg', output: 'sugar.webp', width: 205, height: 275 },
  { input: 'cup 1.svg', output: 'cup.webp', width: 189, height: 172 },
  { input: 'lamp2 1.svg', output: 'lamp2.webp', width: 209, height: 284 },
  { input: 'monstera 1.svg', output: 'monstera.webp', width: 162, height: 199 },
  { input: 'books1 1.svg', output: 'books1.webp', width: 222, height: 194 },
  { input: 'cursor 1.svg', output: 'cursor.webp', width: 118, height: 123 },
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
    const svgContent = readFileSync(inputPath, 'utf-8');
    const base64Match = svgContent.match(/xlink:href="data:image\/(png|jpeg|jpg);base64,([^"]+)"/);
    
    if (base64Match) {
      const imageFormat = base64Match[1];
      const base64Data = base64Match[2];
      const buffer = Buffer.from(base64Data, 'base64');
      
      await sharp(buffer)
        .resize(conversion.width, conversion.height, { fit: 'fill' })
        .webp({ quality: 85 })
        .toFile(outputPath);
    } else {
      await sharp(inputPath)
        .resize(conversion.width, conversion.height, { fit: 'fill' })
        .webp({ quality: 85 })
        .toFile(outputPath);
    }

    const outputSize = (statSync(outputPath).size / 1024).toFixed(2);
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(0);
    console.log(`✅ Done (${outputSize}KB, ${reduction}% reduction)`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log('Optimizing QuoteSection medium images...\n');
  for (const conv of CONVERSIONS) {
    await convertImage(conv);
  }
  console.log('\n✅ All QuoteSection medium images converted!');
}

main();
