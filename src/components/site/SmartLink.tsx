/**
 * Renders a link that may point anywhere (sheet-configured):
 *  - "#anchor"  → same-page anchor
 *  - "http(s)…" → external link (new tab)
 *  - "tel:" / "mailto:" / "wa.me" → external link
 *  - "/route"   → internal TanStack Router link
 */
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

/* eslint-disable @typescript-eslint/no-explicit-any */
const AnyLink = Link as unknown as (props: any) => ReactNode;

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

export function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (isInternal(href)) {
    const [pathname, hash] = href.split("#", 2);
    return (
      <AnyLink to={pathname || "/"} hash={hash || undefined} className={className}>
        {children}
      </AnyLink>
    );
  }

  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}