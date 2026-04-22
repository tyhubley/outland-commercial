import Link from 'next/link';
import Image from 'next/image';
import { FEATURED_REVIEWS } from '@/data/reviews';
import { SITE } from '@/data/site';

export function ReviewsStrip() {
  return (
    <section className="section-y bg-surface-alt">
      <div className="container-x">
        <div className="text-center">
          <p className="chip">Client Testimonials</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink tracking-tight">See why we&apos;re recommended</h2>
          <p className="mt-3 text-ink-muted">Insights straight from our customers</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURED_REVIEWS.map((r, i) => (
            <article key={i} className="rounded-xl bg-white p-7 shadow-card ring-1 ring-ink/5 text-left">
              <div className="text-yellow-500 text-lg tracking-wider">★★★★★</div>
              {i === 0 && <div className="mt-2 text-base font-semibold text-ink">Great people</div>}
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{r.text}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                  {r.name.charAt(0)}
                </div>
                <div className="text-sm font-semibold text-ink uppercase tracking-wide">{r.name}</div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/reviews" className="btn btn-primary">See all reviews</Link>
          <a href={SITE.googleWriteReviewUrl} target="_blank" rel="noreferrer" className="btn btn-white">
            <Image src="/google-g-logo.svg" alt="" width={16} height={16} /> Leave us a review
          </a>
        </div>
      </div>
    </section>
  );
}
