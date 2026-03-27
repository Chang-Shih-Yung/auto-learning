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
        <div className="max-w-215">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">
            journal
          </h1>
          <p className="font-serif text-sm text-text-2 mb-8">
            共 {posts.length} 篇紀錄
          </p>

          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-xl text-center bg-muted border border-foreground/6">
              <FileText className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">尚無日誌</p>
            </div>
          ) : (
            <div className="space-y-2">
              {posts.map((post) => (
                <Link
                  key={post.slug.join("/")}
                  href={`/journal/${post.slug.join("/")}`}
                  prefetch={false}
                  className="group flex items-start gap-4 px-4 py-3.5 rounded-lg border border-foreground/6 transition-colors hover:bg-primary/4"
                >
                  <span className="font-mono text-xs text-muted-foreground shrink-0 mt-0.5">
                    {post.date}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif text-sm font-medium text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-1">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="font-serif text-xs text-muted-foreground line-clamp-1">
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
