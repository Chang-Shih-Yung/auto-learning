---
title: "Thin Harness, Fat Skills：Garry Tan 的 AI 100 倍生產力架構"
date: 2026-04-13
note: "同樣模型用出 100 倍 vs 2 倍的差異不在模型本身，在包裹模型的架構設計——五個定義（Skill files、harness、Resolvers、Latent vs Deterministic、Diarization）加上 YC 實際的創辦人配對案例"
---

用同一個 Claude 模型，有人能做到 100 倍效率、有人只有 2 倍——差距不在模型智力，在架構。Garry Tan 的核心原則：**Thin Harness（薄外殼）, Fat Skills（厚技能）**。Anthropic 意外洩漏的 Claude Code 51 萬 2 千行原始碼印證了這點：秘密在包裹模型的那一層，而不是模型本身。你的 CLAUDE.md 從 2 萬行砍到 200 行（只留指向文件的指標），透過 Resolver 按需載入，context window 維持乾淨；Playwright CLI 每個瀏覽器操作 100 毫秒，vs Chrome MCP 的 15 秒全流程——快 75 倍。Skill file 寫一次，在你睡覺時凌晨三點自動執行，下一個新模型發布時每個 skill 立刻自動變強。

**五個核心定義的運作機制：** Skill file 是 markdown 格式的可重複使用流程文件，運作方式像函式呼叫——同一個 `/investigate` skill 的七個步驟，指向 210 萬封 discovery 郵件就變成醫學研究分析師，指向 FEC 申報資料就變成法務調查員。harness 只做四件事：在迴圈中執行模型、讀寫檔案、管理 context、強制安全規則——越薄越好。Resolver 是 context 路由表，根據任務類型在對的時刻載入對的文件，不污染 context window。最關鍵的設計原則是 **Latent vs Deterministic**：讓 LLM 處理需要判斷的潛在空間（閱讀、詮釋、決策），讓傳統程式處理需要信任的確定性運算（SQL、算術、編譯）——搞混這兩者是 agent 設計最常見的錯誤。Diarization 是讓模型閱讀幾十份文件後，蒸餾出一頁結構化判斷摘要，這是 RAG 和 SQL 查詢都做不到的事。

以前的 AI 工作流是一次性的——你問，它答，下次你還是要重問、重 prompt、重解釋背景。現在 fat skills 的架構讓每一次工作都變成系統的永久升級：skill 不會退化、不會忘記、會隨新模型自動提升。YC 用這個架構把 6000 位創辦人的配對「還好」評分從 12% 壓到 4%，不是靠工程師重寫程式碼，而是讓 skill 自己改寫自己——活動結束後系統讀 NPS 回饋、提取模式、把新規則寫回 skill file，下一次自動使用。

---

## 使用方式

### 架構三層圖

```
┌─────────────────────────────────┐
│  Fat Skills（上層，90% 價值）     │
│  markdown 格式，編碼判斷流程       │
├─────────────────────────────────┤
│  Thin CLI Harness（中層）         │
│  ~200 行，JSON in / text out      │
│  預設唯讀，管理 context            │
├─────────────────────────────────┤
│  Deterministic Tools（下層）      │
│  SQL / ReadDoc / Search / API     │
│  同樣輸入永遠同樣輸出              │
└─────────────────────────────────┘
```

### 五個定義速查

| 概念 | 一句話定義 | 反面模式 |
|------|-----------|---------|
| **Skill file** | markdown 函式：接受參數，描述判斷流程 | 把邏輯寫死在 prompt 裡 |
| **Harness** | 只做 4 件事的薄外殼 | Fat harness：40+ 工具定義吃掉 context |
| **Resolver** | 根據任務類型，自動載入對的文件 | CLAUDE.md 塞 2 萬行全部常駐 |
| **Latent vs Deterministic** | AI 做判斷，程式做計算 | 叫 LLM 排 800 人座位（組合最佳化） |
| **Diarization** | 模型讀 N 份文件，輸出 1 頁結構化側寫 | RAG 相似度搜尋（找不到「說的」vs「做的」落差） |

### 黃金規則（Garry Tan 的 prompt）

```
你不准做一次性的工作。
如果我叫你做一件事，而且它是那種以後還會再做的事，你必須：
1. 先手動做 3 到 10 個項目
2. 給我看結果
3. 如果我批准，就把它寫成一個 skill file
4. 如果它應該自動執行，就放上 cron

測試標準：如果我需要同一件事跟你說兩次，就是你的失敗。
```

### Claude Code 對應關係

```
Claude Code 原生架構（51.2 萬行原始碼）：
- /commands/*.md       → Skill files
- CLAUDE.md（精簡版）  → Resolver（指向各文件的指標）
- claude-code CLI      → Thin harness
- bash / Read / Write  → Deterministic tools
```

<AnnotationCard
  relevance={5}
  skills={["ai-workflow", "ai-agents", "monorepo-pnpm"]}
  adjacent="Diarization pattern for knowledge work"
  adjacentNote={"你已有 MCP Server + Claude Code 排程任務 + Nexus monorepo → 下一步：把 learning-context.md 的每個 Step 重寫成獨立的 fat skill file（/fetch-sources.md、/filter-articles.md、/write-journal.md），harness 只做分派呼叫，讓每個 skill 可以獨立升級而不影響整體流程。"}
  connection={"你每天跑的 Claude_auto 排程任務就是這篇文章描述的架構——learning-context.md 是 Resolver，sources.yaml 是 Deterministic 工具定義，每個步驟說明是 Skill file；你已經在實踐 thin harness + fat skills，只是還沒用這個語言描述它。"}
/>
