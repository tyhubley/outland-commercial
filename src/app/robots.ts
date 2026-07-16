import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/thank-you',
          '/*?utm_',
          '/*?fbclid=',
          '/*?gclid=',
          '/*?ref=',
        ],
      },
    ],
    sitemap: 'https://www.outlandmanagement.com/sitemap.xml',
  };
}
