import { Story, INITIAL_STORIES } from "./mockStories";

const STORAGE_KEY = "baoboi_stories_v2";

export function isClient(): boolean {
  return typeof window !== "undefined";
}

// Get cached stories from localStorage or static mock
export function getStories(): Story[] {
  if (!isClient()) {
    return INITIAL_STORIES;
  }
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STORIES));
    return INITIAL_STORIES;
  }
  
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to parse stories from localStorage", e);
    return INITIAL_STORIES;
  }
}

// Background sync stories from PostgreSQL Cloud DB to Client Storage
export async function syncStoriesFromServer(): Promise<Story[]> {
  if (!isClient()) return INITIAL_STORIES;
  
  try {
    const res = await fetch("/api/stories");
    if (!res.ok) throw new Error("Server error");
    const json = await res.json();
    if (json.success && Array.isArray(json.stories) && json.stories.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(json.stories));
      return json.stories;
    }
  } catch (e) {
    console.warn("Could not sync with server, using local storage cache:", e);
  }
  return getStories();
}

export function getStoryById(id: string): Story | undefined {
  const stories = getStories();
  return stories.find(s => s.id === id);
}

// Save story: Local Storage first, then async Server write
export async function saveStory(updatedStory: Story): Promise<void> {
  if (!isClient()) return;
  
  // 1. Update localStorage cache immediately
  const stories = getStories();
  const index = stories.findIndex(s => s.id === updatedStory.id);
  if (index !== -1) {
    stories[index] = updatedStory;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }

  // 2. Write to server API
  try {
    const res = await fetch(`/api/stories/${updatedStory.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStory)
    });
    if (!res.ok) {
      console.warn("Cloud DB update returned error. Persisted in localStorage only.");
    }
  } catch (e) {
    console.warn("Failed to sync updated story to Cloud DB, saved locally:", e);
  }
}

// Create story: Local Storage first, then Server write
export async function createStory(newStory: Story): Promise<void> {
  if (!isClient()) return;
  
  // 1. Update localStorage cache immediately
  const stories = getStories();
  stories.push(newStory);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));

  // 2. Write to server API
  try {
    const res = await fetch("/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStory)
    });
    if (!res.ok) {
      console.warn("Cloud DB create returned error. Persisted in localStorage only.");
    }
  } catch (e) {
    console.warn("Failed to sync new story to Cloud DB, saved locally:", e);
  }
}

// Delete story: Local Storage first, then Server write
export async function deleteStory(id: string): Promise<void> {
  if (!isClient()) return;
  
  // 1. Update localStorage cache immediately
  const stories = getStories();
  const filtered = stories.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

  // 2. Write to server API
  try {
    const res = await fetch(`/api/stories/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) {
      console.warn("Cloud DB delete returned error. Deleted from localStorage only.");
    }
  } catch (e) {
    console.warn("Failed to sync delete to Cloud DB, deleted locally:", e);
  }
}

export function resetStories(): void {
  if (!isClient()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STORIES));
}

// Generate platform publishing readiness score
export function getReadinessScore(story: Story): number {
  let score = 0;
  const checklist = story.safetyChecklist;
  
  // 12 points for the 12 checklist items
  const items = Object.values(checklist);
  const checkedCount = items.filter(Boolean).length;
  
  // Additional points for metadata completion
  let metadataPoints = 0;
  if (story.title) metadataPoints += 5;
  if (story.description) metadataPoints += 5;
  if (story.topic) metadataPoints += 5;
  if (story.mainEmotion) metadataPoints += 5;
  if (story.skill) metadataPoints += 5;
  if (story.author) metadataPoints += 5;
  if (story.illustrator) metadataPoints += 5;
  if (story.voiceNarrator) metadataPoints += 5;
  if (story.thumbnailHorizontal) metadataPoints += 5;
  if (story.audioFile) metadataPoints += 5;
  if (story.pages && story.pages.length > 0) metadataPoints += 15;
  
  // Normalize score to 100
  const checklistWeight = 40; // 40%
  const metadataWeight = 60; // 60%
  
  const checklistScore = (checkedCount / items.length) * checklistWeight;
  const metadataScore = (metadataPoints / 65) * metadataWeight;
  
  return Math.round(checklistScore + metadataScore);
}
