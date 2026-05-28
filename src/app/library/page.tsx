"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getStories, syncStoriesFromServer } from "@/data/store";
import { Story } from "@/data/mockStories";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Volume2, 
  Tv, 
  Clock, 
  RotateCcw,
  Tag,
  Languages,
  ArrowLeft
} from "lucide-react";

function LibraryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [mounted, setMounted] = useState(false);

  // Filter States
  const [search, setSearch] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [emotion, setEmotion] = useState("");
  const [language, setLanguage] = useState("");
  const [format, setFormat] = useState(""); // read, listen, watch

  // Load from store on mount
  useEffect(() => {
    // Read immediate localStorage cache first
    setStories(getStories());
    setMounted(true);

    // Sync from server DB in the background
    syncStoriesFromServer().then(synced => {
      setStories(synced);
    });
  }, []);


  // Update filter states from URL query params
  useEffect(() => {
    if (!mounted) return;

    const querySearch = searchParams.get("search") || "";
    const queryAge = searchParams.get("age") || "";
    const queryTopic = searchParams.get("topic") || "";
    const queryDuration = searchParams.get("duration") || "";
    const queryEmotion = searchParams.get("emotion") || "";
    const queryLang = searchParams.get("lang") || "";
    const queryFormat = searchParams.get("format") || "";

    setSearch(querySearch);
    setAgeGroup(queryAge);
    setTopic(queryTopic);
    setDuration(queryDuration);
    setEmotion(queryEmotion);
    setLanguage(queryLang);
    setFormat(queryFormat);
  }, [searchParams, mounted]);

  // Run filters
  useEffect(() => {
    if (!mounted) return;

    let result = stories.filter(s => s.reviewStatus === "published");

    // Search query
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        s => 
          (s.title?.toLowerCase() || "").includes(q) || 
          (s.description?.toLowerCase() || "").includes(q) || 
          (Array.isArray(s.keywords) ? s.keywords.some(k => k.toLowerCase().includes(q)) : false)
      );
    }

    // Age Group
    if (ageGroup) {
      result = result.filter(s => s.ageGroup === ageGroup);
    }

    // Topic
    if (topic) {
      if (topic === "Bedtime") {
        result = result.filter(s => {
          const eduValue = s.parentGuide?.educationalValue?.toLowerCase() || "";
          const desc = s.description?.toLowerCase() || "";
          const seoDesc = s.seoDescription?.toLowerCase() || "";
          return eduValue.includes("ngủ") || 
                 desc.includes("ngủ") || 
                 seoDesc.includes("ngủ ngon") || 
                 s.id === "story-2" || 
                 s.id === "story-3";
        });
      } else {
        result = result.filter(s => (s.topic?.toLowerCase() || "") === topic.toLowerCase());
      }
    }

    // Duration
    if (duration) {
      if (duration === "short") {
        result = result.filter(s => s.readDuration <= 3);
      } else if (duration === "medium") {
        result = result.filter(s => s.readDuration > 3 && s.readDuration <= 5);
      } else if (duration === "long") {
        result = result.filter(s => s.readDuration > 5);
      }
    }

    // Emotion
    if (emotion) {
      result = result.filter(s => s.mainEmotion.toLowerCase() === emotion.toLowerCase());
    }

    // Language
    if (language) {
      result = result.filter(s => s.language === language);
    }

    // Format
    if (format) {
      if (format === "read") {
        // All stories are readable
        result = result.filter(s => s.pages && s.pages.length > 0);
      } else if (format === "listen") {
        // Stories with audio
        result = result.filter(s => !!s.audioFile);
      } else if (format === "watch") {
        // In mock, watch shows video placeholders (e.g. story 1, 5, 9 have mock publishing video packages)
        result = result.filter(s => s.id === "story-1" || s.id === "story-5" || s.id === "story-9" || s.id === "story-10");
      }
    }

    setFilteredStories(result);
  }, [stories, search, ageGroup, topic, duration, emotion, language, format, mounted]);

  const updateURL = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/library?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    setAgeGroup("");
    setTopic("");
    setDuration("");
    setEmotion("");
    setLanguage("");
    setFormat("");
    router.push("/library");
  };

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  // Get distinct topics & emotions for filter dropdowns
  const uniqueTopics = Array.from(new Set(stories.map(s => s.topic)));
  const uniqueEmotions = Array.from(new Set(stories.map(s => s.mainEmotion)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:py-8 lg:px-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-zinc-500 hover:text-orange-500 transition-colors mb-3 sm:mb-5 active:scale-95"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại trang chủ
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-zinc-900">Thư viện Bảo Bối</h1>
          <p className="text-zinc-500 mt-1 text-xs sm:text-sm">
            Khám phá trọn bộ 12 câu chuyện minh họa sinh động tích hợp âm thanh sống động.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute top-3 left-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Tìm kiếm truyện..."
            value={search}
            onChange={(e) => updateURL("search", e.target.value)}
            className="w-full rounded-full border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/25 shadow-sm text-zinc-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
        
        {/* Filters Sidebar */}
        <div className="flex flex-col gap-4 sm:gap-6 rounded-3xl border border-zinc-200/50 bg-[#f5f5f7] p-5 sm:p-6 shadow-none h-fit">
          <div className="flex items-center justify-between border-b border-zinc-200/60 pb-4">
            <h3 className="font-bold text-zinc-900 flex items-center gap-2 text-sm sm:text-base">
              <Filter className="h-4 w-4 text-zinc-600" />
              Bộ lọc tìm kiếm
            </h3>
            {(ageGroup || topic || duration || emotion || language || format || search) && (
              <button 
                onClick={handleReset}
                className="text-xs font-bold text-zinc-550 hover:text-[#ff4500] flex items-center gap-1 active:scale-95 transition-all"
              >
                <RotateCcw className="h-3 w-3" />
                Đặt lại
              </button>
            )}
          </div>

          {/* Age Group Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Độ tuổi của bé</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { range: "3-8", label: "🌱 3-8 t", activeClass: "bg-[#1d1d1f] border-[#1d1d1f] text-white shadow-sm", inactiveClass: "bg-white border-zinc-200/70 text-zinc-700 hover:bg-zinc-50" },
                { range: "9-12", label: "🚀 9-12 t", activeClass: "bg-[#1d1d1f] border-[#1d1d1f] text-white shadow-sm", inactiveClass: "bg-white border-zinc-200/70 text-zinc-700 hover:bg-zinc-50" },
                { range: "12-15", label: "✨ 12-15 t", activeClass: "bg-[#1d1d1f] border-[#1d1d1f] text-white shadow-sm", inactiveClass: "bg-white border-zinc-200/70 text-zinc-700 hover:bg-zinc-50" },
              ].map((ageObj) => {
                const isActive = ageGroup === ageObj.range;
                return (
                  <button
                    key={ageObj.range}
                    onClick={() => updateURL("age", isActive ? "" : ageObj.range)}
                    className={`rounded-xl py-2.5 text-xs font-bold border transition-all active:scale-95 text-center ${
                      isActive ? ageObj.activeClass : ageObj.inactiveClass
                    }`}
                  >
                    {ageObj.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Format Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Định dạng</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "read", name: "Đọc", icon: BookOpen },
                { id: "listen", name: "Nghe", icon: Volume2 },
                { id: "watch", name: "Xem", icon: Tv },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => updateURL("format", format === fmt.id ? "" : fmt.id)}
                  className={`rounded-xl py-2 text-xs font-bold border flex flex-col items-center gap-1 transition-all active:scale-95 ${
                    format === fmt.id 
                      ? "bg-[#1d1d1f] border-[#1d1d1f] text-white shadow-sm" 
                      : "bg-white border-zinc-200/70 text-zinc-650 hover:bg-zinc-50"
                  }`}
                >
                  <fmt.icon className="h-3.5 w-3.5" />
                  {fmt.name}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Chủ đề</label>
            <select
              value={topic}
              onChange={(e) => updateURL("topic", e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white p-2.5 text-xs font-medium text-zinc-700 outline-none focus:border-zinc-450"
            >
              <option value="">Tất cả chủ đề</option>
              {uniqueTopics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
              <option value="Bedtime">Truyện ngủ ngon (Bedtime)</option>
            </select>
          </div>

          {/* Duration Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Thời lượng đọc</label>
            <select
              value={duration}
              onChange={(e) => updateURL("duration", e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white p-2.5 text-xs font-medium text-zinc-700 outline-none focus:border-zinc-450"
            >
              <option value="">Tất cả thời lượng</option>
              <option value="short">Dưới 3 phút</option>
              <option value="medium">Từ 3 đến 5 phút</option>
              <option value="long">Trên 5 phút</option>
            </select>
          </div>

          {/* Emotion Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Cảm xúc chủ đạo</label>
            <select
              value={emotion}
              onChange={(e) => updateURL("emotion", e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white p-2.5 text-xs font-medium text-zinc-700 outline-none focus:border-zinc-450"
            >
              <option value="">Tất cả cảm xúc</option>
              {uniqueEmotions.map((em) => (
                <option key={em} value={em}>{em}</option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Ngôn ngữ</label>
            <select
              value={language}
              onChange={(e) => updateURL("lang", e.target.value)}
              className="rounded-lg border border-zinc-200 bg-white p-2 text-xs text-zinc-700 outline-none focus:border-orange-400"
            >
              <option value="">Tất cả ngôn ngữ</option>
              <option value="vi">Tiếng Việt</option>
              <option value="en">Tiếng Anh</option>
              <option value="bilingual">Song ngữ Việt-Anh</option>
            </select>
          </div>

        </div>

        {/* Stories Listing */}
        <div className="lg:col-span-3">
          
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Tìm thấy {filteredStories.length} truyện phù hợp
            </span>
          </div>

          {filteredStories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-[#f5f5f7] rounded-3xl border border-zinc-200/60 p-8">
              <BookOpen className="h-12 w-12 text-zinc-400 animate-bounce" />
              <h3 className="font-bold text-lg text-zinc-800 mt-4">Không tìm thấy truyện phù hợp</h3>
              <p className="text-sm text-zinc-500 mt-1 max-w-sm">
                Vui lòng thử đặt lại bộ lọc hoặc thay đổi từ khóa tìm kiếm khác.
              </p>
              <button
                onClick={handleReset}
                className="mt-6 rounded-full bg-[#1d1d1f] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#2d2d2f] active:scale-95 transition-all shadow-sm"
              >
                Đặt lại toàn bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => (
                <div key={story.id} className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/40 bg-[#f5f5f7] hover:bg-white shadow-none hover:shadow-lg hover:border-zinc-200/60 transition-all duration-300">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50">
                    <img
                      src={story.thumbnailHorizontal}
                      alt={story.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                    
                    {/* Format Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="rounded bg-[#1d1d1f] px-2.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
                        Độ tuổi: {story.ageGroup}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 flex gap-1">
                      <span className="rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-semibold text-white flex items-center gap-0.5">
                        <Clock className="h-2.5 w-2.5" /> {story.readDuration} ph đọc
                      </span>
                      {story.audioFile && (
                        <span className="rounded-full bg-[#ff4500] px-2 py-0.5 text-[9px] font-semibold text-white flex items-center gap-0.5">
                          <Volume2 className="h-2.5 w-2.5" /> Audio
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                        <Tag className="h-2.5 w-2.5 text-zinc-300" />
                        {story.topic}
                      </span>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                        <Languages className="h-2.5 w-2.5" />
                        {story.language === "vi" ? "Tiếng Việt" : story.language === "en" ? "English" : "Song ngữ"}
                      </span>
                    </div>

                    <h3 className="font-bold text-[#1d1d1f] group-hover:text-[#ff4500] transition-colors mt-1.5 line-clamp-1 text-sm sm:text-base">
                      {story.title}
                    </h3>
                    
                    <p className="text-xs text-zinc-500 mt-2 line-clamp-3 flex-1 leading-relaxed">
                      {story.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1">
                      <span className="rounded bg-zinc-200/60 px-2 py-0.5 text-[9px] font-semibold text-zinc-700">
                        {story.mainEmotion}
                      </span>
                      <span className="rounded bg-zinc-200/60 px-2 py-0.5 text-[9px] font-semibold text-zinc-700 line-clamp-1">
                        {story.skill}
                      </span>
                    </div>

                    <div className="mt-4 border-t border-zinc-100 pt-3 flex items-center justify-between text-[10px] font-bold text-zinc-400">
                      <span>Minh họa: {story.illustrator}</span>
                      <Link 
                        href={`/story/${story.id}`} 
                        className="text-[#ff4500] hover:text-orange-600 flex items-center gap-0.5"
                      >
                        Khám phá
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function Library() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    }>
      <LibraryContent />
    </Suspense>
  );
}
