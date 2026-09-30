'use client';

import React from 'react';
import { Info, CornerDownRight } from 'lucide-react';

export function CaseStudyInfo() {
  return (
    <section className="py-10 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card Parameter Studi Kasus */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900/90 to-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Info className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Parameter Studi Kasus</h3>
              </div>

              <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                Studi kasus pembelajaran rekursi menggunakan konfigurasi multi-tiang yang menuntut efisiensi di atas algoritma konvensional.
              </p>

              <div className="space-y-2.5 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-850">
                  <span className="text-slate-400">Jumlah Balok</span>
                  <span className="font-semibold text-cyan-300">14 Balok (Fixed)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-850">
                  <span className="text-slate-400">Tiang Asal (Source)</span>
                  <span className="font-semibold text-blue-400">Tiang A</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-850">
                  <span className="text-slate-400">Tiang Tujuan (Dest)</span>
                  <span className="font-semibold text-purple-400">Tiang D</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-850">
                  <span className="text-slate-400">Tiang Bantuan (Aux)</span>
                  <span className="font-semibold text-amber-300">Tiang B & Tiang C</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-850">
                  <span className="text-slate-400">Metode</span>
                  <span className="font-semibold text-emerald-400">Rekursif Devide & Conquer</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-850">
                  <span className="text-slate-400">Algoritma</span>
                  <span className="font-semibold text-indigo-400">Frame-Stewart Algorithm</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Status Solver: Optimal</span>
              <span className="text-emerald-400 font-medium">Validasi Aturan: Aktif</span>
            </div>
          </div>

          {/* 3 Aturan Dasar Menara Hanoi */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Aturan 1 */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/90 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold mb-3">
                  1
                </div>
                <h4 className="text-base font-bold text-white mb-2">Satu per Satu</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Hanya <strong>satu balok</strong> yang dapat dipindahkan dalam setiap langkah dari puncak salah satu tiang.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-blue-300 flex items-center gap-1">
                <CornerDownRight className="w-3.5 h-3.5" />
                <span>Single-disk operation</span>
              </div>
            </div>

            {/* Aturan 2 */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/90 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold mb-3">
                  2
                </div>
                <h4 className="text-base font-bold text-white mb-2">Aturan Ukuran</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Balok yang <strong>lebih besar tidak boleh</strong> diletakkan di atas balok yang lebih kecil kapan pun.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-rose-300 flex items-center gap-1">
                <CornerDownRight className="w-3.5 h-3.5" />
                <span>Strict monotonic order</span>
              </div>
            </div>

            {/* Aturan 3 */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/90 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold mb-3">
                  3
                </div>
                <h4 className="text-base font-bold text-white mb-2">Fasilitas Transit</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Tiang <strong>B dan C</strong> bertindak sebagai tiang transit ganda, memotong eksponensial dari 16.383 ke 113 langkah.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 flex items-center gap-1">
                <CornerDownRight className="w-3.5 h-3.5" />
                <span>Dual auxiliary leverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
