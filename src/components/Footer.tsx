import Link from "next/link";
import { BookOpen, ShieldCheck, Heart, Mail, Sparkles, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-zinc-950 text-zinc-400">
      {/* Top Banner */}
      <div className="border-b border-zinc-800/60 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="group inline-flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl gradient-brand text-white shadow-md shadow-orange-900/40">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-bold text-lg text-white" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
                    Bảo Bối Story Hub
                  </span>
                  <span className="block text-[10px] font-semibold uppercase tracking-widest text-orange-400">
                    Illustrated Stories for Children
                  </span>
                </div>
              </Link>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
                Thư viện truyện minh họa sắc nét có audio cho trẻ từ 3–15 tuổi.
                Nội dung biên tập thủ công, an toàn tuyệt đối, giàu giá trị giáo dục.
              </p>

              {/* Safety Badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/50 border border-emerald-900/60 px-3 py-1 text-[11px] font-semibold text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Kiểm duyệt 100% thủ công
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-950/40 border border-orange-900/50 px-3 py-1 text-[11px] font-semibold text-orange-400">
                  <Heart className="h-3.5 w-3.5" />
                  Không quảng cáo nhắm trẻ
                </span>
              </div>
            </div>

            {/* Khám phá */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-300">
                Khám phá
              </h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href: "/library?age=3-8",    label: "Truyện độ tuổi 3–8" },
                  { href: "/library?age=9-12",   label: "Truyện độ tuổi 9–12" },
                  { href: "/library?age=12-15",  label: "Truyện độ tuổi 12–15" },
                  { href: "/library?format=listen", label: "Audio truyện" },
                  { href: "/library",            label: "Toàn bộ thư viện" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-zinc-500 hover:text-orange-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Liên hệ & Hệ thống */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-300">
                Hệ thống
              </h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href: "/admin",       label: "CMS Quản trị nội dung" },
                  { href: "/admin?tab=publishing", label: "Xuất bản & Phân phối" },
                  { href: "/admin?tab=analytics",  label: "Báo cáo & Phân tích" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-zinc-500 hover:text-orange-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Contact */}
              <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500">
                <Mail className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                lienhe@baoboi.vn
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Bảo Bối Story Hub. Thiết kế vì sự phát triển an lành của thế hệ trẻ.
          </p>
          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <Sparkles className="h-3 w-3 text-orange-600" />
            <span>Tiếng Việt · English bilingual</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
