---
title: "Gemma 4 模型命名全解：架構、模態、部署規模與訓練階段四維選型指南"
date: 2026-04-13
note: "現在的專案有用到 google/gemma-4-26B-A4B-it 跟 google/gemma-4-31B-it，這篇有助於更了解模型的能耐與用法邊界"
---

你現在在用的 `google/gemma-4-26B-A4B-it`，推論時只啟動 40 億參數（A4B = Active 4 Billion），速度接近 4B 等級模型，卻能調用完整 26B 的知識庫——適合高頻呼叫、對延遲敏感的 Agent 流程。`google/gemma-4-31B-it` 是稠密架構，所有 33B 參數全部啟動，適合需要細緻邏輯推導的核心任務，例如複雜原始碼生成或系統架構規劃。兩個模型都有 `-it` 後綴，代表已完成指令微調與人類偏好對齊，開箱即用、直接寫入 system prompt 驅動 agent。

Gemma 4 的命名邏輯由四個維度組成：**架構**（Dense 全量啟動 vs MoE 路由啟動）、**模態**（31B/26B 家族支援 Image-Text-to-Text、E 系列支援 Any-to-Any）、**部署規模**（旗艦 31B/26B 跑企業 GPU、E4B ≈ 8B 跑高階個人電腦、E2B ≈ 5B 跑手機/嵌入式）、**訓練階段**（無後綴 = base 基礎模型供 fine-tune、`-it` = 指令微調版直接可用）。`26B-A4B` 的 MoE 靠 Gating Network，每次推論動態選出最相關的 4B 參數，背後仍有完整 26B 知識深度；`31B` 的 Dense 是全員出動，VRAM 需求更高但邏輯推導更細緻。

以前選模型靠「越大越好」的直覺——31B 一定比 4B 強。現在 MoE 打破了這個線性關係：`26B-A4B` 在高頻 Agent 任務上算力消耗接近 4B，知識厚度卻有 26B，比 `31B` 更省、更快。選型邏輯從「最大的」變成「適材適所」：深度規劃與複雜推導用 `31B`、高頻 Agent 自動化用 `26B-A4B`、個人本地開發用 `E4B`、離線隱私邊緣設備用 `E2B`。

---

## 使用方式

### 模型選型速查

| 模型 | 架構 | 啟動參數 | 適合場景 |
|------|------|---------|---------|
| `gemma-4-31B-it` | Dense | 33B 全啟動 | 複雜規劃、深度推導、架構設計 |
| `gemma-4-26B-A4B-it` | MoE | 4B（路由） | 高頻 Agent、低延遲自動化 |
| `gemma-4-E4B-it` | Any-to-Any | ~8B | 本地開發、氛圍 coding |
| `gemma-4-E2B-it` | Any-to-Any | ~5B | 手機離線、嵌入式邊緣 |

### 命名規則解碼

```
google/gemma-4-{規模}-{架構後綴}-{訓練後綴}

規模：31B = 33B Dense | 26B = 27B MoE | E4B ≈ 8B Edge | E2B ≈ 5B Edge
架構後綴：A4B = Active 4 Billion（MoE 啟動參數量）
訓練後綴：it = instruction-tuned（無後綴 = base model）
```

### 兩個模型的使用邊界（你的專案）

```python
# 31B-it：複雜任務、一次性深度推導
# ✅ 適合：系統架構規劃、複雜 bug 分析、多步驟邏輯鏈
# ❌ 不適合：高頻呼叫（VRAM 高、推論慢）

# 26B-A4B-it：高頻 Agent 自動化
# ✅ 適合：Agent loop 內的工具選擇、頻繁呼叫的 RAG 檢索、低延遲對話
# ❌ 不適合：需要極細緻全域邏輯的單次複雜推導
```

<AnnotationCard
  relevance={4}
  skills={["ai-agents", "ai-workflow"]}
  adjacent="MoE Gating Network token routing"
  adjacentNote={"你已在用 26B-A4B-it 和 31B-it → 下一步：研究 MoE gating network 的 token routing 機制，理解哪種 prompt 結構更能觸發「正確的 expert」，讓 26B-A4B 在你的 agent loop 裡發揮最大效益、降低 hallucination 率。"}
  connection={"你的專案同時用了 MoE（26B-A4B）和 Dense（31B）兩種架構——這份選型知識幫你劃出明確邊界：複雜規劃交給 31B 全量推理，高頻 agent 呼叫交給 26B-A4B 路由啟動，兩者組合是企業級 AI 工作流的標準配置。"}
/>
