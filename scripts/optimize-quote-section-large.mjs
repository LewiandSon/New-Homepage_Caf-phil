#!/usr/bin/env node
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

// QuoteSection large images conversions (using viewBox dimensions)
const CONVERSIONS = [
  { input: 'mirror1 1.svg', output: 'mirror1.webp', width: 309, height: 354 },
  { input: 'IMG_5028 1.svg', output: 'IMG_5028.webp', width: 456, height: 685 },
  { input: 'IMG_4843-2 1.svg', output: 'IMG_4843-2.webp', width: 759, height: 1074 },
  { input: 'disco 1.svg', output: 'disco.webp', width: 214, height: 304 },
];

async function convertImage(conversion) {
  const inputPath = join(ASSETS_DIR, conversion.input);
  const outputPath = join(ASSETS_DIR, conversion.output);

  if (!existsSync(inputPath)) {
    console.log(`⏭️  Skip ${conversion.input} (not found)`);
    return;
  }

  const inputSize = (statSync(inputPath).size / 1024 / 1024).toFixed(2);
  console.log(`\n🔄 ${conversion.input} → ${conversion.output} (${inputSize}MB)...`);

  try {
    const svgContent = readFileSync(inputPath, 'utf-8');
    const base64Match = svgContent.match(/xlink:href="data:image\/(png|jpeg|jpg);base64,([^"]+)"/);
    
    if (base64Match) {
      const imageFormat = base64Match[1];
      const base64Data = base64Match[2];
      const buffer = Buffer.from(base64Data, 'base64');
      
      console.log(`   Found embedded ${imageFormat.toUpperCase()} image`);
      
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
    const reduction = ((1 - outputSize / (inputSize * 1024)) * 100).toFixed(0);
    console.log(`✅ Done (${outputSize}KB, ${reduction}% reduction)`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log('Optimizing QuoteSection large images...\n');
  for (const conv of CONVERSIONS) {
    await convertImage(conv);
  }
  console.log('\n✅ All QuoteSection large images converted!');
}

main();
