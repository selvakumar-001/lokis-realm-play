/**
 * CMS CONTENT LAYER
 * -----------------
 * Turns published Google Sheet tabs into typed site content.
 * Every section merges over fallback content from @/config/site,
 * so the site keeps working even if a tab is empty or unreachable.
 *
 * Supported tabs: Settings | Pricing | Games | Events | Gallery
 * Column layouts are documented in GOOGLE-SHEETS-GUIDE.md.
 */

import { SHEET_CSV_URLS, site as fallbackSite } from "@/config/site";
import { fetchCsvRows, looksLikeHeader, resolveColumns } from "./csv";

/** Read a cell by column index; -1 (column absent) yields "". */
function pick(cells: string[], index: number): string {
  return index >= 0 ? (cells[index] ?? "").trim() : "";
}

/* ------------------------------------------------------------------ */
/* SETTINGS (Key | Value)                                              */
/* ------------------------------------------------------------------ */

export type OpeningHour = { days: string; time: string };

export type SiteSettings = {
  name: string;
  tagline: string;
  heroKicker: string;
  heroSub: string;
  heroImageUrl: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  aboutTitle: string;
  aboutBody: string[];
  footerTagline: string;
  address: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  instagram: string;
  mapEmbedSrc: string;
  hours: OpeningHour[];
};

export const DEFAULT_SETTINGS: SiteSettings = {
  name: fallbackSite.name,
  tagline: fallbackSite.tagline,
  heroKicker: fallbackSite.heroKicker,
  heroSub: fallbackSite.heroSub,
  heroImageUrl: fallbackSite.heroImageUrl,
  primaryCtaLabel: fallbackSite.primaryCta.label,
  primaryCtaHref: fallbackSite.primaryCta.href,
  secondaryCtaLabel: fallbackSite.secondaryCta.label,
  secondaryCtaHref: fallbackSite.secondaryCta.href,
  aboutTitle: fallbackSite.about.title,
  aboutBody: [...fallbackSite.about.body],
  footerTagline: fallbackSite.footerTagline,
  address: fallbackSite.contact.address,
  phone: fallbackSite.contact.phone,
  phoneHref: fallbackSite.contact.phoneHref,
  whatsapp: fallbackSite.contact.whatsapp,
  instagram: fallbackSite.contact.instagram,
  mapEmbedSrc: fallbackSite.contact.mapEmbedSrc,
  hours: fallbackSite.contact.hours.map((slot) => ({ ...slot })),
};

/** "Hours 1 Days" → "hours1days" so staff can type keys any way they like. */
function normalizeKey(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Split a cell value into paragraphs on CR, LF or CRLF line breaks. */
function splitParagraphs(raw: string): string[] {
  const LF = String.fromCharCode(10);
  const CR = String.fromCharCode(13);
  return raw
    .replace(new RegExp(CR + LF, "g"), LF)
    .replace(new RegExp(CR, "g"), LF)
    .split(LF)
    .map((line) => line.trim())
    .filter(Boolean);
}

function applySettings(rows: string[][]): SiteSettings {
  const map = new Map<string, string>();
  const hasHeader = looksLikeHeader(rows, ["key", "setting", "field"]);
  for (const cells of hasHeader ? rows.slice(1) : rows) {
    const key = normalizeKey(cells[0] ?? "");
    if (!key) continue;
    // Join extra columns back together in case a value contained a comma.
    map.set(key, cells.slice(1).join(",").trim());
  }

  const get = (key: string, current: string): string => map.get(key) || current;

  const hours: OpeningHour[] = [];
  for (let i = 1; i <= 6; i++) {
    const days = get(`hours${i}days`, "");
    const time = get(`hours${i}time`, "");
    if (days && time) hours.push({ days, time });
  }

  const aboutRaw = map.get("aboutbody");
  const aboutParagraphs = aboutRaw ? splitParagraphs(aboutRaw) : [];

  const phoneFromSheet = get("phone", "");
  const phoneHrefFromSheet = phoneFromSheet
    ? `tel:${phoneFromSheet.replace(/[^\d+]/g, "")}`
    : "";

  return {
    name: get("name", DEFAULT_SETTINGS.name),
    tagline: get("tagline", DEFAULT_SETTINGS.tagline),
    heroKicker: get("herokicker", DEFAULT_SETTINGS.heroKicker),
    heroSub: get("herosub", DEFAULT_SETTINGS.heroSub),
    heroImageUrl: get("heroimageurl", DEFAULT_SETTINGS.heroImageUrl),
    primaryCtaLabel: get("ctaprimarylabel", DEFAULT_SETTINGS.primaryCtaLabel),
    primaryCtaHref: get("ctaprimaryhref", DEFAULT_SETTINGS.primaryCtaHref),
    secondaryCtaLabel: get("ctasecondarylabel", DEFAULT_SETTINGS.secondaryCtaLabel),
    secondaryCtaHref: get("ctasecondaryhref", DEFAULT_SETTINGS.secondaryCtaHref),
    aboutTitle: get("abouttitle", DEFAULT_SETTINGS.aboutTitle),
    aboutBody:
      aboutParagraphs.length > 0 ? aboutParagraphs : DEFAULT_SETTINGS.aboutBody,
    footerTagline: get("footertagline", DEFAULT_SETTINGS.footerTagline),
    address: get("address", DEFAULT_SETTINGS.address),
    phone: phoneFromSheet || DEFAULT_SETTINGS.phone,
    phoneHref: phoneHrefFromSheet || DEFAULT_SETTINGS.phoneHref,
    whatsapp: get("whatsapp", DEFAULT_SETTINGS.whatsapp),
    instagram: get("instagram", DEFAULT_SETTINGS.instagram),
    mapEmbedSrc: get("mapembedsrc", DEFAULT_SETTINGS.mapEmbedSrc),
    hours: hours.length > 0 ? hours : DEFAULT_SETTINGS.hours,
  };
}

/* ------------------------------------------------------------------ */
/* PRICING / SERVICES (Service | Description | Price | Icon)           */
/* ------------------------------------------------------------------ */

export type ServiceIcon = "gamepad" | "steering" | "dice";

export type Service = {
  title: string;
  description: string;
  price: string;
  icon: ServiceIcon;
};

export const DEFAULT_SERVICES: Service[] = fallbackSite.services.map((service) => ({
  title: service.title,
  description: service.description,
  price: service.price,
  icon: service.icon,
}));

function normalizeServiceIcon(raw: string): ServiceIcon {
  const value = raw.trim().toLowerCase();
  if (/board|dice|table|card/.test(value)) return "dice";
  if (/sim|racing|car\b|steer|wheel|flight|plane|driv/.test(value)) return "steering";
  return "gamepad";
}

function rowsToServices(rows: string[][]): Service[] {
  if (rows.length === 0) return [];

  const header = (rows[0] ?? []).map((cell) => cell.trim().toLowerCase());
  const hasHeader = looksLikeHeader(rows, ["service", "title", "name", "description"]);
  const dataRows = hasHeader ? rows.slice(1) : rows;

  const cols = resolveColumns(
    header,
    [
      { candidates: ["service", "title", "name"], fallback: 0 },
      { candidates: ["description", "desc", "details"], fallback: 1 },
      { candidates: ["price", "rate", "cost"], fallback: 2 },
      { candidates: ["icon"], fallback: 3 },
    ],
    hasHeader,
  );
  const titleIdx = cols[0] ?? -1;
  const descIdx = cols[1] ?? -1;
  const priceIdx = cols[2] ?? -1;
  const iconIdx = cols[3] ?? -1;

  return dataRows
    .map((cells) => ({
      title: pick(cells, titleIdx),
      description: pick(cells, descIdx),
      price: pick(cells, priceIdx),
      icon: normalizeServiceIcon(pick(cells, iconIdx)),
    }))
    .filter((service) => service.title !== "");
}

/* ------------------------------------------------------------------ */
/* GAMES (Name | Category | Players | Price | ImageURL)                */
/* ------------------------------------------------------------------ */

/** The three main categories, always shown in this order. */
export const CATEGORY_ORDER = ["board", "ps5", "sim"] as const;
export type CategoryKey = (typeof CATEGORY_ORDER)[number];

export const CATEGORY_META: Record<CategoryKey, { label: string; blurb: string }> = {
  board: {
    label: "Board Games",
    blurb: "Party bluffers, co-op adventures and heavy strategy — dice included.",
  },
  ps5: {
    label: "PS5 Games",
    blurb: "4K stations, pro controllers, couch co-op chaos and solo grinds.",
  },
  sim: {
    label: "Car Simulators",
    blurb: "Sim racing rigs with force-feedback wheels on triple screens. Chase the apex.",
  },
};

/** Player-count buckets used by the filters on the Games page. */
export const PLAYER_BUCKETS = ["1", "2", "3-4", "5+"] as const;
export type PlayerBucket = (typeof PLAYER_BUCKETS)[number];

export const PLAYER_BUCKET_LABELS: Record<PlayerBucket, string> = {
  "1": "1 Player",
  "2": "2 Players",
  "3-4": "3–4 Players",
  "5+": "5+ Players",
};

export type PlayerRange = { min: number; max: number };

export type Game = {
  id: string;
  name: string;
  category: CategoryKey;
  /** Raw text from the Players column, e.g. "2-6" — shown on the card. */
  playersLabel: string;
  /** Parsed range used for filtering; null when the column is blank. */
  players: PlayerRange | null;
  price: string;
  imageUrl: string;
};

export function normalizeCategory(raw: string): CategoryKey {
  const value = raw.trim().toLowerCase();
  if (/board|card|tabletop|dice/.test(value)) return "board";
  if (/^ps\s*\d|playstation|console/.test(value)) return "ps5";
  if (/sim|racing|car\b|driv|wheel/.test(value)) return "sim";
  return "board";
}

/**
 * Parse the Players column into a min/max range.
 * Understands "", "3", "3-4", "5+", "2–6 players".
 * Returns null when unknown → the game then matches every filter.
 */
export function parsePlayerRange(raw: string): PlayerRange | null {
  const value = raw.trim().toLowerCase().replace(/\s+/g, "");
  if (!value || value === "?" || value === "-") return null;

  const plus = /^(\d+)\+$/.exec(value);
  if (plus) return { min: Number(plus[1]), max: Number.POSITIVE_INFINITY };

  const range = /^(\d+)[-–](\d+)$/.exec(value);
  if (range) {
    const min = Number(range[1]);
    const max = Number(range[2]);
    return min <= max ? { min, max } : { min: max, max: min };
  }

  const single = /^(\d+)/.exec(value);
  if (single) {
    const n = Number(single[1]);
    return { min: n, max: n };
  }

  return null;
}

/** Does a game's player range overlap with the selected bucket? */
export function matchesBucket(range: PlayerRange | null, bucket: PlayerBucket): boolean {
  if (!range) return true;
  if (bucket === "5+") return range.max >= 5;
  if (bucket === "3-4") return Math.max(range.min, 3) <= Math.min(range.max, 4);
  const n = Number(bucket);
  return range.min <= n && n <= range.max;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function rowsToGames(rows: string[][]): Game[] {
  if (rows.length === 0) return [];

  const header = (rows[0] ?? []).map((cell) => cell.trim().toLowerCase());
  const hasHeader = looksLikeHeader(rows, ["name", "category", "title"]);
  const dataRows = hasHeader ? rows.slice(1) : rows;

  const cols = resolveColumns(
    header,
    [
      { candidates: ["name", "title", "game"], fallback: 0 },
      { candidates: ["category", "type"], fallback: 1 },
      { candidates: ["player", "pax", "people"], fallback: 2 },
      { candidates: ["price", "rate", "cost"], fallback: 3 },
      { candidates: ["image", "img", "photo", "url"], fallback: 4 },
    ],
    hasHeader,
  );
  const nameIdx = cols[0] ?? -1;
  const catIdx = cols[1] ?? -1;
  const playersIdx = cols[2] ?? -1;
  const priceIdx = cols[3] ?? -1;
  const imgIdx = cols[4] ?? -1;

  return dataRows
    .map((cells, index) => {
      const name = pick(cells, nameIdx);
      const category = normalizeCategory(pick(cells, catIdx));
      const playersLabel = pick(cells, playersIdx);
      return {
        id: `${category}-${slugify(name) || index}-${index}`,
        name,
        category,
        playersLabel,
        players: parsePlayerRange(playersLabel),
        price: pick(cells, priceIdx),
        imageUrl: pick(cells, imgIdx),
      } satisfies Game;
    })
    .filter((game) => game.name !== "")
    .sort((a, b) => a.name.localeCompare(b.name));
}

/* ------------------------------------------------------------------ */
/* EVENTS (Title | Date | Time | Description | ImageURL | Link)        */
/* ------------------------------------------------------------------ */

export type CafeEvent = {
  id: string;
  title: string;
  dateRaw: string;
  date: Date | null;
  time: string;
  description: string;
  imageUrl: string;
  link: string;
};

/**
 * Flexible date parsing for the Date column.
 * Supports: 2026-08-22 · 22/08/2026 · 22-08-2026 · 22 Aug 2026 · Aug 22, 2026.
 * Day-first is assumed for numeric dates (dd/mm/yyyy).
 */
export function parseSheetDate(raw: string): Date | null {
  const value = raw.trim();
  if (!value) return null;

  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(value);
  if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));

  const dmy = /^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})/.exec(value);
  if (dmy) {
    let day = Number(dmy[1]);
    let month = Number(dmy[2]);
    let year = Number(dmy[3]);
    if (year < 100) year += 2000;
    if (month > 12 && day <= 12) [day, month] = [month, day];
    return new Date(year, month - 1, day);
  }

  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : new Date(parsed);
}

/** True when the event's date is today or later. Undated events count as upcoming. */
export function isEventUpcoming(event: CafeEvent): boolean {
  if (!event.date) return true;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return event.date.getTime() >= startOfToday.getTime();
}

/** Newest first; events without a usable date keep their sheet order at the end. */
export function sortEventsDesc(events: CafeEvent[]): CafeEvent[] {
  const dated = events.filter((event) => event.date !== null);
  const undated = events.filter((event) => event.date === null);
  dated.sort((a, b) => (b.date as Date).getTime() - (a.date as Date).getTime());
  return [...dated, ...undated];
}

export function formatEventDate(date: Date): string {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function rowsToEvents(rows: string[][]): CafeEvent[] {
  if (rows.length === 0) return [];

  const header = (rows[0] ?? []).map((cell) => cell.trim().toLowerCase());
  const hasHeader = looksLikeHeader(rows, ["title", "event", "date"]);
  const dataRows = hasHeader ? rows.slice(1) : rows;

  const cols = resolveColumns(
    header,
    [
      { candidates: ["title", "event", "name"], fallback: 0 },
      { candidates: ["date"], fallback: 1 },
      { candidates: ["time"], fallback: 2 },
      { candidates: ["description", "details", "desc"], fallback: 3 },
      { candidates: ["image", "img", "photo", "poster"], fallback: 4 },
      { candidates: ["link", "ticket", "rsvp"], fallback: 5 },
    ],
    hasHeader,
  );
  const titleIdx = cols[0] ?? -1;
  const dateIdx = cols[1] ?? -1;
  const timeIdx = cols[2] ?? -1;
  const descIdx = cols[3] ?? -1;
  const imgIdx = cols[4] ?? -1;
  const linkIdx = cols[5] ?? -1;

  return dataRows
    .map((cells, index) => {
      const title = pick(cells, titleIdx);
      const dateRaw = pick(cells, dateIdx);
      return {
        id: `event-${index}-${slugify(title)}`,
        title,
        dateRaw,
        date: parseSheetDate(dateRaw),
        time: pick(cells, timeIdx),
        description: pick(cells, descIdx),
        imageUrl: pick(cells, imgIdx),
        link: pick(cells, linkIdx),
      } satisfies CafeEvent;
    })
    .filter((event) => event.title !== "" || event.description !== "");
}

/* ------------------------------------------------------------------ */
/* GALLERY (ImageURL | Caption)                                        */
/* ------------------------------------------------------------------ */

export type GalleryPhoto = { src: string; alt: string };

function rowsToGallery(rows: string[][]): GalleryPhoto[] {
  if (rows.length === 0) return [];

  const header = (rows[0] ?? []).map((cell) => cell.trim().toLowerCase());
  const hasHeader = looksLikeHeader(rows, ["image", "caption", "photo", "url"]);
  const dataRows = hasHeader ? rows.slice(1) : rows;

  const cols = resolveColumns(
    header,
    [
      { candidates: ["image", "img", "photo", "url"], fallback: 0 },
      { candidates: ["caption", "alt", "title", "description"], fallback: 1 },
    ],
    hasHeader,
  );
  const imgIdx = cols[0] ?? -1;
  const captionIdx = cols[1] ?? -1;

  return dataRows
    .map((cells) => ({
      src: pick(cells, imgIdx),
      alt: pick(cells, captionIdx) || "Trickster gaming café",
    }))
    .filter((photo) => photo.src !== "");
}

/* ------------------------------------------------------------------ */
/* FETCHERS                                                            */
/* ------------------------------------------------------------------ */

export async function fetchSettings(signal?: AbortSignal): Promise<SiteSettings> {
  const rows = await fetchCsvRows(SHEET_CSV_URLS.settings, signal);
  return applySettings(rows);
}

export async function fetchServices(signal?: AbortSignal): Promise<Service[]> {
  const rows = await fetchCsvRows(SHEET_CSV_URLS.pricing, signal);
  return rowsToServices(rows);
}

export async function fetchGames(signal?: AbortSignal): Promise<Game[]> {
  const rows = await fetchCsvRows(SHEET_CSV_URLS.games, signal);
  return rowsToGames(rows);
}

export async function fetchEvents(signal?: AbortSignal): Promise<CafeEvent[]> {
  const rows = await fetchCsvRows(SHEET_CSV_URLS.events, signal);
  return sortEventsDesc(rowsToEvents(rows));
}

export async function fetchGallery(signal?: AbortSignal): Promise<GalleryPhoto[]> {
  const rows = await fetchCsvRows(SHEET_CSV_URLS.gallery, signal);
  return rowsToGallery(rows);
}