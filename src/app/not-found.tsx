import Link from "next/link";
import { BookOpen, ArrowLeft, Search } from "lucide-react";

export const metadata = {
  title: "Không tìm thấy trang",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[70vh] px-4 py-20 text-center">
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-orange-50 border-2 border-orange-100 shadow-lg animate-float mx-auto">
          <BookOpen className="h-14 w-14 text-orange-300" />
        </div>
        <div className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-red-100 border-2 border-white shadow">
          <span className="text-lg font-black text-red-500">?</span>
        </div>
      </div>

      {/* Status code */}
      <p className="text-8xl font-black gradient-brand-text mb-4 tracking-tight">
        404
      </p>

      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
        Ồ! Trang này đang đi lạc mất rồi 🐾
      </h1>
      <p className="text-zinc-500 text-sm sm:text-base max-w-md leading-relaxed mb-8">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        Hãy quay lại thư viện để tìm những câu chuyện tuyệt vời khác nhé!
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/library"
          className="inline-flex h-11 items-center gap-2 rounded-full gradient-brand px-6 font-semibold text-white shadow-md shadow-orange-200 hover:shadow-lg transition-all hover:scale-[1.02]"
        >
          <Search className="h-4 w-4" />
          Khám phá thư viện
        </Link>
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Trang chủ
        </Link>
      </div>
    </div>
  );
}
