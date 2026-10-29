import { CREST_RULES, GENESIS_RULES } from "./event-data"

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000
// Derived from the transcript: 6,030 points after 21 days of clears.
const GENESIS_POINTS_PER_DAY = GENESIS_RULES.pointsAfterThreeWeeks / 21

export type TierLike = { points: { value: number } }

export function currentWeek(now: Date, startDate: string, totalWeeks: number): number {
  if (totalWeeks <= 0) return -1
  const start = new Date(`${startDate}T00:00:00`)
  const elapsed = now.getTime() - start.getTime()
  if (elapsed < 0) return -1
  return Math.min(Math.floor(elapsed / MS_PER_WEEK), totalWeeks - 1)
}

export function tierFor<T extends TierLike>(points: number, tiers: T[]): T | null {
  let reached: T | null = null
  for (const tier of tiers) {
    if (tier.points.value <= points && (!reached || tier.points.value > reached.points.value)) {
      reached = tier
    }
  }
  return reached
}

export function nextTier<T extends TierLike>(
  points: number,
  tiers: T[]
): { tier: T; pointsNeeded: number } | null {
  let next: T | null = null
  for (const tier of tiers) {
    if (tier.points.value > points && (!next || tier.points.value < next.points.value)) {
      next = tier
    }
  }
  return next ? { tier: next, pointsNeeded: next.points.value - points } : null
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

export function estimatedDaysToLiberation(points: number): number {
  if (points >= GENESIS_RULES.pointsToLiberate.value) return 0
  return Math.ceil((GENESIS_RULES.pointsToLiberate.value - points) / GENESIS_POINTS_PER_DAY)
}
