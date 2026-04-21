---
title: "Boris Cherny：Claude Opus 4.7 高效工作流的 6 個技巧"
date: 2026-04-21
note: "Anthropic 工程師 Boris Cherny 分享數週實戰心得，整理 Auto Mode、/fewer-permission-prompts、Recaps、Focus Mode、Effort 調整、自我驗證工作流 6 個技巧"
---

你可以在 Claude Code 裡按 **Shift-Tab** 進入 Auto Mode，讓 Opus 4.7 自動判斷每個工具呼叫是否安全、是否需要你確認——安全的請求自動通過，真正需要你決定的才跳出提示。這讓你同時開多個 Claude instance 並行跑不同任務：一個在做深度研究、一個在重構程式碼，你可以來回切換而不是守著一個等它完成。搭配 `/effort xhigh` 指令，Opus 4.7 的 adaptive thinking 會啟動更深的推理路徑；Boris 自己大部分任務用 xhigh，最難的任務才用 max。對 Max、Teams、Enterprise 訂閱者已開放。

Opus 4.7 的 Auto Mode 背後有一個專門的安全分類器（safety classifier）：每當 Claude 需要呼叫工具（讀寫檔案、執行 shell 指令、呼叫 MCP server），分類器會即時評估這個操作的風險等級——低風險（如唯讀操作）自動批准，高風險（如刪除檔案、網路請求）才暫停等你確認。這個分類器的訓練資料來自大量的真實 permission request，讓它能理解「在這個 codebase 的這個 context 下，這個指令的真實風險是什麼」，而不只是看指令名稱。`/effort` 指令控制的是 adaptive thinking 的 token budget——low effort 用幾百 token 快速推理，xhigh 和 max 開放更大的內部思考空間，代價是速度更慢、費用更高。`/fewer-permission-prompts` skill 則是掃描你歷史的 session log，找出那些安全但一直觸發提示的 bash 和 MCP 指令，自動建議加進 allowlist。

以前使用 Claude Code 跑複雜任務，你有兩個選擇：要麼全程盯著螢幕按允許，要麼用 `--dangerously-skip-permissions` 把所有安全護欄關掉。現在 Auto Mode 做了第三條路：智慧分級，讓安全操作自動通過、危險操作才打擾你。Boris 的「/go skill」是這套工作流的具體化——一個指令讓 Claude 依序跑測試、執行 `/simplify`、開 PR，整個流程不需要你介入每一步。Opus 4.7 加上正確的工作流設計，Claude 可以在你不在的時候持續工作，你回來時用 Recaps 快速了解進度，用 Focus Mode 只看結果——這才是 Boris 說的「真正感受到飛躍」的工作方式。

---

## 使用方式

### Auto Mode
```bash
# 在 Claude Code 裡按鍵盤
Shift-Tab   # 切換進入 / 離開 Auto Mode
```

### /fewer-permission-prompts
```bash
/fewer-permission-prompts   # 掃描 session log，建議允許清單
```
適合不想用 Auto Mode 但想減少干擾的人。

### Focus Mode
```bash
/focus   # 隱藏中間過程，只顯示最終結果
```
Boris 建議：當你已經信任模型會跑正確的指令時再開啟，不然容易漏掉重要中間步驟。

### Effort 調整
```bash
/effort           # 開啟互動式 slider，方向鍵選擇
/effort xhigh     # 直接設定（推薦日常使用）
/effort max       # 最複雜的任務（如架構設計、深度 debug）
```

### 自我驗證工作流（Boris 的 /go skill 概念）
在 CLAUDE.md 或 skill 裡定義一個驗證步驟鏈：
1. 啟動 dev server 跑 E2E 測試（後端）
2. 用 Chrome extension 操控瀏覽器驗證 UI（前端）
3. 跑 `/simplify` 清理程式碼
4. 自動開 PR

Prompt 格式參考：`Claude do [task description] /go`

<AnnotationCard
  relevance={5}
  skills={["ai-workflow", "ai-agents"]}
  adjacent="自訂 /go skill + Claude Code 驗證工作流"
  adjacentNote={"你已懂 Claude Code 的 skill 系統和 scheduled session 設計。下一步：在 Claude_auto 或 Nexus 的 .claude/skills/ 目錄建立一個 /go skill，定義「跑測試 → 簡化 → PR」的驗證鏈，讓 Claude 在完成任務後自動執行這條流程，而不是每次手動觸發。"}
  connection={"你每天跑 Claude_auto scheduled session，Boris 的工作流哲學——讓 Claude 更長時間、更 agentic 地運行——正是你的 Claude_auto 設計核心：一次設定，Claude 自主執行完整工作流，你只看結果。Auto Mode 可以直接消除你最常被打斷的 permission prompt 摩擦點。"}
/>
