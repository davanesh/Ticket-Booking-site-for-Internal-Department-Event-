const detailItems = [
  { key: "departmentName", label: "Department" },
  { key: "eventDateTime", label: "Date & Time" },
  { key: "venue", label: "Venue" },
  { key: "ticketPrice", label: "Ticket Price", prefix: "Rs. " },
  { key: "availableTickets", label: "Available Tickets" }
];

function EventDetails({ event }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-glow">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-purple-200">
            Internal Department Event
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            {event.eventName}
          </h2>
        </div>
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
            Live Seats
          </p>
          <p className="text-2xl font-bold text-white">{event.availableTickets}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">-
        {detailItems.map((item) => (
          <div
            key={item.key}
            className="rounded-2xl border border-white/10 bg-black/30 p-4 transition duration-300 hover:border-purple-400/40 hover:bg-purple-500/10"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-purple-200/80">
              {item.label}
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {item.prefix}
              {event[item.key]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EventDetails;
