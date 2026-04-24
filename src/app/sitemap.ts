import type { MetadataRoute } from 'next';
import { SERVICES, SERVICE_AREAS } from '@/data/site';

const BASE = 'https://www.outlandmanagement.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ['', '/about-us', '/contact-us', '/reviews', '/sitemap'];
  const items: MetadataRoute.Sitemap = staticPaths.map(p => ({
    url: BASE + p,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));

  // Service landing pages
  items.push(
    ...SERVICES.map(s => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  );

  // Service area landing pages
  items.push(
    ...SERVICE_AREAS.map(a => ({
      url: `${BASE}/service-areas/${a.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  );

  // Service × City combo pages (7 × 16 = 112 long-tail local pages)
  for (const s of SERVICES) {
    for (const c of SERVICE_AREAS) {
      items.push({
        url: `${BASE}/services/${s.slug}/${c.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65,
      });
    }
  }

  return items;
}
