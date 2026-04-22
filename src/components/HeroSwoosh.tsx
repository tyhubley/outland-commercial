export function HeroSwoosh({ opacity = 0.8 }: { opacity?: number }) {
  return (
    <svg
      viewBox="0 0 827 894"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-swoosh"
      preserveAspectRatio="xMinYMin slice"
      aria-hidden
    >
      <path d="M0 898C606.4 848.8 799.333 280.5 820 2.5L832.5 -27V898H0Z" fill="var(--primary)" fillOpacity={opacity} />
    </svg>
  );
}
