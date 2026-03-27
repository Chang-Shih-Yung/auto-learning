"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import * as SheetPrimitive from "@radix-ui/react-dialog";
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
    <header className="sticky top-0 z-50 w-full border-b border-foreground/6 bg-background/82 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-300 items-center justify-between px-4 md:px-6">
        {/* Logo + Site name */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-foreground hover:opacity-80 transition-opacity"
        >
          <span className="font-serif text-sm tracking-tight">
            Henry's Learning Hub
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 font-sans">
          {navLinks.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm transition-colors",
                  isActive
                    ? "text-primary bg-primary/8 font-medium"
                    : "text-text-2 hover:text-foreground hover:bg-foreground/4"
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
            className="ml-2 px-3 py-2.5 rounded-md text-sm text-text-2 hover:text-foreground hover:bg-foreground/4 transition-colors"
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
            className="px-3 py-1.5 rounded-md text-sm text-text-2 hover:text-foreground transition-colors"
          >
            GitHub
          </a>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="p-2 rounded-md text-text-2 hover:text-foreground transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs pt-14 bg-background border-l border-foreground/6"
            >
              <VisuallyHidden>
                <SheetTitle>導覽選單</SheetTitle>
                <SheetDescription>網站主要導覽連結</SheetDescription>
              </VisuallyHidden>
              <nav className="flex flex-col gap-1 font-serif">
                {navLinks.map(({ href, label }) => {
                  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
                  return (
                    <SheetPrimitive.Close asChild key={href}>
                      <Link
                        href={href}
                        className={cn(
                          "px-4 py-3 rounded-md text-base transition-colors text-right",
                          isActive
                            ? "text-primary bg-primary/8 font-medium"
                            : "text-text-2 hover:text-foreground hover:bg-foreground/4"
                        )}
                      >
                        {label}
                      </Link>
                    </SheetPrimitive.Close>
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
