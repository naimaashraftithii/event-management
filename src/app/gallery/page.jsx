"use client";

import { useState, useEffect } from "react";

const galleryItems = [
  // FESTIVAL / EID / IFTAR / NEW YEAR
  {
    id: "g1",
    title: "Eid Night Celebration",
    category: "festival",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/dwpbL5wY/fef77a4198b9c2085aebeea9bc0c1829.jpg",
  },
  {
    id: "g2",
    title: "City Ifter Party Setup",
    category: "ifter",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/ZpfQmMWR/ifterparty.jpg",
  },
  {
    id: "g3",
    title: "Family Ifter Gathering",
    category: "ifter",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/5xLpTb8m/family-gettogether3.jpg",
  },
  {
    id: "g4",
    title: "New Year Countdown Stage",
    category: "newyear",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/ZRqZQk5L/80c6d231ca6e3d293fb30a2b9a91b62a.jpg",
  },

  // WEDDING / PROPOSAL / ANNIVERSARY
  {
    id: "g5",
    title: "Grand Wedding Entrance",
    category: "wedding",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/20T9C0j9/b5fd954eb30c371dddc40a449bfa5e1d.jpg",
  },
  {
    id: "g6",
    title: "Classic Wedding Stage",
    category: "wedding",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/DfqX7pmx/d3f25adce4a8d1fc03d4570a5b342edd.jpg",
  },
  {
    id: "g7",
    title: "Romantic Rooftop Proposal",
    category: "proposal",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/xqN0Znr0/0a4e94a8db0682969e28d8b0f7297766.jpg",
  },
  {
    id: "g8",
    title: "Candlelight Anniversary Dinner",
    category: "proposal",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/qLL0crwf/date-night.jpg",
  },

  // BBQ / BONFIRE / CAMPING
  {
    id: "g9",
    title: "BBQ Party Vibes",
    category: "bbq",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/SDXTF0mm/BBQ-party.jpg",
  },
  {
    id: "g10",
    title: "Bonfire Under The Stars",
    category: "bonfire",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/Z6fF3fCp/61024164889c059993a24eaa3eb00ebb.jpg",
  },
  {
    id: "g11",
    title: "Camping Night With Friends",
    category: "camping",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/5XCf3sVN/campinenight.jpg",
  },

  // CORPORATE / MUSIC / SPORTS
  {
    id: "g12",
    title: "Corporate Collaboration Night",
    category: "corporate",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/cK5mSzgg/3ebbd098db0efd8be5c0c55438e8ee79.jpg",
  },
  {
    id: "g13",
    title: "Conference Hall Setup",
    category: "corporate",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/zhj6Tbvk/conference.jpg",
  },
  {
    id: "g14",
    title: "Outdoor Music Concert",
    category: "music",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/RTxSfBRG/8dc706c090205963f0450175fe8ec6e8.jpg",
  },
  {
    id: "g15",
    title: "Stadium Sports Event",
    category: "sports",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/zVzkpZgf/sports.jpg",
  },

  // FAMILY / ARTS
  {
    id: "g16",
    title: "Family Day Out",
    category: "family",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/6RmpcbKD/family-gettogether1.jpg",
  },
  {
    id: "g17",
    title: "Creative Arts Festival",
    category: "arts",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/6RfKS2QS/arts.jpg",
  },
  {
    id: "g18",
    title: "Live Painting Corner",
    category: "arts",
    type: "photo",
    imageUrl: "https://i.ibb.co.com/HDxXK2jp/arts2.jpg",
  },
];

const tabs = [
  { id: "all", label: "All Gallery" },
  { id: "festival", label: "Festival & Celebrations" },
  { id: "wedding", label: "Wedding & Proposal" },
  { id: "corporate", label: "Corporate & Music" },
];

const featuredSlides = [
  {
    id: "s1",
    title: "City New Year Celebration",
    subtitle: "Fireworks, countdown & full stage lighting",
    imageUrl: "https://i.ibb.co.com/ZRqZQk5L/80c6d231ca6e3d293fb30a2b9a91b62a.jpg",
  },
  {
    id: "s2",
    title: "Romantic Candlelight Setup",
    subtitle: "Private dinner with warm ambient décor",
    imageUrl: "https://i.ibb.co.com/qLL0crwf/date-night.jpg",
  },
  {
    id: "s3",
    title: "Corporate Conference Night",
    subtitle: "Stage, projection and branded backdrop",
    imageUrl: "https://i.ibb.co.com/zhj6Tbvk/conference.jpg",
  },
  {
    id: "s4",
    title: "BBQ & Bonfire Gathering",
    subtitle: "Food, music and cozy camp vibes",
    imageUrl: "https://i.ibb.co.com/SDXTF0mm/BBQ-party.jpg",
  },
];

export default function GalleryPage() {
  const [active, setActive] = useState("all");
  const [slideIndex, setSlideIndex] = useState(0);

  // auto-slide
  useEffect(() => {
    const id = setInterval(
      () => setSlideIndex((prev) => (prev + 1) % featuredSlides.length),
      6000
    );
    return () => clearInterval(id);
  }, []);

  const filtered =
    active === "all"
      ? galleryItems
      : galleryItems.filter((item) => {
          if (active === "festival") {
            return ["festival", "ifter", "newyear"].includes(item.category);
          }
          if (active === "wedding") {
            return ["wedding", "proposal"].includes(item.category);
          }
          if (active === "corporate") {
            return ["corporate", "music"].includes(item.category);
          }
          return true;
        });

  const currentSlide = featuredSlides[slideIndex];

  return (
    <main className="min-h-screen bg-[#050816] text-white pt-20 pb-16">
      {/* TOP BANNER */}
      <section className="w-full bg-gradient-to-b from-[#1f2933] via-[#111827] to-[#050816] py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-[#ff9f1a]">
            Event Gallery
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#f3f4f6]">
            Harmoni <span className="text-[#ff9f1a]">Gallery</span>
          </h1>
          <p className="mt-2 text-sm text-[#d1d5db] max-w-2xl mx-auto">
            A visual look at our favourite weddings, festivals, corporate
            nights, BBQ parties and family celebrations.
          </p>

          <div className="mt-4 flex justify-center gap-3 text-xs text-[#9ca3af]">
            <span className="hover:text-[#ff9f1a] cursor-pointer">Home</span>
            <span>|</span>
            <span className="text-[#f9fafb]">Harmoni Gallery</span>
          </div>
        </div>
      </section>

      {/* FILTER TAB */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-4 py-2 text-xs md:text-sm rounded-full border ${
                active === tab.id
                  ? "bg-[#ff9f1a] border-[#ff9f1a] text-black"
                  : "border-white/15 text-[#e5e7eb] hover:border-[#ff9f1a] hover:text-[#ff9f1a]"
              } transition`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid*/}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative h-52 md:h-60 overflow-hidden rounded-2xl bg-black group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

              <div className="relative z-10 flex h-full flex-col justify-end p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#ffcf6a]">
                  {item.category}
                </p>
                <h3 className="text-sm font-semibold text-white line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>


        {/* FEATURED SLIDER */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm md:text-base font-semibold text-[#e5e7eb]">
              Featured moments from our events
            </h2>
            <p className="text-[11px] text-[#9ca3af]">
              Auto sliding • use arrows to browse
            </p>
          </div>

          <div className="relative h-56 md:h-64 overflow-hidden rounded-2xl bg-black">
            {/* slides */}
            {featuredSlides.map((slide, i) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  i === slideIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-10 max-w-lg">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#ffcf6a]">
                    Highlighted Event
                  </p>
                  <h3 className="mt-1 text-lg md:text-2xl font-bold text-white">
                    {slide.title}
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-[#e5e7eb]">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            ))}

            {/* arrows */}
            <button
              onClick={() =>
                setSlideIndex(
                  (prev) => (prev - 1 + featuredSlides.length) % featuredSlides.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center text-sm backdrop-blur-sm transition"
            >
              ‹
            </button>
            <button
              onClick={() =>
                setSlideIndex((prev) => (prev + 1) % featuredSlides.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center text-sm backdrop-blur-sm transition"
            >
              ›
            </button>

            {/* dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {featuredSlides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => setSlideIndex(i)}
                  className={`h-2 w-2 rounded-full ${
                    i === slideIndex ? "bg-[#ff9f1a]" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
