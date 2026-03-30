import { getAllShowcase, type ShowcaseMeta } from "@/lib/showcase";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "成果展示",
};

function ShowcaseCard({ item }: Readonly<{ item: ShowcaseMeta }>) {
  const [year, week] = item.slug;
  const hasXWeek = item.cross_week_reference.length > 0;

  return (
    <Link
      href={`/showcase/${year}/${week}`}
      prefetch={false}
      className="group/row flex items-start justify-between gap-4 px-4 py-3 rounded-lg border border-foreground/6 transition-colors hover:bg-primary/4"
    >
      <div className="flex-1 min-w-0">
        <span className="font-mono text-xs text-muted-foreground block mb-1">
          {week} · {year}
        </span>
        <h2 className="font-serif text-sm font-medium text-foreground group-hover/row:text-primary transition-colors mb-2 line-clamp-1">
          {item.demo_title}
        </h2>
        {item.skills_extracted.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.skills_extracted.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center bg-primary/8 text-primary font-mono text-[11px] px-2 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
      {hasXWeek && (
        <span
          className="shrink-0 mt-0.5 inline-flex items-center gap-1 bg-primary/8 text-primary font-mono text-[10px] px-2 py-1 rounded-full"
          title={`Claude 把 ${item.cross_week_reference.join(" 和 ")} 的學習合併成了這個 demo`}
        >
          ✦ 跨週合成
        </span>
      )}
    </Link>
  );
}

export default function ShowcasePage() {
  const items = getAllShowcase();

  return (
    <div className="py-16 md:py-24 max-w-215">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-foreground mb-1">
          成果展示
        </h1>
        {items.length > 0 && (
          <p className="font-mono text-xs text-muted-foreground">
            {items.length} 週 · Claude 的技術積累
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-muted rounded-lg p-12 text-center">
          <p className="font-serif text-base text-foreground mb-2">
            Claude 還在學習中
          </p>
          <p className="font-serif text-sm text-muted-foreground">
            第一個週成果將在本週末生成
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <ShowcaseCard
              key={`${item.slug[0]}-${item.slug[1]}`}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
