import { NextRequest, NextResponse } from "next/server";
import { createGalleryItem, getGalleryItems } from "@/lib/data";

export async function GET() {
  try {
    const items = await getGalleryItems();
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["title", "description", "date"];
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const item = await createGalleryItem({
      title: body.title.trim(),
      description: body.description.trim(),
      date: body.date,
      tags: Array.isArray(body.tags) ? body.tags : [],
      imageFile: body.imageFile || undefined,
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add gallery item" }, { status: 500 });
  }
}
