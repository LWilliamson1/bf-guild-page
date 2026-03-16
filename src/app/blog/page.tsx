import Link from "next/link";
import { getBlogPosts } from "@/lib/data";
import { Calendar, Tag, PenLine, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <div style={{ color: "#c8a951", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Belligerent Fury
        </div>
        <h1 className="wow-heading" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>
          Guild News
        </h1>
        <p style={{ color: "#8892a4", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 1.5rem" }}>
          Progression updates, guild announcements, recruitment news, and more — straight from Zhath and your officers.
        </p>
        <Link href="/blog/new" className="btn-wow inline-flex items-center gap-2" style={{ fontSize: "0.875rem" }}>
          <Plus size={14} /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20" style={{ color: "#8892a4" }}>
          <PenLine size={40} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
          <p>No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <article
                className="wow-card"
                style={{ padding: "1.75rem", borderRadius: "4px", display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        background: "rgba(200,169,81,0.08)",
                        border: "1px solid rgba(200,169,81,0.2)",
                        color: "#c8a951",
                        fontSize: "0.7rem",
                        padding: "0.15rem 0.6rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      <Tag size={9} />
                      {t}
                    </span>
                  ))}
                </div>

                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#e8dfc8", lineHeight: 1.35, margin: 0 }}>
                  {post.title}
                </h2>

                <p style={{ color: "#8892a4", fontSize: "0.925rem", lineHeight: 1.7, margin: 0 }}>
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-4 items-center justify-between" style={{ marginTop: "0.25rem" }}>
                  <div className="flex items-center gap-4" style={{ fontSize: "0.8rem", color: "#6a7480" }}>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    <span>
                      By{" "}
                      <span
                        style={{
                          color: post.authorClass === "Demon Hunter" ? "#a330c9" : "#c8a951",
                          fontWeight: 600,
                        }}
                      >
                        {post.author}
                      </span>
                      {" · "}
                      <span style={{ color: "#6a7480" }}>{post.authorClass}</span>
                    </span>
                  </div>
                  <span style={{ color: "#c8a951", fontSize: "0.85rem" }}>Read More →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
