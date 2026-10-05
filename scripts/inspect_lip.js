const sharp = require('sharp');

async function inspectSpoutLip() {
  const image = sharp('public/images/goya-bottle-centered.png');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  
  // Center is x=786.
  // Let's examine rows near the bottom (y=840 to y=950) around x=770 to x=800
  for (let y = 840; y < height; y += 10) {
    let nonZero = 0;
    for (let x = 750; x < 820; x++) {
      if (data[(y * width + x) * 4 + 3] > 50) nonZero++;
    }
    console.log(`y=${y}: ${nonZero} opaque pixels around center x=750..820`);
  }
}
inspectSpoutLip();
