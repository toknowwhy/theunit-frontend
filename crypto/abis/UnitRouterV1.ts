export const UnitRouterABI = [
  {
    inputs: [
      { internalType: "address", name: "_vault", type: "address" },
      { internalType: "address", name: "_weth", type: "address" },
      { internalType: "address", name: "_unit", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BurnUnit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DecreaseCollateral",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "IncreaseCollateral",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "MintUnit",
    type: "event",
  },
  {
    inputs: [],
    name: "UNIT",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VAULT",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_collateralToken", type: "address" },
      { internalType: "uint256", name: "_UNITAmount", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "burnUnit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_collateralToken", type: "address" },
      { internalType: "uint256", name: "_tokenAmount", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "decreaseCollateral",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_collateralToken", type: "address" },
      { internalType: "uint256", name: "_tokenAmount", type: "uint256" },
      { internalType: "uint256", name: "_UNITAmount", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "decreaseCollateralAndBurn",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_ETHAmount", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "decreaseETH",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_ETHAmount", type: "uint256" },
      { internalType: "uint256", name: "_UNITAmount", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "decreaseETHAndBurn",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_ETHAmount", type: "uint256" },
      { internalType: "uint256", name: "_UNITAmount", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "decreaseETHAndMint",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_collateralToken", type: "address" },
      { internalType: "uint256", name: "_tokenAmount", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "increaseCollateral",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_collateralToken", type: "address" },
      { internalType: "uint256", name: "_tokenAmount", type: "uint256" },
      { internalType: "uint256", name: "_UNITAmount", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "increaseCollateralAndMint",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_receiver", type: "address" }],
    name: "increaseETH",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_UNITAmount", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "increaseETHAndBurn",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_UNITAmount", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "increaseETHAndMint",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_collateralToken", type: "address" },
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "address", name: "_feeTo", type: "address" },
    ],
    name: "liquidation",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_collateralToken", type: "address" },
      { internalType: "uint256", name: "_UNITAmount", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "mintUnit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
