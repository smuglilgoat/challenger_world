# Challenger World Season 4 — event data

Single source of truth for the app. Every fact lives in `src/lib/event-data.ts`;
the guide imports it and never restates a number. This file mirrors that module
for humans.

## Model

- **Claim** — a value plus its confidence and provenance:
  `{ value, status, sources, note?, alternatives? }`.
- **Claim status** — `confirmed` (GMS), `projected` (KMS/transcript), or
  `disputed` (sources disagree).
- **Alternatives** — competing values, each with its own source, so a conflict is
  visible instead of silently overwritten.
- **Source registry** — `SOURCES` is keyed by `SourceId`; facts point at IDs, not
  URLs.
- **Data revision** — `DATA_REVISION` frames the whole guide. One edit flips it
  when the real patch notes land.

## Sources

| ID | Title | Kind | Retrieved | URL |
| --- | --- | --- | --- | --- |
| `gms-maplayer-one` | MMO Huts — Maplayer One | Community | 2026-10-29 | https://mmohuts.com/news/maplestorys-maplayer-one-winter-updates-add-lethe-quanah-bellona-and-shorter-boss-fights |
| `kms-overdrive` | KMS Overdrive patch (MapleStory Wiki) | Community | 2026-10-29 | https://maplestorywiki.net/w/MapleStory:_Overdrive |
| `wiki-availability` | MapleStory Wiki — Availability | Community | 2026-10-29 | https://maplestorywiki.net/w/Availability |
| `wiki-overdrive` | MapleStory Wiki — Overdrive | Community | 2026-10-29 | https://maplestorywiki.net/w/MapleStory:_Overdrive |
| `nexon-events` | Nexon — Challenger World and Burning Events | Official | 2026-10-29 | https://www.nexon.com/maplestory/news/events/41132/challenger-world-and-burning-events |
| `nexon-v271` | Nexon — v.271 patch notes | Official | 2026-10-29 | https://www.nexon.com/maplestory/news/update/44597/v-271-maple-story-x-frieren-beyond-journeys-end-patch-notes |
| `transcript` | jando pre-season transcript | Local | 2026-10-29 | `docs/jando video guide transcript.txt` |

Add a new source by adding one entry to `SOURCES`; the guide's Sources card picks
it up automatically.

## Data revision

| Field | Value |
| --- | --- |
| Label | Pre-season — KMS projection |
| Date | 2026-10-29 |
| GMS patch notes | not published yet (`patchNotesUrl: null`) |

## Event

| Fact | Value | Status | Sources |
| --- | --- | --- | --- |
| Event | Challenger World Season 4 (GMS) | Confirmed | `gms-maplayer-one` |
| Launch | 2026-11-11 | Confirmed | `gms-maplayer-one` |
| End | 2027-02-09 | Confirmed | `gms-maplayer-one` |
| Part 2 | 2026-12-16 | Confirmed | `gms-maplayer-one` |
| Part 1 content | New job Lethe, Quanah event world, Challenger World S4, QoL | Confirmed | `gms-maplayer-one` |
| Part 2 content | 3rd set of 6th-job HEXA Skill Nodes, boss Bellona, Operation: Re-Dive, Mystic Frontier Champions S2 | Confirmed | `gms-maplayer-one` |
| Weekly resets | 12, driven by `WEEKS` | Confirmed | `gms-maplayer-one` |

## Weekly timeline

`currentWeek()` returns the last `WEEKS[i].startDate` on or before today, so the
timeline and the tracker cannot drift apart.

| Week | Start | Focus |
| --- | --- | --- |
| Week 0 | 2026-11-11 | Launch week — get to 260 and start every clock you can. |
| Week 1 | 2026-11-16 | First full reset — boss crests accrue toward the 2,400 cap. |
| Week 2 | 2026-11-23 | Item Burning should sit around stage 8. |
| Week 3 | 2026-11-30 | Genesis check: ~6,030 points after full Cernium + one Black Mage solo. |
| Week 4 | 2026-12-07 | Fallback liberation week if the 2026-12-01 Black Mage kill slipped. |
| Week 5 | 2026-12-14 | Part 2 lands 2026-12-16: HEXA Skill Nodes, Bellona, Operation: Re-Dive. |
| Week 6 | 2026-12-21 | Mid-season — keep the weekly crest and mission routine. |
| Week 7 | 2026-12-28 | Item Burning is close to finished. |
| Week 8 | 2027-01-04 | Item Burning set should be maxed (~9 weeks of 500/week plus boss crests). |
| Week 9 | 2027-01-11 | Clean-up: rings, scrolls and the Chosen Seren spec. |
| Week 10 | 2027-01-18 | Tier push and remaining season missions. |
| Week 11 | 2027-01-25 | Final stretch — the event ends 2027-02-09. |

## Quanah (event world)

| Fact | Value | Status | Sources |
| --- | --- | --- | --- |
| Type | Temporary event world with its own Inspector Level system | Confirmed | `gms-maplayer-one` |
| Features | Special equipment skills, fast leveling, dungeon stages, challenge dungeons, boss attempts on entry tickets | Confirmed | `gms-maplayer-one` |
| Transfer requirement | Lv. 260 **and** 6th Job Advancement | Confirmed | `gms-maplayer-one` |
| Transfer | One designated Challenger World character; one-way and irreversible | Confirmed | `gms-maplayer-one` |
| Reward | Profile badge | Confirmed | `gms-maplayer-one` |

### Disputed claim — badge portability

`QUANAH_BADGE_PORTABILITY` is the first `disputed` claim.

| Field | Value | Source |
| --- | --- | --- |
| Default position | World-locked to the event world | `transcript` |
| Alternative | Portable to the main world | `transcript` |
| Alternative | World-locked to the event world | `transcript` |

The UI renders the alternatives next to the warning badge so the reader sees the
disagreement instead of a single confident answer.

## Season 4 changes vs Season 3

These entries carry a status only; the source is the pre-season article
(`gms-maplayer-one`) unless noted.

| Fact | Value | Status |
| --- | --- | --- |
| Challenger Pass | Split into separate EXP and Premium Passes; duration extended to 13 weeks | Confirmed |
| Arcane Seal | New item | Confirmed |
| Sol Janus Skill Support | Temporary Lv. 30 Sol Janus, reverted after world leaping | Confirmed |
| Season Missions | Ability, Arcane Force, Sacred Force, Equipment, V Matrix, HEXA Matrix, Combat Power → Challenger Coins | Confirmed |
| Weekly Growth Pass | 10,000 Maple Points to complete previously-incomplete missions | Confirmed |
| Heroic Worlds | Sol Erda Fragments from hunting become account-shareable | Confirmed |
| Monster Park Extreme | Removed (pending removal 2026-11-11) | Confirmed |
| Ursus | One daily entry, same total meso | Confirmed |
| Boss practice | Individual phases supported | Confirmed |
| Major bosses | HP reduced to ~2/3, shorter time limits | Confirmed |
| Intense Power Crystals | No across-the-board price change | Confirmed |
| Item Burning Plus | Crests are no longer consumed; 500/week from 2,000 mobs; boss crests accrue to 2,400 | Projected |

## Item Burning Plus crests

| Fact | Value | Status | Sources |
| --- | --- | --- | --- |
| Crests consumed | No — crests are no longer consumed | Projected | `transcript` |
| Weekly crests | 500/week from killing 2,000 mobs | Projected | `transcript` |
| Boss crests | Accrue, do not reset weekly, cap 2,400 | Projected | `transcript` |
| Total to max the set | 6,500 | Projected | `transcript` |
| Time to max | ~9 weeks of 500/week plus boss crests | Projected | `transcript` |
| Stage 8 | Reached around week 2–3 | Projected | `transcript` |
| Week 0 | Grabbing 500 crests in week 0 pushes you a week ahead | Projected | `transcript` |

`progress.ts` reads `CREST_RULES.max` and `CREST_RULES.perWeek`; changing either
number here moves the guide, the progress bar and the cap together.

## Genesis liberation

| Fact | Value | Status | Sources |
| --- | --- | --- | --- |
| Points to liberate | 6,500 (`Claim<number>`) | Projected | `transcript` |
| After 3 weeks | ~6,030 (full Cernium clears + 1 Black Mage solo) | Projected | `transcript` |
| Gap | ~470 points (`Claim<number>`) | Projected | `transcript` |
| Realistic liberation | Kill Black Mage on 2026-12-01, or accept a week-4 liberation | Projected | `transcript` |
| Day-zero liberation | 2026-11-26 possible but improbable (470 points in ~3 hours) | Projected | `transcript` |
| Genesis Pass | ~30k NX, 2x purchasable, ~3–4 weeks instead of ~3 months; low value for Heroic | Projected | `transcript` |

`estimatedDaysToLiberation()` derives its daily rate from
`pointsAfterThreeWeeks / 21`, so it has no constant of its own.

## Tier thresholds

Season 3 thresholds, shipped as projected until GMS patch notes land. Each tier
carries a `Claim<number>`; a competing threshold goes in `alternatives` with its
source instead of replacing the value.

| Tier | Points | Status | Sources |
| --- | --- | --- | --- |
| Bronze | 5,000 | Projected | `wiki-overdrive`, `wiki-availability` |
| Silver | 10,000 | Projected | `wiki-overdrive`, `wiki-availability` |
| Gold | 15,000 | Projected | `wiki-overdrive`, `wiki-availability` |
| Platinum | 20,000 | Projected | `wiki-overdrive`, `wiki-availability` |
| Emerald | 30,000 | Projected | `wiki-overdrive`, `wiki-availability` |
| Diamond | 40,000 | Projected | `wiki-overdrive`, `wiki-availability` |
| Master | 65,000 | Projected | `wiki-overdrive`, `wiki-availability` |

Rewards are a `RewardItem[]`; the placeholder is
`{ label: "GMS reward list pending" }`. Real rewards drop in without touching
`TierTable`.

## Community progression plans

A plan is a named route with per-week targets. Attach one to a character with
`planId`; tick targets into `planProgress` keyed `weekIndex:targetIndex`.

### `jando-pre-season` — jando's pre-season route

Source: `transcript`. Summary: 12 weekly resets, Item Burning stage 8 by week
2–3, Genesis liberation around 6,030 points after three weeks, and a Black Mage
kill on 2026-12-01 for the last ~470.

| Week | Targets |
| --- | --- |
| 0 | Reach Lv. 260 (30 min–3 h) · unlock Item Burning · 2,000 mobs for 500 crests · 5,000 mobs for frags · Arcane River + Grandis dailies and weeklies · boss clears for meso (~1.4b) · Hard Lotus · Monster Park ×5 · start Genesis missions |
| 1 | Cap 500 crests · take the full 2,400 boss crests (Normal Mayrin and below) · Cernium clears |
| 2 | Cap 500 crests · hold Item Burning stage 8 |
| 3 | Reach ~6,030 Genesis points · kill Black Mage on 2026-12-01 for the last ~470 · cap 500 crests |
| 4 | Liberate Genesis if the 2026-12-01 kill slipped · cap 500 crests |
| 5 | Unlock the 3rd HEXA Skill Node set (Part 2, 2026-12-16) · try Bellona · cap 500 crests |
| 6 | Cap 500 crests · keep boss crests at the cap · Season Missions |
| 7 | Cap 500 crests · push Item Burning stages · Season Missions |
| 8 | Finish the Item Burning set · cap 500 crests · Season Missions |
| 9 | Finish ring and scroll sources (4 rings, at least 2 free legendary scrolls) · build Chosen Seren-ready spec |
| 10 | Push tier points · cap 500 crests |
| 11 | Spend Challenger Coins · finish remaining missions · final tier push |

## Pre-launch prep

| Item | Detail | Expiry | Status | Source |
| --- | --- | --- | --- | --- |
| Winter countdown | ~23 days, check in ~15 times: back pet voucher, legendary scroll + legendary ring, ~50/5 note stones | — | Projected | `transcript` |
| Inkwell note | 5,000 Arcane Symbols (maxes 2 symbols) **or** 2,000 Sacred Symbols, ~90 frags, Venge EXP vouchers, Mister cards, potential scroll, transfer potion (268→270) | 2026-11-23 | Projected | `transcript` |
| Inkwell's Thank You Gift | Claim once per account from the Maple Administrator NPC | 2026-11-22 | Confirmed | `nexon-events` |
| Genesis Pass / Pass Plus | ~30k NX, 2x purchasable; ~3–4 weeks to liberate instead of ~3 months; weak for Heroic | — | Projected | `transcript` |
| Challenger Pass premium tracks | ~20k NX each (EXP and Premium) | — | Projected | `transcript` |
| Operation: Re-Dive | ~20k NX, ships 2026-12-16 | — | Projected | `transcript` |
| Quanah pass | Likely 20–50k NX | — | Projected | `transcript` |
| Back pets | Winter countdown + latte rewards + new recruit mission ≈ up to 3 months free | — | Projected | `transcript` |
| New recruit mission | Extra rewards plus another back pet | — | Projected | `transcript` |
| Lv. 260 + 6th Job | Required before the Quanah transfer | — | Confirmed | `gms-maplayer-one` |
| Hyper Burning MAX / Beyond Burning | 260 free, Beyond Burning 1+1 to 280, Hyper Blink 200→260 | — | Confirmed | `gms-maplayer-one` |

## Level milestones

| Level | Label | Note | Status |
| --- | --- | --- | --- |
| 260 | Lv. 260 | 6th Job, temporary Lv. 30 Sol Janus, and Quanah transfer eligibility | Confirmed |
| 268 | Lv. 268 | Inkwell transfer potion: 268 → 270 instantly | Projected |
| 280 | Lv. 280 | XP blueberry farm caps out here | Projected |

## Day-zero priorities (projected)

Reach Lv. 260 (30 min–3 h) → unlock Item Burning → 5,000 mobs (weekly frags)
and 2,000 mobs (crests) → Arcane River + Grandis dailies and weeklies → bosses
for meso (~1.4b for an End-Lomein-worth) → Hard Lotus (extra week of loot) →
Monster Park ×5 (MP Extreme XP perk now needs 5 runs/week) → Genesis
liberation missions.

## Economy and consumables (projected)

| Fact | Value |
| --- | --- |
| Blueberry | ~47% of a level at Lv. 260; 5 ≈ 2.5 levels |
| Blueberry farm cap | Lv. 280 |
| Event shop | Nothing needed for weekly reset; sells EXP Express boosters and blueberry farm tickets |
| XP coupons | 4 total, limited to 2/week |
| Characters | Burn two, designate one for Quanah at 260; a third low-investment mule via Monster Park ×7/day |
| Accessory rings | 4 sources: hyperburn track ×2 internal flame ring vouchers, Lv. 210 selection coupon, countdown event, new recruit event; at least 2 free legendary scrolls |
| Spec goal | Enough to clear Chosen Seren (Tenebris) |

## How to update this data

1. **New source** — add one entry to `SOURCES` in `src/lib/event-data.ts` and one
   row to the Sources table above. Every fact refers to it by ID.
2. **New fact** — add it to `event-data.ts`, mirror it here, and bump
   `DATA_REVISION` (`label`, `date`, and `patchNotesUrl` once the GMS notes
   exist). One revision edit reframes the whole guide.
3. **Conflicting values** — keep the current value and add
   `alternatives: [{ value, source, note }]` to the claim, with
   `status: "disputed"`. The UI renders each alternative and its source.
4. **New tier reward** — add a `RewardItem` to the tier's `rewards` array.
   `TierTable` renders the list as-is.
5. **New plan** — add a `Plan` to `PLANS` with per-week targets; the character
   card's selector and checklist pick it up automatically.
6. **Numeric change** — change it only in `event-data.ts`. `progress.ts` imports
   the constants, so the guide and the progress bars cannot disagree.
7. **Stored schema change** — bump the `version` in `use-characters.ts` and add a
   migration in `migrateCharacter`; never discard saved characters.
