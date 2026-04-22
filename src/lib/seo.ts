import { SITE, SERVICES, SERVICE_AREAS } from '@/data/site';

export const SITE_URL = 'https://www.outlandmanagement.com';

export function absoluteUrl(path = ''): string {
  if (!path) return SITE_URL;
  if (path.startsWith('http')) return path;
  return SITE_URL + (path.startsWith('/') ? path : '/' + path);
}

// ---- JSON-LD builders ----

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SITE_URL + '#organization',
    name: SITE.name,
    legalName: 'OUTLAND Commercial',
    alternateName: ['Outland Landscaping', 'Hubley Landscaping'],
    url: SITE_URL,
    logo: absoluteUrl('/logo.webp'),
    image: absoluteUrl('/images/image_67c9dd40432c4764167caac0.jpg'),
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: '2020',
    founders: [{ '@type': 'Person', name: 'Ty Hubley' }],
    sameAs: [SITE.googleReviewsUrl],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      email: SITE.email,
      contactType: 'customer service',
      areaServed: 'US-WI',
      availableLanguage: ['English'],
    },
  } as const;
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_URL + '#website',
    url: SITE_URL,
    name: SITE.name,
    publisher: { '@id': SITE_URL + '#organization' },
    inLanguage: 'en-US',
  } as const;
}

export function localBusinessSchema(opts?: { cityFocus?: string }) {
  const areaServed = SERVICE_AREAS.map(a => {
    const city = a.title.replace(/,\s*WI$/, '');
    return {
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'AdministrativeArea', name: 'Waukesha County, WI' },
    };
  });
  const services = SERVICES.map(s => ({
    '@type': 'Service',
    name: s.title,
    description: s.short,
    provider: { '@id': SITE_URL + '#organization' },
    serviceType: s.title,
    url: absoluteUrl('/services/' + s.slug),
  }));
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': SITE_URL + '#localbusiness',
    name: SITE.name,
    url: SITE_URL,
    image: absoluteUrl('/images/image_67c9dd40432c4764167caac0.jpg'),
    logo: absoluteUrl('/logo.webp'),
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '$$',
    description: `OUTLAND Commercial provides premium landscaping, lawn care, and snow removal services across Waukesha County, WI${opts?.cityFocus ? ` with dedicated service in ${opts.cityFocus}` : ''}.`,
    areaServed,
    serviceType: SERVICES.map(s => s.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'OUTLAND Commercial Services',
      itemListElement: services.map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: s,
        url: s.url,
      })),
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '17:00',
      },
    ],
    geo: { '@type': 'GeoCoordinates', latitude: 43.0117, longitude: -88.2315 },
    sameAs: [SITE.googleReviewsUrl],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: SITE.googleReviewCount,
      bestRating: '5',
      worstRating: '5',
    },
  } as const;
}

export function serviceSchema(s: {
  slug: string;
  title: string;
  description: string;
  image?: string;
  areaLabel?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    serviceType: s.title,
    description: s.description,
    provider: { '@id': SITE_URL + '#organization' },
    areaServed: SERVICE_AREAS.map(a => ({ '@type': 'City', name: a.title.replace(/,\s*WI$/, '') })),
    url: absoluteUrl('/services/' + s.slug),
    image: s.image ? absoluteUrl(s.image) : undefined,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD', price: '0', description: 'Free estimate' },
    },
  } as const;
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(it => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  } as const;
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.url),
    })),
  } as const;
}

export function reviewsAggregateSchema(reviews: { name: string; text: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE_URL + '#localbusiness-reviews',
    name: SITE.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: SITE.googleReviewCount,
      bestRating: '5',
    },
    review: reviews.slice(0, 30).map(r => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: r.name },
      reviewBody: r.text,
    })),
  } as const;
}

export function serviceAreaLocalBusinessSchema(opts: { cityName: string; citySlug: string; heroImage?: string | null; description?: string | null }) {
  const city = opts.cityName.replace(/,\s*WI$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': absoluteUrl('/service-areas/' + opts.citySlug) + '#localbusiness',
    name: `${SITE.name} — ${city}, WI`,
    url: absoluteUrl('/service-areas/' + opts.citySlug),
    image: opts.heroImage ? absoluteUrl(opts.heroImage) : absoluteUrl('/images/image_67c9dd40432c4764167caac0.jpg'),
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '$$',
    description: opts.description || `Premium landscaping, lawn care, and snow removal services in ${city}, WI. Call OUTLAND Commercial for a free estimate.`,
    areaServed: { '@type': 'City', name: city, containedInPlace: { '@type': 'AdministrativeArea', name: 'Waukesha County, WI' } },
    serviceType: SERVICES.map(s => s.title),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '17:00',
      },
    ],
    sameAs: [SITE.googleReviewsUrl],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: SITE.googleReviewCount,
      bestRating: '5',
    },
  } as const;
}

// Helper to render a <script type="application/ld+json"> safely in JSX.
export function jsonLd<T>(data: T): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
