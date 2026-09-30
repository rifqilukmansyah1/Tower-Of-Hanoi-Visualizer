'use client';

import React from 'react';
import { DISK_PALETTES } from '@/lib/hanoi';

interface HanoiDiskProps {
  disk: number;
  totalDisks?: number;
  isMoving?: boolean;
  isTop?: boolean;
  highlight?: boolean;
}

export function HanoiDisk({
  disk,
  totalDisks = 14,
  isMoving = false,
  isTop = false,
  highlight = false,
}: HanoiDiskProps) {
  // Disk 1 is smallest, 14 is largest
  // Width from 32% to 96%
  const minWidth = 28;
  const maxWidth = 96;
  const widthPercent = totalDisks > 1
    ? minWidth + ((disk - 1) / (totalDisks - 1)) * (maxWidth - minWidth)
    : 60;

  const paletteIndex = (disk - 1) % DISK_PALETTES.length;
  const palette = DISK_PALETTES[paletteIndex];

  return (
    <div
      style={{ width: `${widthPercent}%` }}
      className={`relative h-5 sm:h-6 rounded-md bg-gradient-to-r ${palette.gradient} flex items-center justify-center font-bold text-xs sm:text-xs select-none shadow-md transition-all duration-200 border ${palette.border} ${
        isMoving
          ? `scale-105 ring-2 ring-white shadow-xl ${palette.glow} z-30 opacity-95`
          : highlight
          ? `ring-2 ring-cyan-300 ${palette.glow}`
          : 'opacity-100 hover:brightness-110'
      }`}
    >
      {/* Light sheen reflection on top of disk */}
      <div className="absolute top-0 left-2 right-2 h-1 bg-white/30 rounded-t-full pointer-events-none" />

      {/* Disk label */}
      <span className={`drop-shadow-md tracking-wider ${palette.text} font-mono font-extrabold text-[11px] sm:text-xs`}>
        {disk}
      </span>

      {/* Tiny indicators if top */}
      {isTop && !isMoving && (
        <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75" />
      )}
    </div>
  );
}
