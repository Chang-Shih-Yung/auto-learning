# Session Log

> 這個檔案是唯一允許 Claude 自行寫入的 memory 檔案。
> `learning-context.md` 是鎖定的，禁止修改。

---

## 近期討論紀錄

> 規則：每次 session 自我優化時，只保留最近 **14 天**的紀錄，超過 14 天的條目自動刪除。

| 日期 | 文章（relevance≥4） | News domain | 備注 |
|------|---------------------|-------------|------|
| 2026-05-03 | WUPHF 826★多agent共享辦公室markdown+git wiki+per-agent notebook 97%cache hit每輪87k平vs業界484k累積 5輪Claude Code$0.06 idle 0token Go push-driven broker MCP 4→27動態scope（5）、VS Code Copilot Co-author自動注入PR#310226 git.addAICoAuthor預設off→all即使disableAIFeatures=true也注入trailer 697點HN Microsoft鎖串1.119修 揭示AI介入率不能由執行層自我回報（4）、Context Gateway 596★Apache-2.0 proxy層SLM classifier壓縮tool output pre-compact at 85% capacity <0.5s延遲 GPT-5.4 32k 97.2%→1M 36.6% Claude Code/Cursor/OpenClaw 把context治理當基礎建設（5）、Pu.sh 396行shell coding agent harness 37KB vs Claude Code 209MB/SWE-agent 1.8GB差5萬倍 7tools+REPL+auto-compact+JSONL log MIT雙providers 30+實驗逼出最portable harness是shell（4） | — | 洞察：AI infra 的工程瓶頸已從「模型多強」搬到「context infra 怎麼設計」——三條線索（git-tracked wiki / proxy SLM / shell-only harness）匯流到同一個共識；VS Code 反面教材：稽核訊號不能由執行層自我回報 |
| 2026-05-02 | CC v2.1.126 /model吃gateway /v1/models+OAuth終端貼code+project purge+PowerShell主shell+deferred/plan-mode subagent修復（5）、NgRx Signals Anthropic Skill評測5任務41斷言通過率84%→100%+16pp 32K vs 19K tokens $0.04/call trigger recall 42.9% plateau（5）、CLI vs MCP Marcelo Experiwall實戰CLI portability勝過MCP結構化MCP多一塊cognitive surface area（5）、Semantic cache 28對query text-embedding-3-small entity swap 0.15-0.74 paraphrase 0.81-0.91 71%hit rate 真正失敗模式是0.80-0.92被0.95閾值擋下（4）、AI Harness Activepieces 7元件always-on 55行+safety reflex 3行+feature doc 60行×40+slash command 30-65行+subagent+MCP+session hygiene first-try 20%→70% 5倍校正下降（5） | — | 洞察：模型已夠強，瓶頸在上下文怎麼餵——always-on/on-demand/slash command三層分工把AI Workflow從工具堆疊變成基礎設施工程；skill需要capability/trigger/cost三軸評測；CLI先MCP後是務實順序 |
| 2026-04-28 | CC v2.1.121 MCP alwaysLoad熱工具不defer+plugin prune+/skills邊打邊濾+PostToolUse output replace+image/usage memleak修復（5）、Dirac OSS coding agent TerminalBench 2.0 65.2% gemini-3-flash vs Google 47.6% $0.18/task -64.8%成本 AST+Hash Anchored edits 635★ 不走MCP（4）、Browser Harness 7.6K★ 592行Python直連CDP self-healing讓LLM runtime改helpers.py（4） | — | 洞察：把決策權搬到正確的位置——alwaysLoad讓server決定哪些工具是熱工具、Hash anchored edit讓決策在AST層而非行號、self-healing讓LLM runtime決定如何補helper；延伸 4-21 推到正確的層 + 4-27 context用來做決策 |
| 2026-04-27 | Cloudflare Code Mode MCP 1.17M→1K token 99.9%↓2500端點雙工具架構（5）、Google Cloud Next 2026 Vertex AI→Gemini Enterprise ADK v1.0 TS穩定+Memory Bank+200模型（4）、GenericAgent 6.1K stars skill tree 6x token效率30K vs 200K五層記憶（4） | — | 洞察：context window 不是用來存歷史的，是用來做決策的——三個工具三種路徑：介面壓縮（CF Code Mode）、框架宣告式（ADK）、記憶晶化（GenericAgent）|
| 2026-04-24 | CC品質退化事後分析3原因47天降級全修復+重置usage（5）、CC v2.1.119 /config持久化+GitLab MR+MCP OAuth修復（5）、GPT-5.5 82.7%TerminalBench+58.6%SWEBench Pro+90.1%BrowseComp agentic全面上線（4）、A2A v1.2 150組織正式環境+crypto agent card（4）、Bitwarden CLI供應鏈攻擊90分鐘npm污染GHA注毒（4）、Honker SQLite pub/sub 325stars 1-2ms delay（3） | — | 洞察：工具可信度需要主動建立——Anthropic透明度=信任、Bitwarden=每個發布步驟要驗證；A2A+GPT-5.5=agentic AI工業化水位；MCP+A2A雙協定才是完整multi-agent骨幹 |
| 2026-04-23 | CC v2.1.118 hooks直接呼叫MCP工具+/usage+自訂主題+vim visual mode（5）、LLM過度編輯400問題測試GPT-5.4重寫整函式minimal edit prompt修正（5）、Show HN Design Slop 500頁面15個AI模式5個以上=重度（4） | biology | 洞察：over-editing = LLM 太勤勞不是太智慧；slop = 沒有設計系統的錨點；hooks+MCP = 宣告式自動化的最後一塊拼圖 |
| 2026-04-22 | CC v2.1.117 embedded bfs+ugrep native binary+CLAUDE_CODE_FORK_SUBAGENT=1+model persistence（5）、Vercel 資安全鏈 Roblox→Lumma Stealer→Context.ai OAuth→$2M勒索（4）、manifest YAML宣告式模型路由 5,483★ 70% cost cut（4）、Ternary Bonsai 1.58-bit 8B 1.75GB 82tok/s 9x壓縮（3） | climate | 洞察：成本歸屬框架——CC→binary、manifest→路由層、Ternary→量化層，Vercel是反例：信任成本留在被遺忘的按鈕上 |
| 2026-04-21 | Claude Code v2.1.116 /resume 67%+MCP deferred loading+plugin auto-install（5）、Qwen3.6-Max-Preview 202模型#2 256k ctx 免費（3）、ggsql SQL視覺化擴充239★alpha（3）、MCP Governance Gap allowlist+audit log+Virtual MCP Server（4） | — | 主題：把複雜度推到正確的層；等待歸零；MCP governance = 下一個必要設計點 |
| 2026-04-20 | Claude Opus 4.7 系統提示詞 工具先行動（5）、Prompt-to-Excalidraw Gemma 4 E2B 30+ tok/s 瀏覽器本地（4）、Claudoscope Claude Code session cost 儀表板 147★（5）、gh skill v2.90.0 跨工具 skills（4）、Vercel 資安事件 sensitive env var（4） | — | 主題：AI 工具可控性；工具先行動設計原則；結構化輸出哲學；供應鏈安全 |
| 2026-04-19 | CC v2.1.114 agent team crash fix（5）、CSS Studio 視覺設計→CSS AI（4） | legal | Colorado AI Act June 2026 高風險AI透明度；CoCounsel autonomous review 40%↓cycle |
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
- **AI Workflow 的成熟度不在工具，在上下文基礎設施**：AI Harness 把整套 codebase 拆成 always-on (55 行架構規則) + on-demand (60 行 feature doc) + slash command (30 行 workflow) 三層；NgRx Signals Skill 用 capability / trigger / cost 三軸把 skill 評測量化成 +16pp 通過率與 $0.04 cost；CLI vs MCP 的 portability vs 結構化 trade-off 把工具設計從「最潮的」改成「最 portable 的」——三條線索匯流到同一個結論：模型已夠強，瓶頸是「給它的 context 是不是有結構、有量測、跨平台 portable」
- **Skill 不是 markdown + 希望，是有 SLA 的工程產物**：以前寫 Anthropic Agent Skill / Claude Code skill 只能靠手感驗收，現在可以跑 5 個任務 + 41 條斷言 + 20 個 trigger prompt 量化通過率、觸發召回率、token 成本——trigger plateau (recall 卡 42.9%) 揭示了 skill 註冊與選擇機制本身的設計題，已經不是 prompt engineering 能修的
- **Context infra 是獨立的工程層，不是模型本身的責任**：WUPHF 把多 agent 共享記憶搬到 git-tracked markdown（每輪平 87k vs 484k 累積、idle 0 token burn）、Context Gateway 把 SLM classifier 架在 proxy 層 pre-compact at 85% capacity（GPT-5.4 從 32k 97.2% 掉到 1M 36.6%）、Pu.sh 把整個 coding agent harness 縮到 396 行 shell（37KB vs Claude Code 209MB）——三條獨立路徑指向同一共識：模型已夠強，「context 怎麼餵、怎麼壓、怎麼搬」是基礎建設工程題；對應的反面教材是 VS Code Copilot 自動注入 Co-Authored-By trailer——當稽核訊號由執行層自我回報，訊號就會被默默污染，所以 AI 介入率必須由獨立稽核層量測
