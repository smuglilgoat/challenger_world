import { describe, expect, it } from "vitest"
import { QUANAH_BADGE_PORTABILITY, SOURCES, TIERS } from "./event-data"

describe("claims", () => {
  it("exposes alternatives and their sources for a disputed claim", () => {
    const claim = QUANAH_BADGE_PORTABILITY
    expect(claim.status).toBe("disputed")
    expect(claim.alternatives?.length).toBeGreaterThan(1)

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
