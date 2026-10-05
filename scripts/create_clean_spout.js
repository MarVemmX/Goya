const sharp = require('sharp');

async function createCleanSpoutBottle() {
  const image = sharp('public/images/goya-bottle-centered.png');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  
  // Clear any pixels below y = 875
  const newHeight = 878;
  const newRgba = Buffer.alloc(width * newHeight * 4);
  
  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const destIdx = srcIdx;
      newRgba[destIdx] = data[srcIdx];
      newRgba[destIdx + 1] = data[srcIdx + 1];
      newRgba[destIdx + 2] = data[srcIdx + 2];
      newRgba[destIdx + 3] = data[srcIdx + 3];
    }
  }
  
  await sharp(newRgba, { raw: { width, height: newHeight, channels: 4 } })
    .png()
    .toFile('public/images/goya-bottle-clean-spout.png');
    
  console.log("Successfully created goya-bottle-clean-spout.png (width=1572, height=878, center=786)!");
}

createCleanSpoutBottle().catch(console.error);
