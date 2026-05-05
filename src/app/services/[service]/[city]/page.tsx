import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SERVICES, SERVICE_AREAS, SITE } from '@/data/site';
import { SERVICE_CONTENT } from '@/data/services-content';
import { Cta } from '@/components/Cta';
import { ReviewsStrip } from '@/components/ReviewsStrip';
import { FaqList } from '@/components/FaqList';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema, SITE_URL } from '@/lib/seo';
import areasData from '@/data/areas-content.json';

type AreaBlock = { type: 'heading' | 'p' | 'ul'; text?: string; items?: string[] };
type AreaContent = { h1: string; sub: string | null; body: AreaBlock[]; servicesHeading: string | null };
const AREAS = areasData as Record<string, AreaContent>;

// Static params: one page per service + city combination → 7 × 16 = 112 pages.
// Only this nested [service]/[city] route — the top-level [service] route
// remains for the generic service page with no city context.
export const dynamicParams = false;

export function generateStaticParams() {
  const params: { service: string; city: string }[] = [];
  for (const s of SERVICES) {
    for (const c of SERVICE_AREAS) {
      params.push({ service: s.slug, city: c.slug });
    }
  }
  return params;
}

function city(slug: string) {
  const m = SERVICE_AREAS.find(a => a.slug === slug);
  if (!m) return null;
  return {
    slug: m.slug,
    full: m.title,                                          // e.g. "Waukesha, WI"
    name: m.title.replace(/,\s*WI$/, ''),                   // e.g. "Waukesha"
  };
}

export function generateMetadata({ params }: { params: { service: string; city: string } }): Metadata {
  const data = SERVICE_CONTENT[params.service];
  const c = city(params.city);
  if (!data || !c) return {};
  const url = `${SITE_URL}/services/${params.service}/${params.city}`;
  const title = `${data.title} in ${c.name}, WI | OUTLAND Commercial`;
  const description = `Professional ${data.title.toLowerCase()} in ${c.name}, WI from OUTLAND Commercial — 10+ years serving Waukesha County. Free estimates for homes and businesses.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [{ url: data.heroImage, width: 1600, height: 900, alt: `${data.title} in ${c.name}, WI` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [data.heroImage] },
  };
}

export default function ServiceCityPage({ params }: { params: { service: string; city: string } }) {
  const data = SERVICE_CONTENT[params.service];
  const c = city(params.city);
  if (!data || !c) notFound();

  const title = `${data.title} in ${c.name}, WI`;
  const url = `/services/${params.service}/${params.city}`;

  const crumbs = [
    { name: 'Home', url: '/' },
    { name: data.title, url: `/services/${data.slug}` },
    { name: c.full, url: `/service-areas/${params.city}` },
  ];
  const schemas = [
    serviceSchema({
      slug: `${data.slug}-${c.slug}`,
      title,
      description: `${data.title} services in ${c.name}, Waukesha County, WI by OUTLAND Commercial.`,
      image: data.heroImage,
    }),
    faqSchema(data.faqs.items),
    breadcrumbSchema(crumbs),
  ];

  // Related links — other services in this same city + this service in other cities
  const otherServices = SERVICES.filter(s => s.slug !== params.service);
  const otherCities = SERVICE_AREAS.filter(a => a.slug !== params.city);

  // Pull the first 1–2 unique paragraphs of body copy from the area data so
  // each /services/[X]/[city] page has genuinely city-specific intro text
  // (not just dynamic placeholders that look near-duplicate to Google).
  const area = AREAS[params.city];
  const cityIntroParagraphs: string[] = (area?.body ?? [])
    .filter(b => b.type === 'p' && typeof b.text === 'string' && b.text.length > 80)
    .slice(0, 2)
    .map(b => b.text!);

  return (
    <>
      <JsonLd data={schemas} />
      <Hero
        h1={`${data.title} in ${c.name}, WI`}
        sub={`Trusted ${data.title.toLowerCase()} for residential and commercial properties in ${c.name} — delivered by the OUTLAND Commercial team you already see across Waukesha County.`}
        imageSrc={data.heroImage}
        showBadge={false}
      />

      {/* Services pills */}
      <section className="bg-white border-b border-border">
        <div className="container-x py-4 flex flex-wrap gap-2">
          {SERVICES.map(s => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}/${params.city}`}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${s.slug === data.slug ? 'bg-primary text-white border-primary' : 'border-border text-ink-muted hover:border-primary hover:text-primary'}`}
            >
              {s.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Location-specific intro — pulls a real city paragraph from the area data
          so each combo page has genuinely unique local content instead of a
          templated placeholder. Helps avoid 'duplicate content' / 'crawled but
          not indexed' flags in Search Console. */}
      <section className="section-y bg-white">
        <div className="container-x max-w-4xl prose-copy">
          <p className="chip">Serving {c.name}, WI</p>
          <h2 className="!mt-4 text-3xl md:text-4xl font-bold text-ink tracking-tight">
            {data.title} homeowners and businesses in {c.name} rely on
          </h2>

          {/* Unique city paragraph(s) from areas-content.json */}
          {cityIntroParagraphs.map((text, i) => <p key={`city-${i}`}>{text}</p>)}

          <h3>Our {data.title.toLowerCase()} approach in {c.name}</h3>
          <p>{data.intro.body}</p>

          {data.sections.slice(0, 2).map((s, i) => (
            <div key={i}>
              {s.heading && <h3>{s.heading}</h3>}
              {s.body && <p>{s.body}</p>}
              {s.bullets && (
                <ul>
                  {s.bullets.map((b, j) => (
                    <li key={j}>
                      {b.label ? <><strong>{b.label}:</strong> {b.text}</> : b.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <h3>Why {c.name} properties choose OUTLAND Commercial</h3>
          <p>
            Our team lives and works in Waukesha County. We understand what {c.name}-area properties deal with year-round — from spring thaws that saturate clay soils to late-winter snow events that come through fast. We schedule service windows around {c.name} weather patterns, use equipment sized to the local lot styles, and stand behind every visit with our 5.0-star Google track record.
          </p>
          <p>
            Call <a href={`tel:${SITE.phoneRaw}`} className="font-semibold text-primary">{SITE.phone}</a> for a free on-site estimate, or send us the details via the contact form and we&apos;ll follow up within one business day.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="section-y bg-surface-alt">
        <div className="container-x">
          <div className="max-w-3xl">
            <p className="chip">Our Process</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink tracking-tight">
              {data.process.title.replace('Landscape Maintenance', `${data.title} in ${c.name}`).replace('for Landscape', `for ${data.title} in ${c.name}`)}
            </h2>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.process.steps.map((step, i) => (
              <li key={i} className="relative rounded-xl bg-white p-7 ring-1 ring-ink/5 shadow-card">
                <div className="absolute -top-4 left-6 h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-md">{i + 1}</div>
                <h3 className="mt-4 text-lg font-semibold text-ink">{step.heading}</h3>
                <p className="mt-2 text-[15px] text-ink-muted leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqList heading={`${data.title} FAQs — ${c.name}`} sub={data.faqs.sub} items={data.faqs.items} />

      {/* Related links for internal linking */}
      <section className="section-y bg-ink text-white">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <p className="chip !text-primary-soft">Other services in {c.name}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">Full coverage across {c.name}, WI</h2>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {otherServices.map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/${params.city}`} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 hover:border-primary/40">
                    <span className="font-medium">{s.title}</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" className="text-white/60"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="chip !text-primary-soft">{data.title} across Waukesha County</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{data.title} in nearby cities</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {otherCities.map(a => (
                <li key={a.slug}>
                  <Link href={`/services/${params.service}/${a.slug}`} className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm hover:border-primary/60 hover:bg-white/10">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ReviewsStrip />
      <Cta heading={`${data.title} in ${c.name} — Free Estimate`} body={`Schedule your free, on-site estimate with OUTLAND Commercial today. We'll follow up within one business day.`} />
    </>
  );
}
