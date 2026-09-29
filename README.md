# M-TradingNote Demo

A mobile trading journal prototype built with React, TypeScript, Tailwind CSS, and Vite. The screens use sample data.

## Run locally

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. The default view shows an iPhone-style frame. Add `?view=plain` to see the full-screen version.

## Publish with GitHub Pages

```sh
npm run build:pages
```

Commit the generated `docs/` folder and configure GitHub Pages to deploy from the `main` branch and `/docs` folder. The published demo uses hash-based routes so links to individual screens work on GitHub Pages.

The site is a static prototype and does not connect to a brokerage or trading API.
