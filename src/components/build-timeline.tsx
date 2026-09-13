import { useEffect, useRef, useState } from "react";
import { phases } from "@/lib/site";
import { cn } from "@/lib/utils";

export function BuildTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  const phaseIndex = Math.min(
    phases.length - 1,
    Math.floor(progress * phases.length),
  );
  const phase = phases[phaseIndex] ?? phases[0];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    let target = 0;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      target = total > 0 ? scrolled / total : 0;
    };

    const tick = () => {
      setProgress((prev) => {
        const next = prev + (target - prev) * 0.18;
        if (Math.abs(next - prev) < 0.0004) return target;
        return next;
      });
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => measure();
    measure();
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (!reduced && i === phaseIndex) void video.play();
      else video.pause();
    });
  }, [phaseIndex, reduced]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-bg"
      style={{ height: reduced ? "auto" : "400vh" }}
    >
      <div
        className={cn(
          "flex flex-col justify-end overflow-hidden bg-bg",
          reduced ? "relative min-h-[85vh]" : "sticky top-0 h-dvh",
        )}
      >
        <div className="absolute inset-0">
          {phases.map((p, i) => {
            const opacity = reduced
              ? i === phaseIndex
                ? 1
                : 0
              : Math.max(0, 1 - Math.abs(progress * phases.length - i - 0.5) * 1.15);
            return (
              <div
                key={p.id}
                className="absolute inset-0"
                style={{ opacity, zIndex: i === phaseIndex ? 2 : 1 }}
              >
                <img
                  src={p.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
                {reduced ? null : (
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    className="absolute inset-0 size-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={p.image}
                    aria-hidden
                  >
                    <source src={p.video} type="video/mp4" />
                  </video>
                )}
              </div>
            );
          })}
          <div
            className="absolute inset-0 z-10 bg-linear-to-t from-bg via-bg/25 to-bg/40"
            aria-hidden
          />
          <div
            className="absolute inset-0 z-10 bg-linear-to-r from-bg/70 via-transparent to-bg/40"
            aria-hidden
          />
        </div>

        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-5 py-10 md:px-8 md:py-14">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow">The build</p>
              <p className="mt-3 max-w-sm text-sm text-muted">
                Scroll to walk a house from dirt to dusk. Four phases. One site.
              </p>
            </div>
            <p className="font-display text-5xl tracking-[0.04em] text-fg/90 tabular-nums md:text-7xl">
              {phase.num}
              <span className="text-faint"> / 04</span>
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="eyebrow">{phase.kicker}</p>
              <h2 className="display-hero mt-3 text-[clamp(3.5rem,10vw,7rem)] text-fg">
                {phase.title}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted md:text-lg">
                {phase.copy}
              </p>
            </div>
            <ol className="hidden flex-col gap-2 md:col-span-5 md:flex">
              {phases.map((p, i) => (
                <li
                  key={p.id}
                  className={cn(
                    "flex items-baseline justify-between border-t border-line py-3 text-sm tracking-[0.12em] uppercase transition-colors",
                    i === phaseIndex ? "text-fg" : "text-faint",
                  )}
                >
                  <span>
                    {p.num} {p.title}
                  </span>
                  {i === phaseIndex ? <span className="text-sage">Live</span> : null}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="relative z-20 px-5 pb-6 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative h-[2px] bg-elevated">
              <div
                className="absolute inset-y-0 left-0 bg-sage"
                style={{ width: `${Math.min(100, progress * 100)}%` }}
              />
              {phases.map((_, i) => (
                <span
                  key={i}
                  className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg"
                  style={{ left: `${((i + 0.5) / phases.length) * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
