import { createFileRoute, Link } from "@tanstack/react-router";
import { CinematicVideo } from "@/components/cinematic-video";
import { FilmTile } from "@/components/film-tile";
import { SiteShell } from "@/components/site-shell";
import { films, site, stats, values } from "@/lib/site";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const lawn = films.find((f) => f.id === "lawn")!;

  return (
    <SiteShell>
      <section className="relative isolate min-h-[70vh] overflow-hidden bg-bg">
        <CinematicVideo src="/videos/pagosa-peak.mp4" poster="/images/pagosa-peak.jpg" />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/50 to-bg/30" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-5 pb-14 pt-28 md:px-8">
          <p className="eyebrow">The studio</p>
          <h1 className="display-hero mt-4 max-w-[16ch] text-[clamp(3.4rem,10vw,7.5rem)] text-fg">
            Family-led. High-country specialists.
          </h1>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-line">
        <img
          src="/images/blueprint-site.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-55"
        />
        <div className="blueprint-grid absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-r from-bg/80 via-bg/55 to-bg/70"
          aria-hidden
        />
        <div className="blueprint-marks absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-5 py-20 md:grid-cols-12 md:gap-16 md:px-8 md:py-28">
          <div className="md:col-span-4">
            <p className="eyebrow">Sheet A-201 · Why Pagosa</p>
            <div className="mt-8 border border-line bg-bg/70 p-6 backdrop-blur-sm md:p-8">
              <img
                src="/brand/mark.png"
                alt="Matterhorn Construction"
                className="size-28 object-contain outline-none md:size-36"
              />
              <p className="mt-6 font-display text-4xl tracking-[0.14em] text-fg md:text-5xl">
                MATTERHORN
              </p>
              <p className="mt-2 text-[0.7rem] font-medium tracking-[0.28em] text-muted uppercase">
                Construction, LLC
              </p>
              <p className="mt-6 border-t border-line pt-4 text-[0.7rem] tracking-[0.16em] text-faint uppercase">
                Jody Ellis · Owner & builder
              </p>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="text-xl leading-relaxed text-fg md:text-2xl">
              Pagosa Springs. The world’s deepest hot spring. Pagosa Peak at
              12,658 feet. Owner Jody Ellis brings more than 40 years of professional
              construction experience to every mountain lot.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              Jody leads Matterhorn Construction, LLC with hands-on experience
              in timber, stone, steel, and glass — from the first walk of the
              lot to the day you take the keys. A fourth-generation builder,
              he carries that family craft into every project.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              Building your home means making decisions you’ll live with for
              decades: where to build, what to invest in, and how each detail
              will hold up over time. Jody brings more than 40 years of
              construction experience to those conversations. Bring him your
              plans, your questions, and your budget, and talk through what it
              will take to turn the home you imagine into a place you can live.
            </p>
          </div>
        </div>
      </section>

      <section className="grid bg-bg lg:grid-cols-2">
        <FilmTile shot={lawn} playlist={films} className="min-h-[360px] aspect-auto" />
        <div className="flex flex-col justify-center px-5 py-16 md:px-12 md:py-24">
          <p className="eyebrow">How we work</p>
          <ul className="mt-8 space-y-8">
            {values.map((v) => (
              <li key={v.title}>
                <h2 className="font-display text-3xl tracking-[0.04em] text-fg">
                  {v.title}
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                  {v.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-surface px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-line pt-6">
              <p className="font-display text-5xl tracking-[0.04em] text-fg">
                {s.value}
              </p>
              <p className="mt-2 text-[0.7rem] font-medium tracking-[0.16em] text-sage uppercase">
                {s.unit}
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-bg px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="border border-line bg-surface p-6 md:p-8">
              <img
                src="/brand/mark.png"
                alt=""
                className="size-28 object-contain outline-none md:size-40"
              />
              <p className="mt-6 font-display text-4xl tracking-[0.14em] text-fg md:text-5xl">
                MATTERHORN
              </p>
              <p className="mt-2 text-[0.7rem] font-medium tracking-[0.28em] text-muted uppercase">
                Construction, LLC
              </p>
              <p className="mt-6 border-t border-line pt-4 text-[0.7rem] tracking-[0.16em] text-faint uppercase">
                {site.location}
              </p>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="eyebrow">The whole arc</p>
            <h2 className="display-hero mt-4 max-w-[16ch] text-[clamp(2.6rem,6.5vw,5rem)] text-fg">
              From pre-planning to the keys.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              A house you can walk into — and fall in love with, knowing it was
              crafted with care and the highest principles.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center bg-fg px-6 text-[0.75rem] font-medium tracking-[0.16em] text-bg uppercase"
              >
                Start a project
              </Link>
              <Link
                to="/work"
                className="inline-flex h-12 items-center justify-center border border-line px-6 text-[0.75rem] font-medium tracking-[0.16em] text-fg uppercase transition-colors hover:bg-fg hover:text-bg"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
