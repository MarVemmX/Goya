const sharp = require('sharp');

async function centerSpout() {
  const image = sharp('public/images/goya-pouring-transparent.png');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  
  // Spout tip is at x=237, y=948
  const spoutX = 237;
  const spoutY = 948;
  
  // The bottle content goes from x=198 to x=1023 (825px wide)
  // and y=0 to y=948 (948px high)
  // Distance from spout to right edge: 1023 - 237 = 786px.
  // Distance from spout to left edge if symmetrical: 786px.
  // So a symmetrical canvas has width = 786 * 2 = 1572px.
  // In this canvas, the spout will be at x = 786 (exactly 50%!).
  // Height = 952px. In this canvas, the spout tip is at y = 948 (bottom!).
  
  const newWidth = 786 * 2; // 1572
  const newHeight = 952;
  const newRgba = Buffer.alloc(newWidth * newHeight * 4);
  
  // Offset to place the original image:
  // We want original x=spoutX to land at new x=786.
  // offsetX = 786 - spoutX = 786 - 237 = 549.
  const offsetX = 549;
  const offsetY = 0;
  
  for (let y = 0; y < height && y < newHeight; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const targetX = x + offsetX;
      const targetY = y + offsetY;
      
      if (targetX >= 0 && targetX < newWidth && targetY >= 0 && targetY < newHeight) {
        const destIdx = (targetY * newWidth + targetX) * 4;
        newRgba[destIdx] = data[srcIdx];
        newRgba[destIdx + 1] = data[srcIdx + 1];
        newRgba[destIdx + 2] = data[srcIdx + 2];
        newRgba[destIdx + 3] = data[srcIdx + 3];
      }
    }
  }
  
  await sharp(newRgba, { raw: { width: newWidth, height: newHeight, channels: 4 } })
    .png()
    .toFile('public/images/goya-bottle-centered.png');
    
  console.log("Created goya-bottle-centered.png: spout is at EXACT center 50% (x=786, width=1572) and bottom (y=948, height=952)");
}

centerSpout().catch(console.error);
