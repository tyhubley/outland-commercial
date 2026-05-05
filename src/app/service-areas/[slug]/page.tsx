import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SERVICES, SERVICE_AREAS, SITE } from '@/data/site';
import { ServiceIcon } from '@/components/ServiceIcons';
import { Cta } from '@/components/Cta';
import { ReviewsStrip } from '@/components/ReviewsStrip';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { serviceAreaLocalBusinessSchema, breadcrumbSchema, SITE_URL } from '@/lib/seo';
import areasData from '@/data/areas-content.json';

type AreaBlock = { type: 'heading' | 'p' | 'ul'; text?: string; items?: string[] };
type AreaContent = {
  h1: string;
  sub: string | null;
  heroSrc: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  servicesHeading: string | null;
  body: AreaBlock[];
  ctaHeading: string | null;
  ctaBody: string | null;
};

const AREAS = areasData as Record<string, AreaContent>;

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_AREAS.map(a => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = AREAS[params.slug];
  if (!a) return {};
  const meta = SERVICE_AREAS.find(x => x.slug === params.slug);
  const cityName = meta?.title.replace(/,\s*WI$/, '') ?? a.h1;
  const url = `${SITE_URL}/service-areas/${params.slug}`;
  // Title with city + service-blanket + star rating to lift CTR.
  const title = `${cityName} Landscaping & Snow Removal · OUTLAND · 5★ 79 Reviews`;
  const description = a.metaDescription || `Top-rated landscaping, lawn care, and snow removal in ${cityName}, WI. 79 five-star Google reviews · 10+ years local. Free estimate today.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: a.heroSrc ? [{ url: a.heroSrc, width: 1600, height: 900, alt: a.h1 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: a.heroSrc ? [a.heroSrc] : undefined,
    },
  };
}

export default function AreaPage({ params }: { params: { slug: string } }) {
  const a = AREAS[params.slug];
  if (!a) notFound();
  const meta = SERVICE_AREAS.find(x => x.slug === params.slug);
  const cityName = meta?.title || a.h1;
  const hero = a.heroSrc || '/images/image_67c9dd40432c4764167caac0.jpg';

  const crumbs = [
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/sitemap' },
    { name: cityName, url: `/service-areas/${params.slug}` },
  ];

  const schemas = [
    serviceAreaLocalBusinessSchema({ cityName, citySlug: params.slug, heroImage: hero, description: a.metaDescription }),
    breadcrumbSchema(crumbs),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <Hero h1={a.h1} sub={a.sub} imageSrc={hero} showBadge={false} />

      {/* Quick contact */}
      <section className="bg-white border-b border-border">
        <div className="container-x py-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-surface-alt p-6">
            <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Phone Number</div>
            <a href={`tel:${SITE.phoneRaw}`} className="mt-2 block text-2xl font-bold text-ink hover:text-primary">{SITE.phone}</a>
          </div>
          <div className="rounded-xl bg-surface-alt p-6">
            <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Request a free estimate</div>
            <Link href="/contact-us" className="mt-2 block text-2xl font-bold text-ink hover:text-primary">Send us a message</Link>
          </div>
        </div>
      </section>

      {/* Services cards */}
      <section className="section-y bg-white">
        <div className="container-x">
          <p className="chip">Services</p>
          {a.servicesHeading && <h2 className="mt-4 text-3xl md:text-4xl font-bold text-ink tracking-tight">{a.servicesHeading}</h2>}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group rounded-xl border border-border bg-white p-7 shadow-card hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-0.5 transition">
                <ServiceIcon slug={s.slug} />
                <h3 className="mt-4 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] text-ink-muted">{s.short}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-y bg-surface-alt">
        <div className="container-x max-w-4xl prose-copy">
          {a.body.map((block, i) => {
            if (block.type === 'heading') return <h2 key={i} className="text-2xl md:text-3xl font-bold text-ink mt-10 tracking-tight">{block.text}</h2>;
            if (block.type === 'p') return <p key={i}>{block.text}</p>;
            if (block.type === 'ul' && block.items) return (
              <ul key={i}>
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
            return null;
          })}
        </div>
      </section>

      {/* Nearby areas */}
      <section className="section-y bg-white">
        <div className="container-x">
          <p className="chip">Also Serving</p>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-ink tracking-tight">Nearby Waukesha County Communities</h2>
          <ul className="mt-8 flex flex-wrap gap-2">
            {SERVICE_AREAS.filter(x => x.slug !== params.slug).map(x => (
              <li key={x.slug}>
                <Link href={`/service-areas/${x.slug}`} className="inline-flex items-center rounded-full border border-border bg-white px-4 py-1.5 text-sm text-ink hover:border-primary hover:text-primary transition">
                  {x.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ReviewsStrip />
      <Cta heading={a.ctaHeading || 'Transform Your Outdoors Today!'} body={a.ctaBody || 'Elevate your property with our expert care and seamless service. Contact OUTLAND Commercial now!'} />
    </>
  );
}
