import { notFound } from "next/navigation";
import { getAllBookmarks, getBookmark, getBookmarkTree } from "@/lib/bookmarks";
import Sidebar from "@/components/Sidebar";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CalendarDays, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AnnotationCard from "@/components/AnnotationCard";

interface PageProps {
  params: {
    slug: string[];
  };
}

const mdxComponents = {
  AnnotationCard,
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 rounded-md border border-border overflow-hidden">
      <Table {...props}>{children}</Table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <TableHeader {...props}>{children}</TableHeader>
  ),
  tbody: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <TableBody {...props}>{children}</TableBody>
  ),
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <TableRow {...props}>{children}</TableRow>
  ),
  th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <TableHead {...props}>{children}</TableHead>
  ),
  td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <TableCell {...props}>{children}</TableCell>
  ),
};

export async function generateStaticParams() {
  const bookmarks = getAllBookmarks();
  return bookmarks.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const bookmark = getBookmark(params.slug);
  if (!bookmark) return { title: "Not Found" };
  return { title: bookmark.title };
}

export default function BookmarkPostPage({ params }: Readonly<PageProps>) {
  const bookmark = getBookmark(params.slug);
  if (!bookmark) notFound();

  const allBookmarks = getAllBookmarks();
  const tree = getBookmarkTree(allBookmarks);

  const currentIndex = allBookmarks.findIndex(
    (b) => b.slug.join("/") === bookmark.slug.join("/")
  );
  const newerBookmark = currentIndex > 0 ? allBookmarks[currentIndex - 1] : null;
  const olderBookmark =
    currentIndex < allBookmarks.length - 1 ? allBookmarks[currentIndex + 1] : null;

  return (
    <div className="flex flex-col md:flex-row gap-8 py-10 min-h-[calc(100vh-3.5rem)]">
      <Sidebar tree={tree} label="書籤" basePath="/bookmarks" />

      <article className="flex-1 min-w-0">
        <div className="max-w-215">
          <Link
            href="/bookmarks"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            書籤
          </Link>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground">
                {bookmark.date}
              </span>
            </div>
            {bookmark.url && (
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-primary transition-colors border border-foreground/10 rounded px-1.5 py-0.5"
              >
                原文
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {bookmark.note && (
            <p className="font-serif text-sm text-muted-foreground italic mb-6 border-l-2 border-foreground/10 pl-3">
              {bookmark.note}
            </p>
          )}

          <div className="prose-journal">
            <MDXRemote
              source={bookmark.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] }, blockJS: false }}
              components={mdxComponents}
            />
          </div>

          {(olderBookmark || newerBookmark) && (
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border md:hidden">
              {olderBookmark ? (
                <Link
                  href={`/bookmarks/${olderBookmark.slug.join("/")}`}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                  {olderBookmark.date}
                </Link>
              ) : (
                <span />
              )}
              {newerBookmark ? (
                <Link
                  href={`/bookmarks/${newerBookmark.slug.join("/")}`}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {newerBookmark.date}
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
              ) : (
                <span />
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
