/**
 * HistoryLog.tsx — Collapsible chronological event log.
 *
 * Shows a scrollable list of past decisions made by the emperor.
 * Latest entries appear at top. Toggle button labeled "史记" (Historical Records)
 * with a chevron indicator. Reactively updates from the Zustand store.
 */

import { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { HistoryEntry } from './HistoryEntry';

export function HistoryLog() {
  const history = useGameStore((s) => s.history);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reverse history so latest entries appear first
  const reversedHistory = [...history].reverse();

  // Auto-scroll to top when new entries arrive (while open)
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [history.length, isOpen]);

  return (
    <div className="bg-stone-900/60 backdrop-blur-sm rounded-lg border border-amber-800/20">
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 md:py-2 min-h-[44px] text-amber-300 hover:text-amber-200 transition-colors"
      >
        <span className="text-sm font-bold tracking-wider">史记</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible panel */}
      {isOpen && (
        <div className="border-t border-amber-800/20 p-4">
          <div
            ref={scrollRef}
            className="max-h-60 md:max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-800/30"
          >
            {reversedHistory.length === 0 ? (
              <p className="text-stone-500 text-sm text-center py-6 italic">
                尚无史记记载
              </p>
            ) : (
              reversedHistory.map((entry, i) => (
                <HistoryEntry key={`${entry.turn}-${i}`} entry={entry} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
