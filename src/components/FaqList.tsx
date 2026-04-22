'use client';

import { useState } from 'react';

export function FaqList({ heading, sub, items }: { heading: string; sub: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-y bg-white">
      <div className="container-x max-w-4xl">
        <p className="chip">FAQs</p>
        <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink tracking-tight">{heading}</h2>
        <p className="mt-3 text-ink-muted">{sub}</p>
        <ul className="mt-10 divide-y divide-border border-t border-border">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="py-5">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-5 text-left"
                >
                  <span className="mt-1 font-mono text-sm font-semibold text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-lg font-semibold text-ink">{item.q}</span>
                  <span className="mt-1 text-primary">
                    <svg width="18" height="18" viewBox="0 0 18 18" className={`transition-transform ${isOpen ? 'rotate-45' : ''}`}><path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  </span>
                </button>
                {isOpen && <p className="mt-3 pl-14 pr-8 text-[15px] leading-[1.7] text-ink-muted">{item.a}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
