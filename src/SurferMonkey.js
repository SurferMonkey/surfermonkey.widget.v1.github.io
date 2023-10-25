import React, { useState } from 'react';
import DepositERC20 from './components/DepositERC20';
import DepositNative from './components/DepositNative';
import Withdraw from './components/Withdraw';
import DeveloperLogs from './components/DeveloperLogs';
import SurferMonkeyLogo from "./public/SurferMonkey.png";
import TagLine from "./public/TagLine.png";
import './SurferMonkey.css';

function SurferMonkey({ userMessage }) {
  const [activeView, setActiveView] = useState('start');
  const [showDevLogs, setShowDevLogs] = useState(false); // State to track visibility of DeveloperLogs

  // Decide which component to render based on userMessage.selectedFunc
  const renderDepositComponent = () => {
    switch (userMessage.selectedFunc) {
      case 1:
        return <DepositNative userMessage={userMessage} />;
      case 2:
        return <DepositERC20 userMessage={userMessage} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <div className="menu">
        <button
          onClick={() => setActiveView('start')}
          className={activeView === 'start' ? 'selected' : ''}
        >
          Start
        </button>
        <button
          onClick={() => setActiveView('withdraw')}
          className={activeView === 'withdraw' ? 'selected' : ''}
        >
          Finish
        </button>
      </div>
      {activeView === 'start' && renderDepositComponent()}
      {activeView === 'withdraw' && <Withdraw />}
      {/* Footer */}
      <footer className="app-footer">
        <a href="https://www.surfermonkey.io/" target="_blank" rel="noopener noreferrer">
          <img src= {SurferMonkeyLogo} alt="SurferMonkey" className="footer-logo" />
        </a>
        <img src= {TagLine} alt="TagLine" className="footer-logo2" />
      </footer>
      {/* Button to toggle DeveloperLogs */}
      <button className="dev-logs-button" onClick={() => setShowDevLogs(!showDevLogs)}>
        Dev Logs
      </button>
      {/* Conditionally render DeveloperLogs based on showDevLogs */}
      {showDevLogs && <DeveloperLogs userMessage={userMessage} />}
    </div>
  );
}

export default SurferMonkey;