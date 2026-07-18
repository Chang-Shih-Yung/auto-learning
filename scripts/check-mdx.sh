#!/usr/bin/env bash
# MDX build 守門員（pre-commit hook 與 npm run lint:mdx 都走這裡）。
#
# 舊版只用 `grep '<[0-9]'` 抓一種 hazard，漏掉花括號 `{...}` 與 `<xxx>` 等其他會炸
# Vercel prerender 的 pattern（2026-07-15 的 `{−1, 0, +1}` 就是這樣溜過去、壞了四天）。
#
# 現在改用 scripts/validate-mdx.mjs——直接呼叫與 Vercel build 相同的 next-mdx-remote
# 編譯器實際編譯每篇內容檔，判定跟 build 100% 一致、零誤報。
#
# 用法：
#   bash scripts/check-mdx.sh           # 驗 working tree 全部內容檔
#   bash scripts/check-mdx.sh --staged  # 只驗 git staged（pre-commit hook 用）
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

# 沒有 node / 未安裝依賴時，退回舊的 grep 以免 hook 直接崩（並提醒）。
if ! command -v node >/dev/null 2>&1 || [ ! -d node_modules/next-mdx-remote ]; then
  echo "⚠️  node 或 node_modules 不可用，MDX 驗證退回 grep（請 npm install 以啟用完整編譯驗證）。" >&2
  mode="${1:-working}"
  if [ "$mode" = "--staged" ]; then
    files=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '^(journal|news|showcase|bookmarks)/.*\.(md|mdx)$' || true)
  else
    files=$(find journal news showcase bookmarks -type f \( -name '*.md' -o -name '*.mdx' \) 2>/dev/null || true)
  fi
  found=0
  while IFS= read -r file; do
    [ -z "$file" ] && continue
    [ -f "$file" ] || continue
    if grep -nE '<[0-9]' "$file" >/dev/null 2>&1; then
      [ $found -eq 0 ] && { echo "❌ MDX hazard: '<' 後接數字會炸 prerender（grep fallback，僅抓一種）。"; found=1; }
      grep -nE '<[0-9]' "$file" | sed "s|^|  $file:|"
    fi
  done <<< "$files"
  exit $found
fi

exec node scripts/validate-mdx.mjs "$@"
