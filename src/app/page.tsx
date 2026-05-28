"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStories, syncStoriesFromServer } from "@/data/store";
import { Story } from "@/data/mockStories";
import { 
  BookOpen, 
  Sparkles, 
  Flame, 
  Moon, 
  Compass, 
  ShieldCheck, 
  Heart, 
  Users, 
  ArrowRight,
  Clock,
  Volume2
} from "lucide-react";

export default function Home() {
  const [stories, setStories] = useState<Story[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read immediate localStorage cache first
    setStories(getStories());
    setMounted(true);

    // Sync from server DB in the background
    syncStoriesFromServer().then(synced => {
      setStories(synced);
    });
  }, []);


  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-amber-50/10">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  // Filter out only published stories for the public view
  const publicStories = stories.filter(s => s.reviewStatus === "published");

  const featuredStory = publicStories[0] || stories[0];
  const newStories = publicStories.slice(0, 4);
  const bedtimeStories = publicStories.filter(s => s.parentGuide.educationalValue.toLowerCase().includes("ngủ") || s.description.toLowerCase().includes("ngủ") || s.seoDescription.toLowerCase().includes("ngủ ngon") || s.id === "story-2" || s.id === "story-3").slice(0, 3);

  const topics = [
    { name: "Cảm xúc", color: "bg-red-50 text-red-700 border-red-100 hover:bg-red-100" },
    { name: "Gia đình", color: "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100" },
    { name: "Tình bạn", color: "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100" },
    { name: "Khoa học", color: "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100" },
    { name: "Môi trường", color: "bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-100" },
    { name: "Kỹ năng sống", color: "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100" },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/50 via-amber-50/30 to-transparent py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left content */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <div className="inline-flex items-center self-center lg:self-start gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-800">
                <Sparkles className="h-3 w-3 text-orange-600 animate-pulse" />
                Dự án Bảo Bối Story Hub V2
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                Học và lớn lên qua từng <span className="text-orange-500 underline decoration-wavy decoration-orange-300">trang truyện</span> sinh động
              </h1>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Truyện minh họa sắc nét tích hợp audio truyền cảm, được phân loại tối ưu cho từng độ tuổi giúp trẻ đọc, nghe, hiểu mình và thấu hiểu thế giới xung quanh.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
                <Link
                  href="/library"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-orange-500 px-6 font-medium text-white shadow-md hover:bg-orange-600 transition-all hover:shadow-lg"
                >
                  Khám phá thư viện
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/admin"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  Hệ thống Quản trị CMS
                </Link>
              </div>
            </div>

            {/* Right content (Featured Story Preview Card) */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-400 to-amber-400 opacity-20 blur-xl transition-all group-hover:opacity-30"></div>
              {featuredStory && (
                <div className="relative flex flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white p-4 shadow-xl transition-all hover:translate-y-[-4px]">
                  <div className="relative h-64 w-full overflow-hidden rounded-xl">
                    <img
                      src={featuredStory.thumbnailHorizontal}
                      alt={featuredStory.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-lg bg-orange-500 px-2.5 py-1 text-xs font-semibold text-white">
                      Nổi bật nhất
                    </div>
                    <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {featuredStory.readDuration} phút đọc
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-orange-600 font-medium">
                      <span>Độ tuổi: {featuredStory.ageGroup} tuổi</span>
                      <span>Chủ đề: {featuredStory.topic}</span>
                    </div>
                    <h3 className="font-bold text-xl text-zinc-900 group-hover:text-orange-600 transition-colors">
                      {featuredStory.title}
                    </h3>
                    <p className="text-sm text-zinc-500 line-clamp-2">
                      {featuredStory.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-zinc-50 pt-4">
                      <div className="flex gap-2">
                        <span className="rounded bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                          {featuredStory.mainEmotion}
                        </span>
                        <span className="rounded bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700">
                          {featuredStory.skill}
                        </span>
                      </div>
                      <Link 
                        href={`/story/${featuredStory.id}`} 
                        className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-0.5"
                      >
                        Đọc ngay
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Age Group Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Thiết kế chuyên biệt theo từng lứa tuổi</h2>
          <p className="text-zinc-500 mt-3 text-sm sm:text-base">
            Mỗi giai đoạn phát triển của trẻ cần những cấu trúc câu từ, từ vựng và chủ đề giáo dục phù hợp để đạt hiệu quả cao nhất.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 3-8 age card */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 mb-4 font-bold text-lg">
              3-8
            </div>
            <h3 className="text-xl font-bold text-zinc-950">Mầm non & Tiểu học nhỏ</h3>
            <p className="text-sm text-zinc-500 mt-2 flex-1">
              Hình ảnh lớn, câu thoại ngắn, vần điệu đáng yêu. Nội dung tập trung nhận diện cảm xúc căn bản, kỹ năng sẻ chia, tình bạn và gia đình.
            </p>
            <Link 
              href="/library?age=3-8" 
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Khám phá truyện 3-8 tuổi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 9-12 age card */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700 mb-4 font-bold text-lg">
              9-12
            </div>
            <h3 className="text-xl font-bold text-zinc-950">Tiểu học lớn</h3>
            <p className="text-sm text-zinc-500 mt-2 flex-1">
              Câu chuyện phiêu lưu kết hợp kiến thức khoa học (STEM), môi trường, tư duy phản biện và rèn luyện kỹ năng giải quyết mâu thuẫn xã hội.
            </p>
            <Link 
              href="/library?age=9-12" 
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Khám phá truyện 9-12 tuổi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 12-15 age card */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-purple-100 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 mb-4 font-bold text-lg">
              12-15
            </div>
            <h3 className="text-xl font-bold text-zinc-950">Thiếu niên / Teen</h3>
            <p className="text-sm text-zinc-500 mt-2 flex-1">
              Cốt truyện sâu sắc xoay quanh hành trình tìm kiếm bản sắc cá nhân, an toàn số trên internet, sự thấu cảm, vượt qua các khủng hoảng tâm lý tuổi dậy thì.
            </p>
            <Link 
              href="/library?age=12-15" 
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 hover:text-purple-700"
            >
              Khám phá truyện 12-15 tuổi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Daily Gift & Continue Reading Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-orange-400 to-amber-400 p-1">
          <div className="rounded-2xl bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 shrink-0 shadow-inner">
                <Sparkles className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900">Món quà hôm nay dành cho bé 🎁</h2>
                <p className="text-sm text-zinc-500">Khám phá thế giới qua những trang truyện đầy màu sắc!</p>
              </div>
            </div>
            {featuredStory && (
              <Link 
                href={`/story/${featuredStory.id}`}
                className="w-full md:w-auto flex items-center gap-4 rounded-xl border border-orange-100 bg-orange-50/50 p-3 hover:bg-orange-100 transition-colors"
              >
                <img src={featuredStory.thumbnailHorizontal} alt="" className="h-12 w-20 rounded-md object-cover shadow-sm" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-orange-600">Gợi ý hôm nay</div>
                  <div className="text-sm font-bold text-zinc-900 line-clamp-1">{featuredStory.title}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-orange-400" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured/New Stories Carousel */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wider">
              <Flame className="h-4 w-4 text-orange-500" />
              Truyện mới cập nhật
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-1">Truyện hay vừa lên kệ</h2>
          </div>
          <Link href="/library" className="text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1">
            Xem tất cả
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
          {newStories.map((story) => (
            <div key={story.id} className="snap-start shrink-0 w-[280px] sm:w-[320px] group relative flex flex-col overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
                <img
                  src={story.thumbnailHorizontal}
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 rounded bg-white/95 px-2 py-0.5 text-[10px] font-bold text-orange-600 shadow-sm backdrop-blur-sm">
                  Độ tuổi: {story.ageGroup}
                </span>
                <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white flex items-center gap-0.5">
                  <Clock className="h-2.5 w-2.5" /> {story.readDuration} ph
                </span>
              </div>
              
              <div className="flex flex-1 flex-col p-4">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Chủ đề: {story.topic}
                </span>
                <h3 className="font-bold text-zinc-900 group-hover:text-orange-500 transition-colors mt-1 line-clamp-1">
                  {story.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1.5 line-clamp-2 flex-1">
                  {story.description}
                </p>
                
                <div className="mt-4 flex items-center justify-between border-t border-zinc-50 pt-3 text-[10px]">
                  <span className="font-medium text-zinc-400">Tác giả: {story.author}</span>
                  <Link href={`/story/${story.id}`} className="font-bold text-orange-600 hover:text-orange-700">
                    Chi tiết →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bedtime Stories Row */}
      <section className="bg-slate-900 text-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                <Moon className="h-4 w-4 text-indigo-400 fill-indigo-400" />
                Bedtime Mode
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Hành trình êm dịu vào giấc ngủ</h2>
              <p className="text-slate-400 mt-2 text-sm max-w-xl">
                Những câu chuyện có nhịp điệu chậm rãi, kết hợp âm thanh nhẹ nhàng của nhạc và giọng đọc trầm ấm giúp vỗ về bé yêu ngon giấc.
              </p>
            </div>
            <Link href="/library?topic=Bedtime" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 mt-4 sm:mt-0 flex items-center gap-1">
              Xem bộ truyện ngủ ngon
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bedtimeStories.map((story) => (
              <div key={story.id} className="group relative flex overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700/50 p-4 transition-all hover:bg-slate-800">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-700">
                  <img
                    src={story.squareImage}
                    alt={story.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="ml-4 flex flex-col justify-between py-1 flex-1">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                      Tuổi: {story.ageGroup} | {story.audioDuration} phút nghe
                    </span>
                    <h3 className="font-bold text-slate-100 mt-1 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {story.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/50">
                    <span className="text-[10px] text-slate-500">Giọng đọc: {story.voiceNarrator}</span>
                    <Link href={`/story/${story.id}?autoplay=true`} className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300">
                      <Volume2 className="h-3.5 w-3.5" />
                      Nghe ngay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories by Topic */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Tìm kiếm theo mối quan tâm</h2>
          <p className="text-zinc-500 text-sm mt-2">Chọn nhanh một chủ đề để tìm truyện phù hợp giúp bé rèn luyện các đức tính và kỹ năng cần thiết.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {topics.map((topic) => (
            <Link
              key={topic.name}
              href={`/library?topic=${topic.name}`}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold border shadow-sm transition-all hover:scale-[1.02] ${topic.color}`}
            >
              {topic.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Parents Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-orange-400 to-amber-400 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 self-start px-2.5 py-1 rounded-full">
                Góc Phụ Huynh
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight">Cam kết An toàn tuyệt đối & Giá trị giáo dục vượt bậc</h2>
              <p className="text-orange-50 leading-relaxed text-sm sm:text-base">
                Bảo Bối Story Hub được thiết kế dựa trên triết lý giáo dục an lành. Chúng tôi không sử dụng các thuật toán giữ chân gây nghiện, không quảng cáo nhắm tới trẻ, hoàn toàn bảo vệ thông tin và quyền riêng tư của bé.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-6 w-6 text-white shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Duyệt thủ công 100%</h4>
                    <p className="text-xs text-orange-50 mt-0.5">Không một truyện AI nào xuất bản mà không được rà soát từng từ bởi ban biên tập.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-white shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Hướng dẫn tương tác</h4>
                    <p className="text-xs text-orange-50 mt-0.5">Mỗi truyện đều có gợi ý thảo luận sâu cho cha mẹ trò chuyện cùng con sau khi đọc.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/95 p-6 sm:p-8 text-zinc-800 shadow-lg">
              <h3 className="font-bold text-lg text-zinc-900 flex items-center gap-2 mb-4 border-b border-orange-50 pb-3">
                <Heart className="h-5 w-5 text-orange-500 fill-orange-500" />
                Ý kiến từ phụ huynh
              </h3>
              <p className="italic text-sm text-zinc-600 leading-relaxed">
                \"Con gái 6 tuổi của tôi trước đây lười đọc sách và ham xem youtube. Từ ngày có Bảo Bối, tối nào bé cũng nhắc mẹ mở audio truyện Gấu Con và tự nhìn hình đọc theo. Cách Bảo Bối thiết kế câu hỏi thảo luận giúp hai mẹ con hiểu nhau hơn rất nhiều.\"
              </p>
              <div className="mt-4 flex items-center justify-between pt-2">
                <div>
                  <h5 className="font-bold text-xs text-zinc-900">Chị Thu Hương</h5>
                  <p className="text-[10px] text-zinc-400">Mẹ bé An (6 tuổi) - Hà Nội</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Phụ huynh tin dùng
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
