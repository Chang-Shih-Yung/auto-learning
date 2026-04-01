# Claude Code — Henry's Learning Hub

## 專案說明

Next.js + shadcn/ui + React 的個人學習系統。每天自動抓取 AI 技術文章寫進學習日誌，部署在 Vercel。

## 技術棧

- Framework: Next.js 14 (App Router)
- UI: shadcn/ui + Tailwind CSS
- Content: Markdown → MDX (next-mdx-remote + remark-gfm)
- 字型: Noto Serif JP + Source Code Pro
- Deploy: Vercel (auto-deploy on push to main)

## gstack

所有網頁瀏覽都應使用 gstack 的 `/browse` 技能，永遠不要使用 `mcp__claude-in-chrome__*` 工具。

可用技能：
- `/office-hours` — 產品策略發現
- `/plan-ceo-review` — 執行層面審查
- `/plan-eng-review` — 架構文件審查
- `/plan-design-review` — 設計審查（含 AI slop 偵測）
- `/design-consultation` — 建立設計系統
- `/review` — Code review（找 production-critical bugs）
- `/ship` — 完整 release 流程
- `/land-and-deploy` — 部署到正式環境
- `/canary` — 部署後監控
- `/benchmark` — Core Web Vitals 效能基準
- `/browse` — 真實 Chromium 瀏覽器操作
- `/qa` — E2E 測試（真實瀏覽器）
- `/qa-only` — QA 測試（不修改程式碼）
- `/design-review` — 執行設計審查修復
- `/setup-browser-cookies` — 匯入瀏覽器 session
- `/setup-deploy` — 一次性部署設定
- `/retro` — 週回顧
- `/investigate` — Root cause 分析
- `/document-release` — 文件同步
- `/codex` — OpenAI Codex 交叉 code review
- `/cso` — 安全審查（OWASP / STRIDE）
- `/autoplan` — 自動合併 CEO + 設計 + 工程審查
- `/careful` — 危險操作警告
- `/freeze` — 限制目錄編輯
- `/guard` — careful + freeze 合併
- `/unfreeze` — 解除目錄限制
- `/learn` — 管理 project learnings（review、search、prune、export）
- `/connect-chrome` — 啟動 real Chrome（含 Side Panel 擴充套件）
- `/gstack-upgrade` — 更新 gstack

如果 gstack 技能無法運作，執行：`cd .claude/skills/gstack && ./setup`

## Design System

**Always read `DESIGN.md` before making any visual or UI decisions.**

- All font choices, colors, spacing, and aesthetic direction are defined in `DESIGN.md`
- Do not deviate from the design tokens without explicit user approval
- Key rules:
  - `--color-annotation` (#bf7a26) is **exclusively** for AnnotationCard — do not use elsewhere
  - UI chrome (nav, buttons, labels) uses **Geist Sans**, NOT Noto Serif JP
  - Code/data uses **Geist Mono**
  - Dark mode uses warm darks (#161614), not cold black
- In QA mode, flag any code that doesn't match `DESIGN.md`

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
