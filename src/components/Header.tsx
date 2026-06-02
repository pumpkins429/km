/**
 * Header.tsx — Dynasty banner showing current calendar and turn count.
 *
 * Fixed to the top of the viewport. Displays dynasty name, reign title,
 * year (in Chinese numerals), and season. Turn counter shown as subtitle.
 */

import { useGameStore } from '../store/gameStore';
import { SEASON_LABELS } from '../data/flavor';

// Chinese numeral conversion for reign years (1–99)
// Convention: year 1 → 元 (yuán), year 2–10 → 二–十, year 11+ → 十一–
const CHINESE_NUMERALS: Record<number, string> = {
  1: '元',
  2: '二', 3: '三', 4: '四', 5: '五',
  6: '六', 7: '七', 8: '八', 9: '九', 10: '十',
  11: '十一', 12: '十二', 13: '十三', 14: '十四', 15: '十五',
  16: '十六', 17: '十七', 18: '十八', 19: '十九', 20: '二十',
  21: '二十一', 22: '二十二', 23: '二十三', 24: '二十四', 25: '二十五',
  26: '二十六', 27: '二十七', 28: '二十八', 29: '二十九', 30: '三十',
};

function toChineseYear(year: number): string {
  return CHINESE_NUMERALS[year] ?? year.toString();
}

export function Header() {
  const calendar = useGameStore((s) => s.calendar);
  const turnCount = useGameStore((s) => s.turnCount);

  const { dynasty, emperorTitle, year, season } = calendar;
  const seasonLabel = SEASON_LABELS[season];
  const yearDisplay = toChineseYear(year);

  return (
    <header className="fixed top-0 inset-x-0 z-10 bg-stone-950/80 backdrop-blur-sm border-b border-amber-800/30 py-2 px-4 md:py-3 md:px-6 text-center">
      <h1 className="text-amber-400/90 text-lg md:text-xl font-bold tracking-wide truncate">
        {dynasty} · {emperorTitle}{yearDisplay}年 · {seasonLabel}
      </h1>
      <p className="text-amber-600/50 text-xs mt-0.5 font-mono">
        第{turnCount}月
      </p>
    </header>
  );
}
