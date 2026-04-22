'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Props = {
  videoSrc?: string;
  imageSrc?: string;
  alt: string;
};

/**
 * Renders a poster image always, and overlays an autoplay video on top
 * only when:
 *   - The viewport is desktop-wide (≥ 1024px)
 *   - The device doesn't report a Save-Data connection
 *   - The user doesn't prefer reduced motion
 *
 * This keeps mobile LCP fast — mobile users get just the static poster
 * instead of a 12MB video download.
 */
export function HeroMedia({ videoSrc, imageSrc, alt }: Props) {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoSrc) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const saveData = nav.connection?.saveData === true;
    const slow = nav.connection?.effectiveType === '2g' || nav.connection?.effectiveType === 'slow-2g';

    if (desktop && !reducedMotion && !saveData && !slow) {
      // Defer a tick so the poster is painted first (LCP)
      requestAnimationFrame(() => setShowVideo(true));
    }
  }, [videoSrc]);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [showVideo]);

  return (
    <>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover z-0"
        />
      )}
      {videoSrc && showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover z-0 animate-[fadeIn_.6s_ease-out]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc} type="video/quicktime" />
        </video>
      )}
    </>
  );
}
