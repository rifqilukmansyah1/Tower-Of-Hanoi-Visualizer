'use client';

import React from 'react';
import { Move } from '@/types/hanoi';
import { Layers } from 'lucide-react';

interface CallStackViewProps {
  currentStep: number;
  totalSteps: number;
  currentMove: Move | null;
}

export function CallStackView({ currentStep, totalSteps, currentMove }: CallStackViewProps) {
  const stack = currentMove?.callStack || [];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Recursive Call Stack Visualizer
          </h4>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Kedalaman Stack: <strong className="text-cyan-400">{stack.length}</strong> Frame
        </span>
      </div>

      {currentStep === 0 ? (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-855 text-slate-500 font-mono text-xs italic">
          Call stack kosong. Simulasi belum dimulai.
        </div>
      ) : currentStep === totalSteps ? (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-emerald-400 font-mono text-xs">
          ✓ Rekursi selesai. Seluruh fungsi telah berhasil diselesaikan dan di-pop dari stack.
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 font-mono text-xs space-y-2 overflow-x-auto shadow-inner">
          <div className="text-[11px] text-slate-500 mb-1">
            {'// Active Call Stack Trace (Langkah ' + currentStep + '):'}
          </div>

          {stack.map((call, index) => {
            const isTop = index === stack.length - 1;
            const indentLevel = index;

            return (
              <div
                key={index}
                style={{ paddingLeft: `${indentLevel * 18}px` }}
                className={`flex items-center gap-2 py-1 px-2 rounded-lg transition-colors ${
                  isTop
                    ? 'bg-cyan-950/70 border border-cyan-500/50 text-cyan-200 font-bold shadow-xs'
                    : 'text-slate-400'
                }`}
              >
                <span className="text-slate-600 select-none">
                  {index === 0 ? '►' : '└─'}
                </span>
                <span className={isTop ? 'text-cyan-300' : 'text-slate-400'}>
                  {call}
                </span>
                {isTop && (
                  <span className="ml-auto px-2 py-0.5 rounded text-[10px] bg-cyan-900/80 text-cyan-300 border border-cyan-700/60 uppercase font-sans font-bold">
                    Active Leaf
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
