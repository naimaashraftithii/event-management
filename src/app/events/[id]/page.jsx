"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Link from "next/link";

export default function EventDetailsPage({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, "events", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setEvent({ id: snap.id, ...snap.data() });
    };
    load();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <section className="container mx-auto p-6">
      <Link href="/events" className="btn mb-4">← Back</Link>

      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-sm">{event.date} • {event.location}</p>

      <p className="mt-4">{event.description}</p>
    </section>
  );
}
