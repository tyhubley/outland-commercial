'use client';

import Link from 'next/link';
import { SITE } from '@/data/site';

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2z" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l2.5 6 6 1.5-4.5 4 1 6-5-3-5 3 1-6L3 10.5l6-1.5z" />
    </svg>
  );
}

export function StickyMobileCta() {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.15)]" role="region" aria-label="Quick actions">
      <div className="flex gap-2 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <a
          href={`tel:${SITE.phoneRaw}`}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-ink/15 bg-white px-4 py-3 text-[15px] font-semibold text-ink active:scale-[0.98] transition"
        >
          <IconPhone />
          Call
        </a>
        <Link
          href="/contact-us"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-[15px] font-semibold text-white shadow-sm active:scale-[0.98] transition"
        >
          <IconSpark />
          Free estimate
        </Link>
      </div>
    </div>
  );
}
