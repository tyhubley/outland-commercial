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
              <p className="chip">Free Estimate</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-ink tracking-tight">Tell us about your property</h2>
              <p className="mt-3 text-ink-muted">
                Share a few details and we&apos;ll get back with a no-obligation quote for your space.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-surface-alt p-6 md:p-8">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Prefer to call?</div>
              <a href={`tel:${SITE.phoneRaw}`} className="mt-2 block text-3xl font-bold text-ink hover:text-primary tracking-tight">{SITE.phone}</a>
              <p className="mt-2 text-sm text-ink-muted">We answer every call during business hours.</p>
            </div>
            <div className="rounded-2xl bg-surface-alt p-6 md:p-8">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Hours</div>
              <dl className="mt-3 divide-y divide-border">
                {DAYS.map(d => (
                  <div key={d} className="flex items-center justify-between py-2.5">
                    <dt className="text-sm font-medium text-ink">{d}</dt>
                    <dd className="text-sm text-ink-muted">{SITE.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl bg-ink p-6 md:p-8 text-white">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">What happens next</div>
              <ol className="mt-4 space-y-3 text-sm text-white/85">
                <li className="flex gap-3"><span className="text-primary font-mono font-semibold">01</span>We review your details and any photos you send over.</li>
                <li className="flex gap-3"><span className="text-primary font-mono font-semibold">02</span>A team member follows up within one business day.</li>
                <li className="flex gap-3"><span className="text-primary font-mono font-semibold">03</span>We schedule a site visit and deliver a free estimate.</li>
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
