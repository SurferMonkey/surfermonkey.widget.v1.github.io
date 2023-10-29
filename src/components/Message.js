// Message.js
import React, { useEffect, useState } from 'react';
import './../styles/Message.css';

const Message = ({ message, onClose, type }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const duration = type === 'success' ? 60000 : 5000;
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onClose, 1000); // 1000 ms for the fading effect duration
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, type]);

  return (
  <div
    className={`message ${type === 'success' ? 'success-message' : 'error-message'}${isFadingOut ? ' fade-out' : ''}`}
    onClick={onClose}
  >
    <div
      className="close-button"
      onClick={onClose}
    >
      ×
    </div>
    <span dangerouslySetInnerHTML={{ __html: message }} />
  </div>
  );
};

export default Message;


