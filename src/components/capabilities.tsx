import { services, site } from "@/lib/site";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative isolate overflow-hidden border-y border-line"
    >
      <img
        src="/images/blueprint-sheet.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover object-[center_18%] opacity-[0.72]"
      />
      <div className="blueprint-grid absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 bg-linear-to-b from-bg/50 via-bg/30 to-bg/60"
        aria-hidden
      />
      <div className="blueprint-marks absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Sheet A-101 · Capabilities</p>
            <h2 className="display-hero mt-3 text-[clamp(2.8rem,7vw,5.5rem)] text-fg">
              What we build
            </h2>
          </div>
          <div className="max-w-sm border border-line bg-bg/50 p-4 text-[0.7rem] tracking-[0.12em] text-muted uppercase">
            <p className="flex justify-between gap-4 text-sage">
              <span>{site.legal}</span>
              <span>A-101</span>
            </p>
            <p className="mt-2 flex justify-between gap-4">
              <span>{site.location}</span>
              <span>Scale 1/8″ = 1′-0″</span>
            </p>
            <p className="mt-2 text-faint">Not for construction · Rev 0</p>
          </div>
        </div>

        <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
          {services.map((s) => (
            <article key={s.num} className="vellum relative p-6 md:p-10">
              <span
                className="absolute top-4 right-4 size-2 border border-sage/50"
                aria-hidden
              />
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

        <p className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-[0.65rem] tracking-[0.18em] text-faint uppercase">
          <span>
            {site.name} · {site.peak} {site.peakElevation}
          </span>
          <span>{site.coordinates}</span>
          <span>Drawn for the lot</span>
        </p>
      </div>
    </section>
  );
}
