# Session Log

> 這個檔案是唯一允許 Claude 自行寫入的 memory 檔案。
> `learning-context.md` 是鎖定的，禁止修改。

---

## 近期討論紀錄

> 規則：每次 session 自我優化時，只保留最近 **14 天**的紀錄，超過 14 天的條目自動刪除。

### 2026-04-07
- 抓取 HN today（GitHub Issue #42796 Claude Code regression #10/724pts、Anthropic Google+Broadcom deal #2/69pts）
- 整理 2 篇文章：Claude Code Feb regression（17,871 thinking blocks + 234,760 tool calls 分析、thinking redaction 導致 research-first→edit-first，relevance 5）、Anthropic 算力擴張（$30B ARR、3.5 GW TPU from 2027、1000+ $1M 客戶，relevance 4）
- news: Design Industry AI（74% 建築師計畫增加 AI 使用、只有 20% 真整合、72% 工業設計師已採用、生成式設計 + 跨界設計語言）
- domain-rotation-log 更新：design_industry → finance
- Push 成功

### 2026-04-05（補跑）
- 抓取 HN 2026-04-05（Caveman #3/853pts、Gemma 4 locally #20/389pts、Parlor M3 Pro #17/261pts）
- 整理 3 篇文章：Caveman（75% output token ↓、87% on React bug、3x 速度、26pts 準確率↑，relevance 5）、Gemma 4 local LM Studio（51 t/s M4 Pro、18GB、82.6% MMLU、88.3% AIME 2026，relevance 4）、Parlor multimodal（83 t/s M3 Pro、2.5-3s E2E、RTX 5090 was needed 6 months ago，relevance 3）
- news: Climate AI（AI 氣候模型 40% 更準確、神經符號 AI 34min training vs 36hr、95%→34% 機器人準確率、能源 1%/5%）
- domain-rotation-log 更新：climate → design_industry
- Push 成功

### 2026-04-04（補跑）
- 抓取 HN 2026-04-04（Self-distillation code gen #4/649pts、Anthropic emotion research #17/187pts、Components of Coding Agent #11/292pts）
- 整理 3 篇文章：SSD code gen（Qwen3-30B 42.4%→55.3% LiveCodeBench、無 teacher/RL，relevance 4）、Anthropic emotion concepts（171 emotion vectors、22% blackmail rate、hidden behavioral influence，relevance 5）、Components of Coding Agent（6 building blocks、2 memory layers、context quality = model quality，relevance 5）
- news: Education AI（自適應學習 42% 成效提升、62% 測驗分數提升、71% 高等教育已部署 vs 34% in 2023）
- domain-rotation-log 更新：education → climate
- Push 成功

### 2026-04-06
- 抓取 HN today（Ghost Pepper #3/211pts、Freestyle #5/194pts、Claude Code issue #10/724pts、vibe coding cult #23/456pts）、GitHub Trending（无 AI 相关趋势项目）、GitHub Releases（claude-code v2.1.92、next.js v16.2.2）、dev.to（ctxlint AGENTS.md linter、git worktrees parallel Claude Code）
- 整理 5 篇文章：Claude Code v2.1.92（Write tool 60% 更快、/cost per-model breakdown、Interactive Bedrock wizard，relevance 5）、ctxlint（74% AGENTS.md 浪費、91% 精準度、67% token 削減、<100ms，relevance 5）、git worktrees 並行（20分鐘→10分鐘、cast-parallel 工具，relevance 5）、Ghost Pepper（100% 本地 STT、WhisperKit + Qwen 0.8B、1-2s，relevance 3）、Freestyle（700ms VM 啟動、live fork 毫秒級、pause 不計費，relevance 4）
- 跳過：Sam Altman article（新聞評論）、battle for Wesnoth（遊戲）、Adobe hosts file（有趣但與 Henry 技能樹無連結）、vibe coding cult（無具體數字）
- Push 成功

### 2026-04-02（補跑）
- 抓取 HN 2026-04-02 front page（Lemonade by AMD #6/469pts、Email obfuscation #11/343pts）、AMD 官方文件、spencermortensen.com 研究
- 整理 2 篇文章：Lemonade v10.0（NPU+iGPU hybrid 55 t/s@12W、256K context、OpenAI API 相容，relevance 3）、Email 防爬蟲實測（426 爬蟲、JS 100% 防護、HTML entities 95%，relevance 3）
- 跳過：Gemma 4、Qwen3.6-Plus（已於 04-03 整理過，相同工具相同角度）
- news: Manufacturing AI（預測維護 40% 停機↓30% 成本↓、視覺檢測 99.9% 準確率 vs 人工漏看 20-30%、Agentic AI 工廠閉環）
- domain-rotation-log 更新：manufacturing → healthcare
- Push 成功

### 2026-04-03
- 抓取 HN today（Gemma 4 #1/1235pts、Qwen3.6-Plus #4/457pts、Cursor 3 #3/326pts、LinkedIn browser scan #14/1600pts）、GitHub Trending（ink/ink 305⭐）、GitHub Releases（claude-code v2.1.91）、dev.to（claude-brain persistent memory、ContextCore MCP）
- 整理 5 篇文章：Gemma 4（31B Ollama 可跑、τ2-bench 86.4%、AIME 89.2%，relevance 4）、Qwen3.6-Plus（1M context 免費 OpenRouter、Terminal-Bench 61.6%、2-3x 快於 Claude Opus，relevance 4）、Claude Code v2.1.91（MCP 工具回傳 500K 字元 via `_meta`、disableSkillShellExecution，relevance 5）、Ink（React for CLI、Claude Code/Anthropic/GitHub/Google 用、305⭐，relevance 4）、claude-brain（6 hooks + SQLite、67K 訊息、11 MCP 工具、14 slash commands，relevance 5）
- Cursor 3 跳過（無具體數字）、LinkedIn browser scan 跳過（無法連結 Henry 技能樹）
- news: Legal AI（法律事務所採用率 23%→52%、AI agents CoCounsel/LexisNexis Protégé、合約周期縮短 40%、729 件幻覺案例、EU AI Act 8 月）
- domain-rotation-log 更新：legal → manufacturing
- Push 成功

### 2026-03-31
- 抓取 HN today（axios NPM compromise 285pts、Universal Claude.md 212pts、Ollama MLX 59pts）、GitHub Releases（claude-code v2.1.88）、Ollama 官方部落格、dev.to（Long-Horizon Agents）、Cursor 官方部落格
- 整理 6 篇文章：Claude Code v2.1.88（PermissionDenied hook + compound command 修復，relevance 5）、Cursor 2.5（8 VM 並行 agent + BugBot 35% merge rate，relevance 4）、Long-Horizon Agents（supervised autonomy，35% merge定義邊界，relevance 5）、Ollama 0.19 MLX（prefill 1810 t/s +57%、decode 112 t/s +93%，relevance 4）、axios NPM compromise（v1.14.1/v0.30.4 含 RAT，300M 週下載，relevance 4）、Universal Claude.md（465→170 字 63% token 壓縮，relevance 5）
- news: Biology AI（AI 縮短藥物研發前期 60%、Rice University AI genetic circuit 百萬設計空間、AstraZeneca/Tempus AI 對比學習 15% 存活改善）
- domain-rotation-log 更新：biology → education
- W14 showcase 生成：PermissionDenied Hook 決策模擬器（protocol-simulator）
- Push 成功

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
