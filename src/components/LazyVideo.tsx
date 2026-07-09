'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  className?: string;
  ariaLabel?: string;
};

/**
 * Renders a video that only starts fetching / decoding when it scrolls into
 * view. Uses IntersectionObserver + rootMargin so we begin ~200px before the
 * user actually sees it. Below-the-fold videos on landing pages should never
 * fire during the Lighthouse LCP/TBT measurement window.
 *
 * Renders a stable empty placeholder <div> before mount so there is no layout
 * shift and no placeholder->video swap flash.
 */
export function LazyVideo({ src, className, ariaLabel }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setMounted(true);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (mounted && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [mounted]);

  return (
    <div ref={wrapRef} className={className} aria-label={ariaLabel}>
      {mounted && (
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
