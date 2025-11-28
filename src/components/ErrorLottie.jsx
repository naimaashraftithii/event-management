// src/components/ErrorLottie.jsx
"use client";

export default function ErrorLottie({
  message = "Something went wrong",
  fullscreen = true,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        fullscreen ? "min-h-screen bg-[#050816]" : "py-8"
      }`}
    >
      <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center">
        <span className="text-3xl">⚠️</span>
      </div>

      <h1 className="mt-4 text-xl md:text-2xl font-bold text-white">Oops!</h1>
      <p className="mt-2 text-sm text-[#e5e7eb] max-w-md">
        {message}
      </p>
    </div>
  );
}
