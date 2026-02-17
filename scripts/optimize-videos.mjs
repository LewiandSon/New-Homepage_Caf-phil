#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

const VIDEOS = [
  { input: 'books-website-mit-hg.mp4', output: 'books-website-mit-hg.webm', crf: 30 },
  { input: 'events-diashow-website.mp4', output: 'events-diashow-website.webm', crf: 30 },
  { input: 'analog-cafe-giff.mp4', output: 'analog-cafe-giff.webm', crf: 32 },
  { input: 'galerie-mieten.mp4', output: 'galerie-mieten.webm', crf: 30 },
];

// MP4 optimieren (H.264, für Safari-Fallback)
const MP4_OPTIMIZE = [
  { input: 'galerie-mieten.mp4', output: 'galerie-mieten-opt.mp4', crf: 28 },
];

// GIF mit Transparenz → WebM mit Alpha
const GIF_TO_WEBM = [
  { input: 'analog-cafe_v2.gif', output: 'analog-cafe_v2.webm', crf: 38 },
];

async function convertVideo(input, output, crf) {
  const inputPath = join(ASSETS_DIR, input);
  const outputPath = join(ASSETS_DIR, output);
  if (!existsSync(inputPath)) { console.log(`⏭️  Skip ${input}`); return; }
  const inputSize = (statSync(inputPath).size / 1024 / 1024).toFixed(2);
  console.log(`\n🔄 ${input} → ${output} (${inputSize}MB)...`);
  execSync(`ffmpeg -i "${inputPath}" -c:v libvpx-vp9 -crf ${crf} -b:v 0 -c:a libopus -b:a 128k -threads 0 -y "${outputPath}"`, { stdio: 'inherit' });
  const outputSize = (statSync(outputPath).size / 1024 / 1024).toFixed(2);
  const reduction = ((1 - outputSize / inputSize) * 100).toFixed(0);
  console.log(`✅ Done (${outputSize}MB, ${reduction}% reduction)`);
}

async function optimizeMp4(input, output, crf) {
  const inputPath = join(ASSETS_DIR, input);
  const outputPath = join(ASSETS_DIR, output);
  if (!existsSync(inputPath)) { console.log(`⏭️  Skip ${input}`); return; }
  const inputSize = (statSync(inputPath).size / 1024 / 1024).toFixed(2);
  console.log(`\n🔄 ${input} → ${output} (${inputSize}MB, H.264)...`);
  execSync(`ffmpeg -i "${inputPath}" -c:v libx264 -crf ${crf} -preset medium -c:a aac -b:a 128k -movflags +faststart -y "${outputPath}"`, { stdio: 'inherit' });
  const outputSize = (statSync(outputPath).size / 1024 / 1024).toFixed(2);
  const reduction = ((1 - outputSize / inputSize) * 100).toFixed(0);
  console.log(`✅ Done (${outputSize}MB, ${reduction}% reduction)`);
}

async function convertGifToWebm(input, output, crf) {
  const inputPath = join(ASSETS_DIR, input);
  const outputPath = join(ASSETS_DIR, output);
  if (!existsSync(inputPath)) { console.log(`⏭️  Skip ${input}`); return; }
  const inputSize = (statSync(inputPath).size / 1024).toFixed(0);
  console.log(`\n🔄 ${input} → ${output} (${inputSize}KB, mit Alpha)...`);
  execSync(`ffmpeg -i "${inputPath}" -c:v libvpx-vp9 -pix_fmt yuva420p -auto-alt-ref 0 -b:v 0 -crf ${crf} -y "${outputPath}"`, { stdio: 'inherit' });
  const outputSize = (statSync(outputPath).size / 1024).toFixed(0);
  const reduction = ((1 - outputSize / inputSize) * 100).toFixed(0);
  console.log(`✅ Done (${outputSize}KB, ${reduction}% reduction)`);
}

async function main() {
  console.log('Converting videos to WebM...\n');
  for (const v of VIDEOS) await convertVideo(v.input, v.output, v.crf);
  console.log('\n--- MP4 optimieren (Safari-Fallback) ---');
  for (const m of MP4_OPTIMIZE) await optimizeMp4(m.input, m.output, m.crf);
  console.log('\n--- GIF mit Transparenz → WebM mit Alpha ---');
  for (const g of GIF_TO_WEBM) await convertGifToWebm(g.input, g.output, g.crf);
  console.log('\n✅ All conversions done.');
}

main();
