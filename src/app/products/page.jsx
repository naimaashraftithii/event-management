"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function ProductsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("price", "asc"));
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const categories = ["all", ...new Set(items.map((p) => p.category))];

  const filtered = items.filter((item) => {
    const catMatch = category === "all" || item.category === category;
    const text = (
      item.title +
      item.shortDescription +
      (item.description || "")
    ).toLowerCase();
    const searchMatch = text.includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <section className="min-h-screen bg-[#050816] pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <p className="text-xs tracking-[0.2em] text-[#ff9f1a] uppercase">
            Our Packages
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#dadada] mt-2">
            Choose The Perfect Event Package
          </h1>
          <p className="mt-2 text-sm text-[#b3b3b3] max-w-2xl">
            Wedding, birthday, corporate বা family gathering – আপনার ইভেন্টের জন্য
            curated decoration packages এক জায়গায়।
          </p>
        </header>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title, type or keyword..."
            className="flex-1 rounded-xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-[#dadada] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#ff9f1a]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="md:w-56 rounded-xl border border-white/10 bg-[#050816] px-3 py-3 text-sm text-[#dadada] focus:outline-none focus:ring-2 focus:ring-[#ff9f1a]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all"
                  ? "All categories"
                  : c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Loading state */}
        {loading && (
          <p className="text-sm text-[#b3b3b3]">Loading packages...</p>
        )}

        {/* Cards Grid */}
        {!loading && (
          <>
            {filtered.length === 0 ? (
              <p className="text-sm text-[#b3b3b3]">
                No packages found. Try a different search or category.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item) => (
                  <article
                    key={item.id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#050816] shadow-md shadow-black/40 hover:-translate-y-1 hover:border-[#ff9f1a] transition-all"
                  >
                    {/* Image */}
                    <div className="h-44 w-full overflow-hidden bg-black">
                      <div
                        className="h-full w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#dadada] line-clamp-1">
                          {item.title}
                        </h3>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-[2px] text-[10px] uppercase tracking-wide text-[#ffcf6a]">
                          {item.priority}
                        </span>
                      </div>

                      <p className="text-xs text-[#b3b3b3] line-clamp-2">
                        {item.shortDescription}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[#ff9f1a]">
                            {item.price?.toLocaleString()} {item.currency}
                          </p>
                          <p className="text-[10px] uppercase text-[#9ca3af]">
                            {item.category}
                          </p>
                        </div>

                        <Link
                          href={`/products/${item.id}`}
                          className="rounded-full border border-[#ff9f1a] px-3 py-1 text-xs font-semibold text-[#ff9f1a] hover:bg-[#ff9f1a] hover:text-black transition"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
