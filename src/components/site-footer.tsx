import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-5">
          <Logo markClassName="size-12" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
            Custom homes and mountain construction in Pagosa Springs, Colorado.
            Timber, stone, steel, and glass — built under Pagosa Peak.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow">Studio</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow">Pagosa Springs</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {site.legal}
            <br />
            {site.owner} · Owner
            <br />
            <a href={site.phoneHref} className="text-fg hover:text-sage">{site.phoneLabel}</a>
            <br />
            {site.peak} · {site.peakElevation}
            <br />
            {site.coordinates}
            <br />
            <a href={`mailto:${site.email}`} className="text-fg transition-colors hover:text-sage">
              {site.email}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-[0.7rem] tracking-[0.12em] text-faint uppercase md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} {site.legal}</span>
          <span>Pagosa Springs · San Juan Mountains</span>
        </div>
      </div>
    </footer>
  );
}
