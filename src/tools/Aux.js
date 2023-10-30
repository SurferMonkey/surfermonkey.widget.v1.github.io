/* global BigInt */
import * as Config from '../config.js';
import { ethers } from 'ethers'

export function formatBigInt(bigIntNumber, scaleFactor, decimalPlaces) {
    // Convert BigInt to string and move the decimal point
    const decimalValue = parseFloat(bigIntNumber.toString().slice(0, -scaleFactor) + "." + bigIntNumber.toString().slice(-scaleFactor));

    // Format the result with the specified decimal points
    return decimalValue.toFixed(decimalPlaces);
}

export function stringToBigInt(value) {
    if (typeof value === 'string' && value.endsWith('n')) {
        value = value.slice(0, -1);  // Remove the last character ("n")
    }
    return BigInt(value);
}

export async function getCurrentChainProvider() {
    // Get the current network ID from the provider
    //const chainNetworkId = Number(window.ethereum.networkVersion);
    let chainNetworkId = await window.ethereum.request({ method: 'eth_chainId' });

    // From Hex to Number, better Number, as Hex can be CAPS
    chainNetworkId = Number(chainNetworkId)
    const Chain = Object.keys(Config.CHAIN_CONNECTIONS).find(key => Config.CHAIN_CONNECTIONS[key].networkId === chainNetworkId);
    console.log(Config.CHAIN_CONNECTIONS[Chain])
    return Config.CHAIN_CONNECTIONS[Chain]
}

export const messageOptions = {
    ERROR_TYPE: "error",
    SUCCES_TYPE: 'success',
    INFO_TYPE: "info",
    SUCCES_APPROVED_MESSAGE: "🎉 Approved tokens Ok!✨",
    SUCCES_MINTED_MESSAGE: "🎉 Anonymous transaction minted! 🔒✨<br />🚀 zkMiners will pick up your transaction in 1-2 minutes ⏲️⛏️",
    SUCCES_MINTED_zkSNARK: "🎉 Anonymous transaction minted! 🔒✨<br />🚀 Your zkSNARK transaction has been successfully settled 🎊💫",
    INFO_MINTING_MESSAGE: "Transaction pending, click in the scan link",
    ERROR_MESSAGE: "Oops! An error occurred during the transaction 😔",
    WRONG_NET_MESSAGE: "Oops! Wrong Meta Mask Network. Check your destination Chain in DevLogs",
    CANCELED_MESSAGE: "Oops! You canceled the transaction",
    ERR_DATA_CREATE_MESSAGE: "Oops! There was an error while creating the data structures"
}

export async function connectWallet(){
    // Initialize the blockchain provider
    const provider = new ethers.BrowserProvider(window.ethereum, "any");
    // Request user to connect their wallet
    let x = await provider.send("eth_requestAccounts", []);
}

export async function obtainUSerEOA() {
    // Initialize the blockchain provider
    const provider = new ethers.BrowserProvider(window.ethereum, "any");
    // Obtain the signer from the connected wallet
    const signer = await provider.getSigner();

    // Fetch the connected wallet's address
    const address = await signer.getAddress();
    return address
}