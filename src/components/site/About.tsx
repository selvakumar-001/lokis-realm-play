import { useSettings } from "@/hooks/use-cms";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const settings = useSettings();

  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker="About the realm" title={settings.aboutTitle} />
        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center">
          {settings.aboutBody.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}