const hre = require("hardhat");

async function main() {

  const Transaction = await hre.ethers.getContractFactory('Transaction')
  const transaction = Transaction.deploy();
    (await transaction).deployed;


  console.log("Transaction contract deployed",(await transaction).address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
