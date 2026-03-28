import { getBookmarkTree } from "@/lib/bookmarks";
import type { BookmarkMeta } from "@/lib/bookmarks";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { Bookmark, ChevronRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

function BookmarkListItem({ bookmark }: Readonly<{ bookmark: BookmarkMeta }>) {
  return (
    <Link
      href={`/bookmarks/${bookmark.slug.join("/")}`}
      prefetch={false}
      className="group/row flex items-start gap-4 px-4 py-3 rounded-lg border border-foreground/6 transition-colors hover:bg-primary/4"
    >
      <span className="font-mono text-xs text-muted-foreground shrink-0 mt-0.5">
        {bookmark.date}
      </span>
      <div className="flex-1 min-w-0">
        <h2 className="font-serif text-sm font-medium text-foreground group-hover/row:text-primary transition-colors mb-1 line-clamp-1">
          {bookmark.title}
        </h2>
        {(bookmark.note || bookmark.excerpt) && (
          <p className="font-serif text-xs text-muted-foreground line-clamp-1">
            {bookmark.note ?? bookmark.excerpt}
          </p>
        )}
      </div>
      {bookmark.url && (
        <ExternalLink className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground/40 group-hover/row:text-primary/60 transition-colors" />
      )}
    </Link>
  );
}

export const metadata: Metadata = {
  title: "書籤",
};

const MONTH_NAMES: Record<string, string> = {
  "01": "1月", "02": "2月", "03": "3月", "04": "4月",
  "05": "5月", "06": "6月", "07": "7月", "08": "8月",
  "09": "9月", "10": "10月", "11": "11月", "12": "12月",
};

export default function BookmarksIndexPage() {
  const tree = getBookmarkTree();

  const monthGroups: Array<{
    year: string;
    month: string;
    bookmarks: BookmarkMeta[];
  }> = [];

  const years = Object.keys(tree).sort((a, b) => b.localeCompare(a));
  for (const year of years) {
    const months = Object.keys(tree[year]).sort((a, b) => b.localeCompare(a));
    for (const month of months) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      monthGroups.push({ year, month, bookmarks: tree[year][month] as any });
    }
  }

  const total = monthGroups.reduce((sum, g) => sum + g.bookmarks.length, 0);
  const defaultOpenCount = Math.min(2, monthGroups.length);

  return (
    <div className="flex flex-col md:flex-row gap-8 py-10 min-h-[calc(100vh-3.5rem)]">
      <Sidebar tree={tree} label="書籤" basePath="/bookmarks" />

      <div className="flex-1 min-w-0">
        <div className="max-w-215">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">
            書籤
          </h1>
          <p className="font-serif text-sm text-text-2 mb-8">
            共 {total} 篇收藏
          </p>

          {monthGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-xl text-center bg-muted border border-foreground/6">
              <Bookmark className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">尚無書籤</p>
            </div>
          ) : (
            <div className="space-y-2">
              {monthGroups.map(({ year, month, bookmarks }, index) => (
                <details
                  key={`${year}-${month}`}
                  open={index < defaultOpenCount}
                  className="group"
                >
                  <summary className="flex cursor-pointer select-none items-center gap-2 px-4 py-3 rounded-md hover:bg-foreground/4 transition-colors [list-style:none] [&::-webkit-details-marker]:hidden">
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-open:rotate-90 text-muted-foreground" />
                    <span className="font-serif text-sm font-medium text-foreground">
                      {year}年{MONTH_NAMES[month] ?? `${month}月`}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      ({bookmarks.length}篇)
                    </span>
                  </summary>
                  <div className="mt-1 space-y-1 pl-2">
                    {bookmarks.map((b) => (
                      <BookmarkListItem key={b.slug.join("/")} bookmark={b} />
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
