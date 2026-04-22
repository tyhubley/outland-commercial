import Image from 'next/image';
import { SITE } from '@/data/site';

export function GoogleBadge() {
  return (
    <a
      href={SITE.googleReviewsUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-ink/5 hover:ring-ink/10 transition"
    >
      <Image src="/google-g-logo.svg" alt="Google" width={26} height={26} />
      <div className="flex flex-col items-start leading-tight">
        <span className="text-sm font-medium text-ink">5 stars on Google</span>
        <span className="text-yellow-500 text-sm tracking-wider">★★★★★</span>
      </div>
    </a>
  );
}
