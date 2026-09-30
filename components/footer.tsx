'use client';

import React from 'react';
import { Layers, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-200 text-base">Visualisasi Rekursif Menara Hanoi</span>
          </div>
          <p className="text-slate-500 text-xs">
            Studi Kasus: 14 Balok • 4 Tiang • Frame-Stewart Algorithm
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right text-xs text-slate-500 hidden sm:block">
            <span>Client-side Simulation</span>
            <span className="mx-2">•</span>
            <span>Zero Backend Dependency</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all"
            title="Kembali ke atas"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
