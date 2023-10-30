/* global BigInt */
import React, { useState } from 'react';
import { ethers } from 'ethers'
import '../styles/Approve.css';
import * as Aux from '../tools/Aux.js';
import * as Config from '../config.js';
import ERC0_ABI from '../Auxiliar/UsdcABI.json';


function Approve({ userMessage, setIsLoading, setMessageString, setMessageType, setShowMessage, setLoadingText }) {

  // Destructure userIntention to get the tokenAddress and amount
  //const tokenAddressString = userMessage.depositPublicDataParams.ERC20_SC;
  const tokenAddress = userMessage.depositPublicDataParams.ERC20_SC;//tokenAddressString.slice(0, 6) + '...' + tokenAddressString.slice(-6);

  let amount = userMessage.depositPublicDataParams.amount;
  amount = Aux.stringToBigInt(amount)
  const amountFormat = Aux.formatBigInt(amount, userMessage.decimals, userMessage.decimals)
  const amountFormatST = amountFormat + ""

  async function checkCorrectNet(_userMessage) {
    const currentChainInfo = await Aux.getCurrentChainProvider()
    if (currentChainInfo.networkId !== Config.CHAIN_CONNECTIONS[_userMessage.sourceBlockchain].networkId) {
      setMessageType(Aux.messageOptions.ERROR_TYPE);
      setMessageString(Aux.messageOptions.WRONG_NET_MESSAGE);
      return false
    }
    return true
  }

  function preApprove() {
    const transLinkElem = document.getElementById("ApproveLink");
    const approveButtonElem = document.getElementById("ApproveButton");

    approveButtonElem.classList.add("disabled");
    approveButtonElem.setAttribute("disabled", true);
    transLinkElem.classList.add("hidden");

    // Display loading status
    setIsLoading(true);
    setLoadingText('🌊 Go to Meta Mask and Approve Token... 🤙');
    setShowMessage(false)
  }

  async function postApprove(transaction) {
    //const currentChainInfo = Config.CHAIN_CONNECTIONS[Number(userMessage.sourceBlockchain)];
    const currentChainInfo = await Aux.getCurrentChainProvider()
    const transLinkElem = document.getElementById("ApproveLink");
    const approveButtonElem = document.getElementById("ApproveButton");

    const transactionLink = `${currentChainInfo.link}${transaction.hash}`;
    transLinkElem.href = transactionLink;
    transLinkElem.classList.remove("hidden");
    transLinkElem.innerHTML = `${currentChainInfo.name} scanner`;
    //approveButtonElem.innerHTML = "Transaction is getting added to the Blockchain...";
    setMessageType(Aux.messageOptions.INFO_TYPE);
    setMessageString(Aux.messageOptions.INFO_MINTING_MESSAGE);
    setShowMessage(true)

    setIsLoading(false);
    setLoadingText("");
    //setShowMessage(false);
  }

  function endApprove() {
    setIsLoading(false);
    setLoadingText("");
    const approveButtonElem = document.getElementById("ApproveButton");
    //approveButtonElem.innerHTML = "Approve";
    approveButtonElem.classList.remove("disabled");
    approveButtonElem.removeAttribute("disabled");
  }

  async function getApproveSignature() {
    try {
      preApprove()
      let okNet = await checkCorrectNet(userMessage)
      if (okNet === true) {
        const UP_ADDRESS = userMessage.UniversalPluginAdress
        // Get Contract
        const provider = new ethers.BrowserProvider(window.ethereum, "any");
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(tokenAddress, ERC0_ABI, signer);
        // Approve ERC20
        const approveERC20 = await contract.approve(UP_ADDRESS, amount, { value: 0 });
        await postApprove(approveERC20)
        console.log("Init approve", approveERC20)
        await approveERC20.wait()
        console.log("Finalized ", approveERC20)
        setMessageType(Aux.messageOptions.SUCCES_TYPE);
        setMessageString(Aux.messageOptions.SUCCES_APPROVED_MESSAGE);
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
    //Reset elements
    setShowMessage(true)
    endApprove()
  }

  return (
    <div className="Approve">
      <h2>Let's give permission for SurferMonkey to use the asset</h2>

      <div className="input-container">
        {/* Token Address Input */}
        <label>
          Token address
          <input
            type="text"
            value={tokenAddress}
            readOnly
            disabled  // Disable the input
            placeholder="Token address"
          />
        </label>

        {/* Amount Input */}
        <label>
          Amount (base unit)
          <input
            type="text"
            value={amountFormatST}
            readOnly
            disabled  // Disable the input
            placeholder="Amount (base unit)"
          />
        </label>
      </div>

      {/* Approve Button */}
      <div className="button-container">
        <button className="secondary-button" onClick={getApproveSignature} id="ApproveButton">Approve</button>
      </div>
      <div className="link-container">
        <a href="" className="hidden" target="_blank" rel="noreferrer" id="ApproveLink">Link Text</a>
      </div>
    </div>
  );
}

export default Approve;