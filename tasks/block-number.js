const { task } = require("hardhat/config")

task("block-number", "Print the current block number").setAction(
  async (taskArgs, hre) => {
    const blockNum = await hre.ethers.provider.getBlockNumber()
    console.log("Block Num: " + blockNum)
  }
)

module.exports = {}
