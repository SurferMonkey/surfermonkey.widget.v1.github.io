/* eslint-disable */
import React from 'react';
import { ethers } from 'ethers'
import '../styles/Lock.css';
import * as Aux from '../tools/Aux.js';
import * as Config from '../config.js';
import axios from 'axios'
import * as surfer from '../tools/SurferMonkeyLibBundle.js';

// ZKP Artifacts
const CIRCUIT = process.env.PUBLIC_URL + '/withdraw.wasm';
const PROVING_KEY = process.env.PUBLIC_URL + "/withdraw_0001.zkey"

function SettleZKP({ globalVariable, setIsLoading, setMessageString, setMessageType, setShowMessage, setLoadingText }) {

  async function checkCorrectNet(_userMessage) {
    try {
      const currentChainInfo = await Aux.getCurrentChainProvider()
      if (currentChainInfo.networkId !== Config.CHAIN_CONNECTIONS[_userMessage.destinationChainID].networkId) {
        setMessageType(Aux.messageOptions.ERROR_TYPE);
        setMessageString(Aux.messageOptions.WRONG_NET_MESSAGE);
        return false
      }
      return true

    } catch (err) {
      console.log("ERR check net, Not supported Net: ", err)
      return false
    }
  }

  function postSubmitZKP() {
    setIsLoading(false);
    setLoadingText('');
    const LockButton = document.getElementById("SettleZKP");
    LockButton.classList.remove("disabled");
    LockButton.removeAttribute("disabled");

  }

  function preSubmit() {
    const transLinkElem = document.getElementById("ZKPLink");
    const approveButtonElem = document.getElementById("SettleZKP");

    approveButtonElem.classList.add("disabled");
    approveButtonElem.setAttribute("disabled", true);
    transLinkElem.classList.add("hidden");

    // Display loading status
    setIsLoading(true);
    setLoadingText('Loading...');
    setShowMessage(false)
  }

  async function fetchZKPInputSignals(depositJSON) {
    try {
      const uri = `${Config.backend}counter/zkp/${JSON.stringify(depositJSON)}`;
      const response = await axios.get(uri);
      const data = response.data;
      data.sourceChainId = data.sourceChainId.toString();
      return data;
    } catch (err) {
      console.log("ERR fetch ZKP signals", err)
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(Aux.messageOptions.WRONG_FETCH_ZKP_SIGNALS);
      return false;
    }
  }

  async function generateZKP(_ZKP_SIGNALS) {
    try {
      setLoadingText('Creating ZKP...');

      const start = performance.now();
      const zkp = await window.surfer.createProof(_ZKP_SIGNALS, CIRCUIT, PROVING_KEY);

      console.log("My public Signals", zkp.publicSignals)
      const elapsedTime = (performance.now() - start) / 1000;
      const elapsedTimeString = `ZKP generation completed in ${elapsedTime.toFixed(3)} seconds`
      console.log(elapsedTimeString);
      setLoadingText(`Go to MetaMask... <br /> ${elapsedTimeString}`);
      return zkp;
    } catch (err) {
      console.log("Err creating ZKP", err)
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(Aux.messageOptions.ERR_CREATING_ZKP);
      return false;
    }
  }

  async function generateSolidityData(_zkp) {
    try {
      //{ a, b, c, Input }
      const solidityData = await window.surfer.createSoliditydata(_zkp.proof, _zkp.publicSignals);
      return solidityData
    } catch (err) {
      console.log("Err creating Solidity Data", err)
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(Aux.messageOptions.ERR_CREATING_SOLIDITY_DATA);
      return false;
    }
  }

  async function sendDataToBlockchain(_solidityData, _deposit) {
    try {
      // Obtain user signer
      const userBlockchainData = await Aux.obtainUserBlockchainData()
      console.log("USER BLOCKCAHIND!", userBlockchainData)
      // Send withdraw transaction to target chain
      console.log("HOLAAAAA", _deposit)
      const chainInfo = Config.CHAIN_CONNECTIONS[Number(_deposit.sourceChainID)]
      console.log("BBBBBB", chainInfo)
      const TARGET_MIXER = new ethers.Contract(chainInfo.contractMixer, chainInfo.abiMixer.abi, userBlockchainData.signer);
      console.log("CCCC", TARGET_MIXER)
      const tx = await TARGET_MIXER.withdraw(
        _solidityData.a,
        _solidityData.b,
        _solidityData.c,
        _solidityData.Input,
        _deposit.payloadData, // bytes call data
        _deposit.targetSC, // Address of the target SC
        _deposit.userPublicData, // bytes
        parseInt(_deposit.destinationChainID), // uint16
        _deposit.dAppGlobalHash, //bytes32
        2,// Target Function: ERC20
        { value: 0, gasLimit: 2000000 }
      )
      return tx
    } catch (err) {
      let errorMessage
      if (err.code === "ACTION_REJECTED") {
        errorMessage = Aux.messageOptions.CANCELED_MESSAGE;
      } else {
        errorMessage = Aux.messageOptions.ERROR_MESSAGE;
      }
      console.log("Err Sending data to the blockchain", err)
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(errorMessage);
      return false;
    }
  }

  async function postSubmitDataBlockchain(_tx) {
    try {
      // Update Scan Link
      const currentChainInfo = await Aux.getCurrentChainProvider()
      const transLinkElem = document.getElementById("ZKPLink");
      const transactionLink = `${currentChainInfo.link}${_tx.hash}`;
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

      // wait for transaciton minted
      await _tx.wait()
      return true
    } catch (err) {
      console.log("Err waiting for tx to get minted", err)
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(Aux.messageOptions.ERR_WAIT_MINT);
      return false;
    }
  }

  async function submitZKP() {
    console.log("The user message: ", globalVariable)
    try {
      preSubmit()
      // Check the correct user Network with the deposit object 
      let okNet = await checkCorrectNet(globalVariable)
      if (okNet === true) {
        const ZKP_SIGNALS = await fetchZKPInputSignals(globalVariable)
        console.log("USER ZKP INPUT SIGNALS!: ", ZKP_SIGNALS)
        if (ZKP_SIGNALS !== false) {
          const zkp = await generateZKP(ZKP_SIGNALS);
          if (zkp !== false) {
            const solidityData = await generateSolidityData(zkp)
            if (solidityData !== false) {
              const tx = await sendDataToBlockchain(solidityData, globalVariable)
              if (tx !== false) {
                const mintTx = await postSubmitDataBlockchain(tx)
                if (mintTx !== false) {
                  setMessageType(Aux.messageOptions.SUCCES_TYPE);
                  setMessageString(Aux.messageOptions.SUCCES_MINTED_zkSNARK);
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.log("ERR", err)
    }
    // Final touches
    setShowMessage(true)
    postSubmitZKP()
  }

  return (
    <div className="Lock">
      <h2 className="white-text">Submit your ZKP</h2>
      <div className="button-container">
        <button className="primary-button" onClick={submitZKP} id="SettleZKP">Go!</button>
      </div>
      <div className="link-container">
        <a href="" className="hidden link-container link-text-color" target="_blank" rel="noreferrer" id="ZKPLink">Link Text</a>
      </div>
    </div>
  );
}

export default SettleZKP;