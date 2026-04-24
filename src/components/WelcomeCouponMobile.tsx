'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const SESSION_KEY = 'outland_welcome_20_shown';
const DISMISSED_KEY = 'outland_welcome_20_dismissed';
const SHOW_AFTER_MS = 2500;

export function WelcomeCouponMobile() {
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;
    if (!isMobile) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    try { if (localStorage.getItem(DISMISSED_KEY)) return; } catch { /* noop */ }

    const t = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setOpen(true);
    }, SHOW_AFTER_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function dismiss(persist = false) {
    if (persist) {
      try { localStorage.setItem(DISMISSED_KEY, '1'); } catch { /* noop */ }
    }
    setClosed(true);
    window.setTimeout(() => setOpen(false), 250);
  }

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden flex items-end justify-center transition-opacity duration-200 ${closed ? 'opacity-0' : 'opacity-100'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-coupon-title"
    >
      <button
        aria-label="Close welcome offer"
        className="absolute inset-0 bg-ink/65 backdrop-blur-sm"
        onClick={() => dismiss(false)}
      />
      <div
        className={`relative w-full max-w-md rounded-t-3xl bg-white shadow-2xl overflow-hidden transition-transform duration-300 ${closed ? 'translate-y-full' : 'translate-y-0'}`}
      >
        <div className="relative bg-primary text-white px-6 pt-6 pb-8">
          <button
            onClick={() => dismiss(false)}
            aria-label="Close"
            className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/15 hover:bg-white/25 transition flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          <p className="text-[11px] uppercase tracking-[0.24em] font-semibold opacity-90">Welcome to OUTLAND</p>
          <h2 id="welcome-coupon-title" className="mt-1 text-[48px] font-extrabold leading-none tracking-tight">
            20<span className="text-[32px] align-top">%</span> OFF
          </h2>
          <p className="mt-2 text-white/95 text-[15px]">Your first service with OUTLAND Commercial</p>
        </div>

        <div className="px-6 pt-5 pb-6">
          <p className="text-[14px] text-ink-muted leading-relaxed">
            New customers only — valid on any first-time service: lawn care, fertilization, snow removal, landscape design, or patio installation. Claim yours and we&apos;ll apply the discount to your first invoice.
          </p>

          <ul className="mt-4 space-y-2 text-[13px] text-ink">
            <li className="flex items-start gap-2"><span className="mt-0.5 text-primary">✓</span> No obligation — free estimate first</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-primary">✓</span> Limited seasonal slots across Waukesha County</li>
          </ul>

          <Link
            href="/contact-us?offer=WELCOME20"
            onClick={() => dismiss(true)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3.5 text-[15px] font-semibold text-white shadow-sm hover:bg-primary-hover active:scale-[0.99] transition"
          >
            Claim your 20% discount
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>

          <button
            onClick={() => dismiss(true)}
            className="mt-2 block w-full text-center text-[13px] text-ink-subtle hover:text-ink py-2"
          >
            Maybe later
          </button>
        </div>

        <div className="safe-area-pad bg-white" style={{ height: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  );
}
