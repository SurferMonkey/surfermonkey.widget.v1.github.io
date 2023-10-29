import React from 'react';
import '../styles/Approve.css';
import Upload from './Upload';

function CreateZKP({ userMessage }) {
  return (
    <div className="Approve">
      <h2>Pick your transaction</h2>
      <Upload />
    </div>
  );
}

export default CreateZKP;