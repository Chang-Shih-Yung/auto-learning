import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "關於" };

interface SkillEntry {
  id: string;
  label: string;
  category?: string;
}

interface SkillsData {
  current_skills: SkillEntry[];
  learning_now: SkillEntry[];
  interests: SkillEntry[];
}

function loadSkills(): SkillsData {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "src", "data", "skills.yaml"),
    "utf-8"
  );
  return parse(raw) as SkillsData;
}

const CATEGORY_LABELS: Record<string, string> = {
  framework: "框架 & 語言",
  design:    "設計系統",
  data:      "資料 & 即時",
  infra:     "架構 & 工具",
};

// ── Chip variants ──────────────────────────────────────────
function SkillChip({ label }: Readonly<{ label: string }>) {
  return (
    <Badge className="font-mono bg-foreground text-background border-transparent hover:bg-foreground/90">
      {label}
    </Badge>
  );
}

function LearningChip({ label }: Readonly<{ label: string }>) {
  return (
    <Badge variant="outline" className="font-mono border-primary/40 text-primary">
      {label}
    </Badge>
  );
}

function InterestChip({ label }: Readonly<{ label: string }>) {
  return (
    <Badge variant="outline" className="font-mono text-muted-foreground">
      {label}
    </Badge>
  );
}

export default function AboutPage() {
  const { current_skills, learning_now, interests } = loadSkills();

  // Group current skills by category
  const grouped = current_skills.reduce<Record<string, SkillEntry[]>>((acc, s) => {
    const cat = s.category ?? "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  const categoryOrder = ["framework", "design", "data", "infra"];

  return (
    <div className="max-w-215 py-16 md:py-24">

      {/* ── Hero ── */}
      <section className="mb-14">
        <p className="font-mono text-xs text-muted-foreground mb-3 uppercase tracking-widest">
          About
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4 leading-snug">
          Henry Chang
        </h1>
        <p className="font-serif text-base text-text-2 leading-[1.85] max-w-150">
          前端工程師，UIUX 設計師背景出身。
          從視覺設計 → 企業前端 → 前端架構師，現在專注在 AI workflow、設計系統和 Claude Code 驅動的自動化學習。
        </p>
      </section>

      <div className="border-t border-border mb-14" />

      {/* ── Current skills ── */}
      <section className="mb-12">
        <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">
          技能
        </h2>
        <div className="flex flex-col gap-5">
          {categoryOrder.map((cat) => {
            const skills = grouped[cat];
            if (!skills?.length) return null;
            return (
              <div key={cat} className="flex items-start gap-4">
                <span className="font-mono text-xs text-muted-foreground/60 uppercase tracking-wider shrink-0 w-20 mt-1.5">
                  {CATEGORY_LABELS[cat]}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => <SkillChip key={s.id} label={s.label} />)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="border-t border-border mb-12" />

      {/* ── Learning now ── */}
      <section className="mb-12">
        <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">
          正在學習
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {learning_now.map((s) => <LearningChip key={s.id} label={s.label} />)}
        </div>
      </section>

      <div className="border-t border-border mb-12" />

      {/* ── Interests ── */}
      <section>
        <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">
          感興趣的方向
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {interests.map((s) => <InterestChip key={s.id} label={s.label} />)}
        </div>
      </section>

    </div>
  );
}
