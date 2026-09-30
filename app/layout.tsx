import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visualisasi Rekursif Menara Hanoi | Studi Kasus 14 Balok 4 Tiang",
  description:
    "Visualisasi interaktif algoritma rekursif Menara Hanoi untuk memindahkan 14 balok dari tiang asal menuju tiang tujuan dengan memanfaatkan lebih dari satu tiang bantuan.",
  keywords: [
    "Menara Hanoi",
    "Tower of Hanoi",
    "Frame-Stewart Algorithm",
    "Rekursif",
    "Algoritma dan Pemrograman",
    "Computer Science",
    "Next.js",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
