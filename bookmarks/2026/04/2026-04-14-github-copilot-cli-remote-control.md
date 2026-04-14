---
title: "GitHub Copilot CLI 遠端控制（Remote Access）"
date: 2026-04-14
url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-remote-access
note: "遠端控制 copilot cli 官方文件查詢"
---

來源：[docs.github.com — About remote access for Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-remote-access)

你可以讓 Copilot CLI 在你的 MacBook 上跑一個長任務，然後離開座位——用手機或任何瀏覽器打開 GitHub.com，繼續回答 Copilot 的權限請求、批准執行計畫、輸入新的提示。整個計算和檔案操作仍然留在你的本機，遠端界面只是一個「操作桿」，你從外面控制裡面正在跑的 agent。單次 session 的輸出最多傳 60 MB 到遠端界面，但本機終端不受影響。

這個功能靠的是 Copilot CLI 持續對 GitHub 伺服器輪詢（polling）——CLI 在本機開著，同時監聽來自 GitHub.com 的遠端指令，把它們注入到當前 session，就好像你在本機鍵盤輸入一樣。本機和遠端同時開著都有效；CLI 採用最先到的回應。手機端需要 GitHub Mobile 最新 beta（iOS TestFlight / Android Play Beta），掃描 `Ctrl+E` 顯示的 QR code 就能接上。

以前：讓 agent 跑長任務只能人守在電腦前，等它問問題；出門就只能猜它跑完了沒。現在：agent 開著跑，你去喝咖啡、通勤、開會——手機一開 GitHub，看到它問你要不要允許某個工具，點一下批准，任務繼續。計算不上雲、資料不離機，遠端控制只是讓你的手指從本機鍵盤搬到手機螢幕。

---

## 使用方式

### 快速啟動

| 方式 | 指令 / 設定 |
|------|------------|
| 本次 session 啟用 | `copilot --remote` |
| session 中手動啟用 | 在 Copilot 提示列輸入 `/remote` |
| 本次 session 停用 | `copilot --no-remote` |
| 永久啟用 | `~/.copilot/config.json` → `{"remoteSessions": true}` |
| 帶 remote 繼續上次 session | `copilot --resume=SESSION_ID --remote` |
| 顯示手機 QR code | 在空白輸入時按 `Ctrl+E` |

### Keep-Alive（防止機器睡眠）

```bash
/keep-alive on        # 持續保持喚醒
/keep-alive 30m       # 保持 30 分鐘
/keep-alive 8h        # 保持 8 小時
/keep-alive busy      # 高效率模式（持續喚醒 + 優先回應）
/keep-alive off       # 關閉
```

### 前置條件

- 工作目錄必須是 GitHub repo（`git init` + remote 設好）
- Org / Enterprise 層級必須先開啟「Remote Control」policy（預設關閉）
- 只在互動式 session 有效（`--prompt` 腳本模式不支援）
- 只有你自己能存取你的 session

### 遠端 Session URL 格式

```
https://github.com/OWNER/REPO/tasks/TASK_ID
```

<AnnotationCard
  relevance={4}
  skills={["ai-workflow", "ci-cd"]}
  adjacent="Claude Code 遠端監控 + Mobile 整合"
  adjacentNote={"Copilot CLI 的遠端控制架構和 Claude Code 的 background monitor 方向類似——可以研究 Claude Code 是否有類似的 session polling 機制，或自己用 MCP + webhook 實作一個輕量版的手機通知系統。"}
  connection={"你每天跑 Claude Code 長任務、會遇到 agent 等你回應的情境——Copilot CLI 遠端控制的設計哲學（本機跑、遠端操舵）直接映射到你的 Claude_auto 排程工作流，值得觀察 Claude Code 是否推出類似功能。"}
/>
