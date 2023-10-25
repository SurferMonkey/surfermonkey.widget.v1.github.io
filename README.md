![SurferMonkey Logo](./public/SM-Full-Reverse.png)

# SurferMonkey Widget Integration!
SurferMonkey provides developers with a streamlined way to integrate Anonymous and Compliant capabilities into their applications. By leveraging our widget, you can enable users to perform actions across multiple blockchains with ease.

## Integration Levels

1. **Widget URL**: Embed our widget directly using a URL.
2. **React Component**: Clone the Widget Repo and integrate the SurferMonkey widget as a React component into your dApps.
3. **SurferMonkey SDK**: For advanced integrations and custom use-cases, use the SurferMonkey SDK.

## Prerequisites

- Familiarity with JavaScript and React.
- A working knowledge of blockchain concepts.

## Data Structures

Before sending data to the SurferMonkey widget, ensure you've populated the following structures:

```javascript
const ERC20_SC = ""; // Only for ERC20, blank string if not used. Hex String
const targetBlockchainString = ""; // Refer config for supported blockchains. String
const sourceBlockchainString = "";
const selectedFunc = 1; // (Native: nativeFunc = 1) OR (ERC20: erc20Func = 2). Integer
const functionHeader = ""; // Function header from the target function. String
const functionName = ""; // Function name from the target function. String
const payloadParmsArr = []; // Target function parameters. Array of strings
const amount = 1; // Value amount (ERC20 or Native) to be locked in the system. UINT256
const targetSC = ""; // Target Smart Contract Address. Hex String
const userEOA = ""; // User's EOA. Hex String
const userEOA = ""; // User's EOA. Hex String
const UniversalPluginGlobalHash = ""; // The Global Hash for that UP on that blockchain. String
```

## Universal Plugin (UP) Global Hash

The current version uses a constant value for the Universal Plugin Global Hash, unique for each supported blockchain. In our upcoming release, we're interconnecting the Universal Plugin Global Hashes from various blockchains to provide a unified Global Hash. This enhancement will activate anonymous and compliant cross-chain messaging and intent-based messages. Additionally, we'll support multiple Universal Plugin versions within the same blockchain, allowing configurations tailored to specific ecosystems (e.g., KYC and KYB exclusive interactions).

## Documentation

In-depth documentation is in active development. Stay tuned for comprehensive guides, API references, and more.

## Feedback and Support
Found an issue or have suggestions? Reach out to our [support team](https://www.surfermonkey.io/) or open an issue on this repository.

## Extras
- To open links in a new tab, use Ctrl+Click or Cmd+Click.

## License

[All Rights Reserved](#)