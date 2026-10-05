const sharp = require('sharp');

async function cleanAndMeasure() {
  const image = sharp('public/images/goya-bottle-pouring.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  
  // The bottle is roughly from x=180 to 1024, y=0 to 930
  // Outside this region is pure background.
  // Let's create a clean alpha mask where anything outside the bottle contour is 0.
  // The golden spout tip is at x=235, y=920.
  // Let's verify pixel colors around (235, 920):
  for (let dy = -10; dy <= 10; dy += 5) {
    for (let dx = -10; dx <= 10; dx += 5) {
      const px = 235 + dx;
      const py = 920 + dy;
      const idx = (py * width + px) * 3;
      console.log(`(${px}, ${py}): R=${data[idx]}, G=${data[idx+1]}, B=${data[idx+2]}`);
    }
  }
}
cleanAndMeasure();
