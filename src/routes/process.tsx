import { createFileRoute, Link } from "@tanstack/react-router";
import { BuildTimeline } from "@/components/build-timeline";
import { SiteShell } from "@/components/site-shell";
import { phases } from "@/lib/site";

export const Route = createFileRoute("/process")({ component: ProcessPage });

function ProcessPage() {
  return (
    <SiteShell>
      <section className="border-b border-line bg-bg px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Process</p>
          <h1 className="display-hero mt-4 max-w-[16ch] text-[clamp(3.4rem,10vw,7.5rem)] text-fg">
            From dirt to dusk.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Four phases. One site. Scroll the film, or read the work in order.
          </p>
        </div>
      </section>
      <BuildTimeline />
      <section className="border-t border-line bg-bg px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          {phases.map((p) => (
            <article key={p.id}>
              <img src={p.image} alt={p.title} className="aspect-video w-full object-cover" />
              <p className="eyebrow mt-5">
                {p.num} · {p.kicker}
              </p>
              <h2 className="mt-2 font-display text-4xl tracking-[0.04em] text-fg">
                {p.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.copy}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <Link
            to="/contact"
            className="inline-flex h-12 items-center bg-fg px-6 text-[0.75rem] font-medium tracking-[0.16em] text-bg uppercase"
          >
            Start a project
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
