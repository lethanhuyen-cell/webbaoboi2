"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BookOpen, Settings, Compass, Volume2, Menu, X, Search } from "lucide-react";

const navLinks = [
  { href: "/", label: "Trang chủ", icon: Compass, exact: true },
  { href: "/library", label: "Thư viện", icon: BookOpen, exact: false },
  { href: "/admin", label: "Quản trị CMS", icon: Settings, exact: false, admin: true },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      router.push(`/library?search=${encodeURIComponent(headerSearch.trim())}`);
      setHeaderSearch("");
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-orange-100/80 bg-white/85 backdrop-blur-xl shadow-[0_1px_0_0_rgba(249,115,22,0.06)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setMobileOpen(false)}>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl gradient-brand text-white shadow-md shadow-orange-200/60 transition-transform duration-200 group-hover:scale-105">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-lg text-zinc-900 tracking-tight">
                Bảo Bối
              </span>
              <span className="text-[9px] font-bold text-[#ff4500] uppercase tracking-[0.12em]">
                Story Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href, link.exact);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? link.admin
                        ? "bg-purple-50 text-purple-700"
                        : "bg-zinc-100 text-[#1d1d1f]"
                      : "text-zinc-650 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <link.icon className={`h-3.5 w-3.5 ${active && !link.admin ? "text-[#ff4500]" : active && link.admin ? "text-purple-500" : "text-zinc-400"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/library?format=listen"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-[#f5f5f7] px-3.5 py-1.5 text-xs font-bold text-[#1d1d1f] hover:bg-zinc-100 transition-all active:scale-95 shadow-sm"
            >
              <Volume2 className="h-3.5 w-3.5 text-zinc-500" />
              Nghe Audio
            </Link>

            <Link
              href="/admin"
              className="hidden md:inline-flex items-center justify-center rounded-full bg-[#1d1d1f] hover:bg-[#2d2d2f] px-4 py-2 text-sm font-bold text-white transition-all active:scale-95"
            >
              CMS
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-orange-50 bg-white/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1 animate-fade-in">
            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-2">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-orange-400" />
              <input
                type="text"
                placeholder="Tìm truyện..."
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                className="w-full rounded-full border border-orange-100 bg-orange-50/30 py-2 pl-9 pr-4 text-xs font-medium outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-zinc-800"
              />
            </form>
            {navLinks.map((link) => {
              const active = isActive(link.href, link.exact);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? link.admin
                        ? "bg-purple-50 text-purple-700"
                        : "bg-orange-50 text-orange-600"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/library?format=listen"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-orange-600 bg-orange-50 mt-1"
            >
              <Volume2 className="h-4 w-4" />
              Nghe Audio Truyện
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
