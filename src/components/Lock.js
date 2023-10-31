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

  function endLock() {
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
    const userBlockchainData = await Aux.obtainUserBlockchainData()
    userMessage.EOA = userBlockchainData.EOA
    console.log("USER MESSAGE FINALIZED: ", userMessage)
    const uri2 = `${Config.backend}counter/${JSON.stringify(userMessage)}`;
    try {
      const response = await axios.get(uri2);
      const deposit = JSON.parse(response.data);
      return { userBlockchainData, deposit }
    } catch (err) {
      console.log("ERR send data to backend: ", err)
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(Aux.messageOptions.ERR_DATA_CREATE_MESSAGE);
      return false;
    }
  }

  async function settleTX(_UP_SC, _deposit) {
    try {
      if (userMessage.selectedFunc === 1) {
        // Native lock and message
        let submitDeposit = await _UP_SC.DepositIntentNative(_deposit.commitmentFixedHex, { value: userMessage.depositPublicDataParams.amount + "", gasLimit: 5142880 })
        return submitDeposit
      } else if (userMessage.selectedFunc === 2) {
        // ERC20 lock and message
        console.log("HERE")
        let submitDeposit = await _UP_SC.DepositIntentErc20(_deposit.commitmentFixedHex, userMessage.depositPublicDataParams.ERC20_SC, userMessage.depositPublicDataParams.amount, { gasLimit: 5142880 })
        console.log(submitDeposit)
        return submitDeposit
      } else {
        console.log("Wrong selecetd function")
        setMessageType(Aux.messageOptions.ERROR_TYPE);
        setMessageString(Aux.messageOptions.ERR_FUNC_MESSAGE);
        return false
      }
    } catch (err) {
      let errorMessage
      console.error("Error during Submit transaction via MetaMask:", err);
      if (err.code === "ACTION_REJECTED") {
        errorMessage = Aux.messageOptions.CANCELED_MESSAGE;
      } else {
        errorMessage = Aux.messageOptions.ERROR_MESSAGE;
      }
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(errorMessage);
      return false
    }
  }

  function preSendDataToBlockchain(_userBlockchainData, _deposit) {
    const UP_ARR = Config.CHAIN_CONNECTIONS[Number(userMessage.sourceBlockchain)].universalUP
    const UP_ABI = UP_ARR.find(item => item.address === userMessage.UniversalPluginAdress).abi;
    // Create SC Object
    const UP_SC = new ethers.Contract(userMessage.UniversalPluginAdress, UP_ABI, _userBlockchainData.signer);
    setLoadingText('1. 🌊 Deposit object downloaded as JSON file. <br /> 2. 🤙 Go to Meta Mask and lock the value and message to SurferMonkey...');
    return UP_SC
  }

  async function postSendDataToBlockchain(_submitDeposit) {
    // Update Scan Link
    const currentChainInfo = await Aux.getCurrentChainProvider()
    const transLinkElem = document.getElementById("LockLink");
    const transactionLink = `${currentChainInfo.link}${_submitDeposit.hash}`;
    transLinkElem.href = transactionLink;
    transLinkElem.classList.remove("hidden");
    transLinkElem.innerHTML = `${currentChainInfo.name} scanner`;

    // Pop info message
    setMessageType(Aux.messageOptions.INFO_TYPE);
    setMessageString(Aux.messageOptions.INFO_MINTING_MESSAGE);
    setShowMessage(true)

    // Remove Loading overlay
    setIsLoading(false);
    setLoadingText("");
  }

  async function mainLock() {
    try {
      preLock()
      let okNet = await checkCorrectNet(userMessage)
      if (okNet === true) {
        const { userBlockchainData, deposit } = await sendDataToBackend()
        console.log("deposit: ", deposit)
        if (deposit !== false) {
          // Data structures created correctly
          // Before sending the data to the blockchain, we download the JSON data structures
          setMessageType(Aux.messageOptions.INFO_TYPE);
          setMessageString(Aux.messageOptions.INFO_DOWNLOAD_JSON_MESSAGE);
          Aux.downloadJSON("deposit.json", deposit);

          // Now we proceed with the message and value lock into SurferMonkey
          let UP_SC = preSendDataToBlockchain(userBlockchainData, deposit)
          // Submit deposit
          let submitDepositTX = await settleTX(UP_SC, deposit)
          if (submitDepositTX !== false) {
            console.log("Deposit TX sent! ", submitDepositTX)

            await postSendDataToBlockchain(submitDepositTX)
            await submitDepositTX.wait()

            setMessageType(Aux.messageOptions.SUCCES_TYPE);
            setMessageString(Aux.messageOptions.SUCCES_MINTED_MESSAGE);
          }
        }
      }
    } catch (err) {
      console.error("Error during transaction:", err);
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(Aux.messageOptions.ERROR_MESSAGE_2);
    }
    // Final touches
    setShowMessage(true)
    endLock()
  }

  return (
    <div className="Lock">
      <h2 class="white-text">Transfer the asset and message to SuferMonkey</h2>

      {/* Lock Button */}
      <div className="button-container">
        <button className="primary-button" id="LockButton" onClick={mainLock}>Send it!</button>
      </div>
      <div className="link-container">
        <a href="" className="hidden link-container link-text-color" target="_blank" rel="noreferrer" id="LockLink">Link Text</a>
      </div>
    </div>
  );
}

export default Lock;