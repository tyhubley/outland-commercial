import Link from 'next/link';
import { SITE } from '@/data/site';
import { HeroSwoosh } from '@/components/HeroSwoosh';
import { GoogleBadge } from '@/components/GoogleBadge';
import { HeroMedia } from '@/components/HeroMedia';

type Props = {
  h1: string;
  sub?: string | null;
  imageSrc?: string;
  videoSrc?: string;
  videoPoster?: string;
  showBadge?: boolean;
};

function IconPhone() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2z" /></svg>;
}

export function Hero({ h1, sub, imageSrc, videoSrc, videoPoster, showBadge = true }: Props) {
  // Poster is whichever image is provided for the static LCP frame.
  const posterImage = videoPoster ?? imageSrc;

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-80px)] flex items-center text-white isolate">
      <HeroMedia videoSrc={videoSrc} imageSrc={posterImage} alt={h1} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/60 z-[1]" aria-hidden />
      <HeroSwoosh />
      <div className="container-x relative z-[3] py-16 md:py-24">
        <h1 className="max-w-3xl text-[44px] sm:text-5xl lg:text-[72px] leading-[1] font-extrabold tracking-tight fade-up">
          {h1}
        </h1>
        {sub && (
          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/90 fade-up delay-1">{sub}</p>
        )}
        <div className="mt-7 flex flex-wrap gap-3 fade-up delay-2">
          <Link href="/contact-us" className="btn btn-primary">Free Estimate</Link>
          <a href={`tel:${SITE.phoneRaw}`} className="btn btn-white" aria-label={`Call OUTLAND Commercial at ${SITE.phone}`}><IconPhone /> Call us</a>
        </div>
        {showBadge && (
          <div className="mt-10 fade-up delay-3">
            <GoogleBadge />
          </div>
        )}
      </div>
    </section>
  );
}
