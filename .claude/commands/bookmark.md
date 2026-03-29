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

   - **第一段：你能做什麼** — concrete capability, must include specific numbers
   - **第二段：背後怎麼運作** — one paragraph on the technical mechanism
   - **第三段：這改變了什麼** — Before → After world-view shift

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
   ```bash
   git add bookmarks/
   git commit -m "bookmark: YYYY-MM-DD {slug}"
   git push origin HEAD:main
   git -C /Users/henry/Desktop/auto-learning pull
   ```
