import { notFound } from "next/navigation";
import { getAllPosts, getPost, getJournalTree } from "@/lib/posts";
import Sidebar from "@/components/Sidebar";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ChevronLeft, CalendarDays } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: {
    slug: string[];
  };
}

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

  return (
    <div className="flex gap-8 py-10 min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <Sidebar tree={tree} />

      {/* Main content */}
      <article className="flex-1 min-w-0">
        <div className="max-w-[860px]">
          {/* Back link */}
          <Link
            href="/學習日誌"
            className="inline-flex items-center gap-1.5 text-xs text-[#9a9896] hover:text-[#3d6b5e] transition-colors mb-6"
            style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            學習日誌
          </Link>

          {/* Date */}
          <div className="flex items-center gap-1.5 mb-4">
            <CalendarDays className="h-3.5 w-3.5 text-[#9a9896]" />
            <span
              className="text-xs text-[#9a9896]"
              style={{ fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" }}
            >
              {post.date}
            </span>
          </div>

          {/* Markdown content */}
          <div className="prose-journal">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </article>
    </div>
  );
}
