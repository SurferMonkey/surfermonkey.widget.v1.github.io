import React from 'react';
import '../styles/Lock.css';

function Lock({ userMessage }) {
  return (
    <div className="Lock">
      <h3>Transfer the asset and message to SuferMonkey</h3>
      {/* Lock Button */}
      <div className="buttonX">
        Send it!
      </div>
    </div>
  );
}

export default Lock;