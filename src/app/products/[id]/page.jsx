// src/app/products/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import LoadingLottie from "@/components/LoadingLottie";
import ErrorLottie from "@/components/ErrorLottie";

import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import Swal from "sweetalert2";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  // Load single product from Firestore
  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      try {
        setErrorMsg("");
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setItem(null);
          setErrorMsg("Package not found or removed.");
          return;
        }

        setItem({ id: snap.id, ...snap.data() });
      } catch (err) {
        console.error("Failed to load product:", err);
        setErrorMsg("Failed to load package");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const handleBooking = async () => {
    if (!item) return;

    // wait if auth loading
    if (status === "loading") return;

    if (!session) {
      const result = await Swal.fire({
        title: "Login required",
        text: "Please login or register to book this package.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#f97316",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        router.push("/login");
      }
      return;
    }

    try {
      setBookingLoading(true);

      await addDoc(collection(db, "bookings"), {
        productId: item.id,
        title: item.title,
        imageUrl: item.imageUrl || "",
        category: item.category || "",
        price: item.price || "",
        currency: item.currency || "BDT",
        userEmail: session.user.email,
        userName: session.user.name || "",
        status: "pending",
        createdAt: serverTimestamp(),
      });

      await Swal.fire({
        icon: "success",
        title: "Booking created!",
        text: "You can see it in the 'My Bookings' page.",
        confirmButtonColor: "#22c55e",
      });

      router.push("/booking");
    } catch (err) {
      console.error("Booking error:", err);
      await Swal.fire({
        icon: "error",
        title: "Booking failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#f97316",
      });
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

          {/* RIGHT */}
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

        {/* Back */}
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
