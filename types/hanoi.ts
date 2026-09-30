export type PegId = 'A' | 'B' | 'C' | 'D';

export interface Move {
  step: number;
  disk: number;
  from: PegId;
  to: PegId;
  callStack?: string[];
  depth?: number;
  type?: 'hanoi4' | 'hanoi3';
}

export interface PegState {
  A: number[];
  B: number[];
  C: number[];
  D: number[];
}

export interface PegInfo {
  id: PegId;
  name: string;
  role: string;
  type: 'source' | 'auxiliary' | 'destination';
  description: string;
}

export interface SimulationState {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  isCompleted: boolean;
  animatingDisk: number | null;
  animatingSource: PegId | null;
  animatingTarget: PegId | null;
  animPhase: 'idle' | 'lifting' | 'traversing' | 'dropping';
}
