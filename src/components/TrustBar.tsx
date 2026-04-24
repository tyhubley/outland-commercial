import { SITE } from '@/data/site';

function IconStar() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" /></svg>;
}
function IconShield() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></svg>;
}
function IconCalendar() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
}
function IconUsers() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}

type Stat = { icon: React.ReactNode; value: string; label: string };

export function TrustBar() {
  const stats: Stat[] = [
    { icon: <IconStar />, value: `5.0 ★`, label: `${SITE.googleReviewCount}+ Google reviews` },
    { icon: <IconUsers />, value: 'Family-owned', label: 'Based in Waukesha County' },
    { icon: <IconCalendar />, value: '10+ years', label: 'In the industry' },
    { icon: <IconShield />, value: 'Licensed & insured', label: 'Fully covered crews' },
  ];

  return (
    <section className="bg-white border-b border-border" aria-label="Credentials">
      <div className="container-x py-5">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:divide-x md:divide-border">
          {stats.map((s, i) => (
            <li key={i} className="flex items-center gap-3 md:px-5 first:md:pl-0 last:md:pr-0">
              <span className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                {s.icon}
              </span>
              <div>
                <div className="text-[14px] font-bold text-ink leading-tight">{s.value}</div>
                <div className="text-[12px] text-ink-muted leading-tight">{s.label}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
