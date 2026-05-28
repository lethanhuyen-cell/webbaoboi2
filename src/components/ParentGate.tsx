"use client";
import { useState, useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function ParentGate({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const verified = sessionStorage.getItem("parentVerified");
    if (verified === "true") {
      setIsVerified(true);
    } else {
      generateMath();
    }
  }, []);

  const generateMath = () => {
    setNum1(Math.floor(Math.random() * 9) + 4);
    setNum2(Math.floor(Math.random() * 9) + 3);
    setAnswer("");
    setError(false);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(answer) === num1 * num2) {
      sessionStorage.setItem("parentVerified", "true");
      setIsVerified(true);
    } else {
      setError(true);
      setTimeout(generateMath, 1500);
    }
  };

  if (!mounted) return null;
  
  if (isVerified) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-fade-in-up">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 mb-6">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-center text-2xl font-bold text-zinc-900 mb-2" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
          Khu vực dành cho phụ huynh
        </h2>
        <p className="text-center text-zinc-500 mb-8 text-sm">
          Để tiếp tục, vui lòng giải phép toán bên dưới để xác nhận bạn là người lớn.
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex items-center justify-center gap-4 text-3xl font-black text-zinc-800">
            <span>{num1}</span>
            <span className="text-orange-500">×</span>
            <span>{num2}</span>
            <span className="text-orange-500">=</span>
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={`w-24 rounded-2xl border-2 ${error ? "border-red-400 bg-red-50 text-red-600" : "border-zinc-200 bg-zinc-50"} p-3 text-center outline-none focus:border-orange-500 transition-colors`}
              placeholder="?"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-center text-sm font-semibold text-red-500 animate-pulse">
              Sai rồi! Vui lòng thử lại nhé.
            </p>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={!answer}
              className="flex h-12 w-full items-center justify-center rounded-full gradient-brand text-white font-bold shadow-lg shadow-orange-200 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Xác nhận
            </button>
            <Link
              href="/"
              className="flex h-12 w-full items-center justify-center rounded-full bg-zinc-100 text-zinc-600 font-semibold hover:bg-zinc-200 transition-colors"
            >
              Quay lại trang chủ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
