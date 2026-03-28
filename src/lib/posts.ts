import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { walkDir } from "@/lib/fs";

const JOURNAL_DIR = path.join(process.cwd(), "journal");

export interface PostMeta {
  slug: string[];
  title: string;
  date: string;
  year: string;
  month: string;
  day: string;
  excerpt?: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  const files = walkDir(JOURNAL_DIR);

  const posts = files
    .map((filePath) => {
      const relativePath = path.relative(JOURNAL_DIR, filePath);
      const parts = relativePath.replace(/\.md$/, "").split(path.sep);
      const slug = parts;

      let rawContent = "";
      try {
        rawContent = fs.readFileSync(filePath, "utf-8");
      } catch {
        return null;
      }

      const { data, content } = matter(rawContent);

      // Date always derived from path (year/month/filename) — not frontmatter.
      // Frontmatter date can be non-ISO format which breaks lexicographic sort.
      const year = parts[0] || "";
      const month = parts[1] || "";
      const day = parts[2] || "";
      // day (parts[2]) is already the full ISO date (e.g. "2026-03-27" — the filename).
      // Do not re-join with year/month or it becomes "2026-03-2026-03-27".
      const date = day;

      // Extract title from frontmatter or first heading
      let title = data.title as string | undefined;
      if (!title) {
        const match = content.match(/^#\s+(.+)$/m);
        title = match ? match[1] : date;
      }

      // Excerpt: first non-heading paragraph
      let excerpt = data.excerpt as string | undefined;
      if (!excerpt) {
        const lines = content.split("\n").filter((l) => l.trim());
        const para = lines.find((l) => !l.startsWith("#") && !l.startsWith("|") && l.length > 20);
        excerpt = para ? para.replace(/\*\*/g, "").slice(0, 120) : "";
      }

      return {
        slug,
        title,
        date,
        year,
        month,
        day,
        excerpt,
        tags: data.tags || [],
      } as PostMeta;
    })
    .filter(Boolean) as PostMeta[];

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string[]): Post | null {
  const filePath = path.join(JOURNAL_DIR, ...slug) + ".md";
  if (!fs.existsSync(filePath)) return null;

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const year = slug[0] || "";
  const month = slug[1] || "";
  const day = slug[2] || "";
  const date = data.date ? String(data.date) : day;

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
    day,
    content,
    tags: data.tags || [],
  };
}

export interface JournalTree {
  [year: string]: {
    [month: string]: PostMeta[];
  };
}

export function getJournalTree(posts?: PostMeta[]): JournalTree {
  const allPosts = posts ?? getAllPosts();
  const tree: JournalTree = {};

  for (const post of allPosts) {
    if (!tree[post.year]) tree[post.year] = {};
    if (!tree[post.year][post.month]) tree[post.year][post.month] = [];
    tree[post.year][post.month].push(post);
  }

  return tree;
}
