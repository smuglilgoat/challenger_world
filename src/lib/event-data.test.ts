import { describe, expect, it } from "vitest"
import {
  BOSS_MISSIONS,
  CREST_RULES,
  GENESIS_RULES,
  LEVEL_MISSIONS,
  QUANAH_BADGE_PORTABILITY,
  SOURCES,
  TIERS,
  WEEKLY_MISSION_MAX_COINS,
  WEEKS,
} from "./event-data"

describe("claims", () => {
  it("resolves the Quanah badge question against the official patch notes", () => {
    // The v.272 PTS notes settled this; it is no longer a dispute.
    const claim = QUANAH_BADGE_PORTABILITY
    expect(claim.status).toBe("confirmed")
    expect(claim.sources).toContain("nexon-pts-v272")
    expect(claim.alternatives ?? []).toHaveLength(0)
  })

  it("gives every tier threshold a claim with a registered source", () => {
    for (const tier of TIERS) {
      expect(tier.points.sources.length).toBeGreaterThan(0)
      for (const source of tier.points.sources) {
        expect(SOURCES[source]).toBeDefined()
      }
    }
  })

  it("marks an unpublished tier threshold as null rather than guessing", () => {
    const sapphire = TIERS.find((tier) => tier.name === "Sapphire")
    const challenger = TIERS.find((tier) => tier.name === "Challenger")
    expect(sapphire?.points.value).toBeNull()
    expect(challenger?.points.value).toBeNull()
  })
})

describe("event values", () => {
  it("pins the numbers the guide quotes", () => {
    expect(CREST_RULES.max).toBe(6500)
    expect(CREST_RULES.perWeek).toBe(500)
    expect(CREST_RULES.mobsPerWeek).toBe(2000)
    expect(CREST_RULES.bossCap).toBe(2400)
    expect(GENESIS_RULES.pointsToLiberate.value).toBe(6500)
    expect(GENESIS_RULES.pointsAfterThreeWeeks).toBe(6030)
    expect(GENESIS_RULES.gapAfterThreeWeeks.value).toBe(470)
    expect(WEEKS).toHaveLength(12)
  })

  it("pins the v.272 PTS tier order and mission tables", () => {
    expect(TIERS.map((tier) => tier.name)).toEqual([
      "Bronze",
      "Silver",
      "Gold",
      "Platinum",
      "Emerald",
      "Sapphire",
      "Diamond",
      "Master",
      "Challenger",
    ])
    expect(LEVEL_MISSIONS).toHaveLength(31)
    expect(LEVEL_MISSIONS[0]).toEqual({ level: 260, points: 3000, coins: 3000 })
    expect(LEVEL_MISSIONS.at(-1)).toEqual({ level: 290, points: 5000, coins: 2500 })
    expect(BOSS_MISSIONS.find((m) => m.boss === "Mayrin" && m.difficulty === "Hard")).toEqual({
      boss: "Mayrin",
      difficulty: "Hard",
      points: 9000,
      coins: 3000,
      advancedCoins: 60,
    })
    expect(BOSS_MISSIONS.find((m) => m.boss === "Black Mage")?.points).toBe(6000)
    expect(WEEKLY_MISSION_MAX_COINS).toBe(1500)
  })

  it("keeps the Genesis arithmetic consistent", () => {
    expect(
      GENESIS_RULES.pointsToLiberate.value - GENESIS_RULES.pointsAfterThreeWeeks
    ).toBe(GENESIS_RULES.gapAfterThreeWeeks.value)
  })
})
