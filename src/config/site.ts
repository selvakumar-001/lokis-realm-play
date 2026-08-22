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
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSt5p_p9Qju8bF6uyh0UDEbJ5TZn1Hk7noo5ge0gTgJy0TgtgF24YIwfO22TRVhSPLeIofaavxjP8W6/pub?output=csv";

export const site = {
  name: "Trickster",
  shortName: "Trickster",
  tagline: "Enter the Realm of Play",
  heroKicker: "Gaming Café · Norse Mischief",
  heroSub:
    "PS5 battles, racing & flight sims, and a shelf full of board games. Mischief-makers welcome.",
  primaryCta: { label: "Book Now", href: "#contact" },
  secondaryCta: { label: "Explore Games", href: "#games" },

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
        " PS5 stations on 4K displays with pro controllers. Solo grind or couch co-op chaos.",
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
        "40+ titles from party bluffers to heavy strategy. fights allowed, table flipping isn't.",
      price: "₹120 / hour",
    },
  ],

  contact: {
    address: " Shop 2b, Second Floor, The Storez, Rajiv Gandhi Salai, Navalur, Tamil Nadu 600130",
    hours: [
      { days: "Mon – Thu", time: "11:00 AM – 10:00 PM" },
      { days: "Fri – Sat", time: "11:00 AM – 3:00 AM" },
      { days: "Sunday", time: "11:00 AM – 3:00 PM" },
    ],
    phone: "06381092837",
    phoneHref: "tel:+919000000000",
    // email: "hello@lokisrealm.example",
    instagram: "https://www.instagram.com/trickster_gaming_cafe/?hl=en",
    whatsapp: "https://wa.me/6381092837",
    mapEmbedSrc:
      "https://www.google.com/maps?q=Trickster+Gaming+Hub+Chennai&output=embed",
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
