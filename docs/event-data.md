# Challenger World Season 4 — event data

Single source of truth for the app. Every entry is tagged **Confirmed (GMS)** or
**Projected (KMS/transcript)**. The guide UI imports this data from
`src/lib/event-data.ts`; do not add facts to the UI that are not here.

## Sources

| Key | URL |
| --- | --- |
| Overdrive (wiki) | https://maplestorywiki.net/w/MapleStory:_Overdrive |
| Availability (wiki) | https://maplestorywiki.net/w/Availability |
| MMO Huts — Maplayer One | https://mmohuts.com/news/maplestorys-maplayer-one-winter-updates-add-lethe-quanah-bellona-and-shorter-boss-fights |
| Nexon — Challenger World and Burning Events | https://www.nexon.com/maplestory/news/events/41132/challenger-world-and-burning-events |
| Nexon — v.271 patch notes | https://www.nexon.com/maplestory/news/update/44597/v-271-maple-story-x-frieren-beyond-journeys-end-patch-notes |
| jando pre-season transcript | `docs/jando video guide transcript.txt` |

## Event

| Fact | Value | Status | Source |
| --- | --- | --- | --- |
| Event | Challenger World Season 4 (GMS) | Confirmed (GMS) | MMO Huts |
| Launch | 2026-11-11, "Maplayer One" Part 1 | Confirmed (GMS) | MMO Huts |
| End | 2027-02-09, ~12 weekly resets | Confirmed (GMS) | MMO Huts, transcript |
| Part 2 | 2026-12-16 | Confirmed (GMS) | MMO Huts |
| Part 1 content | New job Lethe, Quanah event world, Challenger World S4, QoL | Confirmed (GMS) | MMO Huts |
| Part 2 content | 3rd set of 6th-job HEXA Skill Nodes, boss Bellona, Operation: Re-Dive, Mystic Frontier Champions S2 | Confirmed (GMS) | MMO Huts |
| Season 4 bosses | Kai (Normal, nerfed, 10 deaths, Item Burning + CW missions only), Mayrin (Normal + Hard) | Confirmed (GMS) | MMO Huts |
| Weekly reset | Monday | Confirmed (GMS) | transcript |

## Quanah (event world)

| Fact | Value | Status | Source |
| --- | --- | --- | --- |
| Type | Temporary event world with its own Inspector Level system | Confirmed (GMS) | MMO Huts |
| Features | Special equipment skills, fast leveling, dungeon stages, challenge dungeons, boss attempts on entry tickets | Confirmed (GMS) | MMO Huts |
| Transfer requirement | Lv. 260 **and** 6th Job Advancement | Confirmed (GMS) | MMO Huts, transcript |
| Transfer | One designated Challenger World character; one-way and irreversible | Confirmed (GMS) | MMO Huts |
| Reward | Profile badge | Confirmed (GMS) | MMO Huts |
| Badge portability to main world | Disputed / unconfirmed | Projected (KMS/transcript) | transcript |

## Season 4 changes vs Season 3

| Fact | Value | Status | Source |
| --- | --- | --- | --- |
| Challenger Pass | Split into separate EXP and Premium Passes; duration extended to 13 weeks | Confirmed (GMS) | MMO Huts |
| Arcane Seal | New item | Confirmed (GMS) | MMO Huts |
| Sol Janus Skill Support | Temporary Lv. 30 Sol Janus, reverted after world leaping | Confirmed (GMS) | MMO Huts |
| Season Missions | Ability, Arcane Force, Sacred Force, Equipment, V Matrix, HEXA Matrix, Combat Power → Challenger Coins | Confirmed (GMS) | MMO Huts |
| Weekly Growth Pass | 10,000 Maple Points to complete previously-incomplete missions | Confirmed (GMS) | MMO Huts |
| Heroic Worlds | Sol Erda Fragments from hunting become account-shareable | Confirmed (GMS) | MMO Huts |
| Monster Park Extreme | Removed (pending removal 2026-11-11) | Confirmed (GMS) | MMO Huts, transcript |
| Ursus | One daily entry, same total meso | Confirmed (GMS) | MMO Huts |
| Boss practice | Individual phases supported | Confirmed (GMS) | MMO Huts |
| Epic Dungeons / Monster Park | Streamlined | Confirmed (GMS) | MMO Huts |
| Major bosses | HP reduced to ~2/3, shorter time limits | Confirmed (GMS) | MMO Huts |
| Intense Power Crystals | No across-the-board price change | Confirmed (GMS) | MMO Huts |
| Growth support | Hyper Burning MAX to Lv. 260, Beyond Burning 1+1 to Lv. 280, Hyper Blink 200→260, Item Burning Plus | Confirmed (GMS) | MMO Huts, Nexon |
| Inkwell's Thank You Gift | Once per account, Maple Administrator NPC, 2026-10-19 → 2026-11-22 | Confirmed (GMS) | Nexon events |

## Item Burning Plus crests

| Fact | Value | Status | Source |
| --- | --- | --- | --- |
| Crests consumed | No — crests are no longer consumed | Projected (KMS/transcript) | transcript |
| Weekly crests | 500/week from killing 2,000 mobs | Projected (KMS/transcript) | transcript |
| Boss crests | Accrue, do not reset weekly, cap 2,400 | Projected (KMS/transcript) | transcript |
| Total to max the set | 6,500 | Projected (KMS/transcript) | transcript |
| Time to max | ~9 weeks of 500/week plus boss crests | Projected (KMS/transcript) | transcript |
| Stage 8 | Reached around week 2–3 | Projected (KMS/transcript) | transcript |
| Week 0 | Grabbing 500 crests in week 0 pushes you a week ahead | Projected (KMS/transcript) | transcript |

## Genesis liberation

| Fact | Value | Status | Source |
| --- | --- | --- | --- |
| Points to liberate | 6,500 | Projected (KMS/transcript) | transcript |
| After 3 weeks | ~6,030 (full Cernium clears + 1 Black Mage solo) | Projected (KMS/transcript) | transcript |
| Gap | ~470 points | Projected (KMS/transcript) | transcript |
| Realistic liberation | Kill Black Mage on 2026-12-01, or accept a week-4 liberation | Projected (KMS/transcript) | transcript |
| Day-zero liberation | 2026-11-26 possible but improbable (470 points in ~3 hours, e.g. Lotus + Damien + Lucid) | Projected (KMS/transcript) | transcript |
| Genesis Pass | ~30k NX, 2x purchasable, ~3–4 weeks instead of ~3 months; low value for Heroic | Projected (KMS/transcript) | transcript |

## Tier thresholds

Season 3 thresholds, shipped as projected until GMS patch notes land. Swap
`TIER_POINTS_PROJECTED` in `src/lib/event-data.ts`.

| Tier | Points | Status | Source |
| --- | --- | --- | --- |
| Bronze | 5,000 | Projected (KMS/transcript) | Overdrive / Availability |
| Silver | 10,000 | Projected (KMS/transcript) | Overdrive / Availability |
| Gold | 15,000 | Projected (KMS/transcript) | Overdrive / Availability |
| Platinum | 20,000 | Projected (KMS/transcript) | Overdrive / Availability |
| Emerald | 30,000 | Projected (KMS/transcript) | Overdrive / Availability |
| Diamond | 40,000 | Projected (KMS/transcript) | Overdrive / Availability |
| Master | 65,000 | Projected (KMS/transcript) | Overdrive / Availability |

## Pre-launch prep

| Item | Detail | Expiry | Status | Source |
| --- | --- | --- | --- | --- |
| Winter countdown | ~23 days, check in ~15 times: back pet voucher, legendary scroll + legendary ring, ~50/5 note stones | — | Projected (KMS/transcript) | transcript |
| Inkwell note | 5,000 Arcane Symbols (maxes 2 symbols) **or** 2,000 Sacred Symbols, ~90 frags, Venge EXP vouchers, Mister cards, potential scroll, transfer potion (268→270) | 2026-11-23 | Projected (KMS/transcript) | transcript |
| Inkwell's Thank You Gift | Claim once per account from the Maple Administrator NPC | 2026-11-22 | Confirmed (GMS) | Nexon events |
| Genesis Pass / Pass Plus | ~30k NX, 2x purchasable; ~3–4 weeks to liberate instead of ~3 months; weak for Heroic | — | Projected (KMS/transcript) | transcript |
| Challenger Pass premium tracks | ~20k NX each (EXP and Premium) | — | Projected (KMS/transcript) | transcript |
| Operation: Re-Dive | ~20k NX, ships 2026-12-16 | — | Projected (KMS/transcript) | transcript, MMO Huts |
| Quanah pass | Likely 20–50k NX | — | Projected (KMS/transcript) | transcript |
| Back pets | Winter countdown + latte rewards + new recruit mission ≈ up to 3 months free | — | Projected (KMS/transcript) | transcript |
| New recruit mission | Extra rewards plus another back pet | — | Projected (KMS/transcript) | transcript |
| Lv. 260 + 6th Job | Required before the Quanah transfer | — | Confirmed (GMS) | MMO Huts |
| Hyper Burning MAX / Beyond Burning | 260 free, Beyond Burning 1+1 to 280, Hyper Blink 200→260 | — | Confirmed (GMS) | MMO Huts |

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
