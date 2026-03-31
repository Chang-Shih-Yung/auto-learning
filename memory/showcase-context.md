# Showcase 週成果生成 Context

> 此檔案由 `learning-context.md` Step 7 觸發執行。條件：今天是週一 + 上週日誌 ≥ 5 篇。每週執行一次（冪等）。

---

## 前置確認

YEAR 和 WEEK（上週週數）已由 learning-context.md Step 7 計算完成並傳入。再次確認：

```bash
YEAR=$(date +%Y)
CURR_WEEK=$((10#$(date +%V)))
if [ "$CURR_WEEK" -le 1 ]; then
  YEAR=$((YEAR - 1))
  WEEK=$(date -j -f "%Y-%m-%d" "$YEAR-12-31" +%V 2>/dev/null || date -d "$YEAR-12-31" +%V)
else
  WEEK=$(printf "%02d" $((CURR_WEEK - 1)))
fi
echo "目標週（上週）：$YEAR/W$WEEK"
```

---

## Step 1：讀取上週日誌，提取技術信號

用 Glob 工具找出 `journal/$YEAR/**/*.md` 的所有檔案，**只保留檔名（YYYY-MM-DD）落在上週範圍（週一至週日）內的條目**（可用週一日期 ≤ 檔名 ≤ 週日日期判斷）：

```
journal/$YEAR/**/*.md
```

對每篇找到的 `.md` 檔，用 Read 工具讀取內容，提取所有 `<AnnotationCard />` 的資訊：
- `relevance`（數字 1-5）
- `skills`（陣列，技能 ID）

**入選標準：** `relevance >= 4` 的文章才列入 showcase 生成考量。
若本週沒有任何 `relevance >= 4` 的文章，改用 `relevance >= 3`。

記錄每篇入選文章的檔名（如 `2026-03-24.md`）和標題（frontmatter `title` 欄位）。

---

## Step 2：讀取歷史 showcase（跨週合成素材）

用 Glob 工具搜尋：

```
showcase/*/W*/meta.json
```

若找到 0 個檔案（第一次生成）：跳過跨週合成，`cross_week_reference` 設為 `[]`。

若找到檔案：用 Read 工具讀取最近 2-3 個 meta.json，記錄：
- `week`（週數）
- `skills_extracted`（該週技能）
- `synthesis_note`（一句話摘要）

**跨週合成條件：** 找出與本週 `skills_extracted` 有語義重疊的歷史週。「語義重疊」包含：
- 完全相同的 skill ID（如都有 `mcp`）
- 相關概念（如 `ai-agents` + `async-tasks`）
- 工具鏈的不同環節（如 `figma` + `design-tokens`）

---

## Step 3：選定主題與 demo 類型

**主題選定規則：**

1. 從 Step 1 入選文章中，找出重複出現或語義相關的 skill cluster
2. 若 Step 2 發現跨週交集，優先以交集 skills 為主題
3. 選一個「可以互動展示」的切入點

**Demo 類型選擇（按優先順序）：**

| 類型 | demo_type | 適用情境 |
|---|---|---|
| 協議模擬器 | `protocol-simulator` | MCP、API、agent 流程 |
| 演算法視覺化 | `algorithm-visualizer` | 資料結構、排序、搜尋 |
| 參數調控器 | `parameter-explorer` | 模型參數、設計 token |
| 概念地圖 | `concept-map` | 知識關聯、技術生態 |
| 互動問答 | `interactive-quiz` | 工具比較、概念理解 |
| 文字總結 | `text-summary` | 無法做互動 demo 時的 fallback |

**synthesis_note（50-100 字，3-5 句）：**
說明：你讀了哪些文章、發現了什麼技術關聯、為什麼選擇做這個 demo。
不要超過 100 字。用第一人稱。

---

## Step 4：生成 demo.html

生成一個**完全自包含**的 HTML 檔案，須符合以下所有規則：

**硬性規則（違反 → 重生成）：**
- ❌ 禁止任何外部 URL（`https://`、`http://`）
- ❌ 禁止 `localStorage`、`sessionStorage`（iframe sandbox 不支援）
- ❌ 禁止 `fetch()`、`XMLHttpRequest`（iframe sandbox 封鎖網路）
- ❌ 禁止引用任何 CDN 資源

**技術規範：**
- ✅ 純 vanilla JavaScript + HTML + CSS（全部內嵌在單一 `.html` 檔）
- ✅ 所有狀態用 in-memory JS 變數（`const state = { ... }`）
- ✅ Canvas API 可用（如需圖形）
- ✅ 動畫目標 30fps（避免 `requestAnimationFrame` 密集計算）

**視覺規範（符合站點設計系統）：**
- 背景色：`#fdfcfa`（暖白）
- 主要文字：`#1a1a18`
- 品牌綠：`#3d6b5e`（按鈕、active 狀態）
- 字型：直接用 system font stack（`-apple-system, sans-serif`）+ `monospace`
- 無需載入 Noto Serif JP（iframe 環境，system font 即可）

**互動規範：**
- 有明確的使用者操作目標（「點擊這個按鈕看看會發生什麼」）
- 有視覺回饋（狀態變化、顏色、文字更新）
- 可以在 500px 高度的 iframe 內完整使用

---

## Step 4.5：驗證 demo.html

生成後，立即執行以下驗證：

```bash
# 1. 確認無外部 URL（允許最多 2 次重試）
grep -c 'https\?://' public/showcase/$YEAR/W$WEEK/demo.html && echo "FAIL: 找到外部 URL" || echo "PASS"

# 2. 確認檔案大小合理
SIZE=$(wc -c < public/showcase/$YEAR/W$WEEK/demo.html | tr -d ' ')
echo "檔案大小：$SIZE bytes"
[ "$SIZE" -lt 500 ] && echo "FAIL: 檔案太小（可能是空的）"
[ "$SIZE" -gt 500000 ] && echo "FAIL: 檔案太大（超過 500KB）"
```

**若 FAIL：**
- 重新生成（最多嘗試 2 次）
- 第 3 次仍 FAIL：設 `demo_available: false`，不寫入 demo.html

---

## Step 5：寫入檔案

### 5a. 建立目錄

```bash
mkdir -p showcase/$YEAR/W$WEEK
mkdir -p public/showcase/$YEAR/W$WEEK
```

### 5b. 寫入 meta.json

用 Write 工具寫入 `showcase/$YEAR/W$WEEK/meta.json`，格式如下：

```json
{
  "year": 2026,
  "week": "W13",
  "week_start": "2026-03-24",
  "week_end": "2026-03-30",
  "articles_read": ["2026-03-24.md", "2026-03-25.md"],
  "articles_read_titles": ["文章標題一", "文章標題二"],
  "skills_extracted": ["mcp", "async-tasks", "ai-agents"],
  "skills_used_in_demo": ["mcp", "async-tasks"],
  "cross_week_reference": ["W12"],
  "synthesis_note": "本週閱讀了 MCP async task pattern 相關文章，發現它與 W12 的 HumanLayer 有相同的「等待人類確認」模式。決定做一個協議模擬器，讓使用者體驗 AI agent 如何在長時任務中暫停等待核准。",
  "demo_type": "protocol-simulator",
  "demo_available": true,
  "demo_title": "Async Agent + Human Approval 模擬器",
  "generated_at": "2026-03-30T14:00:00Z"
}
```

**格式規則：**
- `week`：零補齊兩位數（`W01` 到 `W53`，不可寫 `W1`）
- `week_start`：ISO 日期，本週一
- `week_end`：ISO 日期，本週日
- `synthesis_note`：50-100 字，3-5 句，第一人稱
- `generated_at`：當前 UTC 時間，ISO 8601 格式

### 5c. 寫入 demo.html（若 demo_available: true）

用 Write 工具寫入 `public/showcase/$YEAR/W$WEEK/demo.html`。

---

## Step 6：Commit + Push

```bash
git add showcase/$YEAR/W$WEEK/meta.json
git add public/showcase/$YEAR/W$WEEK/demo.html 2>/dev/null || true
git commit -m "showcase: $YEAR/W$WEEK $(jq -r .demo_title showcase/$YEAR/W$WEEK/meta.json 2>/dev/null || echo 'weekly showcase')"
git push origin main
```

---

## 完成確認

執行完畢後，確認：
- `showcase/$YEAR/W$WEEK/meta.json` 存在
- 若 `demo_available: true`：`public/showcase/$YEAR/W$WEEK/demo.html` 存在
- commit 已 push 至 main
