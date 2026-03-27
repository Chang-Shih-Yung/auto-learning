"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { JournalTree } from "@/lib/posts";

interface SidebarProps {
  tree: JournalTree;
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

export default function Sidebar({ tree }: SidebarProps) {
  const pathname = usePathname();

  // Default expand all years and months
  const defaultExpanded: Record<string, boolean> = {};
  Object.keys(tree).forEach((year) => {
    defaultExpanded[year] = true;
    Object.keys(tree[year]).forEach((month) => {
      defaultExpanded[`${year}-${month}`] = true;
    });
  });

  const [expanded, setExpanded] = useState<Record<string, boolean>>(defaultExpanded);

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const years = Object.keys(tree).sort((a, b) => b.localeCompare(a));

  return (
    <aside className="hidden md:block w-56 flex-shrink-0">
      <ScrollArea className="h-full">
        <div className="py-4 pr-4">
          <div className="mb-3 px-2">
            <span className="text-xs font-medium text-[#767472] uppercase tracking-wider">
              學習日誌
            </span>
          </div>

          <nav>
            {years.map((year) => {
              const isYearOpen = expanded[year] ?? true;
              const months = Object.keys(tree[year]).sort((a, b) => b.localeCompare(a));

              return (
                <div key={year} className="mb-1">
                  {/* Year row */}
                  <button
                    onClick={() => toggle(year)}
                    className="flex w-full items-center px-2 py-1.5 rounded-md text-sm font-medium text-[#1a1a18] hover:bg-[rgba(26,26,24,0.04)] transition-colors"
                  >
                    {year}年
                  </button>

                  {isYearOpen && (
                    <div className="ml-3 border-l border-[rgba(26,26,24,0.08)] pl-2">
                      {months.map((month) => {
                        const monthKey = `${year}-${month}`;
                        const isMonthOpen = expanded[monthKey] ?? true;
                        const posts = tree[year][month];

                        return (
                          <div key={month} className="mb-0.5">
                            {/* Month row */}
                            <button
                              onClick={() => toggle(monthKey)}
                              className="flex w-full items-center px-2 py-1 rounded-md text-sm text-[#5a5856] hover:text-[#1a1a18] hover:bg-[rgba(26,26,24,0.04)] transition-colors"
                            >
                              {MONTH_NAMES[month] || month + "月"}
                            </button>

                            {isMonthOpen && (
                              <div className="ml-3 border-l border-[rgba(26,26,24,0.06)] pl-2">
                                {posts.map((post) => {
                                  const href = `/journal/${post.slug.join("/")}`;
                                  const isActive = pathname === href;

                                  return (
                                    <Link
                                      key={href}
                                      href={href}
                                      className={cn(
                                        "flex items-center px-2 py-1.5 rounded-md text-xs transition-colors leading-snug",
                                        isActive
                                          ? "text-[#3d6b5e] bg-[rgba(61,107,94,0.08)] font-medium"
                                          : "text-[#5a5856] hover:text-[#1a1a18] hover:bg-[rgba(26,26,24,0.04)]"
                                      )}
                                    >
                                      <span className="truncate">{post.day}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
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
