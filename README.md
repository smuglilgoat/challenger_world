# Challenger World Season 4 — Guide & Tracker

A visual guide and per-character weekly progress tracker for the Global MapleStory Challenger World Season 4 event (2026-11-11 → 2027-02-09).

## What it does

- **Guide** — dates, weekly timeline, tier thresholds, crest and Genesis math, pre-launch prep, Season 4 changes and Quanah. Every fact is marked **Confirmed (GMS)** or **Projected (KMS/transcript)**.
- **Characters** — add characters and track crests, Genesis points, tier points and a per-week checklist.

Character data, checklists and the prep checklist are stored in `localStorage` in the browser. There is no backend or account.

## Data model

Event data lives in `docs/event-data.md` (source of truth) and `src/lib/event-data.ts` (typed constants).

- `CLAIM` — a fact with its status (`confirmed` / `projected` / `disputed`), its sources and any competing values.
- `SOURCES` — typed registry of every source, with kind and retrieval date.
- `DATA_REVISION` — constant that frames the guide header; bump it when the real patch notes land.
- `PLANS` — community progression plans a character can follow.

Every numeric fact is defined once in `src/lib/event-data.ts`; prose interpolates those constants. A guard test fails if an event number is reintroduced into `src/lib/progress.ts`. Tier thresholds are still Season 3 numbers, flagged **Projected** — update `tierPointsClaim(...)` when the GMS patch notes land.

## Stack

Vite + React + TypeScript, Tailwind CSS v4, shadcn/ui (Radix base, nova style, lucide icons), Vitest, oxlint.

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

Netlify site `challenger-world-guide`, built from `netlify.toml` (`npm run build` → `dist`, SPA fallback).

Every push to `main` builds and deploys to production through `.github/workflows/deploy.yml`:

```
push to main -> npm ci -> npm test -> npm run typecheck -> npm run build
             -> netlify deploy --dir=dist --prod
```

Test and typecheck are gates: a failing check means no deploy and the previous version stays live. Credentials live in repository secrets (`NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`), never in the repo.

From the CLI:

```bash
npx netlify-cli login
npx netlify-cli link --id 54efbd52-092c-4d6b-b944-4da514b3dfd4
npx netlify-cli deploy --prod
```

## Notes

- The Netlify GitHub App is not connected, so the Actions workflow performs the deploy. If native Netlify Git CD is enabled later, delete the workflow so both paths do not deploy.
- `docs/` also holds the patch notes and video transcripts used to source the event data.
