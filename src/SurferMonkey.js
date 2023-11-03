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
  const [activeView, setActiveView] = useState('');
  const [showDevLogs, setShowDevLogs] = useState(false); // State to track visibility of DeveloperLogs

  const [isLoading, setIsLoading] = useState(false);
  const [messageString, setMessageString] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading data, please wait...');
  // Network variables
  const [networkName, setNetworkName] = useState(''); // State to hold the network name

  async function connect() {
    await Aux.connectWallet()
  }

  // Use effect to call the asynchronous function and set the network name
  // Set inital view: Create or Settle
  useEffect(() => {
    let isMounted = true; // flag to track whether the component is mounted

    async function fetchNetworkName() {
      if (isMounted) {
        await connect();
        const chainInfo = await Aux.getCurrentChainProvider();
        setNetworkName(chainInfo.networkName);
      }
    }

    function setinitView() {
      if (userMessage.view === 1) {
        console.log("Init view: Create")
        // Create Intent
        setActiveView('create')
      } else if (userMessage.view === 2) {
        // Settle ZKP
        setActiveView('withdraw')
        console.log("Init view: Withdraw")
      } else {
        console.log("View not recognized")
        console.log(userMessage)
        setActiveView('create')
      }
    }

    setinitView();
    fetchNetworkName();

    // Cleanup function to set the flag to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [userMessage]);


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
          onClick={() => setActiveView('create')}
          className={activeView === 'create' ? 'selected' : ''}
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
      {activeView === 'create' &&
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