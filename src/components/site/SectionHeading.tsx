import type { ReactNode } from "react";

export function SectionHeading({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker && (
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary/80">{kicker}</p>
      )}
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-[2.75rem]">{title}</h2>
      <div className="gold-rule mx-auto mt-5 w-28" />
      {subtitle && <p className="mt-5 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}
