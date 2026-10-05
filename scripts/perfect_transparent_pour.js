const sharp = require('sharp');

async function makeTrulyTransparent() {
  const image = sharp('public/images/goya-bottle-pouring.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  
  // Breadth-First-Search flood fill from all 4 borders
  const visited = new Uint8Array(width * height);
  const queue = [];
  
  // Helper to test if a pixel is background:
  // Background is neutral gray/white (diff between R, G, B is small, saturation is very low)
  function isBg(idx) {
    const r = data[idx * 3];
    const g = data[idx * 3 + 1];
    const b = data[idx * 3 + 2];
    const diff = Math.max(r, g, b) - Math.min(r, g, b);
    const avg = (r + g + b) / 3;
    // Background pixels are >= 195 brightness and very low color difference (< 18)
    return avg > 190 && diff < 16;
  }
  
  // Seed all border pixels
  for (let x = 0; x < width; x++) {
    const topIdx = x;
    const btmIdx = (height - 1) * width + x;
    if (isBg(topIdx) && !visited[topIdx]) { visited[topIdx] = 1; queue.push(topIdx); }
    if (isBg(btmIdx) && !visited[btmIdx]) { visited[btmIdx] = 1; queue.push(btmIdx); }
  }
  for (let y = 0; y < height; y++) {
    const lftIdx = y * width;
    const rgtIdx = y * width + (width - 1);
    if (isBg(lftIdx) && !visited[lftIdx]) { visited[lftIdx] = 1; queue.push(lftIdx); }
    if (isBg(rgtIdx) && !visited[rgtIdx]) { visited[rgtIdx] = 1; queue.push(rgtIdx); }
  }
  
  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    const x = idx % width;
    const y = Math.floor(idx / width);
    
    const neighbors = [
      x > 0 ? idx - 1 : -1,
      x < width - 1 ? idx + 1 : -1,
      y > 0 ? idx - width : -1,
      y < height - 1 ? idx + width : -1
    ];
    
    for (const n of neighbors) {
      if (n !== -1 && !visited[n] && isBg(n)) {
        visited[n] = 1;
        queue.push(n);
      }
    }
  }
  
  console.log(`Visited background pixels: ${queue.length} out of ${width * height} (${(queue.length / (width * height) * 100).toFixed(1)}%)`);
  
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    
    if (visited[i]) {
      // Visited connected background is completely transparent
      rgba[i * 4 + 3] = 0;
    } else {
      // Bottle pixel is fully opaque
      rgba[i * 4 + 3] = 255;
    }
  }
  
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/images/goya-pouring-transparent.png');
    
  console.log("Successfully created public/images/goya-pouring-transparent.png!");
}

makeTrulyTransparent().catch(console.error);
