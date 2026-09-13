import { createFileRoute } from "@tanstack/react-router";
import { FilmTile } from "@/components/film-tile";
import { SiteShell } from "@/components/site-shell";
import { films, site } from "@/lib/site";

export const Route = createFileRoute("/work")({ component: WorkPage });

const workFilms = films.filter((f) => f.id !== "approach");

function WorkPage() {
  return (
    <SiteShell>
      <section className="border-b border-line bg-bg px-5 pb-8 pt-28 md:px-8 md:pb-10 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Selected work · Tap any frame to play</p>
          <h1 className="display-hero mt-3 max-w-[16ch] text-[clamp(2.8rem,7vw,5.5rem)] text-fg">
            Six Pines Ranch
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Heavy timber, a built stream, antler work, and a lawn that looks at{" "}
            {site.peakElevation}. Films from the lot — {site.coordinates}.
          </p>
        </div>
      </section>
      <section className="bg-bg px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto grid max-w-7xl gap-2 sm:grid-cols-2">
          {workFilms.map((shot) => (
            <FilmTile key={shot.id} shot={shot} playlist={workFilms} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
