'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  className?: string;
  posterClassName?: string;
  poster?: string;
  ariaLabel?: string;
};

/**
 * Renders a video that only starts loading/playing when it scrolls into view.
 * Uses IntersectionObserver so the browser doesn't fetch + decode video frames
 * during the initial LCP/TBT measurement window on pages where the video is
 * below the fold (About section, testimonial reels, etc.).
 *
 * Shows an optional poster image immediately for visual continuity.
 * Respects prefers-reduced-motion (no autoplay).
 */
export function LazyVideo({ src, className, poster, ariaLabel }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!wrapRef.current) return;

    const el = wrapRef.current;
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
      {mounted ? (
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
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="w-full h-full object-contain" loading="lazy" />
      ) : null}
    </div>
  );
}
