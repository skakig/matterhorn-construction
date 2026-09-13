import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Matterhorn (Zermatt) with wooden mallet and chisel crossed underneath. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={cn("block", className)} aria-hidden>
      <rect
        x="7"
        y="7"
        width="186"
        height="186"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <path
        fill="currentColor"
        d="M28 132
           C48 96 68 62 86 34
           L100 16
           L114 40
           L128 28
           L140 50
           C154 80 168 106 178 132
           Z"
      />
      <path
        fill="var(--color-sage)"
        opacity="0.85"
        d="M100 16 L114 40 L128 28 L140 50 C152 76 164 100 174 122 L100 122 Z"
      />
      {/* crossed mallet + chisel under the peak */}
      <g fill="currentColor" transform="translate(100 158)">
        <g transform="rotate(-48)">
          <ellipse cx="0" cy="-22" rx="15" ry="9" />
          <rect x="-4" y="-16" width="8" height="40" rx="2.4" />
        </g>
        <g transform="rotate(48)">
          <rect x="-3.4" y="-28" width="6.8" height="36" rx="2" />
          <path d="M-7 8 L7 8 L0 24 Z" />
        </g>
      </g>
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  wordmark = true,
}: {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-3 text-fg no-underline", className)}
      aria-label="Matterhorn Construction home"
    >
      <img
        src="/brand/mark.png"
        alt=""
        className={cn("size-12 shrink-0 object-contain outline-none md:size-14", markClassName)}
      />
      {wordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.45rem] tracking-[0.14em] md:text-[1.6rem]">
            MATTERHORN
          </span>
          <span className="text-[0.62rem] font-medium tracking-[0.28em] text-muted">
            CONSTRUCTION
          </span>
        </span>
      ) : null}
    </Link>
  );
}
