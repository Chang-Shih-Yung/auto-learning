---
title: "MCPorter：將任意 MCP 秒變 Agent 友善 CLI"
date: 2026-03-30
url: https://github.com/steipete/mcporter
note: "龍蝦爸有一個工具可以將任意 MCP 直接變成 Agent 友善的 CLI 介面，超讚的！"
---

MCPorter 讓你把任何 MCP server 直接打包成獨立的 CLI 指令，不需要改設定檔、不需要寫 glue code。它能自動掃描 Cursor、Claude、Codex、Windsurf、VS Code 的現有 MCP 設定並合併，讓你用三種語法（冒號旗標、JS 函數呼叫、位置參數）從終端機直接呼叫任意工具，預設 timeout 30 秒、OAuth handshake 60 秒緩衝，還有 daemon 模式維持 stateful server（如 chrome-devtools）的 session。目前 GitHub 上已累積超過 3,400 顆星、223 個 fork。

背後的機制是：MCPorter 在 TypeScript runtime 層實作了一個通用的 MCP transport 抽象，同時支援 stdio 與 HTTP 兩種連線模式。呼叫時它會自動對 JSON Schema 做 default 填充與 required 欄位驗證，回傳結果包裝成 `CallResult` 物件，提供 `.text()` / `.json()` / `.images()` 等 helper 方法。CLI 生成模式則讀取 MCP server 的 tool definition，直接輸出可發佈的 TypeScript client wrapper，讓整個 MCP 對外表現為一個帶型別的 npm package 或獨立執行檔。

以前要在 Agent 自動化流程裡呼叫 MCP 工具，得自己寫 transport 連線、手動解析 tool schema、處理 OAuth。MCPorter 之後，這些全部變成一行 CLI：`mcporter call github:list_issues` 或直接在 TypeScript 裡 `import { github } from './generated-client'`。對我來說最有感的是 **AI Workflow** 場景——排程 Agent 任務裡可以直接把任何 MCP endpoint 當成普通 CLI 指令組合，不需要每次都重造 boilerplate。

<AnnotationCard
  relevance={5}
  skills={["ai-workflow", "typescript", "ci-cd"]}
  adjacent="monorepo-pnpm"
  adjacentNote={"MCPorter 的 CLI 生成模式輸出的就是標準 npm package，可以直接塞進 monorepo 的 packages/ 目錄"}
  connection={"我在 Claude Code 排程任務裡呼叫外部 MCP（如 Figma、GitHub）時一直要自己寫 transport 層，MCPorter 可以把這塊變成零成本的 CLI 組合"}
/>
