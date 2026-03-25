import Link from "next/link";
import { BookOpen, ArrowRight, Cpu, Search, TrendingUp } from "lucide-react";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 10);

  return (
    <div className="py-16 md:py-24">
      {/* Hero */}
      <section className="mb-20">
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

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/學習日誌"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "#3d6b5e" }}
            >
              <BookOpen className="h-4 w-4" />
              所有日誌
            </Link>
            {recentPosts[0] && (
              <Link
                href={`/學習日誌/${recentPosts[0].slug.join("/")}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-[#3d6b5e] transition-colors hover:bg-[rgba(61,107,94,0.08)]"
                style={{ border: "1px solid rgba(61,107,94,0.25)" }}
              >
                今日學習日誌
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Cpu,
              title: "每日 AI 技術摘要",
              desc: "自動追蹤 Anthropic Claude、GitHub Copilot、OpenAI 的最新動態，每天早上整理好等你來讀。",
            },
            {
              icon: Search,
              title: "針對 UI 前端的關聯分析",
              desc: "不只是新聞，而是分析這些技術跟前端開發、設計系統的實際關聯，讓你知道該學什麼、怎麼用。",
            },
            {
              icon: TrendingUp,
              title: "累積式成長記錄",
              desc: "每一篇日誌都是可搜尋的知識節點，按年月日組織，隨時回顧、持續迭代。",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-5 rounded-xl"
              style={{
                background: "#f8f6f3",
                border: "1px solid rgba(26,26,24,0.06)",
              }}
            >
              <div
                className="inline-flex p-2 rounded-lg mb-3"
                style={{ background: "rgba(61, 107, 94, 0.08)" }}
              >
                <Icon className="h-4 w-4 text-[#3d6b5e]" />
              </div>
              <h3
                className="text-sm font-semibold text-[#1a1a18] mb-2"
                style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
              >
                {title}
              </h3>
              <p
                className="text-sm text-[#5a5856] leading-relaxed"
                style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif", lineHeight: 1.7 }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent entries */}
      {recentPosts.length > 0 && (
        <section className="max-w-[860px]">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-lg font-semibold text-[#1a1a18]"
              style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
            >
              最近更新
            </h2>
            <Link
              href="/學習日誌"
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
                    className="px-4 py-3 text-left text-xs font-medium text-[#9a9896] uppercase tracking-wider"
                    style={{ width: "120px" }}
                  >
                    日期
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#9a9896] uppercase tracking-wider">
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
                      <span
                        className="text-xs font-mono text-[#9a9896]"
                        style={{ fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" }}
                      >
                        {post.date}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/學習日誌/${post.slug.join("/")}`}
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

          <blockquote
            className="mt-8 pl-4 text-sm text-[#5a5856] italic"
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
        </section>
      )}
    </div>
  );
}
