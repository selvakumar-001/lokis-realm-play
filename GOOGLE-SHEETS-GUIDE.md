# Trickster Website — Google Sheets Setup Guide

This website is **fully managed from one Google Sheet**. The café staff can change
the slogan, prices, games, events, photos and contact details by simply editing the
spreadsheet — **no code, no developer, no redeployment**.

Changes appear on the site within ~2 minutes (visitors may need to refresh the page).

---

## 1. One-time setup (15 minutes)

### Step 1 — Create the spreadsheet

Create a new Google Sheet with **five tabs**, named exactly:

```
Settings | Pricing | Games | Events | Gallery
```

> Tip: ready-made templates for every tab are in the `sheet-templates/` folder of
> this project. In each tab use **File → Import → Upload → Insert new sheet(s)**,
> then rename the tab to match the table below.

### Step 2 — Publish the sheet

1. In the menu: **File → Share → Publish to web**
2. Under "Publish": select **Entire document**, format **Comma-separated values (.csv)**
3. Click **Publish** and confirm.
4. Copy the generated link. It looks like:
   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-...long-code.../pub?output=csv
   ```

### Step 3 — Get the tab links (gid)

Each tab has its own ID called a **gid**:

1. Open the published link in your browser (it shows the first tab as CSV).
2. For each other tab: open the normal spreadsheet, click the tab, and look at the
   browser address bar — you'll see something like `#gid=123456789`.
3. Build each tab's CSV URL like this:
   ```
   <published-link-without-output=csv>&gid=THE_GID&single=true&output=csv
   ```
   Example:
   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-…/pub?gid=123456789&single=true&output=csv
   ```

### Step 4 — Paste the URLs into the website config

Open `src/config/site.ts` and fill in the five URLs under `SHEET_CSV_URLS`:

```ts
export const SHEET_CSV_URLS = {
  settings: "<Settings tab CSV url>",
  pricing:  "<Pricing tab CSV url>",
  games:    "<Games tab CSV url>",
  events:   "<Events tab CSV url>",
  gallery:  "<Gallery tab CSV url>",
};
```

Leave any URL as `""` and that section falls back to the built-in default content —
the site never breaks while you're setting things up.

### Step 5 — Deploy

Commit and push (or let Lovable sync). Done — from now on, **only edit the Sheet**.

---

## 2. Tab layouts

### 📋 Settings tab — two columns: `Key | Value`

| Key                | What it controls                          | Example |
|--------------------|-------------------------------------------|---------|
| `name`             | Café name shown everywhere                | `Trickster` |
| `tagline`          | Big slogan on the home page               | `Enter the Realm of Play` |
| `hero_kicker`      | Small pill above the slogan               | `Gaming Café · Mischief Guaranteed` |
| `hero_sub`         | Paragraph under the slogan                | `PS5 battles, racing sims…` |
| `hero_image_url`   | Home page background photo (direct image link) | *(leave blank to keep current)* |
| `cta_primary_label` / `cta_primary_href`     | Main button text / target (`#contact`, `/games`, or full URL) | `Book Now` / `#contact` |
| `cta_secondary_label` / `cta_secondary_href` | Second button                              | `Explore Games` / `/games` |
| `about_title`      | About section heading                     | `A Realm for Mischief-Makers` |
| `about_body`       | About paragraphs — press **Ctrl+Enter** inside the cell for line breaks between paragraphs | |
| `footer_tagline`   | Italic line above the copyright           | `Mischief managed.` |
| `address`          | Address block                             | |
| `phone`            | Displayed phone number                    | `06381092837` |
| `whatsapp`         | WhatsApp link used by all "Book Now" buttons | `https://wa.me/6381092837` |
| `instagram`        | Instagram profile URL                     | |
| `map_embed_src`    | Google Maps embed URL                     | |
| `hours_1_days` / `hours_1_time` … up to `hours_6_days` / `hours_6_time` | Opening-hours rows | `Mon – Thu` / `11:00 AM – 10:00 PM` |

Keys are matched loosely — `Hero Kicker`, `HERO_KICKER` and `herokicker` all work.

### 💰 Pricing tab — columns: `Service | Description | Price | Icon`

| Service        | Description                        | Price        | Icon     |
|----------------|------------------------------------|--------------|----------|
| `PS5 Gaming`   | PS5 stations on 4K displays…       | `₹149 / hour`| `gamepad`|
| `Racing SIM`   | Force-feedback wheel rigs…         | `₹129 / 20 mins` | `steering` |
| `Board Games`  | 40+ titles…                        | `₹120 / hour`| `dice`   |

Icon accepts: `gamepad`, `steering` (or anything with sim/racing/car/wheel/flight), `dice`
(or board/card/table). Anything else defaults to `gamepad`.

### 🎮 Games tab — columns: `Name | Category | Players | Price | ImageURL`

| Name             | Category      | Players | Price      | ImageURL              |
|------------------|---------------|---------|------------|-----------------------|
| `Catan`          | `Board Game`  | `3-4`   | `Free w/ entry` | *(image link)* |
| `FIFA 26`        | `PS5`         | `1-2`   | `₹149/hr`  |                       |
| `Assetto Corsa`  | `Sim Racing`  | `1`     | `₹129/20m` |                       |

- **Category** is flexible — `Board Game`, `board games`, `PS5`, `PlayStation`,
  `SIM Racing`, `Car Simulator` all work. Games land in one of three sections:
  **Board Games · PS5 Games · Car Simulators**.
- **Players** powers the filter chips (1 Player / 2 Players / 3–4 Players / 5+).
  Accepted formats: `1`, `2`, `3-4`, `5+`, `2-6`. Leave blank → game shows under
  every filter.
- **ImageURL** optional — a placeholder art is used when empty.

### 📅 Events tab — columns: `Title | Date | Time | Description | ImageURL | Link`

| Title            | Date       | Time        | Description                  | ImageURL | Link |
|------------------|------------|-------------|------------------------------|----------|------|
| `FIFA Night`     | `22 Aug 2026` | `7 PM onwards` | Knockout tournament…   | *(poster)* | *(optional RSVP/ticket URL)* |

- **Date formats that work:** `2026-08-22`, `22/08/2026`, `22-08-2026`,
  `22 Aug 2026`, `Aug 22, 2026`. Leave blank for undated posts.
- Events are sorted newest-first and tagged **Upcoming** or **Past** automatically.
- To remove an event from the site, delete its row.

### 🖼️ Gallery tab — columns: `ImageURL | Caption`

Paste direct image links, one per row. Leave the Gallery tab empty (or its URL
unset) to keep the bundled photos.

---

## 3. Image links that actually work

The site needs **direct image links** (ending in `.jpg`/`.png` or serving raw image data):

- ✅ **Imgur / Postimages / Cloudinary**: upload, right-click the image → *Copy image address*.
- ⚠️ **Google Drive**: share links (`drive.google.com/file/d/…/view`) do NOT work directly.
  Convert them to: `https://drive.google.com/thumbnail?id=FILE_ID&sz=w1600`
- ⚠️ **Google Photos**: use a third-party host instead.

Broken links automatically fall back to placeholder art — nothing crashes.

---

## 4. Troubleshooting

| Symptom | Cause & fix |
|---|---|
| Section shows old/default content | Tab not published, wrong gid, or URL not pasted into `src/config/site.ts`. |
| Error mentioning "not published as CSV" | Re-do Step 2 — publish must be **CSV**, not web page. |
| Changes don't appear | Wait ~2 minutes and hard-refresh (Ctrl+Shift+R); Google caches published files briefly. |
| A whole category missing on Games page | Check the Category spelling in the sheet. |
| Event date looks wrong | Use one of the supported date formats (day-first for numbers). |

---

## 5. How it works (for future developers)

- `src/config/site.ts` — sheet URLs + fallback content.
- `src/lib/csv.ts` — CSV fetch/parse helpers.
- `src/lib/content.ts` — parsers turning each tab into typed content
  (settings merge over fallbacks; games get player-range parsing; events get
  flexible date parsing + sorting).
- `src/hooks/use-cms.ts` — React Query hooks (2-minute stale time, silent fallbacks).
- Pages: `/` (home), `/games` (three categories × player filters), `/events`.