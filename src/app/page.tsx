import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import Link from "next/link";
import { BookOpen, ArrowRight, Cpu } from "lucide-react";
import { getAllPosts } from "@/lib/posts";

function getSkillStats() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "skills.yaml");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = parse(raw) as {
      current_skills?: unknown[];
      learning_now?: unknown[];
    };
    return {
      total: (data.current_skills?.length ?? 0) + (data.learning_now?.length ?? 0),
      learningNow: data.learning_now?.length ?? 0,
    };
  } catch {
    return { total: 0, learningNow: 0 };
  }
}

export default function HomePage() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 10);
  const { total: skillTotal, learningNow } = getSkillStats();
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="py-16 md:py-24">
      {/* Hero */}
      <section className="mb-16">
        <div className="max-w-215">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 bg-primary/8 text-primary border border-primary/15">
            <Cpu className="h-3.5 w-3.5" />
            Claude Code 驅動
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight leading-[1.3] mb-6 text-foreground">
            Henry's Learning Hub
          </h1>

          <p className="font-serif text-lg md:text-xl text-text-2 mb-8 leading-[1.85] max-w-150">
            用 Claude Code 驅動的自我學習系統，每天自動整理最新技術動態。
            每一篇日誌都是可搜尋的知識節點。
          </p>

          <div className="flex items-center gap-3 flex-wrap mb-10">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-primary-foreground bg-primary transition-opacity hover:opacity-90"
            >
              <BookOpen className="h-4 w-4" />
              所有日誌
            </Link>
            {recentPosts[0] && (
              <Link
                href={`/journal/${recentPosts[0].slug.join("/")}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-primary border border-primary/25 transition-colors hover:bg-primary/8"
              >
                今日 journal
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-2 text-sm font-mono">
            <span className="text-muted-foreground">
              <span className="text-foreground font-medium">{allPosts.length}</span> 篇日誌
            </span>
            <span className="text-foreground/20">·</span>
            <span className="text-muted-foreground">
              <span className="text-foreground font-medium">{skillTotal}</span> 個技能
            </span>
            <span className="text-foreground/20">·</span>
            <span className="text-muted-foreground">
              <span className="text-foreground font-medium">{learningNow}</span> 個學習中
            </span>
          </div>
        </div>
      </section>

      {/* Recent entries */}
      {recentPosts.length > 0 && (
        <section className="max-w-215 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg font-semibold text-foreground">
              最近更新
            </h2>
            <Link
              href="/journal"
              className="text-sm text-primary hover:opacity-80 transition-opacity inline-flex items-center gap-1"
            >
              查看全部
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-xl overflow-hidden border border-foreground/6">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                    style={{ width: "160px" }}
                  >
                    日期
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    主題
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post, i) => (
                  <tr
                    key={post.slug.join("/")}
                    className={`group transition-colors hover:bg-primary/4 ${i < recentPosts.length - 1 ? "border-b border-foreground/6" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {post.date}
                        </span>
                        {post.date === today && (
                          <span className="px-1.5 py-0.5 text-[10px] rounded font-medium bg-primary/10 text-primary">
                            今天
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/journal/${post.slug.join("/")}`}
                        prefetch={false}
                        className="font-serif text-sm text-foreground group-hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Blockquote — always visible */}
      <div className="max-w-215">
        <blockquote className="font-serif pl-4 text-sm text-text-2 italic leading-[1.85] border-l-[3px] border-primary">
          <strong className="text-foreground">Context Window = RAM，Filesystem = Disk</strong>
          <br />
          重要的東西要寫到磁碟，這個網站就是我的磁碟。
        </blockquote>
      </div>
    </div>
  );
}
