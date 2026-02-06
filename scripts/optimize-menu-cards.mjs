#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, statSync, renameSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

// Menu cards to optimize
const MENU_CARDS = [
  'Kaffee.svg',
  'fruhstueck.svg',
  'snacks.svg',
  'Wein.svg',
  'Limo.svg',
  'kaffee-en.svg',
  'fruhstueck-en.svg',
  'snacks-en.svg',
  'wein-en.svg',
  'limo-en.svg',
];

async function optimizeCard(card) {
  const inputPath = join(ASSETS_DIR, card);
  const tempPath = join(ASSETS_DIR, `${card}.tmp`);

  if (!existsSync(inputPath)) {
    console.log(`⏭️  Skip ${card} (not found)`);
    return;
  }

  const inputSize = (statSync(inputPath).size / 1024).toFixed(2);
  console.log(`\n🔄 Optimizing ${card} (${inputSize}KB)...`);

  try {
    // Run SVGO with multipass optimization
    execSync(
      `npx --yes svgo "${inputPath}" -o "${tempPath}" --multipass --pretty`,
      { stdio: 'inherit' }
    );

    const outputSize = (statSync(tempPath).size / 1024).toFixed(2);
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(0);
    
    // Replace original with optimized version
    renameSync(tempPath, inputPath);
    
    console.log(`✅ Done (${outputSize}KB, ${reduction}% reduction)`);
  } catch (error) {
    console.error(`❌ Error optimizing ${card}: ${error.message}`);
    // Clean up temp file if it exists
    if (existsSync(tempPath)) {
      try {
        renameSync(tempPath, inputPath);
      } catch {}
    }
  }
}

async function main() {
  console.log('Optimizing menu cards with SVGO...\n');
  for (const card of MENU_CARDS) {
    await optimizeCard(card);
  }
  console.log('\n✅ All menu cards optimized!');
}

main();
