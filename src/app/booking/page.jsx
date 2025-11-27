// src/app/booking/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";

export default function BookingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session && status !== "loading") {
      router.replace("/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (!session) return;
    async function load() {
      try {
        const q = query(
          collection(db, "bookings"),
          where("userEmail", "==", session.user.email)
        );
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setBookings(list);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [session]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings((b) => b.filter((x) => x.id !== id));
      toast.success("Booking deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete booking");
    }
  };

  const handleMarkConfirmed = async (id) => {
    try {
      const ref = doc(db, "bookings", id);
      await updateDoc(ref, { status: "confirmed" });
      setBookings((b) =>
        b.map((x) => (x.id === id ? { ...x, status: "confirmed" } : x))
      );
      toast.success("Booking updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booking");
    }
  };

  return (
    <>
      <Toaster />
      <main className="min-h-screen bg-[#050816] text-white pt-24 pb-16">
        <section className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            My Bookings
          </h1>
          {loading && (
            <p className="text-sm text-[#9ca3af]">Loading bookings...</p>
          )}
          {!loading && bookings.length === 0 && (
            <p className="text-sm text-[#9ca3af]">
              You have no bookings yet.
            </p>
          )}

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
                    <h3 className="text-sm font-semibold">{b.title}</h3>
                    <p className="text-[11px] text-[#9ca3af]">
                      {b.category}
                    </p>
                    <p className="text-xs text-[#ffcf6a] mt-1">
                      Status:{" "}
                      <span className="font-semibold">
                        {b.status || "pending"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex gap-2 justify-end">
                  <button
                    onClick={() => handleMarkConfirmed(b.id)}
                    className="px-3 py-1 rounded-full text-[11px] bg-emerald-500 text-black hover:bg-emerald-400"
                  >
                    Mark Confirmed
                  </button>
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
