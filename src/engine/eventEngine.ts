/**
 * eventEngine.ts — Event pool system for 皇帝模拟器 (Chinese Emperor Simulator)
 *
 * Manages event eligibility filtering, weighted random selection, cooldown
 * tracking, and difficulty scaling. The heart of the game's randomness.
 */

import type { GameEvent, GameState, EventCondition } from '../types/game'
import { EVENTS } from '../data/events'
import { weightedRandomSelect } from '../utils/random'

// ============================================================================
// EventPool
// ============================================================================

export class EventPool {
  private events: GameEvent[]

  constructor() {
    this.events = [...EVENTS]
  }

  /** Get all events that are currently eligible to fire */
  getEligibleEvents(state: GameState): GameEvent[] {
    return this.events.filter((event) => {
      // 1. Difficulty gate
      if (event.minDifficulty > state.difficulty) return false

      // 2. All conditions must pass (AND logic)
      if (!this.evaluateConditions(event, state)) return false

      // 3. Not on cooldown
      if (this.isOnCooldown(event.id, state)) return false

      // 4. Has remaining occurrences
      const occurrences = state.eventHistory.filter((id) => id === event.id).length
      if (occurrences >= event.maxOccurrences) return false

      return true
    })
  }

  /** Pick one event using weighted random selection */
  pickEvent(state: GameState, rng: () => number): GameEvent | null {
    const eligible = this.getEligibleEvents(state)
    if (eligible.length === 0) return null

    // Forced events take priority — return the first eligible forced event
    const forced = eligible.filter((e) => e.isForced)
    if (forced.length > 0) return forced[0]

    // Weighted random selection among non-forced eligible events
    return weightedRandomSelect(
      eligible,
      (e) => this.getEffectiveWeight(e, state),
      rng
    )
  }

  // ==========================================================================
  // Private helpers
  // ==========================================================================

  /**
   * Evaluate all conditions for an event against current state.
   * ALL conditions must pass (AND logic).
   */
  private evaluateConditions(event: GameEvent, state: GameState): boolean {
    return event.conditions.every((cond) =>
      this.evaluateCondition(cond, state)
    )
  }

  /** Evaluate a single EventCondition against game state */
  private evaluateCondition(cond: EventCondition, state: GameState): boolean {
    // Stat min/max check
    if (cond.min !== undefined) {
      if (state.stats[cond.stat] < cond.min) return false
    }
    if (cond.max !== undefined) {
      if (state.stats[cond.stat] > cond.max) return false
    }

    // Flag check
    if (cond.flag !== undefined) {
      if (state.flags[cond.flag] !== true) return false
    }

    // Season check — single season or array of seasons
    if (cond.season !== undefined) {
      if (Array.isArray(cond.season)) {
        if (!cond.season.includes(state.calendar.season)) return false
      } else {
        if (state.calendar.season !== cond.season) return false
      }
    }

    // Turn range check
    if (cond.minTurn !== undefined) {
      if (state.turn < cond.minTurn) return false
    }
    if (cond.maxTurn !== undefined) {
      if (state.turn > cond.maxTurn) return false
    }

    // Concubine count check
    if (cond.hasConcubines !== undefined) {
      if (state.concubines.length < cond.hasConcubines) return false
    }

    return true
  }

  /**
   * Calculate effective weight considering difficulty scaling.
   * Higher difficulty slightly boosts weight for harder events.
   */
  private getEffectiveWeight(event: GameEvent, state: GameState): number {
    let weight = event.baseWeight

    // Events with higher minDifficulty get a slight weight boost at higher difficulty
    if (event.minDifficulty > 0) {
      weight += (state.difficulty - event.minDifficulty) * 0.5
    }

    // Ensure weight never drops below 1
    return Math.max(1, weight)
  }

  /**
   * Check if an event is on cooldown.
   *
   * Uses the flat eventHistory string array: finds the last occurrence index
   * and checks if the number of turns since then is less than the cooldown.
   * Since eventHistory stores IDs in chronological order, position distance
   * approximates turn distance.
   */
  private isOnCooldown(eventId: string, state: GameState): boolean {
    const event = this.events.find((e) => e.id === eventId)
    if (!event) return false

    const lastIndex = state.eventHistory.lastIndexOf(eventId)
    if (lastIndex === -1) return false

    // Distance from last occurrence to end of history
    const turnsSinceLast = state.eventHistory.length - 1 - lastIndex
    return turnsSinceLast < event.cooldown
  }
}
