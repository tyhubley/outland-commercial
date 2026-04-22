// Parses scraped area text files into structured area content data.
const fs = require('fs');
const path = require('path');

const TEXT_DIR = path.resolve(__dirname, 'out/text');
const JSON_DIR = path.resolve(__dirname, 'out/json');

const SERVICE_CARD_TITLES = new Set([
  'Landscape Maintenance', 'Landscape Enhancements', 'Snow Removal',
  'Sports Field Maintenance', 'Fertilization Services', 'Tree Care Services',
  'Patio Installation and Concrete',
]);

const SERVICE_CARD_BLURBS = new Set([
  'Reliable upkeep ensuring your landscape remains pristine and beautiful.',
  'Transform ordinary yards into stunning outdoor masterpieces with ease.',
  'Efficiently clearing your property for safe, uninterrupted winter access.',
  'Elevate field performance with meticulous care and attention to detail.',
  'Nourish your lawn for vibrant growth and lasting beauty.',
  'Nurture and protect your trees with expert care and maintenance.',
  'Transform your outdoor area with custom-designed, durable patios.',
]);

// Return a cleaned array of trimmed lines, removing header/nav chrome repeated on every page.
function cleanLines(raw) {
  const lines = raw.split('\n').map(l => l.trim());
  // find end of nav boilerplate: first "Landscaping" or "Services" headline on the page
  // pattern: drop first 16 lines (top nav) always
  const body = lines.slice(16);
  // Remove trailing footer starting from "See why we're recommended"
  const reviewsIdx = body.findIndex(l => l === "See why we're recommended");
  return reviewsIdx >= 0 ? body.slice(0, reviewsIdx) : body;
}

function parseArea(slug, text) {
  const lines = cleanLines(text);
  // H1 = first non-empty line
  const nonEmpty = lines.filter(l => l.length > 0);
  const h1 = nonEmpty[0];
  const sub = nonEmpty[1];

  // Find the "SERVICES" label, service cards run between "SERVICES" and first content heading after the 7th service card
  const servicesIdx = lines.findIndex(l => l === 'SERVICES');
  let serviceCardsHeading = lines[servicesIdx + 1]; // e.g., "Services We Offer in Big Bend, WI"
  // skip 7 service cards — each card is title + blank + blurb + blank + Learn more→
  // Find index where the 7 service cards end. After the 7th "Learn more→" comes the next section.
  let i = servicesIdx + 2;
  let cardsEnd = i;
  let learnMoreCount = 0;
  while (i < lines.length && learnMoreCount < 7) {
    if (lines[i] === 'Learn more\u2192' || lines[i] === 'Learn more→') {
      learnMoreCount++;
      cardsEnd = i + 1;
    }
    i++;
  }

  // Body = everything after the service cards
  const bodyLines = lines.slice(cardsEnd).map(l => l);

  // Group into sections: heading lines (short, no period) vs body/bullet lines
  // Heuristic: a line is a heading if short (<90 chars), doesn't end with period/exclamation/?,
  // and the next non-empty line is body text. But the first heading under the services can also look different.
  // For our case, we will just render body as alternating heading/paragraph based on blank-line separation.
  // Build blocks — each block is the lines between blank lines.
  const blocks = [];
  let buf = [];
  for (const l of bodyLines) {
    if (l === '') {
      if (buf.length) { blocks.push(buf); buf = []; }
    } else {
      buf.push(l);
    }
  }
  if (buf.length) blocks.push(buf);

  // A line is "sentence-ending" if it ends with . ! ? :
  const endsSentence = l => /[.!?:]$/.test(l);
  const isHeadingLine = l => l.length < 110 && !endsSentence(l);

  // Further-split each block: a block may contain multiple adjacent items (headings or bullets)
  // where heading lines sit between bullet-like lines without blank-line separation.
  const content = [];
  for (const block of blocks) {
    // Within a block, walk line-by-line and split into runs:
    //   - heading run: single heading line (no period)
    //   - bullet run: consecutive sentence-ending lines
    //   - paragraph run: a single longer line
    let i = 0;
    let pendingBullets = [];
    const flushBullets = () => {
      if (pendingBullets.length === 1) {
        content.push({ type: 'p', text: pendingBullets[0] });
      } else if (pendingBullets.length > 1) {
        content.push({ type: 'bullets', items: pendingBullets });
      }
      pendingBullets = [];
    };
    while (i < block.length) {
      const line = block[i];
      if (isHeadingLine(line)) {
        flushBullets();
        content.push({ type: 'heading', text: line });
      } else {
        pendingBullets.push(line);
      }
      i++;
    }
    flushBullets();
  }

  return {
    slug,
    h1,
    sub,
    servicesHeading: serviceCardsHeading,
    content,
  };
}

const areas = {};
const files = fs.readdirSync(TEXT_DIR).filter(f => f.startsWith('service-areas--'));
for (const f of files) {
  const slug = f.replace('service-areas--', '').replace('.txt', '');
  const text = fs.readFileSync(path.join(TEXT_DIR, f), 'utf8');
  const json = JSON.parse(fs.readFileSync(path.join(JSON_DIR, f.replace('.txt', '.json')), 'utf8'));
  const parsed = parseArea(slug, text);
  // pull hero image from json
  const hero = (json.images || []).find(i => (i.alt || '').toLowerCase().includes('background')) ||
               (json.images || []).find(i => i.src && i.src.includes('image_67e'));
  parsed.heroImage = hero ? hero.src.replace(/^.*url=/, '').split('&')[0].replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%2C/g, ',').replace(/%3D/g, '=') : null;
  // Cleanup: convert /_next/image proxied to direct ik.imagekit.io
  if (parsed.heroImage) {
    try {
      const u = new URL(json.images.find(i => i.src.includes('image_67e') || (i.alt||'').toLowerCase().includes('background'))?.src);
      const raw = u.searchParams.get('url');
      if (raw) parsed.heroImage = decodeURIComponent(raw);
    } catch {}
  }
  parsed.metaTitle = json.title;
  parsed.metaDescription = json.description;
  areas[slug] = parsed;
}

fs.writeFileSync(path.resolve(__dirname, 'out/areas-parsed.json'), JSON.stringify(areas, null, 2));
console.log('Wrote', Object.keys(areas).length, 'areas');
