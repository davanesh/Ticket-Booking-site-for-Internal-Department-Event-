import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// Import Models for Syncing
import './models/User.js';
import './models/Event.js';
import './models/Ticket.js';
import sequelize from './config/db.js';

// Routes
import eventRoutes from './routes/events.js';
import ticketRoutes from './routes/tickets.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Main Initialization
const startServer = async () => {
    // Attempt DB Connection
    await connectDB();
    
    // Sync schemas (dev mode)
    // In production use migrations instead of sync()
    await sequelize.sync({ alter: true });
    console.log("Database models synchronized successfully.");
    
    // Setup Routes
    app.use('/api/events', eventRoutes);
    app.use('/api/tickets', ticketRoutes);

    app.get('/', (req, res) => res.send('API running!'));
    
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
};

startServer();
