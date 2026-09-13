import { seo } from "@/lib/seo";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { CinematicVideo } from "@/components/cinematic-video";
import { FilmTile } from "@/components/film-tile";
import { useFilm } from "@/components/film-lightbox";
import { SiteShell } from "@/components/site-shell";
import { films, projects } from "@/lib/site";

export const Route = createFileRoute("/work/$slug")({
  component: ProjectPage,
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => loaderData ? seo(
    `/work/${loaderData.project.slug}`,
    `${loaderData.project.title} | Pagosa Springs Custom Home | Matterhorn`,
    loaderData.project.excerpt,
  ) : { meta: [{ name: "robots", content: "noindex" }] },
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const { open } = useFilm();
  const hero = project.gallery[0] ?? films[1]!;

  return (
    <SiteShell>
      <section className="relative isolate min-h-[70vh] overflow-hidden bg-bg">
        {project.video ? (
          <CinematicVideo src={project.video} poster={project.image} />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 size-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/30 to-bg/40" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-5 pb-12 pt-28 md:px-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.18em] text-muted uppercase hover:text-fg"
          >
            <ArrowLeft className="size-3.5" /> Work
          </Link>
          <p className="eyebrow mt-6">
            {project.type} · {project.location} · {project.year}
          </p>
          <h1 className="display-hero mt-3 text-[clamp(3.4rem,10vw,7.5rem)] text-fg">
            {project.title}
          </h1>
          <button
            type="button"
            onClick={() => open(hero, project.gallery)}
            className="mt-8 inline-flex h-12 w-fit items-center gap-2 bg-fg px-5 text-[0.75rem] font-medium tracking-[0.16em] text-bg uppercase transition-transform duration-150 active:scale-[0.96]"
          >
            <Play className="size-3.5 fill-current" />
            Watch the film
          </button>
        </div>
      </section>

      <section className="border-b border-line bg-bg px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
          <dl className="grid grid-cols-2 gap-6 md:col-span-4">
            <div>
              <dt className="eyebrow">Type</dt>
              <dd className="mt-2 text-sm text-fg">{project.type}</dd>
            </div>
            <div>
              <dt className="eyebrow">Size</dt>
              <dd className="mt-2 text-sm text-fg">{project.size}</dd>
            </div>
            <div>
              <dt className="eyebrow">Location</dt>
              <dd className="mt-2 text-sm text-fg">{project.location}</dd>
            </div>
            <div>
              <dt className="eyebrow">Year</dt>
              <dd className="mt-2 text-sm text-fg">{project.year}</dd>
            </div>
          </dl>
          <div className="md:col-span-8">
            <p className="max-w-2xl text-xl leading-relaxed text-fg md:text-2xl">
              {project.excerpt}
            </p>
            {project.body.map((para) => (
              <p key={para} className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto grid max-w-7xl gap-2 sm:grid-cols-2">
          {project.gallery.map((shot) => (
            <FilmTile key={shot.id} shot={shot} playlist={project.gallery} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <Link
          to="/contact"
          className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 py-12 md:px-8"
        >
          <div>
            <p className="eyebrow">Start a project</p>
            <p className="mt-2 font-display text-4xl tracking-[0.04em] text-fg md:text-6xl">
              We help build dreams.
            </p>
          </div>
          <ArrowRight className="mb-1 size-6 text-fg" />
        </Link>
      </section>
    </SiteShell>
  );
}
