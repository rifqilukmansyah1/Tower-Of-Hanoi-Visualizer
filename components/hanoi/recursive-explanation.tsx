'use client';

import React from 'react';
import { BookOpen, GitFork } from 'lucide-react';

export function RecursiveExplanation() {
  return (
    <section id="penjelasan" className="py-14 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>KONSEP FUNDAMENTAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Bagaimana Rekursi Bekerja?
          </h2>
          <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-3">
            Mengapa Disebut Rekursif?
          </h3>
          <p className="text-slate-300 text-base leading-relaxed">
            Sebuah fungsi disebut <strong>rekursif</strong> ketika fungsi tersebut memanggil dirinya sendiri secara berulang untuk menyelesaikan versi permasalahan yang berukuran lebih kecil, hingga mencapai kondisi dasar yang dapat diselesaikan langsung tanpa pemanggilan lebih lanjut.
          </p>
        </div>

        {/* 2 Core Concepts: Base Case vs Recursive Case */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Base Case */}
          <div className="bg-slate-900/80 border border-emerald-500/30 p-6 rounded-2xl relative overflow-hidden shadow-lg shadow-emerald-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <h4 className="text-lg font-bold text-white">Base Case (Kondisi Berhenti)</h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Kondisi mutlak di mana rekursi <strong>berhenti</strong> memanggil dirinya sendiri. Tanpa base case, fungsi akan mengalami <em>infinite recursion</em> (stack overflow).
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300">
              <code>IF n == 1 THEN: Pindahkan langsung dari Asal ke Tujuan</code>
            </div>
          </div>

          {/* Recursive Case */}
          <div className="bg-slate-900/80 border border-indigo-500/30 p-6 rounded-2xl relative overflow-hidden shadow-lg shadow-indigo-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-3 h-3 rounded-full bg-indigo-400" />
              <h4 className="text-lg font-bold text-white">Recursive Case (Kasus Rekursif)</h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Kondisi di mana masalah besar dipecah menjadi sub-masalah identik berukuran lebih kecil (<span className="text-cyan-400 font-mono">k</span> dan <span className="text-cyan-400 font-mono">n - k</span>), lalu memanggil fungsi dirinya sendiri.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300">
              <code>Hanoi4(k, Asal → Transit) + Hanoi3(n-k) + Hanoi4(k, Transit → Tujuan)</code>
            </div>
          </div>
        </div>

        {/* Frame-Stewart Decomposition Breakdown */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2.5 mb-6">
            <GitFork className="w-5 h-5 text-cyan-400" />
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Dekomposisi Frame-Stewart untuk 14 Balok (Optimal k = 9)
            </h4>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Algoritma Frame-Stewart menguji setiap kemungkinan nilai pembagian <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded font-mono">k</code> dari 1 hingga 13 untuk mencari jumlah langkah paling minimal:
          </p>

          {/* Recurrence Formula Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 font-mono text-xs sm:text-sm text-cyan-200 mb-8 overflow-x-auto shadow-inner">
            <div className="text-slate-400 text-xs mb-1">{'// Rumus Rekurensi Frame-Stewart (4 Tiang)'}</div>
            <div className="font-bold text-cyan-300">
              T4(n) = min [ 2 × T4(k) + T3(n - k) ] untuk 1 ≤ k &lt; n
            </div>
            <div className="text-slate-400 mt-2 text-xs">{'// Substitusi untuk n = 14 (k optimal ditemukan = 9):'}</div>
            <div className="text-emerald-400 font-bold">
              T4(14) = 2 × T4(9) + T3(14 - 9) = 2 × 41 + (2^5 - 1) = 82 + 31 = 113 Langkah!
            </div>
          </div>

          {/* Step by Step Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-bold font-mono flex items-center justify-center text-xs">
                    01
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold">4 Tiang (k = 9)</span>
                </div>
                <h5 className="font-bold text-white text-sm mb-2">Hanoi4(9, A → B)</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pindahkan <strong>9 balok teratas</strong> (balok 1 s.d. 9) dari Tiang Asal (A) ke Tiang Bantuan (B) memanfaatkan seluruh 4 tiang.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-850 text-[11px] font-mono text-slate-500">
                Membutuhkan: <strong>41 langkah</strong>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold font-mono flex items-center justify-center text-xs">
                    02
                  </span>
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">3 Tiang (n - k = 5)</span>
                </div>
                <h5 className="font-bold text-white text-sm mb-2">Hanoi3(5, A → D)</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pindahkan <strong>5 balok terbesar</strong> (balok 10 s.d. 14) dari A langsung ke D. Tiang B tidak boleh disentuh karena menampung balok yang lebih kecil.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-850 text-[11px] font-mono text-slate-500">
                Membutuhkan: <strong>31 langkah</strong> (2^5 - 1)
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 font-bold font-mono flex items-center justify-center text-xs">
                    03
                  </span>
                  <span className="text-[11px] font-mono text-purple-400 font-semibold">4 Tiang (k = 9)</span>
                </div>
                <h5 className="font-bold text-white text-sm mb-2">Hanoi4(9, B → D)</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pindahkan kembali <strong>9 balok teratas</strong> dari Tiang B ke Tiang D di atas 5 balok terbesar dengan memanfaatkan kembali seluruh 4 tiang.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-850 text-[11px] font-mono text-slate-500">
                Membutuhkan: <strong>41 langkah</strong>
              </div>
            </div>
          </div>

          {/* Sum Summary */}
          <div className="mt-6 p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-center justify-between text-xs sm:text-sm font-mono">
            <span className="text-slate-300">Total Perpindahan Keseluruhan:</span>
            <span className="font-bold text-cyan-300">
              41 + 31 + 41 = <span className="text-emerald-400 text-base">113 Langkah</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
