import Link from 'next/link';
import Image from 'next/image';
import { SITE, SERVICES, SERVICE_AREAS } from '@/data/site';
import { Cta } from '@/components/Cta';
import { ReviewsStrip } from '@/components/ReviewsStrip';
import { ServiceIcon } from '@/components/ServiceIcons';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { localBusinessSchema } from '@/lib/seo';

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Hero
        h1="Transform Your Landscape with OUTLAND Commercial"
        sub="Expert Lawn and Snow Care Services Tailored to Your Property's Needs"
        videoSrc="/videos/outland-hero.mp4"
        videoPoster="/images/image_67c9dd40432c4764167caac0.jpg"
      />

      {/* Services */}
      <section className="section-y bg-white">
        <div className="container-x">
          <div className="text-center">
            <p className="chip mx-auto">Our Top Services</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink tracking-tight">Our Professional Services</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group relative overflow-hidden rounded-xl border border-border bg-white p-7 shadow-card transition hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-0.5">
                <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Services</div>
                <div className="mt-4"><ServiceIcon slug={s.slug} /></div>
                <h3 className="mt-4 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] text-ink-muted">{s.short}</p>
                <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View {s.title} details
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-y bg-surface-alt relative overflow-hidden">
        <div className="container-x grid gap-10 md:grid-cols-2 items-center relative">
          <div>
            <Image
              src="/images/image_67c9dd41432c4764167cacc2.jpg"
              alt="About OUTLAND Commercial"
              width={900}
              height={700}
              className="rounded-xl object-cover shadow-lg"
            />
          </div>
          <div>
            <p className="chip">About</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink tracking-tight">About OUTLAND Commercial</h2>
            <p className="mt-6 text-[17px] text-ink-muted leading-[1.65]">
              OUTLAND Commercial was born from passion and commitment, aiming to beautify Waukesha County one landscape at a time. With deep roots in the community and a focus on exceptional service, we transform outdoor spaces into functional, aesthetic havens. Guided by integrity, sustainability, and innovation, our team prioritizes client satisfaction and environmental stewardship. We stand out with our personalized approach and unfaltering dedication to quality. Trust OUTLAND Commercial to nurture and maintain your green spaces year-round.
            </p>
            <Link href="/about-us" className="btn btn-primary mt-8">About OUTLAND Commercial</Link>
          </div>
        </div>
      </section>

      <ReviewsStrip />

      {/* Seasonal offer */}
      <section className="section-y bg-white">
        <div className="container-x">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-ink tracking-tight">Exclusive Seasonal Offers from OUTLAND Commercial</h2>
          </div>
          <div className="mt-12 max-w-3xl mx-auto rounded-2xl bg-primary-soft p-10 text-center ring-1 ring-primary/10">
            <div className="inline-flex items-center justify-center rounded-full bg-primary text-white w-28 h-28 text-2xl font-extrabold shadow-lg">10% OFF</div>
            <h3 className="mt-6 text-2xl font-bold text-ink">Exclusive Residential Services Discount</h3>
            <p className="mt-3 text-ink-muted max-w-2xl mx-auto">
              Get 10% OFF your first seasonal service or landscaping project with OUTLAND Management! From lawn care to snow removal, we keep your home looking its best year-round. Contact us today to claim your discount!
            </p>
            <Link href="/contact-us" className="btn btn-primary mt-6">Claim your 10% discount</Link>
          </div>
        </div>
      </section>

      {/* Areas served */}
      <section className="section-y bg-white">
        <div className="container-x">
          <div className="text-center">
            <p className="chip mx-auto">Service Areas</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-ink">We&apos;re here to help</h2>
          </div>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {SERVICE_AREAS.map((a, i) => (
              <li key={a.slug}>
                <Link href={`/service-areas/${a.slug}`} className="flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3 shadow-sm transition hover:border-primary/40 hover:bg-primary-soft">
                  <span className="flex items-center gap-3">
                    <span className="text-primary font-mono text-sm">{String(i + 1).padStart(2, '0')}.</span>
                    <span className="font-medium text-ink">{a.title}</span>
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" className="text-ink-subtle"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cta heading="Elevate Your Outdoors Today!" body="Transform your landscape with OUTLAND's expert services. Limited slots available – act now!" />
    </>
  );
}
