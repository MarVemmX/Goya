const sharp = require('sharp');

async function fixTransparency() {
  const image = sharp('public/images/goya-bottle-pouring.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  
  // Flood-fill from top-left (0,0), bottom-left (0, height-1), bottom-right (width-1, height-1), top-right (width-1, 0)
  // Cleanly identify connected background
  const visited = new Uint8Array(width * height);
  const queue = [];
  
  // Seed all border pixels that are background (light grey)
  for (let x = 0; x < width; x++) {
    for (let y of [0, height - 1]) {
      const idx = y * width + x;
      const r = data[idx * 3];
      const g = data[idx * 3 + 1];
      const b = data[idx * 3 + 2];
      const diff = Math.max(r, g, b) - Math.min(r, g, b);
      if ((r + g + b) / 3 > 215 && diff < 20) {
        visited[idx] = 1;
        queue.push(idx);
      }
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x of [0, width - 1]) {
      const idx = y * width + x;
      if (!visited[idx]) {
        const r = data[idx * 3];
        const g = data[idx * 3 + 1];
        const b = data[idx * 3 + 2];
        const diff = Math.max(r, g, b) - Math.min(r, g, b);
        if ((r + g + b) / 3 > 215 && diff < 20) {
          visited[idx] = 1;
          queue.push(idx);
        }
      }
    }
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
      if (n !== -1 && !visited[n]) {
        const r = data[n * 3];
        const g = data[n * 3 + 1];
        const b = data[n * 3 + 2];
        const diff = Math.max(r, g, b) - Math.min(r, g, b);
        const avg = (r + g + b) / 3;
        
        // Background condition: neutral light color
        if (avg > 210 && diff < 20) {
          visited[n] = 1;
          queue.push(n);
        }
      }
    }
  }
  
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    
    if (visited[i]) {
      const avg = (r + g + b) / 3;
      if (avg > 236) {
        rgba[i * 4 + 3] = 0;
      } else {
        const a = Math.max(0, Math.min(255, Math.round((236 - avg) / 26 * 255)));
        rgba[i * 4 + 3] = a;
      }
    } else {
      rgba[i * 4 + 3] = 255;
    }
  }
  
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .trim()
    .toFile('public/images/goya-bottle-pouring-perfect.png');
    
  console.log("Clean transparency generated successfully!");
}

fixTransparency().catch(console.error);
