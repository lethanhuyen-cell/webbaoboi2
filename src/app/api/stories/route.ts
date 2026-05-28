import { NextResponse } from "next/server";
import { prisma } from "@/data/db";
import { INITIAL_STORIES, Story } from "@/data/mockStories";

// Helper to check if database is connected and seeded
async function getStoriesFromDb(): Promise<Story[] | null> {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  try {
    const dbStories = await prisma.story.findMany({
      orderBy: { createdAt: "asc" }
    });
    
    // If database is connected but empty, seed it with initial stories
    if (dbStories.length === 0) {
      console.log("SQLite Database is empty, seeding initial stories...");
      for (const story of INITIAL_STORIES) {
        await prisma.story.create({
          data: {
            ...story,
            keywords: JSON.stringify(story.keywords || []),
            pages: JSON.stringify(story.pages || []),
            safetyChecklist: JSON.stringify(story.safetyChecklist || {}),
            parentGuide: JSON.stringify(story.parentGuide || {}),
            socialOutputs: JSON.stringify(story.socialOutputs || {}),
          } as any
        });
      }
      const refetched = await prisma.story.findMany({
        orderBy: { createdAt: "asc" }
      });
      return refetched.map(parseDbStory);
    }

    return dbStories.map(parseDbStory);
  } catch (error) {
    console.error("Database connection failed, falling back to static stories.", error);
    return null;
  }
}

// Convert DB String columns back to JS objects
export function parseDbStory(dbStory: any): Story {
  return {
    ...dbStory,
    keywords: typeof dbStory.keywords === "string" ? JSON.parse(dbStory.keywords) : dbStory.keywords,
    pages: typeof dbStory.pages === "string" ? JSON.parse(dbStory.pages) : dbStory.pages,
    safetyChecklist: typeof dbStory.safetyChecklist === "string" ? JSON.parse(dbStory.safetyChecklist) : dbStory.safetyChecklist,
    parentGuide: typeof dbStory.parentGuide === "string" ? JSON.parse(dbStory.parentGuide) : dbStory.parentGuide,
    socialOutputs: typeof dbStory.socialOutputs === "string" ? JSON.parse(dbStory.socialOutputs) : dbStory.socialOutputs,
  };
}

export async function GET() {
  const dbStories = await getStoriesFromDb();
  if (dbStories) {
    return NextResponse.json({ success: true, stories: dbStories, source: "sqlite_database" });
  }
  // Fallback
  return NextResponse.json({ success: true, stories: INITIAL_STORIES, source: "fallback_static" });
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { success: false, error: "Database not configured. Cloud save disabled." },
      { status: 503 }
    );
  }
  
  try {
    const data: Story = await request.json();
    
    const created = await prisma.story.create({
      data: {
        ...data,
        keywords: JSON.stringify(data.keywords || []),
        pages: JSON.stringify(data.pages || []),
        safetyChecklist: JSON.stringify(data.safetyChecklist || {}),
        parentGuide: JSON.stringify(data.parentGuide || {}),
        socialOutputs: JSON.stringify(data.socialOutputs || {}),
      } as any
    });

    return NextResponse.json({ success: true, story: parseDbStory(created) });
  } catch (error: any) {
    console.error("Failed to create story in db", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
