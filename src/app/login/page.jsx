// src/app/login/page.jsx
"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.error) {
      setErrorMsg("Invalid email or password.");
    } else {
      router.replace("/");
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-[#050816] flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full grid gap-10 md:grid-cols-[1.2fr,1fr] items-center">
        {/* LEFT */}
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
            occasion from a single dashboard. Save favourite packages and book
            our team in just a few clicks.
          </p>

          <div className="flex gap-8 mt-6 text-left text-sm">
            <div>
              <p className="text-xl font-bold text-[#f9fafb]">500+</p>
              <p className="text-[#9ca3af] text-xs">Events</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#f9fafb]">10K+</p>
              <p className="text-[#9ca3af] text-xs">Users</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#f9fafb]">50+</p>
              <p className="text-[#9ca3af] text-xs">Cities</p>
            </div>
          </div>
        </div>

        {/* RIGHT*/}
        <div className="bg-[#0b1020] border border-white/10 rounded-3xl shadow-xl shadow-black/40 px-6 py-7 md:px-8 md:py-9">
          <h2 className="text-lg font-semibold text-[#f9fafb]">
            Sign in to continue
          </h2>
          <p className="mt-1 text-xs text-[#9ca3af]">
            Use your account to access EventHub.
          </p>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#ff9f1a] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#ff7a00] transition shadow-md shadow-black/30 disabled:opacity-60"
          >
            <FcGoogle size={20} />
            <span>{loading ? "Please wait..." : "Continue with Google"}</span>
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-[11px] uppercase tracking-wide text-white/40">
              Or login with email
            </span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {errorMsg && (
            <p className="mb-3 text-xs text-red-400">{errorMsg}</p>
          )}

          {/* credentials form */}
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div>
              <label className="text-xs text-white/70 block mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/15 bg-[#050816] px-3 py-2 text-sm outline-none focus:border-[#ff9f1a]"
              />
            </div>
            <div>
              <label className="text-xs text-white/70 block mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/15 bg-[#050816] px-3 py-2 text-sm outline-none focus:border-[#ff9f1a]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2.5 text-sm font-semibold shadow-lg hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-4 text-[11px] text-[#6b7280]">
            <p>
              New here?{" "}
              <Link
                href="/register"
                className="text-[#ffcf6a] font-medium hover:text-[#ffe6a6]"
              >
                Create an account
              </Link>
              .
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
