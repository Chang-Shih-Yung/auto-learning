#!/usr/bin/env bash
# 檢查 MDX 內文是否有會破壞 next-mdx-remote 解析的 pattern。
#
# 目前抓的：
#   <DIGIT  → 例如「<5ms」「<0.5 秒」會被 MDX 當成 JSX tag 起頭，但 5/0 不能當 JSX 名字第一個字元，導致 prerender 炸
#
# 用法：
#   bash scripts/check-mdx.sh           # 檢查 working tree 中所有 journal/ news/ 下的 .md
#   bash scripts/check-mdx.sh --staged  # 只檢查 git staged 版本（pre-commit hook 用）
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

mode="${1:-working}"

if [ "$mode" = "--staged" ]; then
  files=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '^(journal|news)/.*\.(md|mdx)$' || true)
else
  files=$(find journal news -type f \( -name '*.md' -o -name '*.mdx' \) 2>/dev/null || true)
fi

if [ -z "$files" ]; then
  exit 0
fi

found=0
while IFS= read -r file; do
  [ -z "$file" ] && continue
  [ -f "$file" ] || continue
  if grep -nE '<[0-9]' "$file" >/dev/null 2>&1; then
    if [ $found -eq 0 ]; then
      echo "❌ MDX parse hazard: '<' followed by a digit will break next-mdx-remote prerender."
      echo "   Fix: add a space after '<' (e.g. '<5ms' → '< 5ms') or wrap in inline code (\`<5ms\`)."
      echo
      found=1
    fi
    grep -nE '<[0-9]' "$file" | sed "s|^|  $file:|"
  fi
done <<< "$files"

exit $found
