---
title: "DESIGN.md — 把設計系統轉成 AI 可讀格式"
date: 2026-04-10
url: https://getdesign.md/
note: "有人開始把「設計系統」轉成 AI 可以直接讀懂的格式。透過一份 DESIGN.md，把品牌設計語言寫成結構化文件，直接讓 Claude Code、Copilot 在生成 UI 時遵循指定風格。"
---

來源：[getdesign.md](https://getdesign.md/)

你可以直接下載 Apple、Stripe、Linear、Vercel、Airbnb 等 **62 個品牌**的設計規格，以 DESIGN.md 格式丟進任何前端專案——然後讓 Claude Code 或 Copilot 在生成 UI 時自動讀取這份規格，產出和目標品牌風格一致的介面。不需要手動比對設計稿，不需要向 AI 解釋「這個按鈕要圓角多少」，直接在 context 裡給它一份可以遵循的設計語言規格。

背後的運作邏輯很直接：DESIGN.md 是一份結構化文件，把品牌的顏色、字體、間距、元件樣式、整體風格抽取成機器可讀的格式，放進專案根目錄後，AI coding 工具在生成程式碼時會把這份文件納入 context。這不是什麼新技術，這是 AI 在工作時需要什麼就給它什麼的應用——和 CLAUDE.md 指定行為規則的邏輯完全相同，只是這次指定的是視覺規則。getdesign.md 的貢獻是幫你把 62 個大品牌的視覺語言事先整理好，省去逆向分析的工夫。

以前：AI 寫得出功能，但 UI 風格往往普通、缺乏一致性——原因不是模型不夠強，而是它沒有設計上下文。設計師和工程師之間的語言鴻溝，AI 無法自行跨越。現在：把一份 DESIGN.md 放進專案，Prompt 決定做什麼，DESIGN.md 決定長什麼樣。兩者結合，AI 才能產出真正可用、視覺一致的 UI——而不只是功能上跑得通的 UI。

---

## 使用方式

**取得設計規格：**
1. 前往 getdesign.md，從 62 個品牌中選擇目標風格（如 Stripe、Linear、Vercel）
2. 下載對應的 `DESIGN.md` 檔案

**放進專案：**
```
your-project/
├── DESIGN.md        ← 放這裡
├── CLAUDE.md
└── src/
```

**讓 AI 讀取：**
- Claude Code 會自動讀取專案根目錄的 `.md` 規格文件
- 或在 CLAUDE.md 加入：`Always read DESIGN.md before making any visual or UI decisions.`
- 此後每次生成元件，AI 都會按照規格裡的 color token、typography、spacing 產出

**自建 DESIGN.md：**
參考品牌格式，把自家設計系統的 token 抽取成相同格式——一次定義，所有 AI 工具共享同一份設計語言來源。

<AnnotationCard
  relevance={5}
  skills={["figma", "design-systems", "ai-agents", "css-custom-properties"]}
  adjacent="Design Token → DESIGN.md 自動化導出"
  adjacentNote={"你已有 Figma → JSON → OKLCH Token 的完整工程鏈 → 下一步：把這套 token 輸出成 DESIGN.md 格式，讓 Claude Code 在生成 Nexus 元件時直接讀取，實現設計規格的單一來源自動化。"}
  connection={"你的 Claude_auto 已經有 DESIGN.md，用來約束 AI 生成 UI 的視覺決策——getdesign.md 把這個實踐推廣到 62 個品牌，驗證了這個模式的通用性，也提供了一個可以參考的規格格式範本。"}
/>
