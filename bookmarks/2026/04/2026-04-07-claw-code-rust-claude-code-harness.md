---
title: "Claw Code — Rust 重寫的 Claude Code Harness：168K Stars 背後的真相"
date: 2026-04-07
url: "https://github.com/ultraworkers/claw-code?tab=readme-ov-file"
note: "GitHub 史上最快破 100K stars 的 repo，Rust 重寫的 Claude Code agent harness，想了解能否在 Windows 上跑、優勢與風險"
---

來源：[github.com/ultraworkers/claw-code](https://github.com/ultraworkers/claw-code?tab=readme-ov-file)

先釐清一件事：**Claw Code 不是模型，是 harness（外殼）**。它的角色和 Claude Code CLI 一樣——把你的 LLM 接到檔案系統和 shell，讓 AI 能讀檔、改程式、跑指令。核心差異在於它是開源的，你可以接任何 LLM——包括 Anthropic API、GPT-4.1、Gemini，或本地 Ollama（接上你的 Gemma 4 E4B）。在 Windows 上「跑看看」的意思是：用 `cargo build` 編譯 Rust binary，然後把它當成 Claude Code 的替代品使用——但**它仍然需要 API key 或本地模型**，本身不含任何 AI 能力。目前 168K GitHub stars，但實測表現：簡單 bug 47 秒（Claude Code 30 秒），複雜多檔重構慢 8 倍，4/5 成功率 vs Claude Code 的 5/5。Windows 路徑處理有已知 bug，這對你的使用情境是直接風險。

Claw Code 的起源是 2026 年 3 月 31 日 Anthropic 不小心把 59.8 MB 的 source map 打包進 Claude Code npm 套件——裡面含有約 51.2 萬行 TypeScript 的完整 agent harness 原始碼。UltraWorkers 社群先以 Python 快速重寫做保護，再移植到 Rust（目前 95.9% Rust、4.1% Python），聲稱是 clean-room reimplementation 並以 Apache 2.0 授權釋出。架構上它複製了 Claude Code 的核心 loop：讀取 context → 呼叫 LLM → 執行 file/shell tools → 迭代收斂。但只有約 20–25% 的功能覆蓋率——沒有 MCP 支援、沒有 subagents、沒有 IDE 橋接、沒有完整的 prompt pipeline，context 管理用截斷而非壓縮，長 session 會失去資訊。

這件事改變了什麼：六個月前 AI coding agent 的架構是完全黑盒，只能用 Anthropic 官方工具。現在有了一個可以拆開研究的版本——了解 agentic loop 怎麼設計、tool calling 怎麼接、context 管理怎麼做，這對學習 AI agent 架構的人有真實的教育價值。但它沒有改變「生產環境用什麼」這個問題的答案：法律風險（可能被 Anthropic 要求下架）、Windows bug、無 rollback 機制、無版本穩定承諾，讓它的定位停留在「值得研究、不能依賴」。最有趣的組合是 Claw Code + Ollama + Gemma 4 E4B——開源 harness 接本地模型，理論上零 API 成本，但現階段的品質落差讓這個組合更像是實驗，不是工具替換。

---

## 使用方式

**前置需求**
- Rust toolchain（`rustup` 安裝）
- Anthropic API key 或本地 Ollama

**安裝與執行**

```powershell
# 1. Clone repo
git clone https://github.com/ultraworkers/claw-code.git
cd claw-code/rust

# 2. 編譯（需要幾分鐘）
cargo build --workspace

# 3. 設定 API key（用 Anthropic API）
$env:ANTHROPIC_API_KEY = "sk-ant-..."

# 4. 或用 OAuth 登入
./target/debug/claw login

# 5. 執行
./target/debug/claw prompt "summarize this repository"

# 6. 健康檢查
./target/debug/claw doctor
```

**接本地 Ollama 模型（零 API 成本實驗）**
```bash
# 確保 Ollama 已在跑 Gemma 4 E4B
ollama run gemma4:e4b

# Claw Code 接 Ollama（需確認 claw-code 的 Ollama 設定文件）
# 目前支援度仍在開發中，穩定性未知
```

**Windows 注意事項**
- 有已知的路徑處理 bug（Windows path separator）
- 建議先在 WSL2 環境跑，穩定後再評估原生 Windows

**風險評估一覽**

| 風險類型 | 等級 | 說明 |
|---------|------|------|
| 法律風險 | ⚠️ 高 | 源自洩漏原始碼，Apache 2.0 聲明法律地位仍不確定 |
| Windows bug | ⚠️ 中 | 路徑處理已知問題，影響你的主要環境 |
| 功能缺口 | ⚠️ 中 | 無 MCP、無 subagents，複雜任務失敗率高 |
| 專案存續 | ⚠️ 中 | 無維護承諾，Anthropic 可要求下架 |
| 惡意程式碼 | ✅ 低 | 開源可審計，無已知惡意行為 |

<AnnotationCard
  relevance={3}
  skills={["ai-agents", "ai-workflow", "containers"]}
  adjacent="Claw Code + Ollama + Gemma 4 E4B 本地 agent stack"
  adjacentNote={"上一篇 Gemma 4 bookmark 談到 E4B 跑在 RTX 4060 的場景——Claw Code 是那個場景的 harness 半片：把開源 agent 外殼接上本地模型，理論上實現零 API 成本的 coding agent。但現在兩者的結合穩定性都不夠，建議先各自熟悉（E4B 先跑起來，Claw Code 先在 WSL2 跑通），再考慮串接。"}
  connection={"你的 Nexus copilot-sdk 目標是讓 AI component generation 不依賴外部 API——Claw Code 的架構研究價值在這裡：看它怎麼把 LLM 接到工具鏈，參考它的 tool-calling loop 設計，可以直接應用到你自己的 MCP Server 設計思路上。不建議直接用 Claw Code，但它的 Rust 原始碼是很好的 agentic harness 教材。"}
/>
