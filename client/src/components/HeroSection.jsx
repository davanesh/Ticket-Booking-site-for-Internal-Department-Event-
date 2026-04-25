import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1, delay: 0.2, ease: 'power3.out' });
      gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 1, delay: 0.4, ease: 'power3.out' });
      gsap.from('.hero-cta', { opacity: 0, scale: 0.8, duration: 0.8, delay: 0.6, ease: 'back.out(1.7)' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Blob */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '400px',
        height: '400px',
        background: 'var(--accent-purple)',
        filter: 'blur(150px)',
        opacity: 0.3,
        zIndex: -1,
        borderRadius: '50%'
      }}></div>

      <h1 className="hero-title text-gradient" style={{ fontSize: '4.5rem', marginBottom: '20px', lineHeight: 1.1 }}>
        Experience College<br/>Like Never Before
      </h1>
      <p className="hero-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '40px' }}>
        Discover, book, and attend the best exclusive departmental events. Don't miss out on what's happening around campus.
      </p>
      <div className="hero-cta" style={{ display: 'flex', gap: '20px' }}>
        <button className="btn-primary" onClick={() => document.getElementById('events').scrollIntoView({behavior: 'smooth'})}>
          Explore Events
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
