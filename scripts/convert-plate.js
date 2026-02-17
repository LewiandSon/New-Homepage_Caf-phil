const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../public/images/assets/plate.png');
const outputPath = path.join(__dirname, '../public/images/assets/plate.webp');

async function convertToWebP() {
  try {
    const info = await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = info.size;
    const reduction = ((inputSize - outputSize) / inputSize * 100).toFixed(2);
    
    console.log('✓ Conversion successful!');
    console.log(`  Input:  ${(inputSize / 1024).toFixed(2)} KB`);
    console.log(`  Output: ${(outputSize / 1024).toFixed(2)} KB`);
    console.log(`  Dimensions: ${info.width}x${info.height}`);
    console.log(`  Reduction: ${reduction}%`);
    console.log(`  Output path: ${outputPath}`);
  } catch (error) {
    console.error('Error converting image:', error);
    process.exit(1);
  }
}

convertToWebP();
