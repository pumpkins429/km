/**
 * GameOverScreen.tsx — Full-screen overlay shown when game ends.
 *
 * Displays the ending title (谥号), game over reason, reign statistics,
 * and a restart option. The tone adapts to the ending:
 * golden for good endings, muted for neutral, crimson for bad.
 */

import { useGameStore } from '../store/gameStore';
import { ENDING_DESCRIPTIONS, GAME_OVER_REASONS, STAT_LABELS, STAT_ICONS } from '../data/flavor';
import { formatLifespan } from '../utils/formatters';
import type { EndingType, StatKey } from '../types/game';

// ============================================================================
// Ending quality classification
// ============================================================================

const GOOD_ENDINGS: EndingType[] = ['明君', '盛世之主', '拓疆之帝'];
const BAD_ENDINGS: EndingType[] = ['昏君', '暴君', '亡国之君', '短命天子'];

function getEndingColor(ending: EndingType | null): string {
  if (!ending) return 'text-stone-300';
  if (GOOD_ENDINGS.includes(ending)) return 'text-amber-300';
  if (BAD_ENDINGS.includes(ending)) return 'text-red-400';
  return 'text-stone-300';
}

function getEndingGlow(ending: EndingType | null): string {
  if (!ending) return '';
  if (GOOD_ENDINGS.includes(ending)) return 'shadow-amber-500/20';
  if (BAD_ENDINGS.includes(ending)) return 'shadow-red-500/20';
  return '';
}

// ============================================================================
// Stats to display in the reign summary (excludes lifespan — shown separately)
// ============================================================================

const SUMMARY_STATS: StatKey[] = [
  'gold', 'food', 'population', 'military',
  'stability', 'prestige', 'health',
];

// ============================================================================
// Component
// ============================================================================

export function GameOverScreen() {
  const gamePhase = useGameStore((s) => s.gamePhase);
  const gameOverReason = useGameStore((s) => s.gameOverReason);
  const endingTitle = useGameStore((s) => s.endingTitle);
  const calendar = useGameStore((s) => s.calendar);
  const stats = useGameStore((s) => s.stats);
  const history = useGameStore((s) => s.history);
  const turnCount = useGameStore((s) => s.turnCount);
  const ministers = useGameStore((s) => s.ministers);
  const startNewGame = useGameStore((s) => s.startNewGame);

  if (gamePhase !== 'gameover') return null;

  const endingInfo = ENDING_DESCRIPTIONS[endingTitle ?? '庸君'];
  const titleColor = getEndingColor(endingTitle);
  const glowShadow = getEndingGlow(endingTitle);
  const monthsConsumed = 360 - stats.lifespan;

  // Unique ministers count (by id)
  const uniqueMinisterIds = new Set(ministers.map((m) => m.id));
  const totalMinisters = uniqueMinisterIds.size;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/80 backdrop-blur-md
        flex items-center justify-center
        animate-fadeIn
      "
    >
      <div
        className="
          max-w-lg w-full mx-4
          bg-stone-900 border-2 border-amber-800/50
          rounded-2xl p-4 md:p-8 text-center
          shadow-2xl shadow-black/40
          animate-slideInUp
          max-h-[90vh] overflow-y-auto
        "
      >
        <h1
          className={`
            text-3xl md:text-4xl font-bold mb-2
            ${titleColor}
            ${glowShadow ? `drop-shadow-lg ${glowShadow}` : ''}
            animate-fadeIn
          `}
          style={{ animationDelay: '0.2s' }}
        >
          {endingInfo.title}
        </h1>

        <p
          className="text-lg text-stone-300 leading-relaxed mb-2 animate-fadeIn"
          style={{ animationDelay: '0.35s' }}
        >
          {endingInfo.description}
        </p>

        {gameOverReason && (
          <p
            className="text-sm text-stone-400 italic mb-6 animate-fadeIn"
            style={{ animationDelay: '0.45s' }}
          >
            {GAME_OVER_REASONS[gameOverReason] ?? gameOverReason}
          </p>
        )}

        <div className="border-t border-amber-800/30 my-6" />

        <h2
          className="text-amber-400/80 text-sm font-bold tracking-wider uppercase mb-4 animate-fadeIn"
          style={{ animationDelay: '0.5s' }}
        >
          御览总结
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-6">
          <div className="animate-fadeIn" style={{ animationDelay: '0.55s' }}>
            <p className="text-stone-400 text-sm">在位年数</p>
            <p className="text-amber-200 font-mono text-lg">
              {calendar.year}年
            </p>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <p className="text-stone-400 text-sm">总回合数</p>
            <p className="text-amber-200 font-mono text-lg">
              {turnCount}
            </p>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: '0.65s' }}>
            <p className="text-stone-400 text-sm">寿命消耗</p>
            <p className="text-amber-200 font-mono text-lg">
              {formatLifespan(monthsConsumed)}
            </p>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: '0.7s' }}>
            <p className="text-stone-400 text-sm">剩余寿命</p>
            <p className="text-amber-200 font-mono text-lg">
              {formatLifespan(stats.lifespan)}
            </p>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: '0.75s' }}>
            <p className="text-stone-400 text-sm">经历事件</p>
            <p className="text-amber-200 font-mono text-lg">
              {history.length}件
            </p>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: '0.8s' }}>
            <p className="text-stone-400 text-sm">任用臣子</p>
            <p className="text-amber-200 font-mono text-lg">
              {totalMinisters}人
            </p>
          </div>
        </div>

        <h2
          className="text-amber-400/80 text-sm font-bold tracking-wider uppercase mb-3 animate-fadeIn"
          style={{ animationDelay: '0.85s' }}
        >
          终局国势
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-1.5 text-left mb-6">
          {SUMMARY_STATS.map((key, i) => (
            <div
              key={key}
              className="flex items-center justify-between animate-fadeIn"
              style={{ animationDelay: `${0.9 + i * 0.05}s` }}
            >
              <span className="text-stone-400 text-sm">
                {STAT_ICONS[key]} {STAT_LABELS[key]}
              </span>
              <span className="text-amber-200 font-mono text-sm">
                {key === 'population'
                  ? `${stats[key]}万`
                  : stats[key]}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-amber-800/30 my-6" />

        <button
          type="button"
          onClick={() => startNewGame()}
          className="
            bg-amber-700 hover:bg-amber-600
            text-amber-100
            px-6 md:px-8 py-3 min-h-[44px] rounded-lg text-base md:text-lg
            transition-all duration-200
            animate-pulseGlow
            hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-900/20
            active:scale-[0.98]
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500
          "
          style={{ animationDelay: '1.2s' }}
        >
          重新开始
        </button>

        <p
          role="button"
          tabIndex={0}
          onClick={() => startNewGame()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') startNewGame();
          }}
          className="text-stone-500 hover:text-stone-300 text-sm mt-3 cursor-pointer transition-colors"
        >
          返回标题
        </p>
      </div>
    </div>
  );
}

export default GameOverScreen;
