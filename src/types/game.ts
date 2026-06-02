/**
 * game.ts — Foundational type definitions for 皇帝模拟器 (Chinese Emperor Simulator)
 *
 * This file is the root type dependency. Every other module imports from here.
 * No runtime values are exported — only types and interfaces.
 */

// ============================================================================
// Enums / Literal Unions
// ============================================================================

/** Four seasons driving calendar progression and event conditions */
type Season = 'spring' | 'summer' | 'autumn' | 'winter'

/** Phases the game UI cycles through each turn */
type GamePhase = 'playing' | 'choosing' | 'result' | 'gameover'

/** Identifiers for the seven core stats plus lifespan */
type StatKey =
  | 'gold'
  | 'military'
  | 'population'
  | 'stability'
  | 'food'
  | 'health'
  | 'prestige'
  | 'lifespan'

/** Categories that group events for thematic variety */
type EventCategory =
  | 'disaster'
  | 'military'
  | 'court'
  | 'economy'
  | 'diplomacy'
  | 'culture'
  | 'personal'
  | 'harem'
  | 'tutorial'

/** Possible ending titles based on final stat evaluation */
type EndingType =
  | '明君'
  | '昏君'
  | '暴君'
  | '庸君'
  | '亡国之君'
  | '短命天子'
  | '盛世之主'
  | '守成之君'
  | '拓疆之帝'

// ============================================================================
// Calendar
// ============================================================================

/** Tracks in-game time: dynasty name, reign title, and current year/season/month */
interface Calendar {
  /** Dynasty name, e.g., "大明" */
  dynasty: string
  /** Reign title, e.g., "洪武" */
  emperorTitle: string
  /** Reign year, starts at 1 */
  year: number
  /** Current season */
  season: Season
  /** Month within the year, 1–12 */
  month: number
}

// ============================================================================
// Game Stats
// ============================================================================

/**
 * The emperor's core statistics.
 * Most values are 0–100; gold, food, population, and lifespan are unbounded
 * or use different scales as noted.
 */
interface GameStats {
  /** 国库 — treasury gold */
  gold: number
  /** 军力 — military strength, 0–100 */
  military: number
  /** 人口 — population in thousands */
  population: number
  /** 治安/稳定 — realm stability, 0–100 */
  stability: number
  /** 粮食 — grain reserves */
  food: number
  /** 皇帝健康 — emperor's health, 0–100 */
  health: number
  /** 威望 — imperial prestige, 0–100 */
  prestige: number
  /**
   * 剩余寿命 — remaining lifespan in months.
   * Starts at 360 (≈30 years), decrements by 1 each month.
   * When it reaches 0 the emperor dies of old age (寿终正寝).
   */
  lifespan: number
}

// ============================================================================
// Stat Effects
// ============================================================================

/** Describes how an event choice modifies one stat */
interface StatEffect {
  /** Which stat is affected */
  stat: StatKey
  /** Absolute change applied to the stat */
  delta?: number
  /** Percentage change (0.1 = 10% of current value) */
  percent?: number
  /** If present, delta is randomly chosen from this [min, max] range */
  randomRange?: [number, number]
  /** Flavor text describing the effect to the player */
  description?: string
}

// ============================================================================
// Event Conditions
// ============================================================================

/** A single condition that must be met for an event to be eligible to fire */
interface EventCondition {
  /** Stat to evaluate */
  stat: StatKey
  /** Minimum value (inclusive) */
  min?: number
  /** Maximum value (inclusive) */
  max?: number
  /** A game flag that must be set to true */
  flag?: string
  /** Required season(s) */
  season?: Season | Season[]
  /** Minimum turn number for this condition */
  minTurn?: number
  /** Maximum turn number for this condition */
  maxTurn?: number
  /** Minimum number of concubines required */
  hasConcubines?: number
}

// ============================================================================
// Event Choice
// ============================================================================

/** One of the player's response options for an event */
interface EventChoice {
  /** Unique identifier for this choice */
  id: string
  /** Choice button label (Chinese text) */
  text: string
  /** Stat modifications applied when this choice is selected */
  effects: StatEffect[]
  /** Narrative text shown to the player after choosing */
  outcomeText: string
  /** Optional flags to set or clear on the game state */
  flags?: Record<string, boolean>
}

// ============================================================================
// Game Event
// ============================================================================

/** A random or forced event that presents the player with choices */
interface GameEvent {
  /** Unique event identifier */
  id: string
  /** Event title displayed to the player */
  title: string
  /** Narrative flavor text describing the situation */
  description: string
  /** Thematic category for filtering and variety */
  category: EventCategory
  /** All conditions must be satisfied for the event to be eligible */
  conditions: EventCondition[]
  /** Base probability weight (1–10) for random selection */
  baseWeight: number
  /** Number of turns before this event can appear again */
  cooldown: number
  /** Maximum number of times this event can occur in a playthrough */
  maxOccurrences: number
  /** Minimum difficulty level required for this event to appear */
  minDifficulty: number
  /** Available response options (2–4 choices) */
  choices: EventChoice[]
  /** If true, always fires when conditions are met (e.g., tutorial events) */
  isForced?: boolean
}

// ============================================================================
// Concubine (后宫)
// ============================================================================

/** A member of the imperial harem */
interface Concubine {
  /** Unique concubine identifier */
  id: string
  /** Concubine's personal name */
  name: string
  /** Court title: 皇后, 贵妃, 妃, 嫔, 贵人, etc. */
  title: string
  /** Rank tier, 1–6 (皇后 = 1, 贵人 = 6) */
  rank: number
  /** Favor from the emperor, 0–100 */
  favor: number
  /** Biographical description */
  description: string
  /** Personality trait: 贤良, 善妒, 聪慧, 温婉, etc. */
  trait: string
  /** IDs of children born to this concubine */
  children: string[]
}

// ============================================================================
// Minister
// ============================================================================

/** A court minister who serves the emperor */
interface Minister {
  /** Unique minister identifier */
  id: string
  /** Minister's personal name */
  name: string
  /** Official court title */
  title: string
  /** Biographical description */
  description: string
  /** Bonus to a specific stat when this minister is in office */
  skill: {
    /** Which stat receives the bonus */
    stat: StatKey
    /** Magnitude of the bonus (added to the stat each turn) */
    value: number
  }
  /** Loyalty to the emperor, 0–100 (low loyalty → betrayal risk) */
  loyalty: number
  /** Political ambition, 0–100 (high ambition + low loyalty → coup risk) */
  ambition: number
}

// ============================================================================
// History Entry
// ============================================================================

/** A record of one turn's major event and the player's response */
interface HistoryEntry {
  /** Turn number when this event occurred */
  turn: number
  /** In-game year */
  year: number
  /** Season when this event occurred */
  season: Season
  /** Title of the event that fired */
  eventTitle: string
  /** Text of the choice the player selected */
  choiceText: string
  /** Narrative outcome shown after the choice */
  outcomeText: string
  /** Stat effects that were applied */
  statEffects: StatEffect[]
}

// ============================================================================
// Choice Result
// ============================================================================

/** The resolved result of a player's event choice, pending UI display */
interface ChoiceResult {
  /** The choice that was selected */
  choice: EventChoice
  /** The stat effects that were (or will be) applied */
  effects: StatEffect[]
}

// ============================================================================
// Game State
// ============================================================================

/** The complete, serializable game state for one playthrough */
interface GameState {
  /** Current turn number (incremented each month) */
  turn: number
  /** The in-game calendar */
  calendar: Calendar
  /** All seven core stats plus lifespan */
  stats: GameStats
  /** Currently employed court ministers */
  ministers: Minister[]
  /** Current members of the imperial harem */
  concubines: Concubine[]
  /** Chronological log of all past events and choices */
  history: HistoryEntry[]
  /** The event currently being presented to the player (null if none) */
  pendingEvent: GameEvent | null
  /** The resolved choice awaiting display (null if none) */
  choiceResult: ChoiceResult | null
  /** Current UI/gameplay phase */
  gamePhase: GamePhase
  /** Reason the game ended (null if still playing) */
  gameOverReason: string | null
  /** The ending title earned, if the game has ended */
  endingTitle: EndingType | null
  /** IDs of all events that have fired this playthrough (for cooldown/max tracking) */
  eventHistory: string[]
  /** Difficulty level (affects event weight and stat scaling) */
  difficulty: number
  /** Total number of turns elapsed (alias for turn, kept for save compatibility) */
  turnCount: number
  /** Arbitrary boolean flags set by event choices */
  flags: Record<string, boolean>
}

// ============================================================================
// Game Config
// ============================================================================

/** Static configuration constants for a game session */
interface GameConfig {
  /** Number of reign years needed to win */
  winYears: number
  /** Stats at game start */
  initialStats: GameStats
  /** Maximum ministers that can be employed at once */
  ministersPerTurn: number
  /** Number of events presented per turn */
  eventsPerTurn: number
  /** Starting lifespan in months (360 = 30 years) */
  initialLifespan: number
  /** Interval in months between 选秀 (concubine selection) events */
  selectionInterval: number
}

// ============================================================================
// Save Slot
// ============================================================================

/** Metadata for a saved game slot (stored in localStorage) */
interface SaveSlot {
  /** Unique save slot identifier */
  id: string
  /** ISO timestamp of when the save was created */
  timestamp: string
  /** Calendar state at save time */
  calendar: Calendar
  /** Stats at save time */
  stats: GameStats
  /** Total turns elapsed at save time */
  turnCount: number
  /** Ending title if the game was completed, undefined otherwise */
  endingTitle?: EndingType
}

// ============================================================================
// Exports
// ============================================================================

export type {
  Season,
  GamePhase,
  StatKey,
  EventCategory,
  EndingType,
  Calendar,
  GameStats,
  StatEffect,
  EventCondition,
  EventChoice,
  GameEvent,
  Concubine,
  Minister,
  HistoryEntry,
  ChoiceResult,
  GameState,
  GameConfig,
  SaveSlot,
}
