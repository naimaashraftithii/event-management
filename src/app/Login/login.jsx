"use client";

import { signInWithGoogle } from "../../lib/firebase";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, initializing } = useAuth();
  const router = useRouter();

  if (!initializing && user) {
    router.push("/"); // already logged in
  }

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Login failed. Check console.");
    }
  };

  return (
    <section className="max-w-md mx-auto mt-10 card bg-base-200 shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <button
        className="btn btn-primary w-full"
        onClick={handleLogin}
        disabled={initializing}
      >
        {initializing ? "Loading..." : "Sign in with Google"}
      </button>
    </section>
  );
}
