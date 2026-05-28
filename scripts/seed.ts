/**
 * Seed script: populates the SQLite dev.db with INITIAL_STORIES
 * Run: npm run db:seed
 */
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Strip any fields from story that are not in the Prisma schema.
 * The Story TS interface has `descriptionEn` but the schema does not.
 */
function toPrismaData(story: any) {
  // Destructure out fields not in schema
  const {
    descriptionEn: _descriptionEn, // not in schema
    createdAt: _createdAt,         // managed by Prisma @default(now())
    updatedAt: _updatedAt,         // managed by Prisma @updatedAt
    ...rest
  } = story;

  return {
    ...rest,
    keywords: JSON.stringify(rest.keywords || []),
    pages: JSON.stringify(rest.pages || []),
    safetyChecklist: JSON.stringify(rest.safetyChecklist || {}),
    parentGuide: JSON.stringify(rest.parentGuide || {}),
    socialOutputs: JSON.stringify(rest.socialOutputs || {}),
  };
}

async function main() {
  console.log("🌱  Seeding Bảo Bối SQLite database...\n");

  const { INITIAL_STORIES } = await import("../src/data/mockStories");

  // Upsert each story (so re-running is safe)
  let count = 0;
  for (const story of INITIAL_STORIES) {
    const data = toPrismaData(story);
    await (prisma as any).story.upsert({
      where: { id: story.id },
      update: data,
      create: data,
    });
    count++;
    process.stdout.write(`   ✓ [${count}/${INITIAL_STORIES.length}] ${story.title}\n`);
  }

  console.log(`\n✅  Done! ${count} stories upserted into prisma/dev.db`);
}

main()
  .catch((e) => {
    console.error("\n❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
