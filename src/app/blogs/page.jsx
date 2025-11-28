"use client";

import Link from "next/link";

const blogPosts = [
  {
    id: "b1",
    title: "Biggest Musical Night Experience",
    category: "Musical Event",
    date: "26 May 2025",
    time: "4:00 PM",
    imageUrl: "https://i.ibb.co.com/RTxSfBRG/8dc706c090205963f0450175fe8ec6e8.jpg",
    excerpt:
      "A high-energy concert with live band, lighting design and full crowd engagement from start to finish.",
  },
  {
    id: "b2",
    title: "Developers Conference in Dhaka",
    category: "Conference Event",
    date: "24 June 2025",
    time: "3:00 PM",
    imageUrl: "https://i.ibb.co.com/zhj6Tbvk/conference.jpg",
    excerpt:
      "From stage setup to high-end projection and branding, here’s how we styled a modern tech conference.",
  },
  {
    id: "b3",
    title: "Corporate BBQ Night & Team Bonding",
    category: "Corporate Event",
    date: "12 July 2025",
    time: "7:30 PM",
    imageUrl: "https://i.ibb.co.com/SDXTF0mm/BBQ-party.jpg",
    excerpt:
      "An informal BBQ night with warm lighting, live grill stations and relaxed team activities.",
  },
  {
    id: "b4",
    title: "New Year Celebration by the Bay",
    category: "Festival Event",
    date: "31 Dec 2025",
    time: "11:00 PM",
    imageUrl: "https://i.ibb.co.com/ZRqZQk5L/80c6d231ca6e3d293fb30a2b9a91b62a.jpg",
    excerpt:
      "Countdown, fireworks and a custom lighting rig that turned the venue into a celebration zone.",
  },
];

const recentQuestions = [
  "How to make a new event?",
  "What should I plan for a BBQ night?",
  "How to choose the right venue?",
  "What décor works for office conferences?",
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white pt-20 pb-16">
      {/* TOP BANNER */}
      <section className="w-full bg-gradient-to-b from-[#1f2933] via-[#111827] to-[#050816] py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-[#ff9f1a]">
            Our Blogs
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#f3f4f6]">
            Harmoni <span className="text-[#ff9f1a]">Latest Blogs</span>
          </h1>
          <p className="mt-2 text-sm text-[#d1d5db] max-w-2xl mx-auto">
            Event stories, planning tips and behind-the-scenes diaries from our
            favourite weddings, festivals, concerts and corporate events.
          </p>

          <div className="mt-4 flex justify-center gap-3 text-xs text-[#9ca3af]">
            <Link href="/" className="hover:text-[#ff9f1a]">
              Home
            </Link>
            <span>|</span>
            <span className="text-[#f9fafb]">Our Blogs</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10 grid gap-10 lg:grid-cols-[2fr,1fr]">
        {/* LEFT */}
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl bg-[#050816] border border-white/10 shadow-md shadow-black/40"
            >
              <div className="h-44 w-full overflow-hidden bg-black">
                <div
                  className="h-full w-full bg-cover bg-center hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                />
              </div>

              <div className="p-4 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9ca3af]">
                  {post.date} • {post.time}
                </p>
                <p className="text-[11px] text-[#ffcf6a]">{post.category}</p>
                <h3 className="text-sm font-semibold text-[#e5e7eb] line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-xs text-[#9ca3af] line-clamp-3">
                  {post.excerpt}
                </p>
                <button className="mt-3 inline-flex items-center rounded-full border border-[#ff9f1a] px-3 py-1 text-[11px] font-semibold text-[#ff9f1a] hover:bg-[#ff9f1a] hover:text-black transition">
                  Read more
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* RIGHT*/}
        <aside className="space-y-5">
     
          <div className="rounded-2xl bg-[#0b1020] border border-white/10 p-4">
            <h2 className="text-sm font-semibold text-[#f3f4f6] mb-2">
              Recent <span className="text-[#ff9f1a]">Post</span>
            </h2>

            <div className="mt-3 rounded-xl bg-[#050816] border border-[#ff9f1a40] p-3">
              <p className="text-[11px] font-semibold text-[#f9fafb]">
                How do we plan a full event from scratch?
              </p>
              <p className="mt-1 text-[11px] text-[#9ca3af]">
                A quick look at our process: concept, moodboard, budgeting and
                on-day coordination.
              </p>
              <button className="mt-3 inline-flex items-center rounded-full bg-[#ff9f1a] px-3 py-1 text-[10px] font-semibold text-black hover:bg-[#ff7a00] transition">
                Read more
              </button>
            </div>
          </div>

          {/* FAQ  */}
          <div className="rounded-2xl bg-[#050816] border border-white/10 divide-y divide-white/5">
            {recentQuestions.map((q, idx) => (
              <button
                key={q}
                className="w-full text-left px-4 py-3 text-[11px] flex items-center justify-between text-[#e5e7eb] hover:bg-white/5 transition"
              >
                <span>{q}</span>
                <span className="ml-3 text-[#ff9f1a] text-xs">
                  {idx === 0 ? "Read" : "?"}
                </span>
              </button>
            ))}
          </div>

          {/* Small */}
          <div
            className="rounded-2xl overflow-hidden h-52 bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url(https://i.ibb.co.com/VY5fFt4C/4fd6b25bf67b1eec8b0b6db772e3ddc7.jpg)",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative h-full flex flex-col justify-end p-4 text-white">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#ffcf6a]">
                26 December 2025
              </p>
              <h3 className="text-sm font-semibold">Winter Music Conference</h3>
              <button className="mt-2 inline-flex items-center rounded-full bg-[#ff9f1a] px-3 py-1 text-[11px] font-semibold text-black hover:bg-[#ff7a00] transition">
                Book ticket
              </button>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
