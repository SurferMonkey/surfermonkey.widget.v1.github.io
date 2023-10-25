import React, { useState } from 'react';
import Approve from './Approve';
import Lock from './Lock';
import '../styles/Deposit.css';

function DepositERC20({ userMessage }) {

  return (
    <div className="deposit">
      <h2>Anonymous ERC20 Intention</h2>
      <hr />
      <Approve userMessage={userMessage}/>
      <Lock userMessage={userMessage}/>
    </div>
  );
}

export default DepositERC20;
