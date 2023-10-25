import React from 'react';
import '../styles/DeveloperLogs.css';

function DeveloperLogs({ userMessage }) {
  return (
    <div className="Console">
      <h3>Developer Logs</h3>
      {/* Logs */}
      <h4>User Message</h4>
      <pre>{JSON.stringify(userMessage, null, 2)}</pre>
    </div>
  );
}

export default DeveloperLogs;