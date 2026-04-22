// Scrapes outlandmanagement.com: saves innerText + HTML + image URLs per page
// Usage: node scrape.js

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE = 'https://outlandmanagement.com';

const SERVICES = [
  'landscape-maintenance',
  'landscape-enhancements',
  'snow-removal',
  'sports-field-maintenance',
  'fertilization-services',
  'tree-care-services',
  'patio-installation-and-concrete',
];

const AREAS = [
  'waukesha-wi','genesee-wi','saylesville-wi','dousman-wi','wales-wi','big-bend-wi',
  'muskego-wi','sussex-wi','milwaukee-wi','brookfield-wi','franklin-wi','new-berlin-wi',
  'nashotah-wi','wauwatosa-wi','oconomowoc-wi','delafield-wi',
];

const PAGES = [
  { slug: 'home', url: '/' },
  { slug: 'about-us', url: '/about-us' },
  { slug: 'contact-us', url: '/contact-us' },
  { slug: 'reviews', url: '/reviews' },
  { slug: 'projects', url: '/projects' },
  { slug: 'sitemap', url: '/sitemap' },
  ...SERVICES.map(s => ({ slug: `services--${s}`, url: `/services/${s}` })),
  ...AREAS.map(a => ({ slug: `service-areas--${a}`, url: `/service-areas/${a}` })),
];

const OUT = path.resolve(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(OUT, 'html'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'text'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'json'), { recursive: true });

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36');
  await page.setViewport({ width: 1440, height: 900 });

  const allImages = new Set();
  const allVideos = new Set();
  const allLinks = new Set();

  for (const p of PAGES) {
    const url = BASE + p.url;
    console.log('Fetching', url);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      await new Promise(r => setTimeout(r, 1500));

      // click any "show more" in FAQ by expanding all details
      await page.evaluate(() => {
        document.querySelectorAll('details').forEach(d => d.open = true);
      });

      const result = await page.evaluate(() => {
        const pick = el => el ? el.getAttribute('content') : null;
        return {
          title: document.title,
          description: pick(document.querySelector('meta[name="description"]')),
          ogTitle: pick(document.querySelector('meta[property="og:title"]')),
          ogDesc: pick(document.querySelector('meta[property="og:description"]')),
          ogImage: pick(document.querySelector('meta[property="og:image"]')),
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          h1: Array.from(document.querySelectorAll('h1')).map(n => n.innerText.trim()),
          h2: Array.from(document.querySelectorAll('h2')).map(n => n.innerText.trim()),
          h3: Array.from(document.querySelectorAll('h3')).map(n => n.innerText.trim()),
          images: Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight })),
          videos: Array.from(document.querySelectorAll('video source, video')).map(v => v.src || v.getAttribute('src')).filter(Boolean),
          links: Array.from(document.querySelectorAll('a')).map(a => ({ href: a.href, text: a.innerText.trim() })).filter(x => x.href),
          mainText: document.body.innerText,
          mainHTML: document.querySelector('main')?.outerHTML || document.body.outerHTML,
        };
      });

      fs.writeFileSync(path.join(OUT, 'html', p.slug + '.html'), result.mainHTML);
      fs.writeFileSync(path.join(OUT, 'text', p.slug + '.txt'), result.mainText);
      fs.writeFileSync(path.join(OUT, 'json', p.slug + '.json'), JSON.stringify(result, null, 2));

      result.images.forEach(i => i.src && allImages.add(i.src));
      result.videos.forEach(v => v && allVideos.add(v));
      result.links.forEach(l => l.href && allLinks.add(l.href));
    } catch (err) {
      console.error('Failed', url, err.message);
    }
  }

  fs.writeFileSync(path.join(OUT, 'all-images.json'), JSON.stringify([...allImages], null, 2));
  fs.writeFileSync(path.join(OUT, 'all-videos.json'), JSON.stringify([...allVideos], null, 2));
  fs.writeFileSync(path.join(OUT, 'all-links.json'), JSON.stringify([...allLinks], null, 2));

  await browser.close();
  console.log('Done.');
})();
