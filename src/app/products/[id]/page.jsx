// src/app/products/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase"; // products/[id] -> ../../../lib

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // একক product লোড করা
  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setItem({ id: snap.id, ...snap.data() });
        } else {
          router.push("/products");
        }
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, router]);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#050816] pt-28 flex items-center justify-center">
        <p className="text-sm text-[#b3b3b3]">Loading package...</p>
      </section>
    );
  }

  if (!item) return null;

  return (
    <section className="min-h-screen bg-[#050816] pt-24 pb-16">
      {/* Banner */}
      <div className="relative h-[260px] md:h-[340px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-black/40 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 h-full flex flex-col justify-end pb-8">
          <p className="text-xs tracking-[0.2em] text-[#ffcf6a] uppercase">
            {item.category}
          </p>
          <h1 className="mt-1 text-3xl md:text-4xl font-bold text-white">
            {item.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#e5e5e5]">
            {item.shortDescription}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 mt-8 grid gap-8 md:grid-cols-[2fr,1fr]">
        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-[#dadada] mb-2">
            Package Details
          </h2>
          <p className="text-sm leading-relaxed text-[#b3b3b3] whitespace-pre-line">
            {item.description}
          </p>
        </div>

        {/* Meta info */}
        <aside className="rounded-2xl border border-white/10 bg-[#050816] p-5 shadow-lg shadow-black/40">
          <h3 className="text-sm font-semibold text-[#dadada] mb-4">
            Package Info
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#9ca3af]">Price</span>
              <span className="font-semibold text-[#ff9f1a]">
                {item.price?.toLocaleString()} {item.currency}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#9ca3af]">Category</span>
              <span className="text-[#dadada] capitalize">
                {item.category}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#9ca3af]">Priority</span>
              <span className="text-[#ffcf6a] uppercase text-xs">
                {item.priority}
              </span>
            </div>

            {Array.isArray(item.tags) && item.tags.length > 0 && (
              <div className="pt-3">
                <p className="text-xs text-[#9ca3af] mb-1">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-2 py-[2px] text-[10px] uppercase tracking-wide text-[#dadada]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="mt-5 w-full rounded-full bg-[#ff9f1a] py-2.5 text-sm font-semibold text-black hover:bg-[#ff7a00] transition">
            Book This Package
          </button>
        </aside>
      </div>

      {/* Back button */}
      <div className="max-w-5xl mx-auto px-4 mt-10">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-[#dadada] hover:border-[#ff9f1a] hover:text-[#ff9f1a] transition"
        >
          ← Back to all packages
        </Link>
      </div>
    </section>
  );
}
