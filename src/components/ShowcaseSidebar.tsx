"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ShowcaseMeta } from "@/lib/showcase";

interface ShowcaseSidebarProps {
  items: ShowcaseMeta[];
}

export default function ShowcaseSidebar({ items }: Readonly<ShowcaseSidebarProps>) {
  const pathname = usePathname();

  const currentYear = String(new Date().getFullYear());
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    [currentYear]: true,
  });

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Group by year
  const byYear: Record<string, ShowcaseMeta[]> = {};
  for (const item of items) {
    const y = String(item.year);
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(item);
  }
  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

  return (
    <aside className="hidden md:block w-56 shrink-0">
      <ScrollArea className="h-full">
        <div className="py-4 pr-4">
          <div className="mb-3 px-2">
            <span className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">
              成果展示
            </span>
          </div>

          <nav>
            {years.map((year) => {
              const isYearOpen = expanded[year] ?? false;
              const weekItems = byYear[year].sort((a, b) =>
                b.week_start.localeCompare(a.week_start)
              );

              return (
                <div key={year} className="mb-1">
                  <button
                    onClick={() => toggle(year)}
                    className="flex w-full items-center gap-1.5 px-2 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-foreground/4 transition-colors"
                  >
                    <ChevronRight
                      className={cn(
                        "h-3 w-3 shrink-0 transition-transform duration-200 text-muted-foreground",
                        isYearOpen && "rotate-90"
                      )}
                    />
                    {year}年
                  </button>

                  {isYearOpen && (
                    <div className="ml-3 border-l border-border pl-2">
                      {weekItems.map((item) => {
                        const href = `/showcase/${item.slug[0]}/${item.slug[1]}`;
                        const isActive = pathname === href;
                        return (
                          <Link
                            key={href}
                            href={href}
                            prefetch={false}
                            className={cn(
                              "flex items-center px-2 py-1.5 rounded-md text-xs transition-colors leading-snug",
                              isActive
                                ? "text-primary bg-primary/8 font-medium"
                                : "text-text-2 hover:text-foreground hover:bg-foreground/4"
                            )}
                          >
                            <span className="truncate font-mono">{item.week}</span>
                          </Link>
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
