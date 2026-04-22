'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { SITE, SERVICES } from '@/data/site';

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  );
}
function IconStar({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" /></svg>
  );
}
function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2z" /></svg>
  );
}
function IconChevron() {
  return <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M2 4l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      {/* Orange top bar */}
      <div className="hidden md:block bg-primary text-white">
        <div className="container-x flex items-center justify-between py-3 text-[13px]">
          <div className="flex items-center gap-2">
            <IconClock />
            <span>{SITE.hoursDays}: {SITE.hours}</span>
          </div>
          <a href={SITE.googleReviewsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-90">
            <span className="inline-flex items-center gap-0.5">
              {[0,1,2,3,4].map(i => <IconStar key={i} className="text-white" />)}
            </span>
            <span>5 stars on Google</span>
          </a>
        </div>
      </div>

      {/* Main nav row */}
      <div className="bg-white shadow-sm">
        <div className="container-x flex items-center justify-between py-3">
          <Link href="/" className="flex items-center">
            <Image src="/logo.webp" alt="OUTLAND Commercial" width={140} height={42} className="h-12 w-auto" priority />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-[15px] text-ink">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="inline-flex items-center gap-1 hover:text-primary" aria-haspopup="menu" aria-expanded={servicesOpen}>
                Services <IconChevron />
              </button>
              {servicesOpen && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="w-72 rounded-lg bg-white shadow-lg ring-1 ring-ink/5 py-2">
                    {SERVICES.map(s => (
                      <Link key={s.slug} href={`/services/${s.slug}`} className="block px-4 py-2 text-sm text-ink hover:bg-primary-soft hover:text-primary">
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/reviews" className="hover:text-primary">Reviews</Link>
            <Link href="/contact-us" className="hover:text-primary">Contact</Link>
            <Link href="/about-us" className="hover:text-primary">About Us</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact-us" className="btn btn-primary">Free Estimate</Link>
            <a href={`tel:${SITE.phoneRaw}`} className="btn btn-white"><IconPhone /> Call us</a>
          </div>

          <button className="lg:hidden inline-flex items-center p-2 text-ink" aria-label="Open menu" onClick={() => setOpen(v => !v)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="container-x py-4 space-y-2">
              <div>
                <button onClick={() => setServicesOpen(v => !v)} className="flex w-full items-center justify-between py-2 text-sm font-medium">
                  Services <IconChevron />
                </button>
                {servicesOpen && (
                  <ul className="pl-2 space-y-1 border-l border-border ml-1">
                    {SERVICES.map(s => (
                      <li key={s.slug}><Link href={`/services/${s.slug}`} className="block py-1 pl-3 text-sm text-ink-muted">{s.title}</Link></li>
                    ))}
                  </ul>
                )}
              </div>
              <Link href="/reviews" className="block py-2 text-sm">Reviews</Link>
              <Link href="/contact-us" className="block py-2 text-sm">Contact</Link>
              <Link href="/about-us" className="block py-2 text-sm">About Us</Link>
              <div className="pt-3 flex gap-3">
                <Link href="/contact-us" className="btn btn-primary flex-1">Free Estimate</Link>
                <a href={`tel:${SITE.phoneRaw}`} className="btn btn-white flex-1"><IconPhone /> Call</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
