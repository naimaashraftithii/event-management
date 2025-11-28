"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import LoadingLottie from "@/components/LoadingLottie";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

const initialForm = {
  title: "",
  shortDescription: "",
  description: "",
  price: "",
  eventDate: "",
  priority: "",
  imageUrl: "",
  category: "Wedding",
};

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  // 🔐 protect route
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      toast("Please login to add products", { icon: "🔒" });
      router.replace("/login");
    }
  }, [session, status, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        ...form,
        price: Number(form.price) || 0,
        createdBy: session?.user?.email || "anonymous",
      };

      const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create product");

      toast.success("Event package added ✔️");
      setForm(initialForm);

      setTimeout(() => router.push("/products/manage"), 500);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };


  if (status === "loading") {
    return <LoadingLottie message="Checking your session..." />;
  }

  return (
    <>
      <Toaster />


      {submitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-40">
            <LoadingLottie message="Submitting package..." fullscreen={false} />
          </div>
        </div>
      )}

      <main className="min-h-screen bg-[#050816] text-white pt-24 pb-20">
        <section className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">
            Add New <span className="text-[#ff9f1a]">Event Package</span>
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Create a new event package. After creation, you can manage it from{" "}
            <Link href="/products/manage" className="text-yellow-400 underline">
              Manage Products
            </Link>
            .
          </p>

          {/* Form Card */}
          <div className="bg-white/10 p-6 rounded-2xl shadow-lg border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="text-sm text-gray-300">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Wedding Premium Package"
                  className="
                    w-full px-4 py-2 mt-1 bg-white text-black 
                    placeholder:text-gray-500 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-yellow-500
                  "
                  required
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="text-sm text-gray-300">
                  Short Description *
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  placeholder="Short intro of your package"
                  className="
                    w-full px-4 py-2 mt-1 bg-white text-black 
                    placeholder:text-gray-500 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-yellow-500
                  "
                  required
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="text-sm text-gray-300">Full Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe full package details..."
                  className="
                    w-full px-4 py-2 mt-1 bg-white text-black 
                    placeholder:text-gray-500 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-yellow-500
                  "
                ></textarea>
              </div>

              {/* Category */}
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-2 bg-white text-black rounded-lg border border-gray-300
                      focus:outline-none focus:ring-2 focus:ring-yellow-500
                    "
                  >
                    <option>Wedding</option>
                    <option>Holud / Mehendi</option>
                    <option>Corporate</option>
                    <option>Birthday</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-300">Price (BDT)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="80000"
                    className="
                      w-full px-4 py-2 bg-white text-black placeholder:text-gray-500
                      rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500
                    "
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={form.eventDate}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-2 bg-white text-black rounded-lg border border-gray-300
                      focus:outline-none focus:ring-2 focus:ring-yellow-500
                    "
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Priority</label>
                  <input
                    type="text"
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    placeholder="High / Medium"
                    className="
                      w-full px-4 py-2 bg-white text-black placeholder:text-gray-500
                      rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500
                    "
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="text-sm text-gray-500">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="
                    w-full px-4 py-2 bg-white text-black placeholder:text-gray-500
                    rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500
                  "
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  w-full py-3 rounded-full bg-gradient-to-r 
                  from-orange-500 via-yellow-400 to-orange-400 
                  text-black font-semibold hover:brightness-110 transition
                "
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Package"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
