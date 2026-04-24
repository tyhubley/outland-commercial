'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export type BeforeAfterPair = {
  before: string;
  after: string;
  alt: string;
  label?: string;
};

export function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);

  function move(clientX: number) {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  }

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-xl select-none touch-none aspect-[4/3] md:aspect-[16/10] bg-ink"
      onPointerDown={e => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={e => {
        if (e.buttons === 1 || e.pointerType === 'touch') move(e.clientX);
      }}
      role="slider"
      tabIndex={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-label={`Before and after — ${pair.alt}. Drag to reveal.`}
      onKeyDown={e => {
        if (e.key === 'ArrowLeft') setPos(p => Math.max(0, p - 4));
        if (e.key === 'ArrowRight') setPos(p => Math.min(100, p + 4));
      }}
    >
      {/* AFTER — underneath */}
      <Image src={pair.after} alt={`${pair.alt} (after)`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover pointer-events-none" />

      {/* BEFORE — clipped by position */}
      <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={pair.before} alt={`${pair.alt} (before)`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
      </div>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 pointer-events-none"
        style={{ left: `calc(${pos}% - 1px)` }}
      >
        <div className="w-0.5 h-full bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white shadow-lg ring-1 ring-black/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B473B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M8 6L2 12l6 6M16 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 rounded-md bg-ink/70 text-white text-[11px] font-semibold uppercase tracking-wider px-2 py-1">Before</span>
      <span className="absolute top-3 right-3 rounded-md bg-primary text-white text-[11px] font-semibold uppercase tracking-wider px-2 py-1">After</span>

      {pair.label && (
        <span className="absolute bottom-3 left-3 rounded-md bg-white/90 text-ink text-[12px] font-medium px-2.5 py-1 shadow-sm">
          {pair.label}
        </span>
      )}
    </div>
  );
}
