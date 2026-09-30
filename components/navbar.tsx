'use client';

import React from 'react';
import { Layers, Play, BookOpen, Code2, FileCode, BarChart3 } from 'lucide-react';

interface NavbarProps {
  currentStep: number;
  totalSteps: number;
}

export function Navbar({ currentStep, totalSteps }: NavbarProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/30">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-base sm:text-lg tracking-tight">Menara Hanoi</span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 hidden sm:inline-flex">
                4 Tiang • 14 Balok
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Algoritma Rekursif Frame-Stewart</p>
          </div>
        </div>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollTo('simulasi')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/70 transition-colors"
          >
            <Play className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simulasi</span>
          </button>
          <button
            onClick={() => scrollTo('penjelasan')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/70 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Penjelasan</span>
          </button>
          <button
            onClick={() => scrollTo('python')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/70 transition-colors"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Python</span>
          </button>
          <button
            onClick={() => scrollTo('pseudocode')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/70 transition-colors"
          >
            <FileCode className="w-3.5 h-3.5 text-amber-400" />
            <span>Pseudocode</span>
          </button>
          <button
            onClick={() => scrollTo('perbandingan')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/70 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
            <span>Perbandingan</span>
          </button>
        </nav>

        {/* Status / Step badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-400">{currentStep}</span>
            <span className="text-slate-500">/</span>
            <span>{totalSteps}</span>
            <span className="text-slate-500 hidden sm:inline">Langkah</span>
          </div>
          <button
            onClick={() => scrollTo('simulasi')}
            className="sm:hidden px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-semibold"
          >
            Mulai
          </button>
        </div>
      </div>
    </header>
  );
}
