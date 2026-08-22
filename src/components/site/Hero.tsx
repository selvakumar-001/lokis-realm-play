import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <img
        src={heroImage}
        alt="Interior of Loki's Realm gaming café with PS5 stations and racing simulator"
        width={1920}
        height={1088}
        className="absolute inset-0 size-full object-cover opacity-45"
      />
      <div className="absolute inset-0 realm-bg opacity-80" />
      <div className="smoke-veil absolute inset-0" />
      <div className="rune-glow absolute -left-24 top-1/4 size-72 rounded-full bg-accent/25 blur-[100px]" />
      <div className="rune-glow absolute -right-16 bottom-10 size-80 rounded-full bg-primary/20 blur-[110px]" />

      <div className="relative mx-auto w-full max-w-4xl px-5 pt-28 pb-20 text-center">
        <p className="reveal-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary">
          <Sparkles className="size-3.5" />
          {site.heroKicker}
        </p>

        <h1 className="reveal-up mt-7 text-5xl font-black leading-[1.05] sm:text-6xl md:text-8xl">
          <span className="shimmer-text">{site.name}</span>
        </h1>

        <p className="reveal-up mt-5 font-display text-xl font-semibold tracking-wide text-foreground/90 sm:text-2xl md:text-3xl">
          {site.tagline}
        </p>

        <p className="reveal-up mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
          {site.heroSub}
        </p>

        <div className="reveal-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="realm" size="lg">
            <a href={site.primaryCta.href}>
              {site.primaryCta.label}
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="realmOutline" size="lg">
            <a href={site.secondaryCta.href}>{site.secondaryCta.label}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
