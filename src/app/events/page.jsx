"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../lib/firebase";
import EventCard from "../../components/EventCard";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setEvents(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">All Events</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
