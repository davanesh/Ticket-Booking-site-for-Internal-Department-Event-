import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth, provider } from './config/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

// Placeholder Components (Will replace later)
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Handle scroll for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Router>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <Link to="/" className="nav-logo text-gradient">VelTech</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Events</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link">My Tickets</Link>
                <div style={{display:'flex', alignItems:'center', gap:'10px', marginLeft: '10px'}}>
                    <img src={user.photoURL} alt="avatar" style={{width: 32, height: 32, borderRadius: '50%'}} />
                    <button className="btn-outline" onClick={handleLogout}>Logout</button>
                </div>
              </>
            ) : (
              <button className="btn-primary" onClick={handleLogin}>Login</button>
            )}
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
