/**
 * EVENTS LIST
 * -----------
 * Grid of event cards fed by the Events sheet tab.
 * Exports EventCard for reuse in the home-page teaser.
 */
import { CalendarX2, Clock, Instagram, Ticket } from "lucide-react";

import gamePlaceholder from "@/assets/game-placeholder.jpg";
import { formatEventDate, isEventUpcoming, type CafeEvent } from "@/lib/content";
import { useEvents } from "@/hooks/use-cms";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";

export function EventsList() {
  const events = useEvents();

  if (events.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-5 pb-28">
        <div className="card-realm mx-auto max-w-lg rounded-xl p-8 text-center">
          <CalendarX2 className="mx-auto size-8 text-primary" />
          <h3 className="mt-4 font-display text-xl font-bold">Nothing on the calendar yet</h3>
          <p className="mt-2 text-muted-foreground">
            New events are posted here as they're planned. Follow us on Instagram so you don't miss
            the next one.
          </p>
          <Button asChild variant="realmOutline" className="mt-6">
            <a href={site.contact.instagram} target="_blank" rel="noreferrer">
              <Instagram className="size-4" />
              Follow on Instagram
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export function EventCard({ event }: { event: CafeEvent }) {
  const upcoming = isEventUpcoming(event);
  const month = event.date?.toLocaleDateString("en-IN", { month: "short" }) ?? "";
  const day = event.date?.getDate();

  return (
    <article className="card-realm group flex flex-col overflow-hidden rounded-xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.imageUrl || gamePlaceholder}
          alt={event.title || "Café event"}
          loading="lazy"
          onError={(current) => {
            current.currentTarget.src = gamePlaceholder;
          }}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

        {day !== undefined && (
          <div className="absolute left-3 top-3 rounded-lg border border-primary/40 bg-background/85 px-3 py-1.5 text-center backdrop-blur-sm">
            <p className="font-display text-xl font-black leading-none text-primary">{day}</p>
            <p className="mt-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground">
              {month}
            </p>
          </div>
        )}

        <span
          className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest backdrop-blur-sm ${
            upcoming
              ? "border border-accent/50 bg-accent/20 text-accent-foreground"
              : "border border-border bg-background/80 text-muted-foreground"
          }`}
        >
          <span className={`size-1.5 rounded-full ${upcoming ? "bg-emerald-glow" : "bg-muted-foreground"}`} />
          {upcoming ? "Upcoming" : "Past"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold leading-snug">{event.title}</h3>

        {(event.dateRaw || event.time) && (
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-primary">
            {event.date && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {formatEventDate(event.date)}
                {event.time ? ` · ${event.time}` : ""}
              </span>
            )}
            {!event.date && event.time && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {event.time}
              </span>
            )}
          </p>
        )}

        {event.description && (
          <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        )}

        {event.registerUrl && (
          <Button asChild variant="realm" size="sm" className="mt-4 self-start">
            <a href={event.registerUrl} target="_blank" rel="noreferrer">
              <Ticket className="size-4" />
              Register
            </a>
          </Button>
        )}
      </div>
    </article>
  );
}