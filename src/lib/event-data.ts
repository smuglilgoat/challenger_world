export type SourceKind = "official" | "community" | "local"

export type SourceId =
  | "gms-maplayer-one"
  | "kms-overdrive"
  | "wiki-availability"
  | "wiki-overdrive"
  | "nexon-events"
  | "nexon-v271"
  | "transcript"

export type Source = {
  id: SourceId
  title: string
  url: string
  kind: SourceKind
  /** ISO date the source was read. */
  retrieved: string
}

export const SOURCES: Record<SourceId, Source> = {
  "gms-maplayer-one": {
    id: "gms-maplayer-one",
    title: "MMO Huts — Maplayer One winter updates",
    url: "https://mmohuts.com/news/maplestorys-maplayer-one-winter-updates-add-lethe-quanah-bellona-and-shorter-boss-fights",
    kind: "community",
    retrieved: "2026-10-29",
  },
  "kms-overdrive": {
    id: "kms-overdrive",
    title: "KMS Overdrive patch (MapleStory Wiki)",
    url: "https://maplestorywiki.net/w/MapleStory:_Overdrive",
    kind: "community",
    retrieved: "2026-10-29",
  },
  "wiki-availability": {
    id: "wiki-availability",
    title: "MapleStory Wiki — Availability",
    url: "https://maplestorywiki.net/w/Availability",
    kind: "community",
    retrieved: "2026-10-29",
  },
  "wiki-overdrive": {
    id: "wiki-overdrive",
    title: "MapleStory Wiki — Overdrive",
    url: "https://maplestorywiki.net/w/MapleStory:_Overdrive",
    kind: "community",
    retrieved: "2026-10-29",
  },
  "nexon-events": {
    id: "nexon-events",
    title: "Nexon — Challenger World and Burning Events",
    url: "https://www.nexon.com/maplestory/news/events/41132/challenger-world-and-burning-events",
    kind: "official",
    retrieved: "2026-10-29",
  },
  "nexon-v271": {
    id: "nexon-v271",
    title: "Nexon — v.271 patch notes",
    url: "https://www.nexon.com/maplestory/news/update/44597/v-271-maple-story-x-frieren-beyond-journeys-end-patch-notes",
    kind: "official",
    retrieved: "2026-10-29",
  },
  transcript: {
    id: "transcript",
    title: "jando pre-season video guide transcript",
    url: "docs/jando video guide transcript.txt",
    kind: "local",
    retrieved: "2026-10-29",
  },
}

export type ClaimStatus = "confirmed" | "projected" | "disputed"

export type Claim<T = unknown> = {
  value: T
  status: ClaimStatus
  sources: SourceId[]
  note?: string
  /** Competing values when sources disagree. */
  alternatives?: { value: unknown; source: SourceId; note?: string }[]
}

export type Status = ClaimStatus

export const STATUS_LABEL: Record<ClaimStatus, string> = {
  confirmed: "Confirmed (GMS)",
  projected: "Projected (KMS/transcript)",
  disputed: "Disputed",
}

export const SOURCE_KIND_LABEL: Record<SourceKind, string> = {
  official: "Official",
  community: "Community",
  local: "Local",
}

export const DATA_REVISION = {
  label: "Pre-season — KMS projection",
  date: "2026-10-29",
  patchNotesUrl: null as string | null,
}

export const EVENT = {
  name: "Challenger World Season 4",
  game: "Global MapleStory (GMS)",
  startDate: "2026-11-11",
  endDate: "2027-02-09",
  part2Date: "2026-12-16",
  totalWeeks: 12,
  status: "confirmed" as Status,
  source: "gms-maplayer-one",
  part1: [
    "New job Lethe",
    "Quanah event world",
    "Challenger World Season 4",
    "Quality-of-life changes",
  ],
  part2: [
    "3rd set of 6th-job HEXA Skill Nodes",
    "New boss Bellona",
    "Operation: Re-Dive",
    "Mystic Frontier Champions Season 2",
  ],
} as const

export type Week = {
  index: number
  label: string
  startDate: string
  focus: string
  keyTargets: string[]
}

export const WEEKS: Week[] = [
  {
    index: 0,
    label: "Week 0",
    startDate: "2026-11-11",
    focus: "Launch week — get to 260 and start every clock you can.",
    keyTargets: [
      "Reach Lv. 260 and complete 6th Job",
      "Unlock Item Burning and grab 500 crests (2,000 mobs)",
      "Kill 5,000 mobs for weekly frags",
      "Arcane River + Grandis dailies and weeklies",
      "Boss clears for meso, including Hard Lotus",
      "Monster Park ×5",
      "Start Genesis liberation missions",
    ],
  },
  {
    index: 1,
    label: "Week 1",
    startDate: "2026-11-16",
    focus: "First full reset — boss crests accrue toward the 2,400 cap.",
    keyTargets: [
      "Cap 500 crests",
      "Clear bosses up to Normal Mayrin / Chaos Tenebris and below",
      "Cernium clears for Genesis points",
    ],
  },
  {
    index: 2,
    label: "Week 2",
    startDate: "2026-11-23",
    focus: "Item Burning should sit around stage 8.",
    keyTargets: [
      "Cap 500 crests",
      "Hold Item Burning stage 8",
      "Inkwell note expires 2026-11-23 — redeem it",
    ],
  },
  {
    index: 3,
    label: "Week 3",
    startDate: "2026-11-30",
    focus: "Genesis check: ~6,030 points after full Cernium + one Black Mage solo.",
    keyTargets: [
      "Kill Black Mage on 2026-12-01 for the last ~470 points",
      "Otherwise accept a week-4 liberation",
      "Cap 500 crests",
    ],
  },
  {
    index: 4,
    label: "Week 4",
    startDate: "2026-12-07",
    focus: "Fallback liberation week if the 2026-12-01 Black Mage kill slipped.",
    keyTargets: ["Liberate Genesis", "Cap 500 crests", "Keep boss crests at the cap"],
  },
  {
    index: 5,
    label: "Week 5",
    startDate: "2026-12-14",
    focus: "Part 2 lands 2026-12-16: HEXA Skill Nodes, Bellona, Operation: Re-Dive.",
    keyTargets: [
      "Unlock the 3rd set of HEXA Skill Nodes",
      "Try Bellona",
      "Cap 500 crests",
    ],
  },
  {
    index: 6,
    label: "Week 6",
    startDate: "2026-12-21",
    focus: "Mid-season — keep the weekly crest and mission routine.",
    keyTargets: ["Cap 500 crests", "Season Missions", "Weekly Growth Pass if behind"],
  },
  {
    index: 7,
    label: "Week 7",
    startDate: "2026-12-28",
    focus: "Item Burning is close to finished.",
    keyTargets: ["Cap 500 crests", "Push Item Burning stages", "Season Missions"],
  },
  {
    index: 8,
    label: "Week 8",
    startDate: "2027-01-04",
    focus: "Item Burning set should be maxed (~9 weeks of 500/week plus boss crests).",
    keyTargets: ["Finish the Item Burning set", "Cap 500 crests", "Season Missions"],
  },
  {
    index: 9,
    label: "Week 9",
    startDate: "2027-01-11",
    focus: "Clean-up: rings, scrolls and the Chosen Seren spec.",
    keyTargets: ["Finish ring and scroll sources", "Season Missions", "Cap 500 crests"],
  },
  {
    index: 10,
    label: "Week 10",
    startDate: "2027-01-18",
    focus: "Tier push and remaining season missions.",
    keyTargets: ["Push tier points", "Season Missions", "Cap 500 crests"],
  },
  {
    index: 11,
    label: "Week 11",
    startDate: "2027-01-25",
    focus: "Final stretch — the event ends 2027-02-09.",
    keyTargets: ["Spend Challenger Coins", "Finish remaining missions", "Final tier push"],
  },
]

export type PlanTarget = { label: string; detail?: string }

export type Plan = {
  id: string
  name: string
  author: string
  source: SourceId
  summary: string
  weeks: { weekIndex: number; targets: PlanTarget[] }[]
}

export const PLANS: Plan[] = [
  {
    id: "jando-pre-season",
    name: "jando's pre-season route",
    author: "jando",
    source: "transcript",
    summary:
      "12 weekly resets. Item Burning stage 8 by week 2–3, Genesis liberation around 6,030 points after three weeks, and a Black Mage kill on 2026-12-01 for the last ~470.",
    weeks: [
      {
        weekIndex: 0,
        targets: [
          { label: "Reach Lv. 260", detail: "30 min–3 h with Hyper Burning rates." },
          { label: "Unlock Item Burning" },
          {
            label: "Kill 2,000 mobs for 500 crests",
            detail: "Week 0 crests push you a week ahead.",
          },
          { label: "Kill 5,000 mobs for weekly frags" },
          { label: "Arcane River + Grandis dailies and weeklies" },
          { label: "Boss clears for meso", detail: "~1.4b for an End-Lomein-worth." },
          { label: "Hard Lotus", detail: "An extra week of loot." },
          { label: "Monster Park ×5" },
          { label: "Start Genesis liberation missions" },
        ],
      },
      {
        weekIndex: 1,
        targets: [
          { label: "Cap 500 crests" },
          {
            label: "Take the full 2,400 boss crests",
            detail: "Normal Mayrin and below, Chaos Tenebris and below.",
          },
          { label: "Cernium clears for Genesis points" },
        ],
      },
      {
        weekIndex: 2,
        targets: [
          { label: "Cap 500 crests" },
          { label: "Hold Item Burning stage 8", detail: "Going further is hard this early." },
        ],
      },
      {
        weekIndex: 3,
        targets: [
          {
            label: "Reach ~6,030 Genesis points",
            detail: "Full Cernium clears plus one Black Mage solo.",
          },
          {
            label: "Kill Black Mage on 2026-12-01 for the last ~470 points",
            detail: "Otherwise wait for the reset.",
          },
          { label: "Cap 500 crests" },
        ],
      },
      {
        weekIndex: 4,
        targets: [
          { label: "Liberate Genesis if the 2026-12-01 kill slipped" },
          { label: "Cap 500 crests" },
        ],
      },
      {
        weekIndex: 5,
        targets: [
          { label: "Unlock the 3rd set of HEXA Skill Nodes", detail: "Part 2 lands 2026-12-16." },
          { label: "Try Bellona" },
          { label: "Cap 500 crests" },
        ],
      },
      {
        weekIndex: 6,
        targets: [
          { label: "Cap 500 crests" },
          { label: "Keep boss crests at the cap" },
          { label: "Season Missions" },
        ],
      },
      {
        weekIndex: 7,
        targets: [
          { label: "Cap 500 crests" },
          { label: "Push Item Burning stages" },
          { label: "Season Missions" },
        ],
      },
      {
        weekIndex: 8,
        targets: [
          {
            label: "Finish the Item Burning set",
            detail: "~9 weeks of 500/week plus boss crests.",
          },
          { label: "Cap 500 crests" },
          { label: "Season Missions" },
        ],
      },
      {
        weekIndex: 9,
        targets: [
          {
            label: "Finish ring and scroll sources",
            detail: "4 rings and at least 2 free legendary scrolls.",
          },
          { label: "Build Chosen Seren-ready spec" },
        ],
      },
      {
        weekIndex: 10,
        targets: [{ label: "Push tier points" }, { label: "Cap 500 crests" }],
      },
      {
        weekIndex: 11,
        targets: [
          { label: "Spend Challenger Coins" },
          { label: "Finish remaining missions" },
          { label: "Final tier push" },
        ],
      },
    ],
  },
]

export const TIER_POINTS_PROJECTED = {
  bronze: 5000,
  silver: 10000,
  gold: 15000,
  platinum: 20000,
  emerald: 30000,
  diamond: 40000,
  master: 65000,
} as const

export type RewardItem = { label: string; detail?: string }

export type Tier = {
  name: string
  points: Claim<number>
  rewards: RewardItem[]
  status: ClaimStatus
  source: SourceId
}

function tierPointsClaim(value: number): Claim<number> {
  return { value, status: "projected", sources: ["wiki-overdrive", "wiki-availability"] }
}

export const TIERS: Tier[] = [
  {
    name: "Bronze",
    points: tierPointsClaim(TIER_POINTS_PROJECTED.bronze),
    rewards: [{ label: "GMS reward list pending" }],
    status: "projected",
    source: "wiki-overdrive",
  },
  {
    name: "Silver",
    points: tierPointsClaim(TIER_POINTS_PROJECTED.silver),
    rewards: [{ label: "GMS reward list pending" }],
    status: "projected",
    source: "wiki-overdrive",
  },
  {
    name: "Gold",
    points: tierPointsClaim(TIER_POINTS_PROJECTED.gold),
    rewards: [{ label: "GMS reward list pending" }],
    status: "projected",
    source: "wiki-overdrive",
  },
  {
    name: "Platinum",
    points: tierPointsClaim(TIER_POINTS_PROJECTED.platinum),
    rewards: [{ label: "GMS reward list pending" }],
    status: "projected",
    source: "wiki-overdrive",
  },
  {
    name: "Emerald",
    points: tierPointsClaim(TIER_POINTS_PROJECTED.emerald),
    rewards: [{ label: "GMS reward list pending" }],
    status: "projected",
    source: "wiki-overdrive",
  },
  {
    name: "Diamond",
    points: tierPointsClaim(TIER_POINTS_PROJECTED.diamond),
    rewards: [{ label: "GMS reward list pending" }],
    status: "projected",
    source: "wiki-overdrive",
  },
  {
    name: "Master",
    points: tierPointsClaim(TIER_POINTS_PROJECTED.master),
    rewards: [{ label: "GMS reward list pending" }],
    status: "projected",
    source: "wiki-overdrive",
  },
]

export const CREST_RULES = {
  perWeek: 500,
  mobsPerWeek: 2000,
  bossCap: 2400,
  max: 6500,
  weeksToMax: 9,
  stage8Window: "Week 2–3",
  status: "projected" as Status,
  source: "transcript",
  notes: [
    "Crests are no longer consumed when you upgrade the Item Burning set.",
    "500 crests per week from killing 2,000 mobs.",
    "Boss crests accrue instead of resetting weekly, up to 2,400.",
    "Week 0 crests are worth grabbing — they push you a week ahead.",
  ],
} as const

export const GENESIS_RULES = {
  pointsToLiberate: {
    value: 6500,
    status: "projected",
    sources: ["transcript"],
  } satisfies Claim<number>,
  pointsAfterThreeWeeks: 6030,
  gapAfterThreeWeeks: {
    value: 470,
    status: "projected",
    sources: ["transcript"],
  } satisfies Claim<number>,
  realisticDate: "2026-12-01",
  fallbackWeek: "Week 4",
  dayZeroDate: "2026-11-26",
  status: "projected" as Status,
  source: "transcript" as SourceId,
  notes: [
    "Three weeks of full Cernium clears plus one Black Mage solo leaves you at ~6,030 of 6,500.",
    "Kill Black Mage on 2026-12-01 for the last ~470 points, or accept a week-4 liberation.",
    "A 2026-11-26 liberation needs 470 points on day zero in ~3 hours — improbable (Lotus + Damien + Lucid).",
    "The Genesis Pass (~30k NX) shortens liberation to ~3–4 weeks but is weak value on Heroic.",
  ],
}

export type TaskCategory =
  | "mobs"
  | "dailies"
  | "weeklies"
  | "item-burning"
  | "bosses"
  | "genesis"
  | "monster-park"
  | "notes"

export type WeeklyTask = {
  key: string
  label: string
  detail: string
  category: TaskCategory
  kind: "count" | "boolean" | "note"
  target?: number
}

export const WEEKLY_TASKS: WeeklyTask[] = [
  {
    key: "mobs-2000",
    label: "Kill 2,000 mobs",
    detail: "Item Burning Plus: 500 crests per week.",
    category: "mobs",
    kind: "count",
    target: 2000,
  },
  {
    key: "mobs-5000",
    label: "Kill 5,000 mobs",
    detail: "Weekly frags.",
    category: "mobs",
    kind: "count",
    target: 5000,
  },
  {
    key: "arcane-dailies",
    label: "Arcane River dailies",
    detail: "Symbols and Arcane Force.",
    category: "dailies",
    kind: "boolean",
  },
  {
    key: "arcane-weeklies",
    label: "Arcane River weeklies",
    detail: "Weekly Arcane River clear.",
    category: "weeklies",
    kind: "boolean",
  },
  {
    key: "grandis-dailies",
    label: "Grandis dailies",
    detail: "Sacred Symbols and Sacred Force.",
    category: "dailies",
    kind: "boolean",
  },
  {
    key: "grandis-weeklies",
    label: "Grandis weeklies",
    detail: "Weekly Grandis clear.",
    category: "weeklies",
    kind: "boolean",
  },
  {
    key: "item-burning-stage",
    label: "Item Burning stage mission",
    detail: "Complete the weekly stage mission.",
    category: "item-burning",
    kind: "boolean",
  },
  {
    key: "bosses",
    label: "Weekly boss clears",
    detail: "Meso and boss crests up to the 2,400 cap.",
    category: "bosses",
    kind: "boolean",
  },
  {
    key: "hard-lotus",
    label: "Hard Lotus",
    detail: "An extra week of loot.",
    category: "bosses",
    kind: "boolean",
  },
  {
    key: "genesis",
    label: "Genesis liberation mission",
    detail: "Cernium clears and Black Mage for points.",
    category: "genesis",
    kind: "boolean",
  },
  {
    key: "monster-park",
    label: "Monster Park ×5",
    detail: "The Monster Park Extreme XP perk now needs 5 runs per week.",
    category: "monster-park",
    kind: "count",
    target: 5,
  },
  {
    key: "note",
    label: "Notes",
    detail: "Anything else worth remembering this week.",
    category: "notes",
    kind: "note",
  },
]

export type PrepItem = {
  key: string
  label: string
  detail: string
  expiry?: string
  status: Status
  source: SourceId
}

export const PREP_CHECKLIST: PrepItem[] = [
  {
    key: "winter-countdown",
    label: "Winter countdown check-ins",
    detail:
      "~23 days, check in ~15 times. Back pet voucher, legendary scroll + legendary ring, ~50/5 note stones.",
    status: "projected",
    source: "transcript",
  },
  {
    key: "inkwell-note",
    label: "Redeem the Inkwell note",
    detail:
      "5,000 Arcane Symbols (maxes 2 symbols) or 2,000 Sacred Symbols, ~90 frags, Venge EXP vouchers, Mister cards, potential scroll, transfer potion (268→270).",
    expiry: "2026-11-23",
    status: "projected",
    source: "transcript",
  },
  {
    key: "inkwell-gift",
    label: "Inkwell's Thank You Gift",
    detail: "Claim once per account from the Maple Administrator NPC. Window: 2026-10-19 → 2026-11-22.",
    expiry: "2026-11-22",
    status: "confirmed",
    source: "nexon-events",
  },
  {
    key: "genesis-pass",
    label: "Genesis Pass / Genesis Pass Plus",
    detail:
      "~30k NX, 2x purchasable. Liberates Genesis in ~3–4 weeks instead of ~3 months; weak value for Heroic players.",
    status: "projected",
    source: "transcript",
  },
  {
    key: "challenger-pass",
    label: "Challenger Pass premium tracks",
    detail: "~20k NX each for the EXP and Premium tracks.",
    status: "projected",
    source: "transcript",
  },
  {
    key: "operation-redive",
    label: "Operation: Re-Dive",
    detail: "~20k NX. Ships with Part 2 on 2026-12-16.",
    status: "projected",
    source: "transcript",
  },
  {
    key: "quanah-pass",
    label: "Quanah pass",
    detail: "Likely 20–50k NX.",
    status: "projected",
    source: "transcript",
  },
  {
    key: "back-pets",
    label: "Back pets",
    detail: "Winter countdown + latte rewards + new recruit mission ≈ up to 3 months free.",
    status: "projected",
    source: "transcript",
  },
  {
    key: "new-recruit",
    label: "New recruit mission",
    detail: "Extra rewards plus another back pet.",
    status: "projected",
    source: "transcript",
  },
  {
    key: "level-260",
    label: "Lv. 260 + 6th Job",
    detail: "Required before the one designated character can transfer into Quanah.",
    status: "confirmed",
    source: "gms-maplayer-one",
  },
  {
    key: "burning",
    label: "Hyper Burning MAX / Beyond Burning",
    detail: "Hyper Burning MAX to Lv. 260, Beyond Burning 1+1 to Lv. 280, Hyper Blink 200→260.",
    status: "confirmed",
    source: "gms-maplayer-one",
  },
]

export type Milestone = {
  level: number
  label: string
  note: string
  status: Status
}

export const MILESTONES: Milestone[] = [
  {
    level: 260,
    label: "Lv. 260",
    note: "6th Job, temporary Lv. 30 Sol Janus, and Quanah transfer eligibility.",
    status: "confirmed",
  },
  {
    level: 268,
    label: "Lv. 268",
    note: "Inkwell transfer potion: 268 → 270 instantly.",
    status: "projected",
  },
  {
    level: 280,
    label: "Lv. 280",
    note: "XP blueberry farm caps out here.",
    status: "projected",
  },
]

export const SEASON_CHANGES: { title: string; detail: string; status: Status }[] = [
  {
    title: "Challenger Pass split",
    detail: "Separate EXP and Premium Passes; duration extended to 13 weeks.",
    status: "confirmed",
  },
  {
    title: "Arcane Seal",
    detail: "New item.",
    status: "confirmed",
  },
  {
    title: "Sol Janus Skill Support",
    detail: "Temporary Lv. 30 Sol Janus, reverted after world leaping.",
    status: "confirmed",
  },
  {
    title: "Season Missions",
    detail:
      "Ability, Arcane Force, Sacred Force, Equipment, V Matrix, HEXA Matrix, Combat Power — earn Challenger Coins.",
    status: "confirmed",
  },
  {
    title: "Weekly Growth Pass",
    detail: "10,000 Maple Points to complete previously-incomplete missions.",
    status: "confirmed",
  },
  {
    title: "Heroic Sol Erda",
    detail: "Sol Erda Fragments from hunting become account-shareable.",
    status: "confirmed",
  },
  {
    title: "Monster Park Extreme removed",
    detail: "Pending removal on 2026-11-11; the MP Extreme XP perk now needs 5 Monster Park runs/week.",
    status: "confirmed",
  },
  {
    title: "Ursus",
    detail: "One daily entry with the same total meso.",
    status: "confirmed",
  },
  {
    title: "Boss practice",
    detail: "Individual phases supported.",
    status: "confirmed",
  },
  {
    title: "Boss HP",
    detail: "Major bosses to ~2/3 HP with shorter time limits; no across-the-board Intense Power Crystal price change.",
    status: "confirmed",
  },
  {
    title: "Item Burning Plus",
    detail: "Crests are no longer consumed; 500/week from 2,000 mobs; boss crests accrue to 2,400.",
    status: "projected",
  },
]

export const QUANAH_BADGE_PORTABILITY: Claim<string> = {
  value: "World-locked to the event world",
  status: "disputed",
  sources: ["transcript"],
  note: "Whether the badge is portable to your main world is disputed and unconfirmed.",
  alternatives: [
    {
      value: "Portable to the main world",
      source: "transcript",
      note: "jando raises the possibility that the badge transfers with the character.",
    },
    {
      value: "World-locked to the event world",
      source: "transcript",
      note: "Treat the badge as staying in the event world until Nexon confirms otherwise.",
    },
  ],
}

export const QUANAH = {
  name: "Quanah",
  status: "confirmed" as Status,
  source: "gms-maplayer-one",
  summary:
    "A temporary event world with its own Inspector Level system, special equipment skills, fast leveling, dungeon stages, challenge dungeons, and boss attempts tied to entry tickets.",
  requirements: [
    "Lv. 260",
    "6th Job Advancement completed",
    "One designated Challenger World character",
  ],
  notes: [
    "The transfer is one-way and irreversible.",
    "It grants a profile badge.",
    "Whether the badge is portable to your main world is disputed and unconfirmed.",
  ],
  badgePortability: QUANAH_BADGE_PORTABILITY,
} as const

export const DAY_ZERO = {
  status: "projected" as Status,
  source: "transcript",
  steps: [
    "Reach Lv. 260 (30 min–3 h depending on how hard you go).",
    "Unlock Item Burning immediately.",
    "Kill 5,000 mobs for weekly frags and 2,000 for Item Burning crests.",
    "Arcane River + Grandis dailies and weeklies.",
    "Boss clears for meso (~1.4b for an End-Lomein-worth).",
    "Hard Lotus for an extra week of loot.",
    "Monster Park ×5.",
    "Genesis liberation missions.",
  ],
} as const

export const ECONOMY = {
  status: "projected" as Status,
  source: "transcript",
  facts: [
    "One blueberry ≈ 47% of a level at Lv. 260; 5 ≈ 2.5 levels.",
    "The XP blueberry farm caps at Lv. 280.",
    "You do not need to buy anything for the weekly reset.",
    "The event shop sells EXP Express boosters and blueberry farm tickets.",
    "4 XP coupons total, limited to 2/week.",
    "Burn two characters and designate one for Quanah at Lv. 260.",
    "A third low-investment mule is possible via Monster Park ×7/day.",
    "4 ring sources: hyperburn track ×2 internal flame ring vouchers, Lv. 210 selection coupon, countdown event, new recruit event; at least 2 free legendary scrolls.",
    "That is enough spec to clear Chosen Seren (Tenebris).",
  ],
} as const
