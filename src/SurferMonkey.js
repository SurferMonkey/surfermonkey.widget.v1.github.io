import React, { useState, useEffect } from 'react';
import DepositERC20 from './components/DepositERC20';
import DepositNative from './components/DepositNative';
import Withdraw from './components/Withdraw';
import DeveloperLogs from './components/DeveloperLogs';
import SurferMonkeyLogo from "./Images/SurferMonkey.png";
import LoadingOverlay from './components/LoadingOverlay.js';
import Message from './components/Message';
import * as Aux from './tools/Aux.js';
import './SurferMonkey.css';

function SurferMonkey({ userMessage }) {
  const [activeView, setActiveView] = useState('start');
  const [showDevLogs, setShowDevLogs] = useState(false); // State to track visibility of DeveloperLogs

  const [isLoading, setIsLoading] = useState(false);
  const [messageString, setMessageString] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading data, please wait...');

  async function connect(){
    await Aux.connectWallet()
  }

  // Network variables
  const [networkName, setNetworkName] = useState(''); // State to hold the network name

  // Use effect to call the asynchronous function and set the network name
  useEffect(() => {
    async function fetchNetworkName() {
      await connect()
      const chainInfo = await Aux.getCurrentChainProvider()
      setNetworkName(chainInfo.networkName);
    }
    
    fetchNetworkName();
  }, []); // Empty dependency array so this effect runs once when the component mounts


  // Decide which component to render based on userMessage.selectedFunc
  const renderDepositComponent = (props) => {
    switch (userMessage.selectedFunc) {
      case 1:
        return <DepositNative {...props} userMessage={userMessage} />;
      case 2:
        return <DepositERC20 {...props} userMessage={userMessage} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <LoadingOverlay isLoading={isLoading} loadingText={loadingText} />

      {showMessage && (
        <Message
          message={messageString}
          onClose={() => setShowMessage(false)}
          type={messageType}
        />
      )}
      <div className="menu">
        <button
          onClick={() => setActiveView('start')}
          className={activeView === 'start' ? 'selected' : ''}
        >
          Create
        </button>
        <button
          onClick={() => setActiveView('withdraw')}
          className={activeView === 'withdraw' ? 'selected' : ''}
        >
          Settle
        </button>
        <div className="blockchainName-container">
          <h3>{networkName}</h3>
        </div>
      </div>
      {activeView === 'start' &&
        renderDepositComponent({
          setIsLoading,
          setMessageString,
          setMessageType,
          setShowMessage,
          setLoadingText
        })}
      {activeView === 'withdraw' && <Withdraw 
      setIsLoading={setIsLoading}
      setMessageString={setMessageString}
      setMessageType={setMessageType}
      setShowMessage={setShowMessage}
      setLoadingText={setLoadingText}
      />}
      {/* Footer */}
      <footer className="app-footer">
        <a href="https://www.surfermonkey.io/" target="_blank" rel="noopener noreferrer">
          <img src={SurferMonkeyLogo} alt="SurferMonkey" className="footer-logo" />
        </a>
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