---
title: "Pretext — 繞過 DOM、純數學算出文字排版的 JavaScript 函式庫"
date: 2026-03-29
url: https://github.com/chenglou/pretext
note: "純 JS/TS 文字排版函式庫，完全不碰 DOM，layout() 耗時 0.09ms/500段落，比 offsetHeight 快約 500 倍，支援 Canvas/SVG/WebGL/SSR 輸出"
---

用 Pretext 的 `prepare()` + `layout()` 兩步 API，可以在完全不碰 DOM 的情況下精準計算出任意段落在指定寬度下的高度——500 段文字的 layout 計算耗時僅 **0.09ms**，比傳統 `offsetHeight` 快約 500 倍；`prepare()` 的一次性分析成本也只有 19ms。不只是純英文，中文、阿拉伯文、Emoji、混排雙向文字全部支援；進階模式可以拿到每一行的精確座標資訊，直接輸出到 Canvas、SVG、WebGL，或在伺服器端做排版預算，讓文字繞圖流動、多欄分布、適配任意形狀等雜誌級排版效果成為可能。

傳統 Web 排版的效能殺手在於「layout reflow」——每次問 DOM「這段文字多高」，瀏覽器就必須重新跑整套盒模型計算，`getBoundingClientRect`、`offsetHeight` 這類操作是公認最昂貴的瀏覽器操作之一。Pretext 的解法是把文字分析拆成兩個明確階段：`prepare()` 一次性呼叫瀏覽器的 Canvas `measureText` API，取得字元寬度、字形邊界等原始字型數據；之後所有 `layout()` 呼叫都是**純算術**——用記錄下來的字元尺寸自己跑 word-wrapping 和 line-break 邏輯，完全不碰 DOM。這讓 `layout()` 的複雜度從「觸發瀏覽器重排」降到「幾個乘法加法」，0.09ms / 500 段落的數字由此而來。

**Before**：任何需要動態計算文字高度的 UI——虛擬列表、富文字編輯器、AI 生成的 card layout、自動分頁——都必須先把內容塞進隱藏的 DOM 節點等瀏覽器算完，每幀都是幾十毫秒的 reflow 債務，複雜排版在網頁上幾乎是禁忌。**After**：文字高度變成一個可以在 60fps render loop 裡直接呼叫的純函式；Canvas 渲染器和 WebGL UI 不再需要 DOM 作為排版中介；伺服器端可以預算 layout、減少客戶端的首屏計算量。這個函式庫移除的不只是效能瓶頸，而是網頁排版表現力被壓制了 30 年的那道根本障礙。

<AnnotationCard
  relevance={3}
  skills={["webgl", "react", "figma"]}
  adjacent="Canvas / WebGL 自訂渲染器的排版精度問題"
  adjacentNote={"在 Canvas 或 WebGL 做 UI 渲染時，文字高度計算是最難處理的環節——過去只能用隱藏 DOM 元素量測，Pretext 直接提供了一個純算術替代方案，讓自訂渲染器擺脫 DOM 依賴。"}
  connection={"跟 design-code bridge 興趣高度相關：Figma spec 轉 code 的核心痛點之一就是文字排版精確度——設計稿裡的行高、換行點往往和瀏覽器實際算出來的結果有偏差。Pretext 提供了一個可程式化控制、可預測、可在 SSR 端預算的排版層，是 Figma → code 精確度問題的底層解法。"}
/>
