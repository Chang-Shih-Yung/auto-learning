import { getJournalTree } from "@/lib/posts";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "journal",
};

const MONTH_NAMES: Record<string, string> = {
  "01": "1月",
  "02": "2月",
  "03": "3月",
  "04": "4月",
  "05": "5月",
  "06": "6月",
  "07": "7月",
  "08": "8月",
  "09": "9月",
  "10": "10月",
  "11": "11月",
  "12": "12月",
};

export default function JournalIndexPage() {
  const tree = getJournalTree();

  // Flatten to sorted month groups (desc by year, then desc by month)
  const monthGroups: Array<{ year: string; month: string; posts: ReturnType<typeof getJournalTree>[string][string] }> = [];
  const years = Object.keys(tree).sort((a, b) => b.localeCompare(a));
  for (const year of years) {
    const months = Object.keys(tree[year]).sort((a, b) => b.localeCompare(a));
    for (const month of months) {
      monthGroups.push({ year, month, posts: tree[year][month] });
    }
  }

  const totalPosts = monthGroups.reduce((sum, g) => sum + g.posts.length, 0);

  // Default open: latest Math.min(2, groups.length) months
  const defaultOpenCount = Math.min(2, monthGroups.length);

  return (
    <div className="flex flex-col md:flex-row gap-8 py-10 min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <Sidebar tree={tree} />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="max-w-215">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">
            journal
          </h1>
          <p className="font-serif text-sm text-text-2 mb-8">
            共 {totalPosts} 篇紀錄
          </p>

          {monthGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-xl text-center bg-muted border border-foreground/6">
              <FileText className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">尚無日誌</p>
            </div>
          ) : (
            <div className="space-y-2">
              {monthGroups.map(({ year, month, posts }, index) => (
                // Native <details> — SSG-safe, zero client JS.
                // Content snap on expand/collapse is accepted (no animation without JS).
                <details
                  key={`${year}-${month}`}
                  open={index < defaultOpenCount}
                  className="group"
                >
                  {/* Month section header */}
                  <summary className="flex cursor-pointer select-none items-center gap-2 px-4 py-3 rounded-md hover:bg-foreground/4 transition-colors [list-style:none] [&::-webkit-details-marker]:hidden">
                    <span className="inline-block text-xs transition-transform duration-200 group-open:rotate-90 text-muted-foreground">
                      ▶
                    </span>
                    <span className="font-serif text-sm font-medium text-foreground">
                      {year}年{MONTH_NAMES[month] || month + "月"}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      ({posts.length}篇)
                    </span>
                  </summary>

                  {/* Post rows */}
                  <div className="mt-1 space-y-1 pl-2">
                    {posts.map((post) => (
                      <Link
                        key={post.slug.join("/")}
                        href={`/journal/${post.slug.join("/")}`}
                        prefetch={false}
                        className="group/row flex items-start gap-4 px-4 py-3 rounded-lg border border-foreground/6 transition-colors hover:bg-primary/4"
                      >
                        <span className="font-mono text-xs text-muted-foreground shrink-0 mt-0.5">
                          {post.date}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h2 className="font-serif text-sm font-medium text-foreground group-hover/row:text-primary transition-colors mb-1 line-clamp-1">
                            {post.title}
                          </h2>
                          {post.excerpt && (
                            <p className="font-serif text-xs text-muted-foreground line-clamp-1">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
