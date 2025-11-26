"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/ZRqZQk5L/80c6d231ca6e3d293fb30a2b9a91b62a.jpg",
    eyebrow: "One Stop",
    title: "Event Planner",
    subtitle: "Every event should be perfect",
    primaryLabel: "ABOUT US",
    primaryHref: "/about",
    secondaryLabel: "GET STARTED",
    secondaryHref: "/products",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/xqpD7TRq/005e726a4319433a866923b0cc742e8d.jpg",
    eyebrow: "Make Your Day",
    title: "Unforgettable Moments",
    subtitle: "From mehendi nights to grand weddings & corporate galas",
    primaryLabel: "VIEW PACKAGES",
    primaryHref: "/products",
    secondaryLabel: "BOOK A CALL",
    secondaryHref: "/contact",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/DmV98md/d9e6bf8672a4ab16c45bf49c9705c9a3.jpg",
    eyebrow: "Designed For You",
    title: "Luxury Event Experience",
    subtitle: "We handle decor, lighting, sound and full event production",
    primaryLabel: "OUR SERVICES",
    primaryHref: "/events",
    secondaryLabel: "CONTACT US",
    secondaryHref: "/contact",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const goPrev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // auto-slide
  useEffect(() => {
    const id = setInterval(goNext, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

          {/* Content */}
          <div className="relative h-full max-w-6xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center text-white">
            <p className="text-lg md:text-2xl tracking-[0.2em] uppercase text-[#ffcf6a] mb-3">
              {slide.eyebrow}
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-3">
              {slide.title}
            </h1>

            <p className="max-w-2xl text-sm md:text-base tracking-[0.25em] uppercase text-[#f5f5f5] mb-8">
              {slide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={slide.primaryHref}
                className="px-8 py-3 rounded-full bg-[#ff6a00] hover:bg-[#ff7a00] text-white text-sm font-semibold shadow-lg shadow-black/40 transition-transform duration-200 hover:-translate-y-0.5"
              >
                {slide.primaryLabel}
              </Link>

              <Link
                href={slide.secondaryHref}
                className="px-8 py-3 rounded-full border border-[#ffcf6a] text-[#ffcf6a] text-sm font-semibold bg-white/5 hover:bg-white/10 shadow-lg shadow-black/40 transition-transform duration-200 hover:-translate-y-0.5"
              >
                {slide.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={goNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 text-white">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => setIndex(i)}
            className="flex flex-col items-center gap-1"
          >
            <span
              className={`text-sm font-semibold ${
                i === index ? "text-white" : "text-white/60"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`h-[2px] w-10 rounded-full transition-all ${
                i === index ? "bg-[#ffcc4a]" : "bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
