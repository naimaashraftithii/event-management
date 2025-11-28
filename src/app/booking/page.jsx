// src/app/booking/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import LoadingLottie from "@/components/LoadingLottie";
import ErrorLottie from "@/components/ErrorLottie";

import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import Swal from "sweetalert2";

export default function BookingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // 🔐 protect route
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/login");
    }
  }, [session, status, router]);

  // Load bookings 
  useEffect(() => {
    if (!session) return;

    async function load() {
      try {
        setErrorMsg("");

        const qRef = query(
          collection(db, "bookings"),
          where("userEmail", "==", session.user.email)
        );

        const snap = await getDocs(qRef);
        let list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));


        list.sort((a, b) => {
          const aTs = a.createdAt?.seconds || 0;
          const bTs = b.createdAt?.seconds || 0;
          return bTs - aTs;
        });

        setBookings(list);
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to load bookings");
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [session]);


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteDoc(doc(db, "bookings", id));

      setBookings((prev) => prev.filter((b) => b.id !== id));

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your booking has been removed.",
        confirmButtonColor: "#f97316",
      });
    } catch (err) {
      console.error(err);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete booking. Please try again.",
        confirmButtonColor: "#f97316",
      });
    }
  };


  const handleMarkConfirmed = async (id) => {
    const result = await Swal.fire({
      title: "Mark as confirmed?",
      text: "We’ll update the status of this booking.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, confirm it",
    });

    if (!result.isConfirmed) return;

    try {
      const ref = doc(db, "bookings", id);
      await updateDoc(ref, { status: "confirmed" });

      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: "confirmed" } : b
        )
      );

      await Swal.fire({
        icon: "success",
        title: "Booking confirmed 🎉",
        text: "Status updated to confirmed.",
        confirmButtonColor: "#22c55e",
      });
    } catch (err) {
      console.error(err);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update booking. Please try again.",
        confirmButtonColor: "#f97316",
      });
    }
  };


  if (status === "loading" || (!session && status !== "loading")) {
    return <LoadingLottie message="Checking your session..." />;
  }

  return (
    <>
      <Toaster />
      <main className="min-h-screen bg-[#050816] text-white pt-24 pb-16">
        <section className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            My Bookings
          </h1>

          {/* Loading */}
          {loading && (
            <div className="py-10">
              <LoadingLottie
                message="Loading your bookings..."
                fullscreen={false}
              />
            </div>
          )}

          {/* Error */}
          {!loading && errorMsg && (
            <div className="py-6">
              <ErrorLottie
                message={errorMsg || "Failed to load your bookings."}
                fullscreen={false}
              />
            </div>
          )}

          {/* Empty */}
          {!loading && !errorMsg && bookings.length === 0 && (
            <p className="text-sm text-[#9ca3af]">
              You have no bookings yet.
            </p>
          )}

          {/* List */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl border border-white/10 bg-[#0b1020] p-4 flex flex-col gap-2"
              >
                <div className="flex gap-3">
                  {b.imageUrl && (
                    <div
                      className="h-20 w-24 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${b.imageUrl})` }}
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">
                      {b.title}
                    </h3>
                    <p className="text-[11px] text-[#9ca3af]">
                      {b.category}
                    </p>
                    <p className="text-xs text-[#ffcf6a] mt-1">
                      Status:{" "}
                      <span className="font-semibold">
                        {b.status || "pending"}
                      </span>
                    </p>
                    {typeof b.price === "number" && (
                      <p className="text-xs text-[#9ca3af] mt-1">
                        Price:{" "}
                        <span className="text-[#ff9f1a] font-semibold">
                          {b.price.toLocaleString()}{" "}
                          {b.currency || "BDT"}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/*  buttons */}
                <div className="mt-3 flex gap-2 justify-end">
                  {b.status !== "confirmed" && (
                    <button
                      onClick={() => handleMarkConfirmed(b.id)}
                      className="px-3 py-1 rounded-full text-[11px] bg-emerald-500 text-black hover:bg-emerald-400"
                    >
                      Mark Confirmed
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="px-3 py-1 rounded-full text-[11px] bg-red-500 text-white hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
