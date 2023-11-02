import React from 'react';
import '../styles/Approve.css';
import Upload from './Upload';

function CreateZKP({ userMessage, globalVariable, setGlobalVariable  }) {
  return (
    <div className="Approve">
      <h2>Pick your transaction</h2>
      <Upload globalVariable={globalVariable} setGlobalVariable={setGlobalVariable} />
    </div>
  );
}

export default CreateZKP;