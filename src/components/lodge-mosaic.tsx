import { FilmTile } from "@/components/film-tile";
import { lodgeShots } from "@/lib/site";

export function LodgeMosaic() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {lodgeShots.map((shot) => (
        <FilmTile key={shot.id} shot={shot} playlist={lodgeShots} />
      ))}
    </div>
  );
}
