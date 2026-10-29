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
import { TIERS } from "./event-data"

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

describe("tierFor", () => {
  it("returns null below Bronze", () => {
    expect(tierFor(4999, TIERS)).toBeNull()
  })

  it("returns Bronze exactly at 5000", () => {
    expect(tierFor(5000, TIERS)?.name).toBe("Bronze")
  })

  it("stays Diamond just below Master", () => {
    expect(tierFor(64999, TIERS)?.name).toBe("Diamond")
  })

  it("returns Master exactly at 65000", () => {
    expect(tierFor(65000, TIERS)?.name).toBe("Master")
  })
})

describe("nextTier", () => {
  it("points at Bronze from 4999", () => {
    expect(nextTier(4999, TIERS)).toEqual({ tier: TIERS[0], pointsNeeded: 1 })
  })

  it("points at Silver from 5000", () => {
    expect(nextTier(5000, TIERS)).toEqual({ tier: TIERS[1], pointsNeeded: 5000 })
  })

  it("returns null at Master", () => {
    expect(nextTier(65000, TIERS)).toBeNull()
  })
})

describe("crestProgress", () => {
  it("reports the 6500 max and 500 weekly cap", () => {
    expect(crestProgress(0)).toEqual({ current: 0, max: 6500, percent: 0, weeklyCap: 500 })
  })

  it("reports half at 3250", () => {
    expect(crestProgress(3250).percent).toBe(50)
  })

  it("clamps above the max", () => {
    expect(crestProgress(99999)).toMatchObject({ current: 6500, percent: 100 })
  })
})

describe("genesisProgress", () => {
  it("keeps the 470-point gap after three weeks", () => {
    expect(genesisProgress(6030)).toMatchObject({
      current: 6030,
      max: 6500,
      gapAfterThreeWeeks: 470,
    })
  })

  it("clamps at liberation", () => {
    expect(genesisProgress(7000)).toMatchObject({ current: 6500, percent: 100 })
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
    expect(estimatedDaysToLiberation(6500)).toBe(0)
  })

  it("estimates a couple of days for the 470-point gap", () => {
    expect(estimatedDaysToLiberation(6030)).toBe(2)
  })
})
