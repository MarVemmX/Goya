const ffmpegPath = require('ffmpeg-static');
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Using ffmpeg binary:', ffmpegPath);

const inputFile = path.resolve('hero video.mp4');
console.log('Input file:', inputFile, 'Exists:', fs.existsSync(inputFile));
if (fs.existsSync(inputFile)) {
  const stats = fs.statSync(inputFile);
  console.log('Original file size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');
}

// Inspect input file
const probe = spawnSync(ffmpegPath, ['-i', inputFile]);
console.log('--- Video Information ---');
console.log(probe.stderr.toString());

// Compress video for web:
// 1. Convert to H.264 (yuv420p for universal browser compatibility)
// 2. CRF 24 (visually indistinguishable quality, but high compression)
// 3. Scale down if necessary (e.g. 1080p max: -vf "scale='min(1920,iw)':-2")
// 4. Faststart (+faststart moves moov atom to beginning of file for instant web streaming)
// 5. -an (remove audio for background video, or compress audio to AAC 64k if audio exists)
// Let's create two versions or high-quality web MP4:
const outputFile = path.resolve('public/images/hero-video-compressed.mp4');

console.log('\nStarting high-efficiency web compression to:', outputFile);
const compressResult = spawnSync(ffmpegPath, [
  '-y',
  '-i', inputFile,
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '24',
  '-pix_fmt', 'yuv420p',
  '-vf', "scale='min(1920,iw)':-2",
  '-movflags', '+faststart',
  '-an',
  outputFile
], { stdio: 'inherit' });

if (fs.existsSync(outputFile)) {
  const outStats = fs.statSync(outputFile);
  console.log('\nCompression complete!');
  console.log('Compressed size:', (outStats.size / 1024 / 1024).toFixed(2), 'MB');
  console.log('Saved to: public/images/hero-video-compressed.mp4');
} else {
  console.error('Failed to create compressed video.');
}
