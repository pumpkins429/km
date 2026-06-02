/**
 * SaveLoadPanel.tsx — Save/Load UI with 5 manual save slots.
 *
 * Modal overlay styled as an ancient Chinese scroll/book interface.
 * Each slot shows metadata (dynasty, year, turn count, remaining lifespan,
 * timestamp) and supports save, load, and delete actions.
 *
 * Auto-save is handled by Zustand persist middleware automatically.
 */

import { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import type { SaveSlot } from '../types/game';
import { formatLifespan, formatYearSeason } from '../utils/formatters';

// ============================================================================
// Constants
// ============================================================================

const SLOT_IDS = ['slot_1', 'slot_2', 'slot_3', 'slot_4', 'slot_5'] as const;

const SLOT_LABELS = ['一', '二', '三', '四', '五'] as const;

// ============================================================================
// Helpers
// ============================================================================

function formatDate(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ============================================================================
// SaveLoadPanel Component
// ============================================================================

export function SaveLoadPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [slots, setSlots] = useState<SaveSlot[]>([]);
  const [confirmNewGame, setConfirmNewGame] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  const getSaveSlots = useGameStore((s) => s.getSaveSlots);
  const saveToSlot = useGameStore((s) => s.saveToSlot);
  const loadFromSlot = useGameStore((s) => s.loadFromSlot);
  const deleteSlot = useGameStore((s) => s.deleteSlot);
  const startNewGame = useGameStore((s) => s.startNewGame);

  // Refresh slots when panel opens
  useEffect(() => {
    if (isOpen) {
      setSlots(getSaveSlots());
      setConfirmNewGame(false);
    }
  }, [isOpen, getSaveSlots]);

  const refreshSlots = useCallback(() => {
    setSlots(getSaveSlots());
  }, [getSaveSlots]);

  const getSlot = (slotId: string): SaveSlot | undefined =>
    slots.find((s) => s.id === slotId);

  const handleSave = (slotId: string) => {
    saveToSlot(slotId);
    refreshSlots();
    setSaveFeedback(slotId);
    setTimeout(() => setSaveFeedback(null), 1200);
  };

  const handleLoad = (slotId: string) => {
    const success = loadFromSlot(slotId);
    if (success) {
      setIsOpen(false);
    }
  };

  const handleDelete = (slotId: string) => {
    deleteSlot(slotId);
    refreshSlots();
  };

  const handleNewGame = () => {
    startNewGame();
    setIsOpen(false);
  };

  // ---- Render ----

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-stone-900/60 border border-amber-800/20 rounded px-3 py-1.5 min-h-[44px] text-amber-300 text-sm hover:bg-stone-800/60 hover:border-amber-700/30 transition-colors duration-200"
      >
        存档/读档
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="存档管理"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
          }}
        >
          {/* Modal Content */}
          <div className="relative bg-stone-900 border border-amber-800/40 rounded-xl p-4 md:p-6 max-w-[95vw] md:max-w-md w-full mx-4 shadow-2xl shadow-black/40">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-stone-400 hover:text-stone-200 transition-colors duration-200 text-lg leading-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="关闭"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-amber-300 text-xl font-bold mb-4 text-center tracking-wide">
              存档管理
            </h2>

            {/* Auto-save indicator */}
            <p className="text-stone-500 text-xs text-center mb-4">
              自动存档已开启
            </p>

            {/* Slot List */}
            <div className="flex flex-col gap-3">
              {SLOT_IDS.map((slotId, idx) => {
                const slot = getSlot(slotId);
                const isSaved = saveFeedback === slotId;

                return (
                  <div
                    key={slotId}
                    className="bg-stone-800/50 rounded-lg p-4 flex items-center justify-between gap-3"
                  >
                    {/* Left: Slot Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-amber-400 font-bold text-sm">
                          存档 {SLOT_LABELS[idx]}
                        </span>
                        {isSaved && (
                          <span className="text-emerald-400 text-xs animate-pulse">
                            已保存
                          </span>
                        )}
                      </div>

                      {slot ? (
                        <div className="space-y-0.5">
                          <p className="text-stone-300 text-sm truncate">
                            {slot.calendar.dynasty} ·{' '}
                            {slot.calendar.emperorTitle}
                            {formatYearSeason(
                              slot.calendar.year,
                              slot.calendar.season,
                            )}
                          </p>
                          <p className="text-stone-500 text-xs">
                            第{slot.turnCount}月 · 剩余
                            {formatLifespan(slot.stats.lifespan)} ·{' '}
                            {formatDate(slot.timestamp)}
                          </p>
                          {slot.endingTitle && (
                            <p className="text-amber-500 text-xs">
                              结局：{slot.endingTitle}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-stone-600 text-sm">空</p>
                      )}
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex flex-col gap-1.5 shrink-0">
                      {/* Save — always available */}
                      <button
                        type="button"
                        onClick={() => handleSave(slotId)}
                        className="bg-amber-800/60 hover:bg-amber-700/60 text-amber-200 px-3 py-1.5 min-h-[44px] text-sm rounded transition-colors duration-200"
                      >
                        存入
                      </button>

                      {slot && (
                        <>
                          {/* Load */}
                          <button
                            type="button"
                            onClick={() => handleLoad(slotId)}
                            className="bg-emerald-800/60 hover:bg-emerald-700/60 text-emerald-200 px-3 py-1.5 min-h-[44px] text-sm rounded transition-colors duration-200"
                          >
                            读取
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(slotId)}
                            className="bg-red-800/60 hover:bg-red-700/60 text-red-200 px-3 py-1.5 min-h-[44px] text-sm rounded transition-colors duration-200"
                          >
                            删除
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* New Game Button */}
            {confirmNewGame ? (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-800/30 rounded-lg">
                <p className="text-red-300 text-sm text-center mb-2">
                  确定要重新开始吗？当前未保存的进度将丢失。
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleNewGame}
                    className="flex-1 bg-red-800/70 hover:bg-red-700/70 text-red-200 py-2.5 min-h-[44px] rounded-lg text-sm transition-colors duration-200"
                  >
                    确认重开
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmNewGame(false)}
                    className="flex-1 bg-stone-700/50 hover:bg-stone-600/50 text-stone-300 py-2.5 min-h-[44px] rounded-lg text-sm transition-colors duration-200"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmNewGame(true)}
                className="bg-red-900/50 hover:bg-red-800/50 text-red-300 w-full py-2.5 min-h-[44px] mt-4 rounded-lg text-sm transition-colors duration-200"
              >
                重新开始
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SaveLoadPanel;
