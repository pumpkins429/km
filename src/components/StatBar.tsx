/**
 * StatBar.tsx — Single stat display with label, value, and progress bar.
 *
 * Color-coded by value: red (<30%), amber (30–70%), emerald (>70%).
 * Lifespan is always amber-gold and scaled to 360 months max.
 */

import type { StatKey } from '../types/game';

interface StatBarProps {
  statKey: StatKey;
  value: number;
  label: string;
  icon: string;
}

function getBarColor(percentage: number): string {
  if (percentage < 30) return 'bg-red-500';
  if (percentage < 70) return 'bg-amber-500';
  return 'bg-emerald-500';
}

function getDisplayValue(statKey: StatKey, value: number): string {
  if (statKey === 'lifespan') {
    const years = Math.floor(value / 12);
    const months = value % 12;
    return months === 0 ? `${years}年` : `${years}年${months}月`;
  }
  return value.toString();
}

export function StatBar({ statKey, value, label, icon }: StatBarProps) {
  const isLifespan = statKey === 'lifespan';
  const maxStat = isLifespan ? 360 : 100;
  const percentage = Math.min((value / maxStat) * 100, 100);
  const barColor = isLifespan ? 'bg-amber-500' : getBarColor(percentage);

  return (
    <div className="flex items-center gap-1 md:gap-2 mb-1">
      <span className="text-amber-300/70 text-xs md:text-sm w-8 md:w-12 text-right shrink-0" title={label}>
        {icon}
      </span>
      <span className="text-amber-200 font-mono text-xs md:text-sm w-8 md:w-12 text-right shrink-0">
        {getDisplayValue(statKey, value)}
      </span>
      <div className="flex-1 min-w-[60px] h-2 bg-stone-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
