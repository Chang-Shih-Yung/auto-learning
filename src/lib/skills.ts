import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

const SKILLS_PATH = path.join(process.cwd(), "src", "data", "skills.yaml");

// ── Types ──────────────────────────────────────────────────

export interface SkillEntry {
  id: string;
  label: string;
  category?: string;
  note?: string;
}

export interface SkillsData {
  current_skills: SkillEntry[];
  learning_now: SkillEntry[];
  interests: SkillEntry[];
}

// ── Internal loader (single read) ─────────────────────────

let _cache: SkillsData | null = null;

function load(): SkillsData {
  if (_cache) return _cache;
  try {
    const raw = fs.readFileSync(SKILLS_PATH, "utf-8");
    _cache = parse(raw) as SkillsData;
  } catch {
    _cache = { current_skills: [], learning_now: [], interests: [] };
  }
  return _cache;
}

// ── Public API ─────────────────────────────────────────────

/** Full structured data — used by the About page. */
export function getSkills(): SkillsData {
  return load();
}

/** Flat id → label map across all categories — used by AnnotationCard. */
export function getSkillMap(): Record<string, string> {
  const data = load();
  const map: Record<string, string> = {};
  for (const skill of [
    ...data.current_skills,
    ...data.learning_now,
    ...data.interests,
  ]) {
    if (skill.id && skill.label) map[skill.id] = skill.label;
  }
  return map;
}

/** Counts for the homepage stats row. */
export function getSkillStats(): { total: number; learningNow: number } {
  const data = load();
  return {
    total: data.current_skills.length + data.learning_now.length,
    learningNow: data.learning_now.length,
  };
}
