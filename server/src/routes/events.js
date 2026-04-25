import express from 'express';
import Event from '../models/Event.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create an event (Protected, arguably admin only but letting anyone create for demo/testing)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, date, location, capacity, imageUrl } = req.body;
    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
      capacity,
      imageUrl
    });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
