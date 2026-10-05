const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processPouringBottle() {
  const inputPath = 'C:\\Users\\MarVemm\\.gemini\\antigravity-ide\\brain\\876ffa28-4c43-48b7-8d39-1914d68c802a\\goya_bottle_pour_1791220822019.jpg';
  
  // First, copy the raw high-res image
  fs.copyFileSync(inputPath, 'public/images/goya-bottle-pouring.jpg');
  console.log("Copied raw image to public/images/goya-bottle-pouring.jpg");

  // Create transparent PNG version
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  
  const width = info.width;
  const height = info.height;
  
  // Create RGBA buffer
  const rgbaBuffer = Buffer.alloc(width * height * 4);
  
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    
    // Background is near white/light grey (r > 230, g > 230, b > 235 and low saturation)
    const maxVal = Math.max(r, g, b);
    const minVal = Math.min(r, g, b);
    const diff = maxVal - minVal;
    
    rgbaBuffer[i * 4] = r;
    rgbaBuffer[i * 4 + 1] = g;
    rgbaBuffer[i * 4 + 2] = b;
    
    // Check if pixel is background (very light and neutral)
    if (r > 225 && g > 225 && b > 228 && diff < 16) {
      const lightness = (r + g + b) / 3;
      if (lightness > 244) {
        rgbaBuffer[i * 4 + 3] = 0; // Fully transparent
      } else {
        const alpha = Math.max(0, Math.min(255, Math.round((244 - lightness) / 19 * 255)));
        rgbaBuffer[i * 4 + 3] = alpha;
      }
    } else {
      rgbaBuffer[i * 4 + 3] = 255;
    }
  }
  
  await sharp(rgbaBuffer, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/images/goya-bottle-pouring.png');
    
  console.log("Successfully created transparent PNG: public/images/goya-bottle-pouring.png");
}

processPouringBottle().catch(console.error);
