import { Construction } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "showcase",
};

export default function ShowcasePage() {
  return (
    <div className="py-16 md:py-24 max-w-215">
      <h1 className="font-serif text-2xl font-semibold text-foreground mb-8">
        showcase
      </h1>

      <div className="flex flex-col items-center justify-center py-20 rounded-xl text-center bg-muted border border-foreground/6">
        <Construction className="h-8 w-8 text-muted-foreground mb-4" />
        <h2 className="font-serif text-base font-medium text-text-2 mb-3">
          這個區塊正在規劃中
        </h2>
        <p className="font-serif text-sm text-muted-foreground max-w-xs leading-[1.85]">
          目前正在思考：如何讓 Claude 不只整理文章，而是能迭代出可展示的成果。
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <h3 className="font-serif text-sm font-medium text-text-2">
          可能的方向：
        </h3>
        <ul className="font-serif space-y-2 text-sm text-muted-foreground leading-[1.85]">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            <span>把學習到的設計技巧實際套用在 UI 元件上</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            <span>把技術摘要轉化成可執行的 code snippet</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            <span>建立技術地圖，可視化自己的知識累積</span>
          </li>
        </ul>
      </div>

      <p className="mt-10 font-serif text-sm text-muted-foreground italic">
        等想清楚了再來填這裡。
      </p>
    </div>
  );
}
