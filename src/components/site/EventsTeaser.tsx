/**
 * HOME PAGE EVENTS TEASER
 * -----------------------
 * Shows the next few upcoming events (or the most recent ones if
 * nothing is scheduled) with a link to the full Events page.
 */
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { isEventUpcoming } from "@/lib/content";
import { useEvents } from "@/hooks/use-cms";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { EventCard } from "./EventsList";

export function EventsTeaser() {
  const events = useEvents();
  if (events.length === 0) return null;

  const upcoming = events.filter(isEventUpcoming);
  const showcase = (upcoming.length > 0 ? upcoming : events).slice(0, 3);

  return (
    <section className="relative py-24">
      <div className="absolute inset-x-0 top-0 gold-rule opacity-40" />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="What's on"
          title="Events at the Realm"
          subtitle="Tournaments, themed nights and community meetups — don't miss the next one."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="realmOutline" size="lg">
            <Link to="/events">
              See All Events
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}