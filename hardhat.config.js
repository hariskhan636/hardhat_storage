require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_URL = process.env.RINKEBY_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const API_KEY = process.env.API_KEY
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY

module.exports = {
  defaultNetwork: "hardhat",

  networks: {
    rinkeby: {
      url: RINKEBY_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },

    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },

  solidity: "0.8.8",

  etherscan: {
    apiKey: API_KEY,
  },

  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKET_API_KEY,
  },
}
