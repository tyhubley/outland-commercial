const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const URL = 'https://outlandmanagement.com/projects/spring-ready-lawn-transformation-at-good-times-day-camp';
const OUT = path.resolve(__dirname, 'out');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1500));

  const result = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    mainText: document.body.innerText,
    mainHTML: document.querySelector('main')?.outerHTML || document.body.outerHTML,
    images: Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, alt: i.alt })),
  }));
  fs.writeFileSync(path.join(OUT, 'text', 'project--good-times-day-camp.txt'), result.mainText);
  fs.writeFileSync(path.join(OUT, 'json', 'project--good-times-day-camp.json'), JSON.stringify(result, null, 2));
  await browser.close();
  console.log('Done.');
})();
