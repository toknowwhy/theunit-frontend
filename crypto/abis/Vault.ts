export const VaultABI = [
    {
      "inputs": [
        { "internalType": "address", "name": "_unit", "type": "address" }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "allow",
          "type": "bool"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenAssets",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "unitDebt",
          "type": "uint256"
        }
      ],
      "name": "CollateralOwnerTrasnfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "collateralToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "collateralAmount",
          "type": "uint256"
        }
      ],
      "name": "DecreaseCollateral",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "collateralToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "DecreaseDebt",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "collateralToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "IncreaseCollateral",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "collateralToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "IncreaseDebt",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "collateralToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenAssets",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "unitDebt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "feeTo",
          "type": "address"
        }
      ],
      "name": "LiquidateCollateral",
      "type": "event"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "", "type": "address" },
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "name": "allowances",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_operator", "type": "address" },
        { "internalType": "bool", "name": "_allow", "type": "bool" }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_collateralToken",
          "type": "address"
        },
        { "internalType": "address", "name": "_receiver", "type": "address" },
        {
          "internalType": "uint256",
          "name": "_collateralAmount",
          "type": "uint256"
        }
      ],
      "name": "decreaseCollateral",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_from", "type": "address" },
        {
          "internalType": "address",
          "name": "_collateralToken",
          "type": "address"
        },
        { "internalType": "address", "name": "_receiver", "type": "address" },
        {
          "internalType": "uint256",
          "name": "_collateralAmount",
          "type": "uint256"
        }
      ],
      "name": "decreaseCollateralFrom",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_collateralToken",
          "type": "address"
        },
        { "internalType": "address", "name": "_receiver", "type": "address" }
      ],
      "name": "decreaseDebt",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_token", "type": "address" }
      ],
      "name": "getPrice",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
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
      "inputs": [
        {
          "internalType": "address",
          "name": "_collateralToken",
          "type": "address"
        },
        { "internalType": "address", "name": "_receiver", "type": "address" }
      ],
      "name": "increaseCollateral",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_collateralToken",
          "type": "address"
        },
        { "internalType": "uint256", "name": "_amount", "type": "uint256" },
        { "internalType": "address", "name": "_receiver", "type": "address" }
      ],
      "name": "increaseDebt",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "from", "type": "address" },
        {
          "internalType": "address",
          "name": "_collateralToken",
          "type": "address"
        },
        { "internalType": "uint256", "name": "_amount", "type": "uint256" },
        { "internalType": "address", "name": "_receiver", "type": "address" }
      ],
      "name": "increaseDebtFrom",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_collateralToken",
          "type": "address"
        },
        { "internalType": "address", "name": "_account", "type": "address" },
        { "internalType": "address", "name": "_feeTo", "type": "address" }
      ],
      "name": "liquidation",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "liquidationRatio",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "liquidationTreasuryFee",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minimumCollateral",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "priceFeed",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_gov", "type": "address" }
      ],
      "name": "setGov",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "_ratio", "type": "uint256" }
      ],
      "name": "setLiquidationRatio",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_liquidationTreasuryFee",
          "type": "uint256"
        }
      ],
      "name": "setLiquidationTreasuryFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_minimumCollateral",
          "type": "uint256"
        }
      ],
      "name": "setMinimumCollateral",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_priceFeed", "type": "address" }
      ],
      "name": "setPriceFeed",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_treasury", "type": "address" }
      ],
      "name": "setTreasury",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "_price", "type": "uint256" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "name": "tokenToUnit",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_newAccount", "type": "address" },
        {
          "internalType": "address",
          "name": "_collateralToken",
          "type": "address"
        }
      ],
      "name": "transferVaultOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "treasury",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unit",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_newVault", "type": "address" },
        { "internalType": "address", "name": "_token", "type": "address" },
        { "internalType": "uint256", "name": "_amount", "type": "uint256" }
      ],
      "name": "upgradeVault",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_account", "type": "address" },
        {
          "internalType": "address",
          "name": "_collateralToken",
          "type": "address"
        },
        { "internalType": "bool", "name": "_checkCollateral", "type": "bool" }
      ],
      "name": "validateLiquidation",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "", "type": "address" },
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "name": "vaultOwnerAccount",
      "outputs": [
        { "internalType": "uint256", "name": "tokenAssets", "type": "uint256" },
        { "internalType": "uint256", "name": "unitDebt", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "name": "vaultPoolAccount",
      "outputs": [
        { "internalType": "uint256", "name": "tokenAssets", "type": "uint256" },
        { "internalType": "uint256", "name": "unitDebt", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  