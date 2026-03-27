import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

// ──────────────────────────────────────────────
// Skill taxonomy — loaded from memory/skill-taxonomy.yaml at build time (SSG)
// ──────────────────────────────────────────────

interface SkillEntry {
  id: string;
  label: string;
  note?: string;
}

interface TaxonomyData {
  current_skills?: SkillEntry[];
  learning_now?: SkillEntry[];
  interests?: SkillEntry[];
}

let _skillMap: Record<string, string> | null = null;

function getSkillMap(): Record<string, string> {
  if (_skillMap) return _skillMap;
  try {
    const filePath = path.join(process.cwd(), "src", "data", "skills.yaml");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = parse(raw) as TaxonomyData;
    const map: Record<string, string> = {};
    for (const skill of [
      ...(data.current_skills ?? []),
      ...(data.learning_now ?? []),
      ...(data.interests ?? []),
    ]) {
      if (skill.id && skill.label) map[skill.id] = skill.label;
    }
    _skillMap = map;
  } catch {
    _skillMap = {};
  }
  return _skillMap;
}

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────

interface AnnotationCardProps {
  relevance: number;
  skills?: string[];
  adjacent?: string;
  adjacentNote?: string;
  connection?: string;
}

export default function AnnotationCard({
  relevance,
  skills = [],
  adjacent,
  adjacentNote,
  connection,
}: Readonly<AnnotationCardProps>) {
  const skillMap = getSkillMap();
  const score = Math.max(0, Math.min(5, Math.round(relevance)));
  const defaultOpen = score >= 3;

  const skillLabels =
    skills.length > 0 ? skills.map((id) => skillMap[id] ?? id) : null;

  return (
    <details
      open={defaultOpen}
      className="group my-4 overflow-hidden rounded-md border border-annotation-border bg-muted"
    >
      {/* ── Toggle header ── */}
      <summary className="flex cursor-pointer select-none items-center gap-2 border-t-2 border-t-annotation bg-annotation-soft px-4 py-2.5 text-xs text-text-2 [list-style:none] [&::-webkit-details-marker]:hidden">
        {/* Chevron — rotates 90° when open */}
        <span className="inline-block text-[10px] transition-transform duration-200 group-open:rotate-90">
          ▶
        </span>

        <span className="font-mono text-[11px] tracking-[0.05em] text-annotation">
          Henry's Take
        </span>

        <span className="text-muted-foreground/60">·</span>
        <span className="text-muted-foreground">相關度 {score}/5</span>

        {/* Relevance pip bar */}
        <span className="ml-auto flex items-center gap-0.5">
          {([1, 2, 3, 4, 5] as const).map((pip) => (
            <span
              key={pip}
              className={`inline-block h-2 w-2 rounded-sm ${pip <= score ? "bg-annotation" : "bg-border"}`}
            />
          ))}
        </span>
      </summary>

      {/* ── Card body ── */}
      <div className="flex flex-col gap-3 border-t border-border px-4 py-4">

        {/* Connection — most valuable, always first */}
        {connection && (
          <div className="flex flex-col gap-1">
            <Label>與你的關聯</Label>
            <p className="m-0 font-serif text-[13px] leading-[1.65] text-foreground/80">
              {connection}
            </p>
          </div>
        )}

        {/* Skills — label prefix + inline chips */}
        <div className="flex items-start gap-2">
          <span className="font-mono text-[10px] tracking-[0.07em] uppercase text-muted-foreground shrink-0 mt-0.75">
            匹配技能
          </span>
          <div className="flex flex-wrap gap-1">
            {skillLabels ? (
              skillLabels.map((label) => (
                <Chip key={label} filled>{label}</Chip>
              ))
            ) : (
              <Chip>無直接匹配</Chip>
            )}
          </div>
        </div>

        {/* Adjacent skill */}
        {adjacent && (
          <div className="flex flex-col gap-1.5">
            <Label>延伸探索</Label>
            <Chip outline>{adjacent}</Chip>
            {adjacentNote && (
              <p className="m-0 font-serif text-[12px] leading-relaxed text-text-2">
                {adjacentNote}
              </p>
            )}
          </div>
        )}
      </div>
    </details>
  );
}

// ──────────────────────────────────────────────
// Small internal sub-components
// ──────────────────────────────────────────────

function Label({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className="font-mono text-[10px] tracking-[0.07em] uppercase text-muted-foreground">
      {children}
    </span>
  );
}

function Chip({
  children,
  filled,
  outline,
}: Readonly<{
  children: React.ReactNode;
  filled?: boolean;
  outline?: boolean;
}>) {
  const base = "inline-block self-start rounded px-2 py-0.5 text-[11px]";
  if (filled) {
    return <span className={`${base} bg-foreground text-background`}>{children}</span>;
  }
  if (outline) {
    return <span className={`${base} border border-foreground text-foreground`}>{children}</span>;
  }
  return <span className={`${base} border border-border text-muted-foreground`}>{children}</span>;
}
