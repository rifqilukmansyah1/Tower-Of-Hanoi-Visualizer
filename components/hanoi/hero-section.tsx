'use client';

import React from 'react';
import { Play, Sparkles, Cpu, Layers, GitBranch, ArrowRight, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  onStartSimulation: () => void;
}

export function HeroSection({ onStartSimulation }: HeroSectionProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-850">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/15 to-violet-600/10 blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-0 right-10 w-72 h-72 bg-emerald-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-6 shadow-inner shadow-cyan-950/50 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="tracking-wide uppercase font-semibold">VISUALISASI ALGORITMA</span>
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            <span className="text-slate-300">Studi Kasus Edukasi</span>
          </div>

          {/* Heading utama */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 tracking-tight leading-tight sm:leading-tight mb-4">
            Visualisasi Rekursif Menara Hanoi
          </h1>

          {/* Subheading */}
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 tracking-tight mb-5">
            Studi Kasus 14 Balok dengan 4 Tiang
          </h2>

          {/* Deskripsi */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Visualisasi interaktif algoritma rekursif Menara Hanoi untuk memindahkan 14 balok dari tiang asal menuju tiang tujuan dengan memanfaatkan lebih dari satu tiang bantuan.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => {
                scrollTo('simulasi');
                onStartSimulation();
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 ring-1 ring-white/20"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Mulai Simulasi</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={() => scrollTo('penjelasan')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-750 hover:border-slate-650 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Pelajari Rekursi</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {/* Stat 1 */}
          <div className="relative group p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all backdrop-blur-sm shadow-sm hover:shadow-cyan-500/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-medium mb-1">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Jumlah Balok</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">14</div>
            <p className="text-[11px] text-slate-500 mt-1">Konstan & Terurut (1..14)</p>
          </div>

          {/* Stat 2 */}
          <div className="relative group p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all backdrop-blur-sm shadow-sm hover:shadow-indigo-500/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-medium mb-1">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Jumlah Tiang</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">4</div>
            <p className="text-[11px] text-slate-500 mt-1">A (Asal), B, C, D (Tujuan)</p>
          </div>

          {/* Stat 3 */}
          <div className="relative group p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all backdrop-blur-sm shadow-sm hover:shadow-emerald-500/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-medium mb-1">
              <GitBranch className="w-4 h-4 text-emerald-400" />
              <span>Algoritma</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-emerald-400 tracking-tight leading-tight pt-1">
              Frame-Stewart
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Rekursi Multi-Peg</p>
          </div>

          {/* Stat 4 */}
          <div className="relative group p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all backdrop-blur-sm shadow-sm hover:shadow-amber-500/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-medium mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Jumlah Langkah</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-400 tracking-tight">113</div>
            <p className="text-[11px] text-slate-500 mt-1">
              Optimal vs <span className="line-through text-slate-600">16.383</span> (3 Tiang)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
