import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

import { useSettings } from "@/hooks/use-cms";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const settings = useSettings();

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Visit us"
          title="Find the Realm"
          subtitle="Walk in, or ping us on WhatsApp to reserve a station."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="card-realm rounded-xl p-8">
            <ul className="space-y-7">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">
                    Address
                  </h3>
                  <p className="mt-1 text-muted-foreground">{settings.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">
                    Opening hours
                  </h3>
                  <dl className="mt-2 space-y-1">
                    {settings.hours.map((slot) => (
                      <div key={slot.days} className="flex gap-3 text-muted-foreground">
                        <dt className="w-24 shrink-0 font-semibold text-foreground/80">
                          {slot.days}
                        </dt>
                        <dd>{slot.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">
                    Call us
                  </h3>
                  <a
                    href={settings.phoneHref}
                    className="mt-1 block text-muted-foreground transition-colors hover:text-primary"
                  >
                    {settings.phone}
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="realm">
                <a href={settings.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="realmOutline">
                <a href={settings.instagram} target="_blank" rel="noreferrer">
                  <Instagram className="size-4" />
                  Instagram
                </a>
              </Button>
            </div>
          </div>

          <div className="card-realm overflow-hidden rounded-xl">
            <iframe
              title={`Map to ${settings.name} gaming café`}
              src={settings.mapEmbedSrc}
              loading="lazy"
              className="h-80 w-full border-0 opacity-90 lg:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}