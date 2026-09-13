import { stats } from "@/lib/site";

export function StatsMarquee() {
  const items = [...stats, ...stats];
  return (
    <section className="overflow-hidden border-y border-line bg-surface" aria-label="Studio facts">
      <div className="marquee-track flex w-max">
        {items.map((stat, i) => (
          <div
            key={`${stat.label}-${i}`}
            className="flex items-baseline gap-3 px-8 py-6 md:px-14 md:py-8"
          >
            <span className="font-display text-4xl tracking-[0.04em] text-fg md:text-5xl">
              {stat.value}
            </span>
            <span className="text-[0.7rem] font-medium tracking-[0.18em] text-sage uppercase">
              {stat.unit}
            </span>
            <span className="text-sm text-muted">{stat.label}</span>
            <span className="ml-8 size-1.5 rounded-full bg-sage/70" aria-hidden />
          </div>
        ))}
      </div>
    </section>
  );
}
