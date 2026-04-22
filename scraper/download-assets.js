const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ASSETS = [
  'https://outlandmanagement.com/About5Accent.svg',
  'https://outlandmanagement.com/goog-logo.svg',
  'https://outlandmanagement.com/google-g-logo.svg',
  'https://outlandmanagement.com/fuzz.webp',
];

const OUT = path.resolve(__dirname, 'out/assets');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36');
  // Warm up: visit homepage so we pass the Vercel challenge and acquire cookies
  await page.goto('https://outlandmanagement.com/', { waitUntil: 'networkidle2' });

  for (const url of ASSETS) {
    const name = path.basename(new URL(url).pathname);
    const resp = await page.evaluate(async u => {
      const r = await fetch(u);
      const buf = await r.arrayBuffer();
      return Array.from(new Uint8Array(buf));
    }, url);
    fs.writeFileSync(path.join(OUT, name), Buffer.from(resp));
    console.log('Saved', name, resp.length, 'bytes');
  }
  await browser.close();
})();
