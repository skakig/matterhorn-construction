import type { ReactNode } from "react";
import { FilmProvider } from "@/components/film-lightbox";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <FilmProvider>
      <div className="flex min-h-dvh flex-col bg-bg text-fg">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </FilmProvider>
  );
}
