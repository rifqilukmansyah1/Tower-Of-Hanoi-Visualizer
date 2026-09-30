'use client';

import React, { useState } from 'react';
import { X, Code2, FileCode, BarChart3, ListOrdered, Copy, Check } from 'lucide-react';
import { PYTHON_SOURCE_CODE, PSEUDOCODE_3_PEGS, PSEUDOCODE_4_PEGS, DISK_PALETTES } from '@/lib/hanoi';
import { Move } from '@/types/hanoi';

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  moves: Move[];
}

export function TheoryModal({ isOpen, onClose, moves }: TheoryModalProps) {
  const [activeTab, setActiveTab] = useState<'python' | 'pseudocode' | 'moves' | 'kompleksitas'>('python');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Dokumentasi Studi Kasus Menara Hanoi</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                14 Balok • 4 Tiang • 113 Langkah
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Implementasi algoritma rekursif Frame-Stewart
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-slate-950 border-b border-slate-800 text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('python')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'python'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Python (Tugas 1)</span>
          </button>
          <button
            onClick={() => setActiveTab('pseudocode')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'pseudocode'
                ? 'bg-amber-950 text-amber-300 border border-amber-800 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Pseudocode (Tugas 2)</span>
          </button>
          <button
            onClick={() => setActiveTab('moves')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'moves'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Riwayat 113 Langkah</span>
          </button>
          <button
            onClick={() => setActiveTab('kompleksitas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'kompleksitas'
                ? 'bg-purple-950 text-purple-300 border border-purple-800 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Perbandingan 3 vs 4 Tiang</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700">
          {/* TAB 1: PYTHON */}
          {activeTab === 'python' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Source Code Python (Frame-Stewart)</h4>
                  <p className="text-xs text-slate-400">Menghasilkan tepat 113 langkah untuk 14 balok</p>
                </div>
                <button
                  onClick={() => handleCopy(PYTHON_SOURCE_CODE)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-750 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Python'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-[380px]">
                <pre><code>{PYTHON_SOURCE_CODE}</code></pre>
              </div>
            </div>
          )}

          {/* TAB 2: PSEUDOCODE */}
          {activeTab === 'pseudocode' && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-amber-400">Pseudocode 4 Tiang (Frame-Stewart)</h4>
                  <button
                    onClick={() => handleCopy(PSEUDOCODE_4_PEGS)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-750 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{copied ? 'Tersalin!' : 'Salin'}</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                  <pre><code>{PSEUDOCODE_4_PEGS}</code></pre>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-indigo-400 mb-2">Pseudocode 3 Tiang (Klasik)</h4>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                  <pre><code>{PSEUDOCODE_3_PEGS}</code></pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MOVES */}
          {activeTab === 'moves' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Daftar Lengkap 113 Langkah Perpindahan</h4>
                <span className="text-xs font-mono text-cyan-400">113 total steps</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 font-mono text-xs max-h-[380px] overflow-y-auto pr-2">
                {moves.map((m) => {
                  const palette = DISK_PALETTES[(m.disk - 1) % DISK_PALETTES.length];
                  return (
                    <div
                      key={m.step}
                      className="p-2 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-between"
                    >
                      <span className="text-slate-500 w-8">#{String(m.step).padStart(3, '0')}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white bg-gradient-to-r ${palette.gradient}`}>
                        Disk {m.disk}
                      </span>
                      <span className="font-bold text-slate-300">
                        {m.from} → {m.to}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: PERBANDINGAN */}
          {activeTab === 'kompleksitas' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Perbandingan Efisiensi: 3 Tiang vs 4 Tiang</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2.5 px-3">Parameter</th>
                      <th className="py-2.5 px-3 text-rose-400">3 Tiang (Klasik)</th>
                      <th className="py-2.5 px-3 text-emerald-400">4 Tiang (Frame-Stewart)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    <tr>
                      <td className="py-2 px-3 text-slate-300">Jumlah Balok</td>
                      <td className="py-2 px-3 text-slate-400">14</td>
                      <td className="py-2 px-3 text-white font-bold">14</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-300">Formula Langkah</td>
                      <td className="py-2 px-3 text-slate-400">2^n - 1</td>
                      <td className="py-2 px-3 text-cyan-300">min[2T4(k) + T3(n-k)]</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-300 font-bold">Total Langkah</td>
                      <td className="py-2 px-3 text-rose-400 line-through">16.383 langkah</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold text-sm">113 langkah</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-300">Efisiensi</td>
                      <td className="py-2 px-3 text-slate-400">Baseline</td>
                      <td className="py-2 px-3 text-emerald-300 font-bold">99.31% Lebih Hemat</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                Tersedianya dua tiang transit (Tiang B dan Tiang C) memungkinkan dekomposisi optimal pada \(k = 9\), sehingga hanya membutuhkan <strong>113 langkah</strong> dibandingkan 16.383 langkah pada 3 tiang klasik.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
