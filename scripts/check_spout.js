const sharp = require('sharp');

async function checkSpout() {
  const image = sharp('public/images/goya-bottle-pouring.png');
  const metadata = await image.metadata();
  console.log("Width:", metadata.width, "Height:", metadata.height);

  // Let's create an aligned version:
  // If we rotate or position the bottle so the spout points directly down at the bottom center,
  // or crop it cleanly so the spout is at the bottom center:
  // Spout tip is currently around x=240, y=915.
  // The bottle body extends to the top-right.
  // If we rotate the image by ~42 degrees counter-clockwise or clockwise, 
  // the bottle will pour directly straight down!
}
checkSpout();
