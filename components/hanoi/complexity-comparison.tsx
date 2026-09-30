'use client';

import React from 'react';
import { BarChart3, TrendingDown, Zap } from 'lucide-react';
import { getMinMovesThreePegs, getMinimumMovesFourPegs } from '@/lib/hanoi';

export function ComplexityComparison() {
  const n = 14;
  const moves3Pegs = getMinMovesThreePegs(n); // 16383
  const moves4Pegs = getMinimumMovesFourPegs(n); // 113

  // Calculated dynamically
  const reductionPercentage = (((moves3Pegs - moves4Pegs) / moves3Pegs) * 100).toFixed(2);
  const efficiencyRatio = Math.round(moves3Pegs / moves4Pegs);

  return (
    <section id="perbandingan" className="py-14 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>ANALISIS KOMPLEKSITAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Perbandingan Efisiensi: 3 Tiang vs 4 Tiang
          </h2>
          <p className="text-slate-300 text-base mt-2">
            Perbandingan analitik antara algoritma rekursif Menara Hanoi standar 3 tiang dengan optimasi Frame-Stewart pada 4 tiang untuk 14 balok.
          </p>
        </div>

        {/* Big Highlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">
          {/* Ratio Highlight */}
          <div className="lg:col-span-4 bg-gradient-to-br from-indigo-950/90 via-slate-900 to-purple-950/70 p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span>Efisiensi Perpindahan</span>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 mt-2">
                {reductionPercentage}%
              </div>
              <div className="text-sm text-slate-300 mt-2 font-medium">
                Pengurangan total langkah perpindahan
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-indigo-900/60">
              <div className="text-xs text-slate-400">Rasio Kecepatan:</div>
              <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {efficiencyRatio}x Lebih Cepat
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Dari 16.383 langkah dipangkas hanya menjadi 113 langkah optimal.
              </p>
            </div>
          </div>

          {/* Table Comparison Card */}
          <div className="lg:col-span-8 bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl overflow-x-auto">
            <h4 className="text-base font-bold text-white mb-4">
              Tabel Matriks Perbandingan Parameter
            </h4>

            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-3 font-semibold font-sans">Parameter</th>
                  <th className="py-3 px-3 font-semibold text-rose-400 font-sans">3 Tiang (Klasik)</th>
                  <th className="py-3 px-3 font-semibold text-emerald-400 font-sans">4 Tiang (Frame-Stewart)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                <tr>
                  <td className="py-3 px-3 text-slate-300 font-sans font-medium">Jumlah Balok (n)</td>
                  <td className="py-3 px-3 text-slate-300">14</td>
                  <td className="py-3 px-3 text-white font-bold">14</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-slate-300 font-sans font-medium">Jumlah Tiang</td>
                  <td className="py-3 px-3 text-slate-300">3 (A, B, C)</td>
                  <td className="py-3 px-3 text-cyan-300 font-bold">4 (A, B, C, D)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-slate-300 font-sans font-medium">Nama Algoritma</td>
                  <td className="py-3 px-3 text-slate-300 font-sans">Hanoi Klasik</td>
                  <td className="py-3 px-3 text-emerald-400 font-sans font-bold">Frame-Stewart</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-slate-300 font-sans font-medium">Metode Eksekusi</td>
                  <td className="py-3 px-3 text-slate-300 font-sans">Rekursif</td>
                  <td className="py-3 px-3 text-slate-300 font-sans">Rekursif Devide & Conquer</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-slate-300 font-sans font-medium">Formula Recurrence</td>
                  <td className="py-3 px-3 text-slate-400">H(n) = 2H(n-1) + 1</td>
                  <td className="py-3 px-3 text-cyan-400">T4(n) = min[2T4(k) + T3(n-k)]</td>
                </tr>
                <tr className="bg-slate-950/60 font-bold">
                  <td className="py-3 px-3 text-white font-sans font-semibold">Total Perpindahan</td>
                  <td className="py-3 px-3 text-rose-400 line-through">
                    {moves3Pegs.toLocaleString('id-ID')} langkah
                  </td>
                  <td className="py-3 px-3 text-emerald-400 text-base">
                    {moves4Pegs} langkah
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-slate-300 font-sans font-medium">Time Complexity</td>
                  <td className="py-3 px-3 text-slate-400">O(2^n)</td>
                  <td className="py-3 px-3 text-indigo-300">O(2^√(2n)) (asymptotic)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-slate-300 font-sans font-medium">Space Complexity</td>
                  <td className="py-3 px-3 text-slate-400">O(n) call stack</td>
                  <td className="py-3 px-3 text-indigo-300">O(n) call stack</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Narrative Insight */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 leading-relaxed space-y-3">
          <h5 className="font-bold text-white text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Mengapa 4 Tiang Jauh Lebih Efisien?
          </h5>
          <p>
            Pada Menara Hanoi tradisional 3 tiang, untuk memindahkan balok ke-14, seluruh 13 balok di atasnya harus terkumpul pada <strong>satu-satunya tiang bantuan</strong>. Akibatnya, setiap pertambahan balok melipatgandakan jumlah langkah secara eksponensial murni (<code className="text-cyan-300 font-mono">2^n - 1</code>).
          </p>
          <p>
            Dengan tersedianya <strong>4 tiang</strong>, algoritma Frame-Stewart memiliki dua tiang transit (Tiang B dan Tiang C). Hal ini memungkinkan balok-balok atas dipecah dan didistribusikan ke kedua tiang transit tanpa saling menumpuk secara terlarang. Dekomposisi optimal pada <code className="text-cyan-300 font-mono">k = 9</code> memangkas beban rekursif dari 16.383 langkah menjadi hanya <strong>113 langkah</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
