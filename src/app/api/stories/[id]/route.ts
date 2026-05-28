import { NextResponse } from "next/server";
import { prisma } from "@/data/db";
import { parseDbStory } from "../route";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id?: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, error: "Missing ID parameter" }, { status: 400 });
  }
  
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: "Database not configured." }, { status: 503 });
  }

  try {
    const dbStory = await prisma.story.findUnique({
      where: { id }
    });
    if (!dbStory) {
      return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, story: parseDbStory(dbStory) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id?: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, error: "Missing ID parameter" }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: "Database not configured." }, { status: 503 });
  }

  try {
    const data = await request.json();
    
    // Clean fields before update and serialize to JSON strings for SQLite
    const updateData = {
      title: data.title,
      titleEn: data.titleEn,
      seriesName: data.seriesName,
      ageGroup: data.ageGroup,
      topic: data.topic,
      mainEmotion: data.mainEmotion,
      skill: data.skill,
      description: data.description,
      longDescription: data.longDescription,
      storyText: data.storyText,
      wordCount: data.wordCount,
      pageCount: data.pageCount,
      readDuration: data.readDuration,
      audioDuration: data.audioDuration,
      language: data.language,
      author: data.author,
      illustrator: data.illustrator,
      voiceNarrator: data.voiceNarrator,
      copyrightStatus: data.copyrightStatus,
      contentWarning: data.contentWarning,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      keywords: JSON.stringify(data.keywords || []),
      thumbnailHorizontal: data.thumbnailHorizontal,
      thumbnailVertical: data.thumbnailVertical,
      squareImage: data.squareImage,
      audioFile: data.audioFile,
      videoHorizontalPlaceholder: data.videoHorizontalPlaceholder,
      videoVerticalPlaceholder: data.videoVerticalPlaceholder,
      reviewStatus: data.reviewStatus,
      reviewer: data.reviewer,
      scheduledPublishDate: data.scheduledPublishDate,
      pages: JSON.stringify(data.pages || []),
      safetyChecklist: JSON.stringify(data.safetyChecklist || {}),
      parentGuide: JSON.stringify(data.parentGuide || {}),
      socialOutputs: JSON.stringify(data.socialOutputs || {}),
    };

    const updated = await prisma.story.update({
      where: { id },
      data: updateData as any
    });

    return NextResponse.json({ success: true, story: parseDbStory(updated) });
  } catch (error: any) {
    console.error("Failed to update story in db", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id?: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, error: "Missing ID parameter" }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: "Database not configured." }, { status: 503 });
  }

  try {
    await prisma.story.delete({
      where: { id }
    });
    return NextResponse.json({ success: true, message: "Story deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
