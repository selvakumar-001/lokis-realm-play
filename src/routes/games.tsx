import { createFileRoute } from "@tanstack/react-router";

import { PageHero, PageShell } from "@/components/site/PageShell";
import { GamesDirectory } from "@/components/site/GamesDirectory";

const title = "Games Library — Trickster Gaming Café";
const description =
  "Browse every game at Trickster: board games, PS5 titles and car simulators. Filter by player count to find the perfect pick for your crew.";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  return (
    <PageShell>
      <PageHero
        kicker="The Library"
        title="Games at Trickster"
        subtitle="Board games, PS5 titles and sim racing rigs — filter by how many players you've got."
      />
      <GamesDirectory />
    </PageShell>
  );
}