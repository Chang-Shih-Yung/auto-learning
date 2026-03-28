import fs from "fs";
import path from "path";

export function walkDir(dir: string): string[] {
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
