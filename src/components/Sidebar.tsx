"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { JournalTree } from "@/lib/posts";

interface SidebarProps {
  tree: JournalTree;
  label?: string;
  basePath?: string;
}

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

function PostLink({ post, pathname, basePath }: Readonly<{ post: JournalTree[string][string][number]; pathname: string; basePath: string }>) {
  const href = `${basePath}/${post.slug.join("/")}`;
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      prefetch={false}
      className={cn(
        "flex items-center px-2 py-1.5 rounded-md text-xs transition-colors leading-snug",
        isActive
          ? "text-primary bg-primary/8 font-medium"
          : "text-text-2 hover:text-foreground hover:bg-foreground/4"
      )}
    >
      <span className="truncate">{post.day}</span>
    </Link>
  );
}

function MonthSection({
  year,
  month,
  posts,
  isOpen,
  onToggle,
  pathname,
  basePath,
}: Readonly<{
  year: string;
  month: string;
  posts: JournalTree[string][string];
  isOpen: boolean;
  onToggle: () => void;
  pathname: string;
  basePath: string;
}>) {
  const monthKey = `${year}-${month}`;
  return (
    <div key={monthKey} className="mb-0.5">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-1.5 px-2 py-1 rounded-md text-sm text-text-2 hover:text-foreground hover:bg-foreground/4 transition-colors"
      >
        <ChevronRight className={`h-3 w-3 shrink-0 transition-transform duration-200 text-muted-foreground ${isOpen ? "rotate-90" : ""}`} />
        {MONTH_NAMES[month] || month + "月"}
      </button>
      {isOpen && (
        <div className="ml-3 border-l border-border/60 pl-2">
          {posts.map((post) => (
            <PostLink key={post.slug.join("/")} post={post} pathname={pathname} basePath={basePath} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ tree, label = "學習日誌", basePath = "/journal" }: Readonly<SidebarProps>) {
  const pathname = usePathname();

  // Lazy initializer — runs once on mount (client-side), avoids hydration mismatch
  // at UTC midnight / timezone boundary. Only current year + current month expanded.
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const currentYear = String(new Date().getFullYear());
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
    return {
      [currentYear]: true,
      [`${currentYear}-${currentMonth}`]: true,
    };
  });

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const years = Object.keys(tree).sort((a, b) => b.localeCompare(a));

  return (
    <aside className="hidden md:block w-56 shrink-0">
      <ScrollArea className="h-full">
        <div className="py-4 pr-4">
          <div className="mb-3 px-2">
            <span className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {label}
            </span>
          </div>

          <nav>
            {years.map((year) => {
              const isYearOpen = expanded[year] ?? false;
              const months = Object.keys(tree[year]).sort((a, b) => b.localeCompare(a));

              return (
                <div key={year} className="mb-1">
                  {/* Year row */}
                  <button
                    onClick={() => toggle(year)}
                    className="flex w-full items-center gap-1.5 px-2 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-foreground/4 transition-colors"
                  >
                    <ChevronRight className={`h-3 w-3 shrink-0 transition-transform duration-200 text-muted-foreground ${isYearOpen ? "rotate-90" : ""}`} />
                    {year}年
                  </button>

                  {isYearOpen && (
                    <div className="ml-3 border-l border-border pl-2">
                      {months.map((month) => (
                        <MonthSection
                          key={month}
                          year={year}
                          month={month}
                          posts={tree[year][month]}
                          isOpen={expanded[`${year}-${month}`] ?? false}
                          onToggle={() => toggle(`${year}-${month}`)}
                          pathname={pathname}
                          basePath={basePath}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </ScrollArea>
    </aside>
  );
}
