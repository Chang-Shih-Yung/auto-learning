---
title: "Figma MCP Server Guide — figma-use Skill 官方指南"
date: 2026-03-30
url: https://github.com/figma/mcp-server-guide/tree/main/skills/figma-use
---

來源：[github.com/figma/mcp-server-guide/skills/figma-use](https://github.com/figma/mcp-server-guide/tree/main/skills/figma-use)

這是 Figma 官方的 MCP Server Guide 裡的 `figma-use` skill，它讓 Claude 或任何 AI agent 能透過 `use_figma` 工具在 Figma 檔案內直接執行 JavaScript，對節點做完整的 CRUD：建立 Frames、Components、Text、Shapes，管理 Variables 和 Design Tokens，設定 Auto Layout、填色、描邊、特效，以及把 Variables 綁定到節點屬性。失敗的腳本保證零變更（atomic），頁面切換用 `await figma.setCurrentPageAsync()`，所有操作在 Plugin API 的 `figma.` 命名空間下執行。

技術核心是：agent 寫的是帶 top-level `await` 的純 JavaScript（不需要 IIFE 包裝），平台自動包進 async context 再執行，回傳值透過明確的 `return` 語句 JSON 序列化傳回。幾個關鍵約束：顏色用 0–1 範圍（不是 0–255）、字型必須在操作前先 `await figma.loadFontAsync()`、`layoutSizingHorizontal/Vertical = 'FILL'` 要在 `appendChild()` 之後才能設定。官方建議的工作流是：一次一個任務 → 用 `get_metadata` 驗結構 → 用 `get_screenshot` 驗視覺 → 確認後再繼續，不鼓勵一口氣寫大段腳本。

**Before**：Claude 只能讀 Figma 檔案（get_metadata、截圖），想改東西得回到 Figma 手動操作，AI 建議和實際設計之間有一道不可跨越的執行鴻溝。**After**：`figma-use` 讓 AI 成為 Figma 的執行者——agent 可以讀取現有設計系統的規範、生成符合規格的 Components、批次綁定 Design Tokens，整個「設計規格 → 實作」的環節可以委派給 agent，人類設計師的角色從「執行者」移向「審核者」。

---

## 使用方式

### 安裝到 Claude Code

**方法一：Plugin 安裝（最快）**

```bash
claude plugin install figma@claude-plugins-official
```

自動設定 MCP server + 下載所有 Agent Skills。

**方法二：手動設定**

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

開新的 Claude Code session → `/mcp` → 選 figma → Authenticate 授權。

---

### Code → Figma 相關 Skills

| Skill | 用途 |
|-------|------|
| `figma-use` | 核心技能，在 canvas 建立/修改 frames、components、variables（每次 `use_figma` 前必須先 load） |
| `figma-generate-library` | 從 codebase 反向生成 Figma design system library |
| `figma-generate-design` | 用現有 design system 元件生成完整頁面 screens |
| `figma-code-connect-components` | 將 Figma 元件連結到程式碼實作（Code Connect） |
| `figma-create-design-system-rules` | 記錄團隊的 design-to-code 規範 |

---

### figma-generate-design 工作流程（Code → Figma 主要路徑）

1. **理解 source code** — 讀取頁面結構、區塊、用了哪些元件
2. **探索 design system** — 找到現有 components、variables（顏色/間距）、styles，不能 hardcode hex 或 px 值
3. **建 wrapper frame** — 先建容器（避免多次 call 產生孤立節點）
4. **逐 section 建立** — 每個區塊獨立一次 `use_figma` call，套用 design system tokens
5. **截圖驗證** — 每個 section 完成後截圖確認文字截斷、variant 錯誤等問題
6. **更新現有畫面** — 替換元件、更新屬性、新增/移除 sections

---

### 在 Claude Code 中呼叫

安裝後直接輸入：

```
/figma-generate-design
/figma-generate-library
/figma-use
```

或在對話中描述需求，Claude 會根據 skill description 自動判斷要用哪個。

---

<AnnotationCard
  relevance={5}
  skills={["figma", "design-systems", "ai-workflow"]}
  adjacent="Figma Plugin API 深度整合（figma.variables、figma.componentSets）"
  adjacentNote={"figma-use 的底層就是 Plugin API，懂 Plugin API 就能寫出更精準的 agent 指令。下一步：研究 figma.variables API 的 collection/mode 結構，讓 agent 能自動同步 Design Token 到對應的 variable scope。"}
  connection={"這直接對應我的 Figma → JSON → CSS Token 工作流：現在 agent 可以反向執行這個流程——讀取 token spec 後直接在 Figma 裡建立對應的 variable collection，不再需要手動在 Figma UI 裡一個個設定。"}
/>
