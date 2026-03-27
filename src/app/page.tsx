import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import Link from "next/link";
import { BookOpen, ArrowRight, Cpu } from "lucide-react";
import { getAllPosts } from "@/lib/posts";

function getSkillStats() {
  try {
    const filePath = path.join(process.cwd(), "memory", "skill-taxonomy.yaml");
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
        <div className="max-w-[860px]">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{
              background: "rgba(61, 107, 94, 0.08)",
              color: "#3d6b5e",
              border: "1px solid rgba(61, 107, 94, 0.15)",
            }}
          >
            <Cpu className="h-3.5 w-3.5" />
            Claude Code 驅動
          </div>

          <h1
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-[#1a1a18]"
            style={{
              fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif",
              lineHeight: 1.3,
            }}
          >
            Henry's Learning Hub
          </h1>

          <p
            className="text-lg md:text-xl text-[#5a5856] mb-8 leading-relaxed max-w-[600px]"
            style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif", lineHeight: 1.85 }}
          >
            用 Claude Code 驅動的自我學習系統，每天自動整理最新技術動態。
            每一篇日誌都是可搜尋的知識節點。
          </p>

          <div className="flex items-center gap-3 flex-wrap mb-10">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "#3d6b5e" }}
            >
              <BookOpen className="h-4 w-4" />
              所有日誌
            </Link>
            {recentPosts[0] && (
              <Link
                href={`/journal/${recentPosts[0].slug.join("/")}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-[#3d6b5e] transition-colors hover:bg-[rgba(61,107,94,0.08)]"
                style={{ border: "1px solid rgba(61,107,94,0.25)" }}
              >
                今日 journal
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Stats row */}
          <div
            className="flex items-center gap-2 text-sm"
            style={{ fontFamily: "var(--font-geist-mono), 'Source Code Pro', monospace" }}
          >
            <span className="text-[#767472]">
              <span className="text-[#1a1a18] font-medium">{allPosts.length}</span> 篇日誌
            </span>
            <span className="text-[rgba(26,26,24,0.2)]">·</span>
            <span className="text-[#767472]">
              <span className="text-[#1a1a18] font-medium">{skillTotal}</span> 個技能
            </span>
            <span className="text-[rgba(26,26,24,0.2)]">·</span>
            <span className="text-[#767472]">
              <span className="text-[#1a1a18] font-medium">{learningNow}</span> 個學習中
            </span>
          </div>
        </div>
      </section>

      {/* Recent entries */}
      {recentPosts.length > 0 && (
        <section className="max-w-[860px] mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-lg font-semibold text-[#1a1a18]"
              style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
            >
              最近更新
            </h2>
            <Link
              href="/journal"
              className="text-sm text-[#3d6b5e] hover:opacity-80 transition-opacity inline-flex items-center gap-1"
            >
              查看全部
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(26,26,24,0.06)" }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ background: "#f8f6f3", borderBottom: "1px solid rgba(26,26,24,0.08)" }}>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-[#767472] uppercase tracking-wider"
                    style={{ width: "160px" }}
                  >
                    日期
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#767472] uppercase tracking-wider">
                    主題
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post, i) => (
                  <tr
                    key={post.slug.join("/")}
                    className="group transition-colors hover:bg-[rgba(61,107,94,0.04)]"
                    style={{
                      borderBottom:
                        i < recentPosts.length - 1
                          ? "1px solid rgba(26,26,24,0.06)"
                          : "none",
                    }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-mono text-[#767472]"
                          style={{ fontFamily: "var(--font-geist-mono), 'Source Code Pro', monospace" }}
                        >
                          {post.date}
                        </span>
                        {post.date === today && (
                          <span
                            className="px-1.5 py-0.5 text-[10px] rounded font-medium"
                            style={{ background: "rgba(61,107,94,0.1)", color: "#3d6b5e" }}
                          >
                            今天
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/journal/${post.slug.join("/")}`}
                        className="text-sm text-[#1a1a18] group-hover:text-[#3d6b5e] transition-colors"
                        style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
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
      <div className="max-w-[860px]">
        <blockquote
          className="pl-4 text-sm text-[#5a5856] italic"
          style={{
            borderLeft: "3px solid #3d6b5e",
            fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif",
            lineHeight: 1.85,
          }}
        >
          <strong className="text-[#1a1a18]">Context Window = RAM，Filesystem = Disk</strong>
          <br />
          重要的東西要寫到磁碟，這個網站就是我的磁碟。
        </blockquote>
      </div>
    </div>
  );
}
