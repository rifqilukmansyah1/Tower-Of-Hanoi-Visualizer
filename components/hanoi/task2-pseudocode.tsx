'use client';

import React, { useState } from 'react';
import { FileCode, Copy, Check } from 'lucide-react';
import { PSEUDOCODE_3_PEGS, PSEUDOCODE_4_PEGS } from '@/lib/hanoi';

export function Task2Pseudocode() {
  const [activeTab, setActiveTab] = useState<'4pegs' | '3pegs'>('4pegs');
  const [copied, setCopied] = useState(false);

  const activeCode = activeTab === '4pegs' ? PSEUDOCODE_4_PEGS : PSEUDOCODE_3_PEGS;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="pseudocode" className="py-14 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <FileCode className="w-3.5 h-3.5" />
              <span>TUGAS 2</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pseudocode Algoritma Rekursif
            </h2>
            <p className="text-slate-300 text-base mt-2 max-w-2xl">
              Perbandingan struktur algoritma rekursif standar 3 tiang dengan ekspansi multi-tiang Frame-Stewart 4 tiang.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setActiveTab('4pegs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === '4pegs'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                4 Tiang (Frame-Stewart)
              </button>
              <button
                onClick={() => setActiveTab('3pegs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === '3pegs'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3 Tiang (Klasik)
              </button>
            </div>

            {/* Copy */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all active:scale-95 shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Salin Pseudocode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pseudocode Box */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden mb-8">
          <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 text-xs">
            <span className="font-mono font-bold text-slate-300">
              {activeTab === '4pegs' ? 'FrameStewart_Hanoi4.algo' : 'Classic_Hanoi3.algo'}
            </span>
            <span className="text-cyan-400 font-mono text-[11px]">Pseudocode Standard Notation</span>
          </div>

          <div className="p-6 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed max-h-[480px] scrollbar-thin scrollbar-thumb-slate-700">
            <pre className="text-slate-300">
              <code>{activeCode}</code>
            </pre>
          </div>
        </div>

        {/* Anatomi & Penjelasan Pseudocode */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400">1. Base Case</span>
            <p className="text-xs text-slate-300 mt-2">
              Kondisi <code className="text-cyan-300">n == 1</code> memindahkan balok tunggal langsung tanpa pemanggilan rekursif lebih lanjut.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400">2. Cari k Optimal</span>
            <p className="text-xs text-slate-300 mt-2">
              Menghitung pemecahan <code className="text-cyan-300">k</code> terbaik (untuk n=14 menghasilkan k=9) guna meminimalkan total langkah.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-blue-400">3. Menuju Transit</span>
            <p className="text-xs text-slate-300 mt-2">
              Memindahkan k balok teratas ke tiang transit pertama (<code className="text-cyan-300">bantuan1</code>) menggunakan seluruh 4 tiang.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-amber-400">4. Kelompok Utama</span>
            <p className="text-xs text-slate-300 mt-2">
              Memindahkan sisa n-k balok terbesar langsung ke tiang tujuan menggunakan Hanoi 3 tiang standar.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-purple-400">5. Penggabungan</span>
            <p className="text-xs text-slate-300 mt-2">
              Memindahkan kembali k balok dari transit ke tiang tujuan di atas kelompok balok terbesar menggunakan 4 tiang.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
