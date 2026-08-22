import { Dices, Gamepad2, Plane } from "lucide-react";
import { site } from "@/config/site";
import { SectionHeading } from "./SectionHeading";

const icons = {
  gamepad: Gamepad2,
  steering: Plane,
  dice: Dices,
};

export function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="absolute inset-x-0 top-0 gold-rule opacity-40" />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="What we offer"
          title="Pick Your Weapon"
          subtitle="Hourly rates, no membership, no fine print. Book a station or just walk in."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <article
                key={service.title}
                className="card-realm group rounded-xl p-7 text-center sm:text-left"
              >
                <span className="inline-flex size-14 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-6 text-2xl font-bold">{service.title}</h3>
                <p className="mt-3 text-muted-foreground">{service.description}</p>
                <p className="mt-6 font-display text-lg font-bold text-primary">{service.price}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
