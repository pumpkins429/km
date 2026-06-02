/**
 * StatsDashboard.tsx — Grid of all 8 stat bars.
 *
 * Subscribes to stats from the Zustand store and renders a StatBar
 * for each stat in thematic order. Responsive grid: 2 cols on mobile,
 * 4 cols on desktop.
 */

import { useGameStore } from '../store/gameStore';
import { StatBar } from './StatBar';
import { STAT_LABELS, STAT_ICONS } from '../data/flavor';
import type { StatKey } from '../types/game';

const STAT_ORDER: StatKey[] = [
  'gold',
  'food',
  'population',
  'military',
  'stability',
  'prestige',
  'health',
  'lifespan',
];

export function StatsDashboard() {
  const stats = useGameStore((s) => s.stats);

  return (
    <div className="bg-stone-900/60 backdrop-blur-sm rounded-lg border border-amber-800/20 p-3 md:p-4">
      <h2 className="text-amber-400/80 text-sm font-bold mb-2 md:mb-3 tracking-wider uppercase">
        国势总览
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
        {STAT_ORDER.map((key) => (
          <StatBar
            key={key}
            statKey={key}
            value={stats[key]}
            label={STAT_LABELS[key]}
            icon={STAT_ICONS[key]}
          />
        ))}
      </div>
    </div>
  );
}
