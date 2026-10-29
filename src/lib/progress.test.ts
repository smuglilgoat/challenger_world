import { describe, expect, it } from "vitest"
import {
  crestProgress,
  currentWeek,
  estimatedDaysToLiberation,
  genesisProgress,
  nextTier,
  planCompletion,
  taskCompletion,
  tierFor,
} from "./progress"
import { CREST_RULES, GENESIS_RULES, TIERS, WEEKS } from "./event-data"

describe("currentWeek", () => {
  it("returns -1 before the first week starts", () => {
    expect(currentWeek(new Date(2026, 10, 10, 23, 59), WEEKS)).toBe(-1)
  })

  it("changes index exactly on each week start date", () => {
    WEEKS.forEach((week, index) => {
      const start = new Date(`${week.startDate}T00:00:00`)
      expect(currentWeek(start, WEEKS)).toBe(index)

      const dayBefore = new Date(start)
      dayBefore.setDate(dayBefore.getDate() - 1)
      expect(currentWeek(dayBefore, WEEKS)).toBe(index - 1)
    })
  })

  it("ignores the time of day", () => {
    expect(currentWeek(new Date(2026, 10, 16, 23, 59), WEEKS)).toBe(1)
  })

  it("clamps to the last week after the event ends", () => {
    expect(currentWeek(new Date(2027, 5, 1), WEEKS)).toBe(WEEKS.length - 1)
  })

  it("returns -1 for an empty season", () => {
    expect(currentWeek(new Date(2026, 11, 1), [])).toBe(-1)
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

describe("planCompletion", () => {
  const targets = [{ label: "a" }, { label: "b" }, { label: "c" }]
  const character = { planProgress: { "0:0": true, "0:2": true, "1:0": true } }

  it("counts only the selected week's targets", () => {
    expect(planCompletion(character, targets, 0)).toEqual({ done: 2, total: 3, percent: 67 })
  })

  it("handles a week with no targets", () => {
    expect(planCompletion(character, [], 2)).toEqual({ done: 0, total: 0, percent: 0 })
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
