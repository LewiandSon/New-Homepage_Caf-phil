#!/usr/bin/env node
/**
 * Optimizes large MP4 videos to WebM format using FFmpeg.
 * Converts MP4 to WebM (VP9 codec) for better compression.
 */
import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../public/images/assets');

const VIDEOS = [
  {
    input: 'books-website-mit-hg.mp4',
    output: 'books-website-mit-hg.webm',
    crf: 30, // Quality: 0-63, lower = better quality (30 is good balance)
  },
  {
    input: 'events-diashow-website.mp4',
    output: 'events-diashow-website.webm',
    crf: 30,
  },
  {
    input: 'analog-cafe-giff.mp4',
    output: 'analog-cafe-giff.webm',
    crf: 32, // Slightly lower quality for smaller file since it's decorative
  },
];

function getFileSize(path) {
  if (!existsSync(path)) return 0;
  return statSync(path).size;
}

function formatSize(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + 'MB';
}

async function convertVideo(input, output, crf) {
  const inputPath = join(ASSETS_DIR, input);
  const outputPath = join(ASSETS_DIR, output);

  if (!existsSync(inputPath)) {
    console.log(`⏭️  Skip ${input} (not found)`);
    return { skipped: true };
  }

  const inputSize = getFileSize(inputPath);
  
  console.log(`\n🔄 Converting ${input} → ${output}...`);
  console.log(`   Input size: ${formatSize(inputSize)}`);

  try {
    // VP9 codec with good compression
    // -crf: quality (0-63, lower = better, 30 is good balance)
    // -b:v 0: use CRF mode (variable bitrate)
    // -c:a libopus: audio codec for WebM
    // -threads 0: use all available CPU cores
    execSync(
      `ffmpeg -i "${inputPath}" ` +
      `-c:v libvpx-vp9 -crf ${crf} -b:v 0 ` +
      `-c:a libopus -b:a 128k ` +
      `-threads 0 ` +
      `-y "${outputPath}"`,
      { stdio: 'inherit' }
    );

    const outputSize = getFileSize(outputPath);
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);
    
    console.log(`✅ ${input} → ${output}`);
    console.log(`   Output size: ${formatSize(outputSize)}`);
    console.log(`   Reduction: ${reduction}%`);
    
    return { output, inputSize, outputSize, reduction };
  } catch (e) {
    console.error(`❌ Error converting ${input}:`, e.message);
    return { error: e.message };
  }
}

async function main() {
  console.log('Optimizing videos with FFmpeg...\n');
  
  for (const video of VIDEOS) {
    await convertVideo(video.input, video.output, video.crf);
  }
  
  console.log('\n✅ Done!');
  console.log('\nNext steps:');
  console.log('1. Update code to use .webm files');
  console.log('2. Add <source> tag with .mp4 as fallback for older browsers');
}

main();
