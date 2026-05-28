"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getStoryById } from "@/data/store";
import { Story, StoryPage } from "@/data/mockStories";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  MessageSquare,
  Sparkles,
  BookOpen,
  CheckCircle2
} from "lucide-react";

function StoryReadContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const autoplay = searchParams.get("autoplay") === "true";

  const [story, setStory] = useState<Story | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [bedtimeMode, setBedtimeMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [highlightWordIndex, setHighlightWordIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);

  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!id) return;
    const currentStory = getStoryById(id);
    if (currentStory) {
      setStory(currentStory);
    }
    setMounted(true);
  }, [id]);

  // Handle autoplay and mock audio playback
  useEffect(() => {
    if (autoplay && story && mounted) {
      handlePlayPause(true);
    }
    return () => {
      stopMockAudio();
    };
  }, [story, autoplay, mounted]);

  // Mock audio text highlighting effect
  useEffect(() => {
    if (isPlaying) {
      let wordIdx = 0;
      audioIntervalRef.current = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            stopMockAudio();
            return 100;
          }
          return prev + 1.5;
        });

        // Loop highlight index
        setHighlightWordIndex(wordIdx);
        wordIdx = (wordIdx + 1) % 15; // mock loop highlight
      }, 500);
    } else {
      stopMockAudio();
    }

    return () => stopMockAudio();
  }, [isPlaying]);

  const stopMockAudio = () => {
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = null;
    }
  };

  const handlePlayPause = (playState?: boolean) => {
    const nextState = playState !== undefined ? playState : !isPlaying;
    setIsPlaying(nextState);
    if (!nextState) {
      setHighlightWordIndex(-1);
    }
  };

  const handlePageChange = (index: number) => {
    if (!story) return;
    if (index >= 0 && index <= story.pages.length) {
      setCurrentPageIndex(index);
      setAudioProgress(0);
      setHighlightWordIndex(-1);
      // Keep playing mock audio on next page if it was playing
      if (isPlaying) {
        setIsPlaying(true);
      }
    }
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-zinc-800">Không tìm thấy truyện</h2>
        <Link href="/library" className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white">
          <ArrowLeft className="h-4 w-4" /> Quay lại thư viện
        </Link>
      </div>
    );
  }

  const isLastPage = currentPageIndex === story.pages.length;
  const currentPage: StoryPage | undefined = story.pages[currentPageIndex];

  // Helper to split text and render with highlighting
  const renderHighlightedText = (text: string) => {
    const words = text.split(" ");
    return (
      <p className="text-lg sm:text-2xl leading-relaxed font-medium transition-all duration-300">
        {words.map((word, idx) => {
          const isHighlighted = isPlaying && highlightWordIndex !== -1 && (idx % 15 === highlightWordIndex % 15);
          return (
            <span 
              key={idx} 
              className={`inline-block mr-1.5 transition-all duration-200 rounded px-0.5 ${
                isHighlighted 
                  ? bedtimeMode
                    ? "bg-amber-400/30 text-amber-300 scale-105 shadow-sm"
                    : "bg-orange-100 text-orange-950 scale-105 shadow-sm"
                  : ""
              }`}
            >
              {word}
            </span>
          );
        })}
      </p>
    );
  };

  return (
    <div className={`flex flex-col flex-1 transition-colors duration-500 ${
      bedtimeMode ? "bg-slate-950 text-slate-100" : "bg-orange-50/10 text-zinc-900"
    }`}>
      
      {/* Top Reading Controller Bar */}
      <div className={`sticky top-[64px] z-40 border-b px-4 py-3 sm:px-6 lg:px-8 transition-colors ${
        bedtimeMode ? "bg-slate-900/90 border-slate-800" : "bg-white/90 border-orange-100"
      } backdrop-blur-md`}>
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link
            href={`/story/${story.id}`}
            className={`inline-flex items-center gap-1 text-sm font-bold transition-colors ${
              bedtimeMode ? "text-slate-400 hover:text-white" : "text-zinc-500 hover:text-orange-500"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Quay lại chi tiết</span>
          </Link>

          <div className="flex items-center gap-1 text-center">
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              bedtimeMode ? "bg-slate-800 text-slate-400" : "bg-orange-50 text-orange-600"
            }`}>
              {story.title}
            </span>
            <span className="text-zinc-300 mx-2">/</span>
            <span className="text-xs font-semibold">
              {isLastPage ? "Hoàn thành" : `Trang ${currentPageIndex + 1} / ${story.pages.length}`}
            </span>
          </div>

          {/* Bedtime Mode Toggle & Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBedtimeMode(!bedtimeMode)}
              className={`rounded-full p-2 transition-all ${
                bedtimeMode ? "bg-slate-800 text-amber-300 hover:bg-slate-700" : "bg-orange-50 text-zinc-600 hover:bg-orange-100"
              }`}
              title={bedtimeMode ? "Tắt chế độ ngủ ngon" : "Bật chế độ ngủ ngon"}
            >
              {bedtimeMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 flex-1 flex flex-col justify-center">
        
        {!isLastPage && currentPage ? (
          /* Normal Page View */
          <div className="flex flex-col gap-8">
            {/* Illustration */}
            <div className={`relative overflow-hidden rounded-2xl border p-2 shadow-md transition-colors ${
              bedtimeMode ? "bg-slate-900 border-slate-800" : "bg-white border-orange-100"
            }`}>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-950">
                <img
                  src={currentPage.illustrationUrl}
                  alt={`Trang ${currentPage.pageNumber}`}
                  className={`h-full w-full object-cover transition-all duration-700 ${
                    bedtimeMode ? "brightness-[0.6] sepia-[0.2]" : "brightness-100"
                  }`}
                />
              </div>
            </div>

            {/* Audio Mock Player */}
            {story.audioFile && (
              <div className={`rounded-xl p-4 flex items-center gap-4 ${
                bedtimeMode ? "bg-slate-900 border border-slate-800" : "bg-orange-50/50 border border-orange-100"
              }`}>
                <button
                  onClick={() => handlePlayPause()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow hover:bg-orange-600 transition-colors"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white ml-0.5" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Volume2 className="h-3.5 w-3.5 text-orange-500" />
                      Giọng đọc: {story.voiceNarrator} (MOCK)
                    </span>
                    <span>{isPlaying ? "Đang phát..." : "Tạm dừng"}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-zinc-200/50 rounded-full h-1.5 mt-1 overflow-hidden dark:bg-zinc-700">
                    <div 
                      className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${audioProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-zinc-400">
                  {isPlaying ? `${Math.round(audioProgress)}%` : "0:00"}
                </div>
              </div>
            )}

            {/* Story Text block */}
            <div className={`p-6 sm:p-8 rounded-2xl shadow-sm border ${
              bedtimeMode 
                ? "bg-slate-900 border-slate-800 text-slate-200" 
                : "bg-white border-orange-50 text-zinc-800"
            }`}>
              {renderHighlightedText(currentPage.text)}
              
              {currentPage.textEn && (
                <div className={`mt-6 pt-6 border-t text-sm sm:text-lg italic leading-relaxed ${
                  bedtimeMode ? "border-slate-800 text-slate-400" : "border-zinc-100 text-zinc-500"
                }`}>
                  {currentPage.textEn}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Finished Story / Parent Questions Page */
          <div className={`rounded-2xl p-6 sm:p-10 border shadow-lg text-center flex flex-col items-center gap-6 ${
            bedtimeMode ? "bg-slate-900 border-slate-800" : "bg-white border-orange-100"
          }`}>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-orange-500">Chúc mừng bé đã hoàn thành!</h2>
              <p className="text-sm text-zinc-400 font-semibold">Bạn vừa cùng con đi qua một hành trình tri thức bổ ích.</p>
            </div>

            {/* Parent-Child Discussion block */}
            <div className={`w-full text-left rounded-xl p-6 border mt-4 ${
              bedtimeMode ? "bg-slate-950 border-slate-850" : "bg-purple-50/30 border-purple-100"
            }`}>
              <h3 className="font-bold text-lg text-purple-700 flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                Câu hỏi trò chuyện cùng con (Parent Guide)
              </h3>
              <ul className="space-y-3">
                {story.parentGuide.discussionQuestions.map((q, idx) => (
                  <li key={idx} className="flex gap-3 text-sm sm:text-base text-zinc-600">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700 border border-purple-200">
                      {idx + 1}
                    </span>
                    <span className={bedtimeMode ? "text-slate-300" : "text-zinc-700"}>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full mt-4 justify-center">
              <button
                onClick={() => handlePageChange(0)}
                className="rounded-full bg-orange-500 px-6 py-2.5 font-bold text-white shadow hover:bg-orange-600 transition-colors"
              >
                Đọc lại từ đầu
              </button>
              <Link
                href="/library"
                className={`rounded-full px-6 py-2.5 font-bold border transition-colors ${
                  bedtimeMode ? "border-slate-700 hover:bg-slate-800 text-slate-300" : "border-zinc-200 hover:bg-zinc-50 text-zinc-700"
                }`}
              >
                Về thư viện tìm truyện mới
              </Link>
            </div>
          </div>
        )}

        {/* Page Nav controls */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => handlePageChange(currentPageIndex - 1)}
            disabled={currentPageIndex === 0}
            className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold border transition-all ${
              currentPageIndex === 0 
                ? "opacity-40 cursor-not-allowed border-zinc-200 text-zinc-400" 
                : bedtimeMode
                  ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                  : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 shadow-sm"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Trang trước
          </button>

          {!isLastPage ? (
            <button
              onClick={() => handlePageChange(currentPageIndex + 1)}
              className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-orange-600 transition-all hover:scale-[1.02]"
            >
              Trang tiếp theo
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : null}
        </div>

      </div>

    </div>
  );
}

export default function StoryRead() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    }>
      <StoryReadContent />
    </Suspense>
  );
}
