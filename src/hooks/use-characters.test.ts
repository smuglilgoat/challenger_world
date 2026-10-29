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
})
