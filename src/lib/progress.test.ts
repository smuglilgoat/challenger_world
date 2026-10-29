import { describe, expect, it } from "vitest"
import {
  crestProgress,
  currentWeek,
  estimatedDaysToLiberation,
  genesisProgress,
  nextTier,
  taskCompletion,
  tierFor,
} from "./progress"
import { CREST_RULES, GENESIS_RULES, TIERS } from "./event-data"

describe("currentWeek", () => {
  const start = "2026-11-11"

  it("returns -1 before the event starts", () => {
    expect(currentWeek(new Date(2026, 10, 10, 23, 59), start, 12)).toBe(-1)
  })

  it("returns 0 on launch day", () => {
    expect(currentWeek(new Date(2026, 10, 11, 0, 0), start, 12)).toBe(0)
  })

  it("advances one week per seven days", () => {
    expect(currentWeek(new Date(2026, 11, 2), start, 12)).toBe(3)
  })

  it("clamps to the last week after the event ends", () => {
    expect(currentWeek(new Date(2027, 5, 1), start, 12)).toBe(11)
  })

  it("returns -1 for an empty season", () => {
    expect(currentWeek(new Date(2026, 11, 1), start, 0)).toBe(-1)
  })
})

const bronze = TIERS[0].points.value
const silver = TIERS[1].points.value
const master = TIERS[TIERS.length - 1].points.value

describe("tierFor", () => {
  it("returns null below Bronze", () => {
    expect(tierFor(bronze - 1, TIERS)).toBeNull()
  })

  it("returns Bronze exactly at its threshold", () => {
    expect(tierFor(bronze, TIERS)?.name).toBe("Bronze")
  })

  it("stays Diamond just below Master", () => {
    expect(tierFor(master - 1, TIERS)?.name).toBe("Diamond")
  })

  it("returns Master exactly at its threshold", () => {
    expect(tierFor(master, TIERS)?.name).toBe("Master")
  })
})

describe("nextTier", () => {
  it("points at Bronze from one point below", () => {
    expect(nextTier(bronze - 1, TIERS)).toEqual({ tier: TIERS[0], pointsNeeded: 1 })
  })

  it("points at Silver from Bronze", () => {
    expect(nextTier(bronze, TIERS)).toEqual({ tier: TIERS[1], pointsNeeded: silver - bronze })
  })

  it("returns null at Master", () => {
    expect(nextTier(master, TIERS)).toBeNull()
  })
})

describe("crestProgress", () => {
  it("reports the max and weekly cap defined in event data", () => {
    expect(crestProgress(0)).toEqual({
      current: 0,
      max: CREST_RULES.max,
      percent: 0,
      weeklyCap: CREST_RULES.perWeek,
    })
  })

  it("reads its max from event data", () => {
    expect(crestProgress(123).max).toBe(CREST_RULES.max)
  })

  it("reports half at half the max", () => {
    expect(crestProgress(CREST_RULES.max / 2).percent).toBe(50)
  })

  it("clamps above the max", () => {
    expect(crestProgress(99999)).toMatchObject({ current: CREST_RULES.max, percent: 100 })
  })
})

describe("genesisProgress", () => {
  it("keeps the gap after three weeks", () => {
    expect(genesisProgress(GENESIS_RULES.pointsAfterThreeWeeks)).toMatchObject({
      current: GENESIS_RULES.pointsAfterThreeWeeks,
      max: GENESIS_RULES.pointsToLiberate.value,
      gapAfterThreeWeeks: GENESIS_RULES.gapAfterThreeWeeks.value,
    })
  })

  it("clamps at liberation", () => {
    expect(genesisProgress(7000)).toMatchObject({
      current: GENESIS_RULES.pointsToLiberate.value,
      percent: 100,
    })
  })
})

describe("taskCompletion", () => {
  const tasks = [{ key: "a" }, { key: "b" }, { key: "c" }, { key: "d" }]
  const character = { weeks: { "0:a": true, "0:b": true, "1:a": true } }

  it("counts only the requested week", () => {
    expect(taskCompletion(character, tasks, 0)).toEqual({ done: 2, total: 4, percent: 50 })
  })

  it("defaults to week 0", () => {
    expect(taskCompletion(character, tasks).done).toBe(2)
  })

  it("handles an empty task list", () => {
    expect(taskCompletion(character, [], 0)).toEqual({ done: 0, total: 0, percent: 0 })
  })
})

describe("estimatedDaysToLiberation", () => {
  it("is zero once liberated", () => {
    expect(estimatedDaysToLiberation(GENESIS_RULES.pointsToLiberate.value)).toBe(0)
  })

  it("estimates a couple of days for the gap after three weeks", () => {
    expect(estimatedDaysToLiberation(GENESIS_RULES.pointsAfterThreeWeeks)).toBe(2)
  })
})
