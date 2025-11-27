// src/components/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  // initial theme (no setState inside effect)
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  // apply theme to <html> + localStorage
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/events", label: "EVENTS" },
    { href: "/blogs", label: "BLOGS" },
    { href: "/gallery", label: "GALLERY" },
    { href: "/products", label: "PACKAGES" },
    { href: "/booking", label: "OUR BOOKINGS" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* TOP */}
      <div className="w-full text-xs text-white py-2 bg-gradient-to-r from-orange-600 to-yellow-400">
        <div className="container mx-auto px-6 flex justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-envelope" /> info@harmoni.com
            </span>
            <span className="hidden md:flex items-center gap-2">
              <i className="fa-solid fa-phone" /> 100-2222-9999
            </span>
          </div>

          <button
            onClick={toggleTheme}
            className="bg-white/30 px-3 py-1 rounded text-sm text-white flex items-center gap-2"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* NAV */}
      <nav className="bg-white dark:bg-[#050816] border-b border-black/10 dark:border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6a00] via-[#ff9f1a] to-[#ffd34d] flex items-center justify-center">
                          <Image src="/img/mic.png" width={24} height={24} alt="Harmoni" />
                        </div>
            <div>
              <h1 className="text-lg font-bold text-orange-500 dark:text-white">
                EV<span className="text-orange-500 font-extrabold italic">EN</span>
                T-H<span className="text-orange-500 font-extrabold italic">U</span>B
              </h1>
              <p className="text-[8px] tracking-[.2em] text-orange-300 italic">
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
                  className="group relative font-medium text-gray-800 dark:text-gray-200 hover:text-orange-500"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-500 group-hover:w-full transition-all" />
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT */}
          {session ? (
            <div className="relative group hidden md:block">
              <button className="flex items-center gap-2">
                <Image
                  src={session.user.image || "/img/mic.png"}
                  width={32}
                  height={32}
                  className="rounded-full"
                  alt="user"
                />
                <span className="text-sm text-gray-800 dark:text-gray-100">
                  {session.user.name || session.user.email}
                </span>
              </button>

              {/* DROPDOWN */}
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#111] shadow-md rounded-md overflow-hidden hidden group-hover:block">
                <div className="px-4 py-2 border-b border-gray-200/50 dark:border-gray-700/50 text-xs text-gray-500 dark:text-gray-400">
                  Signed in as
                  <div className="font-medium text-gray-800 dark:text-gray-100">
                    {session.user.email}
                  </div>
                </div>
                <Link
                  href="/products/add"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Add Product
                </Link>
                <Link
                  href="/products/manage"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Manage Products
                </Link>
                <Link
                  href="/booking"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Our Bookings
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link
                href="/login"
                className="px-4 py-1.5 rounded bg-orange-500 text-white text-sm hover:bg-orange-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 rounded bg-gray-800 text-white text-sm hover:bg-gray-900"
              >
                Register
              </Link>
            </div>
          )}

          {/* MOBILE HAMBURGER */}
          <button className="md:hidden" onClick={() => setOpen((o) => !o)}>
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
                onClick={() => setOpen(false)}
                className="text-lg text-gray-900 dark:text-gray-200"
              >
                {item.label}
              </Link>
            ))}

            {!session ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded bg-orange-500 text-white text-center"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded bg-gray-800 text-white text-center"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setOpen(false);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
