/**
 * SITE CONTENT & CONFIG
 * ---------------------
 * Everything editable lives here: text, prices, links, hours.
 * Layout lives in src/components/site/*, styling in src/styles.css.
 */

/**
 * ⬇️ SWAP THIS ONE LINE with your published Google Sheet CSV link.
 * Sheet columns must be: Name | Category | Price | ImageURL
 * (File → Share → Publish to web → Comma-separated values (.csv))
 */
export const GAMES_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/REPLACE_WITH_YOUR_SHEET_ID/pub?gid=0&single=true&output=csv";

export const site = {
  name: "Loki's Realm",
  shortName: "Loki's Realm",
  tagline: "Enter the Realm of Play",
  heroKicker: "Gaming Café · Norse Mischief",
  heroSub:
    "PS5 battles, racing & flight sims, and a shelf full of board games. Mischief-makers welcome.",
  primaryCta: { label: "Book Now", href: "#contact" },
  secondaryCta: { label: "Explore Games", href: "#games" },

  about: {
    title: "A Realm for Mischief-Makers",
    body: [
      "Loki's Realm is where gamers gather to scheme, race, brawl and bluff. Dim lights, gold glow, and zero judgement for that last-second betrayal.",
      "Bring your crew or find one here — walk-ins, tournaments, and slow board-game nights all belong in the realm.",
    ],
  },

  services: [
    {
      icon: "gamepad" as const,
      title: "PS5 Gaming",
      description:
        "Six PS5 stations on 4K displays with pro controllers. Solo grind or couch co-op chaos.",
      price: "₹149 / hour",
    },
    {
      icon: "steering" as const,
      title: "Racing / Flight SIM",
      description:
        "Force-feedback wheel, pedals, yoke and throttle rigs on triple screens. Take the sky or the apex.",
      price: "₹299 / hour",
    },
    {
      icon: "dice" as const,
      title: "Board Games",
      description:
        "40+ titles from party bluffers to heavy strategy. Snacks allowed, table flipping isn't.",
      price: "₹99 / hour",
    },
  ],

  contact: {
    address: "2nd Floor, Yggdrasil Plaza, MG Road, Bengaluru 560001",
    hours: [
      { days: "Mon – Thu", time: "11:00 AM – 11:00 PM" },
      { days: "Fri – Sat", time: "11:00 AM – 2:00 AM" },
      { days: "Sunday", time: "10:00 AM – 11:00 PM" },
    ],
    phone: "+91 90000 00000",
    phoneHref: "tel:+919000000000",
    email: "hello@lokisrealm.example",
    instagram: "https://instagram.com/",
    whatsapp: "https://wa.me/919000000000",
    mapEmbedSrc:
      "https://www.google.com/maps?q=MG+Road+Bengaluru&output=embed",
  },

  footerTagline: "Mischief managed.",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Games", href: "#games" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit", href: "#contact" },
];
