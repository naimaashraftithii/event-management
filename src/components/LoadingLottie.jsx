// src/components/LoadingLottie.jsx
"use client";

export default function LoadingLottie({
  message = "Loading...",
  fullscreen = true,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullscreen ? "min-h-screen bg-[#050816]" : "py-8"
      }`}
    >
      {/* spinner */}
      <div className="w-14 h-14 border-4 border-white/20 border-t-white rounded-full animate-spin" />

      <p className="mt-4 text-sm text-[#e5e7eb]">{message}</p>
    </div>
  );
}
