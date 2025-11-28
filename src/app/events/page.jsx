// src/app/events/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Swal from "sweetalert2";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);

  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {
    async function loadEvents() {
      try {
        const snap = await getDocs(collection(db, "products"));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setEvents(list);
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const handleBook = async (event) => {

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
      setBookingId(event.id);

      await addDoc(collection(db, "bookings"), {
        productId: event.id,
        title: event.title,
        category: event.category || "",
        price: event.price || "",
        currency: event.currency || "BDT",
        imageUrl: event.imageUrl || "",
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
    } catch (err) {
      console.error("Failed to create booking:", err);
      await Swal.fire({
        icon: "error",
        title: "Booking failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setBookingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white pt-24 pb-16">
      <section className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <p className="text-xs tracking-[0.25em] uppercase text-[#ff9f1a]">
            Our Events
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[#f9fafb]">
            Explore All <span className="text-[#ff9f1a]">Event Packages</span>
          </h1>
          <p className="mt-3 text-sm text-[#9ca3af] max-w-2xl">
            Choose from weddings, holud, birthdays, BBQ nights, corporate
            events and more. Click{" "}
            <span className="text-[#ffcf6a] font-medium">Book Now</span> to
            create a booking with your account.
          </p>

          <div className="mt-4 text-xs text-[#9ca3af]">
            {session ? (
              <span>
                Signed in as{" "}
                <span className="text-[#ffcf6a] font-medium">
                  {session.user.email}
                </span>
                . See your bookings under{" "}
                <Link
                  href="/booking"
                  className="text-[#ff9f1a] hover:text-[#ffcf6a]"
                >
                  Our Bookings
                </Link>
                .
              </span>
            ) : (
              <span>
                You are browsing as guest.{" "}
                <Link
                  href="/login"
                  className="text-[#ff9f1a] hover:text-[#ffcf6a]"
                >
                  Login
                </Link>{" "}
                to book packages.
              </span>
            )}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <p className="text-center text-sm text-[#9ca3af]">
            Loading events...
          </p>
        )}

        {/* Empty state */}
        {!loading && events.length === 0 && (
          <p className="text-center text-sm text-[#9ca3af]">
            No events found. Please seed products or add new ones.
          </p>
        )}

        {/* Events grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#050816] shadow-md shadow-black/40 hover:-translate-y-1 hover:border-[#ff9f1a]/80 transition-all"
            >
              <div className="relative h-44 w-full overflow-hidden bg-black">
                <div
                  className="h-full w-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundImage: `url(${ev.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                {ev.category && (
                  <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#ffcf6a]">
                    {ev.category}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4 gap-2">
                <h3 className="text-sm font-semibold text-[#f9fafb] line-clamp-1">
                  {ev.title}
                </h3>
                {ev.subtitle && (
                  <p className="text-[11px] text-[#9ca3af] line-clamp-2">
                    {ev.subtitle}
                  </p>
                )}
                {ev.price && (
                  <p className="mt-1 text-sm font-semibold text-[#ff9f1a]">
                    {ev.price}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between gap-2">
                  <Link
                    href={`/products/${ev.id}`}
                    className="text-[11px] text-[#9ca3af] hover:text-[#ffcf6a] underline-offset-4 hover:underline"
                  >
                    View details
                  </Link>

                  <button
                    onClick={() => handleBook(ev)}
                    disabled={bookingId === ev.id}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff6a00] via-[#ff9f1a] to-[#ffd34d] px-4 py-1.5 text-[11px] font-semibold text-black shadow-md shadow-black/40 hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {bookingId === ev.id ? "Booking..." : "Book Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
