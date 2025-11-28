"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const speakers = [
  {
    id: 1,
    name: "Denise Suarez",
    title: "Lead Event Consultant",
    experience: "15 years experience",
    imageUrl: "https://i.ibb.co.com/BKLn4J43/a2b85c18c83b53565a40d74539c14c16.jpg",
    description:
      "Specialist in corporate galas, conferences and large-scale brand activations with a focus on guest experience.",
  },
  {
    id: 2,
    name: "Jonathan Doe",
    title: "Wedding & Social Events Planner",
    experience: "10 years experience",
    imageUrl: "https://i.ibb.co.com/xqN0Znr0/0a4e94a8db0682969e28d8b0f7297766.jpg",
    description:
      "Designs dreamy holud, mehendi and wedding receptions with detailed decor, lighting and flow management.",
  },
  {
    id: 3,
    name: "Jenni Berthas",
    title: "Creative Experience Designer",
    experience: "8 years experience",
    imageUrl: "https://i.ibb.co.com/JWZjpV2r/3ef3e78f7998e8b2e457667b6a92862c.jpg",
    description:
      "Loves colourful birthdays, festivals and themed nights. Balances aesthetics with smooth guest journeys.",
  },
  {
    id: 4,
    name: "Denise Suarez",
    title: "Lead Event Consultant",
    experience: "15 years experience",
    imageUrl: "https://i.ibb.co.com/BKLn4J43/a2b85c18c83b53565a40d74539c14c16.jpg",
    description:
      "Specialist in corporate galas, conferences and large-scale brand activations with a focus on guest experience.",
  },
];

export default function SpeakersSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = speakers[activeIndex];


  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % speakers.length);
    }, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  const goPrev = () =>
    setActiveIndex((prev) => (prev === 0 ? speakers.length - 1 : prev - 1));

  const goNext = () =>
    setActiveIndex((prev) => (prev + 1) % speakers.length);

  return (
    <section className="bg-[#f9fafb]">
      {/* TOP   */}
      <div className="bg-gradient-to-r from-[#ff6a00] via-[#ff9f1a] to-[#ffd34d] py-10">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <p className="text-xs tracking-[0.25em] uppercase">
            Are You Ready?
          </p>
          <h3 className="mt-2 text-xl md:text-2xl font-semibold">
            Are You Ready To Make Your Own Special Events?
          </h3>
          <p className="mt-2 text-xs md:text-sm text-white/90">
            Get started now – our team will help you plan, design and manage
            your next event from concept to curtain call.
          </p>

          <button className="mt-5 inline-flex items-center rounded-full bg-white px-7 py-2.5 text-xs font-semibold text-[#ff6a00] shadow-md shadow-black/20 hover:bg-[#fff5e6] transition">
            BOOK A FREE CONSULTATION
          </button>
        </div>
      </div>

      {/*BOTTOM*/}
      <div className="relative overflow-hidden">
        {/* background  */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url(https://i.ibb.co.com/vxsDM83X/conference2.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-white/70" />

        <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">
          {/* Left */}
          <div className="w-full md:w-[38%] flex justify-center">
            <div className="relative overflow-hidden rounded-[3rem] shadow-xl shadow-black/15 bg-white">
              <img
                key={active.id} 
                src={active.imageUrl}
                alt={active.name}
                className="h-[360px] w-auto object-cover md:h-[420px] transform transition duration-500 ease-out hover:scale-105 hover:opacity-95"
              />
            </div>
          </div>

          {/* Right*/}
          <div className="w-full md:w-[62%] text-center md:text-left transition-opacity duration-500 ease-out">
            <p className="text-xs tracking-[0.25em] uppercase text-[#9ca3af]">
              Harmoni Staffs
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#111827]">
              Professional{" "}
              <span className="text-[#ff6a00]">
                Speakers
              </span>
            </h2>

            <div className="mt-4 flex flex-col gap-1 text-sm text-[#4b5563] md:flex-row md:items-center md:gap-3">
              <span className="font-semibold text-[#111827]">
                {active.name}
              </span>
              <span className="hidden text-[#9ca3af] md:inline">|</span>
              <span>{active.experience}</span>
            </div>

            <p className="mt-4 text-sm text-[#4b5563] leading-relaxed max-w-xl">
              {active.description}
            </p>

            {/* social */}
            <div className="mt-5 flex justify-center md:justify-start gap-3 text-xs text-[#6b7280]">
              <span className="uppercase tracking-[0.2em] text-[#9ca3af]">
                Social
              </span>
              <div className="flex gap-2">
                <button
                  className="w-8 h-8 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[12px] text-[#6b7280] bg-white/70 hover:bg-[#ff6a00] hover:border-[#ff6a00] hover:text-white transition"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </button>
                <button
                  className="w-8 h-8 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[12px] text-[#6b7280] bg-white/70 hover:bg-[#ff6a00] hover:border-[#ff6a00] hover:text-white transition"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </button>
                <button
                  className="w-8 h-8 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[12px] text-[#6b7280] bg-white/70 hover:bg-[#ff6a00] hover:border-[#ff6a00] hover:text-white transition"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </button>
                <button
                  className="w-8 h-8 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[12px] text-[#6b7280] bg-white/70 hover:bg-[#ff6a00] hover:border-[#ff6a00] hover:text-white transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </button>
              </div>
            </div>

            {/* bottom small cards  */}
            <div className="mt-8">
              <div className="flex items-center justify-center md:justify-start gap-3">
                {/* prev arrow */}
                <button
                  onClick={goPrev}
                  className="hidden sm:flex w-8 h-8 rounded-full border border-[#e5e7eb] bg-white text-[#6b7280] items-center justify-center hover:border-[#ff6a00] hover:text-[#ff6a00] transition"
                  aria-label="Previous speaker"
                >
                  ‹
                </button>

                {/* cards wrapper */}
                <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent py-1">
                  {speakers.map((sp, index) => (
                    <button
                      key={sp.id}
                      onClick={() => setActiveIndex(index)}
                      className={`flex min-w-[180px] items-center gap-3 rounded-2xl border px-3 py-2 text-left transition-all duration-200 ${
                        index === activeIndex
                          ? "border-[#ff6a00] bg-[#ff6a00] text-white shadow-md shadow-[#ff6a00]/40"
                          : "border-[#e5e7eb] text-black bg-orange-200 hover:border-[#ff6a00]/70 hover:bg-[#fff7ec] hover:shadow-sm"
                      }`}
                    >
                      <img
                        src={sp.imageUrl}
                        alt={sp.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold">{sp.name}</p>
                        <p className="text-[10px] opacity-80">
                          Harmoni Speaker
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* next arrow */}
                <button
                  onClick={goNext}
                  className="hidden sm:flex w-8 h-8 rounded-full border border-[#e5e7eb] bg-white text-[#6b7280] items-center justify-center hover:border-[#ff6a00] hover:text-[#ff6a00] transition"
                  aria-label="Next speaker"
                >
                  ›
                </button>
              </div>

              {/* dots cards */}
              <div className="mt-4 flex justify-center md:justify-start gap-2">
                {speakers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === activeIndex
                        ? "w-4 bg-[#ff6a00]"
                        : "bg-[rgb(158,164,174)] hover:bg-[#ffcf6a]"
                    }`}
                    aria-label={`Go to speaker ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}
