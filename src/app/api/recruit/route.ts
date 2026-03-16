import { NextRequest, NextResponse } from "next/server";
import { createRecruitApplication, getRecruitApplications } from "@/lib/data";

export async function GET() {
  try {
    const apps = await getRecruitApplications();
    return NextResponse.json({ applications: apps });
  } catch {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = ["characterName", "realm", "faction", "characterClass", "spec", "ilvl", "experience", "availability", "aboutYou"];
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const app = await createRecruitApplication({
      characterName: body.characterName.trim(),
      realm: body.realm.trim(),
      faction: body.faction,
      characterClass: body.characterClass,
      spec: body.spec.trim(),
      ilvl: body.ilvl.toString().trim(),
      raiderio: body.raiderio?.trim() || undefined,
      warcraftlogs: body.warcraftlogs?.trim() || undefined,
      experience: body.experience.trim(),
      availability: body.availability.trim(),
      aboutYou: body.aboutYou.trim(),
      referral: body.referral?.trim() || undefined,
    });

    return NextResponse.json({ success: true, application: app }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
