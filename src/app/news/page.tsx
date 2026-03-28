import { getNewsTree } from "@/lib/news";
import type { NewsMeta } from "@/lib/news";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

function NewsListItem({ post }: Readonly<{ post: NewsMeta }>) {
  const displayTitle = post.title.startsWith(post.date)
    ? post.title.slice(post.date.length + 1)
    : post.title;
  return (
    <Link
      href={`/news/${post.slug.join("/")}`}
      prefetch={false}
      className="group/row flex items-start gap-4 px-4 py-3 rounded-lg border border-foreground/6 transition-colors hover:bg-primary/4"
    >
      <span className="font-mono text-xs text-muted-foreground shrink-0 mt-0.5">
        {post.date}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-serif text-sm font-medium text-foreground group-hover/row:text-primary transition-colors line-clamp-1">
            {displayTitle}
          </h2>
          {post.domain && (
            <span className="font-mono text-xs text-muted-foreground shrink-0 border border-foreground/10 rounded px-1.5 py-0.5">
              {post.domain}
            </span>
          )}
        </div>
        {post.excerpt && (
          <p className="font-serif text-xs text-muted-foreground line-clamp-1">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

export const metadata: Metadata = {
  title: "AI 世界新聞",
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

export default function NewsIndexPage() {
  const tree = getNewsTree();

  const monthGroups: Array<{ year: string; month: string; posts: ReturnType<typeof getNewsTree>[string][string] }> = [];
  const years = Object.keys(tree).sort((a, b) => b.localeCompare(a));
  for (const year of years) {
    const months = Object.keys(tree[year]).sort((a, b) => b.localeCompare(a));
    for (const month of months) {
      monthGroups.push({ year, month, posts: tree[year][month] });
    }
  }

  const totalPosts = monthGroups.reduce((sum, g) => sum + g.posts.length, 0);
  const defaultOpenCount = Math.min(2, monthGroups.length);

  return (
    <div className="flex flex-col md:flex-row gap-8 py-10 min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <Sidebar tree={tree} label="AI 世界" basePath="/news" />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="max-w-215">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">
            AI 世界新聞
          </h1>
          <p className="font-serif text-sm text-text-2 mb-8">
            共 {totalPosts} 篇紀錄
          </p>

          {monthGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-xl text-center bg-muted border border-foreground/6">
              <FileText className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">尚無新聞</p>
            </div>
          ) : (
            <div className="space-y-2">
              {monthGroups.map(({ year, month, posts }, index) => (
                <details
                  key={`${year}-${month}`}
                  open={index < defaultOpenCount}
                  className="group"
                >
                  <summary className="flex cursor-pointer select-none items-center gap-2 px-4 py-3 rounded-md hover:bg-foreground/4 transition-colors [list-style:none] [&::-webkit-details-marker]:hidden">
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-open:rotate-90 text-muted-foreground" />
                    <span className="font-serif text-sm font-medium text-foreground">
                      {year}年{MONTH_NAMES[month] || month + "月"}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      ({posts.length}篇)
                    </span>
                  </summary>

                  <div className="mt-1 space-y-1 pl-2">
                    {posts.map((post) => (
                      <NewsListItem key={post.slug.join("/")} post={post} />
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
