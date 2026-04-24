# Session Log

> 這個檔案是唯一允許 Claude 自行寫入的 memory 檔案。
> `learning-context.md` 是鎖定的，禁止修改。

---

## 近期討論紀錄

> 規則：每次 session 自我優化時，只保留最近 **14 天**的紀錄，超過 14 天的條目自動刪除。

| 日期 | 文章（relevance≥4） | News domain | 備注 |
|------|---------------------|-------------|------|
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
| 2026-04-13 | Claudraband session persistence HTTP daemon（5）、Berkeley benchmark 8個100% exploit（4）、Next.js v16.2.3 CVE-2026-23869（4） | education | Carnegie Learning MATHia 42%↑ 1M學生；Alpha School 2hr model；W15 showcase: Research-First vs Edit-First 模擬器 |
| 2026-04-12 | Berkeley AI Benchmark exploit 100% SWE-bench 500/500（5）、AISLE 3.6B模型$0.11/M token找相同漏洞（4） | legal | CoCounsel/Protégé agentic workflow；Lexis+ 17%/Westlaw 34%錯誤率；EU AI Act Aug 2026 |
| 2026-04-11 | Claude Code v2.1.101 context loss+memory leak+command injection fix（5）、n8n 183K stars MCP原生支援（4）、Linux kernel Assisted-by attribution標準（4） | biology | Rice CLASSIC 百萬基因電路100%準確率、NUS D-I-TASSER蛋白質結構+13% |
| 2026-04-10 | Claude Code v2.1.98 安全加固 PID sandbox（5）、Research-Driven Agents $29/15%加速（4） | manufacturing | BMW Leipzig 人形機器人、ABB+NVIDIA 99% sim-to-real |

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
