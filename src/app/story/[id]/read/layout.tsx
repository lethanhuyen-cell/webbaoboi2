import React from "react";

export default function ReadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[99999] bg-black w-screen h-screen overflow-hidden">
      {children}
    </div>
  );
}
