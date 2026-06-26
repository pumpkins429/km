import type { EventChoice } from '../types/game';

interface ChoiceButtonProps {
  choice: EventChoice;
  onSelect: (choiceId: string) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function ChoiceButton({ choice, onSelect, disabled, style }: ChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(choice.id)}
      disabled={disabled}
      style={style}
      className={`
        w-full text-left rounded-lg p-3 md:p-4 min-h-[44px]
        border border-amber-700/30
        bg-amber-900/30
        text-amber-100 text-sm md:text-base leading-relaxed
        transition-all duration-200
        animate-fadeSlideIn
        hover:bg-amber-800/40 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-900/20
        active:scale-[0.98]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-amber-900/30
      `}
    >
      {choice.text}
    </button>
  );
}
