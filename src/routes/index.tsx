import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BuildTimeline } from "@/components/build-timeline";
import { CinematicVideo } from "@/components/cinematic-video";
import { ContactForm } from "@/components/contact-form";
import { FilmTile } from "@/components/film-tile";
import { Hero } from "@/components/hero";
import { LodgeMosaic } from "@/components/lodge-mosaic";
import { SiteShell } from "@/components/site-shell";
import { StatsMarquee } from "@/components/stats-marquee";
import { films, services, site, values } from "@/lib/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const drive = films.find((f) => f.id === "arrival")!;

  return (
    <SiteShell>
      <Hero />
      <StatsMarquee />

      <section className="border-b border-line bg-bg px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12 md:gap-16">
          <p className="eyebrow md:col-span-3">The studio</p>
          <div className="md:col-span-9">
            <h2 className="display-hero max-w-[18ch] text-[clamp(2.6rem,6vw,4.6rem)] text-fg">
              A construction company should show how something becomes built.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Matterhorn Construction, LLC is a Pagosa Springs builder for custom
              homes, design-build, and mountain remodels. We work the San Juans
              because we live in them — snow load, steep lots, and the last light
              on Pagosa Peak.
            </p>
          </div>
        </div>
      </section>

      <section id="work" className="bg-bg px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
            <div>
              <p className="eyebrow">Selected work · Tap any frame</p>
              <h2 className="display-hero mt-3 text-[clamp(2.8rem,7vw,5.5rem)] text-fg">
                Six Pines Ranch
              </h2>
            </div>
            <Link
              to="/work"
              className="hidden items-center gap-2 text-[0.75rem] font-medium tracking-[0.16em] text-muted uppercase transition-colors hover:text-fg md:inline-flex"
            >
              All films <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <LodgeMosaic />
          <Link
            to="/work"
            className="mt-8 inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.16em] text-muted uppercase md:hidden"
          >
            All films <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      <BuildTimeline />

      <section className="border-y border-line bg-bg px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Capabilities</p>
          <h2 className="display-hero mt-3 text-[clamp(2.8rem,7vw,5.5rem)] text-fg">
            What we build
          </h2>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
            {services.map((s) => (
              <article key={s.num} className="bg-bg p-6 md:p-10">
                <p className="font-display text-4xl text-sage">{s.num}</p>
                <h3 className="mt-6 font-display text-4xl tracking-[0.04em] text-fg">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
                  {s.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden min-h-[70vh]">
        <CinematicVideo src="/videos/pagosa-peak.mp4" poster="/images/pagosa-peak.jpg" />
        <div className="absolute inset-0 bg-bg/55" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
          <div className="md:col-span-7">
            <p className="eyebrow">
              {site.peak} · {site.coordinates}
            </p>
            <h2 className="display-hero mt-4 max-w-[12ch] text-[clamp(3rem,8vw,6rem)] text-fg">
              Built where the river meets the peaks.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Pagosa Peak at 12,658 feet. Ponderosa, frost, and a winter that does
              not bluff. We live here — then build houses that belong on these
              slopes.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex h-12 items-center border border-line px-5 text-[0.75rem] font-medium tracking-[0.16em] text-fg uppercase transition-colors hover:bg-fg hover:text-bg"
            >
              The studio
            </Link>
          </div>
          <ul className="flex flex-col justify-end gap-6 md:col-span-5">
            {values.map((v) => (
              <li key={v.title} className="border-t border-line pt-5">
                <h3 className="text-sm font-medium tracking-[0.08em] text-fg uppercase">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="grid bg-bg lg:grid-cols-2">
        <FilmTile shot={drive} playlist={films} className="min-h-[360px] aspect-auto lg:min-h-full" />
        <div className="px-5 py-16 md:px-12 md:py-24">
          <p className="eyebrow">Start a project</p>
          <h2 className="display-hero mt-3 text-[clamp(2.6rem,6vw,4.4rem)] text-fg">
            Tell us about the lot.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            New home, remodel, or a steep piece of ground that needs a plan.
            We read every brief.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
