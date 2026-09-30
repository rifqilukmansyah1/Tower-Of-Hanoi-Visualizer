'use client';

import React, { useEffect } from 'react';
import { Move } from '@/types/hanoi';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CurrentMoveCardProps {
  currentStep: number;
  totalSteps: number;
  currentMove: Move | null;
}

export function CurrentMoveCard({ currentStep, totalSteps, currentMove }: CurrentMoveCardProps) {
  const isFinished = currentStep === totalSteps && totalSteps > 0;

  useEffect(() => {
    if (isFinished) {
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
        });
      } catch {
        // Safe fallback if window or canvas is restricted
      }
    }
  }, [isFinished]);

  if (isFinished) {
    return (
      <div className="bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/50 p-6 rounded-2xl shadow-xl shadow-emerald-950/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-emerald-300">Simulasi Selesai! 🎉</h4>
            <p className="text-xs text-slate-300">113 langkah optimal berhasil dieksekusi secara sempurna.</p>
          </div>
        </div>
        <p className="text-sm text-slate-200 mt-3 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
          Semua <strong>14 balok</strong> berhasil dipindahkan dari <strong>Tiang A</strong> menuju <strong>Tiang D</strong> sesuai kaidah Menara Hanoi dan prinsip rekursi Frame-Stewart.
        </p>
      </div>
    );
  }

  if (currentStep === 0 || !currentMove) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
        <div className="flex items-center gap-2.5 text-slate-300 mb-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Kondisi Awal</h4>
        </div>
        <p className="text-sm text-slate-400">
          14 balok berada di <strong>Tiang A</strong> terurut rapi dari nomor 14 (dasar) hingga 1 (puncak). Tekan tombol <strong>Play</strong> atau <strong>Next</strong> untuk memulai.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <h4 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider">
            Langkah Saat Ini
          </h4>
        </div>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/50">
          Langkah {currentStep} dari {totalSteps}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-850">
        <div>
          <div className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>Pindahkan Balok</span>
            <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-mono">
              Disk {currentMove.disk}
            </span>
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <span>Metode:</span>
            <span className="font-mono text-cyan-400 font-semibold uppercase">{currentMove.type || 'Frame-Stewart'}</span>
          </div>
        </div>

        {/* Source -> Target Route pill */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 uppercase font-mono">Source</span>
            <span className="text-base font-bold text-rose-400 px-3 py-1 rounded-lg bg-rose-950/40 border border-rose-800/50">
              Tiang {currentMove.from}
            </span>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-500" />

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 uppercase font-mono">Target</span>
            <span className="text-base font-bold text-emerald-400 px-3 py-1 rounded-lg bg-emerald-950/40 border border-emerald-800/50">
              Tiang {currentMove.to}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
