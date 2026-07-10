import type { Metadata } from 'next';
import { SITE } from '@/data/site';
import { Cta } from '@/components/Cta';
import { ReviewsStrip } from '@/components/ReviewsStrip';
import { ContactForm } from '@/components/ContactForm';
import { HeroSwoosh } from '@/components/HeroSwoosh';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, localBusinessSchema, SITE_URL } from '@/lib/seo';

const URL = `${SITE_URL}/contact-us`;
export const metadata: Metadata = {
  title: 'Landscaping & Lawn Care Experts | OUTLAND Commercial',
  description: 'Experience premium landscaping and lawn care services with OUTLAND Commercial in Waukesha County. Transform your property year-round. Contact us today!',
  alternates: { canonical: URL },
  openGraph: { type: 'website', url: URL, title: 'Contact OUTLAND Commercial', description: 'Get in touch with OUTLAND Commercial. Free estimates for landscaping, lawn care, and snow removal across Waukesha County.' },
  twitter: { card: 'summary_large_image', title: 'Contact OUTLAND Commercial' },
};

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

export default function ContactPage() {
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact-us' }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), localBusinessSchema()]} />
      <section className="relative bg-ink text-white overflow-hidden isolate">
        <HeroSwoosh opacity={0.7} />
        <div className="container-x relative z-[2] pt-20 pb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Contact us</h1>
          <p className="mt-4 text-white/85 text-lg max-w-2xl">We&apos;d love to hear from you and answer any questions you may have.</p>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-6 md:p-10 ring-1 ring-border shadow-card">
              <p className="chip">Portfolio site</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-ink tracking-tight">This business has been sold.</h2>
              <p className="mt-3 text-ink-muted">
                OUTLAND Commercial isn&apos;t taking new work. This site lives on as a portfolio piece for the platform that built it. If you&apos;re a landscape contractor who wants a site like this, that&apos;s Garten.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={SITE.gartenUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">See Garten →</a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-surface-alt p-6 md:p-8">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Built by</div>
              <a
                href={SITE.gartenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-3xl font-bold text-ink hover:text-primary tracking-tight"
              >
                Garten
              </a>
              <p className="mt-2 text-sm text-ink-muted">
                The lead-response platform for landscape contractors.
              </p>
            </div>
            <div className="rounded-2xl bg-ink p-6 md:p-8 text-white">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Why this site is here</div>
              <ol className="mt-4 space-y-3 text-sm text-white/85">
                <li className="flex gap-3"><span className="text-primary font-mono font-semibold">01</span>OUTLAND was founded, run, and sold by Ty Hubley.</li>
                <li className="flex gap-3"><span className="text-primary font-mono font-semibold">02</span>The site kept live so contractors can see what a Garten build looks like.</li>
                <li className="flex gap-3"><span className="text-primary font-mono font-semibold">03</span>Every page below is a real Garten page shipped in 48 hours.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <ReviewsStrip />
      <Cta heading="Transform Your Outdoors Today!" body="Elevate your property with our expert care and seamless service. Contact OUTLAND Commercial now!" />
    </>
  );
}
