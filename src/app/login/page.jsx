// src/app/login/page.jsx
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <section className="min-h-screen bg-[#050816] flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full grid gap-10 md:grid-cols-[1.2fr,1fr] items-center">
        {/* LEFT SIDE: TEXT / BRANDING */}
        <div className="space-y-4">
          <p className="text-xs tracking-[0.25em] uppercase text-[#ff9f1a]">
            Welcome to EventHub
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#f9fafb]">
            Log in &amp; start planning{" "}
            <span className="text-[#ff9f1a]">unforgettable events.</span>
          </h1>
          <p className="text-sm text-[#9ca3af] max-w-md">
            Manage your wedding, holud, iftar party, corporate night or any
            occasion from a single dashboard. Save your favourite packages and
            book our team in just a few clicks.
          </p>

          <ul className="mt-4 space-y-2 text-xs text-[#9ca3af]">
            <li>• Browse curated event packages.</li>
            <li>• Save ideas to your shortlist.</li>
            <li>• Get full support from our planning team.</li>
          </ul>
        </div>

        {/* RIGHT SIDE: CARD */}
        <div className="bg-[#0b1020] border border-white/10 rounded-3xl shadow-xl shadow-black/40 px-6 py-7 md:px-8 md:py-9">
          <h2 className="text-lg font-semibold text-[#f9fafb]">
            Sign in to continue
          </h2>
          <p className="mt-1 text-xs text-[#9ca3af]">
            Use your Google account to access EventHub.
          </p>

          <button
            onClick={handleGoogleLogin}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#ff9f1a] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#ff7a00] transition shadow-md shadow-black/30"
          >
            <span className="text-lg">G</span>
            <span>Continue with Google</span>
          </button>

          <div className="mt-6 border-t border-white/10 pt-4 text-[11px] text-[#6b7280]">
            <p>
              By continuing, you agree to our{" "}
              <span className="text-[#ffcf6a]">Terms</span> and{" "}
              <span className="text-[#ffcf6a]">Privacy Policy</span>.
            </p>
            <p className="mt-3">
              Back to{" "}
              <Link
                href="/"
                className="text-[#ff9f1a] hover:text-[#ffcf6a] font-medium"
              >
                home
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
