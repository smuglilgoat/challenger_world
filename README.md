# Challenger World Season 4 — Guide & Tracker

A visual guide and per-character weekly progress tracker for the Global MapleStory
Challenger World Season 4 event (2026-11-11 → 2027-02-09).

- **Guide** — dates, weekly timeline, tier thresholds, crest and Genesis math,
  pre-launch prep, Season 4 changes, Quanah. Every fact is marked
  **Confirmed (GMS)** or **Projected (KMS/transcript)**.
- **Characters** — add characters and track crests, Genesis points, tier points
  and a per-week checklist. Data lives in `localStorage` in your browser.

Event data lives in `docs/event-data.md` (source of truth) and
`src/lib/event-data.ts` (typed constants). Tier thresholds are still Season 3
numbers, flagged **Projected** — swap the numbers in `tierPointsClaim(...)`
when the GMS patch notes land.

### Updating the data when the patch notes arrive

Every numeric fact is defined **once**, in `src/lib/event-data.ts`. Prose
interpolates those constants, so changing a number updates the whole app at
once and the guide can never contradict itself. A guard test fails if an event
number is reintroduced into `src/lib/progress.ts`.

- `CLAIM` — a fact with its status (`confirmed` / `projected` / `disputed`),
  the sources behind it, and any competing values from other sources.
- `SOURCES` — typed registry of every source, with kind and retrieval date.
- `DATA_REVISION` — one constant that reframes the guide header; bump it when
  the real patch notes land.
- `PLANS` — community progression plans a character can be put on.

## Stack

Vite + React + TypeScript, Tailwind CSS v4, shadcn/ui (radix base, nova style,
lucide icons), Vitest.

## Commands

```bash
npm install
npm run dev        # local dev server
npm test           # vitest
npm run build      # tsc -b && vite build
npm run typecheck  # tsc -b
npm run lint       # oxlint
```

## Deploy

Netlify site `challenger-world-guide`, built from `netlify.toml`
(`npm run build` → `dist`, SPA fallback).

Continuous deployment: the site is linked to this repo via the Netlify
GitHub App, and `main` is the production branch — every push to `main`
builds and deploys automatically. Deploy Previews are built for pull
requests.

To deploy from the CLI instead:

```bash
npx netlify-cli login
npx netlify-cli link --id 54efbd52-092c-4d6b-b944-4da514b3dfd4
npx netlify-cli deploy --prod
```
