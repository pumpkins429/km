/**
 * gameEngine.ts — Central game engine orchestrating the turn loop
 *
 * Pure functions that coordinate calendar, stats, event, and minister sub-engines.
 * All functions return new objects — no mutation of inputs.
 */

import type { GameState, GameConfig, ChoiceResult, HistoryEntry, GamePhase } from '../types/game';
import { DEFAULT_CONFIG } from '../data/config';
import { advanceCalendar, createInitialCalendar, getSeasonalEffects } from './calendarEngine';
import { clampStats, applyEffects, checkGameOver, applySeasonalEffects } from './statsEngine';
import { EventPool } from './eventEngine';
import { createInitialMinisters, applyMinisterBonuses, decayLoyalty } from './ministerEngine';
import { createRNG } from '../utils/random';

// ============================================================================
// Shared EventPool instance
// ============================================================================

const eventPool = new EventPool();

// ============================================================================
// newGame
// ============================================================================

/**
 * Initialize a brand new game state.
 * @param config - Game configuration (defaults to DEFAULT_CONFIG)
 * @param seed - Random seed (for deterministic replay)
 */
export function newGame(config?: GameConfig, seed?: number): GameState {
  const cfg = config ?? DEFAULT_CONFIG;
  const rng = createRNG(seed ?? Date.now());
  const calendar = createInitialCalendar(rng);
  const ministers = createInitialMinisters(rng);

  return {
    turn: 1,
    calendar,
    stats: { ...cfg.initialStats },
    ministers,
    concubines: [],
    history: [],
    pendingEvent: null,
    choiceResult: null,
    gamePhase: 'playing',
    gameOverReason: null,
    endingTitle: null,
    eventHistory: [],
    difficulty: 1,
    turnCount: 1,
    flags: {},
  };
}

// ============================================================================
// advanceTurn
// ============================================================================

/**
 * Advance the game by one turn (one month).
 * 1. Create RNG for this turn
 * 2. Advance calendar by 1 month
 * 3. Decrement lifespan by 1
 * 4. Apply seasonal stat effects
 * 5. Apply minister bonuses
 * 6. Decay minister loyalty
 * 7. Generate a new event (pick from pool)
 * 8. Check game over conditions
 * 9. Return updated state
 *
 * If game is already over (gamePhase === 'gameover'), return state unchanged.
 * If gamePhase is 'result', transition to 'playing' first then generate new event.
 */
export function advanceTurn(state: GameState, seed?: number): GameState {
  // If already over, return unchanged
  if (state.gamePhase === 'gameover') {
    return state;
  }

  let current = { ...state };

  // Transition from 'result' to 'playing'
  if (current.gamePhase === 'result') {
    current = {
      ...current,
      gamePhase: 'playing' as GamePhase,
      pendingEvent: null,
      choiceResult: null,
    };
  }

  // Create RNG for this turn
  const turnSeed = seed ?? (Date.now() + current.turn);
  const rng = createRNG(turnSeed);

  // Advance calendar
  const newCalendar = advanceCalendar(current.calendar);

  // Decrement lifespan
  const newLifespan = current.stats.lifespan - 1;

  // Apply seasonal effects
  const seasonalEffects = getSeasonalEffects(newCalendar.season);
  const statsAfterSeasonal = applySeasonalEffects(
    { ...current.stats, lifespan: newLifespan },
    seasonalEffects,
  );

  // Apply minister bonuses
  const ministerBonuses = applyMinisterBonuses(current.ministers);
  const statsAfterMinisters = applySeasonalEffects(statsAfterSeasonal, ministerBonuses);

  // Decay minister loyalty
  const decayedMinisters = decayLoyalty(current.ministers);

  // Pick a new event
  const provisionalState: GameState = {
    ...current,
    calendar: newCalendar,
    stats: statsAfterMinisters,
    ministers: decayedMinisters,
  };
  const event = eventPool.pickEvent(provisionalState, rng);

  // Build updated state
  const newTurn = current.turn + 1;
  const newTurnCount = current.turnCount + 1;
  const newDifficulty = Math.floor(newTurn / 24) + 1;

  const updated: GameState = {
    ...provisionalState,
    turn: newTurn,
    turnCount: newTurnCount,
    difficulty: newDifficulty,
    pendingEvent: event,
    gamePhase: event ? 'choosing' : ('playing' as GamePhase),
  };

  // Check game over after all updates
  const gameOverCheck = checkGameOver(updated);
  if (gameOverCheck.gameOver) {
    return {
      ...updated,
      gamePhase: 'gameover',
      gameOverReason: gameOverCheck.reason ?? null,
      endingTitle: gameOverCheck.endingTitle ?? null,
    };
  }

  return updated;
}

// ============================================================================
// makeChoice
// ============================================================================

/**
 * Resolve a player's choice for the current pending event.
 * 1. Apply the choice's stat effects to the stats
 * 2. Apply any flags from the choice
 * 3. Add a HistoryEntry
 * 4. Add event ID to eventHistory
 * 5. Set choiceResult for UI display
 * 6. Transition to 'result' phase
 * 7. Check game over conditions
 */
export function makeChoice(state: GameState, choiceId: string, rngSeed?: number): GameState {
  const event = state.pendingEvent;
  if (!event) return state;

  const choice = event.choices.find((c) => c.id === choiceId);
  if (!choice) return state;

  const rng = createRNG(rngSeed ?? (Date.now() + state.turn));

  // Apply choice effects
  const newStats = applyEffects(state.stats, choice.effects, rng);

  // Apply flags
  const newFlags = { ...state.flags, ...choice.flags };

  // Create history entry
  const historyEntry: HistoryEntry = {
    turn: state.turn,
    year: state.calendar.year,
    season: state.calendar.season,
    eventTitle: event.title,
    choiceText: choice.text,
    outcomeText: choice.outcomeText,
    statEffects: choice.effects,
  };

  // Set choice result
  const choiceResult: ChoiceResult = {
    choice,
    effects: choice.effects,
  };

  // Build new state
  const updated: GameState = {
    ...state,
    stats: clampStats(newStats),
    flags: newFlags,
    history: [...state.history, historyEntry],
    eventHistory: [...state.eventHistory, event.id],
    choiceResult,
    gamePhase: 'result',
    pendingEvent: null,
  };

  // Check game over after applying effects
  const gameOverCheck = checkGameOver(updated);
  if (gameOverCheck.gameOver) {
    return {
      ...updated,
      gamePhase: 'gameover',
      gameOverReason: gameOverCheck.reason ?? null,
      endingTitle: gameOverCheck.endingTitle ?? null,
    };
  }

  return updated;
}

// ============================================================================
// calculateEnding
// ============================================================================

/**
 * Calculate the ending title based on final game state.
 * Used at game over to determine the posthumous evaluation.
 * Returns a descriptive string combining the ending title with stats summary.
 */
export function calculateEnding(state: GameState): string {
  const { endingTitle, calendar } = state;

  if (!endingTitle) {
    return '陛下尚在位，江山未定。';
  }

  const descriptions: Record<string, string> = {
    '明君': '陛下励精图治，文治武功，青史留名。',
    '昏君': '陛下沉湎享乐，朝政荒废，史书微词。',
    '暴君': '陛下刑罚严酷，朝野噤声，身后骂名。',
    '庸君': '陛下才德平平，守住基业，仅此而已。',
    '亡国之君': '陛下在位，江山不保，社稷蒙尘。',
    '短命天子': '陛下英年早逝，壮志未酬，天妒英才。',
    '盛世之主': '陛下开创盛世，四海升平，千古一帝。',
    '守成之君': '陛下兢兢业业，保住太平，功过相抵。',
    '拓疆之帝': '陛下开疆拓土，四方臣服，威震八方。',
  };

  const desc = descriptions[endingTitle] ?? '史书未载此君。';

  return `${calendar.dynasty}${calendar.emperorTitle}${endingTitle}——在位${calendar.year}年，${desc}`;
}
