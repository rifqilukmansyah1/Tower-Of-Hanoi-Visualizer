'use client';

import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal } from 'lucide-react';
import { PYTHON_SOURCE_CODE } from '@/lib/hanoi';

export function Task1Python() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_SOURCE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="python" className="py-14 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>TUGAS 1</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Implementasi Python
            </h2>
            <p className="text-slate-300 text-base mt-2 max-w-2xl">
              Kode Python yang valid, runnable, dan deterministik untuk memindahkan 14 balok menggunakan algoritma rekursif Frame-Stewart 4 tiang tanpa hardcode move.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all active:scale-95 shadow-md"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Tersalin ke Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-cyan-400" />
                <span>Salin Kode Python</span>
              </>
            )}
          </button>
        </div>

        {/* Code Card */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="ml-3 font-mono font-bold text-slate-300">hanoi_frame_stewart.py</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-mono">
              <span>Python 3.8+</span>
              <span>•</span>
              <span className="text-emerald-400">Verified: 113 Moves</span>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-6 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed max-h-[540px] scrollbar-thin scrollbar-thumb-slate-700">
            <pre className="text-slate-300">
              <code>{PYTHON_SOURCE_CODE}</code>
            </pre>
          </div>

          {/* Expected Output footer */}
          <div className="p-5 bg-slate-900/60 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 mb-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Output Terminal:</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 font-mono text-xs text-slate-300 space-y-1">
              <div className="text-slate-500">Memulai Menara Hanoi 4 Tiang untuk n=14 balok...</div>
              <div className="text-slate-500">Optimal k untuk n=14: k=9</div>
              <div className="text-slate-500">========================================</div>
              <div className="font-bold text-emerald-400">Jumlah perpindahan: 113</div>
              <div className="text-slate-500">========================================</div>
              <div>001. Pindahkan disk  1 dari A ke B</div>
              <div>002. Pindahkan disk  2 dari A ke C</div>
              <div>...</div>
              <div>113. Pindahkan disk  1 dari B ke D</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
