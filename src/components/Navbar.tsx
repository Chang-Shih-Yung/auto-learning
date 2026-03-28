"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

function GithubIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/journal", label: "學習日誌" },
  { href: "/news", label: "AI 世界" },
  { href: "/showcase", label: "成果展示" },
  { href: "/about", label: "關於" },
];

function NavLink({
  href,
  label,
  pathname,
  mobile = false,
}: Readonly<{ href: string; label: string; pathname: string; mobile?: boolean }>) {
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  const className = cn(
    "rounded-md text-sm transition-colors",
    mobile ? "px-4 py-3 text-right" : "px-3 py-2.5",
    isActive
      ? "text-primary bg-primary/8 font-medium"
      : "text-text-2 hover:text-foreground hover:bg-foreground/4"
  );
  if (mobile) {
    return (
      <SheetClose render={<Link href={href} className={className} />}>
        {label}
      </SheetClose>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

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
          {navLinks.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} pathname={pathname} />
          ))}

          <a
            href="https://github.com/Chang-Shih-Yung/auto-learning"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="ml-2 p-2 rounded-md text-text-2 hover:text-foreground hover:bg-foreground/4 transition-colors"
          >
            <GithubIcon className="h-5 w-5" />
          </a>

          <ThemeToggle />
        </nav>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-1 md:hidden font-sans">
          <ThemeToggle />

          <a
            href="https://github.com/Chang-Shih-Yung/auto-learning"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-md text-text-2 hover:text-foreground hover:bg-foreground/4 transition-colors"
          >
            <GithubIcon className="h-5 w-5" />
          </a>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="p-2 rounded-md text-text-2 hover:text-foreground hover:bg-foreground/4 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs pt-14 bg-background border-l border-foreground/6"
              showCloseButton={false}
            >
              <SheetTitle className="sr-only">導覽選單</SheetTitle>
              <SheetDescription className="sr-only">網站主要導覽連結</SheetDescription>
              <nav className="flex flex-col gap-1 font-sans">
                {navLinks.map(({ href, label }) => (
                  <NavLink key={href} href={href} label={label} pathname={pathname} mobile />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
