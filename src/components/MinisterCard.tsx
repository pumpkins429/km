import type { Minister } from '../types/game';
import { STAT_LABELS } from '../data/flavor';

interface MinisterCardProps {
  minister: Minister;
  onDismiss: (id: string) => void;
  isConfirming?: boolean;
}

export function MinisterCard({ minister, onDismiss, isConfirming }: MinisterCardProps) {
  const loyaltyColor =
    minister.loyalty >= 70
      ? 'bg-emerald-500'
      : minister.loyalty >= 40
        ? 'bg-amber-500'
        : 'bg-red-500';

  const ambitionColor =
    minister.ambition >= 70
      ? 'text-red-400'
      : minister.ambition >= 40
        ? 'text-amber-400'
        : 'text-stone-400';

  return (
    <div className="bg-stone-800/50 border border-amber-800/20 rounded-lg p-4 transition-all duration-200 hover:bg-stone-800/70">
      {/* Header: Name + Title */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-amber-200 font-bold">{minister.name}</span>
          <span className="text-amber-400/70 text-sm ml-2">· {minister.title}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-stone-400 text-xs mb-3 leading-relaxed">{minister.description}</p>

      {/* Skill Bonus */}
      <div className="text-emerald-400 text-sm mb-3">
        +{minister.skill.value} {STAT_LABELS[minister.skill.stat]}
      </div>

      {/* Loyalty Bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-stone-500 text-xs">忠诚</span>
          <span className="text-stone-400 text-xs">{minister.loyalty}</span>
        </div>
        <div className="h-1.5 rounded-full bg-stone-700 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${loyaltyColor}`}
            style={{ width: `${minister.loyalty}%` }}
          />
        </div>
      </div>

      {/* Ambition Indicator */}
      <div className="flex justify-between items-center">
        <span className="text-stone-500 text-xs">野心</span>
        <span className={`${ambitionColor} text-xs`}>
          {minister.ambition >= 70 ? '⚠ 高' : minister.ambition >= 40 ? '中' : '低'}
        </span>
      </div>

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={() => onDismiss(minister.id)}
        className={`w-full mt-3 text-xs py-2 min-h-[44px] rounded transition-colors duration-200 ${
          isConfirming
            ? 'text-red-300 bg-red-800/30 hover:bg-red-700/30'
            : 'text-red-400/70 hover:text-red-300 hover:bg-red-900/20'
        }`}
      >
        {isConfirming ? '确认罢免' : '罢免'}
      </button>
    </div>
  );
}
