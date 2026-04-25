import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle, XCircle } from 'lucide-react';

const NotificationModal = ({ message, type = 'success', onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(modalRef.current, 
      { scale: 0.5, opacity: 0, y: -50 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
    );
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(modalRef.current, { scale: 0.8, opacity: 0, y: 50, duration: 0.3, onComplete: onClose });
  };

  return (
    <div ref={overlayRef} style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div ref={modalRef} className="glass" style={{
        padding: '30px', textAlign: 'center', maxWidth: '400px', width: '90%',
        background: 'var(--bg-dark)', 
        border: `1px solid ${type === 'success' ? 'rgba(0, 240, 255, 0.4)' : 'rgba(236, 72, 153, 0.4)'}`,
        boxShadow: `0 0 20px ${type === 'success' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(236, 72, 153, 0.15)'}`
      }}>
        {type === 'success' ? (
          <CheckCircle size={64} color="var(--accent-cyan)" style={{ margin: '0 auto 15px' }} />
        ) : (
          <XCircle size={64} color="var(--accent-pink)" style={{ margin: '0 auto 15px' }} />
        )}
        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{type === 'success' ? 'Awesome!' : 'Oops!'}</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '25px', lineHeight: 1.5 }}>{message}</p>
        <button className="btn-primary" onClick={handleClose} style={{ width: '100%' }}>Continue</button>
      </div>
    </div>
  );
};

export default NotificationModal;
