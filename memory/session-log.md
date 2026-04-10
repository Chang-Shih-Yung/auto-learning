# Session Log

> 這個檔案是唯一允許 Claude 自行寫入的 memory 檔案。
> `learning-context.md` 是鎖定的，禁止修改。

---

## 近期討論紀錄

> 規則：每次 session 自我優化時，只保留最近 **14 天**的紀錄，超過 14 天的條目自動刪除。

| 日期 | 文章（relevance≥4） | News domain | 備注 |
|------|---------------------|-------------|------|
| 2026-04-10 | Claude Code v2.1.98 安全加固 PID sandbox（5）、Research-Driven Agents $29/15%加速（4） | manufacturing | BMW Leipzig 人形機器人、ABB+NVIDIA 99% sim-to-real |
| 2026-04-09 | Claude Managed Agents +10pp task success（5）、Claude Code v2.1.97 Focus View+MCP 50MB/hr leak fixed（5） | biology | Meta Muse Spark 58% HLE Contemplating mode（rel.3 收錄）|
| 2026-04-08 | Glasswing + Mythos Preview 83.1%（5）、Railway Next.js→Vite 10min→2min（4） | finance | GLM-5.1 754B context rot 100k（rel.3 收錄） |
| 2026-04-07 | Claude Code Feb regression（17,871 blocks/5）、Anthropic $30B 3.5GW（4） | design_industry | — |
| 2026-04-06 | CC v2.1.92 Write 60%↑（5）、ctxlint 74%廢話（5）、git worktrees 50%↓（5）、Ghost Pepper STT（3）、Freestyle 700ms VM（4） | healthcare | — |
| 2026-04-05 | Caveman 75%↓（5）、Gemma 4 51t/s 18GB（4）、Parlor M3 83t/s（3） | climate | — |
| 2026-04-04 | SSD code gen 42→55%（4）、Anthropic emotion 171vec 22%（5）、Coding Agent 6模組（5） | education | — |
| 2026-04-03 | Gemma 4 31B Ollama（4）、Qwen3.6-Plus 1M ctx（4）、CC v2.1.91 500K（5）、Ink CLI（4）、claude-brain 67K（5） | legal | — |
| 2026-04-02 | Lemonade NPU 55t/s（3）、Email 防爬蟲 426bot（3） | manufacturing | — |
| 2026-03-31 | CC v2.1.88 PermissionDenied（5）、Cursor 2.5 35%merge（4）、Long-Horizon supervised（5）、Ollama MLX +93%（4）、axios RAT（4）、Universal CLAUDE.md 63%↓（5） | biology | W13 showcase: PermissionDenied Hook 模擬器 |
| 2026-03-30 | Figma MCP write（5）、Cloudflare Turnstile 55prop（4）、MCP 97M（5） | climate | — |
| 2026-03-29 | HumanLayer HITL（5）、Magnitude 7行測試（4）、Chroma Rust 4x（4）、CSS DOOM（3） | finance | push 失敗（osxkeychain）|
| 2026-03-28 | jai isolation（4）、CC v2.1.86（5）、3-agent Mastra（4）、Next.js Turbopack（3） | healthcare | — |

---

## 重要洞察記錄

> 值得記住的核心概念，跨 session 保留

- **Context Window = RAM，Filesystem = Disk**：重要資料要寫到磁碟，不能只存在 context 裡
- **這些架構的價值不是解鎖能力，是約束失敗模式**：AI 傾向「完成」而不是「正確地完成」
- **Long-running 的核心是交接零成本**：問題從來不是怎麼讓 session 撐更久
- **UI.SH 的產品論述**：展示問題（50次迭代才能達到專業水準）→ 賣解法（預先打包設計原則）
- **個人化 = 標註，不是過濾**：保留所有文章，用 AnnotationCard 說明「這篇與你的關係」
