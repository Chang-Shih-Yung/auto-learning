import { notFound } from "next/navigation";
import { getAllPosts, getPost, getJournalTree } from "@/lib/posts";
import Sidebar from "@/components/Sidebar";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
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

// MDX component map — Server Components (table) and AnnotationCard (Server Component)
const mdxComponents = {
  AnnotationCard,
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 rounded-md border border-[rgba(26,26,24,0.08)] overflow-hidden">
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
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return { title: "Not Found" };
  return { title: post.title };
}

export default function JournalPostPage({ params }: PageProps) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const tree = getJournalTree();

  // Prev / next for mobile navigation (posts sorted desc: index 0 = newest)
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug.join("/") === post.slug.join("/"));
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const olderPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="flex flex-col md:flex-row gap-8 py-10 min-h-[calc(100vh-3.5rem)]">
      <Sidebar tree={tree} />

      <article className="flex-1 min-w-0">
        <div className="max-w-[860px]">
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 text-xs text-[#767472] hover:text-[#3d6b5e] transition-colors mb-6"
            style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            journal
          </Link>

          <div className="flex items-center gap-1.5 mb-4">
            <CalendarDays className="h-3.5 w-3.5 text-[#767472]" />
            <span
              className="text-xs text-[#767472]"
              style={{ fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" }}
            >
              {post.date}
            </span>
          </div>

          <div className="prose-journal">
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] }, blockJS: false }}
              components={mdxComponents}
            />
          </div>

          {/* Mobile prev/next — hidden on md+ (sidebar handles navigation there) */}
          {(olderPost || newerPost) && (
            <div
              className="flex items-center justify-between mt-10 pt-6 md:hidden"
              style={{ borderTop: "1px solid rgba(26,26,24,0.08)" }}
            >
              {olderPost ? (
                <Link
                  href={`/journal/${olderPost.slug.join("/")}`}
                  className="inline-flex items-center gap-1.5 text-xs text-[#767472] hover:text-[#3d6b5e] transition-colors"
                  style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
                >
                  <ChevronLeft className="h-3.5 w-3.5 flex-shrink-0" />
                  {olderPost.date}
                </Link>
              ) : (
                <span />
              )}
              {newerPost ? (
                <Link
                  href={`/journal/${newerPost.slug.join("/")}`}
                  className="inline-flex items-center gap-1.5 text-xs text-[#767472] hover:text-[#3d6b5e] transition-colors"
                  style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
                >
                  {newerPost.date}
                  <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
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
