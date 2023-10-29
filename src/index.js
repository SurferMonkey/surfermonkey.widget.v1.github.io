import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SurferMonkey from './SurferMonkey';

const root = ReactDOM.createRoot(document.getElementById('root'));
window.addEventListener('message', receiveMessage, false);

// This is the object sent by the React App to this Widget
// It is init with dummy data
let userMessage = 
{
  "selectedFunc": 2,
  "targetBlockchain": "2",
  "sourceBlockchain": "2",
  "decimals": 18,
  "depositPublicDataParams": {
    "ERC20_SC": "0xE48e9019a0a99f5aFE296806Aa79d94F05096C69",
    "amount": "1500000000000000000n",
    "func": 2
  },
  "payload_data": {
    "functionHeader": "function transfer(address recipient, uint256 amount)",
    "functionName": "transfer",
    "payloadParmsArr": [
      "0xDFeA3AA339836650a6BCC7B64720aBA82EE5cafb",
      "1000000000000000000"
    ]
  },
  "targetSC": "0xE48e9019a0a99f5aFE296806Aa79d94F05096C69",
  "UniversalPluginGlobalHash": "0x6e31a2b2b010bedba30215337115763a20f6cba6f8cf5317641eddd923e8542c",
  "UniversalPluginAdress": "0x491EEFbf2e4AEF483B545EE91385b66d89e0913b"
}

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