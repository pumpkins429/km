/**
 * statsEngine.ts — Stat clamping, effect application, and game-over detection
 * for the Chinese Emperor Simulator.
 *
 * All functions are pure — they return new objects and never mutate inputs.
 */

import type {
  GameStats,
  StatEffect,
  StatKey,
  GameState,
  EndingType,
} from '../types/game';

// ============================================================================
// Constants
// ============================================================================

/** Stats clamped to [0, 100] */
const CLAMPED_STATS: StatKey[] = ['military', 'stability', 'health', 'prestige'];

/** Stats that cannot go below 0 (but have no upper bound) */
const MIN_ZERO_STATS: StatKey[] = ['gold', 'population', 'food'];

// ============================================================================
// Clamping
// ============================================================================

/**
 * Clamp all stats to their valid ranges.
 * Returns a NEW stats object.
 */
export function clampStats(stats: GameStats): GameStats {
  const result = { ...stats };

  for (const key of CLAMPED_STATS) {
    result[key] = Math.min(100, Math.max(0, result[key]));
  }

  for (const key of MIN_ZERO_STATS) {
    result[key] = Math.max(0, result[key]);
  }

  // Lifespan cannot be negative
  result.lifespan = Math.max(0, result.lifespan);

  return result;
}

// ============================================================================
// Effect Application
// ============================================================================

/**
 * Apply a single StatEffect to a stats object.
 * Returns a NEW stats object (immutable).
 * Handles delta, percent, and randomRange.
 * Clamps values according to CLAMPED_STATS and MIN_ZERO_STATS.
 */
export function applyEffect(
  stats: GameStats,
  effect: StatEffect,
  rng: () => number,
): GameStats {
  const result = { ...stats };
  let change = 0;

  if (effect.randomRange) {
    const [min, max] = effect.randomRange;
    change = min + rng() * (max - min);
  } else if (effect.delta !== undefined) {
    change = effect.delta;
  }

  if (effect.percent !== undefined) {
    const base = result[effect.stat];
    change += base * effect.percent;
  }

  result[effect.stat] = result[effect.stat] + change;

  return clampStats(result);
}

/**
 * Apply an array of StatEffects sequentially.
 * Returns a NEW stats object.
 */
export function applyEffects(
  stats: GameStats,
  effects: StatEffect[],
  rng: () => number,
): GameStats {
  let result = { ...stats };

  for (const effect of effects) {
    result = applyEffect(result, effect, rng);
  }

  return result;
}

// ============================================================================
// Seasonal Effects
// ============================================================================

/**
 * Apply seasonal stat modifiers (e.g., from calendarEngine.getSeasonalEffects).
 * Returns a NEW stats object.
 */
export function applySeasonalEffects(
  stats: GameStats,
  effects: Array<{ stat: string; delta: number }>,
): GameStats {
  let result = { ...stats };

  for (const { stat, delta } of effects) {
    result = {
      ...result,
      [stat]: result[stat as StatKey] + delta,
    };
  }

  return clampStats(result);
}

// ============================================================================
// Ending Title Calculation
// ============================================================================

function determineEndingTitle(stats: GameStats): EndingType {
  if (stats.prestige >= 80 && stats.stability >= 70 && stats.military >= 60) {
    return '盛世之主';
  }
  if (stats.prestige >= 60 && stats.military >= 50) {
    return '明君';
  }
  if (stats.military >= 80 && stats.prestige < 40) {
    return '暴君';
  }
  if (stats.health >= 70 && stats.prestige >= 50) {
    return '守成之君';
  }
  if (stats.military >= 70 && stats.population >= 8000) {
    return '拓疆之帝';
  }
  return '庸君';
}

// ============================================================================
// Game-Over Detection
// ============================================================================

/**
 * Check if the game should end based on current state.
 * Returns { gameOver: true, reason, endingTitle } or { gameOver: false }.
 *
 * Death conditions (checked in order):
 *  - health <= 0 → 龙体崩殂, '短命天子'
 *  - lifespan <= 0 → 寿终正寝, ending based on stats
 *  - stability <= 0 → 民变四起，王朝覆灭, '亡国之君'
 *  - population <= 0 → 百姓流离失所，国将不国, '亡国之君'
 *  - gold < -500 → 国库亏空，朝廷破产, '亡国之君'
 *
 * Victory condition:
 *  - lifespan > 0 && turnCount >= 360 → 治世三十载, ending based on stats
 */
export function checkGameOver(state: GameState): {
  gameOver: boolean;
  reason?: string;
  endingTitle?: EndingType;
} {
  const { stats, turnCount } = state;

  // --- Death conditions ---

  if (stats.health <= 0) {
    return {
      gameOver: true,
      reason: '龙体崩殂',
      endingTitle: '短命天子',
    };
  }

  if (stats.lifespan <= 0) {
    return {
      gameOver: true,
      reason: '寿终正寝',
      endingTitle: determineEndingTitle(stats),
    };
  }

  if (stats.stability <= 0) {
    return {
      gameOver: true,
      reason: '民变四起，王朝覆灭',
      endingTitle: '亡国之君',
    };
  }

  if (stats.population <= 0) {
    return {
      gameOver: true,
      reason: '百姓流离失所，国将不国',
      endingTitle: '亡国之君',
    };
  }

  if (stats.gold < -500) {
    return {
      gameOver: true,
      reason: '国库亏空，朝廷破产',
      endingTitle: '亡国之君',
    };
  }

  // --- Victory condition ---

  if (stats.lifespan > 0 && turnCount >= 360) {
    return {
      gameOver: true,
      reason: '治世三十载',
      endingTitle: determineEndingTitle(stats),
    };
  }

  return { gameOver: false };
}
