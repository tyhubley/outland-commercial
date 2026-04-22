import Link from 'next/link';

export function Breadcrumbs({ crumbs }: { crumbs: { name: string; url?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-x pt-4 pb-2 text-[13px] text-white/80">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-white/40">/</span>}
            {c.url ? (
              <Link href={c.url} className="hover:text-white underline-offset-2 hover:underline">{c.name}</Link>
            ) : (
              <span className="text-white/90">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
