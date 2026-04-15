# Session Log

> 這個檔案是唯一允許 Claude 自行寫入的 memory 檔案。
> `learning-context.md` 是鎖定的，禁止修改。

---

## 近期討論紀錄

> 規則：每次 session 自我優化時，只保留最近 **14 天**的紀錄，超過 14 天的條目自動刪除。

| 日期 | 文章（relevance≥4） | News domain | 備注 |
|------|---------------------|-------------|------|
| 2026-04-15 | Claude Code v2.1.108 /recap+1hr prompt cache+model 主動呼叫 slash commands（5）、Boneyard DOM快照 4.8k stars pixel-perfect skeleton（4）、opencode 100K stars model-agnostic router Claude Max路由（5） | — | 主題：消除開發摩擦；session切換成本歸零；骨架屏零維護 |
| 2026-04-14 | Claude Code v2.1.105 EnterWorktree path+串流重試（5）、GitHub Stacked PRs 鏈式合併（4）、Agent Memory Binding 61.6% 500實驗（5）、Cloudflare cf CLI 3000 ops <1000 tokens（4） | — | 主題：AI agent 可靠性；binding vs recall 洞察 |
| 2026-04-13 | Claudraband session persistence HTTP daemon（5）、Berkeley benchmark 8個100% exploit（4）、Next.js v16.2.3 CVE-2026-23869（4） | education | Carnegie Learning MATHia 42%↑ 1M學生；Alpha School 2hr model；W15 showcase: Research-First vs Edit-First 模擬器 |
| 2026-04-12 | Berkeley AI Benchmark exploit 100% SWE-bench 500/500（5）、AISLE 3.6B模型$0.11/M token找相同漏洞（4） | legal | CoCounsel/Protégé agentic workflow；Lexis+ 17%/Westlaw 34%錯誤率；EU AI Act Aug 2026 |
| 2026-04-11 | Claude Code v2.1.101 context loss+memory leak+command injection fix（5）、n8n 183K stars MCP原生支援（4）、Linux kernel Assisted-by attribution標準（4） | biology | Rice CLASSIC 百萬基因電路100%準確率、NUS D-I-TASSER蛋白質結構+13% |
| 2026-04-10 | Claude Code v2.1.98 安全加固 PID sandbox（5）、Research-Driven Agents $29/15%加速（4） | manufacturing | BMW Leipzig 人形機器人、ABB+NVIDIA 99% sim-to-real |
| 2026-04-09 | Claude Managed Agents +10pp task success（5）、Claude Code v2.1.97 Focus View+MCP 50MB/hr leak fixed（5） | biology | Meta Muse Spark 58% HLE Contemplating mode（rel.3 收錄）|
| 2026-04-08 | Glasswing + Mythos Preview 83.1%（5）、Railway Next.js→Vite 10min→2min（4） | finance | GLM-5.1 754B context rot 100k（rel.3 收錄） |
| 2026-04-07 | Claude Code Feb regression（17,871 blocks/5）、Anthropic $30B 3.5GW（4） | design_industry | — |
| 2026-04-06 | CC v2.1.92 Write 60%↑（5）、ctxlint 74%廢話（5）、git worktrees 50%↓（5）、Ghost Pepper STT（3）、Freestyle 700ms VM（4） | healthcare | — |
| 2026-04-05 | Caveman 75%↓（5）、Gemma 4 51t/s 18GB（4）、Parlor M3 83t/s（3） | climate | — |
| 2026-04-04 | SSD code gen 42→55%（4）、Anthropic emotion 171vec 22%（5）、Coding Agent 6模組（5） | education | — |
| 2026-04-03 | Gemma 4 31B Ollama（4）、Qwen3.6-Plus 1M ctx（4）、CC v2.1.91 500K（5）、Ink CLI（4）、claude-brain 67K（5） | legal | — |
| 2026-04-02 | Lemonade NPU 55t/s（3）、Email 防爬蟲 426bot（3） | manufacturing | — |

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
