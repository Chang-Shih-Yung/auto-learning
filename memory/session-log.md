# Session Log

> 這個檔案是唯一允許 Claude 自行寫入的 memory 檔案。
> `learning-context.md` 是鎖定的，禁止修改。

---

## 近期討論紀錄

> 規則：每次 session 自我優化時，只保留最近 **14 天**的紀錄，超過 14 天的條目自動刪除。

### 2026-03-30
- 抓取 HN today（ChatGPT/Cloudflare reads React state 307pts、Voyager 1 memory 383pts）、GitHub Trending（apache/superset 430stars、upscayl 77stars）、Figma MCP server write access（March 24）、WorkOS MCP 2026 ecosystem report
- 整理 3 篇文章：Figma MCP write access（Code Connect 雙向流，relevance 5）、Cloudflare Turnstile reads React internals（55 properties / 377 samples，relevance 4）、MCP 2026 里程碑（97M 月下載、async tasks、CIMD，relevance 5）
- news: Climate AI（Aurora 1.3B params 100% cyclone win、NeuralGCM Google open-source、Planetary Intelligence Models WEF）
- domain-rotation-log 更新：climate → biology
- Push 成功

### 2026-03-29
- 抓取 HN today（CSS is DOOMed 171pts、I decompiled White House app 357pts、Linux is an interpreter 158pts）、GitHub Trending（chroma/chroma、apache/superset）、HN AI Discussion（HumanLayer 354pts、Magnitude 179pts）、dev.to（ZeroToRepo、6 AI Agents dev team）
- 整理 4 篇文章：HumanLayer（Human-in-the-Loop API，relevance 5）、Magnitude（AI-native test 7行自然語言，relevance 4）、Chroma v1.5.5（Rust 重寫 4x 速度，relevance 4）、CSS is DOOM（CSS 3D 渲染，relevance 3）
- news: Finance AI（AML alert overload AI Forensics 自動結案、LSTM 詐欺偵測 94.2%、AI 量化基金超越傳統策略 3-7%）
- domain-rotation-log 更新：finance → climate
- Push 失敗（osxkeychain 在排程環境無法解鎖）；commit 已在本地，需 Henry 手動 push 或重新設定 credential

### 2026-03-28
- 抓取 HN today (#1: jai 409pts)、GitHub Trending、GitHub Releases（claude-code v2.1.86、next.js v16.2.1）、dev.to、ProductHunt（Crossnode, CrabTalk, Aera Browser）
- 整理 5 篇文章：jai filesystem isolation（HN #1）、Claude Code v2.1.86、3-agent GitHub→Gemini→Notion pipeline（Mastra）、AI 軟體開發未來 HN 討論、Next.js v16.2.1 Turbopack 修復
- news: Healthcare AI（AI 藥物研發 70% 加速、臨床試驗 AI 模擬、精準醫療基因報告縮短到幾小時）
- domain-rotation-log 更新：healthcare → design_industry

### 2026-03-27
- 抓取 HN、GitHub Trending、GitHub Releases（claude-code v2.1.85、next.js v16.2.1）
- 整理 6 篇文章：Claude Code hooks 條件觸發、MCP 97M milestone、AI 程式碼安全研究、Mistral Small 4、Axe Unix pipeline agent
- 所有文章完成應用層轉換並加上 AnnotationCard

### 2026-03-26
- /office-hours 設計：個人化日誌標註功能（AnnotationCard）
- /plan-eng-review 審查：確認架構（Server Component + details/summary + YAML import）
- 實作 AnnotationCard 功能，含 skill-taxonomy.yaml、更新 learning-context.md prompt

---

## 重要洞察記錄

> 值得記住的核心概念，跨 session 保留

- **Context Window = RAM，Filesystem = Disk**：重要資料要寫到磁碟，不能只存在 context 裡
- **這些架構的價值不是解鎖能力，是約束失敗模式**：AI 傾向「完成」而不是「正確地完成」
- **Long-running 的核心是交接零成本**：問題從來不是怎麼讓 session 撐更久
- **UI.SH 的產品論述**：展示問題（50次迭代才能達到專業水準）→ 賣解法（預先打包設計原則）
- **個人化 = 標註，不是過濾**：保留所有文章，用 AnnotationCard 說明「這篇與你的關係」
