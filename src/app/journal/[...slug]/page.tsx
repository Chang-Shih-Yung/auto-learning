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
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return { title: "Not Found" };
  return { title: post.title };
}

export default function JournalPostPage({ params }: Readonly<PageProps>) {
  const post = getPost(params.slug);
  if (!post) notFound();

  // Fetch once — shared by tree (sidebar) and prev/next
  const allPosts = getAllPosts();
  const tree = getJournalTree(allPosts);

  const currentIndex = allPosts.findIndex((p) => p.slug.join("/") === post.slug.join("/"));
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const olderPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="flex flex-col md:flex-row gap-8 py-10 min-h-[calc(100vh-3.5rem)]">
      <Sidebar tree={tree} />

      <article className="flex-1 min-w-0">
        <div className="max-w-215">
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            journal
          </Link>

          <div className="flex items-center gap-1.5 mb-4">
            <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">
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
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border md:hidden">
              {olderPost ? (
                <Link
                  href={`/journal/${olderPost.slug.join("/")}`}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                  {olderPost.date}
                </Link>
              ) : (
                <span />
              )}
              {newerPost ? (
                <Link
                  href={`/journal/${newerPost.slug.join("/")}`}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {newerPost.date}
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
