// If the function has native or erc20 value
export const nativeFunc = 1
export const erc20Func = 2

// Global Hash from Universal global plugin V1
export const UP_V1 = ""

// SurferMonkey supported blockchain IDs
export const CHAIN_IDS = {
    ETHEREUM: 1,
    POLYGON: 2,
    BSC: 3,
    TAIKO: 4,
    MANTA: 5,
    AVALANCHE: 6,
    ARBITRUM: 7,
    LINEA: 8,
    METIS: 9,
    OPTIMISM: 10,
    POLYGONZKEVM: 11,
    ZKSYNCERA: 12,
    SCROLL: 13,
    FUTURVERSE: 14,
    MANTLE: 15,
    BASE: 16,
    FANTOM: 17,
    CELO: 18,
    OASIS_SAPPHIRE: 19,
    EVMOS: 20,
    CRONOS: 21,
    ASTAR: 22
};

// Get the public params that the user sent, either native or erc20
export function getPublicParams(ERC20_SC, amount, func) {
    if (func === 1) {
        return { amount, func }
    }
    if (func === 2) {
        return { ERC20_SC, amount, func }
    }
}

// Create user message
export function createUserMessage(
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
) {
    const targetBlockchain = CHAIN_IDS[targetBlockchainString]
    const sourceBlockchain = CHAIN_IDS[sourceBlockchainString]
    const userMessage = {
        selectedFunc: selectedFunc,
        targetBlockchain: targetBlockchain,
        sourceBlockchain: sourceBlockchain,
        depositPublicDataParams: getPublicParams(ERC20_SC, amount, selectedFunc),
        payload_data: { functionHeader, functionName, payloadParmsArr },
        targetSC: targetSC,
        userEOA: userEOA,
        UniversalPluginGlobalHash: UniversalPluginGlobalHash
    }
    return userMessage
}