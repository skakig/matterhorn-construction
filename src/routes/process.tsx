import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BuildTimeline } from "@/components/build-timeline";
import { SiteShell } from "@/components/site-shell";
import { phases } from "@/lib/site";

export const Route = createFileRoute("/process")({ component: ProcessPage });

function PhaseFilm({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          video.muted = true;
          void video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return (
    <div className="relative isolate aspect-video overflow-hidden bg-surface">
      <img
        src={poster}
        alt=""
        className="ken-burns absolute inset-0 size-full object-cover"
      />
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover motion-reduce:hidden"
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

function ProcessPage() {
  return (
    <SiteShell>
      <section className="border-b border-line bg-bg px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Process</p>
          <h1 className="display-hero mt-4 max-w-[16ch] text-[clamp(3.4rem,10vw,7.5rem)] text-fg">
            From concept to realization.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Explore five stages of a conceptual mountain home, including a
            dormer design variation. These renderings illustrate the building
            process rather than document a completed project.
          </p>
        </div>
      </section>
      <BuildTimeline />
      <section className="border-t border-line bg-bg px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          {phases.map((p) => (
            <article key={p.id}>
              <PhaseFilm src={p.video} poster={p.image} />
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
