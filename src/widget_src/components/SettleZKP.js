import React from 'react';
import '../styles/Lock.css';

function SettleZKP({ userMessage }) {
  return (
    <div className="Lock">
      <h3>Settle the intention</h3>
      <p>Make sure you are on the correct destination chain</p>
      {/* Lock Button */}
      <div className="buttonX">
        Go!
      </div>
    </div>
  );
}

export default SettleZKP;