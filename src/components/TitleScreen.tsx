/**
 * TitleScreen.tsx — Cinematic title screen for the Emperor Simulator.
 *
 * Full-screen overlay with atmospheric Chinese imperial aesthetic.
 * Shows on game start, allows new game or continue from auto-save.
 * Fades out with exit animation before revealing the game.
 *
 * Z-layer: z-50 (above all game content, below nothing).
 */

import { useState, useCallback } from 'react';

interface TitleScreenProps {
  hasSave: boolean;
  onNewGame: () => void;
  onContinue: () => void;
}

export function TitleScreen({ hasSave, onNewGame, onContinue }: TitleScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleNewGame = useCallback(() => {
    setIsExiting(true);
    // Wait for exit animation to complete before triggering game start
    setTimeout(onNewGame, 600);
  }, [onNewGame]);

  const handleContinue = useCallback(() => {
    setIsExiting(true);
    setTimeout(onContinue, 600);
  }, [onContinue]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ background: '#0d0500' }}
    >
      {/* ── Radial gold glow from center ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(201,169,78,0.08), transparent 65%)',
        }}
      />

      {/* ── Subtle vertical line texture ── */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(201,169,78,0.5) 2px, rgba(201,169,78,0.5) 3px)',
        }}
      />

      {/* ── Decorative inset frame ── */}
      <div className="absolute inset-4 border border-amber-800/10 pointer-events-none" />
      <div className="absolute inset-6 border border-amber-800/[0.06] pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Top decorative line */}
        <div
          className="w-32 h-px bg-gradient-to-r from-transparent via-imperial-gold/50 to-transparent"
          aria-hidden
        />

        {/* Title */}
        <h1
          className="title-chinese text-6xl md:text-8xl text-imperial-gold tracking-wider"
          style={{
            textShadow:
              '0 0 40px rgba(201,169,78,0.25), 0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          皇帝模拟器
        </h1>

        {/* Subtitle */}
        <p
          className="text-base md:text-lg text-imperial-gold/60 tracking-widest"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          醒掌天下权，醉卧美人膝
        </p>

        {/* Decorative divider */}
        <div className="flex items-center gap-3" aria-hidden>
          <div className="w-12 h-px bg-imperial-gold/20" />
          <div className="w-1.5 h-1.5 rotate-45 border border-imperial-gold/40" />
          <div className="w-12 h-px bg-imperial-gold/20" />
        </div>

        {/* ── Buttons ── */}
        <div className="flex flex-col items-center gap-4 mt-4">
          {/* New Game — primary */}
          <button
            type="button"
            onClick={handleNewGame}
            className="group relative px-12 py-3.5 text-lg tracking-widest text-imperial-gold border border-imperial-gold/40 rounded-sm transition-all duration-300 hover:border-imperial-gold/70 hover:bg-imperial-gold/5 hover:shadow-[0_0_30px_rgba(201,169,78,0.15)] active:scale-[0.98]"
          >
            <span className="relative z-10">开始新的王朝</span>
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-imperial-gold/60" aria-hidden />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-imperial-gold/60" aria-hidden />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-imperial-gold/60" aria-hidden />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-imperial-gold/60" aria-hidden />
          </button>

          {/* Continue — secondary, only if save exists */}
          {hasSave && (
            <button
              type="button"
              onClick={handleContinue}
              className="px-8 py-2.5 text-sm tracking-widest text-imperial-gold/50 border border-imperial-gold/15 rounded-sm transition-all duration-300 hover:text-imperial-gold/70 hover:border-imperial-gold/30 hover:bg-imperial-gold/[0.03] active:scale-[0.98]"
            >
              继续上一朝
            </button>
          )}
        </div>

        {/* Bottom decorative line */}
        <div
          className="w-32 h-px bg-gradient-to-r from-transparent via-imperial-gold/50 to-transparent mt-4"
          aria-hidden
        />
      </div>

      {/* ── Footer ── */}
      <p className="absolute bottom-6 text-xs text-imperial-gold/25 tracking-wider z-10">
        v1.0 · 无需后端 · 即刻体验
      </p>

      {/* ── Corner accent decorations ── */}
      <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-imperial-gold/30" aria-hidden />
      <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-imperial-gold/30" aria-hidden />
      <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-imperial-gold/30" aria-hidden />
      <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-imperial-gold/30" aria-hidden />
    </div>
  );
}
