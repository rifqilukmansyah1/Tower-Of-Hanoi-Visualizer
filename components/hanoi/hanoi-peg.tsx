'use client';

import React from 'react';
import { PegId } from '@/types/hanoi';
import { PEGS_INFO } from '@/lib/hanoi';
import { HanoiDisk } from './hanoi-disk';

interface HanoiPegProps {
  id: PegId;
  disks: number[]; // stack: index 0 is bottom (largest), last is top (smallest)
  isActiveSource?: boolean;
  isActiveTarget?: boolean;
  animatingDisk?: number | null;
  totalDisks?: number;
}

export function HanoiPeg({
  id,
  disks,
  isActiveSource = false,
  isActiveTarget = false,
  animatingDisk = null,
  totalDisks = 14,
}: HanoiPegProps) {
  const info = PEGS_INFO[id];

  // If a disk is in the process of moving from this peg, it may be rendered floating
  // So during lifting/traversing, we don't render it in the static stack if it's currently being animated
  const displayDisks = disks;

  return (
    <div
      className={`relative flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-300 ${
        isActiveSource
          ? 'bg-rose-950/20 ring-1 ring-rose-500/40 shadow-lg shadow-rose-950/30'
          : isActiveTarget
          ? 'bg-emerald-950/20 ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-950/30'
          : 'bg-slate-900/40 border border-slate-800/80 hover:border-slate-750'
      }`}
    >
      {/* Peg Header Info */}
      <div className="w-full flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm text-white bg-gradient-to-br ${
              info.color
            } shadow-sm ${isActiveSource ? 'ring-2 ring-rose-400 animate-pulse' : isActiveTarget ? 'ring-2 ring-emerald-400 animate-pulse' : ''}`}
          >
            {id}
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white tracking-tight leading-none">
              {info.name}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-400 leading-tight mt-0.5">
              {info.role}
            </div>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
          {displayDisks.length} balok
        </div>
      </div>

      {/* Peg Rod and Stack Area */}
      <div className="relative w-full h-[360px] sm:h-[390px] flex flex-col justify-end items-center px-1">
        {/* Vertical Peg Rod */}
        <div
          className={`absolute bottom-3 top-2 w-2.5 sm:w-3 rounded-full transition-colors duration-300 ${
            isActiveSource
              ? 'bg-gradient-to-b from-rose-400 via-rose-500 to-rose-700 shadow-md shadow-rose-500/30'
              : isActiveTarget
              ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-700 shadow-md shadow-emerald-500/30'
              : 'bg-gradient-to-b from-slate-400 via-slate-600 to-slate-750'
          }`}
        >
          {/* Peg top cap */}
          <div className="w-3.5 h-3.5 -left-0.5 sm:-left-0.5 -top-1 absolute rounded-full bg-slate-300 border border-slate-500 shadow-sm" />
        </div>

        {/* Stack of Disks (from bottom to top) */}
        <div className="w-full flex flex-col-reverse items-center gap-1 z-10 pb-3">
          {displayDisks.map((diskNum, index) => {
            const isTop = index === displayDisks.length - 1;
            const isBeingAnimated = animatingDisk === diskNum;

            return (
              <HanoiDisk
                key={diskNum}
                disk={diskNum}
                totalDisks={totalDisks}
                isMoving={isBeingAnimated}
                isTop={isTop}
                highlight={isActiveSource && isTop}
              />
            );
          })}
        </div>

        {/* Horizontal Peg Base */}
        <div
          className={`w-full h-3 sm:h-3.5 rounded-lg border transition-colors shadow-md ${
            isActiveSource
              ? 'bg-rose-900/60 border-rose-500/50 shadow-rose-950/40'
              : isActiveTarget
              ? 'bg-emerald-900/60 border-emerald-500/50 shadow-emerald-950/40'
              : 'bg-slate-800 border-slate-700 shadow-slate-950'
          }`}
        />
      </div>

      {/* Status indicator on bottom */}
      <div className="mt-2 text-center h-4">
        {isActiveSource && (
          <span className="text-[11px] font-semibold text-rose-400 animate-pulse tracking-wide uppercase">
            ▲ Sumber Balok
          </span>
        )}
        {isActiveTarget && (
          <span className="text-[11px] font-semibold text-emerald-400 animate-pulse tracking-wide uppercase">
            ▼ Target Tujuan
          </span>
        )}
      </div>
    </div>
  );
}
