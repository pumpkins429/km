import { useGameStore } from '../store/gameStore';
import { STAT_LABELS } from '../data/flavor';
import type { StatEffect } from '../types/game';

function EffectBadge({ effect, index }: { effect: StatEffect; index: number }) {
  const delta = effect.delta ?? 0;
  const isPositive = delta > 0;
  const isNegative = delta < 0;

  const colorClass = isPositive
    ? 'text-emerald-400 border-emerald-700/40 bg-emerald-900/20'
    : isNegative
      ? 'text-red-400 border-red-700/40 bg-red-900/20'
      : 'text-amber-300 border-amber-700/40 bg-amber-900/20';

  const flashClass = isPositive
    ? 'animate-flashGreen'
    : isNegative
      ? 'animate-flashRed'
      : '';

  const arrow = isPositive ? '▲' : isNegative ? '▼' : '→';
  const sign = isPositive ? '+' : '';
  const displayDelta = delta !== 0 ? `${sign}${delta}` : effect.description ?? '';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-md border px-2 md:px-3 py-1 md:py-1.5
        text-xs md:text-sm font-medium
        animate-fadeSlideIn
        ${colorClass}
        ${flashClass}
      `}
      style={{ animationDelay: `${index * 100 + 200}ms` }}
    >
      <span>{STAT_LABELS[effect.stat]}</span>
      <span>{arrow}</span>
      {displayDelta && <span>{displayDelta}</span>}
    </span>
  );
}

export function ConsequenceReveal() {
  const choiceResult = useGameStore((s) => s.choiceResult);
  const nextTurn = useGameStore((s) => s.nextTurn);

  if (!choiceResult) return null;

  return (
    <div className="bg-stone-900/70 backdrop-blur-sm border border-amber-800/30 rounded-xl p-4 md:p-6 animate-slideInUp">
      <p className="text-amber-100 text-base md:text-lg leading-relaxed mb-4 italic animate-fadeIn">
        {choiceResult.choice.outcomeText}
      </p>

      {choiceResult.effects.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {choiceResult.effects.map((effect, i) => (
            <EffectBadge key={`${effect.stat}-${i}`} effect={effect} index={i} />
          ))}
        </div>
      )}

      <div className="flex justify-center animate-fadeIn" style={{ animationDelay: '300ms' }}>
        <button
          type="button"
          onClick={() => nextTurn()}
          className="
            bg-amber-700 hover:bg-amber-600
            text-amber-100
            px-6 md:px-8 py-3 min-h-[44px] rounded-lg
            transition-all duration-200
            hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-900/20
            active:scale-[0.98]
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500
          "
        >
          继续
        </button>
      </div>
    </div>
  );
}
