import React, { useState } from 'react';
import Lock from './Lock';
import '../styles/Deposit.css';

function DepositNative({ userMessage, setIsLoading, setMessageString, setMessageType, setShowMessage, setLoadingText }) {

  return (
    <div className="deposit">
      <h1>Anonymous Native Intent</h1>
      <hr />
      <Lock 
        userMessage={userMessage} 
        setIsLoading={setIsLoading}
        setMessageString={setMessageString}
        setMessageType={setMessageType}
        setShowMessage={setShowMessage}
        setLoadingText={setLoadingText}
      />
    </div>
  );
}

export default DepositNative;
