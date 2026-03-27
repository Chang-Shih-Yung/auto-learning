"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/journal", label: "學習日誌" },
  { href: "/showcase", label: "成果展示" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(253,252,250,0.82)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(26,26,24,0.06)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:px-6">
        {/* Logo + Site name */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-[#1a1a18] hover:opacity-80 transition-opacity"
        >
          <span className="text-sm tracking-tight" style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}>
            Henry's Learning Hub
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" style={{ fontFamily: "var(--font-sans)" }}>
          {navLinks.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm transition-colors",
                  isActive
                    ? "text-[#3d6b5e] bg-[rgba(61,107,94,0.08)] font-medium"
                    : "text-[#5a5856] hover:text-[#1a1a18] hover:bg-[rgba(26,26,24,0.04)]"
                )}
              >
                {label}
              </Link>
            );
          })}

          <a
            href="https://github.com/Chang-Shih-Yung/auto-learning"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-3 py-2.5 rounded-md text-sm text-[#5a5856] hover:text-[#1a1a18] hover:bg-[rgba(26,26,24,0.04)] transition-colors"
          >
            GitHub
          </a>
        </nav>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="https://github.com/Chang-Shih-Yung/auto-learning"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md text-sm text-[#5a5856] hover:text-[#1a1a18] transition-colors"
          >
            GitHub
          </a>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="p-2 rounded-md text-[#5a5856] hover:text-[#1a1a18] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs pt-14"
              style={{ background: "#fdfcfa", borderLeft: "1px solid rgba(26,26,24,0.06)" }}
            >
              <VisuallyHidden>
                <SheetTitle>導覽選單</SheetTitle>
                <SheetDescription>網站主要導覽連結</SheetDescription>
              </VisuallyHidden>
              <nav className="flex flex-col gap-1">
                {navLinks.map(({ href, label }) => {
                  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
                  return (
                    <SheetClose asChild key={href}>
                      <Link
                        href={href}
                        className={cn(
                          "px-4 py-3 rounded-md text-base transition-colors text-right",
                          isActive
                            ? "text-[#3d6b5e] bg-[rgba(61,107,94,0.08)] font-medium"
                            : "text-[#5a5856] hover:text-[#1a1a18] hover:bg-[rgba(26,26,24,0.04)]"
                        )}
                        style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
