import Link from "next/link";
import { BookOpen, ShieldCheck, Heart, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-100 bg-zinc-50 py-12 text-zinc-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-400 text-white shadow-sm">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg text-zinc-900 tracking-tight">
                Bảo Bối Story Hub
              </span>
            </Link>
            <p className="text-sm max-w-sm text-zinc-500 leading-relaxed">
              Thư viện truyện tranh minh họa có âm thanh chất lượng cao cho trẻ em từ 3 đến 15 tuổi. Giúp con hiểu bản thân, nuôi dưỡng trí tuệ cảm xúc (EQ) và phát triển tư duy khoa học lành mạnh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-zinc-900 text-sm mb-4 uppercase tracking-wider">Khám phá</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/library?age=3-8" className="hover:text-orange-500 transition-colors">Độ tuổi 3–8</Link>
              </li>
              <li>
                <Link href="/library?age=9-12" className="hover:text-orange-500 transition-colors">Độ tuổi 9–12</Link>
              </li>
              <li>
                <Link href="/library?age=12-15" className="hover:text-orange-500 transition-colors">Độ tuổi 12–15</Link>
              </li>
              <li>
                <Link href="/library?topic=Bedtime" className="hover:text-orange-500 transition-colors">Truyện ngủ ngon</Link>
              </li>
            </ul>
          </div>

          {/* Safety & Policy */}
          <div>
            <h4 className="font-semibold text-zinc-900 text-sm mb-4 uppercase tracking-wider">An Toàn Cho Trẻ</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs text-zinc-500">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Nội dung đã duyệt 100% bởi chuyên gia sư phạm & tâm lý trẻ em.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-zinc-500">
                <Heart className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Không có quảng cáo nhắm tới trẻ, không bình luận mở tự do.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-zinc-500">
                <Mail className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Lắng nghe phản hồi: lienhe@baoboi.vn</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Bảo Bối Story Hub. Thiết kế vì sự phát triển an lành của thế hệ trẻ.
          </p>
          <div className="flex gap-4 text-xs">
            <Link href="/admin/safety" className="text-zinc-400 hover:text-orange-500 transition-colors">Tiêu chuẩn an toàn</Link>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-400">Vietnamese - English bilingual structure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
