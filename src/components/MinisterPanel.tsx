import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { MinisterCard } from './MinisterCard';

export function MinisterPanel() {
  const ministers = useGameStore((s) => s.ministers);
  const [showRecruit, setShowRecruit] = useState(false);

  const handleDismiss = (id: string) => {
    // Minister dismissal happens through the game engine on next turn.
    // For now, we log the intent. The UI is primarily display-focused.
    console.log('Dismiss minister:', id);
  };

  return (
    <div className="bg-stone-900/50 backdrop-blur-sm border border-amber-800/20 rounded-lg p-3 md:p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-amber-300 font-bold">朝中大臣</h2>
        <button
          type="button"
          onClick={() => setShowRecruit(!showRecruit)}
          className="bg-amber-800/50 hover:bg-amber-700/50 text-amber-200 px-3 py-1.5 md:py-1 min-h-[44px] rounded text-sm transition-colors duration-200"
        >
          任命
        </button>
      </div>

      {/* Ministers Grid */}
      {ministers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ministers.map((minister) => (
            <MinisterCard
              key={minister.id}
              minister={minister}
              onDismiss={handleDismiss}
            />
          ))}
        </div>
      ) : (
        <p className="text-stone-500 text-center py-4">朝中暂无大臣</p>
      )}

      {/* Recruit Panel (simplified) */}
      {showRecruit && (
        <div className="mt-4 p-3 bg-stone-800/30 border border-amber-800/10 rounded-lg">
          <p className="text-stone-400 text-sm text-center">
            人才招募由朝廷典制司负责，每逢春秋季选拔贤能。
          </p>
          <p className="text-stone-500 text-xs text-center mt-2">
            （招募功能将在后续版本开放）
          </p>
        </div>
      )}
    </div>
  );
}
