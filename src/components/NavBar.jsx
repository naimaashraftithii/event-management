"use client";

import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { logout } from "../lib/firebase";

export default function Navbar() {
  const { user, initializing } = useAuth();

  return (
    <header className="border-b bg-base-100 sticky top-0 z-10">
      <nav className="navbar container mx-auto">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            EventManager
          </Link>
        </div>

        <div className="flex-none gap-2">
          <Link href="/events" className="btn btn-ghost">
            Events
          </Link>
          <Link href="/events/create" className="btn btn-primary">
            Create
          </Link>

          {/* Right side: Login / User menu */}
          {initializing ? (
            <div className="loading loading-spinner loading-sm" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost flex items-center gap-2">
                {user.photoURL && (
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={user.photoURL} alt={user.displayName || "User"} />
                    </div>
                  </div>
                )}
                <span className="hidden sm:inline">
                  {user.displayName || user.email}
                </span>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/events/create">Add Event</Link>
                </li>
                <li>
                  <Link href="/events">Manage Events</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="btn btn-ghost">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
