# Trickster — Gaming Café Website

A responsive, dark-fantasy themed website for **Trickster**, a gaming café offering
PS5 stations, car simulators (sim racing) and a large board-game library.

**Maintenance-free by design:** every editable piece of content — slogan, pricing,
games, events, photos, contact details — is pulled live from a connected
**Google Sheet**. The café staff update the spreadsheet; the website updates itself.
No code changes, no redeployment.

## Pages

| Route      | What's on it |
|------------|--------------|
| `/`        | Hero (slogan), About, Pricing cards, Games preview, Events teaser, Gallery, Contact/Visit |
| `/games`   | Full library in three categories — **Board Games · PS5 Games · Car Simulators** — each filterable by player count (1 / 2 / 3–4 / 5+) |
| `/events`  | Event posts with image, title, date, time and description |

## Managing content

Everything is edited in one Google Sheet with five tabs:
`Settings | Pricing | Games | Events | Gallery`.

👉 **See [GOOGLE-SHEETS-GUIDE.md](./GOOGLE-SHEETS-GUIDE.md)** for the full setup
walk-through, tab layouts and troubleshooting.

Ready-to-import templates for each tab live in [`sheet-templates/`](./sheet-templates/).

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing)
- Tailwind CSS v4 + shadcn/ui components
- TanStack Query for sheet fetching/caching (2-minute freshness window)
- Content layer: `src/lib/content.ts` parses published CSV tabs into typed data,
  always falling back to built-in defaults so the site never breaks

## Development

```sh
npm i
npm run dev     # local dev server
npm run build   # production build
npm run lint    # eslint
```

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f6f155b6-e3d4-47af-bb81-55b7bcf657e6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.