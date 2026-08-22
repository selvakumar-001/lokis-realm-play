/**
 * HOME PAGE GAMES PREVIEW
 * -----------------------
 * A taste of the library: up to 8 titles across the three categories,
 * with a button through to the full, filterable Games page.
 */
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import gamePlaceholder from "@/assets/game-placeholder.jpg";
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  type CategoryKey,
  type Game,
} from "@/lib/content";
import { useGamesQuery } from "@/hooks/use-cms";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

const PREVIEW_COUNT = 8;

export function GamesLibrary() {
  const query = useGamesQuery();
  const games = query.data ?? [];

  if (!query.isSuccess || games.length === 0) return null;

  // Interleave categories so the preview shows all three.
  const byCategory = new Map<CategoryKey, Game[]>();
  for (const key of CATEGORY_ORDER) byCategory.set(key, []);
  for (const game of games) byCategory.get(game.category)?.push(game);

  const preview: Game[] = [];
  let added = true;
  while (preview.length < PREVIEW_COUNT && added) {
    added = false;
    for (const key of CATEGORY_ORDER) {
      const next = byCategory.get(key)?.shift();
      if (next) {
        preview.push(next);
        added = true;
        if (preview.length >= PREVIEW_COUNT) break;
      }
    }
  }

  return (
    <section id="games" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Games library"
          title="The Trickster's Collection"
          subtitle="A live peek at our shelf — board games, PS5 titles and sim rigs, updated straight from the café's spreadsheet."
        />

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {preview.map((game) => (
            <article
              key={game.id}
              className="card-realm group overflow-hidden rounded-xl"
            >
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
                  {CATEGORY_META[game.category].label}
                </span>
              </div>
              <div className="p-4">
                <h3 className="truncate text-base font-bold" title={game.name}>
                  {game.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {[game.playersLabel ? `${game.playersLabel} players` : "", game.price]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="realm" size="lg">
            <Link to="/games">
              View Full Library
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}