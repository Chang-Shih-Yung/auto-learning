import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { JournalTree } from "@/lib/posts";
import { walkDir } from "@/lib/fs";

const BOOKMARKS_DIR = path.join(process.cwd(), "bookmarks");

export interface BookmarkMeta {
  slug: string[];
  title: string;
  date: string;
  year: string;
  month: string;
  day: string; // included for structural compatibility with PostMeta / Sidebar
  url?: string;
  note?: string;
  excerpt?: string;
  tags?: string[];
}

export interface Bookmark extends BookmarkMeta {
  content: string;
}

export function getAllBookmarks(): BookmarkMeta[] {
  const files = walkDir(BOOKMARKS_DIR);

  const bookmarks = files
    .map((filePath) => {
      const relativePath = path.relative(BOOKMARKS_DIR, filePath);
      const parts = relativePath.replace(/\.md$/, "").split(path.sep);
      const slug = parts;

      let rawContent = "";
      try {
        rawContent = fs.readFileSync(filePath, "utf-8");
      } catch {
        return null;
      }

      const { data, content } = matter(rawContent);

      const year = parts[0] || "";
      const month = parts[1] || "";
      // filename format: 2026-03-29-some-slug — date is always the first 10 chars
      const filename = parts[2] || "";
      const date = filename.slice(0, 10);

      let title = data.title as string | undefined;
      if (!title) {
        const match = content.match(/^#\s+(.+)$/m);
        title = match ? match[1] : date;
      }

      let excerpt = data.excerpt as string | undefined;
      if (!excerpt) {
        const lines = content.split("\n").filter((l) => l.trim());
        const para = lines.find(
          (l) => !l.startsWith("#") && !l.startsWith("|") && l.length > 20
        );
        excerpt = para ? para.replace(/\*\*/g, "").slice(0, 120) : "";
      }

      return {
        slug,
        title,
        date,
        year,
        month,
        day: date,
        url: data.url as string | undefined,
        note: data.note as string | undefined,
        excerpt,
        tags: data.tags || [],
      } as BookmarkMeta;
    })
    .filter(Boolean) as BookmarkMeta[];

  return bookmarks.sort((a, b) => b.date.localeCompare(a.date));
}

export function getBookmark(slug: string[]): Bookmark | null {
  const filePath = path.join(BOOKMARKS_DIR, ...slug) + ".md";
  if (!fs.existsSync(filePath)) return null;

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const year = slug[0] || "";
  const month = slug[1] || "";
  const filename = slug[2] || "";
  const date = filename.slice(0, 10);

  let title = data.title as string | undefined;
  if (!title) {
    const match = content.match(/^#\s+(.+)$/m);
    title = match ? match[1] : date;
  }

  return {
    slug,
    title,
    date,
    year,
    month,
    day: date,
    url: data.url as string | undefined,
    note: data.note as string | undefined,
    content,
    tags: data.tags || [],
  };
}

export function getBookmarkTree(bookmarks?: BookmarkMeta[]): JournalTree {
  const all = bookmarks ?? getAllBookmarks();
  const tree: JournalTree = {};

  for (const b of all) {
    if (!tree[b.year]) tree[b.year] = {};
    if (!tree[b.year][b.month]) tree[b.year][b.month] = [];
    // BookmarkMeta is structurally compatible with PostMeta for Sidebar rendering
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tree[b.year][b.month].push(b as any);
  }

  return tree;
}
