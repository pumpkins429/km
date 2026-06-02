/**
 * App.tsx — Root layout for the Emperor Simulator.
 *
 * Assembles all components into the final game layout with responsive
 * desktop/mobile layouts and game phase routing.
 *
 * Z-layer stacking:
 *   z-0  — Background (decorative, pointer-events-none)
 *   z-10 — Game content (Header + main layout)
 *   z-50 — Overlays (GameOverScreen, SaveLoadPanel modal)
 */

import { Background } from './components/Background';
import { Header } from './components/Header';
import { StatsDashboard } from './components/StatsDashboard';
import { EventCard } from './components/EventCard';
import { MinisterPanel } from './components/MinisterPanel';
import { HistoryLog } from './components/HistoryLog';
import { SaveLoadPanel } from './components/SaveLoadPanel';
import { GameOverScreen } from './components/GameOverScreen';

export default function App() {
  return (
    <div className="relative min-h-screen text-stone-100 overflow-x-hidden">
      {/* ── Background (z-0, decorative only) ── */}
      <Background />

      {/* ── Header (z-10, fixed top) ── */}
      <Header />

      {/* ── Game Over Overlay (z-50, blocks all interaction) ── */}
      <GameOverScreen />

      {/* ── Main Game Content (z-10, below fixed header) ── */}
      <main className="relative z-10 pt-16 min-h-screen flex flex-col">
        {/* Content container with max-width and horizontal padding */}
        <div className="w-full max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4 flex-1">
          {/* ── Stats Dashboard (full width, above layout split) ── */}
          <StatsDashboard />

          {/* ── Desktop: sidebar + main | Mobile: stacked ── */}
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Left sidebar: MinisterPanel (desktop only visible here, mobile stacked below event) */}
            <aside className="hidden md:block md:w-72 lg:w-80 shrink-0">
              <MinisterPanel />
            </aside>

            {/* Main content area: EventCard + HistoryLog */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              {/* Event Card (center stage) */}
              <EventCard />

              {/* History Log (collapsible, below event) */}
              <HistoryLog />
            </div>

            {/* Mobile: MinisterPanel below event, visible only on small screens */}
            <div className="md:hidden">
              <MinisterPanel />
            </div>
          </div>
        </div>

        {/* ── Bottom Bar: Save/Load trigger ── */}
        <div className="sticky bottom-0 z-20 bg-stone-950/80 backdrop-blur-sm border-t border-amber-800/20">
          <div className="w-full max-w-6xl mx-auto px-4 py-2 flex justify-end">
            <SaveLoadPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
