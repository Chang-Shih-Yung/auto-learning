# 學習 Context 追蹤

> 這個檔案是每次 session 的方向指引，同時追蹤 Henry 目前的學習狀態。每次 session 結束後更新。

---

## 核心工作流

每次 session 依照以下步驟執行：

   **幂等性檢查（每次 run 第一步）：**
   確認今天的 journal 檔案 `journal/YYYY/MM/YYYY-MM-DD.md` 是否已存在。
   若已存在，代表今日 session 已執行過，**跳過 Steps 1–4，直接進入 Step 5**。

1. **用 Read 工具讀取 `memory/sources.yaml`**，然後依照以下順序抓取（WebFetch / WebSearch）：
   1. GitHub Trending（weight: high，最多取 5 筆）
   2. HN Top Stories（weight: high，最多取 5 筆）
   3. HN AI Discussion（weight: medium，最多取 2 筆）
   4. GitHub Releases tracked repos（weight: medium，每個取最新 1 筆）
   5. ProductHunt AI/Dev（WebSearch 為主，最多取 3 筆）
   6. Reddit r/webdev top（先抓，最多取 2 筆）
   7. Reddit r/MacApps top（r/webdev 完成後再抓，最多取 2 筆，避免 rate limit）
   8. dev.to AI/Webdev top（最多取 2 筆）

   套用 content_filters：優先選有 repo / demo / 實際使用的內容，排除純公告。
   若任何來源抓取失敗，改用 fallback 中定義的 WebSearch query。

   **去重參考（每次 run 必做）：**
   用 Read 工具讀取 `memory/session-log.md`，掌握最近 14 天已整理過的工具與文章脈絡。
   根據 session-log 的內容，自行判斷候選條目是否值得寫：
   - 相同工具的全新版本 → 值得寫
   - 相同工具但全新使用角度 → 值得寫
   - 14 天內已整理過的相同工具相同角度 → 跳過
   不需要機械式比對，用 session-log 提供的脈絡做聰明判斷。
2. **整理與消化** — 分兩個子步驟：

   **2a. 入選過濾**（先判斷要不要寫，再動筆）
   先用 Read 工具讀取 `memory/user-profile.md` 取得 Henry 的職涯背景與專案脈絡。
   對每個候選條目，用這個框架判斷是否入選：「因為 Henry 已經會 X，這件事讓他可以 Y」（X 必須對應 Henry 的實際技能或專案經驗）。
   - 無法套進框架的條目（即無法連結到 Henry 的技能樹或工作流）→ **直接跳過，不寫**
   - 官方公告可以入選，但必須能轉換成應用層語言；純宣傳、純政策敘述一律排除
   - 找不到具體數字的條目 → **直接跳過，不寫**

   **2b. 寫作格式**（通過 2a 的條目才進入此步）
   每篇文章用**三段結構**寫，缺任何一段就不收：

   - **第一段：你能做什麼**
     從使用者視角出發，說明用你的具體設備 / 場景能做到什麼。必須有具體數字（記憶體大小、速度倍數、token 數、時間等）。禁用「開發者可以…」，換成「你可以…」或指名設備/職業。

   - **第二段：背後怎麼運作**
     用一段話解釋技術機制——讓讀者理解「為什麼這件事現在變得可能」。不需要教學，只需要說清楚原理讓數字有說服力。

   - **第三段：這改變了什麼**
     Before → After 的世界觀轉換。「以前需要 X（工作站 / 訂閱 / 上傳資料）→ 現在 Y（MacBook / 免費 / 本地跑）」。結尾可以是使用者感受（風扇不狂轉、資料不外洩）。

   篇數不設上限，以質量為門檻。

   對標品質範例：
   > Atomic Chat 內建 Google TurboQuant 技術，讓你在 16GB 的 Mac 上跑 Qwen3.5-9B 這種等級的模型，context window 直接開到 50,000 tokens——同樣的記憶體，換來 3 倍大的上下文、3 倍快的處理速度。20,000 字的文件，幾秒內摘要完畢，風扇不狂轉、記憶體不爆表。
   >
   > 這背後是 Google 的技術在撐腰。Google TurboQuant 把 KV cache 壓縮 6 倍、推理速度提升 8 倍，量化到 3-bit 卻零精度損失——以前要跑這種規模的 AI，你需要一台配備大顯卡的工作站，或是花錢租 Google 的雲端算力。
   >
   > 現在，同樣來自 Google 的技術，直接跑在你的 MacBook 上。一次下載，永久免費，所有運算留在你的機器上，沒有訂閱、沒有雲端、沒有資料外洩的風險。
3. **讀取技能分類表並加上個人化標註** — 步驟如下：
   a. 使用 Read 工具讀取 `memory/skill-taxonomy.yaml`（不是 user-profile.md）
   b. 對每篇文章，依照下方的相關度評分標準（1–5）打分
   c. 找出匹配的技能 ID（用 `id` 欄位，例如 `"figma"` 而非 `"Figma"`）
   d. 提出一個延伸探索方向（`adjacent`），加上一句說明（`adjacentNote`）
   e. 寫一句說明這篇文章如何連結到 Henry 既有知識的句子（`connection`）
   f. 在每篇文章內容結束後插入 `<AnnotationCard />` 區塊（格式見下方）
4. **寫進 journal** — 檔案路徑：`journal/YYYY/MM/YYYY-MM-DD.md`
   - 先執行 `mkdir -p journal/YYYY/MM` 確保資料夾存在
   - 路徑用 `journal/`，不是 `學習日誌/`
   - 每篇文章後插入 AnnotationCard（格式見下方）
   - 最後必須有「今日總結」區塊，整合當天的洞察與應用點
   - **寫完後立即用 Read 工具重新讀取剛寫入的檔案，逐一確認每個 `<AnnotationCard />` 的 `{` `}` 對稱、字串閉合，確認無誤才繼續**（MDX 解析錯誤會中斷 Vercel build）
   - 然後執行：
     ```bash
     git add journal/
     git commit -m "daily: YYYY-MM-DD AI tech digest"
     git push origin main
     ```
5. **自我優化迴圈** — session 結束後，**只允許修改 `memory/session-log.md`**：
   - 在「近期討論紀錄」開頭插入今日條目，刪除超過 14 天的舊條目
   - 若有值得跨 session 保留的洞察，追加至「重要洞察記錄」

   **🔒 禁止修改 `learning-context.md` 本身**（包含 Steps 1–6、AnnotationCard 格式、評分標準、任何規則性描述）。此檔案的任何修改都必須由 Henry 明確指示。

   若 Henry 的技能升級（例如 SQL 從 `learning_now` 畢業），更新 `memory/skill-taxonomy.yaml`，並同步 `src/data/skills.yaml`（只同步 `id` + `label`，不含 `note`）。

   自我優化修改完成後，執行：
   ```bash
   git add memory/session-log.md
   git commit -m "memory: YYYY-MM-DD session log"
   git push origin main
   ```

6. **AI 世界新聞生成** — journal 完成後，讀取 `memory/news-context.md`，按照其步驟獨立生成今天的跨域 AI 新聞條目，寫進 `news/`，單獨 commit 並 push。

---

## 相關度評分標準（1–5）

在 prompt 中使用這個標準，確保每次 session 的評分一致：

| 分數 | 意義 |
|------|------|
| 1 | 無關領域 — 與 Henry 的技能或興趣無實質關聯 |
| 2 | 邊緣相關 — 同樣是 AI/前端產業，但無直接技能重疊 |
| 3 | 相鄰 — 涉及 Henry 正在學習的技術（SQL、containers）或可應用的概念 |
| 4 | 直接相關 — 觸及現有技能（Angular、Vue、Figma、ECharts、CI/CD、AI agents） |
| 5 | 核心命中 — 直接推進 Henry 正在主攻的專案目標或技能 |

---

## AnnotationCard MDX 格式

每篇文章結束後（`---` 分隔線之前）插入以下格式。**所有含有中文的字串屬性必須使用 `={"..."}` 語法**，不可使用單引號或裸字串，避免 MDX 解析錯誤。

```mdx
<AnnotationCard
  relevance={4}
  skills={["figma", "angular", "ai-agents"]}
  adjacent="Claude MCP + Figma API"
  adjacentNote={"你已懂 Figma → JSON → Token 流程。下一步：研究 Figma MCP plugin，讓 Claude 直接讀 node-id 並輸出 Angular component。"}
  connection={"Claude Computer Use 直接打中你的 design-to-code 工作流——未來可能省去 Figma 手動 export 這一步。"}
/>
```

**屬性規則：**
- `relevance`：數字 1–5，依上方標準
- `skills`：使用 `skill-taxonomy.yaml` 中的 `id` 欄位（小寫、連字號格式，如 `"figma"`、`"ai-agents"`）
- `adjacent`：一個延伸技能名稱（可以是 YAML 以外的新技能）
- `adjacentNote`：一句話，說明從 Henry 既有知識出發，怎麼走到這個延伸方向（**前瞻**）
- `connection`：一句話，說明這篇文章如何連結到 Henry 既有的工作經驗（**回顧**）

**輸出前驗證：** 在寫入日誌檔案之前，請確認每個 `<AnnotationCard />` 區塊中所有 `{` 和 `}` 都對稱配對，所有 `="..."` 字串都有正確閉合，避免 MDX 解析失敗導致 Vercel 部署中斷。

> **重要：** `next-mdx-remote` 預設會 block JS 表達式（`blockJS: true`），導致 `relevance={4}` 等 `{...}` 格式的屬性被靜默刪除。本專案已在 `[...slug]/page.tsx` 設定 `blockJS: false`，請勿移除此設定，否則所有數值與陣列屬性將失效。

---

## 學習方向

每次 session 的學習方向請直接參照 `user-profile.md` 裡 Henry 的技術背景與技能樹，不在此重複定義。技能的機器可讀版本在 `skill-taxonomy.yaml`，prompt 讀取技能資料時以 YAML 為準。

## 特別關注主題

- **Code ↔ Design 雙向流（高優先）**：Claude/AI agent 與 Figma 的雙向整合、MCP plugin for design tools、AI 輔助 design token 同步、design spec to code 自動化、Figma → code → Figma 的 round-trip 工作流。凡觸及這個方向的文章，relevance 至少 4，connection 要特別說明可如何套用到 Henry 現有的 Figma → JSON → CSS Token 工作流。

---

> 近期討論紀錄與重要洞察記錄已移至 `memory/session-log.md`。
> 此檔案（learning-context.md）為**鎖定狀態**，Claude 禁止自行修改。
