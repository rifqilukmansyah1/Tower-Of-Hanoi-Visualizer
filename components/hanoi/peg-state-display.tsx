'use client';

import React from 'react';
import { PegState, PegId } from '@/types/hanoi';
import { Database } from 'lucide-react';

interface PegStateDisplayProps {
  pegState: PegState;
}

export function PegStateDisplay({ pegState }: PegStateDisplayProps) {
  const pegs: { id: PegId; name: string; color: string; border: string; bg: string }[] = [
    { id: 'A', name: 'Tiang A (Asal)', color: 'text-blue-400', border: 'border-blue-900/60', bg: 'bg-blue-950/20' },
    { id: 'B', name: 'Tiang B (Transit 1)', color: 'text-amber-400', border: 'border-amber-900/60', bg: 'bg-amber-950/20' },
    { id: 'C', name: 'Tiang C (Transit 2)', color: 'text-emerald-400', border: 'border-emerald-900/60', bg: 'bg-emerald-950/20' },
    { id: 'D', name: 'Tiang D (Tujuan)', color: 'text-purple-400', border: 'border-purple-900/60', bg: 'bg-purple-950/20' },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            State Tiang Real-Time
          </h4>
        </div>
        <span className="text-xs font-mono text-slate-500">Array Stack Memory</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {pegs.map((peg) => {
          const items = pegState[peg.id];
          return (
            <div
              key={peg.id}
              className={`p-3.5 rounded-xl border ${peg.border} ${peg.bg} transition-all`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono font-bold text-xs sm:text-sm ${peg.color}`}>
                  {peg.name}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                  {items.length} items
                </span>
              </div>

              {/* Array content */}
              <div className="font-mono text-xs p-2 rounded-lg bg-slate-950/80 border border-slate-850/80 text-slate-300 break-words min-h-[52px] flex items-center">
                {items.length === 0 ? (
                  <span className="text-slate-600 italic">[ ] (Kosong)</span>
                ) : (
                  <span>[{items.join(', ')}]</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
