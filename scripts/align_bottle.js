const sharp = require('sharp');

async function alignBottle() {
  // Let's create an angled version and a straight-down pouring version
  // In the original, the bottle axis is roughly at 135 degrees (from top-right 45 deg down to bottom-left).
  // If we rotate it by 45 degrees clockwise:
  // The axis will become vertical, pointing straight down!
  await sharp('public/images/goya-bottle-pouring.png')
    .rotate(45, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .trim()
    .toFile('public/images/goya-bottle-pouring-down.png');
    
  // Also trim the tilted version so there is minimal wasted transparent padding
  await sharp('public/images/goya-bottle-pouring.png')
    .trim()
    .toFile('public/images/goya-bottle-pouring-tilted.png');
    
  console.log("Successfully created aligned bottle assets!");
}

alignBottle().catch(console.error);
