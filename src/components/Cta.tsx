import Link from 'next/link';
import { SITE } from '@/data/site';
import { HeroSwoosh } from '@/components/HeroSwoosh';

function IconPhone() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2z" /></svg>;
}

export function Cta({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="relative bg-ink text-white overflow-hidden isolate">
      <HeroSwoosh opacity={0.7} />
      <div className="container-x relative z-[2] py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{heading}</h2>
          <p className="mt-4 text-white/80 text-base md:text-lg">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact-us" className="btn btn-primary">Free Estimate</Link>
            <a href={`tel:${SITE.phoneRaw}`} className="btn btn-white"><IconPhone /> Call us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
