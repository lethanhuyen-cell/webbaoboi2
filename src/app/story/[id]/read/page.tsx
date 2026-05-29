"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getStoryById, syncStoriesFromServer } from "@/data/store";
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
  CheckCircle2,
  Headphones
} from "lucide-react";
import confetti from "canvas-confetti";

function StoryReadContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const autoplay = searchParams.get("autoplay") === "true";

  const [story, setStory] = useState<Story | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [bedtimeMode, setBedtimeMode] = useState(false);
  const [audioOnlyMode, setAudioOnlyMode] = useState(false);
  const [scrollMode, setScrollMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showTapCues, setShowTapCues] = useState(true);
  const [ttsSupported, setTtsSupported] = useState(true);
  const [ttsVoice, setTtsVoice] = useState<SpeechSynthesisVoice | null>(null);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressStartRef = useRef<number>(0);
  const progressBaseRef = useRef<number>(0);

  // Detect TTS support + load Vietnamese voice
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setTtsSupported(false);
      return;
    }
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Prefer Vietnamese voice, fallback to any available
      const viVoice = voices.find(v => v.lang.startsWith('vi')) ||
                      voices.find(v => v.lang.startsWith('en')) ||
                      voices[0] || null;
      setTtsVoice(viVoice);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  useEffect(() => {
    if (!id) return;
    const currentStory = getStoryById(id);
    if (currentStory) {
      setStory(currentStory);
      if (currentStory.id === "story-mermaid") setScrollMode(true);
    }
    setMounted(true);
    syncStoriesFromServer().then(() => {
      const updatedStory = getStoryById(id);
      if (updatedStory) {
        setStory(updatedStory);
        if (updatedStory.id === "story-mermaid") setScrollMode(true);
      }
    });
  }, [id]);

  // Stop TTS when unmounting
  useEffect(() => {
    return () => stopSpeech();
  }, []);

  useEffect(() => {
    setShowTapCues(true);
    const timer = setTimeout(() => setShowTapCues(false), 2500);
    return () => clearTimeout(timer);
  }, [currentPageIndex]);

  // Autoplay on load
  useEffect(() => {
    if (autoplay && story && mounted) handlePlayPause(true);
  }, [story, autoplay, mounted]);

  // ---- TTS helpers ----
  const stopSpeech = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    utteranceRef.current = null;
  };

  const getAllStoryText = (s: Story) =>
    s.pages.filter(p => p.text).map(p => p.text).join(' ... ');

  const speakText = (text: string, startProgress: number, onEnd: () => void) => {
    stopSpeech();
    if (!ttsSupported || !text.trim()) { onEnd(); return; }
    const utter = new SpeechSynthesisUtterance(text);
    if (ttsVoice) utter.voice = ttsVoice;
    utter.lang = 'vi-VN';
    utter.rate = 0.9;
    utter.pitch = 1.1;
    utteranceRef.current = utter;
    utter.onend = () => {
      setAudioProgress(100);
      onEnd();
    };
    utter.onerror = () => onEnd();
    window.speechSynthesis.speak(utter);
  };

  const handlePlayPause = (playState?: boolean) => {
    const nextState = playState !== undefined ? playState : !isPlaying;
    setIsPlaying(nextState);
    if (!nextState) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.pause();
      }
    } else {
      if (typeof window !== 'undefined' && window.speechSynthesis?.paused) {
        window.speechSynthesis.resume();
      } else if (story) {
        const fullText = getAllStoryText(story);
        speakText(fullText, 0, () => setIsPlaying(false));
      }
    }
  };

  const handlePageChange = (index: number) => {
    if (!story) return;
    if (index >= 0 && index <= story.pages.length) {
      const wasPlaying = isPlaying;
      stopSpeech();
      setIsPlaying(false);
      setCurrentPageIndex(index);
      setAudioProgress(0);
      setHighlightWordIndex(-1);
      // Restart speech from new page if was playing
      if (wasPlaying && index < story.pages.length) {
        const remainingPages = story.pages.slice(index);
        const remainingText = remainingPages.filter(p => p.text).map(p => p.text).join(' ... ');
        setTimeout(() => {
          setIsPlaying(true);
          speakText(remainingText, 0, () => setIsPlaying(false));
        }, 300);
      }
    }
  };

  // Must be BEFORE early returns — Rules of Hooks
  const isLastPageForEffect = story ? currentPageIndex === story.pages.length : false;
  useEffect(() => {
    if (isLastPageForEffect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#fbbf24', '#34d399', '#60a5fa']
      });
    }
  }, [isLastPageForEffect]);

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

  const renderText = (text: string) => (
    <p className="text-xl sm:text-3xl lg:text-4xl leading-loose font-medium">
      {text}
    </p>
  );

  return (
    <div className={`flex flex-col flex-1 transition-colors duration-500 ${
      bedtimeMode ? "bg-slate-950 text-slate-100" : "bg-orange-50/10 text-zinc-900"
    }`}>
      
      {/* Top Reading Controller Bar */}
      <div className={`sticky top-[64px] z-40 border-b px-4 py-3 sm:px-6 lg:px-8 transition-colors ${
        bedtimeMode ? "bg-slate-900/90 border-slate-800" : "bg-white/80 border-zinc-200/40"
      } backdrop-blur-md`}>
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link
            href={`/story/${story.id}`}
            className={`inline-flex items-center gap-1 text-xs sm:text-sm font-bold transition-colors ${
              bedtimeMode ? "text-slate-400 hover:text-white" : "text-zinc-500 hover:text-orange-500"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Trở về</span>
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

          {/* Viewing Modes Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScrollMode(!scrollMode)}
              className={`rounded-full px-3 py-1.5 transition-all text-[11px] font-bold ${
                scrollMode 
                  ? bedtimeMode 
                    ? "bg-slate-800 text-white" 
                    : "bg-[#1d1d1f] text-white" 
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
              title={scrollMode ? "Đổi sang xem Lật Trang" : "Đổi sang xem Cuộn Dọc"}
            >
              {scrollMode ? "Chế độ cuộn ↕" : "Chế độ lật ↔"}
            </button>
            <div className="w-px h-5 bg-zinc-200 mx-1"></div>
            <button
              onClick={() => {
                setAudioOnlyMode(!audioOnlyMode);
                if (!audioOnlyMode) setBedtimeMode(true); // Default to bedtime when audio-only
              }}
              className={`rounded-full p-2 transition-all flex items-center gap-1.5 ${
                audioOnlyMode ? "bg-purple-100 text-purple-700" : "bg-zinc-100 text-zinc-650 hover:bg-zinc-200"
              }`}
              title={audioOnlyMode ? "Tắt chế độ chỉ nghe" : "Bật chế độ chỉ nghe (All Ears)"}
            >
              <Headphones className="h-4 w-4" />
              <span className="hidden md:inline text-xs font-semibold">Chỉ nghe</span>
            </button>
            <div className="w-px h-5 bg-zinc-200 mx-1"></div>
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
      <div className={`mx-auto max-w-4xl px-4 sm:px-6 flex-1 flex flex-col ${scrollMode ? "py-4" : "py-4 sm:py-8 justify-center"}`}>
        
        {scrollMode ? (
          /* ===== SCROLL MODE: Alternating Image / Text Pages ===== */
          <div className="flex flex-col w-full gap-4">
            {/* Sticky Audio Player */}
            {story.audioFile && (
              <div className={`sticky top-[64px] z-30 rounded-2xl p-3 sm:p-4 flex items-center gap-4 border shadow-sm transition-colors ${
                bedtimeMode
                  ? "bg-slate-900/95 border-slate-800 text-slate-100"
                  : "bg-white/95 border-zinc-200/50 text-[#1d1d1f]"
              } backdrop-blur-md`}>
                <button
                  onClick={() => handlePlayPause()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] hover:bg-[#2d2d2f] text-white transition-transform active:scale-95 shadow-sm"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white ml-0.5" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Volume2 className="h-3.5 w-3.5 text-zinc-500" />
                      {ttsVoice ? `${story.voiceNarrator} · Giọng máy` : story.voiceNarrator}
                    </span>
                    <span>{isPlaying ? "Đang phát..." : "Nhấn ▶ để nghe"}</span>
                  </div>
                  <div className="w-full bg-zinc-200/50 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div
                      className="bg-[#ff4500] h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-zinc-400 shrink-0">
                  {isPlaying ? `${Math.round(audioProgress)}%` : "0:00"}
                </span>
              </div>
            )}

            {/* Alternating image/text pages */}
            <div className="flex flex-col gap-2 mt-2 pb-8">
              {story.pages.map((page, index) => {
                const isTextPage = page.text !== "";
                return (
                  <div key={index} className="flex flex-col items-center w-full">
                    {!isTextPage ? (
                      /* === Picture Page: full-width tall image === */
                      <div className="w-full">
                        <img
                          src={page.illustrationUrl}
                          alt={`Minh họa trang ${page.pageNumber}`}
                          className={`w-full object-cover transition-all duration-500 ${
                            bedtimeMode ? "brightness-[0.6] sepia-[0.2]" : "brightness-100"
                          }`}
                          style={{ aspectRatio: "9/16", maxHeight: "95vh", objectPosition: "center" }}
                        />
                      </div>
                    ) : (
                      /* === Text Page: full-screen centered text === */
                      <div
                        className={`w-full flex flex-col justify-center items-center px-6 sm:px-10 py-14 sm:py-20 min-h-[90vh] text-center transition-all ${
                          bedtimeMode
                            ? "bg-slate-950 text-slate-100"
                            : "bg-[#f5f5f7] text-[#1d1d1f]"
                        }`}
                      >
                        {renderText(page.text)}
                        {page.textEn && (
                          <p className={`mt-6 text-base sm:text-lg italic leading-relaxed ${
                            bedtimeMode ? "text-slate-400" : "text-zinc-500"
                          }`}>
                            {page.textEn}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* End of story */}
              <div className={`w-full flex flex-col items-center gap-6 px-6 py-14 text-center mt-4 ${
                bedtimeMode ? "bg-slate-900 text-slate-100" : "bg-white text-[#1d1d1f]"
              }`}>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-orange-500">Bé đã đọc xong câu chuyện! 🎉</h2>
                <p className="text-sm text-zinc-400 font-semibold">Cùng thảo luận với cha mẹ nhé.</p>
                <div className={`w-full max-w-xl text-left rounded-2xl p-6 border ${
                  bedtimeMode ? "bg-slate-950 border-slate-800" : "bg-purple-50/40 border-purple-100"
                }`}>
                  <h3 className="font-bold text-base text-purple-700 flex items-center gap-2 mb-3">
                    <MessageSquare className="h-4 w-4" /> Câu hỏi trò chuyện cùng con
                  </h3>
                  <ul className="space-y-3">
                    {(story.parentGuide?.discussionQuestions || []).map((q, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-zinc-600">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px] font-bold text-purple-700">{idx + 1}</span>
                        <span className={bedtimeMode ? "text-slate-300" : "text-zinc-700"}>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/library"
                  className={`rounded-full px-7 py-3 font-bold border transition-all active:scale-95 text-sm mt-2 ${
                    bedtimeMode ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-zinc-200 text-zinc-700 hover:bg-zinc-50 bg-white shadow-sm"
                  }`}
                >
                  Về thư viện tìm truyện mới
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* ===== FLIP MODE: Normal page-by-page view ===== */
          <>
            {!isLastPage && currentPage ? (
              <div className="flex flex-col gap-4 sm:gap-8">
                {/* Illustration */}
                {!audioOnlyMode && (
                  <div className={`relative overflow-hidden rounded-2xl border p-2 shadow-md transition-all duration-500 ${
                    bedtimeMode ? "bg-slate-900 border-slate-800" : "bg-white border-orange-100"
                  }`}>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-950 group">
                      <img
                        src={currentPage.illustrationUrl}
                        alt={`Trang ${currentPage.pageNumber}`}
                        className={`h-full w-full object-cover transition-all duration-700 ${
                          bedtimeMode ? "brightness-[0.6] sepia-[0.2]" : "brightness-100"
                        }`}
                      />
                      <div
                        onClick={() => handlePageChange(currentPageIndex - 1)}
                        className="absolute top-0 left-0 w-1/3 h-full z-10 cursor-pointer flex items-center justify-start bg-gradient-to-r from-black/15 to-transparent transition-opacity duration-300"
                        style={{ opacity: showTapCues ? 1 : 0 }}
                      >
                        <div className="ml-3 rounded-full bg-black/50 p-2 backdrop-blur-sm text-white scale-90 active:scale-110 transition-transform">
                          <ChevronLeft className="h-6 w-6" />
                        </div>
                      </div>
                      <div
                        onClick={() => handlePageChange(currentPageIndex + 1)}
                        className="absolute top-0 right-0 w-1/3 h-full z-10 cursor-pointer flex items-center justify-end bg-gradient-to-l from-black/15 to-transparent transition-opacity duration-300"
                        style={{ opacity: showTapCues ? 1 : 0 }}
                      >
                        <div className="mr-3 rounded-full bg-black/50 p-2 backdrop-blur-sm text-white scale-90 active:scale-110 transition-transform">
                          <ChevronRight className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Audio Player */}
                {story.audioFile && (
                  <div className={`rounded-2xl p-4 flex items-center gap-4 ${
                    bedtimeMode ? "bg-slate-900 border border-slate-800" : "bg-[#f5f5f7] border border-zinc-200/50"
                  }`}>
                    <button
                      onClick={() => handlePlayPause()}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] hover:bg-[#2d2d2f] text-white transition-transform active:scale-95 shadow-sm"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white ml-0.5" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Volume2 className="h-3.5 w-3.5 text-zinc-500" />
                          Giọng đọc: {story.voiceNarrator} · {ttsVoice ? "Đang dùng giọng máy" : "Không hỗ trợ TTS"}
                        </span>
                        <span>{isPlaying ? "Đang phát..." : "Tạm dừng"}</span>
                      </div>
                      <div className="w-full bg-zinc-200/50 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className="bg-[#ff4500] h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${audioProgress}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs font-mono font-bold text-zinc-400">
                      {isPlaying ? `${Math.round(audioProgress)}%` : "0:00"}
                    </div>
                  </div>
                )}

                {/* Story Text */}
                <div className={`p-6 sm:p-8 rounded-3xl border ${
                  bedtimeMode
                    ? "bg-slate-900 border-slate-800 text-slate-200"
                    : "bg-white border-zinc-200/50 text-[#1d1d1f] shadow-sm"
                }`}>
                  {renderText(currentPage.text)}
                  {currentPage.textEn && (
                    <div className={`mt-8 pt-8 border-t text-base sm:text-xl lg:text-2xl italic leading-loose ${
                      bedtimeMode ? "border-slate-800 text-slate-400" : "border-zinc-100 text-zinc-500"
                    }`}>
                      {currentPage.textEn}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Finished Page */
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
                <div className={`w-full text-left rounded-xl p-6 border mt-4 ${
                  bedtimeMode ? "bg-slate-950 border-slate-800" : "bg-purple-50/30 border-purple-100"
                }`}>
                  <h3 className="font-bold text-lg text-purple-700 flex items-center gap-2 mb-4">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    Câu hỏi trò chuyện cùng con
                  </h3>
                  <ul className="space-y-3">
                    {(story.parentGuide?.discussionQuestions || []).map((q, idx) => (
                      <li key={idx} className="flex gap-3 text-sm sm:text-base text-zinc-600">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700 border border-purple-200">{idx + 1}</span>
                        <span className={bedtimeMode ? "text-slate-300" : "text-zinc-700"}>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full mt-4 justify-center">
                  <button onClick={() => handlePageChange(0)} className="rounded-full bg-orange-500 px-6 py-2.5 font-bold text-white shadow hover:bg-orange-600 transition-colors active:scale-95 text-sm">
                    Đọc lại từ đầu
                  </button>
                  <Link href={`/story/${story.id}`} className={`rounded-full px-6 py-2.5 font-bold border transition-all active:scale-95 text-sm ${bedtimeMode ? "border-slate-700 bg-slate-800 text-slate-200" : "border-orange-200 bg-orange-50/30 text-orange-700"}`}>
                    Xem chi tiết
                  </Link>
                  <Link href="/library" className={`rounded-full px-6 py-2.5 font-bold border transition-all active:scale-95 text-sm ${bedtimeMode ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-zinc-200 text-zinc-700 hover:bg-zinc-50"}`}>
                    Về thư viện
                  </Link>
                </div>
              </div>
            )}

            {/* Page Navigation */}
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
              {!isLastPage && (
                <button
                  onClick={() => handlePageChange(currentPageIndex + 1)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1d1d1f] hover:bg-[#2d2d2f] px-5 py-2.5 text-sm font-bold text-white transition-all active:scale-95 shadow-sm"
                >
                  Trang tiếp theo
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </>
        )}
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
