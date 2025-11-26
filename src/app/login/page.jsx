"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl: "/",
    });

    setLoading(false);

    if (!res?.error) {
      router.push("/");
    } else {
      alert("Login failed. Check email/password.");
    }
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#050816] px-4 py-8">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-0 bg-[#090f1f] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
        {/* LEFT - Welcome card */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 text-center text-white relative">
          <div className="absolute top-6 left-6 text-sm opacity-80 flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-lg font-bold">
              e
            </div>
            <span className="font-semibold">EventHub</span>
          </div>

          <div className="mt-6">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/15 flex items-center justify-center text-3xl">
              📅
            </div>
            <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>
            <p className="text-sm text-white/80 max-w-xs mx-auto">
              Join thousands of event enthusiasts and continue your journey with
              EventHub. Discover amazing events and create unforgettable
              memories.
            </p>

            <div className="flex justify-center gap-10 mt-8 text-left text-sm">
              <div>
                <p className="text-xl font-bold">500+</p>
                <p className="text-white/80 text-xs">Events</p>
              </div>
              <div>
                <p className="text-xl font-bold">10K+</p>
                <p className="text-white/80 text-xs">Users</p>
              </div>
              <div>
                <p className="text-xl font-bold">50+</p>
                <p className="text-white/80 text-xs">Cities</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - Login form */}
        <div className="p-8 md:p-10 bg-[#050816]">
          <h3 className="text-sm font-semibold text-indigo-400 mb-1 flex items-center gap-2">
            <span>📅</span> EventHub
          </h3>
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-xs text-white/60 mb-6">
            Sign in to your account to continue
          </p>

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 text-sm font-medium bg-[#0b1020] hover:bg-[#12172a] border border-white/10 rounded-xl py-3 mb-4 transition"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-[11px] uppercase tracking-wide text-white/40">
              Or continue with email
            </span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* error */}
          {error && (
            <p className="text-xs text-red-400 mb-2">
              {error === "OAuthAccountNotLinked"
                ? "This email is already linked with another provider."
                : "Something went wrong. Please try again."}
            </p>
          )}

          {/* Credentials form */}
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs text-white/70">
                  Email Address
                </span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="input input-bordered bg-[#050816] border-white/15 text-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs text-white/70">
                  Password
                </span>
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="input input-bordered bg-[#050816] border-white/15 text-sm"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between text-xs text-white/60 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-xs" />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-indigo-400 hover:text-indigo-300"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 shadow-lg hover:opacity-90 transition"
            >
              {loading ? "Signing in..." : "Sign in to your account"}
            </button>
          </form>

          <p className="mt-4 text-xs text-white/60 text-center">
            Don&apos;t have an account?{" "}
            <span className="text-indigo-400 cursor-pointer hover:text-indigo-300">
              Create an account
            </span>
            {/* এখানে চাইলে /register route এ নিতে পারো */}
          </p>
        </div>
      </div>
    </div>
  );
}
