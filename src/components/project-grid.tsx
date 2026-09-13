import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className={cn(
        "group relative block overflow-hidden bg-surface",
        featured ? "md:col-span-2 md:row-span-2 min-h-[420px] md:min-h-[640px]" : "min-h-[320px] md:min-h-[380px]",
      )}
      onMouseEnter={() => {
        const v = videoRef.current;
        if (v) void v.play();
      }}
      onMouseLeave={() => {
        const v = videoRef.current;
        if (v) {
          v.pause();
        }
      }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {project.video ? (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.image}
          aria-hidden
        >
          <source src={project.video} type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8">
        <p className="eyebrow">
          {project.type} · {project.year}
        </p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-4xl tracking-[0.04em] text-fg md:text-5xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{project.location}</p>
          </div>
          <span className="flex size-10 items-center justify-center border border-line text-fg transition-colors group-hover:bg-fg group-hover:text-bg">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectGrid({
  featuredFirst = true,
}: {
  featuredFirst?: boolean;
}) {
  const [first, ...rest] = projects;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {featuredFirst && first ? <ProjectCard project={first} featured /> : null}
      {(featuredFirst ? rest : projects).map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
