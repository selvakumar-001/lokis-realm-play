import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, X } from "lucide-react";

import { NAV_LINKS } from "@/config/site";
import { useSettings } from "@/hooks/use-cms";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const settings = useSettings();

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
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-wider sm:text-xl"
          onClick={() => setOpen(false)}
        >
          <span className="text-gold-gradient">{settings.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              {...(link.hash ? { hash: link.hash } : {})}
              activeOptions={{ exact: link.to === "/" && !link.hash }}
              activeProps={{ className: "!text-primary" }}
              className="text-sm font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="realm" size="sm">
            <a href={settings.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              Book Now
            </a>
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
              <li key={link.label}>
                <Link
                  to={link.to}
                  {...(link.hash ? { hash: link.hash } : {})}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: link.to === "/" && !link.hash }}
                  activeProps={{ className: "!text-primary" }}
                  className="block rounded-md px-2 py-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="realm" className="mt-3 w-full">
            <a href={settings.whatsapp} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              <MessageCircle className="size-4" />
              Book Now
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}