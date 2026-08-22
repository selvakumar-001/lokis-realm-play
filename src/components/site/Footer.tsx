import { Instagram, MessageCircle } from "lucide-react";
import { NAV_LINKS, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center">
        <a href="#top" className="font-display text-xl font-bold tracking-wider">
          <span className="text-gold-gradient">{site.name}</span>
        </a>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          <a
            href={site.contact.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="rounded-full border border-primary/30 p-2.5 text-primary transition-colors hover:bg-primary/10"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href={site.contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="rounded-full border border-primary/30 p-2.5 text-primary transition-colors hover:bg-primary/10"
          >
            <MessageCircle className="size-4" />
          </a>
        </div>

        <p className="font-display text-sm italic text-primary/80">{site.footerTagline}</p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
