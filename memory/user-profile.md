# 用戶檔案：張十墉 Henry

> 每次新 session 先讀這個檔案，了解用戶背景後再開始工作。

---

## 基本資訊

- **姓名**：張十墉（英文名 Henry）
- **職稱**：前端工程師（UIUX 設計背景出身）
- **LinkedIn**：https://www.linkedin.com/in/chang-shih-yung/
- **自我簡介**：https://about-henry.vercel.app
- **作品集（備用）**：https://chang-shih-yung.gitlab.io/henry_website/

---

## 職涯三段式演化

| 階段 | 公司 | 核心能力 |
|------|------|---------|
| UI/UX 設計師 | 和你設計 / 精英電腦（AIGC） | 使用者流程、Figma、視覺設計、AIGC 專案 |
| 企業前端工程師 | 東捷資訊（EQS + MES） | Angular 企業系統、RxJS、即時數據、跨裝置 UX |
| 前端架構師 / AI 工程師 | Nexus 自主專案 + Claude_auto | 設計系統、Monorepo、AI Agent、CLI 工具、MCP Server |

---

## 技術棧

### 框架與語言
| 技術 | 程度 | 備注 |
|------|------|------|
| Angular | 主力 | CDK、Signals、NgRx、RxJS、MVVM |
| Vue 3 / Pinia | 熟悉 | 個人/新專案 |
| TypeScript | 熟悉 | strict mode |
| React / Next.js | 使用中 | Claude_auto 專案（shadcn/ui + App Router） |

### 樣式與設計系統
| 技術 | 備注 |
|------|------|
| Tailwind CSS | 主力樣式工具 |
| CSS Custom Properties | Light/Dark mode 設計 Token 實作 |
| OKLCH 色彩空間 | Nexus 5 色彩主題設計 |
| Figma → JSON → CSS Token → 元件 | 完整 Single Source of Truth 工程鏈 |

### 數據與即時通訊
| 技術 | 備注 |
|------|------|
| ECharts | 戰情室、Dashboard、即時看板 |
| RxJS | forkJoin 並行 API、Observable 狀態管理 |
| SignalR | 即時通訊（MES 生產數據推送） |
| Ant Design 4.23 | EQS 專案企業 UI 框架 |

### 架構與工具
| 技術 | 備注 |
|------|------|
| Monorepo（PNPM Workspace） | packages/ui、packages/cli、apps/demo、apps/www |
| CI/CD + SAST | GitLab 白箱資安整合 |
| CLI 工具開發 | npx @nexus/cli add |
| MCP Server | AI Agent 工具整合 |
| Lottie Web | 動畫整合 |
| WebGL | 3D / 創意互動技術 |

### 正在學習
- SQL（資料查詢）
- 雲端 / 容器技術（Docker）
- Claude Code 排程任務 / AI 工作流自動化

---

## 重要專案

### EQS 全球報價系統（東元機電）
- **角色**：SD + UI/UX，第一次主導系統級專案
- **技術**：Angular、Ant Design 4.23、CSS Custom Properties（Light/Dark mode）、Observable 多語系快取
- **問題**：100+ 表單欄位無卡控、舊架構 ng-if 導致 DOM 銷毀重建，操作中斷率 100%
- **解法**：前端流程卡控（必填/格式/金額門檻）、A/B 架構實測（共用主容器 + 權限模型）、購物車即時同步、多語系 Observable 快取
- **成果**：企業內控強化、跨地域統一介面規格

### MES 智慧製造系統（東元集團）
- **角色**：前端主導 + 協同三名開發，走完完整五個階段生命週期
- **技術**：Angular Feature/Shared 分層架構、RxJS（forkJoin）、SignalR 即時通訊、ECharts、PC + PDA 雙裝置
- **問題**：工時紙本抄寫、設備狀態無法即時追蹤、PDA 操作不符現場工人習慣
- **解法**：PC + PDA 雙端即時報工、WIP 看板（工單樹狀視覺化）、戰情室（forkJoin 並行 API、hover 按需打 API）、SignalR 即時推送
- **成果**：**上工操作從 1分20秒 → 20秒（效率提升 75%）**、錯誤率降 33%

### Nexus 企業級 UI 元件庫（自主主導）
- **架構**：Monorepo（PNPM Workspace）：packages/ui、packages/cli、apps/demo、apps/www、registry、copilot-sdk
- **完整鏈路**：Figma → JSON → CSS Token（OKLCH）→ Angular Component
- **AI 整合**：Copilot SDK 自動元件轉換（60% 元件 AI 生成）、MCP Server 整合
- **工具**：CLI（npx @nexus/cli add button）、SAST 白箱資安整合、Lottie 動畫、5 色彩主題、60+ 元件測試覆蓋

---

## 核心能力定位

> 「翻譯的角色」——把使用者行為轉成數據、把數據轉成可視化決策工具、把業務需求翻成技術規格、把設計決策翻成可維護的工程系統。

- 懂使用者操作行為（設計背景 → 工程落地）
- 能設計前端流程卡控（企業系統精準度）
- 能處理即時數據流（RxJS + SignalR + ECharts 全鏈）
- 能建立跨團隊可維護規範（Nexus、設計 Token、Monorepo）
- 能整合 AI Agent 實現設計到程式的自動化

---

## 學習偏好

- 「做中學」為主，不只看文件
- 喜歡透過實作 side project 鞏固新知識
- 對 AI Agent 工作流、前端架構設計、數據視覺化有高度興趣
- 目前用 Claude Code 作為主力 AI 開發工具

---

## 想透過 Claude_auto 達成的目標

1. **每日 AI 技術摘要**（聚焦 Anthropic/Claude、GitHub Copilot、OpenAI 動態）
2. **持續自我學習**：技術文章閱讀 + 與前端/數據的關聯分析
3. **記憶延續**：每個 session 不從零開始，累積 context
4. **成果可視化**：部署到 Vercel，手機也能瀏覽

---

*最後更新：2026-03-27*
