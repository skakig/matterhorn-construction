import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact-form";
import { FilmTile } from "@/components/film-tile";
import { SiteShell } from "@/components/site-shell";
import { films, site } from "@/lib/site";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const stream = films.find((f) => f.id === "stream")!;

  return (
    <SiteShell>
      <section className="grid min-h-dvh bg-bg lg:grid-cols-2">
        <FilmTile
          shot={stream}
          playlist={films}
          className="min-h-[42vh] aspect-auto lg:min-h-dvh"
        />
        <div className="flex flex-col justify-center px-5 py-24 md:px-12 lg:px-16">
          <p className="eyebrow">
            {site.location} · {site.peak}
          </p>
          <h1 className="display-hero mt-4 text-[clamp(3rem,8vw,5.5rem)] text-fg">
            We help build dreams.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            A new home, a remodel, a piece of mountain that needs a plan.
            Leave a number and when you want to break ground. We’ll call.
          </p>
          <p className="mt-3 text-sm text-fg">{site.owner} · Owner, {site.legal}</p>
          <a href={site.phoneHref} className="mt-2 text-lg text-fg hover:text-sage">{site.phoneLabel}</a>
          <a
            href={`mailto:${site.email}`}
            className="mt-1 text-sm text-muted transition-colors hover:text-sage"
          >
            {site.email}
          </a>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
