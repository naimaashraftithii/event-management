// src/app/products/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import LoadingLottie from "@/components/LoadingLottie";
import ErrorLottie from "@/components/ErrorLottie";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function ProductDetailsPage() {
  const { id } = useParams(); 
  const router = useRouter();
  const { data: session } = useSession();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      try {
        setErrorMsg("");
        const res = await fetch(`${API_BASE}/api/products/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          if (res.status === 404) {
            setItem(null);
            setErrorMsg("Package not found or removed.");
            return;
          }
          throw new Error("Failed to load product");
        }

        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error("Failed to load product:", err);
        setErrorMsg(err.message || "Failed to load package");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const handleBooking = async () => {
    if (!item) return;

    if (!session) {
      toast("Please login to book this package", { icon: "🔒" });
      router.push("/login");
      return;
    }

    try {
      setBookingLoading(true);

      const payload = {
        productId: item._id,
        title: item.title,
        imageUrl: item.imageUrl,
        category: item.category,
        price: item.price,
        userEmail: session.user.email,
        userName: session.user.name || "",
        status: "pending",
      };

      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Booking failed");
      }

      toast.success("Booking created! Check 'My Bookings' page.");
      router.push("/booking");
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(err.message || "Failed to create booking");
    } finally {
      setBookingLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="min-h-screen bg-[#050816] pt-24 pb-16 flex items-center justify-center">
        <Toaster />
        <LoadingLottie message="Loading package..." fullscreen={false} />
      </section>
    );
  }

  // Error state
  if (errorMsg && !item) {
    return (
      <section className="min-h-screen bg-[#050816] pt-24 pb-16 flex items-center justify-center">
        <Toaster />
        <div className="max-w-md w-full">
          <ErrorLottie message={errorMsg} fullscreen={false} />
          <div className="mt-6 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-[#dadada] hover:border-[#ff9f1a] hover:text-[#ff9f1a] transition"
            >
              ← Back to all packages
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const priceText =
    typeof item.price === "number"
      ? item.price.toLocaleString()
      : item.price || "-";

  return (
    <>
      <Toaster />
      <section className="min-h-screen bg-[#050816] pt-24 pb-16 text-white">
        {/* Banner */}
        <div className="relative h-[260px] md:h-[340px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-black/40 to-transparent" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 h-full flex flex-col justify-end pb-8">
            {item.category && (
              <p className="text-xs tracking-[0.2em] text-[#ffcf6a] uppercase">
                {item.category}
              </p>
            )}
            <h1 className="mt-1 text-3xl md:text-4xl font-bold text-white">
              {item.title}
            </h1>
            {item.shortDescription && (
              <p className="mt-2 max-w-2xl text-sm text-[#e5e5e5]">
                {item.shortDescription}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 mt-8 grid gap-8 md:grid-cols-[2fr,1fr]">
          {/* LEFT */}
          <div>
            <h2 className="text-lg font-semibold text-[#dadada] mb-2">
              Package Details
            </h2>
            <p className="text-sm leading-relaxed text-[#b3b3b3] whitespace-pre-line">
              {item.description || "No detailed description provided."}
            </p>
          </div>

          {/* RIGHT*/}
          <aside className="rounded-2xl border border-white/10 bg-[#050816] p-5 shadow-lg shadow-black/40">
            <h3 className="text-sm font-semibold text-[#dadada] mb-4">
              Package Info
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#9ca3af]">Price</span>
                <span className="font-semibold text-[#ff9f1a]">
                  {priceText} {item.currency || "BDT"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#9ca3af]">Category</span>
                <span className="text-[#dadada] capitalize">
                  {item.category || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#9ca3af]">Priority</span>
                <span className="text-[#ffcf6a] uppercase text-xs">
                  {item.priority || "normal"}
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

            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="mt-5 w-full rounded-full bg-[#ff9f1a] py-2.5 text-sm font-semibold text-black hover:bg-[#ff7a00] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {bookingLoading ? "Booking..." : "Book This Package"}
            </button>
          </aside>
        </div>

        {/* Back n */}
        <div className="max-w-5xl mx-auto px-4 mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-[#dadada] hover:border-[#ff9f1a] hover:text-[#ff9f1a] transition"
          >
            ← Back to all packages
          </Link>
        </div>
      </section>
    </>
  );
}
