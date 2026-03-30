import fs from "fs";
import path from "path";

const SHOWCASE_DIR = path.join(process.cwd(), "showcase");

export interface ShowcaseMeta {
  slug: string[];
  year: number;
  week: string;
  week_start: string;
  week_end: string;
  articles_read: string[];
  articles_read_titles: string[];
  skills_extracted: string[];
  skills_used_in_demo: string[];
  cross_week_reference: string[];
  synthesis_note: string;
  demo_type: string;
  demo_available: boolean;
  demo_title: string;
  generated_at: string;
}

function isValidMeta(data: unknown): data is ShowcaseMeta {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.year === "number" &&
    typeof d.week === "string" &&
    typeof d.week_start === "string" &&
    typeof d.week_end === "string" &&
    typeof d.demo_available === "boolean" &&
    typeof d.demo_title === "string" &&
    typeof d.synthesis_note === "string" &&
    Array.isArray(d.skills_extracted) &&
    Array.isArray(d.skills_used_in_demo) &&
    Array.isArray(d.cross_week_reference) &&
    Array.isArray(d.articles_read)
  );
}

export function getAllShowcase(): ShowcaseMeta[] {
  if (!fs.existsSync(SHOWCASE_DIR)) return [];
  const results: ShowcaseMeta[] = [];

  const years = fs
    .readdirSync(SHOWCASE_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  for (const year of years) {
    const yearDir = path.join(SHOWCASE_DIR, year);
    const weeks = fs
      .readdirSync(yearDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);

    for (const week of weeks) {
      const metaPath = path.join(yearDir, week, "meta.json");
      if (!fs.existsSync(metaPath)) continue;
      try {
        const raw = fs.readFileSync(metaPath, "utf-8");
        const data = JSON.parse(raw) as unknown;
        if (!isValidMeta(data)) {
          console.error(`[showcase] invalid meta.json schema: ${metaPath}`);
          continue;
        }
        results.push({ ...data, slug: [year, week] });
      } catch {
        console.error(`[showcase] malformed meta.json: ${metaPath}`);
      }
    }
  }

  return results.sort((a, b) => b.week_start.localeCompare(a.week_start));
}

export function getShowcaseByWeek(
  year: string,
  week: string
): ShowcaseMeta | null {
  const metaPath = path.join(SHOWCASE_DIR, year, week, "meta.json");
  if (!fs.existsSync(metaPath)) return null;
  try {
    const raw = fs.readFileSync(metaPath, "utf-8");
    const data = JSON.parse(raw) as unknown;
    if (!isValidMeta(data)) {
      console.error(`[showcase] invalid meta.json schema: ${metaPath}`);
      return null;
    }
    return { ...data, slug: [year, week] };
  } catch {
    return null;
  }
}
