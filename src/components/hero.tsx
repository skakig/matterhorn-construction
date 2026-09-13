import { Link } from "@tanstack/react-router";
import { ArrowDown, Play } from "lucide-react";
import { CinematicVideo } from "@/components/cinematic-video";
import { useFilm } from "@/components/film-lightbox";
import { approachFilm, films, site } from "@/lib/site";

export function Hero() {
  const { open } = useFilm();

  return (
    <section className="relative isolate h-dvh min-h-[640px] overflow-hidden bg-bg">
      <CinematicVideo
        src="/videos/hero-film.mp4"
        poster="/images/hero-lodge.jpg"
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-bg/80 via-bg/35 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-bg/30"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-10 pt-28 md:px-8 md:pb-14">
        <p className="eyebrow reveal">
          {site.location} · {site.peak} {site.peakElevation}
        </p>
        <h1 className="display-hero reveal reveal-d1 mt-5 max-w-[14ch] text-[clamp(4.2rem,14vw,9.5rem)] text-fg">
          Built for the
          <br />
          high country.
        </h1>
        <div className="reveal reveal-d2 mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            Custom homes, timber lodges, and remodeling in Pagosa Springs, Colorado.
            Engineered for 7,000-foot winters — {site.coordinates}.
          </p>
          <div className="cta-glass flex w-full max-w-md flex-col gap-3 p-5 sm:p-6">
            <p className="font-display text-3xl tracking-[0.04em] text-fg md:text-4xl">
              From conceptuals to realization.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => open(approachFilm, films)}
                className="inline-flex h-12 items-center justify-center gap-2 bg-fg px-5 text-[0.75rem] font-medium tracking-[0.16em] text-bg uppercase transition-transform duration-150 active:scale-[0.96]"
              >
                <Play className="size-3.5 fill-current" />
                Watch the film
              </button>
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center border border-line px-5 text-[0.75rem] font-medium tracking-[0.16em] text-fg uppercase transition-colors duration-150 hover:bg-fg hover:text-bg active:scale-[0.96]"
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>
        <a
          href="#process"
          className="reveal reveal-d3 mt-10 inline-flex items-center gap-2 self-start text-[0.7rem] font-medium tracking-[0.2em] text-muted uppercase transition-colors hover:text-fg"
        >
          <ArrowDown className="size-3.5" />
          Scroll the build
        </a>
      </div>
    </section>
  );
}
