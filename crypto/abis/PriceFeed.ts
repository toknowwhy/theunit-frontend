export const PriceFeedABI = [
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
    {
      "inputs": [],
      "name": "aggregator",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "answer",
      "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "uint80", "name": "", "type": "uint80" }],
      "name": "answers",
      "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "description",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint80", "name": "_roundId", "type": "uint80" }
      ],
      "name": "getRoundData",
      "outputs": [
        { "internalType": "uint80", "name": "", "type": "uint80" },
        { "internalType": "int256", "name": "", "type": "int256" },
        { "internalType": "uint256", "name": "", "type": "uint256" },
        { "internalType": "uint256", "name": "", "type": "uint256" },
        { "internalType": "uint80", "name": "", "type": "uint80" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gov",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "name": "isAdmin",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "latestAnswer",
      "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "latestRound",
      "outputs": [{ "internalType": "uint80", "name": "", "type": "uint80" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "roundId",
      "outputs": [{ "internalType": "uint80", "name": "", "type": "uint80" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_account", "type": "address" },
        { "internalType": "bool", "name": "_isAdmin", "type": "bool" }
      ],
      "name": "setAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "int256", "name": "_answer", "type": "int256" }
      ],
      "name": "setLatestAnswer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  