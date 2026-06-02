/**
 * ministerEngine.ts — 臣子管理引擎
 *
 * Pure functions for minister recruitment, appointment, dismissal,
 * loyalty decay, and stat bonus calculation.
 *
 * Ministers provide passive stat bonuses each turn. Loyalty decays based
 * on ambition — disloyal, ambitious ministers can trigger betrayal events.
 * The player manages 3–5 ministers, dismissing and recruiting each turn.
 */

import type { Minister, GameState } from '../types/game'
import { MINISTERS } from '../data/ministers'
import { pickRandom } from '../utils/random'

/** Maximum number of ministers allowed in court */
const MAX_MINISTERS = 5

/**
 * Get a pool of random ministers available for recruitment.
 * Returns ministers not already in `state.ministers`.
 * Pool size: 3–5 ministers (capped by available count).
 */
export function getRecruitPool(state: GameState, rng: () => number): Minister[] {
  const currentIds = new Set(state.ministers.map(m => m.id))
  const available = MINISTERS.filter(m => !currentIds.has(m.id))
  if (available.length === 0) return []
  const poolSize = Math.min(Math.max(3, Math.floor(rng() * 3) + 3), available.length)
  return pickRandom(available, poolSize, rng)
}

/**
 * Appoint a minister to the court.
 * Returns updated ministers array with the new minister added.
 * Max ministers: 5. If at max, returns original array unchanged.
 */
export function appointMinister(
  ministers: Minister[],
  newMinister: Minister,
): Minister[] {
  if (ministers.length >= MAX_MINISTERS) return ministers
  return [...ministers, newMinister]
}

/**
 * Dismiss a minister from court.
 * Returns the updated array without the dismissed minister,
 * plus a dismissal flag keyed as `'dismissed_' + ministerId`.
 */
export function dismissMinister(
  ministers: Minister[],
  ministerId: string,
): { ministers: Minister[]; flags: Record<string, boolean> } {
  return {
    ministers: ministers.filter(m => m.id !== ministerId),
    flags: { [`dismissed_${ministerId}`]: true },
  }
}

/**
 * Calculate stat bonuses from all active ministers.
 * Each minister's `skill.value` is added to their `skill.stat`.
 * Returns an array of stat deltas to apply each turn.
 */
export function applyMinisterBonuses(
  ministers: Minister[],
): Array<{ stat: string; delta: number }> {
  return ministers.map(m => ({ stat: m.skill.stat, delta: m.skill.value }))
}

/**
 * Decay minister loyalty over time.
 * Formula: `loyalty -= ambition * 0.1` (minimum loyalty 0).
 * If loyalty drops below 20 and ambition > 50 the minister is flagged
 * as a potential betrayer — for now we only update loyalty.
 * Returns a new ministers array (no mutation).
 */
export function decayLoyalty(ministers: Minister[]): Minister[] {
  return ministers.map(m => ({
    ...m,
    loyalty: Math.max(0, m.loyalty - m.ambition * 0.1),
  }))
}

/**
 * Get a minister by ID from the full pool (including unrecruited).
 * Returns `undefined` if no match.
 */
export function getMinisterById(id: string): Minister | undefined {
  return MINISTERS.find(m => m.id === id)
}

/**
 * Initialize starting ministers for a new game.
 * Picks 3 random ministers from the full pool.
 */
export function createInitialMinisters(rng: () => number): Minister[] {
  return pickRandom(MINISTERS, 3, rng)
}
