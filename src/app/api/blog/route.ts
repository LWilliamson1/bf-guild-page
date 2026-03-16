import { NextRequest, NextResponse } from "next/server";
import { createBlogPost, getBlogPosts } from "@/lib/data";

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["title", "slug", "excerpt", "content", "author", "authorClass"];
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const post = await createBlogPost({
      title: body.title.trim(),
      slug: body.slug.trim().toLowerCase().replace(/\s+/g, "-"),
      excerpt: body.excerpt.trim(),
      content: body.content.trim(),
      author: body.author.trim(),
      authorClass: body.authorClass,
      date: body.date || new Date().toISOString().split("T")[0],
      tags: Array.isArray(body.tags) ? body.tags : [],
      image: body.image || null,
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
