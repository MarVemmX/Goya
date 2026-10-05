const sharp = require('sharp');

async function cleanBackground() {
  const image = sharp('public/images/goya-bottle-pouring.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  
  // Flood fill from (0, 0), (width-1, 0), (0, height-1), (width-1, height-1)
  // Any connected pixels that are light/neutral background become transparent.
  const visited = new Uint8Array(width * height);
  const queue = [0, width - 1, (height - 1) * width, (height - 1) * width + width - 1];
  
  for (const idx of queue) {
    visited[idx] = 1;
  }
  
  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    const x = idx % width;
    const y = Math.floor(idx / width);
    
    const r = data[idx * 3];
    const g = data[idx * 3 + 1];
    const b = data[idx * 3 + 2];
    
    // Check 4 neighbors
    const neighbors = [
      x > 0 ? idx - 1 : -1,
      x < width - 1 ? idx + 1 : -1,
      y > 0 ? idx - width : -1,
      y < height - 1 ? idx + width : -1
    ];
    
    for (const n of neighbors) {
      if (n !== -1 && !visited[n]) {
        const nr = data[n * 3];
        const ng = data[n * 3 + 1];
        const nb = data[n * 3 + 2];
        const diff = Math.max(nr, ng, nb) - Math.min(nr, ng, nb);
        const avg = (nr + ng + nb) / 3;
        
        // If it's a light background pixel (light grey/white with low color saturation)
        if (avg > 218 && diff < 22) {
          visited[n] = 1;
          queue.push(n);
        }
      }
    }
  }
  
  // Create RGBA output
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    
    if (visited[i]) {
      // Background pixel
      const avg = (r + g + b) / 3;
      if (avg > 240) {
        rgba[i * 4 + 3] = 0;
      } else {
        const alpha = Math.max(0, Math.min(255, Math.round((240 - avg) / 22 * 255)));
        rgba[i * 4 + 3] = alpha;
      }
    } else {
      rgba[i * 4 + 3] = 255;
    }
  }
  
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/images/goya-bottle-pouring-clean.png');
    
  console.log("Successfully created goya-bottle-pouring-clean.png!");
}

cleanBackground().catch(console.error);
