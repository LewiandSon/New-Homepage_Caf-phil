#!/usr/bin/env node
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

// AboutSection images conversions
const CONVERSIONS = [
  { input: 'bordüre 1.svg', output: 'bordure.webp', width: 1064, height: 851 },
  { input: 'IMG_4886 1.svg', output: 'IMG_4886.webp', width: 806, height: 531 },
  { input: 'IMG_4905 1.jpg', output: 'IMG_4905.webp', width: null, height: null }, // Will use original dimensions
  { input: 'I91A2497 1.jpg', output: 'I91A2497.webp', width: null, height: null }, // Will use original dimensions
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
    if (conversion.input.endsWith('.svg')) {
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
    } else {
      // JPG to WebP - use original dimensions
      const metadata = await sharp(inputPath).metadata();
      await sharp(inputPath)
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
  console.log('Optimizing AboutSection images...\n');
  for (const conv of CONVERSIONS) {
    await convertImage(conv);
  }
  console.log('\n✅ All AboutSection images converted!');
}

main();
