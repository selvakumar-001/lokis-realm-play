/**
 * Shared shell for standalone pages (Games, Events):
 * header + footer + a themed page hero band.
 */
import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="realm-bg flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden pb-10 pt-36 sm:pt-44">
      <div className="rune-glow absolute -left-20 top-24 size-72 rounded-full bg-accent/20 blur-[110px]" />
      <div className="rune-glow absolute -right-16 top-40 size-80 rounded-full bg-primary/15 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <p className="reveal-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary">
          <Sparkles className="size-3.5" />
          {kicker}
        </p>
        <h1 className="reveal-up mt-6 text-4xl font-black sm:text-5xl md:text-6xl">
          <span className="shimmer-text">{title}</span>
        </h1>
        <div className="gold-rule mx-auto mt-6 w-28" />
        {subtitle && (
          <p className="reveal-up mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}