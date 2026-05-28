import { NextResponse } from "next/server";
import { prisma } from "@/data/db";
import { INITIAL_STORIES } from "@/data/mockStories";
import { parseDbStory } from "../route";

type Params = { params: Promise<{ id: string }> };

// GET /api/stories/[id]
export async function GET(_: Request, { params }: Params) {
  const { id } = await params;

  if (process.env.DATABASE_URL) {
    try {
      const dbStory = await prisma.story.findUnique({ where: { id } });
      if (dbStory) {
        return NextResponse.json({ success: true, story: parseDbStory(dbStory) });
      }
    } catch (e) {
      console.error("DB lookup failed, falling back to static:", e);
    }
  }

  // Fallback to static stories
  const story = INITIAL_STORIES.find((s) => s.id === id);
  if (!story) {
    return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, story, source: "fallback_static" });
}

// PUT /api/stories/[id]
export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { success: false, error: "Database not configured." },
      { status: 503 }
    );
  }

  try {
    const data = await request.json();
    const updated = await prisma.story.update({
      where: { id },
      data: {
        ...data,
        keywords: JSON.stringify(data.keywords || []),
        pages: JSON.stringify(data.pages || []),
        safetyChecklist: JSON.stringify(data.safetyChecklist || {}),
        parentGuide: JSON.stringify(data.parentGuide || {}),
        socialOutputs: JSON.stringify(data.socialOutputs || {}),
      } as any,
    });
    return NextResponse.json({ success: true, story: parseDbStory(updated) });
  } catch (error: any) {
    console.error("Failed to update story", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/stories/[id]
export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { success: false, error: "Database not configured." },
      { status: 503 }
    );
  }

  try {
    await prisma.story.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete story", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
