/**
 * OUTLAND Commercial was sold. Phone + email removed so nobody tries
 * to hire a business that no longer takes work. Site stands on its
 * own as a visual portfolio — no external outbound links.
 */
export const SITE = {
  name: 'OUTLAND Commercial',
  phone: '',
  phoneRaw: '',
  email: '',
  hours: '7:00 AM – 5:00 PM',
  hoursDays: 'Mon - Sun',
  googleReviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJ27KkieWlBYgR9a5jFhlbmHw',
  googleWriteReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ27KkieWlBYgR9a5jFhlbmHw',
  googleReviewCount: 79,
  isPortfolio: true,
  portfolioNote: 'This business has been sold.',
};

export const SERVICES = [
  { slug: 'landscape-maintenance', title: 'Landscape Maintenance', short: 'Reliable upkeep ensuring your landscape remains pristine and beautiful.' },
  { slug: 'landscape-installations', title: 'Landscape Installations', short: 'Mulch, plantings, hardscape, and full property installs that transform any yard.' },
  { slug: 'snow-removal', title: 'Snow Removal', short: 'Efficiently clearing your property for safe, uninterrupted winter access.' },
  { slug: 'sports-field-maintenance', title: 'Sports Field Maintenance', short: 'Elevate field performance with meticulous care and attention to detail.' },
  { slug: 'fertilization-services', title: 'Lawn Fertilization', short: 'Seasonal fertilizer programs for thick, green lawns — and weed control that actually works.' },
  { slug: 'shrub-trimming', title: 'Shrub Trimming & Pruning', short: 'Clean, professional shrub trimming and ornamental pruning that brings out every shape.' },
  { slug: 'tree-care-services', title: 'Tree Care Services', short: 'Nurture and protect your trees with expert care and maintenance.' },
  { slug: 'patio-installation-and-concrete', title: 'Patio Installation and Concrete', short: 'Transform your outdoor area with custom-designed, durable patios.' },
] as const;

export const SERVICE_AREAS = [
  { slug: 'waukesha-wi', title: 'Waukesha, WI' },
  { slug: 'genesee-wi', title: 'Genesee, WI' },
  { slug: 'saylesville-wi', title: 'Saylesville, WI' },
  { slug: 'dousman-wi', title: 'Dousman, WI' },
  { slug: 'wales-wi', title: 'Wales, WI' },
  { slug: 'big-bend-wi', title: 'Big Bend, WI' },
  { slug: 'muskego-wi', title: 'Muskego, WI' },
  { slug: 'sussex-wi', title: 'Sussex, WI' },
  { slug: 'milwaukee-wi', title: 'Milwaukee, WI' },
  { slug: 'brookfield-wi', title: 'Brookfield, WI' },
  { slug: 'franklin-wi', title: 'Franklin, WI' },
  { slug: 'new-berlin-wi', title: 'New Berlin, WI' },
  { slug: 'nashotah-wi', title: 'Nashotah, WI' },
  { slug: 'wauwatosa-wi', title: 'Wauwatosa, WI' },
  { slug: 'oconomowoc-wi', title: 'Oconomowoc, WI' },
  { slug: 'delafield-wi', title: 'Delafield, WI' },
] as const;

export type ServiceSlug = typeof SERVICES[number]['slug'];
export type AreaSlug = typeof SERVICE_AREAS[number]['slug'];
