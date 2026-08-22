import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";

import { NAV_LINKS } from "@/config/site";
import { useSettings } from "@/hooks/use-cms";

export function Footer() {
  const settings = useSettings();

  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center">
        <Link to="/" className="font-display text-xl font-bold tracking-wider">
          <span className="text-gold-gradient">{settings.name}</span>
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              {...(link.hash ? { hash: link.hash } : {})}
              activeOptions={{ exact: link.to === "/" && !link.hash }}
              activeProps={{ className: "!text-primary" }}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-3">
          <a
            href={settings.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="rounded-full border border-primary/30 p-2.5 text-primary transition-colors hover:bg-primary/10"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href={settings.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="rounded-full border border-primary/30 p-2.5 text-primary transition-colors hover:bg-primary/10"
          >
            <MessageCircle className="size-4" />
          </a>
        </div>

        <p className="font-display text-sm italic text-primary/80">{settings.footerTagline}</p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {settings.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}