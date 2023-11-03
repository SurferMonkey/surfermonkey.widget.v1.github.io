![SurferMonkey Logo](./src/Images/SurferMonkey.png)

# SurferMonkey Widget Integration
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
const targetBlockchain = 1; // Refer config for supported blockchains. Integer
const sourceBlockchain = 1; // Refer config for supported blockchains. Integer
const selectedFunc = 1; // (Native: nativeFunc = 1) OR (ERC20: erc20Func = 2). Integer
const functionHeader = ""; // Function header from the target function. String
const functionName = ""; // Function name from the target function. String
const payloadParmsArr = []; // Target function parameters. Array of strings
const amount = 1; // Smallest denomination unit amount (ERC20 or Native). UINT256
const targetSC = ""; // Target Smart Contract Address. Hex String
const UniversalPluginGlobalHash = ""; // The Global Hash for that UP on that blockchain. Hex String
```

## Widget URL Integration

The SurferMonkey Widget is hosted and maintained on GitHub pages. You can directly integrate the widget into your dApp using the following URL:

[https://surfermonkey.github.io/surfermonkey.widget.v1.github.io/](https://surfermonkey.github.io/surfermonkey.widget.v1.github.io/)

## Universal Plugin (UP) Global Hash

The current version uses a constant value for the Universal Plugin Global Hash, unique for each supported blockchain. In our upcoming release, we're interconnecting the Universal Plugin Global Hashes from various blockchains to provide a unified Global Hash. This enhancement will activate anonymous and compliant cross-chain messaging and intent-based messages. Additionally, we'll support multiple Universal Plugin versions within the same blockchain, allowing configurations tailored to specific ecosystems (e.g., KYC and KYB exclusive interactions).

## Documentation

In-depth documentation is in active development. Stay tuned for comprehensive guides, API references, and more.

## Feedback and Support
Found an issue or have suggestions? Reach out to our [Twitter: @SurferMonkeyHQ](https://twitter.com/SurferMonkeyHQ). 
Or via our [support team](https://www.surfermonkey.io/)
Or open an issue on this repository.

## Disclaimer

**Work in Progress:** This software is currently under active development and may undergo significant changes.

**No Warranty:** THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**User Responsibility:** Use of this software is at your own risk. Users are responsible for their own actions while using the software. Always ensure that you have backups of all data and have reviewed the code or functionality to determine its suitability for your needs.

## License

[All Rights Reserved](#)
```

This updated README contains instructions for developer maintenance as well as the direct URL for widget integration.