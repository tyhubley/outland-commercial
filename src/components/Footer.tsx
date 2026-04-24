import Link from 'next/link';
import Image from 'next/image';
import { SITE, SERVICES, SERVICE_AREAS } from '@/data/site';

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2z" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="bg-white border-t border-border">
        <div className="container-x py-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Image src="/logo.webp" alt="OUTLAND Commercial" width={160} height={48} className="h-12 w-auto" />
            <p className="mt-3 text-sm italic font-medium text-primary">Your partner for all seasons.</p>
            <p className="mt-3 text-sm text-ink-muted max-w-xs leading-relaxed">
              Premium landscaping, lawn care, and snow removal services across Waukesha County.
            </p>
            <a href={`tel:${SITE.phoneRaw}`} className="mt-6 inline-flex items-center gap-2 text-xl font-semibold text-ink hover:text-primary">
              <IconPhone />
              {SITE.phone}
            </a>
            <p className="mt-1 inline-flex items-center gap-2 text-sm text-ink-subtle">
              <IconClock />
              {SITE.hoursDays}: {SITE.hours}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink">
              <li><Link href="/contact-us" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/about-us" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/reviews" className="hover:text-primary">Client Testimonials</Link></li>
              <li><Link href="/sitemap" className="hover:text-primary">Sitemap</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink">
              {SERVICES.map(s => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-primary">{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">Areas Served</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink">
              {SERVICE_AREAS.map(a => (
                <li key={a.slug}><Link href={`/service-areas/${a.slug}`} className="hover:text-primary">{a.title}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-ink-deep text-white/70">
        <div className="container-x py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px]">
          <span>© 2026 OUTLAND Commercial. All rights reserved.</span>
          <span className="text-white/50">Landscaping · Lawn Care · Snow Removal · Waukesha County, WI</span>
        </div>
      </div>
    </footer>
  );
}
