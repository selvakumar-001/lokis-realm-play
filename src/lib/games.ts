import { GAMES_SHEET_CSV_URL } from "@/config/site";

export type GameCategory = "PS5" | "SIM" | "Board Game";

export type Game = {
  name: string;
  category: GameCategory;
  price: string;
  imageUrl: string;
};

/** Minimal CSV parser: handles quoted fields, commas and newlines inside quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
    } else {
      field += char;
    }
  }

  row.push(field);
  if (row.some((cell) => cell.trim() !== "")) rows.push(row);
  return rows;
}

function normalizeCategory(raw: string): GameCategory {
  const value = raw.trim().toLowerCase();
  if (value.startsWith("ps")) return "PS5";
  if (value.includes("sim")) return "SIM";
  return "Board Game";
}

/** Maps sheet columns (Name | Category | Price | ImageURL) into Game objects. */
export function rowsToGames(rows: string[][]): Game[] {
  if (rows.length === 0) return [];

  const header = (rows[0] ?? []).map((cell) => cell.trim().toLowerCase());
  const looksLikeHeader = header.includes("name") || header.includes("category");
  const dataRows = looksLikeHeader ? rows.slice(1) : rows;

  const indexOf = (candidates: string[], fallback: number) => {
    if (!looksLikeHeader) return fallback;
    const found = header.findIndex((cell) => candidates.some((c) => cell.includes(c)));
    return found === -1 ? fallback : found;
  };

  const nameIdx = indexOf(["name", "title", "game"], 0);
  const catIdx = indexOf(["category", "type"], 1);
  const priceIdx = indexOf(["price", "rate"], 2);
  const imgIdx = indexOf(["image", "img", "photo", "url"], 3);

  return dataRows
    .map((cells) => ({
      name: (cells[nameIdx] ?? "").trim(),
      category: normalizeCategory(cells[catIdx] ?? ""),
      price: (cells[priceIdx] ?? "").trim(),
      imageUrl: (cells[imgIdx] ?? "").trim(),
    }))
    .filter((game) => game.name !== "");
}

export async function fetchGames(signal?: AbortSignal): Promise<Game[]> {
  const response = await fetch(GAMES_SHEET_CSV_URL, signal ? { signal } : {});
  if (!response.ok) {
    throw new Error(`Sheet request failed (${response.status})`);
  }
  const text = await response.text();
  if (text.trim().startsWith("<")) {
    throw new Error("Sheet is not published as CSV");
  }
  const games = rowsToGames(parseCsv(text));
  if (games.length === 0) throw new Error("Sheet has no game rows");
  return games;
}
