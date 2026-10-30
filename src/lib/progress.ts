import { CREST_RULES, GENESIS_RULES, type Week } from "./event-data"

// 2026-11-11 → 2026-12-01 is 20 elapsed days, 21 calendar days inclusive.
const GENESIS_CALENDAR_DAYS = 21
// Derived from the transcript: 6,030 points over that calendar window.
const GENESIS_POINTS_PER_DAY = GENESIS_RULES.pointsAfterThreeWeeks / GENESIS_CALENDAR_DAYS

export type TierLike = { points: { value: number | null } }

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

export function currentWeek(now: Date, weeks: Week[]): number {
  const today = startOfDay(now)
  let index = -1
  for (let i = 0; i < weeks.length; i++) {
    const start = new Date(`${weeks[i].startDate}T00:00:00`).getTime()
    if (start > today) break
    index = i
  }
  return index
}

/**
 * Tiers whose threshold Nexon has not published carry a null threshold. They
 * are skipped here: ordering by number would otherwise push an unpublished
 * tier to the bottom of the table.
 */
export function tierFor<T extends TierLike>(points: number, tiers: T[]): T | null {
  let reached: T | null = null
  let reachedThreshold = -Infinity
  for (const tier of tiers) {
    const threshold = tier.points.value
    if (threshold === null || threshold > points) continue
    if (threshold > reachedThreshold) {
      reached = tier
      reachedThreshold = threshold
    }
  }
  return reached
}

export function nextTier<T extends TierLike>(
  points: number,
  tiers: T[]
): { tier: T; pointsNeeded: number } | null {
  let next: T | null = null
  let nextThreshold = Infinity
  for (const tier of tiers) {
    const threshold = tier.points.value
    if (threshold === null || threshold <= points) continue
    if (threshold < nextThreshold) {
      next = tier
      nextThreshold = threshold
    }
  }
  return next ? { tier: next, pointsNeeded: nextThreshold - points } : null
}

function percentOf(value: number, max: number): number {
  const clamped = Math.min(Math.max(value, 0), max)
  return Math.round((clamped / max) * 1000) / 10
}

export function crestProgress(crests: number) {
  return {
    current: Math.min(Math.max(crests, 0), CREST_RULES.max),
    max: CREST_RULES.max,
    percent: percentOf(crests, CREST_RULES.max),
    weeklyCap: CREST_RULES.perWeek,
  }
}

export function genesisProgress(points: number) {
  return {
    current: Math.min(Math.max(points, 0), GENESIS_RULES.pointsToLiberate.value),
    max: GENESIS_RULES.pointsToLiberate.value,
    percent: percentOf(points, GENESIS_RULES.pointsToLiberate.value),
    gapAfterThreeWeeks: GENESIS_RULES.gapAfterThreeWeeks.value,
  }
}

export function taskCompletion(
  character: { weeks: Record<string, boolean> },
  tasks: { key: string }[],
  weekIndex = 0
) {
  const done = tasks.filter((task) => character.weeks[`${weekIndex}:${task.key}`]).length
  return {
    done,
    total: tasks.length,
    percent: tasks.length === 0 ? 0 : Math.round((done / tasks.length) * 100),
  }
}

export function planCompletion(
  character: { planProgress: Record<string, boolean> },
  targets: { label: string }[],
  weekIndex: number
) {
  const done = targets.filter(
    (_, targetIndex) => character.planProgress[`${weekIndex}:${targetIndex}`]
  ).length
  return {
    done,
    total: targets.length,
    percent: targets.length === 0 ? 0 : Math.round((done / targets.length) * 100),
  }
}

export function estimatedDaysToLiberation(points: number): number {
  if (points >= GENESIS_RULES.pointsToLiberate.value) return 0
  return Math.ceil((GENESIS_RULES.pointsToLiberate.value - points) / GENESIS_POINTS_PER_DAY)
}
