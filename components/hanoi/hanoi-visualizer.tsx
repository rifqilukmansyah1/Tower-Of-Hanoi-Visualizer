'use client';

import React from 'react';
import { PegState, Move, PegId } from '@/types/hanoi';
import { HanoiPeg } from './hanoi-peg';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HanoiVisualizerProps {
  pegState: PegState;
  currentMove: Move | null;
  animatingDisk: number | null;
  animatingSource: PegId | null;
  animatingTarget: PegId | null;
  animPhase: 'idle' | 'lifting' | 'traversing' | 'dropping';
}

export function HanoiVisualizer({
  pegState,
  currentMove,
  animatingDisk,
  animatingSource,
  animatingTarget,
}: HanoiVisualizerProps) {
  const pegs: PegId[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="relative bg-slate-950/70 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Visualizer header & flight banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-850">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <h3 className="font-bold text-white text-base sm:text-lg tracking-tight">
            Arena Perpindahan Balok (Horizontal Pegs)
          </h3>
        </div>

        {/* Realtime Active Move Banner */}
        {animatingDisk && animatingSource && animatingTarget ? (
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/50 text-xs sm:text-sm shadow-lg shadow-cyan-950/50 animate-pulse">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300">Animasi:</span>
            <span className="px-2 py-0.5 rounded font-mono font-bold text-white bg-slate-800 border border-slate-700">
              Balok {animatingDisk}
            </span>
            <span className="text-rose-400 font-bold">Tiang {animatingSource}</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-emerald-400 font-bold">Tiang {animatingTarget}</span>
          </div>
        ) : (
          <div className="text-xs text-slate-400 font-mono">
            {currentMove ? (
              <span>
                Langkah terakhir: Balok {currentMove.disk} ({currentMove.from} → {currentMove.to})
              </span>
            ) : (
              <span>Posisi Awal: Semua 14 balok di Tiang A</span>
            )}
          </div>
        )}
      </div>

      {/* Horizontal Pegs Container (Horizontal Scroll on Mobile to preserve layout integrity) */}
      <div className="overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <div className="min-w-[680px] grid grid-cols-4 gap-4">
          {pegs.map((pegId) => (
            <HanoiPeg
              key={pegId}
              id={pegId}
              disks={pegState[pegId]}
              isActiveSource={animatingSource === pegId}
              isActiveTarget={animatingTarget === pegId}
              animatingDisk={animatingDisk}
              totalDisks={14}
            />
          ))}
        </div>
      </div>

      {/* Floor surface bar */}
      <div className="w-full h-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-full border border-slate-750/70 shadow-inner mt-2" />
    </div>
  );
}
