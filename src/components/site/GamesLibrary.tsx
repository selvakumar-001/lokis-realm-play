import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import gamePlaceholder from "@/assets/game-placeholder.jpg";
import { fetchGames, type Game, type GameCategory } from "@/lib/games";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const FILTERS: Array<{ label: string; value: "All" | GameCategory }> = [
  { label: "All", value: "All" },
  { label: "PS5", value: "PS5" },
  { label: "SIM", value: "SIM" },
  { label: "Board Games", value: "Board Game" },
];

export function GamesLibrary() {
  const [games, setGames] = useState<Game[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [filter, setFilter] = useState<"All" | GameCategory>("All");

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetchGames(controller.signal)
      .then((result) => {
        setGames(result);
        setStatus("ready");
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Games sheet fetch failed:", error);
        setStatus("error");
      });
    return () => controller.abort();
  }, []);

  const visible = useMemo(
    () => (filter === "All" ? games : games.filter((game) => game.category === filter)),
    [games, filter],
  );

  return (
    <section id="games" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Games library"
          title="The Trickster's Collection"
          subtitle="Our live library — updated straight from the café's spreadsheet."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={cn(
                "rounded-full border px-5 py-2 font-display text-xs font-bold uppercase tracking-widest transition-all",
                filter === item.value
                  ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-gold)]"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {status === "loading" && (
          <div className="mt-14">
            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin text-primary" />
              Summoning the game library…
            </p>
            <div className="mt-8 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="card-realm overflow-hidden rounded-xl">
                  <div className="aspect-[3/4] animate-pulse bg-muted" />
                  <div className="space-y-2 p-4">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="card-realm mx-auto mt-14 max-w-lg rounded-xl p-8 text-center">
            <AlertTriangle className="mx-auto size-8 text-primary" />
            <h3 className="mt-4 text-xl font-bold">Loki hid the games list</h3>
            <p className="mt-2 text-muted-foreground">
              We couldn't load the library right now. Give us a call and we'll tell you exactly
              what's on the shelf.
            </p>
          </div>
        )}

        {status === "ready" && (
          <div className="mt-12 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((game) => (
              <article key={`${game.name}-${game.category}`} className="card-realm group overflow-hidden rounded-xl">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={game.imageUrl || gamePlaceholder}
                    alt={game.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = gamePlaceholder;
                    }}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-primary/40 bg-background/80 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-primary backdrop-blur-sm">
                    {game.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="truncate text-base font-bold" title={game.name}>
                    {game.name}
                  </h3>
                  {game.price && (
                    <p className="mt-1 text-sm text-muted-foreground">{game.price}</p>
                  )}
                </div>
              </article>
            ))}
            {visible.length === 0 && (
              <p className="col-span-full py-10 text-center text-muted-foreground">
                No titles in this category yet.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
