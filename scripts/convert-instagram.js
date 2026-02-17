const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../public/images/assets/instagram.png');
const outputPath = path.join(__dirname, '../public/images/assets/instagram-optimized.webp');

async function convertToWebP() {
  try {
    const info = await sharp(inputPath)
      .resize(600, 240, { fit: 'inside' })
      .webp({ quality: 90, effort: 6 })
      .toFile(outputPath);
    
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = info.size;
    const reduction = ((inputSize - outputSize) / inputSize * 100).toFixed(2);
    
    console.log('✓ Conversion successful!');
    console.log(`  Input:  ${(inputSize / 1024).toFixed(2)} KB`);
    console.log(`  Output: ${(outputSize / 1024).toFixed(2)} KB`);
    console.log(`  Dimensions: ${info.width}x${info.height}`);
    console.log(`  Reduction: ${reduction}%`);
  } catch (error) {
    console.error('Error converting image:', error);
    process.exit(1);
  }
}

convertToWebP();
