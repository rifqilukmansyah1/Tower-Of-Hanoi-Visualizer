'use client';

import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Gauge,
} from 'lucide-react';

interface HanoiControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  isAnimating: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onSeek: (step: number) => void;
}

export function HanoiControls({
  currentStep,
  totalSteps,
  isPlaying,
  isAnimating,
  speed,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onReset,
  onSpeedChange,
  onSeek,
}: HanoiControlsProps) {
  const speeds = [0.25, 0.5, 1, 2, 4];
  const progressPercent = totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      {/* Top row: Progress bar and step readout */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Progress Simulasi:</span>
            <span className="font-mono font-bold text-cyan-400 text-sm sm:text-base">
              Langkah {currentStep} <span className="text-slate-500">/</span> {totalSteps}
            </span>
          </div>
          <div className="font-mono font-bold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            {progressPercent}%
          </div>
        </div>

        {/* Progress track & scrubber */}
        <div className="relative w-full group">
          <input
            type="range"
            min={0}
            max={totalSteps}
            value={currentStep}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            style={{
              background: `linear-gradient(to right, rgb(6 182 212) 0%, rgb(59 130 246) ${progressPercent}%, rgb(15 23 42) ${progressPercent}%, rgb(15 23 42) 100%)`,
            }}
          />
        </div>
      </div>

      {/* Main control row */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
        {/* Buttons group */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Reset */}
          <button
            onClick={onReset}
            title="Reset ke Langkah 0"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Previous */}
          <button
            onClick={onPrevious}
            disabled={currentStep <= 0 || isAnimating}
            title="Mundur Satu Langkah"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 hover:text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-all active:scale-95"
          >
            <SkipBack className="w-4 h-4" />
            <span>Prev</span>
          </button>

          {/* Play / Pause Toggle */}
          {isPlaying ? (
            <button
              onClick={onPause}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/30 transition-all active:scale-95 ring-1 ring-amber-300/40"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={onPlay}
              disabled={currentStep >= totalSteps}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 transition-all active:scale-95 ring-1 ring-cyan-300/40"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{currentStep === 0 ? 'Mulai Play' : 'Lanjutkan'}</span>
            </button>
          )}

          {/* Next */}
          <button
            onClick={onNext}
            disabled={currentStep >= totalSteps || isAnimating}
            title="Maju Satu Langkah"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 hover:text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-all active:scale-95"
          >
            <span>Next</span>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Controller */}
        <div className="flex items-center gap-2 sm:gap-3 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-1.5 px-2 text-xs font-semibold text-slate-400">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Kecepatan:</span>
          </div>
          <div className="flex items-center gap-1">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => onSpeedChange(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  speed === s
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
