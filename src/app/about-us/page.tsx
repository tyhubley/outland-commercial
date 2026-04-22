import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/data/site';
import { Cta } from '@/components/Cta';
import { ServiceIcon } from '@/components/ServiceIcons';
import { Hero } from '@/components/Hero';

export const metadata: Metadata = {
  title: 'Landscaping Excellence in Waukesha County | OUTLAND Commercial',
  description: 'Experience unparalleled landscaping and lawn care with OUTLAND Commercial. Serving Waukesha County with top-tier services. Transform your property today!',
};

const AWARDS = [
  { title: 'Excellence in Service Award 2023', body: 'Awarded for outstanding service and customer satisfaction in the landscaping industry, recognizing our commitment to quality and excellence in every project.' },
  { title: 'Eco-Friendly Landscaping Leader', body: 'Recognized for sustainable and environmentally friendly landscaping practices, ensuring your outdoor space is not only beautiful but eco-conscious as well.' },
  { title: 'Top Rated Snow Removal Service', body: 'Celebrated as the leading snow removal service provider, efficiently keeping Waukesha County safe and clear during winter months.' },
  { title: 'Trusted Community Partner', body: 'Valued for building strong connections within local communities, supporting local events, and consistently delivering reliable services year-round.' },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        h1="Transform Your Outdoors with OUTLAND Commercial"
        sub="Expert Landscaping & Snow Removal Services across Waukesha County"
        imageSrc="/images/image_67c9dd42432c4764167cb164.jpg"
      />

      <section className="section-y bg-white">
        <div className="container-x max-w-4xl prose-copy">
          <p className="chip">About</p>
          <h2 className="!mt-4 text-3xl md:text-5xl font-bold text-ink tracking-tight">About OUTLAND Commercial</h2>
          <p>Welcome to OUTLAND Commercial, a leading provider of comprehensive lawn care, landscaping, and snow removal services in Waukesha County. Born from a passion for enhancing the beauty and health of Wisconsin&rsquo;s outdoor spaces, we have grown into a trusted name for property management services.</p>

          <h3>Why Choose OUTLAND Commercial?</h3>
          <ul>
            <li><strong>Experience:</strong> With over 10 years in the industry, our expertise covers all aspects of commercial landscaping and lawn care.</li>
            <li><strong>Local Expertise:</strong> We serve communities right across Waukesha, Milwaukee, New Berlin, Hartland, Wales, and Elm Grove, understanding local climate and challenges.</li>
            <li><strong>Customized Service Plans:</strong> We offer personalized service plans tailored to meet the unique needs of each client&rsquo;s property.</li>
            <li><strong>Year-Round Service:</strong> From spring blooms to winter snow, our services keep your property looking its best throughout the year.</li>
          </ul>

          <h3>Our Services</h3>
          <p>OUTLAND Commercial provides an array of services to meet all your landscaping needs, including:</p>
          <ul>
            <li>Landscape Maintenance</li>
            <li>Landscape Enhancements</li>
            <li>Snow and Ice Removal</li>
            <li>Lawn Care</li>
            <li>Tree Care</li>
            <li>Residential Services</li>
          </ul>
          <p>Our seasoned team of professionals is equipped to handle everything from routine maintenance to complex enhancements, ensuring each project reflects our commitment to quality and excellence.</p>

          <h3>Commitment to Excellence</h3>
          <p>At OUTLAND Commercial, we believe in creating and maintaining landscapes that are not only beautiful but sustainable. Our dedicated team works closely with each client to develop landscapes that represent their vision and meet their needs.</p>
          <p>Trust your landscaping needs to OUTLAND Commercial and experience the difference that professional service, personalized care, and unrivaled expertise can make.</p>
        </div>
      </section>

      <section className="section-y bg-surface-alt">
        <div className="container-x">
          <p className="chip">Comprehensive Landscaping & Snow Services</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group rounded-xl bg-white border border-border p-7 shadow-card hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-0.5 transition">
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

      <section className="section-y bg-white">
        <div className="container-x">
          <p className="chip">Our Achievements</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink tracking-tight max-w-3xl">Explore Our Achievements and What Sets Us Apart</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {AWARDS.map(a => (
              <div key={a.title} className="rounded-xl border border-border p-7 bg-surface-alt">
                <p className="text-[15px] text-ink-muted leading-[1.65]">{a.body}</p>
                <h3 className="mt-5 text-lg font-semibold text-ink">{a.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta heading="Transform Your Lawn Today!" body="Experience OUTLAND's unmatched services and elevate your outdoor spaces. Act now for premium care!" />
    </>
  );
}
