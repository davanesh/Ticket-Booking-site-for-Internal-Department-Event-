import React, { useState, useEffect } from 'react';
import { Ticket } from 'lucide-react';
import NotificationModal from '../components/NotificationModal';
import ConfirmationModal from '../components/ConfirmationModal';

const Dashboard = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [confirmCancelId, setConfirmCancelId] = useState(null);

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

  const handleCancel = async () => {
    const ticketId = confirmCancelId;
    setConfirmCancelId(null);
    if (!ticketId) return;

    try {
      const idToken = await user.getIdToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/tickets/cancel/${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setNotification({ type: 'success', message: "Ticket cancelled. A confirmation email has been dispatched." });
        setTickets(tickets.filter(t => t.id !== ticketId));
      } else {
        setNotification({ type: 'error', message: data.error || 'Cancellation failed' });
      }
    } catch (err) {
      console.error(err);
      setNotification({ type: 'error', message: 'An error occurred connecting to the server.' });
    }
  };

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
                
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#00ff00' }}>Confirmed</span>
                  <button 
                    onClick={() => setConfirmCancelId(tkt.id)} 
                    style={{ background: 'transparent', border: '1px solid var(--accent-pink)', color: 'var(--accent-pink)', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.3s' }}
                    onMouseOver={(e) => { e.target.style.background = 'var(--accent-pink)'; e.target.style.color = '#fff' }}
                    onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent-pink)' }}
                  >
                    Cancel
                  </button>
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

      {confirmCancelId && (
        <ConfirmationModal 
          message="This action cannot be undone. Are you sure you want to forfeit this ticket and lose your spot at the event?"
          onConfirm={handleCancel}
          onCancel={() => setConfirmCancelId(null)}
        />
      )}

      {notification && (
        <NotificationModal 
          type={notification.type} 
          message={notification.message} 
          onClose={() => setNotification(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
