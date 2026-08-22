/**
 * TRICKSTER — SITE CONFIG & FALLBACK CONTENT
 * ------------------------------------------
 * This file holds:
 *   1. GOOGLE SHEET URLS  → where live content is pulled from (the CMS).
 *   2. FALLBACK CONTENT   → shown if a sheet tab is empty/unreachable,
 *                           so the site never breaks.
 *
 * Day-to-day editing happens in the Google Sheet, NOT here.
 * See GOOGLE-SHEETS-GUIDE.md at the project root for setup instructions.
 */

/* ------------------------------------------------------------------ */
/* 1. GOOGLE SHEETS CMS                                                */
/* ------------------------------------------------------------------ */

/**
 * Base of the published spreadsheet ("File → Share → Publish to web").
 * Each tab below gets its own CSV link using its gid (see the guide).
 * Set a value to "" to fall back to the built-in content for that section.
 */
const PUBLISHED_SHEET_BASE =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSt5p_p9Qju8bF6uyh0UDEbJ5TZn1Hk7noo5ge0gTgJy0TgtgF24YIwfO22TRVhSPLeIofaavxjP8W6/pub";

export const SHEET_CSV_URLS = {
  settings: `${PUBLISHED_SHEET_BASE}?gid=1993187658&single=true&output=csv`,
  pricing:  `${PUBLISHED_SHEET_BASE}?gid=2116527050&single=true&output=csv`,
  games:    `${PUBLISHED_SHEET_BASE}?gid=239734782&single=true&output=csv`,
  events:   `${PUBLISHED_SHEET_BASE}?gid=0&single=true&output=csv`,
  gallery:  `${PUBLISHED_SHEET_BASE}?gid=1831417279&single=true&output=csv`,
} as const;

/* ------------------------------------------------------------------ */
/* 2. FALLBACK CONTENT                                                 */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Trickster",
  shortName: "Trickster",
  tagline: "Enter the Realm of Play",
  heroKicker: "Gaming Café · Mischief Guaranteed",
  heroSub:
    "PS5 battles, racing & flight sims, and a shelf full of board games. Mischief-makers welcome.",
  heroImageUrl: "", // empty → uses the bundled hero image

  primaryCta: { label: "Book Now", href: "#contact" },
  secondaryCta: { label: "Explore Games", href: "/games" },

  about: {
    title: "A Realm for Mischief-Makers",
    body: [
      "Trickster is where gamers gather to scheme, race, brawl and bluff. Dim lights, gold glow, and zero judgement for that last-second betrayal.",
      "Bring your crew or find one here — walk-ins, tournaments, and slow board-game nights all belong in the realm.",
    ],
  },

  services: [
    {
      icon: "gamepad" as const,
      title: "PS5 Gaming",
      description:
        "PS5 stations on 4K displays with pro controllers. Solo grind or couch co-op chaos.",
      price: "₹149 / hour",
    },
    {
      icon: "steering" as const,
      title: "Racing / Flight SIM",
      description:
        "Force-feedback wheel, pedals, yoke and throttle rigs on triple screens. Take the sky or the apex.",
      price: "₹129 / 20 mins",
    },
    {
      icon: "dice" as const,
      title: "Board Games",
      description:
        "40+ titles from party bluffers to heavy strategy. Fights allowed, table flipping isn't.",
      price: "₹120 / hour",
    },
  ],

  contact: {
    address:
      "Shop 2b, Second Floor, The Storez, Rajiv Gandhi Salai, Navalur, Tamil Nadu 600130",
    hours: [
      { days: "Mon – Thu", time: "11:00 AM – 10:00 PM" },
      { days: "Fri – Sat", time: "11:00 AM – 3:00 AM" },
      { days: "Sunday", time: "11:00 AM – 3:00 PM" },
    ],
    phone: "06381092837",
    phoneHref: "tel:+916381092837",
    instagram: "https://www.instagram.com/trickster_gaming_cafe/?hl=en",
    whatsapp: "https://wa.me/6381092837",
    mapEmbedSrc: "https://www.google.com/maps?q=Trickster+Gaming+Hub+Chennai&output=embed",
  },

  footerTagline: "Mischief managed.",
} as const;

/* ------------------------------------------------------------------ */
/* 3. NAVIGATION                                                       */
/* ------------------------------------------------------------------ */

export type NavLinkItem = {
  label: string;
  to: "/" | "/games" | "/events";
  /** Optional anchor on the target page, e.g. "contact" → /#contact */
  hash?: string;
};

export const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", to: "/" },
  { label: "Games", to: "/games" },
  { label: "Events", to: "/events" },
  { label: "Visit Us", to: "/", hash: "contact" },
];