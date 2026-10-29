import { describe, expect, it } from "vitest"
import {
  CREST_RULES,
  GENESIS_RULES,
  QUANAH_BADGE_PORTABILITY,
  SOURCES,
  TIERS,
  WEEKS,
} from "./event-data"

describe("claims", () => {
  it("exposes alternatives and their sources for a disputed claim", () => {
    const claim = QUANAH_BADGE_PORTABILITY
    expect(claim.status).toBe("disputed")
    expect(claim.alternatives).toHaveLength(1)
    expect(claim.alternatives?.some((alternative) => alternative.value === claim.value)).toBe(false)

    for (const alternative of claim.alternatives ?? []) {
      expect(alternative.value).toBeTruthy()
      expect(SOURCES[alternative.source]).toBeDefined()
    }
  })

  it("gives every tier threshold a claim with a registered source", () => {
    for (const tier of TIERS) {
      expect(tier.points.sources.length).toBeGreaterThan(0)
      for (const source of tier.points.sources) {
        expect(SOURCES[source]).toBeDefined()
      }
    }
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

  it("keeps the Genesis arithmetic consistent", () => {
    expect(
      GENESIS_RULES.pointsToLiberate.value - GENESIS_RULES.pointsAfterThreeWeeks
    ).toBe(GENESIS_RULES.gapAfterThreeWeeks.value)
  })
})
