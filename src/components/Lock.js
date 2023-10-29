import React from 'react';
import '../styles/Lock.css';

function Lock({ userMessage, setIsLoading, setMessageString, setMessageType, setShowMessage, setLoadingText }) {
  return (
    <div className="Lock">
     <h2 class="white-text">Transfer the asset and message to SuferMonkey</h2>

      {/* Lock Button */}
      <div className="button-container">
        <button className="primary-button" id="ApproveButton">Send it!</button>
      </div>
    </div>
  );
}

export default Lock;