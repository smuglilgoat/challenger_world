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
  createdAt: string
}

export type NewCharacter = Pick<Character, "name" | "job" | "world" | "role" | "level"> & {
  targetTier?: string
}

type StoredState = { version: 1; characters: Character[] }

const STORAGE_KEY = "cws4.characters.v1"

function isCharacter(value: unknown): value is Character {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Character).id === "string" &&
    typeof (value as Character).name === "string"
  )
}

function load(): Character[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Partial<StoredState>
    if (parsed.version !== 1 || !Array.isArray(parsed.characters)) return []
    return parsed.characters.filter(isCharacter).map((character) => ({
      ...character,
      weeks: character.weeks ?? {},
      counts: character.counts ?? {},
      points: character.points ?? 0,
      notes: character.notes ?? "",
    }))
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
    const state: StoredState = { version: 1, characters }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
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

  return { characters, addCharacter, updateCharacter, removeCharacter, toggleTask }
}
