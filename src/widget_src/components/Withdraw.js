import React, { useState } from 'react';
import CreateZKP from './CreateZKP';
import SettleZKP from './SettleZKP';
import '../styles/Deposit.css';

function Witdhraw({ userMessage }) {

  return (
    <div className="deposit">
      <h2>Settle Anonymous Intention</h2>
      <hr />
      <CreateZKP />
      <SettleZKP userMessage={userMessage}/>
    </div>
  );
}

export default Witdhraw;