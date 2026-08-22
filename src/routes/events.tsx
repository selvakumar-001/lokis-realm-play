import { createFileRoute } from "@tanstack/react-router";

import { PageHero, PageShell } from "@/components/site/PageShell";
import { EventsList } from "@/components/site/EventsList";

const title = "Events — Trickster Gaming Café";
const description =
  "Tournaments, themed nights and community meetups at Trickster gaming café. See what's coming up and join the mischief.";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Mark Your Calendar"
        title="Events at the Realm"
        subtitle="Tournaments, themed nights and community meetups — posted straight from the café's calendar."
      />
      <EventsList />
    </PageShell>
  );
}