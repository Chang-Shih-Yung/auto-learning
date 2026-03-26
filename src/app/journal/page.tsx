import { getAllPosts, getJournalTree } from "@/lib/posts";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "journal",
};

export default function JournalIndexPage() {
  const posts = getAllPosts();
  const tree = getJournalTree();

  return (
    <div className="flex flex-col md:flex-row gap-8 py-10 min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <Sidebar tree={tree} />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="max-w-[860px]">
          <h1
            className="text-2xl font-semibold text-[#1a1a18] mb-2"
            style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
          >
            journal
          </h1>
          <p
            className="text-sm text-[#5a5856] mb-8"
            style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
          >
            共 {posts.length} 篇紀錄
          </p>

          {posts.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 rounded-xl text-center"
              style={{ background: "#f8f6f3", border: "1px solid rgba(26,26,24,0.06)" }}
            >
              <FileText className="h-8 w-8 text-[#9a9896] mb-3" />
              <p className="text-sm text-[#9a9896]">尚無日誌</p>
            </div>
          ) : (
            <div className="space-y-2">
              {posts.map((post) => (
                <Link
                  key={post.slug.join("/")}
                  href={`/journal/${post.slug.join("/")}`}
                  className="group flex items-start gap-4 px-4 py-3.5 rounded-lg transition-colors hover:bg-[rgba(61,107,94,0.04)]"
                  style={{ border: "1px solid rgba(26,26,24,0.06)" }}
                >
                  <span
                    className="text-xs font-mono text-[#9a9896] flex-shrink-0 mt-0.5"
                    style={{ fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" }}
                  >
                    {post.date}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-sm font-medium text-[#1a1a18] group-hover:text-[#3d6b5e] transition-colors mb-1 line-clamp-1"
                      style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
                    >
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p
                        className="text-xs text-[#9a9896] line-clamp-1"
                        style={{ fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif" }}
                      >
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
