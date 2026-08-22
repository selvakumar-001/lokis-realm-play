# Loki's Realm Gaming Hub

Build a responsive, single-page website for a gaming cafe called "Loki's Realm" 

(or similar Loki-themed name), themed entirely around Loki, the Norse God of 

Mischief — dark green, gold, and black color palette, trickster/mischief visual 

motifs (subtle horns, shimmer/glow effects, smoky or magical transitions), 

modern gamer aesthetic mixed with a mystical Asgardian feel.

The cafe offers:

- PS5 gaming stations

- Racing/flight SIM setup

- Board games

Sections needed:

1. HERO SECTION

- Full-screen hero with cafe name, a bold mischievous tagline (e.g. "Enter 

  the Realm of Play"), dark/gold gradient or subtle animated glow background, 

  CTA button ("Book Now" or "Explore Games").

2. ABOUT SECTION

- Short 2-3 sentence intro about the cafe's vibe — a place where gamers 

  gather, "mischief-makers welcome," casual and fun tone.

3. SERVICES SECTION

- Three cards: PS5 Gaming, Racing/Flight SIM, Board Games — icon, short 

  description, placeholder pricing per hour.

4. GAMES LIBRARY SECTION

- Responsive grid of available games (PS5 titles + board games) as cards 

  with title, category tag (PS5 / SIM / Board Game), placeholder image.

- Include filter tabs (All / PS5 / SIM / Board Games).

- IMPORTANT: Pull this games list from a single external Google Sheet 

  (published as CSV) instead of hardcoding it in the code. Fetch the sheet 

  data on page load, parse it, and render the grid from it. Structure the 

  sheet columns as: Name | Category | Price | ImageURL. Show a clean 

  loading state while fetching, and a simple fallback message if the 

  fetch fails. I will share the published CSV link separately — use a 

  placeholder URL for now that I can swap in easily.

5. GALLERY SECTION

- Placeholder image grid for cafe photos.

6. CONTACT / VISIT US SECTION

- Address, opening hours, phone number, social media icons (Instagram, 

  WhatsApp) — placeholder text/links.

- Optional embedded Google Map placeholder.

7. FOOTER

- Cafe name, social links, copyright, small "mischief-managed" tagline.

DESIGN REQUIREMENTS:

- Fully responsive (mobile-first)

- Smooth scroll and subtle hover/transition animations

- Dark theme by default (deep green/black background, gold accents)

- Clean, modern typography — bold gaming-style font for headings, clean 

  sans-serif for body

- No backend, no database, no login/auth system — the only "dynamic" 

  part should be fetching the public Google Sheet CSV for the games list, 

  everything else stays static

- Keep code well-organized so the Google Sheet URL is a single easy-to-find 

  constant/config value I can update later

Keep everything easily editable — clearly separate content, layout, and 

styling so future updates (colors, text, images) are simple.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f6f155b6-e3d4-47af-bb81-55b7bcf657e6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
