"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // সার্ভার + প্রথম client render একই থাকবে
  const [theme, setTheme] = useState("dark");

  // 1) প্রথমে localStorage থেকে theme পড়ি
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem("theme");
    const initial =
      saved === "light" || saved === "dark" ? saved : "dark";

    if (initial !== theme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(initial);
    }
  }, []); // ইচ্ছা করে dependency [] রেখেছি

  // 2) theme বদলালেই <html> এ class আর localStorage আপডেট
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/events", label: "EVENTS" },
    { href: "/blogs", label: "BLOGS" },
    { href: "/gallery", label: "GALLERY" },
    { href: "/booking", label: "OUR BOOKINGS" },
    { href: "/products", label: "PACKAGES" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* TOP CONTACT BAR */}
      <div className="w-full text-xs text-white py-2 bg-linear-to-r from-[#ff6a00] via-[#ff9f1a] to-[#ffd34d]">
        <div className="max-w-7xl container px-6 flex justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-envelope" /> info@harmoni.com
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-2">
              <i className="fa-solid fa-phone" /> 100-2222-9999
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="bg-[#ffffff40] px-3 py-1 rounded-md text-[#ffffff] flex items-center gap-2 hover:bg-[#ffffff70] transition"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="bg-white dark:bg-[#050816] border-b border-black/10 dark:border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#ff6a00] via-[#ff3b7f] to-[#ff1744] flex items-center justify-center">
              <Image src="/img/mic.png" width={22} height={22} alt="logo" />
            </div>
            <div>
              <h1 className="text-lg text-[#ff9f1a] font-bold dark:text-white">
                HARMONI
              </h1>
              <p className="text-[10px] tracking-[.2em] text-[#ff9f1a]">
                EVENT MANAGEMENT
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-10 mx-auto">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative font-medium text-gray-800 dark:text-gray-200 hover:text-[#ff9f1a] transition"
                >
                  {item.label}
                  <span
                    className="
                      absolute left-0 -bottom-1 w-0 h-[2px]
                      bg-linear-to-r from-[#ff6a00] to-[#ff3b7f]
                      group-hover:w-full transition-all
                    "
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-black dark:text-white"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-white dark:bg-[#050816]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-900 dark:text-gray-200 text-lg hover:text-[#ff6a00]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="mt-2 w-full bg-linear-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] text-white py-2 rounded-md"
            >
              {theme === "dark"
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
