"use client";

import { useEffect, useState, useRef, Suspense, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getStoryById, syncStoriesFromServer } from "@/data/store";
import { Story } from "@/data/mockStories";
import { ArrowLeft, Home, Play, Pause, CheckCircle2, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";

/* ─── Immersive Full-Screen Story Reader ───────────────────────────────────
   Design principles:
   • Each page = 100dvh, CSS snap scroll — one page per viewport, always
   • Image pages: edge-to-edge, object-cover, no chrome
   • Text pages: 20px body (Nielsen NN / Apple HIG optimal for mobile reading)
     max ~60 chars/line, 1.75 line-height, generous vertical padding
   • Only 3 floating controls: Back, Home, Play/Pause — auto-hide after 3s
   • Tap anywhere to reveal controls again
────────────────────────────────────────────────────────────────────────── */

function StoryReadContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const autoplay = searchParams.get("autoplay") === "true";

  const [story, setStory] = useState<Story | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [ttsVoice, setTtsVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [ttsSupported, setTtsSupported] = useState(true);
  const [finished, setFinished] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ── Load TTS voices ──
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setTtsSupported(false);
      return;
    }
    const load = () => {
      const voices = window.speechSynthesis.getVoices();
      setTtsVoice(
        voices.find((v) => v.lang.startsWith("vi")) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0] || null
      );
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  // ── Load story ──
  useEffect(() => {
    if (!id) return;
    const s = getStoryById(id);
    if (s) setStory(s);
    setMounted(true);
    syncStoriesFromServer().then(() => {
      const updated = getStoryById(id);
      if (updated) setStory(updated);
    });
  }, [id]);

  // ── Stop TTS on unmount ──
  useEffect(() => () => stopSpeech(), []);

  // ── Autoplay ──
  useEffect(() => {
    if (autoplay && story && mounted) handlePlayPause(true);
  }, [story, autoplay, mounted]);

  // ── Auto-hide controls after 3s ──
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  useEffect(() => {
    resetHideTimer();
    return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current); };
  }, [resetHideTimer]);

  // ── Confetti on finish (must be before early returns) ──
  useEffect(() => {
    if (finished) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 },
        colors: ["#f97316", "#fbbf24", "#34d399", "#60a5fa"] });
    }
  }, [finished]);

  // ── TTS helpers ──
  const stopSpeech = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
  };

  const getAllText = (s: Story) =>
    s.pages.filter((p) => p.text).map((p) => p.text).join("... ");

  const speakText = (text: string, onEnd: () => void) => {
    stopSpeech();
    if (!ttsSupported || !text.trim()) { onEnd(); return; }
    const utter = new SpeechSynthesisUtterance(text);
    if (ttsVoice) utter.voice = ttsVoice;
    utter.lang = "vi-VN";
    utter.rate = 0.88;
    utter.pitch = 1.05;
    utteranceRef.current = utter;
    utter.onend = () => onEnd();
    utter.onerror = () => onEnd();
    window.speechSynthesis.speak(utter);
  };

  const handlePlayPause = (playState?: boolean) => {
    const next = playState !== undefined ? playState : !isPlaying;
    setIsPlaying(next);
    if (!next) {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.pause();
      }
    } else {
      if (typeof window !== "undefined" && window.speechSynthesis?.paused) {
        window.speechSynthesis.resume();
      } else if (story) {
        speakText(getAllText(story), () => setIsPlaying(false));
      }
    }
    resetHideTimer();
  };

  // ── Render guards ──
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950 text-white">
        <p className="text-lg font-semibold">Không tìm thấy truyện</p>
        <Link href="/library" className="flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-bold text-white">
          <ArrowLeft className="h-4 w-4" /> Về thư viện
        </Link>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[9999] w-full bg-black overflow-y-scroll"
      style={{ scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch" }}
      onClick={resetHideTimer}
    >
      {/* ── Floating controls ─────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-4 pt-safe-top transition-opacity duration-500"
        style={{ opacity: showControls ? 1 : 0, paddingTop: "max(env(safe-area-inset-top), 16px)" }}
      >
        {/* Back */}
        <Link
          href={`/story/${story.id}`}
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md active:scale-90 transition-transform"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        {/* Story title (center) */}
        <span className="pointer-events-none max-w-[55vw] truncate rounded-full bg-black/40 px-4 py-2 text-center text-xs font-semibold text-white/90 backdrop-blur-md">
          {story.title}
        </span>

        {/* Home */}
        <Link
          href="/library"
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md active:scale-90 transition-transform"
        >
          <Home className="h-5 w-5" />
        </Link>
      </div>

      {/* ── Play / Pause button (bottom-center floating) ─── */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex justify-center transition-opacity duration-500"
        style={{
          opacity: showControls ? 1 : 0,
          paddingBottom: "max(env(safe-area-inset-bottom), 28px)",
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
          className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-zinc-900 shadow-2xl backdrop-blur-md active:scale-90 transition-transform"
        >
          {isPlaying
            ? <Pause className="h-7 w-7 fill-zinc-900" />
            : <Play className="h-7 w-7 fill-zinc-900 ml-0.5" />
          }
        </button>
      </div>

      {/* ── Story pages (snap scroll) ────────────────────── */}
      {story.pages.map((page, index) => {
        const isImagePage = !page.text || page.text.trim() === "";

        return (
          <section
            key={index}
            className="relative flex w-full flex-shrink-0"
            style={{
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
              height: "100dvh",
            }}
          >
            {isImagePage ? (
              /* ── Full-screen image ── */
              <img
                src={page.illustrationUrl}
                alt={`Trang ${page.pageNumber}`}
                className="h-full w-full object-cover"
                draggable={false}
              />
            ) : (
              /* ── Full-screen text ── */
              <div className="flex h-full w-full flex-col items-center justify-center bg-[#fafaf8] px-7 py-20 text-[#1a1a1a]">
                {/* Small page indicator */}
                <div className="mb-8 flex items-center gap-1.5">
                  {story.pages.filter(p => p.text).map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: page.text === story.pages.filter(p => p.text)[i]?.text ? 24 : 6,
                        backgroundColor: page.text === story.pages.filter(p => p.text)[i]?.text
                          ? "#f97316" : "#d4d4d4"
                      }}
                    />
                  ))}
                </div>

                {/* Main text — 20px, 1.75 line-height, max ~60 chars/line */}
                <p
                  className="w-full max-w-[340px] text-center font-medium text-[#1a1a1a]"
                  style={{ fontSize: "20px", lineHeight: 1.75, letterSpacing: "0.01em" }}
                >
                  {page.text}
                </p>

                {/* English subtitle if any */}
                {page.textEn && (
                  <p
                    className="mt-6 w-full max-w-[340px] text-center italic text-zinc-400"
                    style={{ fontSize: "15px", lineHeight: 1.6 }}
                  >
                    {page.textEn}
                  </p>
                )}
              </div>
            )}
          </section>
        );
      })}

      {/* ── End / Finish screen ──────────────────────────── */}
      <section
        className="relative flex w-full flex-shrink-0 flex-col items-center justify-center gap-8 bg-zinc-950 px-8 py-20 text-white"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100dvh" }}
        onViewportEntry={() => setFinished(true)}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-orange-400">Đọc xong rồi! 🎉</h2>
          <p className="mt-2 text-sm text-zinc-400">Cùng cha mẹ trò chuyện về câu chuyện nhé.</p>
        </div>

        {/* Parent guide questions */}
        {(story.parentGuide?.discussionQuestions || []).length > 0 && (
          <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
              <MessageSquare className="h-3.5 w-3.5" /> Câu hỏi gợi mở
            </div>
            <ul className="space-y-3">
              {(story.parentGuide?.discussionQuestions || []).map((q, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-[10px] font-bold text-orange-400">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-300">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Link
            href="/library"
            className="flex items-center justify-center gap-2 rounded-full bg-orange-500 py-3.5 font-bold text-white active:scale-95 transition-transform"
          >
            <Home className="h-4 w-4" /> Về thư viện
          </Link>
          <Link
            href={`/story/${story.id}`}
            className="flex items-center justify-center gap-2 rounded-full border border-zinc-700 py-3.5 font-semibold text-zinc-300 active:scale-95 transition-transform"
          >
            Xem chi tiết truyện
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function StoryRead() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    }>
      <StoryReadContent />
    </Suspense>
  );
}
