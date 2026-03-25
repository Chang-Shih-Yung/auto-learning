import type { Metadata } from "next";
import { Noto_Serif_JP, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap",
  preload: false,
});

const sourcCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Henry's Learning Hub",
    template: "%s | Henry's Learning Hub",
  },
  description: "用 Claude Code 驅動的自我學習系統，每天自動整理最新技術動態",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${notoSerifJP.variable} ${sourcCodePro.variable}`}>
      <body className="min-h-screen" style={{ background: "#fdfcfa", color: "#1a1a18" }}>
        <Navbar />
        <main className="mx-auto max-w-[1200px] px-4 md:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
