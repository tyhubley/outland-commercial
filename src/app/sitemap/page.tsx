import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES, SERVICE_AREAS } from '@/data/site';

export const metadata: Metadata = {
  title: 'Sitemap | OUTLAND Commercial',
  description: 'Sitemap for OUTLAND Commercial - our general page, service pages, service area pages, and more.',
  alternates: { canonical: 'https://www.outlandmanagement.com/sitemap' },
};

const SECTIONS = [
  {
    heading: 'General',
    links: [
      { href: '/', label: 'Home' },
      { href: '/contact-us', label: 'Contact' },
      { href: '/about-us', label: 'About Us' },
      { href: '/reviews', label: 'Testimonials & Reviews' },
    ],
  },
  { heading: 'Service Areas', links: SERVICE_AREAS.map(a => ({ href: `/service-areas/${a.slug}`, label: a.title })) },
  { heading: 'Landscaping Services', links: SERVICES.map(s => ({ href: `/services/${s.slug}`, label: s.title })) },
];

export default function SitemapPage() {
  return (
    <section className="pt-20 pb-20 bg-white">
      <div className="container-x">
        <h1 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight">Sitemap</h1>
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {SECTIONS.map(s => (
            <div key={s.heading}>
              <p className="chip">{s.heading}</p>
              <ul className="mt-4 space-y-2 text-[15px]">
                {s.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink hover:text-primary">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
