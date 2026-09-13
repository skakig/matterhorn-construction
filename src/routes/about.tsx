import { createFileRoute, Link } from "@tanstack/react-router";
import { CinematicVideo } from "@/components/cinematic-video";
import { FilmTile } from "@/components/film-tile";
import { SiteShell } from "@/components/site-shell";
import { films, stats, values } from "@/lib/site";

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

      <section className="border-b border-line bg-bg px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Why Pagosa</p>
          <div className="md:col-span-8">
            <p className="text-xl leading-relaxed text-fg md:text-2xl">
              Matterhorn Construction, LLC builds and renovates homes in Pagosa
              Springs and the San Juan Mountains. We came here for the river, the
              peaks, and a town small enough to know the inspector by name.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              The work is unglamorous in the right places: footings that survive
              freeze-thaw, roofs that shed Wolf Creek snow, flashing that does not
              leak in a March wind. The rest — timber, stone, glass — is what the
              photographs are for.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              The mark is the mountain and the tools that work it. The Matterhorn
              above Zermatt — a wooden mallet and a chisel, crossed underneath.
              Simple, because mountain building is already complicated.
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

      <section className="bg-bg px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="display-hero max-w-[14ch] text-[clamp(2.8rem,7vw,5.5rem)] text-fg">
            Ready when the lot is.
          </h2>
          <Link
            to="/contact"
            className="mt-8 inline-flex h-12 items-center bg-fg px-6 text-[0.75rem] font-medium tracking-[0.16em] text-bg uppercase"
          >
            Start a project
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
