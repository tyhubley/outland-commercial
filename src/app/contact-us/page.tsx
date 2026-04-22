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
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="rounded-2xl bg-surface-alt p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">Get in touch!</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">Get in Touch With Us</h2>
            <div className="mt-8 space-y-8">
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Phone</div>
                <a href={`tel:${SITE.phoneRaw}`} className="mt-2 block text-2xl font-bold text-ink hover:text-primary">{SITE.phone}</a>
              </div>
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Hours</div>
                <dl className="mt-3 divide-y divide-border border-t border-border border-b">
                  {DAYS.map(d => (
                    <div key={d} className="flex items-center justify-between py-3">
                      <dt className="text-sm font-medium text-ink">{d}</dt>
                      <dd className="text-sm text-ink-muted">{SITE.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewsStrip />
      <Cta heading="Transform Your Outdoors Today!" body="Elevate your property with our expert care and seamless service. Contact OUTLAND Commercial now!" />
    </>
  );
}
