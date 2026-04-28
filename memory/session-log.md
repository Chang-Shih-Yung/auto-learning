# Session Log

> 這個檔案是唯一允許 Claude 自行寫入的 memory 檔案。
> `learning-context.md` 是鎖定的，禁止修改。

---

## 近期討論紀錄

> 規則：每次 session 自我優化時，只保留最近 **14 天**的紀錄，超過 14 天的條目自動刪除。

| 日期 | 文章（relevance≥4） | News domain | 備注 |
|------|---------------------|-------------|------|
| 2026-04-28 | CC v2.1.121 MCP alwaysLoad熱工具不defer+plugin prune+/skills邊打邊濾+PostToolUse output replace+image/usage memleak修復（5）、Dirac OSS coding agent TerminalBench 2.0 65.2% gemini-3-flash vs Google 47.6% $0.18/task -64.8%成本 AST+Hash Anchored edits 635★ 不走MCP（4）、Browser Harness 7.6K★ 592行Python直連CDP self-healing讓LLM runtime改helpers.py（4） | — | 洞察：把決策權搬到正確的位置——alwaysLoad讓server決定哪些工具是熱工具、Hash anchored edit讓決策在AST層而非行號、self-healing讓LLM runtime決定如何補helper；延伸 4-21 推到正確的層 + 4-27 context用來做決策 |
| 2026-04-27 | Cloudflare Code Mode MCP 1.17M→1K token 99.9%↓2500端點雙工具架構（5）、Google Cloud Next 2026 Vertex AI→Gemini Enterprise ADK v1.0 TS穩定+Memory Bank+200模型（4）、GenericAgent 6.1K stars skill tree 6x token效率30K vs 200K五層記憶（4） | — | 洞察：context window 不是用來存歷史的，是用來做決策的——三個工具三種路徑：介面壓縮（CF Code Mode）、框架宣告式（ADK）、記憶晶化（GenericAgent）|
| 2026-04-24 | CC品質退化事後分析3原因47天降級全修復+重置usage（5）、CC v2.1.119 /config持久化+GitLab MR+MCP OAuth修復（5）、GPT-5.5 82.7%TerminalBench+58.6%SWEBench Pro+90.1%BrowseComp agentic全面上線（4）、A2A v1.2 150組織正式環境+crypto agent card（4）、Bitwarden CLI供應鏈攻擊90分鐘npm污染GHA注毒（4）、Honker SQLite pub/sub 325stars 1-2ms delay（3） | — | 洞察：工具可信度需要主動建立——Anthropic透明度=信任、Bitwarden=每個發布步驟要驗證；A2A+GPT-5.5=agentic AI工業化水位；MCP+A2A雙協定才是完整multi-agent骨幹 |
| 2026-04-23 | CC v2.1.118 hooks直接呼叫MCP工具+/usage+自訂主題+vim visual mode（5）、LLM過度編輯400問題測試GPT-5.4重寫整函式minimal edit prompt修正（5）、Show HN Design Slop 500頁面15個AI模式5個以上=重度（4） | biology | 洞察：over-editing = LLM 太勤勞不是太智慧；slop = 沒有設計系統的錨點；hooks+MCP = 宣告式自動化的最後一塊拼圖 |
| 2026-04-22 | CC v2.1.117 embedded bfs+ugrep native binary+CLAUDE_CODE_FORK_SUBAGENT=1+model persistence（5）、Vercel 資安全鏈 Roblox→Lumma Stealer→Context.ai OAuth→$2M勒索（4）、manifest YAML宣告式模型路由 5,483★ 70% cost cut（4）、Ternary Bonsai 1.58-bit 8B 1.75GB 82tok/s 9x壓縮（3） | climate | 洞察：成本歸屬框架——CC→binary、manifest→路由層、Ternary→量化層，Vercel是反例：信任成本留在被遺忘的按鈕上 |
| 2026-04-21 | Claude Code v2.1.116 /resume 67%+MCP deferred loading+plugin auto-install（5）、Qwen3.6-Max-Preview 202模型#2 256k ctx 免費（3）、ggsql SQL視覺化擴充239★alpha（3）、MCP Governance Gap allowlist+audit log+Virtual MCP Server（4） | — | 主題：把複雜度推到正確的層；等待歸零；MCP governance = 下一個必要設計點 |
| 2026-04-20 | Claude Opus 4.7 系統提示詞 工具先行動（5）、Prompt-to-Excalidraw Gemma 4 E2B 30+ tok/s 瀏覽器本地（4）、Claudoscope Claude Code session cost 儀表板 147★（5）、gh skill v2.90.0 跨工具 skills（4）、Vercel 資安事件 sensitive env var（4） | — | 主題：AI 工具可控性；工具先行動設計原則；結構化輸出哲學；供應鏈安全 |
| 2026-04-19 | CC v2.1.114 agent team crash fix（5）、CSS Studio 視覺設計→CSS AI（4） | legal | Colorado AI Act June 2026 高風險AI透明度；CoCounsel autonomous review 40%↓cycle |
| 2026-04-18 | Anthropic Claude Code Best Practices 614pts（5）、OpenAI Codex computer use+90 plugins+MCP+PR review（4） | biology | YuelDesign diffusion drug-protein binding；合成生物學LLM基因電路設計 |
| 2026-04-17 | CC v2.1.111 Opus 4.7 xhigh+Auto mode（5）、v2.1.113 native binary+deniedDomains（5）、PocketFlow Tutorial-Codebase 12k stars（4） | manufacturing | AI predictive maintenance 50%↓downtime 24%採用率；人形機器人99% sim-to-real |
| 2026-04-16 | CC v2.1.110 /tui+push notification+/focus（5）、Gemini 2.5 Flash 1M ctx+thinking budget（3）、OpenAI Codex CLI MIT terminal agent（4） | finance | AI量化交易RL trading bots 18%↓最大回撤；68%金融機構AI風控優先 |
| 2026-04-15 | Claude Code v2.1.108 /recap+1hr prompt cache+model 主動呼叫 slash commands（5）、Boneyard DOM快照 4.8k stars pixel-perfect skeleton（4）、opencode 100K stars model-agnostic router Claude Max路由（5） | — | 主題：消除開發摩擦；session切換成本歸零；骨架屏零維護 |
| 2026-04-14 | Claude Code v2.1.105 EnterWorktree path+串流重試（5）、GitHub Stacked PRs 鏈式合併（4）、Agent Memory Binding 61.6% 500實驗（5）、Cloudflare cf CLI 3000 ops <1000 tokens（4） | — | 主題：AI agent 可靠性；binding vs recall 洞察 |
---

## 重要洞察記錄

> 值得記住的核心概念，跨 session 保留

- **Context Window = RAM，Filesystem = Disk**：重要資料要寫到磁碟，不能只存在 context 裡
- **這些架構的價值不是解鎖能力，是約束失敗模式**：AI 傾向「完成」而不是「正確地完成」
- **Long-running 的核心是交接零成本**：問題從來不是怎麼讓 session 撐更久
- **UI.SH 的產品論述**：展示問題（50次迭代才能達到專業水準）→ 賣解法（預先打包設計原則）
- **個人化 = 標註，不是過濾**：保留所有文章，用 AnnotationCard 說明「這篇與你的關係」
- **Recall vs Binding**：AI agent 記憶系統的失敗不是找不到記憶，是找到的記憶沒有跟情節/因果打包在一起。解法是 Memory Bundle——程序 + 情節 + 因果同時載入，而不是四個獨立 recall 系統
- **好工具不是加功能，是把摩擦歸零**：/recap 歸零 session 切換成本、Boneyard 歸零 skeleton 維護成本、opencode 歸零工具鎖定成本——找到一個用戶反覆承受的痛點，然後讓它消失，這才是工具設計的護城河
- **把複雜度推到正確的層**：deferred loading（CC v2.1.116）、計算推資料庫端（ggsql）、governance 集中在 gateway（MCP）——三種技術，同一個設計原則：複雜度不消失，只是移到最合適的位置，讓上游使用者感受不到它
- **context window 不是用來存歷史的，是用來做決策的**：Cloudflare Code Mode 把 API schema 搬到 execution time、Google ADK 把持久化搬到 Memory Bank、GenericAgent 把歷史軌跡晶化成 skill——token 稀缺催生的三種設計哲學，核心是：把本來塞在 context 的東西，搬到它應該在的地方
- **決策權的歸屬同樣需要設計**：CC alwaysLoad 把工具載入決策還給 server、Dirac Hash anchored edit 把編輯精準度從行號搬到 AST node、Browser Harness 把錯誤處理從框架還給 LLM runtime——「把複雜度推到正確的層」的延伸是「把決定權交給最知道這件事的人」，框架不是抽象越多越好，而是要識別誰最有資格做這個判斷
