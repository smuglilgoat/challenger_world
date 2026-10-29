import { useCallback, useEffect, useState } from "react"

export type CharacterWorld = "interactive" | "heroic"
export type CharacterRole = "main" | "mule" | "quanah"

export type Character = {
  id: string
  name: string
  job: string
  world: CharacterWorld
  role: CharacterRole
  level: number
  targetTier?: string
  itemBurningStage?: number
  crests: number
  genesisPoints: number
  points: number
  weeks: Record<string, boolean>
  counts: Record<string, number>
  notes: string
  planId?: string
  planProgress: Record<string, boolean>
  createdAt: string
}

export type NewCharacter = Pick<Character, "name" | "job" | "world" | "role" | "level"> & {
  targetTier?: string
}

type StoredState = { version: 2; characters: Character[] }
type StoredCharacter = Omit<Character, "planProgress"> & {
  planProgress?: Record<string, boolean>
}

// Stored under the v1 key on purpose: renaming it would orphan every existing
// save. The payload carries `version: 2`; bump the version, not the key.
const STORAGE_KEY = "cws4.characters.v1"

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isCharacter(value: unknown): value is StoredCharacter {
  return (
    isPlainObject(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string"
  )
}

/** v1 → v2 added planId and planProgress; keep every existing field. */
function migrateCharacter(character: StoredCharacter): Character {
  return {
    ...character,
    weeks: isPlainObject(character.weeks)
      ? (character.weeks as Record<string, boolean>)
      : {},
    counts: isPlainObject(character.counts)
      ? (character.counts as Record<string, number>)
      : {},
    points: character.points ?? 0,
    notes: character.notes ?? "",
    planId: character.planId,
    planProgress: isPlainObject(character.planProgress)
      ? (character.planProgress as Record<string, boolean>)
      : {},
  }
}

export function serializeCharacters(characters: Character[]): string {
  const state: StoredState = { version: 2, characters }
  return JSON.stringify(state)
}

export function parseStoredCharacters(raw: string | null): Character[] {
  try {
    if (!raw) return []
    const parsed = JSON.parse(raw) as { version?: number; characters?: unknown }
    if (!Array.isArray(parsed.characters)) return []
    if (parsed.version !== 1 && parsed.version !== 2) return []
    return parsed.characters.filter(isCharacter).map(migrateCharacter)
  } catch {
    return []
  }
}

function load(): Character[] {
  try {
    return parseStoredCharacters(localStorage.getItem(STORAGE_KEY))
  } catch {
    return []
  }
}

function createId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `cw4-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, serializeCharacters(characters))
    } catch {
      // Storage can be full or blocked; the app keeps working in memory.
    }
  }, [characters])

  const addCharacter = useCallback((input: NewCharacter) => {
    const character: Character = {
      id: createId(),
      name: input.name.trim(),
      job: input.job.trim(),
      world: input.world,
      role: input.role,
      level: input.level,
      targetTier: input.targetTier,
      crests: 0,
      genesisPoints: 0,
      points: 0,
      weeks: {},
      counts: {},
      notes: "",
      planProgress: {},
      createdAt: new Date().toISOString(),
    }
    setCharacters((current) => [...current, character])
  }, [])

  const updateCharacter = useCallback((characterId: string, patch: Partial<Character>) => {
    setCharacters((current) =>
      current.map((character) => (character.id === characterId ? { ...character, ...patch } : character))
    )
  }, [])

  const removeCharacter = useCallback((characterId: string) => {
    setCharacters((current) => current.filter((character) => character.id !== characterId))
  }, [])

  const toggleTask = useCallback((characterId: string, taskKey: string, weekIndex: number) => {
    const storageKey = `${weekIndex}:${taskKey}`
    setCharacters((current) =>
      current.map((character) =>
        character.id === characterId
          ? {
              ...character,
              weeks: { ...character.weeks, [storageKey]: !character.weeks[storageKey] },
            }
          : character
      )
    )
  }, [])

  const togglePlanTarget = useCallback(
    (characterId: string, weekIndex: number, targetIndex: number) => {
      const storageKey = `${weekIndex}:${targetIndex}`
      setCharacters((current) =>
        current.map((character) =>
          character.id === characterId
            ? {
                ...character,
                planProgress: {
                  ...character.planProgress,
                  [storageKey]: !character.planProgress[storageKey],
                },
              }
            : character
        )
      )
    },
    []
  )

  return {
    characters,
    addCharacter,
    updateCharacter,
    removeCharacter,
    toggleTask,
    togglePlanTarget,
  }
}
