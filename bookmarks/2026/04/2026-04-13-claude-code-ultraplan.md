---
title: "Claude Code /ultraplan：網頁建立實作計畫、編輯後一鍵執行"
date: 2026-04-13
url: https://abmedia.io/claude-code-ultraplan-web-implementation-plan?fbclid=IwZnRzaARHVH5leHRuA2FlbQIxMQBzcnRjBmFwcF9pZAo2NjI4NTY4Mzc5AAEer1d7XpPmyUnGjICpzRZJbMCWTZoD3bJrZM4yko_HxcPzmLnqBYC_fZgML8A_aem_SbN6azlfKLHC96CVQzo5Zw
---

來源：[abmedia.io — Claude Code /ultraplan 功能介紹](https://abmedia.io/claude-code-ultraplan-web-implementation-plan?fbclid=IwZnRzaARHVH5leHRuA2FlbQIxMQBzcnRjBmFwcF9pZAo2NjI4NTY4Mzc5AAEer1d7XpPmyUnGjICpzRZJbMCWTZoD3bJrZM4yko_HxcPzmLnqBYC_fZgML8A_aem_SbN6azlfKLHC96CVQzo5Zw)

你現在可以在瀏覽器裡用 `/ultraplan` 指令讓 Claude Code 生成一份完整的實作計畫，在網頁介面上自由編輯、調整順序、修改細節，確認後一鍵送回 terminal 執行——token 用量和原本的 `/plan` 相同、不額外消耗，開放給所有啟用 Claude Code web 的用戶 preview。功能上線首日，quota 在 30 分鐘內就被用光。

`/ultraplan` 的設計邏輯來自 product lead trq212 的一句話：「規劃可以在雲端完成，因為它主要是讀取程式碼和理解意圖；實作則需要本地環境和互動性。」之前的 `/plan` 把計畫輸出在 terminal 裡，視覺上難以總覽和編輯——現在計畫生成移到 web，你可以在視覺化介面上看到完整的步驟樹，修改任何一個步驟後再交回 terminal 執行，等於把「思考空間」和「執行空間」徹底分開。

以前 Claude Code 的規劃過程是個黑盒子——你送出任務，它直接開始跑，你不知道它接下來要做什麼，也沒辦法在中間介入調整方向。現在 `/ultraplan` 讓你在執行前看到完整的計畫並擁有編輯權，社群用戶的反應是「終於覺得 Claude 不像黑盒子，更像一個先和你討論再動手的資深開發者」。規劃和執行分離，是 AI coding 工具走向「可信賴的協作者」的一步。

---

## 使用方式

```bash
# 在 Claude Code web 介面（claude.ai/code）輸入：
/ultraplan 幫我把 Nexus 的 Button 元件加上 loading state 和 disabled 樣式

# 流程：
# 1. Claude 在網頁介面生成完整實作計畫（步驟清單）
# 2. 你在瀏覽器中編輯、調整、確認計畫
# 3. 確認後一鍵送回 terminal 開始執行
```

**注意事項：**
- 需要啟用 Claude Code web（claude.ai/code）才能使用
- Token 用量與 `/plan` 相同，不額外計費
- Rate limit 與現有 `/plan` 訂閱限制一致
- 目前為 open preview，所有 web 用戶可用

<AnnotationCard
  relevance={5}
  skills={["ai-workflow", "ai-agents"]}
  adjacent="Claude Code web planning API"
  adjacentNote={"你已在 Claude_auto 設計 learning-context.md 的 research-first 分階段工作流 → 下一步：把 /ultraplan 用在 Nexus 元件庫的新功能規劃上，讓 Claude 先在 web 生成實作計畫，你確認架構決策後再執行，把目前的 session-based 工作流升級為有明確規劃節點的流程。"}
  connection={"你在 Claude_auto 每天跑的排程任務本質上就是『預定義計畫的執行』——/ultraplan 把這個計畫從固定腳本變成可互動調整的動態步驟，直接強化你的 AI coding 工作流。"}
/>
