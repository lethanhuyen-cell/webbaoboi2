"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Settings, Compass, Heart } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400 text-white shadow-md shadow-orange-200 transition-transform group-hover:scale-105">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-orange-600 tracking-tight">Bảo Bối</span>
            <span className="text-[10px] font-medium text-orange-400 -mt-1 uppercase tracking-wider">Story Hub</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isLinkActive("/") && !pathname.startsWith("/library") && !pathname.startsWith("/admin")
                ? "bg-orange-50 text-orange-600"
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
          >
            <Compass className="h-4 w-4" />
            Trang chủ
          </Link>
          <Link
            href="/library"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isLinkActive("/library")
                ? "bg-orange-50 text-orange-600"
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Thư viện truyện
          </Link>
          <Link
            href="/admin"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isLinkActive("/admin")
                ? "bg-purple-50 text-purple-600"
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
          >
            <Settings className="h-4 w-4" />
            Quản trị CMS
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/library?format=listen"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50/50 px-3 py-1.5 text-xs font-semibold text-orange-700 hover:bg-orange-50"
          >
            <Heart className="h-3 w-3 fill-orange-500 text-orange-500" />
            Nghe Audio Truyện
          </Link>
          
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 transition-colors"
          >
            CMS Editor
          </Link>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex border-t border-orange-50 bg-white/95 px-2 py-1 justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center py-1 px-3 text-xs font-medium ${
            isLinkActive("/") && !pathname.startsWith("/library") && !pathname.startsWith("/admin")
              ? "text-orange-500"
              : "text-zinc-500"
          }`}
        >
          <Compass className="h-5 w-5 mb-0.5" />
          Trang chủ
        </Link>
        <Link
          href="/library"
          className={`flex flex-col items-center py-1 px-3 text-xs font-medium ${
            isLinkActive("/library") ? "text-orange-500" : "text-zinc-500"
          }`}
        >
          <BookOpen className="h-5 w-5 mb-0.5" />
          Thư viện
        </Link>
        <Link
          href="/admin"
          className={`flex flex-col items-center py-1 px-3 text-xs font-medium ${
            isLinkActive("/admin") ? "text-purple-500" : "text-zinc-500"
          }`}
        >
          <Settings className="h-5 w-5 mb-0.5" />
          Quản trị CMS
        </Link>
      </div>
    </header>
  );
}
