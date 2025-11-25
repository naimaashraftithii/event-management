"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../lib/firebase";
import EventCard from "../../components/EventCard";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setEvents(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsub();
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">All Events</h1>
      <p className="mb-6 text-base-content/70">
        These events are loaded from Firestore.
      </p>

      {events.length === 0 ? (
        <p>No events yet. Create one!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      )}
    </section>
  );
}
