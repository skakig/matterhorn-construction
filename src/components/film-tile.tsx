import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useFilm } from "@/components/film-lightbox";
import type { FilmShot } from "@/lib/site";
import { cn } from "@/lib/utils";

export function FilmTile({
  shot,
  playlist,
  className,
}: {
  shot: FilmShot;
  playlist?: FilmShot[];
  className?: string;
}) {
  const { open } = useFilm();
  const videoRef = useRef<HTMLVideoElement>(null);
  const tileRef = useRef<HTMLButtonElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = tileRef.current;
    const video = videoRef.current;
    if (!el || !video || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void video.play();
        else video.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, shot?.id]);

  if (!shot) return null;

  return (
    <button
      ref={tileRef}
      type="button"
      onClick={() => open(shot, playlist)}
      className={cn(
        "group relative isolate block aspect-[16/10] w-full overflow-hidden bg-surface text-left",
        className,
      )}
      aria-label={`Play film: ${shot.title}`}
    >
      <img
        src={shot.src}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      {reduced ? null : (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={shot.src}
          aria-hidden
        >
          <source src={shot.video} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/10 to-transparent" />
      <span className="play-badge absolute top-4 left-4 flex size-12 items-center justify-center rounded-full border border-line bg-bg/45 text-fg backdrop-blur-md transition-transform duration-150 group-hover:scale-105 group-active:scale-[0.96] md:top-5 md:left-5">
        <Play className="size-4 fill-current translate-x-px" />
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-6">
        <div>
          <p className="eyebrow">{shot.caption}</p>
          <h3 className="mt-1 font-display text-3xl tracking-[0.04em] text-fg md:text-4xl">
            {shot.title}
          </h3>
        </div>
      </div>
    </button>
  );
}
