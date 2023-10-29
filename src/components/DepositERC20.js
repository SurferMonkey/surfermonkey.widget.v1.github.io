import React, { useState } from 'react';
import Approve from './Approve';
import Lock from './Lock';
import '../styles/Deposit.css';

function DepositERC20({ userMessage, setIsLoading, setMessageString, setMessageType, setShowMessage, setLoadingText }) {
  return (
    <div className="deposit">
      <h1>Anonymous ERC20 Intent</h1>
      <hr />
      <Approve 
        userMessage={userMessage} 
        setIsLoading={setIsLoading}
        setMessageString={setMessageString}
        setMessageType={setMessageType}
        setShowMessage={setShowMessage}
        setLoadingText={setLoadingText}
      />
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

export default DepositERC20;