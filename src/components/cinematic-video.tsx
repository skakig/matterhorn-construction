import { cn } from "@/lib/utils";

export function CinematicVideo({
  src,
  poster,
  className,
  autoPlay = true,
}: {
  src: string;
  poster: string;
  className?: string;
  autoPlay?: boolean;
}) {
  return (
    <>
      <video
        className={cn("absolute inset-0 size-full object-cover motion-reduce:hidden", className)}
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden
      >
        <source src={src} type="video/mp4" />
      </video>
      <img
        src={poster}
        alt=""
        className={cn(
          "absolute inset-0 size-full object-cover",
          autoPlay ? "hidden motion-reduce:block" : "",
          className,
        )}
      />
    </>
  );
}
