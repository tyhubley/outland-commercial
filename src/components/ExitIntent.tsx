'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'outland_exit_shown_v1';

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Already shown this session / dismissed previously
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    const onMouseLeave = (e: MouseEvent) => {
      // Fire when cursor leaves toward the top of the viewport
      if (e.clientY <= 0 && e.relatedTarget === null) {
        trigger();
      }
    };

    let scrollTimer: number | null = null;
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Mobile backward-scroll (upward) after 40% down triggers
      if (y < lastScroll - 30 && y < window.innerHeight * 0.4) {
        trigger();
      }
      lastScroll = y;
      if (scrollTimer) window.clearTimeout(scrollTimer);
    };

    const timeoutId = window.setTimeout(() => {
      trigger();
    }, 45_000); // fallback: 45 seconds on page

    function trigger() {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
      sessionStorage.setItem(STORAGE_KEY, '1');
      setOpen(true);
      cleanup();
    }

    function cleanup() {
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timeoutId);
    }

    if (isDesktop) document.addEventListener('mouseleave', onMouseLeave);
    else window.addEventListener('scroll', onScroll, { passive: true });

    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  function dismiss() {
    setClosed(true);
    // small delay so the fade-out animation plays
    setTimeout(() => setOpen(false), 200);
  }

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 transition-opacity duration-200 ${closed ? 'opacity-0' : 'opacity-100'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-title"
    >
      <button
        aria-label="Close dialog"
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={dismiss}
      />
      <div className={`relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden transition-transform duration-200 ${closed ? 'translate-y-4 md:translate-y-0 md:scale-95' : ''}`}>
        <button
          aria-label="Close dialog"
          onClick={dismiss}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-surface-alt hover:bg-border text-ink-muted flex items-center justify-center z-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        <div className="bg-primary text-white px-6 py-5">
          <p className="text-[12px] uppercase tracking-[0.2em] font-semibold opacity-90">Before you go</p>
          <h2 id="exit-title" className="mt-1 text-2xl font-extrabold leading-tight">
            Save 10% on your first service
          </h2>
        </div>

        <div className="p-6">
          <p className="text-[15px] text-ink-muted leading-relaxed">
            Lock in 10% off your first landscaping, fertilization, or snow-removal service with OUTLAND Commercial. Limited seasonal slots across Waukesha County.
          </p>
          <ul className="mt-4 space-y-2 text-[14px] text-ink">
            <li className="flex items-start gap-2"><span className="mt-1 text-primary">✓</span> Free, no-obligation on-site estimate</li>
            <li className="flex items-start gap-2"><span className="mt-1 text-primary">✓</span> Family-owned, 10+ years in the industry</li>
            <li className="flex items-start gap-2"><span className="mt-1 text-primary">✓</span> 5.0 ★ rating across 79 Google reviews</li>
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <Link
              href="/contact-us?offer=SPRING10"
              onClick={dismiss}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-3 text-[15px] font-semibold text-white hover:bg-primary-hover transition"
            >
              Claim your 10% discount
            </Link>
            <button
              onClick={dismiss}
              className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-3 text-[14px] font-medium text-ink-muted hover:text-ink transition"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
