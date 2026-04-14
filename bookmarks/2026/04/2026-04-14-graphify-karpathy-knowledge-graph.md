---
title: "Graphify — Karpathy 知識編譯工作流的開源實作，3 天 25k Stars"
date: 2026-04-14
url: https://github.com/safishamsi/graphify
note: "開源 3 天狂掃 15,000 Stars！Graphify 實作了 Karpathy 的大腦外掛：Token 消耗降 71.5 倍、告別 Vector DB、全模態知識圖譜"
---

來源：[github.com/safishamsi/graphify](https://github.com/safishamsi/graphify)

你可以把整個專案資料夾——程式碼、PDF 論文、白板截圖、甚至影片——丟給 Graphify，一個指令讓它自動編譯成可查詢的知識圖譜。查詢時每次消耗的 Token 比直接讀原始檔案少 71.5 倍；對一個混有大量文件和截圖的 repo 來說，這相當於把 API 費用砍到原本的 1.4%。它支援 23 種程式語言的 AST 解析、PDF、圖片、影片、音訊，以及 DOCX、XLSX——幾乎是你資料夾裡會出現的所有格式。

技術上分三個 pass：第一 pass 用 tree-sitter 在本機解析程式碼 AST，完全不送給 LLM；第二 pass 用本機的 faster-whisper 轉錄音訊；第三 pass 才把文件和圖片交給 Claude subagents 並行做語意萃取。圖譜本身用 Leiden 社群偵測做分群，用「God nodes」標示連結度最高的核心概念，關係帶有 0.0–1.0 的信心分數，還有連結三個以上節點的 Hyperedges。不需要 Embedding、不需要 Vector DB——圖的拓撲結構本身就是語意相似度的訊號。

以前：問 AI 關於大型 repo 的問題，它要讀完所有檔案才能回答，Context 爆、Token 燒、速度慢，最後還不一定找到對的地方。現在：一次性把整個資料夾「編譯」成圖譜，查詢時直接導航到目標節點，就像查字典而不是讀整本書。Karpathy 說他現在大半的 Token 都花在編譯知識而非寫 Code——Graphify 把這個思路產品化，讓沒有大神時間自建工作流的人也能直接用。

---

## 使用方式

### 安裝

```bash
pip install graphifyy && graphify install
```

安裝完後依平台選擇，例如 Claude Code：

```bash
graphify install --claude-code
```

支援平台：Claude Code、Codex、Cursor、GitHub Copilot CLI、Gemini CLI、Aider、OpenCode

### 核心指令

```bash
/graphify .                          # 對當前目錄建構圖譜
/graphify ./src --update             # 增量更新（SHA256 cache，只重建有變動的部分）
/graphify query "你的問題"            # 查詢圖譜
/graphify path "NodeA" "NodeB"       # 追蹤兩個節點之間的連結路徑
```

### 輸出產物

| 產物 | 用途 |
|------|------|
| `graph.json` | 持久化圖譜，可增量更新 |
| `GRAPH_REPORT.md` | 圖譜摘要，含 God nodes 與社群結構 |
| `*.html` | 互動式視覺化，支援搜尋與篩選 |

### 隱私邊界

- **留在本機**：所有程式碼（tree-sitter AST）、音訊（faster-whisper）
- **送給 LLM**：文件、PDF、圖片的語意萃取（使用你自己的 API key）

<AnnotationCard
  relevance={5}
  skills={["ai-workflow", "ai-agents", "monorepo-pnpm"]}
  adjacent="Graphify + Nexus Monorepo 知識圖譜"
  adjacentNote={"你的 Nexus Monorepo 有 packages/ui、packages/cli、apps/demo 多層結構——用 /graphify . 把整個 Monorepo 編譯成圖譜，讓 Claude 查詢時直接導航到目標節點，不需要每次 read 整個目錄樹，Token 消耗從幾千降到幾十。"}
  connection={"Henry 的 Claude_auto memory 系統（session-log + skill-taxonomy + user-profile 分層）跟 Graphify 的核心邏輯異曲同工——都是把「找到正確資訊的成本」前置到結構建立，而非每次查詢時重新掃描；Graphify 只是把這個思路推到整個資料夾層級。"}
/>
