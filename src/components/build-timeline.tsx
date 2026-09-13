import { useEffect, useRef, useState } from "react";
import { phases } from "@/lib/site";
import { cn } from "@/lib/utils";

export function BuildTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
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
    const video = videoRef.current;
    if (!section || reduced) return;
    let raf = 0;
    let target = 0;
    let nearby = false;

    const seek = () => {
      if (!video || !nearby || video.seeking || !Number.isFinite(video.duration) || video.duration <= 0) return;
      const time = Math.min(video.duration - 1 / 24, target * video.duration);
      if (Math.abs(video.currentTime - time) >= 1 / 30) video.currentTime = Math.max(0, time);
    };
    const measure = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const total = Math.max(rect.height - window.innerHeight, 1);
      target = Math.max(0, Math.min(1, -rect.top / total));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${target})`;
      setPhaseIndex(Math.min(phases.length - 1, Math.floor(target * phases.length)));
      seek();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    const observer = new IntersectionObserver(([entry]) => {
      nearby = !!entry?.isIntersecting;
      if (nearby && video) {
        if (video.preload !== "auto") { video.preload = "auto"; video.load(); }
        schedule();
      }
    }, { rootMargin: "600px 0px" });
    observer.observe(section);
    // Finish the latest requested seek instead of queuing every scroll position.
    video?.addEventListener("seeked", seek);
    video?.addEventListener("loadeddata", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      video?.removeEventListener("seeked", seek);
      video?.removeEventListener("loadeddata", schedule);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-bg"
      style={{ height: reduced ? "auto" : `${phases.length * 100}vh` }}
    >
      <div
        className={cn(
          "flex flex-col justify-end overflow-hidden bg-bg",
          reduced ? "relative min-h-[85vh]" : "sticky top-0 h-dvh",
        )}
      >
        <div className="absolute inset-0 bg-bg">
          <img
            src={phase.image}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          {reduced ? null : (
            <video
              ref={videoRef}
              className="absolute inset-0 size-full object-cover"
              muted
              playsInline
              preload="none"
              poster="/images/hero-excavator.jpg"
              aria-hidden
            >
              <source src="/videos/build-timeline-scrub.mp4" type="video/mp4" />
            </video>
          )}
          <div
            className="absolute inset-0 bg-linear-to-t from-bg via-bg/25 to-bg/30"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-linear-to-r from-bg/70 via-transparent to-bg/30"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-5 pt-28 pb-10 md:px-8 md:pt-28 md:pb-14">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow">The build</p>
              <p className="mt-3 max-w-sm text-sm text-muted">
                Scroll through the build. Breaking ground to lights on and keys delivered.
              </p>
            </div>
            <p className="font-display text-5xl tracking-[0.04em] text-fg/90 tabular-nums md:text-7xl">
              {phase.num}
              <span className="text-faint">
                {" "}
                / {String(phases.length).padStart(2, "0")}
              </span>
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="eyebrow">{phase.kicker}</p>
              <h2 className="display-hero mt-3 text-[clamp(3.2rem,9vw,6.4rem)] text-fg">
                {phase.title}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted md:text-lg">
                {phase.copy}
              </p>
            </div>
            <ol className="hidden flex-col gap-1 md:col-span-5 md:flex">
              {phases.map((p, i) => (
                <li
                  key={p.id}
                  className={cn(
                    "flex items-baseline justify-between border-t border-line py-2.5 text-sm tracking-[0.12em] uppercase transition-colors",
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

        <div className="relative z-10 px-5 pb-6 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative h-[2px] bg-elevated">
              <div
                ref={progressRef}
                className="absolute inset-0 origin-left bg-sage"
                style={{ transform: "scaleX(0)" }}
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
