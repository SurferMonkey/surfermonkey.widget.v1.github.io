/* eslint-disable */
import React from 'react';
import '../styles/Lock.css';
import * as Aux from '../tools/Aux.js';
import * as Config from '../config.js';
import axios from 'axios'
import * as surfer from '../tools/SurferMonkeyLibBundle.js';

// ZKP Artifacts
const CIRCUIT = process.env.PUBLIC_URL + '/withdraw.wasm';
const PROVING_KEY =  process.env.PUBLIC_URL + "/withdraw_0001.zkey"

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
      console.log("FLAAG AA")
      setLoadingText('Creating ZKP...');
      console.log("FLAAG BB")

      const start = performance.now();
      console.log("FLAAG CC")
      console.log(CIRCUIT)
      const zkp = await window.surfer.createProof(_ZKP_SIGNALS, CIRCUIT, PROVING_KEY);
      console.log("FLAAG DD")

      console.log("My public Signals", zkp.publicSignals)
      const elapsedTime = (performance.now() - start) / 1000;
      const elapsedTimeString = `ZKP generation completed in ${elapsedTime.toFixed(3)} seconds`
      console.log(elapsedTimeString);
      setLoadingText(elapsedTimeString);
      return zkp;
    } catch (err) {
      console.log("Err creating ZKP", err)
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(Aux.messageOptions.ERR_CREATING_ZKP);
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
            setMessageType(Aux.messageOptions.SUCCES_TYPE);
            setMessageString(Aux.messageOptions.SUCCES_MINTED_zkSNARK);
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