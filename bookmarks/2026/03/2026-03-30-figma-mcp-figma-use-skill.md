---
title: "Figma MCP Server Guide — figma-use Skill 官方指南"
date: 2026-03-30
url: https://github.com/figma/mcp-server-guide/tree/main/skills/figma-use
---

來源：[github.com/figma/mcp-server-guide/skills/figma-use](https://github.com/figma/mcp-server-guide/tree/main/skills/figma-use)

這是 Figma 官方的 MCP Server Guide 裡的 `figma-use` skill，它讓 Claude 或任何 AI agent 能透過 `use_figma` 工具在 Figma 檔案內直接執行 JavaScript，對節點做完整的 CRUD：建立 Frames、Components、Text、Shapes，管理 Variables 和 Design Tokens，設定 Auto Layout、填色、描邊、特效，以及把 Variables 綁定到節點屬性。失敗的腳本保證零變更（atomic），頁面切換用 `await figma.setCurrentPageAsync()`，所有操作在 Plugin API 的 `figma.` 命名空間下執行。

技術核心是：agent 寫的是帶 top-level `await` 的純 JavaScript（不需要 IIFE 包裝），平台自動包進 async context 再執行，回傳值透過明確的 `return` 語句 JSON 序列化傳回。幾個關鍵約束：顏色用 0–1 範圍（不是 0–255）、字型必須在操作前先 `await figma.loadFontAsync()`、`layoutSizingHorizontal/Vertical = 'FILL'` 要在 `appendChild()` 之後才能設定。官方建議的工作流是：一次一個任務 → 用 `get_metadata` 驗結構 → 用 `get_screenshot` 驗視覺 → 確認後再繼續，不鼓勵一口氣寫大段腳本。

**Before**：Claude 只能讀 Figma 檔案（get_metadata、截圖），想改東西得回到 Figma 手動操作，AI 建議和實際設計之間有一道不可跨越的執行鴻溝。**After**：`figma-use` 讓 AI 成為 Figma 的執行者——agent 可以讀取現有設計系統的規範、生成符合規格的 Components、批次綁定 Design Tokens，整個「設計規格 → 實作」的環節可以委派給 agent，人類設計師的角色從「執行者」移向「審核者」。

<AnnotationCard
  relevance={5}
  skills={["figma", "design-systems", "ai-workflow"]}
  adjacent="Figma Plugin API 深度整合（figma.variables、figma.componentSets）"
  adjacentNote={"figma-use 的底層就是 Plugin API，懂 Plugin API 就能寫出更精準的 agent 指令。下一步：研究 figma.variables API 的 collection/mode 結構，讓 agent 能自動同步 Design Token 到對應的 variable scope。"}
  connection={"這直接對應我的 Figma → JSON → CSS Token 工作流：現在 agent 可以反向執行這個流程——讀取 token spec 後直接在 Figma 裡建立對應的 variable collection，不再需要手動在 Figma UI 裡一個個設定。"}
/>
