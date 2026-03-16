import { getBlogPost, getBlogPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Tag, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 nav-link mb-8"
        style={{ fontSize: "0.875rem" }}
      >
        <ArrowLeft size={14} /> Back to News
      </Link>

      <article>
        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-4">
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

        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#e8dfc8", lineHeight: 1.3, marginBottom: "1rem" }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div
          className="flex flex-wrap items-center gap-4"
          style={{ fontSize: "0.8rem", color: "#6a7480", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #1e2230" }}
        >
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(post.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </span>
          <span>
            Written by{" "}
            <strong
              style={{ color: post.authorClass === "Demon Hunter" ? "#a330c9" : "#c8a951" }}
            >
              {post.author}
            </strong>
            {" · "}
            <span style={{ color: "#6a7480" }}>{post.authorClass}</span>
          </span>
        </div>

        {/* Content */}
        <div
          style={{
            color: "#c8c0b0",
            lineHeight: 1.85,
            fontSize: "1rem",
          }}
        >
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} style={{ marginBottom: "1.25rem" }}>
              {para}
            </p>
          ))}
        </div>
      </article>

      <div className="wow-divider" style={{ margin: "3rem 0" }} />

      <div className="flex justify-between items-center">
        <Link href="/blog" className="btn-wow" style={{ fontSize: "0.875rem" }}>
          ← All Posts
        </Link>
        <Link href="/recruit" className="btn-wow-primary" style={{ fontSize: "0.875rem" }}>
          Join the Guild
        </Link>
      </div>
    </div>
  );
}
