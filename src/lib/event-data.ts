export type SourceKind = "official" | "community" | "local"

export type SourceId =
  | "gms-maplayer-one"
  | "wiki-availability"
  | "wiki-overdrive"
  | "nexon-events"
  | "nexon-v271"
  | "nexon-pts-v272"
  | "transcript"

export type Source = {
  id: SourceId
  title: string
  /** Public URL. Absent for sources that live in the repo (see `kind: "local"`). */
  url?: string
  /** Repo-relative path for sources that live in the repo (see `kind: "local"`). */
  path?: string
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
  "nexon-pts-v272": {
    id: "nexon-pts-v272",
    title: "Nexon — v.272 Public Test Server patch notes",
    url: "https://www.nexon.com/maplestory/public-test-server/news/update/47293/v-272-public-test-server-patch-notes",
    kind: "official",
    retrieved: "2026-10-30",
  },
  transcript: {
    id: "transcript",
    title: "jando pre-season video guide transcript",
    // Lives in the repo, not on the web — rendered as plain text, never a link.
    path: "docs/jando video guide transcript.txt",
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
  label: "v.272 Public Test Server",
  date: "2026-10-29",
  patchNotesUrl:
    "https://www.nexon.com/maplestory/public-test-server/news/update/47293/v-272-public-test-server-patch-notes" as string | null,
}

export const EVENT = {
  name: "Challenger World Season 4",
  game: "Global MapleStory (GMS)",
  startDate: "2026-11-11",
  endDate: "2027-02-09",
  part2Date: "2026-12-16",
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

export const CREST_RULES = {
  perWeek: 500,
  mobsPerWeek: 2000,
  bossCap: 2400,
  max: 6500,
  weeksToMax: 9,
  stage8Window: "Week 2–3",
  status: "projected" as Status,
  source: "transcript" as SourceId,
  notes: [] as string[],
}

// Built after the numeric fields so the prose cannot drift from the constants.
CREST_RULES.notes = [
  "Crests are no longer consumed when you upgrade the Item Burning set.",
  `${CREST_RULES.perWeek} crests per week from killing ${CREST_RULES.mobsPerWeek.toLocaleString()} mobs.`,
  `Boss crests accrue instead of resetting weekly, up to ${CREST_RULES.bossCap.toLocaleString()}.`,
  "Week 0 crests are worth grabbing — they push you a week ahead.",
  "Not confirmed by the v.272 PTS notes: they do not publish crest values. Treat these as KMS numbers until the live patch notes land.",
]

// Genesis liberation and the Item Burning crest total both happen to be 6,500.
// They are separate facts from separate systems, so neither is derived from the
// other: a patch note can move one without moving the other.
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
  notes: [] as string[],
}

GENESIS_RULES.notes = [
  `Three weeks of full Cernium clears plus one Black Mage solo leaves you at ~${GENESIS_RULES.pointsAfterThreeWeeks.toLocaleString()} of ${GENESIS_RULES.pointsToLiberate.value.toLocaleString()}.`,
  `Kill Black Mage on ${GENESIS_RULES.realisticDate} for the last ~${GENESIS_RULES.gapAfterThreeWeeks.value} points, or accept a week-4 liberation.`,
  `A ${GENESIS_RULES.dayZeroDate} liberation needs ${GENESIS_RULES.gapAfterThreeWeeks.value} points on day zero in ~3 hours — improbable (Lotus + Damien + Lucid).`,
  "Not confirmed by the v.272 PTS notes: they do not publish the Genesis point thresholds. Treat these as KMS numbers until the live patch notes land.",
  "Confirmed by the PTS: the Genesis Pass grants 3x Trace of Darkness from bosses and raises Genesis Mission party size from 2 to 6.",
]

const capCrests = () => `Cap ${CREST_RULES.perWeek} crests`

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
      `Unlock Item Burning and grab ${CREST_RULES.perWeek} crests (${CREST_RULES.mobsPerWeek.toLocaleString()} mobs)`,
      "Kill 5,000 mobs for weekly frags",
      "Arcane River + Grandis dailies and weeklies",
      "Boss clears for meso, including Hard Lotus",
      "Monster Park ×6",
      "Start Genesis liberation missions",
    ],
  },
  {
    index: 1,
    label: "Week 1",
    startDate: "2026-11-16",
    focus: `First full reset — boss crests accrue toward the ${CREST_RULES.bossCap.toLocaleString()} cap.`,
    keyTargets: [
      capCrests(),
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
      capCrests(),
      "Hold Item Burning stage 8",
      "Inkwell note expires 2026-11-23 — redeem it",
    ],
  },
  {
    index: 3,
    label: "Week 3",
    startDate: "2026-11-30",
    focus: `Genesis check: ~${GENESIS_RULES.pointsAfterThreeWeeks.toLocaleString()} points after full Cernium + one Black Mage solo.`,
    keyTargets: [
      `Kill Black Mage on ${GENESIS_RULES.realisticDate} for the last ~${GENESIS_RULES.gapAfterThreeWeeks.value} points`,
      "Otherwise accept a week-4 liberation",
      capCrests(),
    ],
  },
  {
    index: 4,
    label: "Week 4",
    startDate: "2026-12-07",
    focus: `Fallback liberation week if the ${GENESIS_RULES.realisticDate} Black Mage kill slipped.`,
    keyTargets: ["Liberate Genesis", capCrests(), "Keep boss crests at the cap"],
  },
  {
    index: 5,
    label: "Week 5",
    startDate: "2026-12-14",
    focus: `Part 2 lands ${EVENT.part2Date}: HEXA Skill Nodes, Bellona, Operation: Re-Dive.`,
    keyTargets: [
      "Unlock the 3rd set of HEXA Skill Nodes",
      "Try Bellona",
      capCrests(),
    ],
  },
  {
    index: 6,
    label: "Week 6",
    startDate: "2026-12-21",
    focus: "Mid-season — keep the weekly crest and mission routine.",
    keyTargets: [capCrests(), "Season Missions", "Weekly Growth Pass if behind"],
  },
  {
    index: 7,
    label: "Week 7",
    startDate: "2026-12-28",
    focus: "Item Burning is close to finished.",
    keyTargets: [capCrests(), "Push Item Burning stages", "Season Missions"],
  },
  {
    index: 8,
    label: "Week 8",
    startDate: "2027-01-04",
    focus: `Item Burning set should be maxed (~${CREST_RULES.weeksToMax} weeks of ${CREST_RULES.perWeek}/week plus boss crests).`,
    keyTargets: ["Finish the Item Burning set", capCrests(), "Season Missions"],
  },
  {
    index: 9,
    label: "Week 9",
    startDate: "2027-01-11",
    focus: "Clean-up: rings, scrolls and the Chosen Seren spec.",
    keyTargets: ["Finish ring and scroll sources", "Season Missions", capCrests()],
  },
  {
    index: 10,
    label: "Week 10",
    startDate: "2027-01-18",
    focus: "Tier push and remaining season missions.",
    keyTargets: ["Push tier points", "Season Missions", capCrests()],
  },
  {
    index: 11,
    label: "Week 11",
    startDate: "2027-01-25",
    focus: `Final stretch — the event ends ${EVENT.endDate}.`,
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
    summary: `${WEEKS.length} weekly resets. Item Burning stage 8 by week 2–3, Genesis liberation around ${GENESIS_RULES.pointsAfterThreeWeeks.toLocaleString()} points after three weeks, and a Black Mage kill on ${GENESIS_RULES.realisticDate} for the last ~${GENESIS_RULES.gapAfterThreeWeeks.value}.`,
    weeks: [
      {
        weekIndex: 0,
        targets: [
          { label: "Reach Lv. 260", detail: "30 min–3 h with Hyper Burning rates." },
          { label: "Unlock Item Burning" },
          {
            label: `Kill ${CREST_RULES.mobsPerWeek.toLocaleString()} mobs for ${CREST_RULES.perWeek} crests`,
            detail: "Week 0 crests push you a week ahead.",
          },
          { label: "Kill 5,000 mobs for weekly frags" },
          { label: "Arcane River + Grandis dailies and weeklies" },
          { label: "Boss clears for meso", detail: "~1.4b for an End-Lomein-worth." },
          { label: "Hard Lotus", detail: "An extra week of loot." },
          { label: "Monster Park ×6" },
          { label: "Start Genesis liberation missions" },
        ],
      },
      {
        weekIndex: 1,
        targets: [
          { label: capCrests() },
          {
            label: `Take the full ${CREST_RULES.bossCap.toLocaleString()} boss crests`,
            detail: "Normal Mayrin and below, Chaos Tenebris and below.",
          },
          { label: "Cernium clears for Genesis points" },
        ],
      },
      {
        weekIndex: 2,
        targets: [
          { label: capCrests() },
          { label: "Hold Item Burning stage 8", detail: "Going further is hard this early." },
        ],
      },
      {
        weekIndex: 3,
        targets: [
          {
            label: `Reach ~${GENESIS_RULES.pointsAfterThreeWeeks.toLocaleString()} Genesis points`,
            detail: "Full Cernium clears plus one Black Mage solo.",
          },
          {
            label: `Kill Black Mage on ${GENESIS_RULES.realisticDate} for the last ~${GENESIS_RULES.gapAfterThreeWeeks.value} points`,
            detail: "Otherwise wait for the reset.",
          },
          { label: capCrests() },
        ],
      },
      {
        weekIndex: 4,
        targets: [
          { label: `Liberate Genesis if the ${GENESIS_RULES.realisticDate} kill slipped` },
          { label: capCrests() },
        ],
      },
      {
        weekIndex: 5,
        targets: [
          {
            label: "Unlock the 3rd set of HEXA Skill Nodes",
            detail: `Part 2 lands ${EVENT.part2Date}.`,
          },
          { label: "Try Bellona" },
          { label: capCrests() },
        ],
      },
      {
        weekIndex: 6,
        targets: [
          { label: capCrests() },
          { label: "Keep boss crests at the cap" },
          { label: "Season Missions" },
        ],
      },
      {
        weekIndex: 7,
        targets: [
          { label: capCrests() },
          { label: "Push Item Burning stages" },
          { label: "Season Missions" },
        ],
      },
      {
        weekIndex: 8,
        targets: [
          {
            label: "Finish the Item Burning set",
            detail: `~${CREST_RULES.weeksToMax} weeks of ${CREST_RULES.perWeek}/week plus boss crests.`,
          },
          { label: capCrests() },
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
        targets: [{ label: "Push tier points" }, { label: capCrests() }],
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

export type RewardItem = { label: string; detail?: string }

export type Tier = {
  name: string
  /**
   * Point threshold. `null` means Nexon has not published it. Tier order comes
   * from the list order, never from the numbers, so an unpublished threshold
   * cannot corrupt the ordering.
   */
  points: Claim<number | null>
  rewards: RewardItem[]
  /** Where the tier reward can be claimed. */
  claimableIn: "challenger-world" | "either"
}

function tierPointsClaim(value: number | null): Claim<number | null> {
  return {
    value,
    status: "projected",
    sources: ["wiki-overdrive", "wiki-availability"],
    note: value === null ? "Threshold not published" : undefined,
  }
}

export const TIERS: Tier[] = [
  {
    name: "Bronze",
    points: tierPointsClaim(5000),
    rewards: [{ label: "GMS reward list pending" }],
    claimableIn: "challenger-world",
  },
  {
    name: "Silver",
    points: tierPointsClaim(10000),
    rewards: [{ label: "GMS reward list pending" }],
    claimableIn: "challenger-world",
  },
  {
    name: "Gold",
    points: tierPointsClaim(15000),
    rewards: [{ label: "GMS reward list pending" }],
    claimableIn: "challenger-world",
  },
  {
    name: "Platinum",
    points: tierPointsClaim(20000),
    rewards: [{ label: "GMS reward list pending" }],
    claimableIn: "challenger-world",
  },
  {
    name: "Emerald",
    points: tierPointsClaim(30000),
    rewards: [{ label: "GMS reward list pending" }],
    claimableIn: "either",
  },
  {
    name: "Sapphire",
    points: tierPointsClaim(null),
    rewards: [{ label: "GMS reward list pending" }],
    claimableIn: "either",
  },
  {
    name: "Diamond",
    points: tierPointsClaim(40000),
    rewards: [{ label: "GMS reward list pending" }],
    claimableIn: "either",
  },
  {
    name: "Master",
    points: tierPointsClaim(65000),
    rewards: [{ label: "GMS reward list pending" }],
    claimableIn: "either",
  },
  {
    name: "Challenger",
    points: tierPointsClaim(null),
    rewards: [{ label: "GMS reward list pending" }],
    claimableIn: "either",
  },
]

/** Tier order confirmed by the v.272 PTS notes. Point thresholds are not published there. */
export const TIER_ORDER = TIERS.map((tier) => tier.name)

/* ------------------------------------------------------------------ missions */

export type LevelMission = { level: number; points: number; coins: number }

/**
 * Level missions from the v.272 PTS notes. Reaching a level completes the
 * mission automatically in the Challenger World UI.
 */
export const LEVEL_MISSIONS: LevelMission[] = [
  { level: 260, points: 3000, coins: 3000 },
  ...[261, 262, 263, 264, 265, 266, 267, 268, 269].map((level) => ({
    level,
    points: 300,
    coins: 300,
  })),
  ...[270, 271, 272, 273, 274].map((level) => ({ level, points: 700, coins: 600 })),
  ...[275, 276, 277, 278, 279].map((level) => ({ level, points: 1000, coins: 900 })),
  ...[280, 281, 282, 283, 284].map((level) => ({ level, points: 1500, coins: 1200 })),
  ...[285, 286, 287, 288, 289].map((level) => ({ level, points: 2000, coins: 1500 })),
  { level: 290, points: 5000, coins: 2500 },
]

/** Total Challenger Points obtainable from every level mission. */
export const LEVEL_MISSION_TOTAL_POINTS = LEVEL_MISSIONS.reduce(
  (total, mission) => total + mission.points,
  0
)

export type BossMission = {
  boss: string
  difficulty: string
  points: number
  coins: number
  advancedCoins: number
}

/**
 * Boss missions from the v.272 PTS notes. Practice Mode clears count, but
 * only when solo or in a solo party. Clearing a harder difficulty counts for
 * every lower difficulty of the same boss.
 */
export const BOSS_MISSIONS: BossMission[] = [
  { boss: "Zakum", difficulty: "Chaos", points: 100, coins: 100, advancedCoins: 0 },
  { boss: "Pierre", difficulty: "Chaos", points: 200, coins: 100, advancedCoins: 0 },
  { boss: "Von Bon", difficulty: "Chaos", points: 200, coins: 100, advancedCoins: 0 },
  { boss: "Crimson Queen", difficulty: "Chaos", points: 200, coins: 200, advancedCoins: 0 },
  { boss: "Magnus", difficulty: "Hard", points: 250, coins: 200, advancedCoins: 0 },
  { boss: "Vellum", difficulty: "Chaos", points: 250, coins: 200, advancedCoins: 0 },
  { boss: "Papulatus", difficulty: "Chaos", points: 300, coins: 200, advancedCoins: 0 },
  { boss: "Lotus", difficulty: "Normal", points: 400, coins: 200, advancedCoins: 0 },
  { boss: "Lotus", difficulty: "Hard", points: 1500, coins: 400, advancedCoins: 0 },
  { boss: "Damien", difficulty: "Normal", points: 400, coins: 200, advancedCoins: 0 },
  { boss: "Damien", difficulty: "Hard", points: 1500, coins: 400, advancedCoins: 0 },
  { boss: "Guardian Angel Slime", difficulty: "Normal", points: 500, coins: 200, advancedCoins: 0 },
  { boss: "Guardian Angel Slime", difficulty: "Chaos", points: 2500, coins: 600, advancedCoins: 0 },
  { boss: "Lucid", difficulty: "Easy", points: 500, coins: 200, advancedCoins: 0 },
  { boss: "Lucid", difficulty: "Normal", points: 1000, coins: 300, advancedCoins: 0 },
  { boss: "Lucid", difficulty: "Hard", points: 2000, coins: 600, advancedCoins: 0 },
  { boss: "Will", difficulty: "Easy", points: 500, coins: 200, advancedCoins: 0 },
  { boss: "Will", difficulty: "Normal", points: 1000, coins: 300, advancedCoins: 0 },
  { boss: "Will", difficulty: "Hard", points: 2500, coins: 600, advancedCoins: 0 },
  { boss: "Kai", difficulty: "Normal", points: 1000, coins: 300, advancedCoins: 0 },
  { boss: "Gloom", difficulty: "Normal", points: 1000, coins: 300, advancedCoins: 0 },
  { boss: "Gloom", difficulty: "Chaos", points: 2500, coins: 600, advancedCoins: 0 },
  { boss: "Verus Hilla", difficulty: "Normal", points: 2000, coins: 600, advancedCoins: 0 },
  { boss: "Verus Hilla", difficulty: "Hard", points: 3000, coins: 1000, advancedCoins: 0 },
  { boss: "Darknell", difficulty: "Normal", points: 1000, coins: 300, advancedCoins: 0 },
  { boss: "Darknell", difficulty: "Hard", points: 3000, coins: 1000, advancedCoins: 0 },
  { boss: "Black Mage", difficulty: "Hard", points: 6000, coins: 1400, advancedCoins: 20 },
  { boss: "Chosen Seren", difficulty: "Normal", points: 6000, coins: 1400, advancedCoins: 20 },
  { boss: "Chosen Seren", difficulty: "Hard", points: 7000, coins: 2000, advancedCoins: 30 },
  { boss: "Kalos the Guardian", difficulty: "Easy", points: 7000, coins: 2000, advancedCoins: 30 },
  { boss: "Kalos the Guardian", difficulty: "Normal", points: 9000, coins: 3000, advancedCoins: 60 },
  { boss: "First Adversary", difficulty: "Easy", points: 7000, coins: 2000, advancedCoins: 30 },
  { boss: "First Adversary", difficulty: "Normal", points: 9000, coins: 3000, advancedCoins: 60 },
  { boss: "Kaling", difficulty: "Easy", points: 9000, coins: 3000, advancedCoins: 60 },
  { boss: "Mayrin", difficulty: "Normal", points: 5000, coins: 1200, advancedCoins: 10 },
  { boss: "Mayrin", difficulty: "Hard", points: 9000, coins: 3000, advancedCoins: 60 },
]

export const BOSS_MISSION_TOTAL_POINTS = BOSS_MISSIONS.reduce(
  (total, mission) => total + mission.points,
  0
)

export type WeeklyMission = { label: string; coins: number }

export const WEEKLY_MISSIONS: WeeklyMission[] = [
  { label: "Defeat 5,000 enemies near your level", coins: 1500 },
  { label: "Complete Monster Park 6 times", coins: 0 },
  { label: "Complete Symbol Daily Quests 12 times", coins: 0 },
]

export const WEEKLY_MISSION_MAX_COINS = 1500

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
    label: `Kill ${CREST_RULES.mobsPerWeek.toLocaleString()} mobs`,
    detail: `Item Burning Plus: ${CREST_RULES.perWeek} crests per week.`,
    category: "mobs",
    kind: "count",
    target: CREST_RULES.mobsPerWeek,
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
    detail: `Meso and boss crests up to the ${CREST_RULES.bossCap.toLocaleString()} cap.`,
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
    label: "Monster Park ×6",
    detail: "Weekly Progression Mission: clear Monster Park 6 times.",
    category: "monster-park",
    kind: "count",
    target: 6,
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
    detail: `~20k NX. Ships with Part 2 on ${EVENT.part2Date}.`,
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
    detail:
      "Removed on 2026-11-11. A new Extreme Monster Parker weekly quest replaces it: clear Monster Park 5 times, claimable on up to 2 characters per world.",
    status: "confirmed",
  },
  {
    title: "Monster Park Sweep",
    detail:
      "Clear multiple Monster Park runs at once. Free entry tickets are used before Maple Points.",
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
    detail: `Crests are no longer consumed; ${CREST_RULES.perWeek}/week from ${CREST_RULES.mobsPerWeek.toLocaleString()} mobs; boss crests accrue to ${CREST_RULES.bossCap.toLocaleString()}.`,
    status: "projected",
  },
  {
    title: "9 Challenger World tiers",
    detail:
      "Bronze, Silver, Gold, Platinum, Emerald, Sapphire, Diamond, Master, Challenger. Bronze to Platinum are claimable only in Challenger World; Emerald and up are claimable in your main world too.",
    status: "confirmed",
  },
  {
    title: "5 characters per Challenger World",
    detail:
      "Up to 5 characters, and you can designate a Quanah World Leap character at creation to receive Hyper Burning MAX benefits.",
    status: "confirmed",
  },
  {
    title: "Weekly Progression Missions",
    detail:
      "Three missions, max 1,500 Challenger Coins per week, resetting every Wednesday. A missed one costs 10,000 Maple Points to backfill.",
    status: "confirmed",
  },
  {
    title: "Beyond Burning to Lv. 280",
    detail:
      "1+1 leveling from Lv. 260 to 280, one designated character per account, and it cannot be removed once applied.",
    status: "confirmed",
  },
  {
    title: "Blueberry Farm",
    detail:
      "Lv. 260-300, a 30-minute limit, and entry passes from the Challenger Pass. Lv. 280 and above earn the same EXP as Lv. 279.",
    status: "confirmed",
  },
  {
    title: "New Recruit Support Mission",
    detail: "Milestone rewards for newly created characters, with extra rewards for a Lethe character.",
    status: "confirmed",
  },
]

export const QUANAH_BADGE_PORTABILITY: Claim<string> = {
  value: "Transferable once within your account after a World Leap",
  status: "confirmed",
  sources: ["nexon-pts-v272"],
  note: "The v.272 PTS notes settle the badge question. The Inspector's Mapae is an equippable badge from Black Mage (Hard or Extreme), not a profile badge.",
}

export const QUANAH = {
  name: "Quanah",
  status: "confirmed" as Status,
  source: "nexon-pts-v272",
  period: "November 11, 2026 (after maintenance) - February 9, 2027 11:59 PM UTC",
  summary:
    "A temporary event world built around inspector training. Characters have an Inspector Level separate from their Character Level, plus Dimensional Skills, a Mapae Module, and Hologram equipment.",
  requirements: [
    "Lv. 260 and above",
    "6th Job Advancement completed",
    "Created in a Challenger World and designated as a Quanah World Leap character",
  ],
  notes: [
    "Designate the character as a Quanah World Leap character at creation to receive Hyper Burning MAX benefits.",
    "Quanah World Leap characters cannot be designated for Beyond Burning.",
    "Equipment enhancement follows Heroic World specifications: no cubes, no Rebirth Flames.",
    "Equipment can only be enhanced with Quanah Crystals obtained inside Quanah World.",
    "Characters cannot access maps outside the designated Quanah World areas.",
    "After Quanah, characters World Leap to a world matching their original Challenger type (Interactive or Heroic).",
  ],
  inspectorLevel: {
    max: 100,
    resetsOnDeath: true,
    note: "Inspector Level resets to Lv. 1 when your character dies in Proving Fields or Battlesim. Skill Inheritance lets you keep selected Dimensional Skills across a death.",
  },
  equipment: {
    starCap: 30,
    transferableStarCap: 22,
    note: "Libae's Supercharged Equipment can be enhanced up to 30 stars; equipment that can be transferred to other worlds caps at 22 stars.",
  },
  provingFields: [
    { difficulty: "Basic", level: 270 },
    { difficulty: "Intermediate", level: 280 },
    { difficulty: "Advanced", level: 290 },
  ],
  provingFieldsNote: "Proving Fields accepts solo play or a party of up to 6.",
  badge: {
    name: "Inspector's Mapae",
    source: "Defeat Black Mage (Hard or Extreme) in Quanah World",
    note: "Can be transferred once within your account after a World Leap. Cannot be enhanced further after the leap, but Bonus Potential and Scroll Enhancement still work in Interactive Worlds.",
  },
  badgePortability: QUANAH_BADGE_PORTABILITY,
} as const

export const MAYRIN = {
  name: "Mayrin",
  status: "confirmed" as Status,
  source: "nexon-pts-v272",
  period: "November 12, 2026 12:00 AM UTC - February 9, 2027 11:59 PM UTC",
  normalLevel: 270,
  hardLevel: 280,
  partySize: 1,
  timeLimitMinutes: 20,
  frequency: "Weekly, once per account",
  notes: [
    "Accept the 'Season Boss Mayrin' quest from the Event List, or talk to Annette in Henesys, Nameless Town, Cernium Square, or the Residential District.",
    "The Defeat Mayrin Event needs a solo clear; All Phases Practice Mode counts too.",
    "Clearing a higher difficulty qualifies you for all lower-tier difficulty rewards.",
    "Defeat records are shared across characters in the same world.",
  ],
} as const

export const BLUEBERRY_FARM = {
  status: "confirmed" as Status,
  source: "nexon-pts-v272",
  minLevel: 260,
  maxLevel: 300,
  timeLimitMinutes: 30,
  reentryWindowHours: 24,
  notes: [
    "Entry Passes come from the Challenger Pass.",
    "EXP buff effects are not applied inside, and Multi-Kills do not occur.",
    "Lv. 280 and above characters earn the same EXP as a Lv. 279 character.",
    "Defeat the Giant Blueberry to bring the harvest to 100% and exit automatically.",
  ],
} as const

export const MONSTER_PARK = {
  status: "confirmed" as Status,
  source: "nexon-pts-v272",
  notes: [
    "A Sweep feature clears multiple Monster Park runs at once; free entry tickets are used before Maple Points.",
    "Monster Park Extreme and its related contents are removed.",
    "A new Extreme Monster Parker weekly quest replaces it: clear Monster Park dungeons 5 times, claimable on up to 2 characters per world.",
    "Monster Park Extreme Momo is sold for 150 Monster Park Commemorative Coins, up to 5 times a week per world.",
  ],
} as const

export const GENESIS_PASS = {
  status: "confirmed" as Status,
  source: "nexon-pts-v272",
  salePeriod: "November 12, 2026 12:00 AM UTC - February 8, 2027 11:59 PM UTC",
  expires: "February 9, 2027 11:59 PM UTC",
  notes: [
    "Purchasable once per account; untradable.",
    "Only Lv. 255+ characters who have not completed the final Genesis awakening can use it.",
    "Party size on the same Genesis Mission stage rises from 2 to 6.",
    "Grants 3x the usual Trace of Darkness from bosses, plus a special boss buff.",
    "Guarantees an Attack Power or Magic ATT Weapon Soul when the Genesis Weapon is liberated.",
  ],
} as const

export const ITEM_BURNING_PLUS = {
  status: "confirmed" as Status,
  source: "nexon-pts-v272",
  stageMissions: 8,
  notes: [
    "Available only in Challenger World, for Lv. 200+ characters who completed the 'A Greater Power' quest.",
    "One Item Burning Plus event per account; it cannot be combined with another Item Burning event.",
  ],
} as const

export const CHALLENGER_WORLD_RULES = {
  status: "confirmed" as Status,
  source: "nexon-pts-v272",
  maxCharacters: 5,
  notes: [
    "You can create up to 5 characters in Challenger World.",
    "Your first choice locks the world type: creating in Challenger-Heroic means Challenger-Interactive stays unavailable even after deleting every character.",
    "Up to 3 Tera Burning characters, Lv. 10-200, gaining 2 extra levels per level-up.",
    "Unavailable in Challenger World: Transfer Link Skill, Legion, Legion Artifact System, Monster Collection, and Expand Character Slots.",
    "The Meso Market closes February 10, 2027, before maintenance.",
  ],
} as const

export const DAY_ZERO = {
  status: "projected" as Status,
  source: "transcript",
  steps: [
    "Reach Lv. 260 (30 min–3 h depending on how hard you go).",
    "Unlock Item Burning immediately.",
    `Kill 5,000 mobs for weekly frags and ${CREST_RULES.mobsPerWeek.toLocaleString()} for Item Burning crests.`,
    "Arcane River + Grandis dailies and weeklies.",
    "Boss clears for meso (~1.4b for an End-Lomein-worth).",
    "Hard Lotus for an extra week of loot.",
    "Monster Park ×6.",
    "Genesis liberation missions.",
  ],
} as const

export const ECONOMY = {
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
