import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <div className="card bg-base-200 shadow-sm hover:shadow-md transition p-4">
      <h3 className="text-lg font-bold mb-1">{event.title}</h3>
      <p className="text-sm mb-1">
        {event.date} • {event.location}
      </p>
      <p className="text-xs text-base-content/70 line-clamp-2 mb-2">
        {event.description}
      </p>
      <Link href={`/events/${event.id}`} className="btn btn-link px-0">
        View details
      </Link>
    </div>
  );
}
