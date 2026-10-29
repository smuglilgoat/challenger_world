# Challenger World Season 4 — Guide & Tracker

A visual guide and per-character weekly progress tracker for the Global MapleStory
Challenger World Season 4 event (2026-11-11 → 2027-02-09).

- **Guide** — dates, weekly timeline, tier thresholds, crest and Genesis math,
  pre-launch prep, Season 4 changes, Quanah. Every fact is marked
  **Confirmed (GMS)** or **Projected (KMS/transcript)**.
- **Characters** — add characters and track crests, Genesis points, tier points
  and a per-week checklist. Data lives in `localStorage` in your browser.

Event data lives in `docs/event-data.md` (source of truth) and
`src/lib/event-data.ts` (typed constants). Tier thresholds are Season 3 numbers
in `TIER_POINTS_PROJECTED` — swap that one constant when GMS patch notes land.

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
