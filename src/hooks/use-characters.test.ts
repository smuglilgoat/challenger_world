import { describe, expect, it } from "vitest"
import { parseStoredCharacters, serializeCharacters, type Character } from "./use-characters"

const character: Character = {
  id: "char-1",
  name: "LetheMain",
  job: "Lethe",
  world: "heroic",
  role: "main",
  level: 260,
  crests: 500,
  genesisPoints: 0,
  points: 0,
  weeks: { "0:mobs-2000": true },
  counts: { "0:mobs-2000": 2000 },
  notes: "",
  planProgress: {},
  createdAt: "2026-10-29T00:00:00.000Z",
}

describe("character storage", () => {
  it("round-trips a character with plan progress", () => {
    const withPlan: Character = {
      ...character,
      planId: "jando-pre-season",
      planProgress: { "0:1": true, "3:0": true },
    }

    expect(parseStoredCharacters(serializeCharacters([withPlan]))).toEqual([withPlan])
  })

  it("migrates a v1 payload without losing characters", () => {
    const v1Character: Record<string, unknown> = { ...character }
    delete v1Character.planProgress
    const raw = JSON.stringify({ version: 1, characters: [v1Character] })

    const loaded = parseStoredCharacters(raw)

    expect(loaded).toHaveLength(1)
    expect(loaded[0]).toMatchObject({
      id: character.id,
      name: character.name,
      crests: character.crests,
      weeks: character.weeks,
      counts: character.counts,
    })
    expect(loaded[0].planId).toBeUndefined()
    expect(loaded[0].planProgress).toEqual({})
  })

  it("falls back to an empty list for malformed JSON", () => {
    expect(parseStoredCharacters("{not json")).toEqual([])
  })
})
