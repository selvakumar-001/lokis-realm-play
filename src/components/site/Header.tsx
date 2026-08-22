import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-lg"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-display text-lg font-bold tracking-wider sm:text-xl">
          <span className="text-gold-gradient">{site.name}</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <Button asChild variant="realm" size="sm">
            <a href={site.primaryCta.href}>{site.primaryCta.label}</a>
          </Button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="rounded-md border border-border p-2 text-primary md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur-lg md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild variant="realm" className="mt-3 w-full">
            <a href={site.primaryCta.href} onClick={() => setOpen(false)}>
              {site.primaryCta.label}
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
