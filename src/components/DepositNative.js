import React, { useState } from 'react';
import Lock from './Lock';
import '../styles/Deposit.css';

function DepositNative({ userMessage }) {

  return (
    <div className="deposit">
      <h2>Anonymous Native Intention</h2>
      <hr />
      <Lock userMessage={userMessage}/>
    </div>
  );
}

export default DepositNative;
