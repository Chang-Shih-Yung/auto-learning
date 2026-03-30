Add a bookmark article. The user provides a URL and/or brief description after `/bookmark`.

## Steps

1. **Parse input**
   - Extract URL if present (starts with http/https)
   - Extract the user's note (any non-URL text)

2. **Fetch content**
   - If a URL is provided, use WebFetch to read the article content
   - If only a description is provided, use that as the basis for writing

3. **Read skill taxonomy**
   - Use Read tool to read `memory/skill-taxonomy.yaml` for AnnotationCard skill IDs

4. **Write the bookmark file**

   Determine today's date (YYYY-MM-DD) and generate a kebab-case slug from the title.
   File path: `bookmarks/YYYY/MM/YYYY-MM-DD-{slug}.md`

   Run first: `mkdir -p bookmarks/YYYY/MM`

   **Frontmatter:**
   ```yaml
   ---
   title: "Article Title"
   date: YYYY-MM-DD
   url: https://... (if provided)
   note: "User's brief description" (if provided)
   ---
   ```

   **Content — same three-paragraph format as journal:**

   If the user provided a URL, include it as the first line of the content body (before the three paragraphs) as a Markdown link to avoid layout-breaking long URLs:
   ```
   來源：[{clean domain/path}]({original URL as provided by the user, including any tracking params})
   ```
   Then a blank line, then the three paragraphs.

   - **第一段：你能做什麼** — concrete capability, must include specific numbers
   - **第二段：背後怎麼運作** — one paragraph on the technical mechanism
   - **第三段：這改變了什麼** — Before → After world-view shift

   **使用方式區塊（選填，自行判斷）** — 讀取文章內容後，若文章屬於工具、CLI、SDK、workflow 等有實際操作步驟的技術內容，主動在三段式內容與 AnnotationCard 之間加入 `## 使用方式` 區塊（以水平線分隔），整理安裝指令、核心功能、工作流程等。格式自由配合內容調整，不強制固定結構。純概念或新聞類文章不需要。

   **AnnotationCard** at the end (same format as journal, same rules):
   ```mdx
   <AnnotationCard
     relevance={4}
     skills={["figma", "angular"]}
     adjacent="..."
     adjacentNote={"..."}
     connection={"..."}
   />
   ```
   All Chinese string props must use `={"..."}` syntax.
   After writing, re-read the file to verify all `{` `}` are balanced.

5. **Commit and push**

   先偵測目前是否在 worktree 環境：
   ```bash
   git rev-parse --git-dir
   ```

   - 回傳 `.git` → 在本地 main，正常推送：
     ```bash
     git add bookmarks/
     git commit -m "bookmark: YYYY-MM-DD {slug}"
     git push origin main
     ```

   - 回傳含 `worktrees` 的路徑 → 在 worktree，推送後同步本地 main：
     ```bash
     git add bookmarks/
     git commit -m "bookmark: YYYY-MM-DD {slug}"
     git push origin HEAD:main
     git -C /Users/henry/Desktop/auto-learning pull
     ```
