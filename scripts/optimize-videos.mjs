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

async function main() {
  console.log('Converting videos to WebM...\n');
  for (const v of VIDEOS) await convertVideo(v.input, v.output, v.crf);
  console.log('\n✅ All videos converted.');
}

main();
