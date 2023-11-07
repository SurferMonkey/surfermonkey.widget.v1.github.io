import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SurferMonkey from './SurferMonkey';

const root = ReactDOM.createRoot(document.getElementById('root'));
window.addEventListener('message', receiveMessage, false);

// This is the object sent by the React App to this Widget
// It is init with dummy data
let userMessage1 = 
{
  "view": 1,
  "selectedFunc": 2,
  "targetBlockchain": "2",
  "sourceBlockchain": "2",
  "decimals": 18,
  "depositPublicDataParams": {
    "ERC20_SC": "0xE48e9019a0a99f5aFE296806Aa79d94F05096C69",
    "amount": "100000000000000",
    "func": 2
  },
  "payload_data": {
    "functionHeader": "function transfer(address recipient, uint256 amount)",
    "functionName": "transfer",
    "payloadParmsArr": [
      "0x2d9e3E2774597d13eDB1d8D8694ea635Ef3ac596",
      "100000000000000"
    ]
  },
  "targetSC": "0xE48e9019a0a99f5aFE296806Aa79d94F05096C69",
  "UniversalPluginGlobalHash": "0xa8d9ac0e570be234ab694443c29562cb8c0e011f1338550cec163939ca52325d",
  "UniversalPluginAdress": "0x8896b9acBdfFf53e1fAb60e34eb0eC7245b69631",
  "EOA": "0xDFeA3AA339836650a6BCC7B64720aBA82EE5cafb"
}

// Native deposit
let userMessage2 = 
{
  "view": 1,
  "selectedFunc": 1,
  "targetBlockchain": "2",
  "sourceBlockchain": "2",
  "decimals": 18,
  "depositPublicDataParams": {
    "amount": "1000000000000000",
    "func": 1
  },
  "payload_data": {
    "functionHeader": "function transferEth(address targetAddress, uint256 amount)",
    "functionName": "transferEth",
    "payloadParmsArr": [
      "0x2d9e3E2774597d13eDB1d8D8694ea635Ef3ac596",
      "1000000000000000"
    ]
  },
  "targetSC": "0xA6D26C07dCE2AB9910F0588B010af1629D1b4fb3",
  "UniversalPluginGlobalHash": "0xa8d9ac0e570be234ab694443c29562cb8c0e011f1338550cec163939ca52325d",
  "UniversalPluginAdress": "0x8896b9acBdfFf53e1fAb60e34eb0eC7245b69631",
  "EOA": "0xDFeA3AA339836650a6BCC7B64720aBA82EE5cafb"
}

// init user message
let userMessage = {}

function receiveMessage(event) {
  if (event.data.type !== 'SurferMonkeyIntent_a4REBKpy4d2kkdxivbaoPirjTnNj3Z') {
      return;  // Ignore messages that aren't tagged with 'SurferMonkeyIntent'
  }
  console.log("Widget received message: ", event)
  userMessage = event.data.data;  // Access the 'data' field within the received message object
  renderApp();  // re-render the app with the new data
}

// Developer: Send to SurferMonkey Widget (React Component), the "userMessage"
function renderApp() {
  root.render(
      <React.StrictMode>
          <SurferMonkey userMessage={userMessage} />
      </React.StrictMode>
  );
}

renderApp();

/*
const dataToSendBack = { dummy:dummy};
window.parent.postMessage(dataToSendBack, '*');
*/