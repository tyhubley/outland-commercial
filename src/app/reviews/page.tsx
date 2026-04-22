import type { Metadata } from 'next';
import { SITE } from '@/data/site';
import { ALL_REVIEWS } from '@/data/reviews';
import { Cta } from '@/components/Cta';
import { HeroSwoosh } from '@/components/HeroSwoosh';
import { JsonLd } from '@/components/JsonLd';
import { reviewsAggregateSchema, breadcrumbSchema, SITE_URL } from '@/lib/seo';

const URL = `${SITE_URL}/reviews`;
export const metadata: Metadata = {
  title: 'Read our Reviews | OUTLAND Commercial',
  description: 'Discover what customers are saying about OUTLAND Commercial! Explore real reviews and testimonials to see why our clients trust us for their needs.',
  alternates: { canonical: URL },
  openGraph: { type: 'website', url: URL, title: 'Customer Reviews | OUTLAND Commercial', description: `${SITE.googleReviewCount} five-star Google reviews. Read real testimonials from satisfied customers across Waukesha County.` },
  twitter: { card: 'summary_large_image', title: 'Customer Reviews | OUTLAND Commercial' },
};

export default function ReviewsPage() {
  const schemas = [
    reviewsAggregateSchema(ALL_REVIEWS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Reviews', url: '/reviews' }]),
  ];
  return (
    <>
      <JsonLd data={schemas} />
      <section className="relative bg-ink text-white overflow-hidden isolate">
        <HeroSwoosh opacity={0.7} />
        <div className="container-x relative z-[2] pt-20 pb-24 text-center">
          <p className="chip !text-primary mx-auto">OUTLAND Commercial</p>
          <h1 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight">Customer Reviews</h1>
          <div className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-2 backdrop-blur">
            <span className="text-yellow-400 tracking-wider">★★★★★</span>
            <span className="text-sm font-medium">{SITE.googleReviewCount} five-star Google reviews</span>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {ALL_REVIEWS.map((r, i) => (
              <article key={i} className="break-inside-avoid mb-6 rounded-xl bg-surface-alt p-6 shadow-card">
                <div className="text-yellow-500 text-sm tracking-wider">★★★★★</div>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">{r.initial}</div>
                  <div className="text-sm font-semibold text-ink uppercase tracking-wide">{r.name}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Cta heading="Ready to experience the difference?" body="Join the growing list of satisfied customers in Waukesha County. Get your free estimate today." />
    </>
  );
}
