#!/usr/bin/env node
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

// Single image conversion: ausgesprochen_viel 1.svg → ausgesprochen_viel.webp
// viewBox="0 0 127 127" → 127x127 WebP
const CONVERSION = {
  input: 'ausgesprochen_viel 1.svg',
  output: 'ausgesprochen_viel.webp',
  width: 127,
  height: 127,
};

async function convertImage() {
  const inputPath = join(ASSETS_DIR, CONVERSION.input);
  const outputPath = join(ASSETS_DIR, CONVERSION.output);

  if (!existsSync(inputPath)) {
    console.error(`❌ Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const inputSize = (statSync(inputPath).size / 1024).toFixed(2);
  console.log(`\n🔄 Converting ${CONVERSION.input} → ${CONVERSION.output}`);
  console.log(`   Input size: ${inputSize}KB`);
  console.log(`   Target dimensions: ${CONVERSION.width}x${CONVERSION.height}`);

  try {
    // Read SVG file
    const svgContent = readFileSync(inputPath, 'utf-8');
    
    // Extract base64 image data if present
    const base64Match = svgContent.match(/xlink:href="data:image\/(png|jpeg|jpg);base64,([^"]+)"/);
    
    if (base64Match) {
      const imageFormat = base64Match[1];
      const base64Data = base64Match[2];
      const buffer = Buffer.from(base64Data, 'base64');
      
      console.log(`   Found embedded ${imageFormat.toUpperCase()} image`);
      
      // Convert to WebP with exact dimensions
      await sharp(buffer)
        .resize(CONVERSION.width, CONVERSION.height, { fit: 'fill' })
        .webp({ quality: 85 })
        .toFile(outputPath);
    } else {
      // Pure SVG - convert directly
      console.log(`   Pure SVG, converting directly`);
      await sharp(inputPath)
        .resize(CONVERSION.width, CONVERSION.height, { fit: 'fill' })
        .webp({ quality: 85 })
        .toFile(outputPath);
    }

    const outputSize = (statSync(outputPath).size / 1024).toFixed(2);
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(0);
    
    console.log(`✅ Done!`);
    console.log(`   Output size: ${outputSize}KB`);
    console.log(`   Reduction: ${reduction}%`);
  } catch (error) {
    console.error(`❌ Error converting image:`, error.message);
    process.exit(1);
  }
}

convertImage();
