/**
 * calendarEngine.ts — Calendar/season advancement system
 *
 * Pure functions that advance the calendar state through seasons and months.
 * 3 months per season × 4 seasons = 12 months per year.
 */

import type { Calendar, Season } from '../types/game'

/** Order of seasons for cycling */
const SEASON_ORDER: Season[] = ['spring', 'summer', 'autumn', 'winter']

/** Dynasty names for random selection */
const DYNASTY_NAMES: string[] = ['大明', '大唐', '大宋', '大清', '大秦', '大汉', '大周']

/** Emperor reign titles for random selection */
const EMPEROR_TITLES: string[] = ['洪武', '永乐', '贞观', '开元', '康熙', '乾隆', '建武', '太平']

// ============================================================================
// Season lookup helpers
// ============================================================================

/** Determine which season a given month belongs to */
function seasonForMonth(month: number): Season {
  if (month <= 3) return 'spring'
  if (month <= 6) return 'summer'
  if (month <= 9) return 'autumn'
  return 'winter'
}

// ============================================================================
// Exported functions
// ============================================================================

/**
 * Advance the calendar by one month.
 * Returns a NEW calendar object (immutable).
 * Season changes after 3 months. Year increments after winter→spring.
 */
export function advanceCalendar(calendar: Calendar): Calendar {
  let newMonth = calendar.month + 1
  let newYear = calendar.year
  let newSeason = calendar.season

  if (newMonth > 12) {
    newMonth = 1
    newYear += 1
  }

  // Determine season from the new month
  newSeason = seasonForMonth(newMonth)

  return {
    dynasty: calendar.dynasty,
    emperorTitle: calendar.emperorTitle,
    year: newYear,
    season: newSeason,
    month: newMonth,
  }
}

/**
 * Get the next season in the cycle.
 */
export function nextSeason(current: Season): Season {
  const idx = SEASON_ORDER.indexOf(current)
  return SEASON_ORDER[(idx + 1) % SEASON_ORDER.length]
}

/**
 * Get the Chinese label for a season.
 */
export function getSeasonLabel(season: Season): string {
  const labels: Record<Season, string> = {
    spring: '春',
    summer: '夏',
    autumn: '秋',
    winter: '冬',
  }
  return labels[season]
}

/**
 * Get seasonal stat modifiers applied each turn.
 * Returns an array of {stat, delta} effects.
 *
 * spring: +population, summer: +food, autumn: +gold, winter: -food -health
 */
export function getSeasonalEffects(
  season: Season,
): Array<{ stat: string; delta: number }> {
  const effects: Record<Season, Array<{ stat: string; delta: number }>> = {
    spring: [{ stat: 'population', delta: 5 }],
    summer: [{ stat: 'food', delta: 10 }],
    autumn: [{ stat: 'gold', delta: 8 }],
    winter: [
      { stat: 'food', delta: -5 },
      { stat: 'health', delta: -3 },
    ],
  }
  return effects[season]
}

/**
 * Create the initial calendar for a new game.
 * dynasty: randomly picked from DYNASTY_NAMES
 * emperorTitle: randomly picked from EMPEROR_TITLES
 * year: 1, season: 'spring', month: 1
 */
export function createInitialCalendar(rng: () => number): Calendar {
  const dynasty = DYNASTY_NAMES[Math.floor(rng() * DYNASTY_NAMES.length)]
  const emperorTitle = EMPEROR_TITLES[Math.floor(rng() * EMPEROR_TITLES.length)]

  return {
    dynasty,
    emperorTitle,
    year: 1,
    season: 'spring',
    month: 1,
  }
}
