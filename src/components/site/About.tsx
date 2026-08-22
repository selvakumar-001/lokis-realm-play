import { site } from "@/config/site";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker="About the realm" title={site.about.title} />
        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center">
          {site.about.body.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
