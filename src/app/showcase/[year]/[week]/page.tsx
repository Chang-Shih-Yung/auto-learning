import { getAllShowcase, getShowcaseByWeek } from "@/lib/showcase";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShowcaseDemo from "./showcase-demo";
import type { Metadata, ResolvingMetadata } from "next";

interface PageProps {
  params: Promise<{ year: string; week: string }>;
}

export async function generateStaticParams() {
  const items = getAllShowcase();
  return items.map((item) => ({
    year: item.slug[0],
    week: item.slug[1],
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { year, week } = await params;
  const meta = getShowcaseByWeek(year, week);
  if (!meta) return { title: "成果展示" };
  return { title: `${meta.week} · ${meta.demo_title}` };
}

function SkillChip({ skill }: Readonly<{ skill: string }>) {
  return (
    <span className="inline-flex items-center bg-primary/8 text-primary font-mono text-[11px] px-2 py-0.5 rounded-full">
      {skill}
    </span>
  );
}

export default async function ShowcaseWeekPage({ params }: PageProps) {
  const { year, week } = await params;
  const meta = getShowcaseByWeek(year, week);
  if (!meta) notFound();

  const articleDisplay = meta.articles_read.slice(0, 5);
  const articleOverflow = meta.articles_read.length - 5;

  return (
    <div className="py-16 md:py-24 max-w-215">
      {/* Back link */}
      <Link
        href="/showcase"
        className="inline-flex items-center gap-1.5 font-sans text-sm text-primary hover:underline mb-8"
      >
        ← 成果展示
      </Link>

      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-xs text-muted-foreground mb-1.5">
          {week} · {meta.week_start} — {meta.week_end}
        </p>
        <h1 className="font-serif text-2xl font-semibold text-foreground mb-3">
          {meta.demo_title}
        </h1>
        <span className="inline-flex items-center bg-primary/8 text-primary font-mono text-[11px] px-2 py-0.5 rounded-sm">
          {meta.demo_type}
        </span>
      </div>

      {/* 思維聲道 */}
      <div className="mb-8 space-y-4">
        <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
          思維聲道
        </p>

        <p className="font-serif text-sm leading-[1.85] text-foreground">
          {meta.synthesis_note}
        </p>

        {/* 本週閱讀 */}
        {articleDisplay.length > 0 && (
          <div>
            <p className="font-mono text-[10px] text-muted-foreground mb-2">
              ── 本週閱讀 ──
            </p>
            <ul role="list" className="space-y-1">
              {articleDisplay.map((filename) => (
                <li
                  key={filename}
                  role="listitem"
                  className="font-mono text-xs text-muted-foreground"
                >
                  • {filename}
                </li>
              ))}
              {articleOverflow > 0 && (
                <li className="font-mono text-xs text-muted-foreground">
                  + {articleOverflow} 篇
                </li>
              )}
            </ul>
          </div>
        )}

        {/* 技術抽取 */}
        {meta.skills_extracted.length > 0 && (
          <div>
            <p className="font-mono text-[10px] text-muted-foreground mb-2">
              ── 技術抽取 ──
            </p>
            <div className="flex flex-wrap gap-1">
              {meta.skills_extracted.map((skill) => (
                <SkillChip key={skill} skill={skill} />
              ))}
            </div>
          </div>
        )}

        {/* 跨週合成 */}
        {meta.cross_week_reference.length > 0 && (
          <div>
            <p className="font-mono text-[10px] text-muted-foreground mb-2">
              ── 跨週合成 ──
            </p>
            <p className="font-serif text-sm text-primary">
              ✦ 綜合了 {meta.cross_week_reference.join("、")} 的學習
            </p>
          </div>
        )}
      </div>

      {/* Demo section */}
      <ShowcaseDemo meta={meta} year={year} week={week} />
    </div>
  );
}
