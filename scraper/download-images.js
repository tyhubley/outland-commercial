// Download all ImageKit images used by the rebuild and save to public/images/.
// Uses puppeteer to bypass any bot checks and get raw bytes.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const IMAGES = `
image_67c9dd30432c4764167c7709.webp
image_67c9dd40432c4764167caac0.jpeg
image_67c9dd41432c4764167cacc2.jpeg
image_67c9dd41432c4764167cacf2.jpeg
image_67c9dd41432c4764167cacfa.jpeg
image_67c9dd41432c4764167caf64.jpeg
image_67c9dd42432c4764167cb164.jpeg
image_67c9dd43432c4764167cb330.jpeg
image_67c9de5e432c4764168090a8.webp
image_67c9de6a432c47641680d703.webp
image_67c9e155432c4764168e05a4.webp
image_67c9e179432c4764168ead60.webp
image_67eea981432c4764160c4620.webp
image_67eea999432c4764160c9b89.webp
image_67eea9a6432c4764160ce6cc.webp
image_67eea9c2432c4764160d82e2.webp
image_67eea9e1432c4764160e3b5e.webp
image_67eeaa00432c4764160ed431.webp
image_67eeaa0c432c4764160f2015.webp
image_67eeaa3e432c4764161013ac.webp
image_67eeaa4c432c4764161077f3.webp
image_67eeaa57432c47641610b985.webp
image_67eeaa6c432c476416112ae1.webp
image_67eeaa85432c47641611a50d.webp
image_67eeaa94432c47641611eff4.webp
`.trim().split('\n');

const OUT = path.resolve(__dirname, '../public/images');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36');
  // warm up cookies / imagekit origin
  await page.goto('https://ik.imagekit.io/4wu305uo4/', { waitUntil: 'domcontentloaded' });

  for (const name of IMAGES) {
    // Pull the source at 1920 width, which is more than enough for hero usage.
    const url = `https://ik.imagekit.io/4wu305uo4/tr:w-1920,f-auto,q-85/${name}`;
    const bytes = await page.evaluate(async u => {
      const r = await fetch(u);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const ct = r.headers.get('content-type') || '';
      const buf = await r.arrayBuffer();
      return { ct, data: Array.from(new Uint8Array(buf)) };
    }, url);
    // decide extension from content-type
    let ext = '.webp';
    if (bytes.ct.includes('jpeg') || bytes.ct.includes('jpg')) ext = '.jpg';
    else if (bytes.ct.includes('png')) ext = '.png';
    else if (bytes.ct.includes('webp')) ext = '.webp';
    // preserve original base name but use actual extension
    const base = name.replace(/\.(webp|jpeg|jpg|png)$/, '');
    const out = path.join(OUT, base + ext);
    fs.writeFileSync(out, Buffer.from(bytes.data));
    console.log('Saved', path.basename(out), bytes.data.length, 'bytes');
  }
  await browser.close();
})();
