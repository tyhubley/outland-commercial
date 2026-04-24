import Image from 'next/image';

type Photo = {
  src: string;
  alt: string;
  caption: string;
  category: string;
  span?: 'col-1' | 'col-2' | 'row-2' | 'col-2-row-2';
};

const PHOTOS: Photo[] = [
  {
    src: '/images/gallery/striped-residential-lawn.jpg',
    alt: 'OUTLAND Commercial fresh mow lines on a residential lawn in Waukesha County',
    caption: 'Weekly residential mow — Waukesha, WI',
    category: 'Landscape Maintenance',
    span: 'col-2-row-2',
  },
  {
    src: '/images/gallery/drone-aerial-property.jpg',
    alt: 'Aerial drone photo of a commercial property maintained by OUTLAND',
    caption: 'Commercial property overview',
    category: 'Commercial Maintenance',
  },
  {
    src: '/images/gallery/crew-edging-commercial.webp',
    alt: 'OUTLAND crew hand-edging a commercial lawn',
    caption: 'Precision edging',
    category: 'Landscape Maintenance',
  },
  {
    src: '/images/gallery/snow-removal-crew.jpg',
    alt: 'OUTLAND snow removal crew applying ice melt to a commercial sidewalk',
    caption: 'Commercial sidewalk ice management',
    category: 'Snow Removal',
  },
  {
    src: '/images/gallery/landscape-maintenance-service.jpg',
    alt: 'Well-maintained commercial landscaping',
    caption: 'Full-service grounds care',
    category: 'Landscape Maintenance',
  },
  {
    src: '/images/gallery/drone-property-overview.jpg',
    alt: 'Drone shot of a client property',
    caption: 'Residential estate care',
    category: 'Landscape Maintenance',
  },
];

function spanClass(span?: Photo['span']) {
  switch (span) {
    case 'col-2': return 'md:col-span-2';
    case 'row-2': return 'md:row-span-2';
    case 'col-2-row-2': return 'md:col-span-2 md:row-span-2';
    default: return '';
  }
}

export function RecentWorkGallery() {
  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="chip">Recent Work</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-ink tracking-tight">
              Properties we&apos;ve cared for this season
            </h2>
          </div>
          <p className="text-ink-muted max-w-md text-[15px]">
            A glimpse of residential and commercial work across Waukesha County — from weekly maintenance to snow events.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 md:auto-rows-[220px] gap-3">
          {PHOTOS.map((p, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden rounded-xl bg-ink shadow-card ${spanClass(p.span)} aspect-[4/3] md:aspect-auto`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" aria-hidden />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-soft opacity-90">{p.category}</div>
                <div className="text-[14px] md:text-[15px] font-medium mt-0.5">{p.caption}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
