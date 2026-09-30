# Visualisasi Menara Hanoi

Studi kasus edukasi interaktif algoritma rekursif **Menara Hanoi 14 Balok dengan 4 Tiang** menggunakan algoritma optimal **Frame-Stewart**.

Website ini siap dijalankan secara lokal dan langsung di-deploy ke **Vercel** tanpa konfigurasi backend atau database.

---

## 📌 Ketentuan Studi Kasus

- **Jumlah Balok (Disks)**: 14 balok (terurut dari balok 1 terkecil hingga balok 14 terbesar).
- **Jumlah Tiang (Pegs)**: 4 tiang:
  - **A**: Tiang Asal (Source)
  - **B**: Tiang Transit 1 (Auxiliary 1)
  - **C**: Tiang Transit 2 (Auxiliary 2)
  - **D**: Tiang Tujuan (Destination)
- **Aturan Dasar**:
  1. Hanya satu balok yang boleh dipindahkan dalam satu langkah.
  2. Balok yang lebih besar tidak boleh diletakkan di atas balok yang lebih kecil kapan pun.
  3. Tiang B dan C digunakan sebagai tempat transit ganda.
- **Hasil Langkah**: Tepat **113 langkah** (dibandingkan 16.383 langkah pada 3 tiang klasik).

---

## 🧠 Algoritma & Rekurensi

### Menara Hanoi Tradisional (3 Tiang)
Formula rekurensi:
```text
H(n) = 2H(n - 1) + 1
Total langkah = 2^n - 1
Untuk n = 14: 2^14 - 1 = 16.383 langkah
```

### Frame-Stewart Multi-Peg (4 Tiang)
Formula rekurensi:
```text
T4(n) = min [ 2 × T4(k) + T3(n - k) ] untuk 1 <= k < n
dengan T3(m) = 2^m - 1
```

Untuk $n = 14$, pembagian optimal menghasilkan $k = 9$:
```text
T4(14) = 2 × T4(9) + T3(14 - 9)
       = 2 × 41 + (2^5 - 1)
       = 82 + 31
       = 113 Langkah
```
Efisiensi perpindahan meningkat sebesar **99.31%** lebih hemat langkah dibandingkan 3 tiang.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Efek Interaktif**: Canvas Confetti
- **Deploy Target**: Vercel (Pure Client-side, Zero Environment Variables)

---

## 🚀 Menjalankan Secara Lokal

1. **Clone repository atau masuk ke direktori**:
   ```bash
   git clone <repo-url>
   cd tugas
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:3000`.

4. **Production Build**:
   ```bash
   npm run build
   ```

5. **Linting Check**:
   ```bash
   npm run lint
   ```

---

## ☁️ Cara Deploy ke Vercel

Project ini dirancang *zero-config* untuk Vercel:

1. Buat repository baru di GitHub / GitLab.
2. Push seluruh source code ke repository tersebut:
   ```bash
   git init
   git add .
   git commit -m "feat: Menara Hanoi 14 Balok 4 Tiang Frame-Stewart"
   git branch -M main
   git remote add origin <URL_REPOSITORY_ANDA>
   git push -u origin main
   ```
3. Buka dashboard [Vercel](https://vercel.com).
4. Klik **Add New...** > **Project**.
5. Pilih repository GitHub Anda, lalu klik **Import**.
6. Framework preset akan terdeteksi otomatis sebagai **Next.js**.
7. Tidak memerlukan Environment Variables tambahan apa pun.
8. Klik **Deploy**. Website akan langsung online dalam hitungan detik!

---

## 📂 Struktur File

```text
├── app/
│   ├── globals.css              # Styling dasar Tailwind CSS
│   ├── layout.tsx               # Root layout, metadata & SEO
│   └── page.tsx                 # Orkestrator simulasi utama & state management
├── components/
│   ├── navbar.tsx               # Sticky header dengan shortcut navigasi
│   ├── footer.tsx               # Footer edukasi
│   └── hanoi/
│       ├── hero-section.tsx         # Hero banner & kartu statistik (14, 4, 113)
│       ├── case-study-info.tsx      # Info parameter studi kasus & 3 aturan dasar
│       ├── hanoi-visualizer.tsx     # Canvas visualisasi horizontal 4 tiang
│       ├── hanoi-peg.tsx            # Komponen tiang vertikal & base platform
│       ├── hanoi-disk.tsx           # Balok dengan gradien & label ukuran
│       ├── hanoi-controls.tsx       # Kontrol simulasi (Play, Step, Speed, Scrubber)
│       ├── current-move-card.tsx    # Kartu info langkah aktif / status selesai
│       ├── peg-state-display.tsx    # State array real-time Tiang A, B, C, D
│       ├── move-history.tsx         # Riwayat 113 langkah (Selesai/Aktif/Belum)
│       ├── call-stack-view.tsx      # Visualizer stack rekursi real-time
│       ├── recursive-explanation.tsx# Penjelasan rekursi & dekomposisi Frame-Stewart
│       ├── task1-python.tsx         # Tugas 1: Implementasi kode Python runnable
│       ├── task2-pseudocode.tsx     # Tugas 2: Pseudocode 3 & 4 tiang + anatomi
│       ├── task3-simulation-steps.tsx # Tugas 3: Pemetaan simulasi langkah otomatis
│       └── complexity-comparison.tsx # Analisis efisiensi & kompleksitas 3 vs 4 tiang
├── lib/
│   ├── hanoi.ts                 # Algoritma Frame-Stewart, rekursi, & precomputation
│   └── hanoi-validator.ts       # Validator aturan legalitas langkah Menara Hanoi
└── types/
    └── hanoi.ts                 # Interface TypeScript (Move, PegState, PegId, dll.)
```
