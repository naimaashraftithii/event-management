// src/components/AddProductForm.jsx
"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    price: "",
    date: "",
    priority: "medium",
    imageUrl: "",
    category: "Wedding",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "products"), {
        title: form.title,
        shortDescription: form.shortDescription,
        description: form.description,
        price: Number(form.price),
        date: form.date || null,
        priority: form.priority,
        imageUrl: form.imageUrl || "",
        category: form.category,
        currency: "BDT",
        createdAt: serverTimestamp(),
      });

      toast.success("Product added successfully!");
      setForm({
        title: "",
        shortDescription: "",
        description: "",
        price: "",
        date: "",
        priority: "medium",
        imageUrl: "",
        category: "Wedding",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 bg-base-200/80 p-6 rounded-lg shadow max-w-2xl"
      >
        <div className="grid gap-2">
          <label className="text-sm font-semibold">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Dream Wedding Package"
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold">Short Description</label>
          <input
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Premium wedding with stage, entrance and photo corner."
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold">Full Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Explain the package details, capacity, decor items, etc."
            required
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold">Price (BDT)</label>
            <input
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Event Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="very-high">Very High</option>
            </select>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold">Image URL (optional)</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="https://example.com/hero-image.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold border-none"
        >
          {loading ? "Adding..." : "Submit Package"}
        </button>
      </form>
    </>
  );
}
