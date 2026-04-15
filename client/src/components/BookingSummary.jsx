function BookingSummary({ booking }) {
  if (!booking) {
    return (
      <section className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-slate-300">
        <p className="text-sm uppercase tracking-[0.25em] text-purple-200">Booking Summary</p>
        <p className="mt-3 text-base">
          Complete the form to see your confirmation and ticket summary here.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6 shadow-glow">
      <p className="text-sm uppercase tracking-[0.25em] text-emerald-200">Booking Confirmed</p>
      <h3 className="mt-2 text-2xl font-bold text-white">
        {booking.userName}, your tickets are reserved.
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Event Name</p>
          <p className="mt-2 text-lg font-semibold text-white">{booking.eventName}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Tickets Booked</p>
          <p className="mt-2 text-lg font-semibold text-white">{booking.ticketCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Total Amount</p>
          <p className="mt-2 text-lg font-semibold text-white">Rs. {booking.totalAmount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Confirmation ID</p>
          <p className="mt-2 text-lg font-semibold text-white">{booking.confirmationId}</p>
        </div>
      </div>
    </section>
  );
}

export default BookingSummary;
