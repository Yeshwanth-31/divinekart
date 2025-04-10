// File: src/components/LoginPopup.jsx
import React, { useEffect } from 'react';
import './LoginPopup.css';

const LoginPopup = ({ onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>🛕 Welcome to Divine Store</h2>
        <p>Please log in to personalize your experience.</p>

        <input type="email" placeholder="Email" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <button className="login-submit">Login</button>
      </div>
    </div>
  );
};

export default LoginPopup;
