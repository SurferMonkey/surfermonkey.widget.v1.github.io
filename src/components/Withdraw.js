import React, { useState } from 'react';
import CreateZKP from './CreateZKP';
import SettleZKP from './SettleZKP';
import '../styles/Deposit.css';

function Witdhraw({setIsLoading, setMessageString, setMessageType, setShowMessage, setLoadingText }) {
  const [globalVariable, setGlobalVariable] = useState('initial value');


  return (
    <div className="deposit">
      <h1>Settle Anonymous Intent</h1>
      <hr />
      <CreateZKP globalVariable={globalVariable} setGlobalVariable={setGlobalVariable} />
      <SettleZKP
        globalVariable={globalVariable}
        setIsLoading={setIsLoading}
        setMessageString={setMessageString}
        setMessageType={setMessageType}
        setShowMessage={setShowMessage}
        setLoadingText={setLoadingText}
      />
    </div>
  );
}

export default Witdhraw;