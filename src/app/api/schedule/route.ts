import { NextRequest, NextResponse } from "next/server";
import { createScheduleEvent, getScheduleEvents } from "@/lib/data";

export async function GET() {
  try {
    const events = await getScheduleEvents();
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["title", "type", "leader", "leaderClass", "description", "startTime", "endTime"];
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    if (!body.recurring && !body.date) {
      return NextResponse.json(
        { error: "Either 'recurring' day or a specific 'date' is required" },
        { status: 400 }
      );
    }

    const event = await createScheduleEvent({
      title: body.title.trim(),
      type: body.type,
      raidInstance: body.raidInstance?.trim() || null,
      difficulty: body.difficulty?.trim() || null,
      leader: body.leader.trim(),
      leaderClass: body.leaderClass,
      description: body.description.trim(),
      startTime: body.startTime.trim(),
      endTime: body.endTime.trim(),
      date: body.date || undefined,
      recurring: body.recurring || null,
      color: body.color || "#c8a951",
      signups: body.signups || 0,
      rosterSize: body.rosterSize || null,
    });

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
