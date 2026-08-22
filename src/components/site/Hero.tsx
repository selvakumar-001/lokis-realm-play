import { ArrowRight, Sparkles } from "lucide-react";

import heroImage from "@/assets/hero.jpg";
import { useSettings } from "@/hooks/use-cms";
import { Button } from "@/components/ui/button";
import { NameLogo } from "./NameLogo";
import { SmartLink } from "./SmartLink";

export function Hero() {
  const settings = useSettings();
  const heroSrc = settings.heroImageUrl || heroImage;

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <img
        src={heroSrc}
        alt="Inside Trickster gaming café — PS5 stations, simulators and board game tables"
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
          {settings.heroKicker}
        </p>

        <h1 className="reveal-up mt-7 text-5xl font-black leading-[1.05] sm:text-6xl md:text-8xl">
          <NameLogo
            className="mx-auto h-auto w-full max-w-[300px] sm:max-w-md md:max-w-lg"
            fallbackClassName="shimmer-text"
          />
        </h1>

        <p className="reveal-up mt-5 font-display text-xl font-semibold tracking-wide text-foreground/90 sm:text-2xl md:text-3xl">
          {settings.tagline}
        </p>

        <p className="reveal-up mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
          {settings.heroSub}
        </p>

        <div className="reveal-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="realm" size="lg">
            <SmartLink href={settings.primaryCtaHref}>
              {settings.primaryCtaLabel}
              <ArrowRight className="size-4" />
            </SmartLink>
          </Button>
          <Button asChild variant="realmOutline" size="lg">
            <SmartLink href={settings.secondaryCtaHref}>{settings.secondaryCtaLabel}</SmartLink>
          </Button>
        </div>
      </div>
    </section>
  );
}