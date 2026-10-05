const sharp = require('sharp');

async function createPerfectBottle() {
  const image = sharp('public/images/goya-bottle-pouring.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  
  const rgba = Buffer.alloc(width * height * 4);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x);
      const r = data[idx * 3];
      const g = data[idx * 3 + 1];
      const b = data[idx * 3 + 2];
      
      rgba[idx * 4] = r;
      rgba[idx * 4 + 1] = g;
      rgba[idx * 4 + 2] = b;
      
      // The bottle is located in the upper-right down to the bottom-left at (235, 940).
      // Check if pixel is background:
      // Background in this image is very light neutral grey/white (r > 218, g > 218, b > 222, diff < 20)
      const diff = Math.max(r, g, b) - Math.min(r, g, b);
      const avg = (r + g + b) / 3;
      
      // Also note: bottom-left region (x < 185) or bottom-right below the bottle is purely background
      const isPureBgArea = (x < 180 && y > 600) || (x < 160) || (y > 950);
      
      if (isPureBgArea || (avg > 220 && diff < 18)) {
        if (avg > 238 || isPureBgArea) {
          rgba[idx * 4 + 3] = 0;
        } else {
          // Feather alpha edge
          const alpha = Math.max(0, Math.min(255, Math.round((238 - avg) / 18 * 255)));
          rgba[idx * 4 + 3] = alpha;
        }
      } else {
        rgba[idx * 4 + 3] = 255;
      }
    }
  }
  
  // Trim transparent borders
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .trim()
    .toFile('public/images/goya-bottle-pouring-perfect.png');
    
  const trimmedMeta = await sharp('public/images/goya-bottle-pouring-perfect.png').metadata();
  console.log("Trimmed dimensions:", trimmedMeta.width, "x", trimmedMeta.height);
}

createPerfectBottle().catch(console.error);
