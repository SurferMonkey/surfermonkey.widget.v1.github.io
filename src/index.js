import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SurferMonkey from './SurferMonkey';

const root = ReactDOM.createRoot(document.getElementById('root'));
window.addEventListener('message', receiveMessage, false);

function receiveMessage(event) {
  if (event.data.type !== 'SurferMonkeyIntent_a4REBKpy4d2kkdxivbaoPirjTnNj3Z') {
      return;  // Ignore messages that aren't tagged with 'SurferMonkeyIntent'
  }
  console.log("Widget received message: ", event)
  userMessage = event.data.data;  // Access the 'data' field within the received message object
  renderApp();  // re-render the app with the new data
}

// This is the object sent by the React App to this Widget
let userMessage = {}

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