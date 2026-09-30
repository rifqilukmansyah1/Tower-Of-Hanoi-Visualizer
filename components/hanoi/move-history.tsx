'use client';

import React, { useEffect, useRef } from 'react';
import { Move } from '@/types/hanoi';
import { ListOrdered, Check, ArrowRight, Circle } from 'lucide-react';
import { DISK_PALETTES } from '@/lib/hanoi';

interface MoveHistoryProps {
  moves: Move[];
  currentStep: number;
  onSelectStep: (step: number) => void;
}

export function MoveHistory({ moves, currentStep, onSelectStep }: MoveHistoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to active step
  useEffect(() => {
    if (activeItemRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = activeItemRef.current;
      const offsetTop = element.offsetTop - container.offsetTop;
      container.scrollTo({
        top: offsetTop - 120,
        behavior: 'smooth',
      });
    }
  }, [currentStep]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md flex flex-col h-full max-h-[560px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-4 h-4 text-cyan-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Riwayat Perpindahan
          </h4>
        </div>
        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
          Total: {moves.length} Langkah
        </span>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[11px] text-slate-400 pb-2 mb-2 border-b border-slate-850">
        <span className="flex items-center gap-1">
          <Check className="w-3 h-3 text-emerald-400" /> Selesai
        </span>
        <span className="flex items-center gap-1">
          <ArrowRight className="w-3 h-3 text-cyan-400" /> Aktif
        </span>
        <span className="flex items-center gap-1">
          <Circle className="w-2.5 h-2.5 text-slate-600" /> Belum
        </span>
      </div>

      {/* List */}
      <div
        ref={containerRef}
        className="overflow-y-auto space-y-1.5 pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-950 flex-1"
      >
        {moves.map((move) => {
          const isDone = move.step < currentStep;
          const isActive = move.step === currentStep;
          const paletteIndex = (move.disk - 1) % DISK_PALETTES.length;
          const palette = DISK_PALETTES[paletteIndex];

          return (
            <button
              key={move.step}
              ref={isActive ? activeItemRef : null}
              onClick={() => onSelectStep(move.step)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/80 to-indigo-950/80 border border-cyan-500/60 shadow-md shadow-cyan-950 text-white font-bold ring-1 ring-cyan-400/40'
                  : isDone
                  ? 'bg-slate-950/40 hover:bg-slate-850/60 border border-slate-850/60 text-slate-300'
                  : 'bg-slate-950/20 hover:bg-slate-850/40 border border-transparent text-slate-500'
              }`}
            >
              {/* Status and Step number */}
              <div className="flex items-center gap-2.5">
                <span className="w-4 flex justify-center">
                  {isDone ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isActive ? (
                    <ArrowRight className="w-4 h-4 text-cyan-300 animate-pulse" />
                  ) : (
                    <Circle className="w-2 h-2 text-slate-700" />
                  )}
                </span>
                <span className="text-slate-400">{String(move.step).padStart(3, '0')}</span>
              </div>

              {/* Disk Badge */}
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-bold text-white bg-gradient-to-r ${palette.gradient} shadow-xs`}
                >
                  Disk {move.disk}
                </span>
              </div>

              {/* Route */}
              <div className="flex items-center gap-1.5 font-bold">
                <span className={move.from === 'A' ? 'text-blue-400' : 'text-slate-300'}>
                  {move.from}
                </span>
                <span className="text-slate-600">→</span>
                <span className={move.to === 'D' ? 'text-purple-400' : 'text-slate-300'}>
                  {move.to}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
