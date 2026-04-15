const initialForm = {
  name: "",
  email: "",
  department: "",
  ticketCount: 1
};

function BookingForm({
  formData,
  errors,
  onChange,
  onSubmit,
  onReset,
  isSubmitting,
  availableTickets
}) {
  const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter your full name" },
    { name: "email", label: "Email ID", type: "email", placeholder: "you@college.edu" },
    { name: "department", label: "Department", type: "text", placeholder: "Select Department" },
    { name: "ticketCount", label: "Number of Tickets", type: "number", placeholder: "1" }
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-glow">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.25em] text-purple-200">Book Your Seat</p>
        <h3 className="mt-2 text-2xl font-bold text-white">Secure your spot in seconds</h3>
        <p className="mt-2 text-sm text-slate-300">
          Tickets left right now:{" "}
          <span className="font-semibold text-purple-300">{availableTickets}</span>
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        {fields.map((field) => (
          <div key={field.name}>
            <label className="mb-2 block text-sm font-medium text-purple-100" htmlFor={field.name}>
              {field.label}
            </label>

            {/* 🔥 Conditional Rendering */}
            {field.name === "department" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={onChange}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition duration-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30"
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                min={field.name === "ticketCount" ? "1" : undefined}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30"
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={onChange}
              />
            )}

            {errors[field.name] ? (
              <p className="mt-2 text-sm text-rose-300">{errors[field.name]}</p>
            ) : null}
          </div>
        ))}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="animate-pulseGlow rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Booking..." : "Book Tickets"}
          </button>

          <button
            type="button"
            onClick={() => onReset(initialForm)}
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Reset Form
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookingForm;