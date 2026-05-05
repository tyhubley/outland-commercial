export const SITE = {
  name: 'OUTLAND Commercial',
  phone: '(262) 899-2035',
  phoneRaw: '2628992035',
  email: 'hello@outlandmanagement.com',
  hours: '7:00 AM – 5:00 PM',
  hoursDays: 'Mon - Sun',
  googleReviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJ27KkieWlBYgR9a5jFhlbmHw',
  googleWriteReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ27KkieWlBYgR9a5jFhlbmHw',
  googleReviewCount: 79,
};

export const SERVICES = [
  { slug: 'landscape-maintenance', title: 'Landscape Maintenance', short: 'Reliable upkeep ensuring your landscape remains pristine and beautiful.' },
  { slug: 'landscape-installations', title: 'Landscape Installations', short: 'Mulch, plantings, hardscape, and full property installs that transform any yard.' },
  { slug: 'snow-removal', title: 'Snow Removal', short: 'Efficiently clearing your property for safe, uninterrupted winter access.' },
  { slug: 'sports-field-maintenance', title: 'Sports Field Maintenance', short: 'Elevate field performance with meticulous care and attention to detail.' },
  { slug: 'fertilization-services', title: 'Fertilization Services', short: 'Nourish your lawn for vibrant growth and lasting beauty.' },
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
