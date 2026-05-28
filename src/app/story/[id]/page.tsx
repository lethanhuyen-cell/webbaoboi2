"use client";

import { useEffect, useState, use } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getStoryById, getStories } from "@/data/store";
import { Story } from "@/data/mockStories";
import { 
  Clock, 
  Volume2, 
  BookOpen, 
  Tag, 
  Languages, 
  ArrowLeft,
  Play,
  Heart,
  FileText,
  User,
  ShieldAlert,
  HelpCircle,
  Sparkles
} from "lucide-react";

export default function StoryDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [story, setStory] = useState<Story | null>(null);
  const [relatedStories, setRelatedStories] = useState<Story[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!id) return;
    const currentStory = getStoryById(id);
    if (currentStory) {
      setStory(currentStory);
      
      // Get related stories (same age group or same topic, excluding current)
      const allStories = getStories().filter(s => s.reviewStatus === "published");
      const related = allStories
        .filter(s => s.id !== id && (s.ageGroup === currentStory.ageGroup || s.topic === currentStory.topic))
        .slice(0, 3);
      setRelatedStories(related.length > 0 ? related : allStories.filter(s => s.id !== id).slice(0, 3));
    }
    setMounted(true);
  }, [id]);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-zinc-800">Không tìm thấy câu chuyện</h2>
        <p className="text-zinc-500 mt-2">Câu chuyện bạn tìm kiếm không tồn tại hoặc chưa được xuất bản.</p>
        <Link
          href="/library"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại thư viện
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link
        href="/library"
        className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-500 hover:text-orange-500 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại thư viện
      </Link>

      {/* Story Core Info Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left: Huge Illustration */}
        <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-orange-100 bg-white p-3 shadow-md">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-50">
            <img
              src={story.thumbnailHorizontal}
              alt={story.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="mt-3 flex items-center justify-between px-2 text-xs text-zinc-400 font-medium">
            <span>Họa sĩ: {story.illustrator}</span>
            <span>Bản quyền: {story.copyrightStatus ? "Đã xác thực" : "Đang kiểm tra"}</span>
          </div>
        </div>

        {/* Right: Metadata & Actions */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                Độ tuổi: {story.ageGroup} tuổi
              </span>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 border border-orange-100">
                Chủ đề: {story.topic}
              </span>
              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 border border-purple-100">
                Cảm xúc: {story.mainEmotion}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              {story.title}
            </h1>
            {story.titleEn && (
              <p className="text-zinc-400 text-sm font-semibold italic -mt-1">
                English: {story.titleEn}
              </p>
            )}

            <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 mt-2 bg-zinc-50 px-4 py-2 rounded-xl w-fit">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-orange-500" />
                <span>{story.readDuration} phút đọc</span>
              </div>
              <span className="text-zinc-200">|</span>
              <div className="flex items-center gap-1.5">
                <Volume2 className="h-4 w-4 text-purple-500" />
                <span>{story.audioDuration} phút nghe</span>
              </div>
              <span className="text-zinc-200">|</span>
              <div className="flex items-center gap-1.5">
                <Languages className="h-4 w-4 text-emerald-500" />
                <span>
                  {story.language === "vi" ? "Tiếng Việt" : story.language === "en" ? "English" : "Việt - Anh"}
                </span>
              </div>
            </div>
          </div>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            {story.longDescription || story.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href={`/story/${story.id}/read`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-orange-500 px-8 font-bold text-white shadow-md hover:bg-orange-600 transition-all hover:shadow-lg flex-1 sm:flex-initial"
            >
              <BookOpen className="h-5 w-5" />
              Bắt đầu đọc truyện
            </Link>
            {story.audioFile && (
              <Link
                href={`/story/${story.id}/read?autoplay=true`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-orange-200 bg-orange-50/50 px-8 font-bold text-orange-700 hover:bg-orange-50 transition-colors flex-1 sm:flex-initial"
              >
                <Volume2 className="h-5 w-5" />
                Nghe Kể Chuyện (Audio)
              </Link>
            )}
          </div>

          {/* Author Credits */}
          <div className="border-t border-zinc-100 pt-6 grid grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-2 bg-zinc-50/50 p-2.5 rounded-xl border border-zinc-100">
              <User className="h-4 w-4 text-zinc-400 shrink-0" />
              <div>
                <p className="font-semibold text-zinc-400">Tác giả</p>
                <p className="font-bold text-zinc-700">{story.author}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-zinc-50/50 p-2.5 rounded-xl border border-zinc-100">
              <User className="h-4 w-4 text-zinc-400 shrink-0" />
              <div>
                <p className="font-semibold text-zinc-400">Minh họa</p>
                <p className="font-bold text-zinc-700">{story.illustrator}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-zinc-50/50 p-2.5 rounded-xl border border-zinc-100">
              <Volume2 className="h-4 w-4 text-zinc-400 shrink-0" />
              <div>
                <p className="font-semibold text-zinc-400">Giọng đọc</p>
                <p className="font-bold text-zinc-700">{story.voiceNarrator}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Guide Section */}
      <div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50/20 to-amber-50/20 p-6 sm:p-8 mb-12 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2 mb-4">
          <Heart className="h-5 w-5 text-orange-500 fill-orange-500" />
          Hướng dẫn dành cho phụ huynh (Parent Guide)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-sm text-zinc-700 mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-orange-500" />
              Giá trị giáo dục & Kỹ năng phát triển
            </h4>
            <p className="text-sm text-zinc-600 leading-relaxed bg-white p-4 rounded-xl border border-orange-50/50">
              {story.parentGuide.educationalValue}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-700 mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-purple-500" />
              Gợi ý câu hỏi thảo luận cùng con
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              {story.parentGuide.discussionQuestions.map((q, idx) => (
                <li key={idx} className="flex gap-2.5 bg-white p-3 rounded-xl border border-purple-50/50">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-[10px] font-bold text-purple-600 border border-purple-100">
                    {idx + 1}
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Stories */}
      <div>
        <h2 className="text-xl font-bold text-zinc-900 mb-6">Truyện liên quan có thể bé sẽ thích</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedStories.map((related) => (
            <Link 
              key={related.id} 
              href={`/story/${related.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-sm hover:shadow-md transition-all hover:translate-y-[-2px]"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-50">
                <img
                  src={related.thumbnailHorizontal}
                  alt={related.title}
                  className="h-full w-full object-cover transition-transform duration-350 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                    Độ tuổi: {related.ageGroup} | {related.topic}
                  </span>
                  <h3 className="font-bold text-zinc-900 group-hover:text-orange-500 transition-colors mt-1 line-clamp-1">
                    {related.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    {related.description}
                  </p>
                </div>
                <div className="mt-4 text-xs font-bold text-orange-600 flex items-center justify-end">
                  Chi tiết →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
