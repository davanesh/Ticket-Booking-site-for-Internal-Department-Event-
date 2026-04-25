import express from 'express';
import crypto from 'crypto';
import Ticket from '../models/Ticket.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';
import { sendTicketEmail } from '../services/email.js';
import sequelize from '../config/db.js';

const router = express.Router();

// POST /api/tickets/book : Book a ticket
router.post('/book', verifyToken, async (req, res) => {
  const { eventId } = req.body;
  const decodedFirebaseUser = req.user;

  try {
    const result = await sequelize.transaction(async (t) => {
      // Find event and lock row
      const event = await Event.findByPk(eventId, { transaction: t, lock: true });
      if (!event) {
        throw new Error('Event not found');
      }

      if (event.ticketsBooked >= event.capacity) {
        throw new Error('Event is sold out');
      }

      // Upsert User
      const [user] = await User.findOrCreate({
        where: { firebaseUid: decodedFirebaseUser.uid },
        defaults: {
          email: decodedFirebaseUser.email,
          name: decodedFirebaseUser.name || 'User',
        },
        transaction: t
      });

      // Check if user already booked
      const existingTicket = await Ticket.findOne({
        where: { userId: user.id, eventId: event.id },
        transaction: t
      });

      if (existingTicket) {
        throw new Error('You have already booked a ticket for this event');
      }

      // Create Ticket
      const ticketId = crypto.randomUUID().substring(0, 8).toUpperCase();
      const newTicket = await Ticket.create({
        id: ticketId,
        userId: user.id,
        eventId: event.id,
      }, { transaction: t });

      // Increment booked tickets
      event.ticketsBooked += 1;
      await event.save({ transaction: t });

      return { ticket: newTicket, user, event };
    });

    // Outside transaction - send email asynchronously
    sendTicketEmail(result.user.email, result.event, result.ticket).catch(err => console.log('Mail error:', err));

    res.status(201).json({
      message: 'Ticket booked successfully!',
      ticket: result.ticket
    });

  } catch (error) {
    if (error.message === 'Event not found' || error.message === 'Event is sold out' || error.message === 'You have already booked a ticket for this event') {
      return res.status(400).json({ error: error.message });
    }
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Server error processing booking' });
  }
});

// GET /api/tickets/my-tickets : Get logged-in user's tickets
router.get('/my-tickets', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ where: { firebaseUid: req.user.uid } });
    if (!user) return res.json([]);

    const tickets = await Ticket.findAll({
      where: { userId: user.id },
      include: [Event]
    });

    res.json(tickets);
  } catch (error) {
    console.error('Fetch tickets error:', error);
    res.status(500).json({ error: 'Server error fetching tickets' });
  }
});

export default router;
