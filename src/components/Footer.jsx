"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const socials = [FaFacebookF, FaXTwitter, FaInstagram, FaPinterestP, FaLinkedinIn];

  return (
    <footer className="bg-[#0a0a0a] text-[#dadada] pt-0 pb-12">
      {/* PROMO SUBSCRIBE / OFFER BANNER */}
      <div className="w-full bg-gradient-to-r from-[#ff6a00] via-[#ff9f1a] to-[#ffd34d] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* TEXT SECTION */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              <span className="text-[#ffe75e]">30% Off</span> In June–July For{" "}
              <span className="text-white">Birthday Events</span>
            </h2>

            <p className="mt-3 text-lg text-[#4a2500] font-medium">
              Contact us now and we will make your event unique & unforgettable
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => (window.location.href = "/contact")}
            className="bg-white text-[#ff6a00] font-semibold px-10 py-4 rounded-full shadow-lg 
                       hover:shadow-xl hover:bg-[#fff8e6] transition text-sm tracking-wide"
          >
            MAKE AN EVENT NOW
          </button>
        </div>
      </div>

      {/* FOOTER CONTENT – 1 COLUMN, 4 ROWS */}
      <div className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 gap-10">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6a00] via-[#ff9f1a] to-[#ffd34d] flex items-center justify-center">
              <Image src="/img/mic.png" width={24} height={24} alt="Harmoni" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#dadada]">HARMONI</h1>
              <p className="text-xs text-[#ff9f1a] tracking-[0.3em]">
                EVENT MANAGEMENT
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm text-[#dadada] leading-relaxed">
            From intimate mehendi nights to grand weddings and corporate galas,
            Harmoni crafts immersive experiences with design, decor and detail.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#dadada]">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-[#dadada] hover:text-[#ff9f1a]">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-[#dadada] hover:text-[#ff9f1a]"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-[#dadada] hover:text-[#ff9f1a]"
              >
                Event Packages
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="text-[#dadada] hover:text-[#ff9f1a]"
              >
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Event Types */}
        <div>
          <h3 className="text-lg font-semibold text-[#ff9f1a]">Event Types</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              "Wedding & Holud",
              "Mehendi & Sangeet",
              "Corporate Events",
              "Birthday & Anniversary",
            ].map((item) => (
              <li
                key={item}
                className="text-[#dadada] hover:text-[#ff9f1a]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:text-right">
          <h3 className="text-lg font-semibold text-[#ff9f1a]">Contact Us</h3>

          <p className="text-sm text-[#dadada] mt-4">
            Mirpur, Dhaka, Bangladesh
          </p>
          <p className="text-sm text-[#dadada] mt-2">+880 1700-000000</p>

          <a
            href="mailto:info@harmoni.com"
            className="block text-sm mt-2 text-[#dadada] hover:text-[#ff9f1a]"
          >
            info@harmoni.com
          </a>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <hr className="mt-12 border-[#2f2f2f]" />

      <div className="max-w-7xl mx-auto px-4 mt-12 flex flex-col items-center text-center">
        {/* SOCIAL ICONS - BIGGER + NICER */}
        <div className="flex gap-6 justify-center text-2xl">
          {socials.map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="p-5 rounded-full bg-gradient-to-br from-[#ff6a00] via-[#ff9f1a] to-[#ffd34d]
                         text-white shadow-lg hover:brightness-110 hover:scale-110 transition-all duration-300"
            >
              <Icon size={26} />
            </a>
          ))}
        </div>

        {/* COPYRIGHT TEXT */}
        <p className="text-sm text-[#b5b5b5] mt-4">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#ff9f1a]">Harmoni Events</span> — All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
