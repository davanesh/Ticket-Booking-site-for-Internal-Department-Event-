import React, { useState, useEffect } from 'react';
import { Ticket } from 'lucide-react';

const Dashboard = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyTickets = async () => {
      if (!user) return;
      try {
        const idToken = await user.getIdToken();
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/tickets/my-tickets`, {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        });
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyTickets();
  }, [user]);

  if (!user) {
    return (
      <div className="container flex-center" style={{ minHeight: '60vh' }}>
        <h2 style={{ color: 'var(--text-muted)' }}>Please login to view your dashboard.</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem' }}>Welcome, <span className="text-gradient">{user.displayName || 'Guest'}</span></h2>
        <p style={{ color: 'var(--text-muted)' }}>Here are your booked tickets.</p>
      </div>

      {loading ? (
        <p>Loading your tickets...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {tickets.length > 0 ? (
            tickets.map(tkt => (
              <div key={tkt.id} className="glass" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-15px', right: '-15px', opacity: 0.1 }}>
                  <Ticket size={100} />
                </div>
                
                <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', color: 'var(--accent-cyan)' }}>
                  {tkt.Event?.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
                  {new Date(tkt.Event?.date).toLocaleString()}
                </p>
                
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid var(--accent-pink)' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Ticket ID</p>
                  <p style={{ fontSize: '1.1rem', letterSpacing: '2px', fontWeight: 'bold' }}>{tkt.id}</p>
                </div>
                
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status:</span>
                  <span style={{ fontSize: '0.85rem', color: '#00ff00' }}>Confirmed</span>
                </div>
              </div>
            ))
          ) : (
            <div className="glass" style={{ padding: '40px 20px', textAlign: 'center', gridColumn: '1 / -1' }}>
              <Ticket size={48} color="var(--text-muted)" style={{ margin: '0 auto 15px' }} />
              <h3 style={{ marginBottom: '10px' }}>No tickets yet</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>You haven't booked any events.</p>
              <button className="btn-outline" onClick={() => window.location.href = '/'}>Browse Events</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
