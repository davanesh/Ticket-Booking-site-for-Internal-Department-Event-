import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(modalRef.current, 
      { scale: 0.9, opacity: 0, y: -20 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }
    );
  }, []);

  const handleAction = (callback) => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(modalRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.3, onComplete: callback });
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
        border: `1px solid rgba(255, 170, 0, 0.4)`,
        boxShadow: `0 0 30px rgba(255, 170, 0, 0.15)`
      }}>
        <AlertTriangle size={64} color="#ffaa00" style={{ margin: '0 auto 15px' }} />
        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Are you sure?</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '25px', lineHeight: 1.5 }}>{message}</p>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => handleAction(onCancel)} style={{ flex: 1, background: 'transparent', border: '1px solid var(--text-muted)', color: 'white', padding: '12px', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>
            No, keep it
          </button>
          <button onClick={() => handleAction(onConfirm)} style={{ flex: 1, background: '#ff3366', border: 'none', color: 'white', padding: '12px', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>
            Yes, cancel it
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
