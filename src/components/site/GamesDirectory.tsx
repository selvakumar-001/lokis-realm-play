/**
 * GAMES PAGE DIRECTORY
 * --------------------
 * Renders the library as three stacked sections — Board Games,
 * PS5 Games and Car Simulators — each with its own player-count
 * filter chips (1 / 2 / 3–4 / 5+). Data comes from the Games sheet.
 */
import { useMemo, useState } from "react";
import { AlertTriangle, CarFront, Dices, Gamepad2, Loader2, Users } from "lucide-react";

import gamePlaceholder from "@/assets/game-placeholder.jpg";
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  PLAYER_BUCKETS,
  PLAYER_BUCKET_LABELS,
  matchesBucket,
  type CategoryKey,
  type Game,
  type PlayerBucket,
} from "@/lib/content";
import { useGamesQuery } from "@/hooks/use-cms";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<CategoryKey, typeof Dices> = {
  board: Dices,
  ps5: Gamepad2,
  sim: CarFront,
};

type BucketFilter = "all" | PlayerBucket;

export function GamesDirectory() {
  const query = useGamesQuery();
  const games = query.data ?? [];

  const grouped = useMemo(() => {
    const map = new Map<CategoryKey, Game[]>();
    for (const key of CATEGORY_ORDER) map.set(key, []);
    for (const game of games) map.get(game.category)?.push(game);
    return map;
  }, [games]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28">
      {/* Quick jump between categories */}
      {query.isSuccess && games.length > 0 && (
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {CATEGORY_ORDER.map((key) => (
            <a
              key={key}
              href={`#category-${key}`}
              className="rounded-full border border-border px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {CATEGORY_META[key].label}
            </a>
          ))}
        </div>
      )}

      {query.isPending && <GamesSkeleton />}

      {query.isError && (
        <div className="card-realm mx-auto mt-6 max-w-lg rounded-xl p-8 text-center">
          <AlertTriangle className="mx-auto size-8 text-primary" />
          <h3 className="mt-4 font-display text-xl font-bold">Loki hid the games list</h3>
          <p className="mt-2 text-muted-foreground">
            We couldn't load the library right now. Give us a call and we'll tell you exactly
            what's on the shelf.
          </p>
          <button
            type="button"
            onClick={() => query.refetch()}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110"
          >
            Try again
          </button>
        </div>
      )}

      {query.isSuccess &&
        (games.length === 0 ? (
          <div className="card-realm mx-auto mt-6 max-w-lg rounded-xl p-8 text-center">
            <Dices className="mx-auto size-8 text-primary" />
            <h3 className="mt-4 font-display text-xl font-bold">The shelf is being restocked</h3>
            <p className="mt-2 text-muted-foreground">
              No games in the library yet — check back soon.
            </p>
          </div>
        ) : (
          CATEGORY_ORDER.map((key) => (
            <CategorySection key={key} categoryKey={key} games={grouped.get(key) ?? []} />
          ))
        ))}
    </div>
  );
}

function CategorySection({ categoryKey, games }: { categoryKey: CategoryKey; games: Game[] }) {
  const [bucket, setBucket] = useState<BucketFilter>("all");
  const meta = CATEGORY_META[categoryKey];
  const Icon = CATEGORY_ICONS[categoryKey];

  const counts = useMemo(() => {
    const map = new Map<BucketFilter, number>();
    map.set("all", games.length);
    for (const value of PLAYER_BUCKETS) {
      map.set(
        value,
        games.filter((game) => matchesBucket(game.players, value)).length,
      );
    }
    return map;
  }, [games]);

  const visible = useMemo(
    () => (bucket === "all" ? games : games.filter((game) => matchesBucket(game.players, bucket))),
    [games, bucket],
  );

  return (
    <section id={`category-${categoryKey}`} className="scroll-mt-24 py-10 first:pt-4">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <Icon className="size-6" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{meta.label}</h2>
            <p className="text-sm text-muted-foreground">{meta.blurb}</p>
          </div>
        </div>
        <span className="rounded-full border border-primary/30 bg-background/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
          {games.length} {games.length === 1 ? "title" : "titles"}
        </span>
      </div>

      {/* Player-count filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip
          active={bucket === "all"}
          onClick={() => setBucket("all")}
          label={`All (${counts.get("all") ?? 0})`}
        />
        {PLAYER_BUCKETS.map((value) => (
          <FilterChip
            key={value}
            active={bucket === value}
            onClick={() => setBucket(value)}
            label={`${PLAYER_BUCKET_LABELS[value]} (${counts.get(value) ?? 0})`}
          />
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="mt-7 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p className="card-realm mt-7 rounded-xl p-6 text-center text-sm text-muted-foreground">
          Nothing here for that group size yet — try another filter.
        </p>
      )}
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-gold)]"
          : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary",
      )}
    >
      <Users className="size-3.5" />
      {label}
    </button>
  );
}

function GameCard({ game }: { game: Game }) {
  return (
    <article className="card-realm group overflow-hidden rounded-xl">
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
        {game.playersLabel && (
          <span className="absolute left-3 top-3 rounded-full border border-primary/40 bg-background/80 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-primary backdrop-blur-sm">
            {game.playersLabel} players
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="truncate text-base font-bold" title={game.name}>
          {game.name}
        </h3>
        {game.price && <p className="mt-1 text-sm text-muted-foreground">{game.price}</p>}
      </div>
    </article>
  );
}

function GamesSkeleton() {
  return (
    <div className="mt-6">
      <p className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin text-primary" />
        Summoning the game library…
      </p>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
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
  );
}