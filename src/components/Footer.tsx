import Link from 'next/link';
import Image from 'next/image';
import { SITE, SERVICES, SERVICE_AREAS } from '@/data/site';

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x py-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Image src="/logo.webp" alt="OUTLAND Commercial" width={160} height={48} className="h-12 w-auto brightness-0 invert" />
          <p className="mt-4 text-sm text-white/70 max-w-xs">
            Premium landscaping, lawn care, and snow removal services across Waukesha County.
          </p>
          <a href={`tel:${SITE.phoneRaw}`} className="mt-6 block text-xl font-semibold hover:text-primary">{SITE.phone}</a>
          <p className="text-sm text-white/60">{SITE.hoursDays}: {SITE.hours}</p>
        </div>
        <div className="md:col-span-3">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            <li><Link href="/contact-us" className="hover:text-white">Contact</Link></li>
            <li><Link href="/about-us" className="hover:text-white">About Us</Link></li>
            <li><Link href="/reviews" className="hover:text-white">Client Testimonials</Link></li>
            <li><Link href="/sitemap" className="hover:text-white">Sitemap</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">Services</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            {SERVICES.map(s => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">Areas Served</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            {SERVICE_AREAS.map(a => (
              <li key={a.slug}><Link href={`/service-areas/${a.slug}`} className="hover:text-white">{a.title}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-4 text-center text-xs text-white/60">© 2026 OUTLAND Commercial. All rights reserved.</div>
      </div>
    </footer>
  );
}
