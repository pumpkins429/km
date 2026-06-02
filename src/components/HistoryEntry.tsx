/**
 * HistoryEntry.tsx — Single history record entry.
 *
 * Displays one past event: time badge (year·season), event title,
 * the choice made, a truncated outcome, and compact stat effect indicators.
 * Styled to evoke an ancient Chinese historical scroll.
 */

import type { HistoryEntry as HistoryEntryType, StatKey } from '../types/game';
import { SEASON_LABELS, STAT_LABELS } from '../data/flavor';

interface HistoryEntryProps {
  entry: HistoryEntryType;
}

/** Compact stat effect badge showing delta direction */
function StatBadge({ stat, delta }: { stat: StatKey; delta?: number }) {
  if (delta === undefined || delta === 0) return null;

  const isPositive = delta > 0;
  const color = isPositive ? 'text-emerald-400' : 'text-red-400';
  const sign = isPositive ? '+' : '';

  return (
    <span
      className={`${color} text-xs font-mono`}
      title={`${STAT_LABELS[stat]} ${sign}${delta}`}
    >
      {STAT_LABELS[stat]}{sign}{delta}
    </span>
  );
}

export function HistoryEntry({ entry }: HistoryEntryProps) {
  const { year, season, eventTitle, choiceText, outcomeText, statEffects } = entry;
  const seasonLabel = SEASON_LABELS[season];

  // Truncate outcome to first 30 characters
  const outcomePreview =
    outcomeText.length > 30 ? `${outcomeText.slice(0, 30)}…` : outcomeText;

  return (
    <div className="flex items-start gap-2 md:gap-3 py-2 border-b border-stone-800/50 last:border-b-0">
      {/* Time badge */}
      <span className="bg-amber-900/30 text-amber-400 text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded whitespace-nowrap shrink-0">
        {year}年·{seasonLabel}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-amber-200 text-xs md:text-sm font-medium truncate">
          {eventTitle}
        </p>
        <p className="text-stone-400 text-xs truncate">
          {choiceText}
        </p>
        {outcomePreview && (
          <p className="text-stone-500 text-xs italic truncate">
            {outcomePreview}
          </p>
        )}
      </div>

      {/* Stat effect indicators */}
      {statEffects.length > 0 && (
        <div className="flex gap-0.5 md:gap-1 flex-wrap shrink-0">
          {statEffects.map((effect, i) => (
            <StatBadge key={`${effect.stat}-${i}`} stat={effect.stat} delta={effect.delta} />
          ))}
        </div>
      )}
    </div>
  );
}
