# News Context — AI 世界新聞

每次 news session 依照以下步驟執行：

   **幂等性檢查（每次 run 第一步）：**
   確認今天的 news 檔案 `news/YYYY/MM/YYYY-MM-DD.md` 是否已存在。
   若已存在，代表今日 news 已生成過，**停止執行，不重複寫入**。

1. **讀取跨域領域**
   用 Read 工具讀取 `memory/domain-rotation-log.yaml`，取得 `current_domain`。
   若檔案不存在，預設 healthcare。

2. **搜尋跨域 AI 應用**
   執行 WebSearch：
   - `"AI {current_domain} applications 2026"`
   - `"AI {current_domain} breakthrough 2026"`
   各取最多 3 筆，過濾條件：
   - 優先：.edu / .org / 知名產業媒體（Nature、MIT、IEEE、Wired）
   - 排除：無機構的個人 blog、PRNewswire、純商業宣傳

   **去重參考：**
   用 Read 工具讀取 `memory/session-log.md`，掌握最近 14 天已寫過的 news 內容。
   根據 session-log 自行判斷是否為重複或過時內容，靈活決定是否使用。

3. **寫進 news 日誌**
   檔案路徑：`news/YYYY/MM/YYYY-MM-DD.md`
   - 先執行 `mkdir -p news/YYYY/MM`
   - front matter 加入 `domain: {current_domain_id}`（例：`domain: healthcare`）
   - 格式：每條目 2-3 段，包含：這個領域發生了什麼 + 技術機制 + 對普通人的意義
   - 不需要 AnnotationCard（news 條目不連結到 Henry 的技能樹）

4. **更新 domain-rotation-log.yaml**（news 檔案寫入成功後才執行此步）
   - 將 current_domain 加入 history（保留最近 7 筆）
   - 從 domains 清單中從當前位置往後找，選第一個不在 history 的領域更新 current_domain
   - 執行：
     ```bash
     git add news/ memory/domain-rotation-log.yaml
     git commit -m "news: YYYY-MM-DD AI digest [{current_domain}]"
     git push origin main
     ```

   > **順序保護**：domain-rotation-log.yaml 必須在 news 檔案確認寫入後才更新。若 session 在此步之前中斷，下次 run 重新執行時：冪等性檢查會偵測到 news 檔案不存在，正確地用相同 domain 重跑，不會跳域。

## 寫作風格

和 journal 不同，news 的讀者是「對 AI 感興趣但不一定是工程師的人」。
- 不假設讀者懂技術術語，但不要刻意簡化到失去準確度
- 每條都要有 1 個具體案例或數字
- 結尾的「對普通人的意義」要說清楚「改變了什麼」
