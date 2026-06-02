/**
 * gameStore.ts — Zustand store with Immer middleware and localStorage persistence
 *
 * Single source of truth for the entire game. Components subscribe to slices
 * of state. Actions trigger engine functions. Persist middleware auto-saves.
 * Manual save slots provide named save points.
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { GameState, GameConfig, SaveSlot } from '../types/game';
import { newGame, advanceTurn, makeChoice } from '../engine/gameEngine';
import { DEFAULT_CONFIG } from '../data/config';

// ============================================================================
// Actions Interface
// ============================================================================

interface GameActions {
  /** Start a new game with optional config and seed */
  startNewGame: (config?: GameConfig, seed?: number) => void;

  /** Advance one turn (month) */
  nextTurn: (seed?: number) => void;

  /** Player selects a choice for the current event */
  selectChoice: (choiceId: string) => void;

  /** Get save slot metadata (used by save panel) */
  getSaveSlots: () => SaveSlot[];

  /** Save current game to a named slot */
  saveToSlot: (slotId: string) => void;

  /** Load game from a named slot */
  loadFromSlot: (slotId: string) => boolean;

  /** Delete a save slot */
  deleteSlot: (slotId: string) => void;
}

// ============================================================================
// Combined Store Type
// ============================================================================

type GameStore = GameState & GameActions;

// ============================================================================
// Internal Types
// ============================================================================

/** Full slot data stored in localStorage (metadata + complete game state) */
interface SlotData {
  meta: SaveSlot;
  state: GameState;
}

// ============================================================================
// Constants
// ============================================================================

const SLOT_PREFIX = 'emperor_slot_';

// ============================================================================
// Helper: Extract GameState from GameStore (strip action functions)
// ============================================================================

function extractGameState(state: GameStore): GameState {
  const {
    startNewGame,
    nextTurn,
    selectChoice,
    getSaveSlots,
    saveToSlot,
    loadFromSlot,
    deleteSlot,
    ...gameState
  } = state;
  return gameState as unknown as GameState;
}

// ============================================================================
// Store
// ============================================================================

export const useGameStore = create<GameStore>()(
  persist(
    immer((set, get) => ({
      // ---- Initial state from newGame() ----
      ...newGame(DEFAULT_CONFIG),

      // ---- Actions ----

      startNewGame: (config, seed) => {
        // Replace entire state with a fresh game
        set(newGame(config ?? DEFAULT_CONFIG, seed));
      },

      nextTurn: (seed) => {
        set((state) => {
          const nextState = advanceTurn(state as unknown as GameState, seed);
          // Immer: mutate the draft with all properties from the engine result
          Object.assign(state, nextState);
        });
      },

      selectChoice: (choiceId) => {
        set((state) => {
          const nextState = makeChoice(state as unknown as GameState, choiceId);
          // Immer: mutate the draft with all properties from the engine result
          Object.assign(state, nextState);
        });
      },

      getSaveSlots: () => {
        const slots: SaveSlot[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith(SLOT_PREFIX)) {
            try {
              const raw = localStorage.getItem(key);
              if (!raw) continue;
              const data = JSON.parse(raw) as SlotData;
              if (data.meta) {
                slots.push(data.meta);
              }
            } catch {
              // Skip corrupted slots
            }
          }
        }
        return slots.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
      },

      saveToSlot: (slotId) => {
        const state = get();
        const meta: SaveSlot = {
          id: slotId,
          timestamp: new Date().toISOString(),
          calendar: state.calendar,
          stats: state.stats,
          turnCount: state.turnCount,
          endingTitle: state.endingTitle ?? undefined,
        };
        const slotData: SlotData = {
          meta,
          state: extractGameState(state),
        };
        localStorage.setItem(SLOT_PREFIX + slotId, JSON.stringify(slotData));
      },

      loadFromSlot: (slotId) => {
        const raw = localStorage.getItem(SLOT_PREFIX + slotId);
        if (!raw) return false;
        try {
          const data = JSON.parse(raw) as SlotData;
          if (!data.state) return false;
          // Merge saved game state into store (actions remain untouched)
          set(data.state as unknown as Partial<GameStore>);
          return true;
        } catch {
          return false;
        }
      },

      deleteSlot: (slotId) => {
        localStorage.removeItem(SLOT_PREFIX + slotId);
      },
    })),
    {
      name: 'emperor-game-state',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      // Only persist game state, not action functions
      partialize: (state) => {
        return extractGameState(state);
      },
      // Migration for future versions
      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          // Future migration: add new fields with defaults
        }
        return persistedState as GameStore;
      },
    }
  )
);
