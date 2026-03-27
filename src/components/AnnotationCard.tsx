import fs from "fs";
import path from "path";
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
    const filePath = path.join(process.cwd(), "memory", "skill-taxonomy.yaml");
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
    // `group` enables group-open:* variants on children
    <details
      open={defaultOpen}
      className="group my-4 overflow-hidden rounded-md"
      style={{
        border: "1px solid rgba(26,26,24,0.08)",
        background: "#faf9f7",
      }}
    >
      {/* ── Toggle header ── */}
      <summary
        className="flex cursor-pointer select-none items-center gap-2 px-4 py-2.5 text-xs text-[#5a5856] transition-colors hover:bg-[rgba(26,26,24,0.03)] [&::-webkit-details-marker]:hidden"
        style={{ borderTop: "2px solid #1a1a18", listStyle: "none" }}
      >
        {/* Chevron — rotates 90° when open */}
        <span className="inline-block text-[10px] transition-transform duration-200 group-open:rotate-90">
          ▶
        </span>

        <span
          className="tracking-wide"
          style={{
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.05em",
          }}
        >
          Henry's Take
        </span>

        <span className="text-[#c0beba]">·</span>
        <span className="text-[#767472]">相關度 {score}/5</span>

        {/* Relevance pip bar */}
        <span className="ml-auto flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="inline-block h-2 w-2 rounded-sm"
              style={{
                background:
                  i < score ? "#1a1a18" : "rgba(26,26,24,0.10)",
              }}
            />
          ))}
        </span>
      </summary>

      {/* ── Card body ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t px-4 py-3 text-sm"
        style={{ borderColor: "rgba(26,26,24,0.08)" }}
      >
        {/* Matched skills */}
        <div className="flex flex-col gap-1.5">
          <Label>匹配技能</Label>
          <div className="flex flex-wrap gap-1">
            {skillLabels ? (
              skillLabels.map((label, i) => (
                <Chip key={i} filled>
                  {label}
                </Chip>
              ))
            ) : (
              <Chip>無直接匹配技能</Chip>
            )}
          </div>
        </div>

        {/* Connection to existing knowledge */}
        {connection && (
          <div className="flex flex-col gap-1.5">
            <Label>與你的關聯</Label>
            <p className="m-0 text-[12px] leading-relaxed text-[#5a5856]">
              {connection}
            </p>
          </div>
        )}

        {/* Adjacent skill — spans both columns */}
        {adjacent && (
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label>延伸探索</Label>
            <div className="flex flex-col gap-1">
              <Chip outline>{adjacent}</Chip>
              {adjacentNote && (
                <p className="m-0 text-[12px] leading-relaxed text-[#5a5856]">
                  {adjacentNote}
                </p>
              )}
            </div>
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
    <span
      className="text-[#767472]"
      style={{
        fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
        fontSize: "10px",
        letterSpacing: "0.07em",
        textTransform: "uppercase",
      }}
    >
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
    return (
      <span className={base} style={{ background: "#1a1a18", color: "#fdfcfa" }}>
        {children}
      </span>
    );
  }
  if (outline) {
    return (
      <span
        className={base}
        style={{ border: "1px solid #1a1a18", color: "#1a1a18" }}
      >
        {children}
      </span>
    );
  }
  return (
    <span
      className={base}
      style={{
        border: "1px solid rgba(26,26,24,0.15)",
        color: "#767472",
      }}
    >
      {children}
    </span>
  );
}
