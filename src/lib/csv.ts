/**
 * Minimal CSV utilities for reading published Google Sheets.
 * Handles quoted fields, commas and newlines inside quotes.
 */

/** Parse CSV text into a 2D array of cells. Blank rows are dropped. */
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

/**
 * Fetch a published Google Sheet tab as CSV rows.
 * Throws if the URL is empty, the request fails, or the sheet
 * isn't published as CSV (Google returns HTML in that case).
 */
export async function fetchCsvRows(url: string, signal?: AbortSignal): Promise<string[][]> {
  if (!url) throw new Error("Sheet URL not configured");

  const response = await fetch(url, signal ? { signal } : {});
  if (!response.ok) {
    throw new Error(`Sheet request failed (${response.status})`);
  }

  const text = await response.text();
  if (text.trim().startsWith("<")) {
    throw new Error("Sheet is not published as CSV");
  }

  return parseCsv(text);
}

/**
 * Locate column indexes from a header row using candidate keywords.
 *
 * Returns one index per spec entry, or **-1 when no column fits**:
 *  - Without a header row, the positional fallbacks are used (clamped).
 *  - With a header row, keywords win first; a field with no keyword match
 *    may claim its fallback position only if that column is still free.
 *    This keeps older/smaller sheets working (e.g. Games without a
 *    Players column must NOT grab the Price column).
 */
export function resolveColumns(
  header: string[],
  spec: Array<{ candidates: string[]; fallback: number }>,
  hasHeader: boolean,
): number[] {
  const count = header.length;

  if (!hasHeader) {
    return spec.map(({ fallback }) => (fallback < count ? fallback : -1));
  }

  const used = new Set<number>();
  const result = new Array<number>(spec.length).fill(-1);

  // Pass 1: keyword matches take priority.
  spec.forEach((entry, i) => {
    const found = header.findIndex(
      (cell, idx) => !used.has(idx) && entry.candidates.some((c) => cell.includes(c)),
    );
    if (found !== -1) {
      result[i] = found;
      used.add(found);
    }
  });

  // Pass 2: unmatched fields may claim their fallback slot if it's free.
  spec.forEach((entry, i) => {
    if (result[i] !== -1) return;
    if (entry.fallback < count && !used.has(entry.fallback)) {
      result[i] = entry.fallback;
      used.add(entry.fallback);
    }
  });

  return result;
}

/** True when the first row looks like a header (contains "name"/"key"/etc.). */
export function looksLikeHeader(rows: string[][], keywords: string[]): boolean {
  const first = rows[0] ?? [];
  return first.some((cell) => {
    const value = cell.trim().toLowerCase();
    return value !== "" && keywords.some((keyword) => value.includes(keyword));
  });
}