import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SERVICES, SERVICE_AREAS, SITE } from '@/data/site';
import { ServiceIcon } from '@/components/ServiceIcons';
import { Cta } from '@/components/Cta';
import { ReviewsStrip } from '@/components/ReviewsStrip';
import { Hero } from '@/components/Hero';
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
  return {
    title: a.metaTitle || undefined,
    description: a.metaDescription || undefined,
    openGraph: { title: a.metaTitle || undefined, description: a.metaDescription || undefined, images: a.heroSrc ? [a.heroSrc] : undefined },
  };
}

export default function AreaPage({ params }: { params: { slug: string } }) {
  const a = AREAS[params.slug];
  if (!a) notFound();
  const hero = a.heroSrc || '/images/image_67c9dd40432c4764167caac0.jpg';

  return (
    <>
      <Hero h1={a.h1} sub={a.sub} imageSrc={hero} showBadge={false} />

      {/* Quick contact */}
      <section className="bg-white border-b border-border">
        <div className="container-x py-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-surface-alt p-6">
            <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Phone Number</div>
            <a href={`tel:${SITE.phoneRaw}`} className="mt-2 block text-2xl font-bold text-ink hover:text-primary">{SITE.phone}</a>
          </div>
          <div className="rounded-xl bg-surface-alt p-6">
            <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Email us</div>
            <Link href="/contact-us" className="mt-2 block text-2xl font-bold text-ink hover:text-primary">Click here</Link>
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

      <ReviewsStrip />
      <Cta heading={a.ctaHeading || 'Transform Your Outdoors Today!'} body={a.ctaBody || 'Elevate your property with our expert care and seamless service. Contact OUTLAND Commercial now!'} />
    </>
  );
}
