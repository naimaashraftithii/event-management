"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return Swal.fire({
        icon: "error",
        title: "Fill all fields",
      });
    }

    Swal.fire({
      icon: "success",
      title: "Account created (demo only)",
      text: "Now login using credentials",
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#050816] p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0b1020] border border-white/10 p-6 rounded-2xl max-w-md w-full"
      >
        <h1 className="text-xl mb-4 font-semibold text-white">Register</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 rounded bg-[#050816] text-white border border-white/20"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-3 py-2 rounded bg-[#050816] text-white border border-white/20"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-orange-500 py-2 rounded text-white">
          Create Account
        </button>
      </form>
    </section>
  );
}
