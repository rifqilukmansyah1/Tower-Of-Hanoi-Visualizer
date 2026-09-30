'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { generateHanoiSimulation } from '@/lib/hanoi';
import { PegId, Move, PegState } from '@/types/hanoi';
import { HanoiVisualizer } from '@/components/hanoi/hanoi-visualizer';
import { HanoiControls } from '@/components/hanoi/hanoi-controls';
import { TheoryModal } from '@/components/hanoi/theory-modal';
import { Layers, FileCode } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HanoiPage() {
  // Precompute 14 disks Frame-Stewart simulation once (memoized)
  const { moves, snapshots } = useMemo(() => generateHanoiSimulation(14), []);
  const totalSteps = moves.length; // 113

  // Core Simulation State
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.25x, 0.5x, 1x, 2x, 4x
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Active animation phase & moving disk info
  const [animatingDisk, setAnimatingDisk] = useState<number | null>(null);
  const [animatingSource, setAnimatingSource] = useState<PegId | null>(null);
  const [animatingTarget, setAnimatingTarget] = useState<PegId | null>(null);
  const [animPhase, setAnimPhase] = useState<'idle' | 'lifting' | 'traversing' | 'dropping'>('idle');

  // Modal open state for Python & Pseudocode
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Animation timeout refs for cleanup
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any scheduled timeouts safely
  const clearCurrentAnimation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setAnimatingDisk(null);
    setAnimatingSource(null);
    setAnimatingTarget(null);
    setAnimPhase('idle');
    setIsAnimating(false);
  }, []);

  // Current active move object
  const currentMove: Move | null = currentStep > 0 && currentStep <= totalSteps ? moves[currentStep - 1] : null;

  // Current peg state snapshot (O(1) lookup)
  const currentPegState: PegState = snapshots[currentStep] || snapshots[0];

  // Trigger celebration when completed
  useEffect(() => {
    if (currentStep === totalSteps && totalSteps > 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
        });
      } catch {
        // Fallback
      }
    }
  }, [currentStep, totalSteps]);

  // Single step forward execution with multi-stage animation
  const stepForward = useCallback(
    (targetStep?: number, onFinish?: () => void) => {
      const nextStepIndex = targetStep !== undefined ? targetStep : currentStep + 1;
      if (nextStepIndex > totalSteps) {
        setIsPlaying(false);
        return;
      }

      const move = moves[nextStepIndex - 1];
      if (!move) return;

      setIsAnimating(true);
      setAnimatingDisk(move.disk);
      setAnimatingSource(move.from);
      setAnimatingTarget(move.to);

      const baseDuration = Math.max(70, Math.round(360 / speed));
      const phaseDuration = Math.round(baseDuration / 3);

      // Phase 1: Lifting from source peg
      setAnimPhase('lifting');

      timeoutRef.current = setTimeout(() => {
        // Phase 2: Traversing across to target peg
        setAnimPhase('traversing');

        timeoutRef.current = setTimeout(() => {
          // Phase 3: Dropping into target peg
          setAnimPhase('dropping');

          timeoutRef.current = setTimeout(() => {
            // Animation complete: advance step, finalize state
            setCurrentStep(nextStepIndex);
            if (nextStepIndex >= totalSteps) {
              setIsPlaying(false);
            }
            setAnimatingDisk(null);
            setAnimatingSource(null);
            setAnimatingTarget(null);
            setAnimPhase('idle');
            setIsAnimating(false);

            if (onFinish) {
              onFinish();
            }
          }, phaseDuration);
        }, phaseDuration);
      }, phaseDuration);
    },
    [currentStep, totalSteps, moves, speed]
  );

  // Playback driver loop
  useEffect(() => {
    if (!isPlaying || currentStep >= totalSteps || isAnimating) {
      return;
    }

    const pauseDuration = Math.max(40, Math.round(180 / speed));
    const timer = setTimeout(() => {
      stepForward();
    }, pauseDuration);

    return () => clearTimeout(timer);
  }, [isPlaying, isAnimating, currentStep, totalSteps, speed, stepForward]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Controls Handlers
  const handlePlay = () => {
    if (currentStep >= totalSteps) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStep < totalSteps && !isAnimating) {
      stepForward();
    }
  };

  const handlePrevious = () => {
    setIsPlaying(false);
    clearCurrentAnimation();
    if (currentStep > 0) {
      setCurrentStep((prev) => Math.max(0, prev - 1));
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    clearCurrentAnimation();
    setCurrentStep(0);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const handleSeek = (step: number) => {
    setIsPlaying(false);
    clearCurrentAnimation();
    const clamped = Math.max(0, Math.min(totalSteps, step));
    setCurrentStep(clamped);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-3 sm:p-6 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <div className="w-full max-w-6xl space-y-4">
        {/* Sleek Minimal Header */}
        <div className="flex items-center justify-between px-2 sm:px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/30">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Visualisasi Rekursif Menara Hanoi
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 hidden sm:inline-flex">
                  14 Balok • 4 Tiang • Frame-Stewart
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Penyelesaian optimal: <strong className="text-cyan-400">113 Langkah</strong>
              </p>
            </div>
          </div>

          {/* Button to open Python & Pseudocode modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors shadow-sm"
          >
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Kode & Teori</span>
            <span className="sm:hidden">Info</span>
          </button>
        </div>

        {/* 1. Arena Visualisasi Horizontal 4 Tiang */}
        <HanoiVisualizer
          pegState={currentPegState}
          currentMove={currentMove}
          animatingDisk={animatingDisk}
          animatingSource={animatingSource}
          animatingTarget={animatingTarget}
          animPhase={animPhase}
        />

        {/* 2. Control Panel (Progress Slider, Buttons, Speed) */}
        <HanoiControls
          currentStep={currentStep}
          totalSteps={totalSteps}
          isPlaying={isPlaying}
          isAnimating={isAnimating}
          speed={speed}
          onPlay={handlePlay}
          onPause={handlePause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onReset={handleReset}
          onSpeedChange={handleSpeedChange}
          onSeek={handleSeek}
        />
      </div>

      {/* Modal Popup for Python, Pseudocode, and Details */}
      <TheoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        moves={moves}
      />
    </div>
  );
}
