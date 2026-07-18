#!/usr/bin/env node
/**
 * validate-mdx.mjs — 用「跟 Vercel build 同一組 MDX parser」實際編譯每篇內容檔，
 * 抓出所有會讓 next-mdx-remote prerender 崩掉的錯誤。
 *
 * 為什麼不是用 regex：
 *   舊的 check-mdx.sh 只用 `grep '<[0-9]'` 抓「< 接數字」一種 hazard，
 *   但實際會炸 build 的還有：
 *     - 花括號 `{...}` 被當 JS 表達式，內容不是合法 JS（例：`{−1, 0, +1}` 的 unicode 減號）
 *     - `<xxx>` 被當未閉合 JSX tag
 *   regex 無法辨識「在反引號內（安全）vs 裸露在 prose（會炸）」的差別，
 *   所以這裡直接呼叫真正的編譯器，判定跟 build 100% 一致、零誤報。
 *
 * 用法：
 *   node scripts/validate-mdx.mjs            # 驗 working tree 全部 journal/news/showcase/bookmarks
 *   node scripts/validate-mdx.mjs --staged   # 只驗 git staged 的內容檔（pre-commit hook 用）
 *   node scripts/validate-mdx.mjs a.md b.md  # 驗指定檔案
 */
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { globSync } from "node:fs";

const CONTENT_DIRS = ["journal", "news", "showcase", "bookmarks"];
const args = process.argv.slice(2);
const staged = args.includes("--staged");
const explicit = args.filter((a) => !a.startsWith("--"));

function listFiles() {
  if (explicit.length > 0) return explicit;
  if (staged) {
    const out = execSync(
      "git diff --cached --name-only --diff-filter=ACMR",
      { encoding: "utf8" }
    );
    return out
      .split("\n")
      .map((s) => s.trim())
      .filter((f) => /^(journal|news|showcase|bookmarks)\/.*\.(md|mdx)$/.test(f));
  }
  // working tree: glob every content dir
  const files = [];
  for (const dir of CONTENT_DIRS) {
    if (!existsSync(dir)) continue;
    for (const f of globSync(`${dir}/**/*.{md,mdx}`)) files.push(f);
  }
  return files;
}

// 用真正的 next-mdx-remote 編譯器編譯 body（跟 app 端 options 對齊）。
// 抓到 compile error 就是 build 會炸的錯。
async function compileOne(file) {
  const raw = readFileSync(file, "utf8");
  const { content } = matter(raw); // 跟 app 一樣先剝 frontmatter
  await serialize(content, {
    parseFrontmatter: false,
    mdxOptions: { remarkPlugins: [remarkGfm] },
  });
}

const files = listFiles().filter((f) => existsSync(f));
if (files.length === 0) {
  process.exit(0);
}

let failed = 0;
for (const file of files) {
  try {
    await compileOne(file);
  } catch (err) {
    if (failed === 0) {
      console.error(
        "\n❌ MDX 編譯失敗——這些檔案會讓 Vercel prerender 崩掉，必須修好才能 commit/deploy：\n"
      );
    }
    failed++;
    const msg = (err && err.message ? err.message : String(err)).trim();
    console.error(`  ✗ ${file}`);
    for (const line of msg.split("\n")) console.error(`      ${line}`);
    console.error("");
  }
}

if (failed > 0) {
  console.error(
    `共 ${failed} 個檔案編譯失敗。常見修法：把含 { } 或 < 的技術符號用反引號包成 inline code，`
  );
  console.error(
    `例如  ternary {−1, 0, +1}  →  ternary \`{−1, 0, +1}\` ；  <500  →  \`<500\` 或  < 500（加空格）。\n`
  );
  process.exit(1);
}

console.log(`✅ MDX 編譯驗證通過（${files.length} 檔，使用與 Vercel build 相同的 parser）`);
