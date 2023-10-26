import React from 'react';
import '../styles/DeveloperLogs.css';

function DeveloperLogs({ userMessage }) {
  const replacer = (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString() + "n";  // Represent as a string with 'n' appended
    } else {
      return value;
    }
  };


  return (
    <div className="Console">
      <h3>Developer Logs</h3>
      {/* Logs */}
      <h4>User Message</h4>
      <pre>{JSON.stringify(userMessage, replacer, 2)}</pre>
    </div>
  );
}

export default DeveloperLogs;