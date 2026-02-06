#!/usr/bin/env node
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

// HeroSection draggable items conversions (using viewBox dimensions)
const CONVERSIONS = [
  { input: 'lamp4 1.svg', output: 'lamp4.webp', width: 328, height: 454 },
  { input: 'lamp1 1.svg', output: 'lamp1.webp', width: 216, height: 205 },
  { input: 'löffel 1.svg', output: 'loffel.webp', width: 155, height: 204 },
  { input: 'kaennchen 1.svg', output: 'kaennchen.webp', width: 146, height: 153 },
  { input: 'pomidoro 1.svg', output: 'pomidoro.webp', width: 222, height: 165 },
  { input: 'books2 1.svg', output: 'books2.webp', width: 251, height: 282 },
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
  console.log('Optimizing HeroSection draggable items...\n');
  for (const conv of CONVERSIONS) {
    await convertImage(conv);
  }
  console.log('\n✅ All HeroSection images converted!');
}

main();
