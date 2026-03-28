import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { JournalTree } from "@/lib/posts";

const NEWS_DIR = path.join(process.cwd(), "news");

export interface NewsMeta {
  slug: string[];
  title: string;
  date: string;
  year: string;
  month: string;
  day: string;
  domain?: string;
  excerpt?: string;
}

export interface NewsPost extends NewsMeta {
  content: string;
}

function walkDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (entry.name.endsWith(".md") && entry.name !== "index.md") {
      files.push(fullPath);
    }
  }
  return files;
}

export function getAllNews(): NewsMeta[] {
  const files = walkDir(NEWS_DIR);

  const posts = files
    .map((filePath) => {
      const relativePath = path.relative(NEWS_DIR, filePath);
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
      const day = parts[2] || "";
      const date = day;

      let title = data.title as string | undefined;
      if (!title) {
        const match = content.match(/^#\s+(.+)$/m);
        title = match ? match[1] : date;
      }

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
        domain: data.domain as string | undefined,
        excerpt,
      } as NewsMeta;
    })
    .filter(Boolean) as NewsMeta[];

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getNews(slug: string[]): NewsPost | null {
  const filePath = path.join(NEWS_DIR, ...slug) + ".md";
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
    domain: data.domain as string | undefined,
    content,
  };
}

export function getNewsTree(): JournalTree {
  const posts = getAllNews();
  const tree: JournalTree = {};

  for (const post of posts) {
    if (!tree[post.year]) tree[post.year] = {};
    if (!tree[post.year][post.month]) tree[post.year][post.month] = [];
    tree[post.year][post.month].push(post);
  }

  return tree;
}
