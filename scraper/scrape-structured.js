// Re-visit each service-area page and extract structured content from DOM:
//   { h1, sub, heroImage, metaTitle, metaDescription, servicesHeading, blocks: [{type:'heading'|'p'|'ul', ...}] }
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, 'out');
const AREAS = [
  'waukesha-wi','genesee-wi','saylesville-wi','dousman-wi','wales-wi','big-bend-wi',
  'muskego-wi','sussex-wi','milwaukee-wi','brookfield-wi','franklin-wi','new-berlin-wi',
  'nashotah-wi','wauwatosa-wi','oconomowoc-wi','delafield-wi',
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
  await page.setViewport({ width: 1440, height: 900 });

  const results = {};
  for (const slug of AREAS) {
    const url = 'https://outlandmanagement.com/service-areas/' + slug;
    console.log('Parsing', slug);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(r => setTimeout(r, 1000));

    const data = await page.evaluate(() => {
      const pick = el => el ? el.getAttribute('content') : null;
      const h1 = document.querySelector('h1')?.innerText.trim();
      // find subheading — element right after h1
      let sub = null;
      const h1el = document.querySelector('h1');
      if (h1el) {
        let sib = h1el.parentElement;
        while (sib && sib.parentElement) {
          const candidates = sib.querySelectorAll('p, div, span');
          for (const c of candidates) {
            const t = c.innerText.trim();
            if (t && t.length > 30 && t !== h1 && !sub) sub = t;
            if (sub) break;
          }
          if (sub) break;
          sib = sib.parentElement;
        }
      }

      // hero image: look for img with alt containing Background or an img inside the hero section
      const imgs = Array.from(document.querySelectorAll('img'));
      let hero = imgs.find(i => (i.alt || '').toLowerCase().includes('background'));
      if (!hero) hero = imgs.find(i => (i.alt || '').toLowerCase().includes('hero'));
      if (!hero) hero = imgs[2] || imgs[1];
      let heroSrc = hero?.src || null;
      if (heroSrc) {
        // strip the next/image wrapper to direct ik.imagekit.io
        try {
          const u = new URL(heroSrc);
          const raw = u.searchParams.get('url');
          if (raw) heroSrc = decodeURIComponent(raw);
        } catch {}
      }

      // Body extraction: find the "SERVICES" label marker then take everything after the 7 service cards
      // We'll walk the DOM: after the 7th service card (a link with "Learn more"), collect headings/paragraphs/lists until we hit
      // a "See why we're recommended" text node.
      function walk(root, out) {
        for (const node of root.children) {
          const tag = node.tagName;
          if (tag === 'H1' || tag === 'H2' || tag === 'H3' || tag === 'H4') {
            const t = node.innerText.trim();
            if (t) out.push({ type: 'heading', text: t });
          } else if (tag === 'P') {
            const t = node.innerText.trim();
            if (t) out.push({ type: 'p', text: t });
          } else if (tag === 'UL' || tag === 'OL') {
            const items = Array.from(node.querySelectorAll(':scope > li')).map(li => li.innerText.trim()).filter(Boolean);
            if (items.length) out.push({ type: 'ul', items });
          } else {
            walk(node, out);
          }
        }
      }

      // collect all main content blocks
      const allBlocks = [];
      walk(document.querySelector('main') || document.body, allBlocks);
      // find "SERVICES" heading position and "See why we're recommended" position
      const servicesIdx = allBlocks.findIndex(b => b.type === 'heading' && /services we|comprehensive services|services we offer|services we provide|expert services/i.test(b.text));
      const reviewsIdx = allBlocks.findIndex(b => b.type === 'heading' && /See why we're recommended/i.test(b.text));
      // Remove nav/footer-duplicated stuff by keeping only blocks between the h1 heading and reviews.
      const h1Idx = allBlocks.findIndex(b => b.type === 'heading' && b.text === h1);
      // Identify the end of the service cards: last "Patio Installation and Concrete" service card before content
      const patioIdx = allBlocks.findIndex((b, i) => i > (servicesIdx >= 0 ? servicesIdx : h1Idx) && b.type === 'heading' && b.text === 'Patio Installation and Concrete');
      // content begins after the service-card blurb paragraph after patio heading. We'll skip the heading + following paragraph.
      let startIdx = patioIdx;
      if (startIdx >= 0) {
        // skip the heading and the next paragraph (card blurb)
        startIdx = patioIdx + 2;
      }
      const endIdx = reviewsIdx >= 0 ? reviewsIdx : allBlocks.length;
      const body = startIdx >= 0 ? allBlocks.slice(startIdx, endIdx) : [];

      // servicesHeading text (e.g., "Services We Offer in Big Bend, WI")
      const servicesHeading = servicesIdx >= 0 ? allBlocks[servicesIdx].text : null;

      // cta blurb: after body, "Transform Your Outdoor Spaces Today!" etc. We'll pull last heading + first paragraph after reviews
      let ctaHeading = null, ctaBody = null;
      const ctaIdx = allBlocks.findIndex((b, i) => i > reviewsIdx && b.type === 'heading' && /transform|elevate/i.test(b.text));
      if (ctaIdx >= 0) {
        ctaHeading = allBlocks[ctaIdx].text;
        const next = allBlocks[ctaIdx + 1];
        if (next && next.type === 'p') ctaBody = next.text;
      }

      return {
        h1,
        sub,
        heroSrc,
        metaTitle: document.title,
        metaDescription: pick(document.querySelector('meta[name="description"]')),
        servicesHeading,
        body,
        ctaHeading,
        ctaBody,
      };
    });

    results[slug] = data;
  }
  fs.writeFileSync(path.join(OUT, 'areas-structured.json'), JSON.stringify(results, null, 2));
  await browser.close();
  console.log('Wrote areas-structured.json');
})();
