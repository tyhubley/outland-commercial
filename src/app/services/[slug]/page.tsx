import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SERVICES } from '@/data/site';
import { SERVICE_CONTENT } from '@/data/services-content';
import { Cta } from '@/components/Cta';
import { ReviewsStrip } from '@/components/ReviewsStrip';
import { FaqList } from '@/components/FaqList';
import { Hero } from '@/components/Hero';

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data = SERVICE_CONTENT[params.slug];
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: { title: data.metaTitle, description: data.metaDescription, images: [data.heroImage] },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const data = SERVICE_CONTENT[params.slug];
  if (!data) notFound();

  const videoSrc = params.slug === 'snow-removal' ? '/videos/outland-0212.mov' : undefined;

  return (
    <>
      <Hero
        h1={data.heroH1}
        sub={data.heroSub}
        imageSrc={videoSrc ? undefined : data.heroImage}
        videoSrc={videoSrc}
        videoPoster={videoSrc ? data.heroImage : undefined}
        showBadge={false}
      />

      {/* Services pills */}
      <section className="bg-white border-b border-border sticky top-[60px] md:top-[116px] z-30">
        <div className="container-x py-4 flex flex-wrap gap-2">
          {SERVICES.map(s => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${s.slug === data.slug ? 'bg-primary text-white border-primary' : 'border-border text-ink-muted hover:border-primary hover:text-primary'}`}
            >
              {s.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="section-y bg-white">
        <div className="container-x max-w-4xl prose-copy">
          <p className="chip">Service Details</p>
          <h2 className="!mt-4 text-3xl md:text-4xl font-bold text-ink tracking-tight">{data.intro.heading}</h2>
          <p>{data.intro.body}</p>

          {data.sections.map((s, i) => (
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
        </div>
      </section>

      {/* Process */}
      <section className="section-y bg-surface-alt">
        <div className="container-x">
          <div className="max-w-3xl">
            <p className="chip">Our Process</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink tracking-tight">{data.process.title}</h2>
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

      <FaqList heading={data.faqs.heading} sub={data.faqs.sub} items={data.faqs.items} />

      <ReviewsStrip />
      <Cta heading="Transform Your Landscape Today" body="Act now for pristine, year-round beauty and reliability. Schedule your service with OUTLAND Commercial." />
    </>
  );
}
