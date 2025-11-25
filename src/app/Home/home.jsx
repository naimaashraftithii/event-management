export default function HomePage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to <span className="text-primary">EventManager</span>
      </h1>
      <p className="max-w-xl text-base-content/80 mb-6">
        Create, manage and explore events with a simple and clean interface.
      </p>
      <div className="flex gap-3">
        <a href="/events" className="btn btn-primary">
          Browse Events
        </a>
        <a href="/events/create" className="btn btn-outline">
          Create Event
        </a>
      </div>
    </main>
  );
}
