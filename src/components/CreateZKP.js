import React from 'react';
import '../styles/Approve.css';
import Upload from './Upload';

function CreateZKP({ userMessage }) {
  return (
    <div className="Approve">
      <h3>Pick your transaction</h3>
      <Upload />
    </div>
  );
}

export default CreateZKP;