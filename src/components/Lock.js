import React from 'react';
import { ethers } from 'ethers'
import * as Aux from '../tools/Aux.js';
import * as Config from '../config.js';
import axios from 'axios'
import '../styles/Lock.css';

function Lock({ userMessage, setIsLoading, setMessageString, setMessageType, setShowMessage, setLoadingText }) {

  async function checkCorrectNet(_userMessage) {
    const currentChainInfo = await Aux.getCurrentChainProvider()
    if (currentChainInfo.networkId !== Config.CHAIN_CONNECTIONS[_userMessage.sourceBlockchain].networkId) {
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(Aux.messageOptions.WRONG_NET_MESSAGE);
      return false
    }
    return true
  }

  function preLock() {
    const transLinkElem = document.getElementById("LockLink");
    const ButtonElem = document.getElementById("LockButton");

    ButtonElem.classList.add("disabled");
    ButtonElem.setAttribute("disabled", true);
    transLinkElem.classList.add("hidden");

    // Display loading status
    setIsLoading(true);
    setLoadingText('Loading...');
    setShowMessage(false)
  }

  function endApprove() {
    setIsLoading(false);
    setLoadingText("");
    const LockButton = document.getElementById("LockButton");
    //approveButtonElem.innerHTML = "Approve";
    LockButton.classList.remove("disabled");
    LockButton.removeAttribute("disabled");
  }

  // To protect our system at an early stage, the data structures are generated in the backend
  // In a more mature stage, the user will create the data structures locally
  async function sendDataToBackend() {
    const EOA = await Aux.obtainUSerEOA()
    userMessage.EOA = EOA
    console.log("USER MESSAGE FINALIZED: ", userMessage)
    const uri2 = `${Config.backend}counter/${JSON.stringify(userMessage)}`;
    try {
      const response = await axios.get(uri2);
      const output = JSON.parse(response.data);
      return output
    } catch (err) {
      console.log("ERR send data to backend: ", err)
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(Aux.messageOptions.ERR_DATA_CREATE_MESSAGE);
      return false;
    }
  }

  async function mainLock() {
    try {
      preLock()
      let okNet = await checkCorrectNet(userMessage)
      if (okNet === true) {
        const r = await sendDataToBackend()
        console.log("LOCK R: ", r)
        if(r!== false){

        }
      }
    } catch (err) {
      let errorMessage
      console.error("Error during transaction:", err);
      if (err.code === "ACTION_REJECTED") {
        errorMessage = Aux.messageOptions.CANCELED_MESSAGE;
      } else {
        errorMessage = Aux.messageOptions.ERROR_MESSAGE;
      }
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(errorMessage);
    }
    // Final touches
    setShowMessage(true)
    endApprove()
  }

  return (
    <div className="Lock">
      <h2 class="white-text">Transfer the asset and message to SuferMonkey</h2>

      {/* Lock Button */}
      <div className="button-container">
        <button className="primary-button" id="LockButton" onClick={mainLock}>Send it!</button>
      </div>
      <div className="link-container">
        <a href="" className="hidden" target="_blank" rel="noreferrer" id="LockLink">Link Text</a>
      </div>
    </div>
  );
}

export default Lock;