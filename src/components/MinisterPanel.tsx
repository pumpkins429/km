import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { MinisterCard } from './MinisterCard';
import { getRecruitPool } from '../engine/ministerEngine';
import { createRNG } from '../utils/random';
import type { Minister } from '../types/game';

function RecruitCard({ minister, onAppoint }: { minister: Minister; onAppoint: (id: string) => void }) {
  return (
    <div className="bg-stone-700/30 border border-amber-800/10 rounded p-3 flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-amber-200 font-bold text-sm">{minister.name}</span>
          <span className="text-amber-400/60 text-xs">{minister.title}</span>
        </div>
        <p className="text-stone-500 text-xs mt-1 truncate">{minister.description}</p>
        <div className="flex items-center gap-3 mt-1 text-xs">
          <span className="text-emerald-400/70">
            +{minister.skill.value} {minister.skill.stat}
          </span>
          <span className="text-stone-500">忠诚{minister.loyalty}</span>
          <span className="text-stone-500">野心{minister.ambition}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onAppoint(minister.id)}
        className="bg-amber-700/50 hover:bg-amber-600/50 text-amber-100 px-3 py-2 rounded text-sm min-h-[44px] transition-colors shrink-0"
      >
        任命
      </button>
    </div>
  );
}

export function MinisterPanel() {
  const ministers = useGameStore((s) => s.ministers);
  const turn = useGameStore((s) => s.turn);
  const appointNewMinister = useGameStore((s) => s.appointNewMinister);
  const dismissCurrentMinister = useGameStore((s) => s.dismissCurrentMinister);

  const [showRecruit, setShowRecruit] = useState(false);
  const [confirmDismiss, setConfirmDismiss] = useState<string | null>(null);

  const recruitPool = useMemo(() => {
    if (!showRecruit || ministers.length >= 5) return [];
    const rng = createRNG(turn * 1000);
    return getRecruitPool({ ministers, turn } as never, rng);
  }, [showRecruit, ministers.length, turn]);

  const handleAppoint = (ministerId: string) => {
    appointNewMinister(ministerId);
    setShowRecruit(false);
  };

  const handleDismiss = (ministerId: string) => {
    if (confirmDismiss === ministerId) {
      dismissCurrentMinister(ministerId);
      setConfirmDismiss(null);
    } else {
      setConfirmDismiss(ministerId);
      setTimeout(() => setConfirmDismiss(null), 3000);
    }
  };

  return (
    <div className="bg-stone-900/50 backdrop-blur-sm border border-amber-800/20 rounded-lg p-3 md:p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-amber-300 font-bold">朝中大臣</h2>
        {ministers.length < 5 && (
          <button
            type="button"
            onClick={() => setShowRecruit(!showRecruit)}
            className={`min-h-[44px] px-3 py-1.5 md:py-1 rounded text-sm transition-colors duration-200 ${
              showRecruit
                ? 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                : 'bg-amber-800/50 hover:bg-amber-700/50 text-amber-200'
            }`}
          >
            {showRecruit ? '收起' : '任命'}
          </button>
        )}
      </div>

      {ministers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ministers.map((minister) => (
            <MinisterCard
              key={minister.id}
              minister={minister}
              onDismiss={handleDismiss}
              isConfirming={confirmDismiss === minister.id}
            />
          ))}
        </div>
      ) : (
        <p className="text-stone-500 text-center py-4">朝中暂无大臣</p>
      )}

      {showRecruit && (
        <div className="mt-4 p-3 bg-stone-800/30 border border-amber-800/10 rounded-lg">
          <p className="text-amber-300/80 text-sm mb-3 font-medium">可选人才：</p>
          {recruitPool.length > 0 ? (
            <div className="space-y-2">
              {recruitPool.map((minister) => (
                <RecruitCard
                  key={minister.id}
                  minister={minister}
                  onAppoint={handleAppoint}
                />
              ))}
            </div>
          ) : (
            <p className="text-stone-500 text-sm text-center py-3">
              暂无合适人选
            </p>
          )}
        </div>
      )}
    </div>
  );
}
