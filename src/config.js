import ABI_V1_General_Main from './Abi/UniversalPlugin.json'
import ABI_MIXER_GENERAL from './Abi/SurferMonkeyMixer.json'
const ABI_V1_General = ABI_V1_General_Main.abi

// Define constants for chain IDs
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

export const CHAIN_CONNECTIONS = {
    [CHAIN_IDS.ETHEREUM]: {
        name: "Ethereum",
        networkName: "Ethereum Sepolia",
        networkId: 11155111,
        networkIdHex: "0xaa36a7",
        contractMixer: "0x46730f7087F290C39b3ED1eB4cA81ce48664B9ac",
        
        link: "https://sepolia.etherscan.io/tx/",
        linkAddress: "https://sepolia.etherscan.io/address/",
        universalUP:
            [
                {
                    version: "v1",
                    address: "ETH - UP Address",
                    globalHash: "ETH - UP Global Hash",
                    abi: "abi"
                }
            ],
        supportedDapps: [
            {
                name: "Native Transfer",
                address: "Proxy SC Address",
                logo: "NaN",
                functions: [
                    {
                        header: "function transferEth(address targetAddress, uint256 amount)",
                        name: "transferEth"
                    }
                ]
            },
            {
                name: "ERC20 Transfer",
                logo: "NaN",
                functions: [
                    {
                        header: "function transfer(address recipient, uint256 amount)",
                        name: "transfer"
                    }
                ]
            },
        ],
        supportedTokens: []
    },
    [CHAIN_IDS.POLYGON]: {
        name: "Polygon",
        networkName: "Polygon Mumbai",
        networkId: 80001,
        networkIdHex: "0x13881",
        contractMixer: "0x98DAA62c02c047Bfa152B907f4DD16e2E9422A06",
        abiMixer: ABI_MIXER_GENERAL,
        link: "https://mumbai.polygonscan.com/tx/",
        linkAddress: "https://mumbai.polygonscan.com/address/",
        universalUP:
            [
                {
                    version: "v1",
                    address: "0x8896b9acBdfFf53e1fAb60e34eb0eC7245b69631",
                    globalHash: "0xa8d9ac0e570be234ab694443c29562cb8c0e011f1338550cec163939ca52325d",
                    abi: ABI_V1_General
                }
            ],
        supportedDapps: [
            {
                name: "Native Transfer",
                logo: "NaN",
                functions: [
                    {
                        header: "function transferEth(address targetAddress, uint256 amount)",
                        name: "transferEth"
                    }
                ]
            },
            {
                name: "ERC20 Transfer",
                logo: "NaN",
                functions: [
                    {
                        header: "function transfer(address recipient, uint256 amount)",
                        name: "transfer"
                    }
                ]
            },
        ],
        supportedTokens: [
            {
                name: "USDC",
                address: "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97",
                decimals: 6
            },
            {
                name: "SurfDummy",
                address: "0xE48e9019a0a99f5aFE296806Aa79d94F05096C69",
                decimals: 18
            }
        ]
    },
    [CHAIN_IDS.BSC]: {
        name: "Binance Smart Chain",
        networkName: "Binance Smart Test Chain",
        networkId: 97,
        networkIdHex: "0x61",
        contractMixer: "0x980c43C046F7B14A5eFE774f4958e7680dE365da",
        
        link: "https://testnet.bscscan.com/tx/",
        linkAddress: "https://testnet.bscscan.com//address/",
        dAppsInfo: [
            {
                address: "0x59e0CBfc13d5FeD1386C814B1D5477Ea723Da37f",

                created: 30563523,
            }
        ]
    },
    [CHAIN_IDS.TAIKO]: {
        name: "Taiko",
        networkName: "Taiko Jolnir",
        networkId: 167007,
        networkIdHex: "0x28C5F",
        contractMixer: "0xD50eCE0eB75c448c5c158ce78a7a15beC45130Be",
        
        link: "https://explorer.jolnir.taiko.xyz/tx/",
        linkAddress: "https://explorer.jolnir.taiko.xyz/address/",
        dAppsInfo: [
            {
                address: "0x50bCe66687fabB3ed18c8E7C2F9425B938D53aCD",

                created: 2741
            }
        ]
    },
    [CHAIN_IDS.MANTA]: {
        name: "Manta",
        networkName: "Manta Pacific",
        networkId: 3441005,
        networkIdHex: "0x34816D",
        contractMixer: "0xD50eCE0eB75c448c5c158ce78a7a15beC45130Be",
        
        link: "https://pacific-explorer.manta.network/tx/",
        linkAddress: "https://pacific-explorer.manta.network/address/",
        dAppsInfo: [
            {
                address: "0x50bCe66687fabB3ed18c8E7C2F9425B938D53aCD",

                created: 282655
            }
        ]
    },
    [CHAIN_IDS.AVALANCHE]: {
        name: "Avalanche",
        networkName: "Avalanche Fuji",
        networkId: 43113,
        networkIdHex: "0xA869",
        contractMixer: "0x2A26757847B7165c864A35405be419C2856eC0a6",
        
        link: "https://testnet.snowtrace.io/tx/",
        linkAddress: "https://testnet.snowtrace.io/address/",
        dAppsInfo: [
            {
                address: "0x68bD463Ee8Ffa8C64349d701397427958D6065Af",

                created: 24859337
            }
        ]
    },
    [CHAIN_IDS.ARBITRUM]: {
        name: "Arbitrum",
        networkName: "Arbitrum Goerli",
        networkId: 421613,
        networkIdHex: "0x66EED",
        contractMixer: "0xD50eCE0eB75c448c5c158ce78a7a15beC45130Be",
        
        link: "https://goerli.arbiscan.io/tx/",
        linkAddress: "https://goerli.arbiscan.io/address/",
        dAppsInfo: [
            {
                address: "0x50bCe66687fabB3ed18c8E7C2F9425B938D53aCD",

                created: 33696599
            }
        ]
    },
    [CHAIN_IDS.LINEA]: {
        name: "Linea",
        networkName: "Linea Goerli",
        networkId: 59140,
        networkIdHex: "0xE704",
        contractMixer: "0x50bCe66687fabB3ed18c8E7C2F9425B938D53aCD",
        
        link: "https://goerli.lineascan.build/tx/",
        linkAddress: "https://goerli.lineascan.build/address/",
        dAppsInfo: [
            {
                address: "0xBA063e20e3a752F8613784BE460DFc42ec33f279",

                created: 1316245
            }
        ]
    },
    [CHAIN_IDS.METIS]: {
        name: "Metis",
        networkName: "Metis Goerli",
        networkId: 599,
        networkIdHex: "0x257",
        contractMixer: "0xD50eCE0eB75c448c5c158ce78a7a15beC45130Be",
        
        link: "https://goerli.explorer.metisdevops.link/tx/",
        linkAddress: "https://goerli.explorer.metisdevops.link/address/",
        dAppsInfo: [
            {
                address: "0x50bCe66687fabB3ed18c8E7C2F9425B938D53aCD",

                created: 1940390
            }
        ]
    },
    [CHAIN_IDS.OPTIMISM]: {
        name: "Optimism",
        networkName: "Optimism Goerli",
        networkId: 420,
        networkIdHex: "0x1A4",
        contractMixer: "0xeFc1d04AB2A90581A961bA56e26BbB16ce4eF3cA",
        
        link: "https://goerli-optimism.etherscan.io/tx/",
        linkAddress: "https://goerli-optimism.etherscan.io/address/",
        dAppsInfo: [
            {
                address: "0x762aa334cEA5459F0D574599421890ac1531Ab8D",

                created: 13216547
            }
        ]
    },
    [CHAIN_IDS.POLYGONZKEVM]: {
        name: "PolygonZkEvm",
        networkName: "PolygonZkEvm TestNet",
        networkId: 1442,
        networkIdHex: "0x5A2",
        contractMixer: "0x8eeF6461Ca83F66a398C9B996b6488a793a54ebd",
        
        link: "https://testnet-zkevm.polygonscan.com/tx/",
        linkAddress: "https://testnet-zkevm.polygonscan.com/address/",
        dAppsInfo: [
            {
                address: "0xDf18CA2e11e1D3d1eA3573a6ccF2C65D64da71F5",

                created: 2035589
            }
        ]
    },
    [CHAIN_IDS.ZKSYNCERA]: {
        name: "ZkSyncEra",
        networkName: "ZkSyncEra TestNet",
        networkId: 280,
        networkIdHex: "0x118",
        contractMixer: "0x60e92Ce0D0B21635A668934b942427625daF53d4",
        
        link: "https://goerli.explorer.zksync.io/tx/",
        linkAddress: "https://goerli.explorer.zksync.io/address/",
        dAppsInfo: [
            {
                address: "0x15D70cAF647eFFD632d05422C44EE09775CdaeCE",

                created: 10571095
            }
        ]
    },
    [CHAIN_IDS.SCROLL]: {
        name: "Scroll",
        networkName: "Scroll Sepolia",
        networkId: 534351,
        networkIdHex: "0x8274F",
        contractMixer: "0xD50eCE0eB75c448c5c158ce78a7a15beC45130Be",
        
        link: "https://sepolia-blockscout.scroll.io/tx/",
        linkAddress: "https://sepolia-blockscout.scroll.io/address/",
        dAppsInfo: [
            {
                address: "0x50bCe66687fabB3ed18c8E7C2F9425B938D53aCD",

                created: 12717
            }
        ]
    },
    [CHAIN_IDS.FUTURVERSE]: {
        name: "Futurverse",
        networkName: "Futurverse Porcini",
        networkId: 7672,
        networkIdHex: "0x1DF8",
        contractMixer: "0x2A26757847B7165c864A35405be419C2856eC0a6",
        
        link: "https://explorer.rootnet.cloud/tx/",
        linkAddress: "https://explorer.rootnet.cloud/address/",
        dAppsInfo: [
            {
                address: "0x68bD463Ee8Ffa8C64349d701397427958D6065Af",

                created: 7087932
            }
        ]
    },
    [CHAIN_IDS.MANTLE]: {
        name: "Mantle",
        networkName: "Mantle Testnet",
        networkId: 5001,
        networkIdHex: "0x1389",
        contractMixer: "0xD50eCE0eB75c448c5c158ce78a7a15beC45130Be",
        
        link: "https://explorer.testnet.mantle.xyz/tx/",
        linkAddress: "https://explorer.testnet.mantle.xyz/address/",
        dAppsInfo: [
            {
                address: "0x50bCe66687fabB3ed18c8E7C2F9425B938D53aCD",

                created: 18437706
            }
        ]
    },
    [CHAIN_IDS.BASE]: {
        name: "Base",
        networkName: "Base Goerli",
        networkId: 84531,
        networkIdHex: "0x14A33",
        contractMixer: "0x2A26757847B7165c864A35405be419C2856eC0a6",
        
        link: "https://goerli.basescan.org/tx/",
        linkAddress: "https://goerli.basescan.org/address/",
        dAppsInfo: [
            {
                address: "0xBA063e20e3a752F8613784BE460DFc42ec33f279",

                created: 8886882
            }
        ]
    },
    [CHAIN_IDS.FANTOM]: {
        name: "Fantom",
        networkName: "Fantom Testnet",
        networkId: 4002,
        networkIdHex: "0xFA2",
        contractMixer: "0xD50eCE0eB75c448c5c158ce78a7a15beC45130Be",
        
        link: "https://testnet.ftmscan.com/tx/",
        linkAddress: "https://testnet.ftmscan.com/address/",
        dAppsInfo: [
            {
                address: "0x50bCe66687fabB3ed18c8E7C2F9425B938D53aCD",

                created: 19985745
            }
        ]
    },
    [CHAIN_IDS.CELO]: {
        name: "Celo",
        networkName: "Celo Alfajores",
        networkId: 44787,
        networkIdHex: "0xAEF3",
        contractMixer: "0xD50eCE0eB75c448c5c158ce78a7a15beC45130Be",
        
        link: "https://explorer.celo.org/alfajores/tx/",
        linkAddress: "https://explorer.celo.org/alfajores/address/",
        dAppsInfo: [
            {
                address: "0x50bCe66687fabB3ed18c8E7C2F9425B938D53aCD",

                created: 19532412
            }
        ]
    },
    [CHAIN_IDS.OASIS_SAPPHIRE]: {
        name: "Oasis",
        networkName: "Oasis Sapphire Testnet",
        networkId: 23295,
        networkIdHex: "0x5AFF",
        contractMixer: "0xD50eCE0eB75c448c5c158ce78a7a15beC45130Be",
        
        link: "https://testnet.explorer.sapphire.oasis.dev/tx/",
        linkAddress: "https://testnet.explorer.sapphire.oasis.dev/address/",
        dAppsInfo: [
            {
                address: "0x50bCe66687fabB3ed18c8E7C2F9425B938D53aCD",

                created: 2362043
            }
        ]
    },
    [CHAIN_IDS.EVMOS]: {
        name: "Evmos",
        networkName: "Evmos Testnet",
        networkId: 9000,
        networkIdHex: "0x2328",
        contractMixer: "0xD50eCE0eB75c448c5c158ce78a7a15beC45130Be",
        
        link: "https://testnet.escan.live/tx/",
        linkAddress: "https://testnet.escan.live/address/",
        dAppsInfo: [
            {
                address: "0x50bCe66687fabB3ed18c8E7C2F9425B938D53aCD",

                created: 16843787
            }
        ]
    },
    [CHAIN_IDS.CRONOS]: {
        name: "Cronos",
        networkName: "Cronos Testnet",
        networkId: 338,
        networkIdHex: "0x152",
        contractMixer: "0x68bD463Ee8Ffa8C64349d701397427958D6065Af",
        
        link: "https://explorer.cronos.org/testnet/tx/",
        linkAddress: "https://explorer.cronos.org/testnet/address/",
        dAppsInfo: [
            {
                address: "0xf60928e4faF7015c6e1144603150FF0D77540847",

                created: 12703017
            }
        ]
    },
    [CHAIN_IDS.ASTAR]: {
        name: "Astar",
        networkName: "Astar Shibuya",
        networkId: 81,
        networkIdHex: "0x51",
        contractMixer: "0xD50eCE0eB75c448c5c158ce78a7a15beC45130Be",
        
        link: "https://blockscout.com/shibuya/tx/",
        linkAddress: "https://blockscout.com/shibuya/address/",
        dAppsInfo: [
            {
                address: "0x50bCe66687fabB3ed18c8E7C2F9425B938D53aCD",

                created: 4569330
            }
        ]
    }
};

// Define the Chain IDs for each network
export const chainConnectionsIds = [
    CHAIN_IDS.ETHEREUM,
    CHAIN_IDS.POLYGON,
    CHAIN_IDS.BSC,
    CHAIN_IDS.TAIKO,
    CHAIN_IDS.MANTA,
    CHAIN_IDS.AVALANCHE,
    CHAIN_IDS.ARBITRUM,
    CHAIN_IDS.LINEA,
    CHAIN_IDS.METIS,
    CHAIN_IDS.OPTIMISM,
    CHAIN_IDS.POLYGONZKEVM,
    CHAIN_IDS.ZKSYNCERA,
    CHAIN_IDS.SCROLL,
    CHAIN_IDS.FUTURVERSE,
    CHAIN_IDS.MANTLE,
    CHAIN_IDS.BASE,
    CHAIN_IDS.FANTOM,
    CHAIN_IDS.CELO,
    CHAIN_IDS.OASIS_SAPPHIRE,
    CHAIN_IDS.EVMOS,
    CHAIN_IDS.CRONOS,
    CHAIN_IDS.ASTAR
];

export const dAppGlobalHash = "0x5d1006d6c79bf00087d1adc65fdb9cd093960d335e35cc08039a90ecdbff8936"//"0xa872ab427ff9ee05ac278920d3f380e9ecd765fb19a218d07602d0be06e53483"//"0x189b07824df009c8602b7e81b5424c2942e9ce3e8230bbf28d4fd83d1de3cdef"//"0x05a1de5b45e64afd99d69edf7c0fde64ab0f19a9675b9a335e8a592189b97905"//"0x9070f29fe365fbb9a5225d053af3d2786485c651708ceb36ea2f73e6706ac61a"//"0x17282df9b2956cf8c1b67e36b4ed64228f2336034770b8c00f21c34dc8aa6944"//"0x1b61d75a84ebba870e71f309b481d6e7c51f18c38255622f156c4636da1298a9"//"0xb024e5f3095b0d3fc781b30bb9b6394071edbd474fff452abd9638096d5649ef"//"0x6984503b21e6f74c5899a90f310ac60988f0a06864126059d70b280d6fdb6865"//"0x1d92969757e64a2601c6b012d1ce42bae715eafa954632c838618531ff405bab"

// As we have the SSL certificate, we have to connect to the SSL domain
export const backend = "https://playground.surfermonkey.io:3001/"


// For local dev:
//export const backend = "http://localhost:3001/"