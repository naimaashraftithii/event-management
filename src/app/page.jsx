// src/app/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import SpeakersSection from "@/components/SpeakersSection";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";

// --- GALLERY DATA (home preview only) ---
const galleryItems = [
  {
    id: "g1",
    title: "Eid Celebration Night",
    category: "Festival",
    imageUrl: "https://i.ibb.co.com/dwpbL5wY/fef77a4198b9c2085aebeea9bc0c1829.jpg",
  },
  {
    id: "g2",
    title: "Fireworks & Fanush",
    category: "New Year",
    imageUrl: "https://i.ibb.co.com/fVQ5v69h/7dec2f45357ae33a8a4487f374d60583.jpg",
  },
  {
    id: "g3",
    title: "Elegant Wedding Entry",
    category: "Wedding",
    imageUrl: "https://i.ibb.co.com/20T9C0j9/b5fd954eb30c371dddc40a449bfa5e1d.jpg",
  },
  {
    id: "g4",
    title: "Romantic Proposal Night",
    category: "Proposal",
    imageUrl: "https://i.ibb.co.com/xqN0Znr0/0a4e94a8db0682969e28d8b0f7297766.jpg",
  },
  {
    id: "g5",
    title: "Corporate Collaboration Meetup",
    category: "Corporate",
    imageUrl: "https://i.ibb.co.com/tTzDzw6h/office2.jpg",
  },
  {
    id: "g6",
    title: "BBQ & Bonfire Party",
    category: "BBQ Party",
    imageUrl: "https://i.ibb.co.com/SDXTF0mm/BBQ-party.jpg",
  },
  {
    id: "g7",
    title: "Family Get Together",
    category: "Family",
    imageUrl: "https://i.ibb.co.com/5xLpTb8m/family-gettogether3.jpg",
  },
  {
    id: "g8",
    title: "Music Night Concert",
    category: "Music Concert",
    imageUrl: "https://i.ibb.co.com/VY5fFt4C/4fd6b25bf67b1eec8b0b6db772e3ddc7.jpg",
  },
];

// group items into slides of 3 cards
const gallerySlides = [
  galleryItems.slice(0, 3),
  galleryItems.slice(3, 6),
  galleryItems.slice(6, 9),
].filter((s) => s.length > 0);

export default function HomePage() {
  const [highlighted, setHighlighted] = useState([]);
  const [loading, setLoading] = useState(true);

  const [galleryIndex, setGalleryIndex] = useState(0);

  const goPrevGallery = () =>
    setGalleryIndex((prev) =>
      prev === 0 ? gallerySlides.length - 1 : prev - 1
    );

  const goNextGallery = () =>
    setGalleryIndex((prev) => (prev + 1) % gallerySlides.length);

  // Fetch 6 products from Firestore for “Our Events”
  useEffect(() => {
    async function load() {
      try {
        const q = query(collection(db, "products"), limit(6));
        const snap = await getDocs(q);
        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHighlighted(list);
      } catch (err) {
        console.error("Failed to load highlighted events:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#050816] text-white pt-16">
      {/* HERO SLIDER */}
      <HeroSlider />

      {/* OUR EVENTS SECTION (from DB) */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr,2fr] items-start">
          {/* LEFT SIDE TEXT */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#ff9f1a]">
              Our Events
            </p>

            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#dadada]">
              We design every event to feel personal, stylish & stress-free.
            </h2>

            <p className="mt-3 text-sm text-[#b3b3b3] leading-relaxed">
              From holud and weddings to birthdays, iftar nights, and corporate
              galas — we offer ready-made decoration packages as well as full
              custom event planning support. Choose the perfect package based on
              your location, budget, and desired vibe.
            </p>
          </div>

          {/* RIGHT SIDE – 6 EVENT CARDS */}
          <div className="grid gap-5 sm:grid-cols-2">
            {loading && (
              <p className="text-sm text-[#b3b3b3]">Loading events...</p>
            )}

            {!loading &&
              highlighted.map((ev) => (
                <Link
                  key={ev.id}
                  href={`/products/${ev.id}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#050816]
                             shadow-md shadow-black/40 hover:-translate-y-1 hover:border-[#ff9f1a]
                             hover:shadow-lg hover:shadow-black/60 transition-all duration-300"
                >
                  <div className="h-40 w-full overflow-hidden bg-black">
                    <div
                      className="h-full w-full bg-cover bg-center opacity-80 group-hover:opacity-100
                                 group-hover:scale-110 transition-transform duration-500 ease-out"
                      style={{ backgroundImage: `url(${ev.imageUrl})` }}
                    />
                  </div>

                  <div className="p-4 flex flex-col gap-1">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#9ca3af]">
                      {ev.category}
                    </p>
                    <h3 className="text-sm font-semibold text-[#dadada] line-clamp-1">
                      {ev.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-[#ff9f1a]">
                      {ev.price?.toLocaleString()} {ev.currency}
                    </p>

                    <span className="mt-2 text-[11px] text-[#b3b3b3] group-hover:text-[#ffcf6a] transition-colors">
                      View details →
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* HOME GALLERY PREVIEW (CAROUSEL) */}
      <section className="bg-[#050816] border-t border-white/5 py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#ff9f1a]">
                Harmoni Gallery
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#dadada]">
                Beautiful &amp; Unforgettable Times
              </h2>
              <p className="mt-2 text-sm text-[#b3b3b3] max-w-xl">
                A quick glimpse into the weddings, festivals, corporate nights
                and cozy parties we’ve curated. See how each event gets its own
                unique story, lighting and mood.
              </p>
            </div>

            {/* connects to /gallery page */}
            <Link
              href="/gallery"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-[#ff6a00] via-[#ff9f1a] to-[#ffd34d]
                         px-6 py-2.5 text-xs font-semibold text-black shadow-lg shadow-black/40
                         hover:brightness-110 transition"
            >
              View full gallery
              <span className="ml-2 text-base">→</span>
            </Link>
          </div>

          {/* Carousel wrapper */}
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/30">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
              >
                {gallerySlides.map((slide, slideIdx) => (
                  <div
                    key={slideIdx}
                    className="min-w-full grid gap-4 md:grid-cols-3 p-4 md:p-6"
                  >
                    {slide.map((item) => (
                      <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-2xl bg-black/60
                                   hover:shadow-lg hover:shadow-black/70 transition-shadow duration-300"
                      >
                        <div
                          className="h-48 md:h-52 w-full bg-cover bg-center opacity-80
                                     group-hover:opacity-100 group-hover:scale-110
                                     transition-transform duration-500 ease-out"
                          style={{ backgroundImage: `url(${item.imageUrl})` }}
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                                     opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div
                          className="absolute bottom-3 left-3 right-3 transform translate-y-2 opacity-0
                                     group-hover:translate-y-0 group-hover:opacity-100
                                     transition-all duration-300"
                        >
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#ffcf6a]">
                            {item.category}
                          </p>
                          <h3 className="text-sm font-semibold text-white line-clamp-1">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Nav arrows */}
            <button
              onClick={goPrevGallery}
              className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex w-9 h-9 rounded-full
                         bg-black/60 hover:bg-black/80 text-white items-center justify-center
                         shadow-lg shadow-black/40 transition"
              aria-label="Previous gallery slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNextGallery}
              className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex w-9 h-9 rounded-full
                         bg-black/60 hover:bg-black/80 text-white items-center justify-center
                         shadow-lg shadow-black/40 transition"
              aria-label="Next gallery slide"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="mt-4 flex justify-center gap-2">
              {gallerySlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === galleryIndex
                      ? "w-4 bg-[#ffcf6a]"
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
<section className="bg-[#f5f5f5] py-16">
  <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
    <p className="text-xs tracking-[0.25em] uppercase text-[#ff6a00]">
      Our Services
    </p>
    <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#111827]">
      Harmoni Expertise
    </h2>
    <p className="mt-2 text-sm text-[#4b5563] max-w-2xl mx-auto">
      From business meetings to dreamy weddings and joyful birthdays, we
      handle the planning, decor, lighting and coordination so you can
      fully enjoy the moment.
    </p>

    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {/* Service 1 */}
      <div className="group overflow-hidden rounded-3xl bg-white shadow-md shadow-black/10
                      hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20
                      transition-all duration-300">
        <div
          className="h-52 bg-cover bg-center opacity-80 group-hover:opacity-100
                     transform group-hover:scale-105 transition-all duration-500"
          style={{
            backgroundImage: "url(https://i.ibb.co.com/tTzDzw6h/office2.jpg)",
          }}
        />
        <div className="p-5">
          <h3 className="text-sm font-semibold text-[#111827]">
            Business Meeting
          </h3>
          <p className="mt-1 text-xs text-[#6b7280]">
            Starting from 20,000 BDT – minimal, branded setups for
            presentations, seminars and workshops.
          </p>
        </div>
      </div>

      {/* Service 2 */}
      <div className="group overflow-hidden rounded-3xl bg-white shadow-md shadow-black/10
                      hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20
                      transition-all duration-300">
        <div
          className="h-52 bg-cover bg-center opacity-80 group-hover:opacity-100
                     transform group-hover:scale-105 transition-all duration-500"
          style={{
            backgroundImage:
              "url(https://i.ibb.co.com/20T9C0j9/b5fd954eb30c371dddc40a449bfa5e1d.jpg)",
          }}
        />
        <div className="p-5">
          <h3 className="text-sm font-semibold text-[#111827]">
            Wedding Party
          </h3>
          <p className="mt-1 text-xs text-[#6b7280]">
            Starting from 55,000 BDT – stage, entrance, walkway and full
            wedding ambience styling.
          </p>
        </div>
      </div>

      {/* Service 3 */}
      <div className="group overflow-hidden rounded-3xl bg-white shadow-md shadow-black/10
                      hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20
                      transition-all duration-300">
        <div
          className="h-52 bg-cover bg-center opacity-80 group-hover:opacity-100
                     transform group-hover:scale-105 transition-all duration-500"
          style={{
            backgroundImage:
              "url(https://i.ibb.co.com/JWZjpV2r/3ef3e78f7998e8b2e457667b6a92862c.jpg)",
          }}
        />
        <div className="p-5">
          <h3 className="text-sm font-semibold text-[#111827]">
            Birthday Party
          </h3>
          <p className="mt-1 text-xs text-[#6b7280]">
            Starting from 15,000 BDT – theme backdrop, balloons, cake
            table and fun photo corner.
          </p>
        </div>
      </div>
    </div>

    <div className="mt-8">
      <Link
        href="/products"
        className="inline-flex items-center rounded-full border border-[#ff6a00]
                   px-6 py-2.5 text-xs font-semibold text-[#ff6a00]
                   hover:bg-[#ff6a00] hover:text-white transition"
      >
        Explore packages
        <span className="ml-2 text-base">→</span>
      </Link>
    </div>
  </div>
</section>
 {/* NEW: Professional Speakers section */}
      <SpeakersSection />
    </main>
  );
}
