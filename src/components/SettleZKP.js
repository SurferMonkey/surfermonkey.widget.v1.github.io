import React from 'react';
import '../styles/Lock.css';

function SettleZKP({ userMessage }) {
  return (
    <div className="Lock">
      <h2 class="white-text">Submit your ZKP</h2>
      {/* Lock Button */}
      <div className="button-container">
        <button className="primary-button" id="SettleZKP">Go!</button>
      </div>
    </div>
  );
}

export default SettleZKP;