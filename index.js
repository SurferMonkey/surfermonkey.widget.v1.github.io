import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SurferMonkey from './widget_src/SurferMonkey';
import * as configWidget from './widget_src/configWidget';

const root = ReactDOM.createRoot(document.getElementById('root'));

// ***********************************************
// Developer: START Capture data from the user
// ***********************************************

const ERC20_SC = "" //  Only used for ERC20, blank string if not used. Hex String
const targetBlockchainString = "" // Check config file for supported blockchains. String
const sourceBlockchainString = ""
const selectedFunc = 1// (Native: nativeFunc = 1) OR (ERC20: erc20Func = 2). Integer
const functionHeader = "" // The function header from the target function. String
const functionName = "" // The function name from the target function. String
const payloadParmsArr = [] // The target function parameters. Array of strings
const amount = 1 // The amount of value of ERC20 or Native to be locked in the System. UINT256
const targetSC = "" // The target Smart Contract Address. Hex String
const userEOA = "" // the User EOA. Hex String

// ***********************************************
// Developer: END Capture data
// ***********************************************


// ----------------------------------------------


// ***********************************************
// Developer: START DO NOT MODIFY - DO NOT MODIFY
// ***********************************************
const UniversalPluginGlobalHash = configWidget.UP_V1 // Universal Plugin Version 1
const userMessage = configWidget.createUserMessage(
  selectedFunc,
  targetBlockchainString,
  sourceBlockchainString,
  ERC20_SC,
  amount,
  functionHeader,
  functionName,
  payloadParmsArr,
  targetSC,
  userEOA,
  UniversalPluginGlobalHash
)

// ***********************************************
// Developer: END DO NOT MODIFY - DO NOT MODIFY
// ***********************************************


// ----------------------------------------------

// Developer: Send to SurferMonkey Widget (React Component), the "userMessage"
root.render(
  <React.StrictMode>
    <SurferMonkey userMessage={userMessage} />
  </React.StrictMode>
);