# 學習 Context 追蹤

> 這個檔案追蹤 Henry 目前的學習狀態與進度，每次 session 結束後更新。

---

## 當前學習重點

| 主題 | 狀態 | 備註 |
|------|------|------|
| SQL 與資料查詢 | 🟡 進行中 | 補強數據中台端的查詢能力 |
| AI Agent 工作流 | 🟢 積極學習 | Claude Code、Long-running Agent |
| 雲端/容器技術 | 🟡 進行中 | - |
| 前端設計系統 | 🟢 已有實戰 | Nexus 元件庫、Tailwind CSS |
| 數據視覺化 | 🟢 已有實戰 | ECharts、Dashboard 設計 |

---

## 近期討論紀錄

### 2026-03-25
- 討論 Steve Schoger Claude Code 設計工作流（UI.SH 產品論述）
- 深入討論 Long-running Agent 的真正意涵：不是 session 跑很久，是交接零成本
- 討論 Planning-with-files、Multi-Agent 角色化、多層 Review 架構
- 建立 Claude_auto 自我學習系統（本次 session）

---

## 待深入探索的主題

- [ ] planning-with-files skill 實際操作
- [ ] gstack 工作流（CEO/工程 Manager/Staff Engineer 角色）
- [ ] Cross-model review（Claude + Codex 雙模型）
- [ ] Tailwind CSS 進階設計技巧（outer ring、concentric radius、canvas grid）
- [ ] SQL 查詢練習（結合數據中台概念）

---

## 重要洞察記錄

> 值得記住的核心概念，跨 session 保留

- **Context Window = RAM，Filesystem = Disk**：重要資料要寫到磁碟，不能只存在 context 裡
- **這些架構的價值不是解鎖能力，是約束失敗模式**：AI 傾向「完成」而不是「正確地完成」
- **Long-running 的核心是交接零成本**：問題從來不是怎麼讓 session 撐更久
- **UI.SH 的產品論述**：展示問題（50次迭代才能達到專業水準）→ 賣解法（預先打包設計原則）

---

*最後更新：2026-03-25*
