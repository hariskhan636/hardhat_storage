const { ethers, run, network } = require("hardhat")

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await simpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log("Deployed contract to " + simpleStorage.address)
  //console.log(network.config)

  if (network.config.chainId === 4 && process.env.API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log("Current Value: " + currentValue)

  const transactionResponse = await simpleStorage.store(6)
  await transactionResponse.wait(1)

  const newValue = await simpleStorage.retrieve()
  console.log("New Value: " + newValue)

  // const currentName = await simpleStorage.addPerson("Haris", 1)
  // console.log(typeof currentName)
}

async function verify(contractAddress, args) {
  console.log("verify contract...")

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
