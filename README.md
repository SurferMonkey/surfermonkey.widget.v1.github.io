![SurferMonkey Logo](./src/Images/SurferMonkey.png)

# SurferMonkey Widget Integration Guide
**Intent based Privacy, Compliance, Agnostic Actions and Cross-chain intents**
<br> Welcome to the SurferMonkey Widget Integration Guide! This document provides you with step-by-step instructions to integrate the SurferMonkey Widget, allowing your application to facilitate anonymous and compliant blockchain transactions across multiple blockchains effortlessly.

## Quick Start
Integrating the SurferMonkey Widget is straightforward. Follow these steps to get started:

### Step 1: Import the Widget
Embed the widget directly into your HTML or React application:

```javascript
<iframe src="https://surfermonkey.github.io/surfermonkey.widget.v1.github.io/" frameborder="0" title="SurferMonkey Widget" allowfullscreen></iframe>
```
For React applications, you can incorporate the widget as a component:

```javascript
import SurferMonkeyWidget from './SurferMonkeyWidget';
```

### Step 2: Prepare User Message
Define the user's intent by preparing a userMessage object. This object will inform the widget's behavior:

```javascript
const userMessage = {
  // Fill in with necessary properties as per documentation
};
```

### Step 3: Integrate the Widget
Embed the widget into your application, passing the userMessage as a prop:

```javascript
<SurferMonkeyWidget userMessage={userMessage} onClose={handleClose} />
```

## Understanding User Messages
User intentions for the SurferMonkey Widget can involve ERC20 tokens or native blockchain assets. Each requires specific parameters for execution. Here are detailed explanations and examples for both types:

**ERC20 Token Transaction Example (userMessage1)**
<br> This message indicates an ERC20 token transaction where the `selectedFunc` is set to `2`, signaling an ERC20 transaction. The amount is specified with respect to the token's decimal places. The functionHeader and functionName outline the ERC20 transfer function to be called, with parameters for the recipient address and amount.
<br> EXAMPLE: For an ERC20 transfer, you can define ANY action involed with ANY ERC20.

```javascript
let userMessage1 = {
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
    "payloadParmsArr": ["0x2d9e3E2774597d13eDB1d8D8694ea635Ef3ac596", "100000000000000"]
  },
  "targetSC": "0xE48e9019a0a99f5aFE296806Aa79d94F05096C69",
  "UniversalPluginGlobalHash": "0xa8d9ac0e570be234ab694443c29562cb8c0e011f1338550cec163939ca52325d",
  "UniversalPluginAdress": "0x8896b9acBdfFf53e1fAb60e34eb0eC7245b69631",
  "EOA": "0xDFeA3AA339836650a6BCC7B64720aBA82EE5cafb"
};
```

**Native Asset Transaction Example (userMessage2)**
<br> This message describes a transaction involving native blockchain assets, with `selectedFunc` set to `1`. It outlines the intention to transfer native assets, specifying the amount and target address.
<br> EXAMPLE: For an native value transfer (MATIC, ETH, etc). You can define ANY intention with Native value.
```javascript
let userMessage2 = {
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
    "payloadParmsArr": ["0x2d9e3E2774597d13eDB1d8D8694ea635Ef3ac596", "1000000000000000"]
  },
  "targetSC": "0xA6D26C07dCE2AB9910F0588B010af1629D1b4fb3",
  "UniversalPluginGlobalHash": "0xa8d9ac0e570be234ab694443c29562cb8c0e011f1338550cec163939ca52325d",
  "UniversalPluginAdress": "0x8896b9acBdfFf53e1fAb60e34eb0eC7245b69631",
  "EOA": "0xDFeA3AA339836650a6BCC7B64720aBA82EE5cafb"
}
```

**ZKP settlment and creation**
<br>  This message describes the field that the it shall have, in order to prompt the view for the ZKP settlment and creation. Note that the `view` field is set to `2`. No further information is required to prompt the ZKP creation view in the Widget.
```javascript
let userMessage2 = {
  "view": 2
}
```

## SurferMonkey Widget Data Structures

The `userMessage` object is designed to encapsulate all necessary information for initiating anonymous and compliant blockchain transactions through the SurferMonkey Widget. Below is a detailed explanation of each field within the `userMessage` object:

- **view**: Indicates the Widget view mode. A value of `1` is used for initiating anonymous and compliant blockchain intentions. And a vlue of `2`for the ZKP creation and submission. When a value of `2` is used, no more data is necessary on the message object.
- **selectedFunc**: Specifies the type of transaction. A value of `1` indicates a Native value agnostic intent with MATIC, ETH, etc. A value of `2` indicates an ERC20 token agnostic intent. You can use `ANY` ERC20.
- **targetBlockchain**: The blockchain ID where the target smart contract resides. For example, `2` could represent a specific blockchain such as Polygon.
- **sourceBlockchain**: The blockchain ID from which the transaction originates. Similarly, `2` could also represent a specific blockchain like Polygon.
- **decimals**: The number of decimal places for the ERC20 token of the Native asset. Typically, `18` is used for many ERC20 tokens. And `18`is used for the EVM compatible chains. Always check on the porper documentation how many decimals is the asset using.
- **depositPublicDataParams**: Contains parameters for the deposit, including:
  - **ERC20_SC**: The Smart Contract address of the ERC20 token involved in the transaction. `Field only` used in the ERC20 intent mode. 
  - **amount**: The amount of the token/asset to be transferred, adjusted for decimals.
  - **func**: Mirrors the `selectedFunc` to indicate an ERC20 transaction.
- **payload_data**: Information about the function to be called on the target smart contract, including:
  - **functionHeader**: The signature of the function to be called.
  - **functionName**: The name of the function.
  - **payloadParmsArr**: An array containing the parameters for the function call, for example as the recipient's address and the amount. The array value order, shall be the same as the ones defined in the functionHeader.
- **targetSC**: The target Smart Contract address where the transaction is executed. For `ERC20 transfers`, it's the token's contract address.
- **UniversalPluginGlobalHash**: A security parameter that is a unique identifier for the Universal Plugin on the target blockchain.
- **UniversalPluginAdress**: The address of the Universal Plugin Smart Contract on the target blockchain.
- **EOA**: The External Owned Account address initiating the transaction.

This structure is essential for ensuring that transactions initiated through the SurferMonkey Widget are processed correctly, adhering to privacy and compliance requirements.


## Universal Plugin Address and Hash
SurferMonkey utilizes a Universal Plugin System, currently live in Polygon Mumbai testnet. Each blockchain supported by SurferMonkey has a unique Universal Plugin Smart Contract Address and Global Hash.

The current version uses a constant value for the Universal Plugin Global Hash, unique for each supported blockchain. In our upcoming release, we're interconnecting the Universal Plugin Global Hashes from various blockchains to provide a unified Global Hash. This enhancement will activate anonymous and compliant cross-chain messaging and intent-based messages. Additionally, we'll support multiple Universal Plugin versions within the same blockchain, allowing configurations tailored to specific ecosystems (e.g., KYC and KYB exclusive interactions).

1. **Polygon Mumbai Testnet Values:**
- Universal Plugin Address: `0x8896b9acBdfFf53e1fAb60e34eb0eC7245b69631`
- Universal Plugin Global Hash: `0xa8d9ac0e570be234ab694443c29562cb8c0e011f1338550cec163939ca52325d`
<br> These values are essential for ensuring security and uniqueness across different blockchains. The Universal Plugin System facilitates cross-chain messaging and intent-based messages, providing a foundation for anonymous and compliant transactions.

## Integration Levels

1. **Widget URL**: Embed our widget directly using a URL.
2. **React Component**: Clone the Widget Repo and integrate the SurferMonkey widget as a React component into your dApps.
3. **SurferMonkey SDK**: For advanced integrations and custom use-cases, use the SurferMonkey SDK.

## Widget URL Integration

The SurferMonkey Widget is hosted and maintained on GitHub pages. You can directly integrate the widget into your dApp using the following URL:

[https://surfermonkey.github.io/surfermonkey.widget.v1.github.io/](https://surfermonkey.github.io/surfermonkey.widget.v1.github.io/)

## Documentation

In-depth documentation is in active development. Stay tuned for comprehensive guides, API references, and more.

## Feedback and Support
Found an issue or have suggestions? Reach out to our [Twitter: @SurferMonkeyHQ](https://twitter.com/SurferMonkeyHQ)
<br> Or via our [support team](https://www.surfermonkey.io/)
<br> Or open an issue on this repository.

## Disclaimer

**Work in Progress:** This software is currently under active development and may undergo significant changes.

**No Warranty:** THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**User Responsibility:** Use of this software is at your own risk. Users are responsible for their own actions while using the software. Always ensure that you have backups of all data and have reviewed the code or functionality to determine its suitability for your needs.

## License

[All Rights Reserved](#)