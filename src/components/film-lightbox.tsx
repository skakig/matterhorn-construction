import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { FilmShot } from "@/lib/site";
import { cn } from "@/lib/utils";

type FilmSession = {
  playlist: FilmShot[];
  index: number;
};

type FilmContextValue = {
  open: (shot: FilmShot, playlist?: FilmShot[]) => void;
  close: () => void;
  session: FilmSession | null;
};

const FilmContext = createContext<FilmContextValue | null>(null);

export function useFilm() {
  const ctx = useContext(FilmContext);
  if (!ctx) throw new Error("useFilm must be used within FilmProvider");
  return ctx;
}

export function FilmProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<FilmSession | null>(null);

  const open = useCallback((shot: FilmShot, playlist?: FilmShot[]) => {
    const list = playlist && playlist.length > 0 ? playlist : [shot];
    const index = Math.max(0, list.findIndex((f) => f.id === shot.id));
    setSession({ playlist: list, index: index === -1 ? 0 : index });
  }, []);

  const close = useCallback(() => setSession(null), []);

  const value = useMemo(() => ({ open, close, session }), [open, close, session]);

  return (
    <FilmContext.Provider value={value}>
      {children}
      <FilmLightbox />
    </FilmContext.Provider>
  );
}

function FilmLightbox() {
  const { session, close, open } = useFilm();
  const videoRef = useRef<HTMLVideoElement>(null);
  const shot = session ? session.playlist[session.index] : null;
  const hasMany = (session?.playlist.length ?? 0) > 1;

  useEffect(() => {
    if (!session) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight" && session.playlist.length > 1) {
        const next = (session.index + 1) % session.playlist.length;
        open(session.playlist[next]!, session.playlist);
      }
      if (e.key === "ArrowLeft" && session.playlist.length > 1) {
        const next =
          (session.index - 1 + session.playlist.length) % session.playlist.length;
        open(session.playlist[next]!, session.playlist);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [session, close, open]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !shot) return;
    v.currentTime = 0;
    void v.play();
  }, [shot?.id]);

  if (!session || !shot) return null;

  const go = (dir: 1 | -1) => {
    const next =
      (session.index + dir + session.playlist.length) % session.playlist.length;
    open(session.playlist[next]!, session.playlist);
  };

  return (
    <div
      className="cinema-overlay fixed inset-0 z-[80] flex flex-col bg-bg"
      role="dialog"
      aria-modal
      aria-label={shot.title}
    >
      {shot.video ? (
        <video
          key={shot.id}
          ref={videoRef}
          className="absolute inset-0 size-full object-cover outline-none"
          autoPlay
          muted
          loop
          playsInline
          poster={shot.src}
        >
          <source src={shot.video} type="video/mp4" />
        </video>
      ) : (
        <img
          key={shot.id}
          src={shot.src}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg via-transparent to-bg/40" />

      <div className="relative z-10 flex items-start justify-between px-5 pt-5 md:px-8 md:pt-6">
        <p className="eyebrow">
          Film {String(session.index + 1).padStart(2, "0")} /{" "}
          {String(session.playlist.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={close}
          className="flex size-12 items-center justify-center border border-line bg-bg/40 text-fg backdrop-blur-md transition-transform duration-150 active:scale-[0.96]"
          aria-label="Close film"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative z-10 mt-auto flex items-end justify-between gap-4 px-5 pb-8 md:px-8 md:pb-10">
        <div className="min-w-0">
          <p className="eyebrow">{shot.caption}</p>
          <h2 className="mt-2 font-display text-5xl tracking-[0.04em] text-fg md:text-7xl">
            {shot.title}
          </h2>
          <Link
            to="/work/$slug"
            params={{ slug: shot.slug }}
            onClick={close}
            className="mt-5 inline-flex h-12 items-center bg-fg px-5 text-[0.75rem] font-medium tracking-[0.16em] text-bg uppercase transition-transform duration-150 active:scale-[0.96]"
          >
            View the lodge
          </Link>
        </div>
        {hasMany ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex size-12 items-center justify-center border border-line bg-bg/40 text-fg backdrop-blur-md transition-transform duration-150 active:scale-[0.96]"
              aria-label="Previous film"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="flex size-12 items-center justify-center border border-line bg-bg/40 text-fg backdrop-blur-md transition-transform duration-150 active:scale-[0.96]"
              aria-label="Next film"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
