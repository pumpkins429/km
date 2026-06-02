import { useGameStore } from '../store/gameStore';
import type { EventCategory } from '../types/game';
import { ChoiceButton } from './ChoiceButton';
import { ConsequenceReveal } from './ConsequenceReveal';

const CATEGORY_STYLES: Record<EventCategory, { label: string; className: string }> = {
  disaster: { label: '天灾', className: 'bg-red-900/40 text-red-300 border-red-700/40' },
  military: { label: '军事', className: 'bg-orange-900/40 text-orange-300 border-orange-700/40' },
  court: { label: '朝政', className: 'bg-purple-900/40 text-purple-300 border-purple-700/40' },
  economy: { label: '经济', className: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/40' },
  diplomacy: { label: '外交', className: 'bg-blue-900/40 text-blue-300 border-blue-700/40' },
  culture: { label: '文化', className: 'bg-pink-900/40 text-pink-300 border-pink-700/40' },
  personal: { label: '私事', className: 'bg-rose-900/40 text-rose-300 border-rose-700/40' },
  harem: { label: '后宫', className: 'bg-fuchsia-900/40 text-fuchsia-300 border-fuchsia-700/40' },
  tutorial: { label: '引导', className: 'bg-amber-900/40 text-amber-300 border-amber-700/40' },
};

function CategoryBadge({ category }: { category: EventCategory }) {
  const { label, className } = CATEGORY_STYLES[category];
  return (
    <span
      className={`
        inline-block rounded-full border px-3 py-0.5
        text-xs font-medium tracking-wide
        ${className}
      `}
    >
      {label}
    </span>
  );
}

export function EventCard() {
  const pendingEvent = useGameStore((s) => s.pendingEvent);
  const gamePhase = useGameStore((s) => s.gamePhase);
  const selectChoice = useGameStore((s) => s.selectChoice);
  const nextTurn = useGameStore((s) => s.nextTurn);

  if (gamePhase === 'gameover') return null;

  return (
    <div className="max-w-full md:max-w-2xl mx-auto bg-stone-900/60 backdrop-blur-sm border border-amber-800/30 rounded-xl p-4 md:p-8">
      {/* Result phase: show consequences */}
      {gamePhase === 'result' && <ConsequenceReveal />}

      {/* Playing phase: idle, waiting for next event */}
      {gamePhase === 'playing' && !pendingEvent && (
        <div className="text-center space-y-6">
          <p className="text-amber-100/70 text-lg">朝中无事，点击继续</p>
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
            下一回合
          </button>
        </div>
      )}

      {/* Choosing phase: event with choices */}
      {gamePhase === 'choosing' && pendingEvent && (
        <div className="space-y-6">
          <div>
            <CategoryBadge category={pendingEvent.category} />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-amber-200 mb-2">
            {pendingEvent.title}
          </h2>

          <p className="text-amber-100/80 text-base leading-relaxed mb-6">
            {pendingEvent.description}
          </p>

          <div className="space-y-3">
            {pendingEvent.choices.map((choice) => (
              <ChoiceButton
                key={choice.id}
                choice={choice}
                onSelect={selectChoice}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
