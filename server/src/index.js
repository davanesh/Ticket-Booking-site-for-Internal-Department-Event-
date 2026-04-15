import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

let eventDetails = {
  eventName: "TechX Department Fest 2026",
  departmentName: "Department of Computer Science and Engineering",
  eventDateTime: "25 April 2026, 10:30 AM",
  venue: "Innovation Hall, Block B",
  ticketPrice: 299,
  availableTickets: 120
};

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/api/event", (_, response) => {
  response.json(eventDetails);
});

app.post("/api/bookings", (request, response) => {
  const { name, email, department, ticketCount } = request.body;
  const normalizedTicketCount = Number(ticketCount);

  if (!name || !email || !department || !ticketCount) {
    return response.status(400).json({
      message: "All fields are mandatory."
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({
      message: "Please provide a valid email ID."
    });
  }

  if (!Number.isInteger(normalizedTicketCount) || normalizedTicketCount <= 0) {
    return response.status(400).json({
      message: "Number of tickets should be a positive whole number."
    });
  }

  if (normalizedTicketCount > eventDetails.availableTickets) {
    return response.status(400).json({
      message: "Cannot book more tickets than the available count."
    });
  }

  eventDetails = {
    ...eventDetails,
    availableTickets: eventDetails.availableTickets - normalizedTicketCount
  };

  return response.status(201).json({
    message: "Booking successful. Your seats have been confirmed.",
    updatedEvent: eventDetails,
    booking: {
      userName: name,
      eventName: eventDetails.eventName,
      ticketCount: normalizedTicketCount,
      totalAmount: normalizedTicketCount * eventDetails.ticketPrice,
      confirmationId: `EVT-${Date.now().toString().slice(-6)}`
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
