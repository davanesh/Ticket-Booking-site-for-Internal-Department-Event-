import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import EventDetails from "./components/EventDetails";
import BookingForm from "./components/BookingForm";
import BookingSummary from "./components/BookingSummary";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    ticketCount: 1
  });
  const [errors, setErrors] = useState({});
  const [bookingSummary, setBookingSummary] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [requestError, setRequestError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
    );

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.16,
        delay: 0.25,
        ease: "power3.out"
      }
    );
  }, []);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/event`);
        if (!response.ok) {
          throw new Error("Unable to load event details.");
        }

        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setRequestError(error.message || "Something went wrong while loading the event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, []);

  const validateForm = () => {
    const nextErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedDepartment = formData.department.trim();
    const ticketCount = Number(formData.ticketCount);

    if (!trimmedName) {
      nextErrors.name = "Name is required.";
    }

    if (!trimmedEmail) {
      nextErrors.email = "Email ID is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!trimmedDepartment) {
      nextErrors.department = "Department is required.";
    }

    if (!formData.ticketCount) {
      nextErrors.ticketCount = "Number of tickets is required.";
    } else if (!Number.isInteger(ticketCount) || ticketCount <= 0) {
      nextErrors.ticketCount = "Enter a positive whole number.";
    } else if (event && ticketCount > event.availableTickets) {
      nextErrors.ticketCount = "Requested tickets exceed available seats.";
    }

    return nextErrors;
  };

  const handleChange = (eventTarget) => {
    const { name, value } = eventTarget.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => ({
      ...current,
      [name]: ""
    }));

    setStatusMessage("");
    setRequestError("");
  };

  const handleReset = (nextForm) => {
    setFormData(nextForm);
    setErrors({});
    setStatusMessage("");
    setRequestError("");
  };

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatusMessage("");
      return;
    }

    setIsSubmitting(true);
    setRequestError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          department: formData.department.trim(),
          ticketCount: Number(formData.ticketCount)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed. Please try again.");
      }

      setEvent(data.updatedEvent);
      setBookingSummary(data.booking);
      setStatusMessage(data.message);
      setFormData({
        name: "",
        email: "",
        department: "",
        ticketCount: ""
      });
      setErrors({});
    } catch (error) {
      setRequestError(error.message || "Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid bg-[size:44px_44px] opacity-[0.07]" />
      <div className="absolute left-[-120px] top-16 h-72 w-72 animate-float rounded-full bg-purple-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-[-80px] h-80 w-80 animate-float rounded-full bg-fuchsia-500/20 blur-3xl [animation-delay:1.2s]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-10 md:px-8 lg:px-10">
        <header ref={heroRef} className="mb-10 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-fuchsia-200">
            Department Ticket Portal
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Grab your tickets for the biggest Department event of the year.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Check out the event details, book your tickets in seconds, and lock your spot before it’s gone.
          </p>
        </header>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-lg text-slate-200 backdrop-blur">
            Loading event details...
          </div>
        ) : requestError && !event ? (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-8 text-rose-100">
            {requestError}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div
              ref={(element) => {
                cardsRef.current[0] = element;
              }}
              className="space-y-6"
            >
              <EventDetails event={event} />
              <BookingSummary booking={bookingSummary} />
            </div>

            <div
              ref={(element) => {
                cardsRef.current[1] = element;
              }}
              className="space-y-4"
            >
              <BookingForm
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onReset={handleReset}
                isSubmitting={isSubmitting}
                availableTickets={event.availableTickets}
              />

              {statusMessage ? (
                <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                  {statusMessage}
                </div>
              ) : null}

              {requestError && event ? (
                <div className="rounded-2xl border border-rose-400/25 bg-rose-500/10 p-4 text-sm text-rose-100">
                  {requestError}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
