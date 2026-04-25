import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Event from './Event.js';

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('confirmed', 'cancelled'),
    defaultValue: 'confirmed',
  }
}, {
  timestamps: true,
});

// Associations
User.hasMany(Ticket, { foreignKey: 'userId' });
Ticket.belongsTo(User, { foreignKey: 'userId' });

Event.hasMany(Ticket, { foreignKey: 'eventId' });
Ticket.belongsTo(Event, { foreignKey: 'eventId' });

export default Ticket;
