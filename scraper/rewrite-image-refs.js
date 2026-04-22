// Rewrites every ImageKit URL to the local /images/<basename>.jpg path.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILES = [
  'src/app/page.tsx',
  'src/app/about-us/page.tsx',
  'src/data/services-content.ts',
  'src/data/areas-content.json',
];

const ikRegex = /https:\/\/ik\.imagekit\.io\/4wu305uo4\/(?:tr:[^/]+\/)?(image_[a-f0-9]+)\.(?:webp|jpeg|jpg)/g;

for (const rel of FILES) {
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, 'utf8');
  const next = src.replace(ikRegex, (_, basename) => `/images/${basename}.jpg`);
  if (next !== src) {
    fs.writeFileSync(abs, next);
    console.log('Rewrote', rel);
  } else {
    console.log('Unchanged', rel);
  }
}
