import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const EventCard = ({ event, onBook }) => {
  const isSoldOut = event.ticketsBooked >= event.capacity;

  return (
    <div className="glass" style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {event.imageUrl ? (
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }} 
        />
      ) : (
        <div style={{ width: '100%', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{color: 'var(--text-muted)'}}>No Image</span>
        </div>
      )}
      
      <div style={{ marginTop: '10px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{event.title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '15px' }}>
          {event.description}
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <Calendar size={16} color="var(--accent-cyan)" />
            <span>{new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <MapPin size={16} color="var(--accent-pink)" />
            <span>{event.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <Users size={16} color="var(--accent-purple)" />
            <span>{event.ticketsBooked} / {event.capacity} Booked</span>
          </div>
        </div>

        <button 
          className="btn-primary" 
          style={{ width: '100%', opacity: isSoldOut ? 0.5 : 1, cursor: isSoldOut ? 'not-allowed' : 'pointer' }}
          onClick={() => !isSoldOut && onBook(event)}
          disabled={isSoldOut}
        >
          {isSoldOut ? 'Sold Out' : 'Get Ticket'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
