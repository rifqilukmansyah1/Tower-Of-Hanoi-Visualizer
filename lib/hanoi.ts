import type { PegId, PegState, Move } from '@/types/hanoi';
import { validateMove, validateAllMoves } from './hanoi-validator';

// Memoization cache for 4-peg Frame-Stewart minimum moves
const minMovesCache: Record<number, number> = {
  0: 0,
  1: 1,
};

const optimalKCache: Record<number, number> = {
  0: 0,
  1: 0,
};

/**
 * Classical 3-peg Hanoi minimum moves: T3(m) = 2^m - 1
 */
export function getMinMovesThreePegs(m: number): number {
  if (m <= 0) return 0;
  return Math.pow(2, m) - 1;
}

/**
 * Frame-Stewart recurrence for 4 pegs:
 * T4(n) = min { 2 * T4(k) + T3(n - k) } for 1 <= k < n
 */
export function getMinimumMovesFourPegs(n: number): number {
  if (n in minMovesCache) return minMovesCache[n];

  let minMoves = Infinity;
  let bestK = 1;

  for (let k = 1; k < n; k++) {
    const cost = 2 * getMinimumMovesFourPegs(k) + getMinMovesThreePegs(n - k);
    if (cost < minMoves) {
      minMoves = cost;
      bestK = k;
    }
  }

  minMovesCache[n] = minMoves;
  optimalKCache[n] = bestK;
  return minMoves;
}

/**
 * Returns optimal k split value for Frame-Stewart with n disks
 */
export function getOptimalSplit(n: number): number {
  if (n <= 1) return 0;
  if (!(n in optimalKCache)) {
    getMinimumMovesFourPegs(n);
  }
  return optimalKCache[n] || 1;
}

/**
 * Pre-populate memoization table up to n = 14
 */
for (let i = 1; i <= 14; i++) {
  getMinimumMovesFourPegs(i);
}

/**
 * Generates moves for 3-peg Hanoi
 */
function hanoi3Recursive(
  disks: number[],
  source: PegId,
  target: PegId,
  auxiliary: PegId,
  moves: Move[],
  activeStack: string[]
): void {
  const n = disks.length;
  if (n === 0) return;

  const currentCall = `Hanoi3(${n}, ${source}→${target}, aux=${auxiliary})`;
  const newStack = [...activeStack, currentCall];

  if (n === 1) {
    const disk = disks[0];
    moves.push({
      step: moves.length + 1,
      disk,
      from: source,
      to: target,
      callStack: newStack,
      depth: newStack.length,
      type: 'hanoi3',
    });
    return;
  }

  const topDisks = disks.slice(0, n - 1);
  const bottomDisk = [disks[n - 1]];

  // 1. Move top n-1 disks from source to auxiliary
  hanoi3Recursive(topDisks, source, auxiliary, target, moves, newStack);

  // 2. Move largest disk from source to target
  hanoi3Recursive(bottomDisk, source, target, auxiliary, moves, newStack);

  // 3. Move top n-1 disks from auxiliary to target
  hanoi3Recursive(topDisks, auxiliary, target, source, moves, newStack);
}

/**
 * Generates moves for 4-peg Frame-Stewart Hanoi
 */
function hanoi4Recursive(
  disks: number[],
  source: PegId,
  target: PegId,
  aux1: PegId,
  aux2: PegId,
  moves: Move[],
  activeStack: string[]
): void {
  const n = disks.length;
  if (n === 0) return;

  const currentCall = `Hanoi4(${n}, ${source}→${target}, aux=${aux1},${aux2})`;
  const newStack = [...activeStack, currentCall];

  if (n === 1) {
    const disk = disks[0];
    moves.push({
      step: moves.length + 1,
      disk,
      from: source,
      to: target,
      callStack: newStack,
      depth: newStack.length,
      type: 'hanoi4',
    });
    return;
  }

  const k = getOptimalSplit(n);
  const topDisks = disks.slice(0, k);
  const bottomDisks = disks.slice(k);

  // 1. Pindahkan k balok teratas dari source ke aux1 menggunakan 4 tiang
  hanoi4Recursive(topDisks, source, aux1, target, aux2, moves, newStack);

  // 2. Pindahkan n-k balok sisanya dari source ke target menggunakan 3 tiang (aux2 sebagai perantara)
  hanoi3Recursive(bottomDisks, source, target, aux2, moves, newStack);

  // 3. Pindahkan k balok teratas dari aux1 ke target menggunakan 4 tiang (source & aux2 sebagai perantara)
  hanoi4Recursive(topDisks, aux1, target, source, aux2, moves, newStack);
}

/**
 * Returns initial peg state for n disks
 */
export function getInitialPegState(n: number = 14): PegState {
  return {
    A: Array.from({ length: n }, (_, i) => n - i),
    B: [],
    C: [],
    D: [],
  };
}

/**
 * Generate all moves and compute snapshots for the entire simulation
 */
export function generateHanoiSimulation(n: number = 14): {
  moves: Move[];
  snapshots: PegState[];
} {
  const disks = Array.from({ length: n }, (_, i) => i + 1); // 1 = smallest, n = largest
  const moves: Move[] = [];
  const rootStack: string[] = [];

  // Generate recursive moves
  hanoi4Recursive(disks, 'A', 'D', 'B', 'C', moves, rootStack);

  // Generate snapshots step by step and validate
  const snapshots: PegState[] = [];
  const currentState: PegState = getInitialPegState(n);
  snapshots.push(clonePegState(currentState));

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    validateMove(move.from, move.to, move.disk, currentState);

    const popped = currentState[move.from].pop();
    if (popped !== undefined) {
      currentState[move.to].push(popped);
    }
    snapshots.push(clonePegState(currentState));
  }

  // Validate entire sequence
  const validation = validateAllMoves(moves, n);
  if (!validation.isValid) {
    throw new Error(`Simulation validation failed: ${validation.error}`);
  }

  return { moves, snapshots };
}

export function clonePegState(state: PegState): PegState {
  return {
    A: [...state.A],
    B: [...state.B],
    C: [...state.C],
    D: [...state.D],
  };
}

// Peg metadata
export const PEGS_INFO: Record<PegId, { name: string; role: string; description: string; color: string; ringColor: string }> = {
  A: {
    name: 'Tiang A',
    role: 'Asal (Source)',
    description: 'Tempat bertumpuknya 14 balok pada awal simulasi',
    color: 'from-blue-600 to-indigo-600',
    ringColor: 'ring-blue-500/50',
  },
  B: {
    name: 'Tiang B',
    role: 'Transit 1 (Auxiliary)',
    description: 'Tiang penampungan sementara pertama untuk dekomposisi k balok',
    color: 'from-amber-600 to-orange-600',
    ringColor: 'ring-amber-500/50',
  },
  C: {
    name: 'Tiang C',
    role: 'Transit 2 (Auxiliary)',
    description: 'Tiang penampungan sementara kedua yang membuat 4 tiang optimal',
    color: 'from-emerald-600 to-teal-600',
    ringColor: 'ring-emerald-500/50',
  },
  D: {
    name: 'Tiang D',
    role: 'Tujuan (Destination)',
    description: 'Tempat akhir seluruh 14 balok tersusun rapi dari terbesar ke terkecil',
    color: 'from-violet-600 to-purple-600',
    ringColor: 'ring-violet-500/50',
  },
};

// Disk color palette: 14 distinct vibrant gradients
export const DISK_PALETTES: { gradient: string; border: string; glow: string; text: string }[] = [
  { gradient: 'from-rose-500 to-pink-600', border: 'border-rose-300', glow: 'shadow-rose-500/50', text: 'text-rose-100' },      // Disk 1
  { gradient: 'from-orange-500 to-amber-600', border: 'border-orange-300', glow: 'shadow-orange-500/50', text: 'text-amber-100' }, // Disk 2
  { gradient: 'from-amber-400 to-yellow-500', border: 'border-amber-200', glow: 'shadow-amber-400/50', text: 'text-amber-950' }, // Disk 3
  { gradient: 'from-lime-500 to-emerald-600', border: 'border-lime-300', glow: 'shadow-lime-500/50', text: 'text-lime-100' },   // Disk 4
  { gradient: 'from-emerald-500 to-teal-600', border: 'border-emerald-300', glow: 'shadow-emerald-500/50', text: 'text-emerald-100' }, // Disk 5
  { gradient: 'from-teal-500 to-cyan-600', border: 'border-teal-300', glow: 'shadow-teal-500/50', text: 'text-teal-100' },       // Disk 6
  { gradient: 'from-cyan-500 to-sky-600', border: 'border-cyan-300', glow: 'shadow-cyan-500/50', text: 'text-cyan-100' },         // Disk 7
  { gradient: 'from-sky-500 to-blue-600', border: 'border-sky-300', glow: 'shadow-sky-500/50', text: 'text-sky-100' },           // Disk 8
  { gradient: 'from-blue-600 to-indigo-600', border: 'border-blue-300', glow: 'shadow-blue-500/50', text: 'text-blue-100' },     // Disk 9
  { gradient: 'from-indigo-500 to-violet-600', border: 'border-indigo-300', glow: 'shadow-indigo-500/50', text: 'text-indigo-100' }, // Disk 10
  { gradient: 'from-violet-500 to-purple-600', border: 'border-violet-300', glow: 'shadow-violet-500/50', text: 'text-violet-100' }, // Disk 11
  { gradient: 'from-purple-500 to-fuchsia-600', border: 'border-purple-300', glow: 'shadow-purple-500/50', text: 'text-purple-100' }, // Disk 12
  { gradient: 'from-fuchsia-500 to-pink-600', border: 'border-fuchsia-300', glow: 'shadow-fuchsia-500/50', text: 'text-fuchsia-100' }, // Disk 13
  { gradient: 'from-pink-600 to-rose-700', border: 'border-pink-300', glow: 'shadow-pink-600/50', text: 'text-pink-100' },       // Disk 14
];

export const PYTHON_SOURCE_CODE = `"""
Implementasi Algoritma Rekursif Frame-Stewart
Studi Kasus Menara Hanoi 14 Balok dengan 4 Tiang
"""

memo_4 = {0: 0, 1: 1}

def min_moves_4(n, memo=None):
    """Menghitung jumlah langkah minimum Frame-Stewart dengan memoization."""
    if memo is None:
        memo = memo_4
    if n in memo:
        return memo[n]
    
    best = float("inf")
    for k in range(1, n):
        cost = 2 * min_moves_4(k, memo) + ((2 ** (n - k)) - 1)
        if cost < best:
            best = cost
    memo[n] = best
    return best

def optimal_split(n, memo=None):
    """Mencari nilai k optimal yang meminimalkan total langkah."""
    if n <= 1:
        return 0
    if memo is None:
        memo = memo_4
        
    best_k = 1
    best_moves = float("inf")

    for k in range(1, n):
        four_peg_moves = 2 * min_moves_4(k, memo)
        three_peg_moves = (2 ** (n - k)) - 1
        total = four_peg_moves + three_peg_moves

        if total < best_moves:
            best_moves = total
            best_k = k

    return best_k

def hanoi3(disks, source, target, auxiliary, moves):
    """Algoritma rekursif Menara Hanoi standar 3 tiang."""
    n = len(disks)
    if n == 0:
        return
    if n == 1:
        moves.append((disks[0], source, target))
        return

    top_disks = disks[:-1]
    bottom_disk = [disks[-1]]

    # 1. Pindahkan n-1 balok teratas ke tiang bantuan
    hanoi3(top_disks, source, auxiliary, target, moves)
    # 2. Pindahkan 1 balok terbesar ke tiang tujuan
    hanoi3(bottom_disk, source, target, auxiliary, moves)
    # 3. Pindahkan n-1 balok dari tiang bantuan ke tiang tujuan
    hanoi3(top_disks, auxiliary, target, source, moves)

def hanoi4(disks, source, target, aux1, aux2, moves):
    """Algoritma rekursif Frame-Stewart Menara Hanoi 4 tiang."""
    n = len(disks)
    if n == 0:
        return
    if n == 1:
        moves.append((disks[0], source, target))
        return

    # Tentukan k pemotongan optimal
    k = optimal_split(n)
    top_disks = disks[:k]
    bottom_disks = disks[k:]

    # Langkah 1: Pindahkan k balok ke aux1 menggunakan 4 tiang
    hanoi4(top_disks, source, aux1, target, aux2, moves)

    # Langkah 2: Pindahkan n-k balok ke target menggunakan 3 tiang (aux2 sebagai bantuan)
    hanoi3(bottom_disks, source, target, aux2, moves)

    # Langkah 3: Pindahkan k balok dari aux1 ke target menggunakan 4 tiang
    hanoi4(top_disks, aux1, target, source, aux2, moves)

if __name__ == "__main__":
    n = 14
    # Balok terurut dari disk 1 (terkecil) hingga disk 14 (terbesar)
    initial_disks = list(range(1, n + 1))
    moves = []

    print(f"Memulai Menara Hanoi 4 Tiang untuk n={n} balok...")
    print(f"Optimal k untuk n={n}: k={optimal_split(n)}")
    
    hanoi4(
        initial_disks,
        "A",
        "D",
        "B",
        "C",
        moves
    )

    print("========================================")
    print("Jumlah perpindahan:", len(moves))
    print("========================================")

    for index, move in enumerate(moves, 1):
        disk, asal, tujuan = move
        print(f"{index:03d}. Pindahkan disk {disk:2d} dari {asal} ke {tujuan}")
`;

export const PSEUDOCODE_3_PEGS = `PROCEDURE Hanoi3(n, asal, tujuan, bantuan)
    // Base Case: Hanya tersisa 1 balok
    IF n == 1 THEN
        PRINT "Pindahkan disk dari ", asal, " ke ", tujuan
        RETURN
    END IF

    // Recursive Case:
    // 1. Pindahkan n-1 balok ke tiang bantuan
    Hanoi3(n - 1, asal, bantuan, tujuan)

    // 2. Pindahkan balok terbesar n ke tiang tujuan
    PRINT "Pindahkan disk ", n, " dari ", asal, " ke ", tujuan

    // 3. Pindahkan n-1 balok dari tiang bantuan ke tiang tujuan
    Hanoi3(n - 1, bantuan, tujuan, asal)
END PROCEDURE`;

export const PSEUDOCODE_4_PEGS = `PROCEDURE Hanoi4(n, asal, tujuan, bantuan1, bantuan2)
    // Base Case 0: Tidak ada balok
    IF n == 0 THEN
        RETURN
    END IF

    // Base Case 1: Hanya 1 balok
    IF n == 1 THEN
        PRINT "Pindahkan disk dari ", asal, " ke ", tujuan
        RETURN
    END IF

    // Recursive Case (Frame-Stewart):
    // Cari nilai pemecahan k optimal yang meminimalkan 2*T4(k) + T3(n-k)
    k ← CariPembagianOptimal(n)

    // Langkah 1: Pindahkan k balok teratas dari asal ke bantuan1 (4 tiang)
    Hanoi4(k, asal, bantuan1, tujuan, bantuan2)

    // Langkah 2: Pindahkan n-k balok sisanya dari asal ke tujuan (3 tiang)
    Hanoi3(n - k, asal, tujuan, bantuan2)

    // Langkah 3: Pindahkan k balok teratas dari bantuan1 ke tujuan (4 tiang)
    Hanoi4(k, bantuan1, tujuan, asal, bantuan2)
END PROCEDURE`;
