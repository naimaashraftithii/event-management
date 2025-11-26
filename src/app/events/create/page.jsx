// src/app/events/create/page.jsx
"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Please login first.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "events"), {
        ...form,
        createdBy: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      router.push("/events");
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          className="input input-bordered w-full"
          placeholder="Event title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="date"
          className="input input-bordered w-full"
          placeholder="Date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          className="input input-bordered w-full"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          rows={4}
          value={form.description}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </section>
  );
}
