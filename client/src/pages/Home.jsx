import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import EventCard from '../components/EventCard';

const Home = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleBook = async (event) => {
    if (!user) {
      alert("Please login first to book tickets!");
      return;
    }

    try {
      const idToken = await user.getIdToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/tickets/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ eventId: event.id })
      });

      const data = await response.json();
      if (response.ok) {
        alert("Booking successful! Check your email and Dashboard.");
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/events`);
        setEvents(await res.json());
      } else {
        alert(data.error || 'Booking failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };

  return (
    <div>
      <HeroSection />
      
      <section id="events" className="container" style={{ padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>Upcoming <span className="text-gradient">Events</span></h2>
          <p style={{ color: 'var(--text-muted)' }}>Secure your spot before they sell out.</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading amazing events...</p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '30px' 
          }}>
            {events.length > 0 ? (
              events.map(event => (
                <EventCard key={event.id} event={event} onBook={handleBook} />
              ))
            ) : (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No events found right now.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
