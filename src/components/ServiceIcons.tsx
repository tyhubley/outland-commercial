export function ServiceIcon({ slug }: { slug: string }) {
  const common = 'h-8 w-8 text-[color:var(--brand)]';
  switch (slug) {
    case 'landscape-maintenance':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.5 3 3 .5-2.2 2.2.5 3.3L12 9.5 9.2 11l.5-3.3L7.5 5.5l3-.5L12 2z"/><path d="M3 21c2-3 6-3 9-3s7 0 9 3"/></svg>
      );
    case 'landscape-installations':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 21h16"/><path d="M6 17V9l6-4 6 4v8"/><path d="M10 21v-6h4v6"/></svg>
      );
    case 'snow-removal':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1"/></svg>
      );
    case 'sports-field-maintenance':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>
      );
    case 'fertilization-services':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21c5-4 7-8 7-12a7 7 0 00-14 0c0 4 2 8 7 12z"/><path d="M12 3v18"/></svg>
      );
    case 'tree-care-services':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c4 0 7 3 7 7s-3 5-5 5h-1v6h-2v-6H10c-2 0-5-2-5-5s3-7 7-7z"/></svg>
      );
    case 'patio-installation-and-concrete':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 10h18v10H3z"/><path d="M3 10l4-5h10l4 5"/><path d="M7 15h10M12 10v10"/></svg>
      );
    default:
      return null;
  }
}
