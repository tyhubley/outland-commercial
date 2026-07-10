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
        <div className="container-x max-w-3xl mx-auto">
          <div className="rounded-2xl bg-white p-8 md:p-12 ring-1 ring-border shadow-card text-center">
            <p className="chip mx-auto">About this site</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-ink tracking-tight">
              OUTLAND Commercial has been sold.
            </h2>
            <p className="mt-4 text-ink-muted max-w-xl mx-auto leading-relaxed">
              This site is kept online as a record of the work. New inquiries are not accepted at this time.
            </p>
            <p className="mt-4 text-sm text-ink-subtle italic">
              Thank you to every client, crew member, and supplier who made six seasons of OUTLAND possible.
            </p>
          </div>
        </div>
      </section>

      <ReviewsStrip />
      <Cta heading="Transform Your Outdoors Today!" body="Elevate your property with our expert care and seamless service. Contact OUTLAND Commercial now!" />
    </>
  );
}
