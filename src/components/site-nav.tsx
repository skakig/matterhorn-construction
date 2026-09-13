import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300",
        scrolled || open ? "nav-blur border-b border-line" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 md:h-[5rem] md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-[0.8rem] font-medium tracking-[0.16em] uppercase transition-colors duration-200",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-fg"
                  : "text-muted hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="inline-flex h-11 items-center bg-fg px-4 text-[0.75rem] font-medium tracking-[0.14em] text-bg uppercase transition-transform duration-150 active:scale-[0.96]"
          >
            Start a project
          </Link>
        </nav>
        <button
          type="button"
          className="flex size-12 items-center justify-center text-fg lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-bg px-5 py-8 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="py-3 font-display text-4xl tracking-[0.06em] text-fg"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-4 inline-flex h-12 items-center justify-center bg-fg text-sm font-medium tracking-[0.16em] text-bg uppercase"
            >
              Start a project
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
