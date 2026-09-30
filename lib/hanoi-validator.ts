import type { PegId, PegState, Move } from '@/types/hanoi';

/**
 * Validates a single move in accordance with Hanoi rules:
 * 1. The source peg must not be empty.
 * 2. The disk to be moved must be at the top of the source peg.
 * 3. The target peg must be empty, OR the disk must be smaller than the top disk of target.
 */
export function validateMove(from: PegId, to: PegId, disk: number, state: PegState): void {
  const sourcePeg = state[from];
  const targetPeg = state[to];

  if (!sourcePeg || sourcePeg.length === 0) {
    throw new Error(`Invalid Hanoi move: Tiang asal (${from}) kosong, tidak dapat memindahkan balok.`);
  }

  const topSourceDisk = sourcePeg[sourcePeg.length - 1];
  if (topSourceDisk !== disk) {
    throw new Error(
      `Invalid Hanoi move: Balok teratas pada tiang ${from} adalah balok ${topSourceDisk}, bukan balok ${disk}.`
    );
  }

  if (targetPeg.length > 0) {
    const topTargetDisk = targetPeg[targetPeg.length - 1];
    if (disk > topTargetDisk) {
      throw new Error(
        `Invalid Hanoi move: Pelanggaran aturan ukuran! Balok ${disk} lebih besar dari balok ${topTargetDisk} pada tiang ${to}.`
      );
    }
  }
}

/**
 * Replays and validates a sequence of moves from the standard initial state
 */
export function validateAllMoves(moves: Move[], totalDisks: number = 14): { isValid: boolean; error?: string } {
  // Initial state: A has disks totalDisks down to 1 (14 at bottom, 1 at top)
  const state: PegState = {
    A: Array.from({ length: totalDisks }, (_, i) => totalDisks - i),
    B: [],
    C: [],
    D: []
  };

  try {
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      validateMove(move.from, move.to, move.disk, state);

      // Execute move
      const movedDisk = state[move.from].pop();
      if (movedDisk !== undefined) {
        state[move.to].push(movedDisk);
      }
    }

    // Verify final state
    if (state.A.length !== 0 || state.B.length !== 0 || state.C.length !== 0) {
      return { isValid: false, error: 'Tiang non-tujuan tidak kosong pada akhir simulasi.' };
    }

    if (state.D.length !== totalDisks) {
      return { isValid: false, error: `Tiang tujuan tidak memuat semua ${totalDisks} balok.` };
    }

    for (let i = 0; i < totalDisks; i++) {
      if (state.D[i] !== totalDisks - i) {
        return { isValid: false, error: 'Urutan balok pada tiang D tidak teratur dari terbesar ke terkecil.' };
      }
    }

    return { isValid: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { isValid: false, error: errorMsg };
  }
}
