export const MAX_CRESTS = 6500
export const WEEKLY_CREST_CAP = 500
export const MAX_GENESIS_POINTS = 6500
export const GENESIS_GAP_AFTER_THREE_WEEKS = 470

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000
// Derived from the transcript: 6,030 points after 21 days of clears.
const GENESIS_POINTS_PER_DAY = 6030 / 21

export type TierLike = { points: number }

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
    if (tier.points <= points && (!reached || tier.points > reached.points)) {
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
    if (tier.points > points && (!next || tier.points < next.points)) {
      next = tier
    }
  }
  return next ? { tier: next, pointsNeeded: next.points - points } : null
}

function percentOf(value: number, max: number): number {
  const clamped = Math.min(Math.max(value, 0), max)
  return Math.round((clamped / max) * 1000) / 10
}

export function crestProgress(crests: number) {
  return {
    current: Math.min(Math.max(crests, 0), MAX_CRESTS),
    max: MAX_CRESTS,
    percent: percentOf(crests, MAX_CRESTS),
    weeklyCap: WEEKLY_CREST_CAP,
  }
}

export function genesisProgress(points: number) {
  return {
    current: Math.min(Math.max(points, 0), MAX_GENESIS_POINTS),
    max: MAX_GENESIS_POINTS,
    percent: percentOf(points, MAX_GENESIS_POINTS),
    gapAfterThreeWeeks: GENESIS_GAP_AFTER_THREE_WEEKS,
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
  if (points >= MAX_GENESIS_POINTS) return 0
  return Math.ceil((MAX_GENESIS_POINTS - points) / GENESIS_POINTS_PER_DAY)
}
