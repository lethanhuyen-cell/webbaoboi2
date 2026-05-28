# Bảo Bối Story Hub V2 - Illustrated Story Platform

Bảo Bối Story Hub is a content library for children's illustrated stories with audio and text, divided into three age groups (3–8, 9–12, and 12–15). It acts as a central content repository, allowing authors and editors to manage stories and distribute adapted editions to various social platforms.

---

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Data Persistence**: Client-side state manager (`localStorage`) with 12 highly detailed sample stories preloaded.

---

## 🎯 Current MVP Features

1. **Public Homepage**: 
   - Age-based story selection cards.
   - Featured, New, and Bedtime stories slider/grid.
   - Educational guidelines for parents on child psychology and digital safety.
2. **Library**: 
   - Deep search by title, tags, or description.
   - Comprehensive sidebar filters: Age, Topic, Duration, Emotion, Skill, Language, and Format (Read, Listen, Watch).
3. **Story Detail Page**: 
   - Displays reading & listening durations, illustration, parent guides, credits, and related stories recommendation.
4. **Story Reading Page**: 
   - Clean, calming readability layout.
   - **Calm Bedtime Mode**: Soft dark palette to protect young children's eyes before sleep.
   - **Audio Player**: Sync mock word highlighting while reading.
   - Post-story discussion prompts for parents.
5. **Admin CMS Panel**:
   - Tabbed admin panel with responsive sidebar layout.
   - **Editor**: Full fields metadata editor, pages editor, and mock image/audio uploads.
   - **Safety review**: Mandatory 12-point checklist for children safety.
   - **Publishing Dashboard**: Platform-specific captions, aspect ratios, thumbnails, and simulated deployment triggers.
   - **Analytics Dashboard**: Simulated reads, plays, completion rates, and next content recommendations.

---

## 🛡️ Safety & Educational Principles

1. **Safety before Virality**: No unmoderated comments, open chat, or profile matching.
2. **Zero Advertisements**: Absolutely no direct product targeting to minors.
3. **No Addictive Loops**: No endless scrolling or reward manipulation.
4. **Banned Unregulated AI**: No machine-generated stories can be posted without 100% human-in-the-loop review.
5. **Generational Bridging**: Focus on parent-child interactions via discussion guides.

---

## 🛠️ How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Development Server**:
   ```bash
   npm run dev
   ```
3. **Open the browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔮 Future API Integration Plan (TODOs)

The multi-platform publishing dashboard is pre-configured with placeholder metadata and buttons. When transitioning to production, the following integrations are scheduled:

```typescript
// TODO: Integrate YouTube Data API v3
// - Automate video upload (aspect ratio 16:9)
// - Inject generated tags, titles, and localized description
// - Reference: https://developers.google.com/youtube/v3

// TODO: Integrate TikTok Content Posting API
// - Post portrait short videos (aspect ratio 9:16)
// - Schedule auto-posts via server hook
// - Reference: https://developers.tiktok.com/doc/content-posting-api

// TODO: Integrate Facebook Pages API
// - Auto-post carousel updates and community discussions for parents
// - Reference: https://developers.facebook.com/docs/pages

// TODO: Integrate Instagram Graph API
// - Publish multi-image carousels and Reels directly from the CMS
// - Reference: https://developers.facebook.com/docs/instagram-api

// TODO: Integrate Zalo OA API
// - Send weekly notification broadcasts to registered parent followers
// - Reference: https://developers.zalo.me/docs/official-account

// TODO: Automate Podcast RSS Feeds
// - Generate and host a compliant XML feed for Spotify Podcast, Apple Podcast, and Google Podcast
// - Upload audio mp3 directly to cloud storage (e.g. AWS S3) and update RSS

// TODO: Integrate Email Newsletter Provider
// - Connect with services like Mailchimp or Resend
// - Automatically compile and send "Bedtime Stories of the Week" to subscribed parents
```
