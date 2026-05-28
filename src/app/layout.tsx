import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Bảo Bối Story Hub",
    default: "Bảo Bối Story Hub – Truyện minh họa có audio cho trẻ em",
  },
  description: "Thư viện truyện minh họa sắc nét tích hợp audio truyền cảm, phân loại theo độ tuổi 3-8, 9-12, 12-15 tuổi giúp trẻ đọc, nghe, hiểu mình và thế giới.",
  keywords: ["truyện thiếu nhi", "truyện tranh minh họa", "audio truyện", "truyện ngủ ngon", "baoboi", "bảo bối"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://baoboi.vn",
    siteName: "Bảo Bối Story Hub",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex flex-col flex-1 animate-fade-in">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
