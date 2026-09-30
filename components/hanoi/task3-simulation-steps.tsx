'use client';

import React from 'react';
import { Move } from '@/types/hanoi';
import { Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DISK_PALETTES } from '@/lib/hanoi';

interface Task3SimulationStepsProps {
  moves: Move[];
}

export function Task3SimulationSteps({ moves }: Task3SimulationStepsProps) {
  // First 10 moves
  const first10 = moves.slice(0, 10);
  // Last 5 moves
  const last5 = moves.slice(moves.length - 5);

  return (
    <section id="penerapan" className="py-14 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>TUGAS 3</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Simulasi Penerapan Balok
          </h2>
          <p className="text-slate-300 text-base mt-2">
            Pemetaan status sistem dari kondisi awal, target perpindahan, kondisi akhir, serta cuplikan langkah yang digenerate langsung oleh algoritma Frame-Stewart.
          </p>
        </div>

        {/* State Awal, Target, State Akhir Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Kondisi Awal */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-blue-500/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <h4 className="font-bold text-white text-base">Kondisi Awal (Initial State)</h4>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                  <span className="text-blue-400 font-bold block mb-1">Tiang A (14 Balok):</span>
                  <span className="text-slate-400">[14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-slate-500">
                  <span>Tiang B: [ ] (Kosong)</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-slate-500">
                  <span>Tiang C: [ ] (Kosong)</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-slate-500">
                  <span>Tiang D: [ ] (Kosong)</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              Semua balok terurut di Tiang A
            </div>
          </div>

          {/* Target */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <h4 className="font-bold text-white text-base">Target Perpindahan</h4>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 flex items-center justify-center gap-3 my-4">
                <span className="px-3 py-1.5 rounded-xl bg-blue-950 border border-blue-800 text-blue-300 font-mono font-bold text-sm">
                  Tiang A (Asal)
                </span>
                <ArrowRight className="w-5 h-5 text-amber-400" />
                <span className="px-3 py-1.5 rounded-xl bg-purple-950 border border-purple-800 text-purple-300 font-mono font-bold text-sm">
                  Tiang D (Tujuan)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Memindahkan seluruh tumpukan 14 balok secara rekursif dengan memanfaatkan Tiang B dan Tiang C sebagai transit ganda tanpa melanggar aturan ukuran.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 font-mono">
              Target Langkah: 113 Langkah
            </div>
          </div>

          {/* Kondisi Akhir */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-white text-base">Kondisi Akhir (Goal State)</h4>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-slate-500">
                  <span>Tiang A: [ ] (Kosong)</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-slate-500">
                  <span>Tiang B: [ ] (Kosong)</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-slate-500">
                  <span>Tiang C: [ ] (Kosong)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                  <span className="text-purple-400 font-bold block mb-1">Tiang D (14 Balok):</span>
                  <span className="text-emerald-400">[14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400">
              Validasi aturan: 100% legal
            </div>
          </div>
        </div>

        {/* Cuplikan Langkah Otomatis Algoritma */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">
                Daftar Urutan Langkah Algoritma (Hasil Dynamic Solver)
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Data diperoleh langsung dari pemanggilan rekursif Frame-Stewart (10 langkah awal & 5 langkah akhir).
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 text-cyan-400 border border-slate-800">
              Langkah 1..113
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 10 Langkah Pertama */}
            <div>
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">
                10 Langkah Awal:
              </div>
              <div className="space-y-2">
                {first10.map((move) => {
                  const palette = DISK_PALETTES[(move.disk - 1) % DISK_PALETTES.length];
                  return (
                    <div
                      key={move.step}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-xs font-mono"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 w-7">#{String(move.step).padStart(3, '0')}</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold text-white bg-gradient-to-r ${palette.gradient}`}>
                          Disk {move.disk}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Tiang {move.from}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-white font-bold">Tiang {move.to}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider & 5 Langkah Terakhir */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Visual Break / Divider */}
                <div className="py-4 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-dashed border-slate-700 text-slate-400 text-xs font-mono">
                    <span>... {moves.length - 15} langkah intermediate dijalankan secara rekursif ...</span>
                  </div>
                </div>

                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3 mt-2">
                  5 Langkah Terakhir (Penyelesaian):
                </div>
                <div className="space-y-2">
                  {last5.map((move) => {
                    const palette = DISK_PALETTES[(move.disk - 1) % DISK_PALETTES.length];
                    return (
                      <div
                        key={move.step}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-xs font-mono"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 w-7">#{String(move.step).padStart(3, '0')}</span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold text-white bg-gradient-to-r ${palette.gradient}`}>
                            Disk {move.disk}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">Tiang {move.from}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300 font-bold">Tiang {move.to}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-slate-300">
                Semua 113 baris perpindahan dapat dieksplorasi secara interaktif melalui panel <strong>Riwayat Perpindahan</strong> di bagian atas.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
