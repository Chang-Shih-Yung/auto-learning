import { Construction } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "showcase",
};

export default function ShowcasePage() {
  return (
    <div className="py-16 md:py-24 max-w-[860px]">
      <h1
        className="text-2xl font-semibold text-[#1a1a18] mb-8"
        style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
      >
        showcase
      </h1>

      <div
        className="flex flex-col items-center justify-center py-20 rounded-xl text-center"
        style={{ background: "#f8f6f3", border: "1px solid rgba(26,26,24,0.06)" }}
      >
        <Construction className="h-8 w-8 text-[#9a9896] mb-4" />
        <h2
          className="text-base font-medium text-[#5a5856] mb-3"
          style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
        >
          這個區塊正在規劃中
        </h2>
        <p
          className="text-sm text-[#9a9896] max-w-xs leading-relaxed"
          style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif", lineHeight: 1.85 }}
        >
          目前正在思考：如何讓 Claude 不只整理文章，而是能迭代出可展示的成果。
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <h3
          className="text-sm font-medium text-[#5a5856]"
          style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
        >
          可能的方向：
        </h3>
        <ul
          className="space-y-2 text-sm text-[#9a9896]"
          style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif", lineHeight: 1.85 }}
        >
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#3d6b5e] flex-shrink-0" />
            把學習到的設計技巧實際套用在 UI 元件上
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#3d6b5e] flex-shrink-0" />
            把技術摘要轉化成可執行的 code snippet
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#3d6b5e] flex-shrink-0" />
            建立技術地圖，可視化自己的知識累積
          </li>
        </ul>
      </div>

      <p
        className="mt-10 text-sm text-[#9a9896] italic"
        style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
      >
        等想清楚了再來填這裡。
      </p>
    </div>
  );
}
