const sharp = require('sharp');

async function measureSpout() {
  const image = sharp('public/images/goya-bottle-pouring-clean.png');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  
  // Find the lowest non-transparent pixel (the droplet tip)
  let lowestY = 0;
  let lowestX = 0;
  
  // Also find the golden spout metal tip
  let nonZeroCount = 0;
  
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const alpha = data[idx + 3];
      if (alpha > 50) {
        if (y > lowestY) {
          lowestY = y;
          lowestX = x;
        }
      }
    }
    if (lowestY > 0) break; // found the lowest row
  }
  
  console.log(`Lowest pixel (droplet tip): x=${lowestX} (${(lowestX / width * 100).toFixed(2)}%), y=${lowestY} (${(lowestY / height * 100).toFixed(2)}%)`);
}

measureSpout();
