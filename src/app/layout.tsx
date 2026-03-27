import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap",
  preload: false,
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
    <html lang="zh-TW" className={cn(notoSerifJP.variable, GeistSans.variable, GeistMono.variable)}>
      <body className="min-h-screen" style={{ background: "#fdfcfa", color: "#1a1a18" }}>
        <Navbar />
        <main className="mx-auto max-w-[1200px] px-4 md:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
