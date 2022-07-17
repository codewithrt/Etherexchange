require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.14",
  networks:{
    ganache:{
      url:'http://127.0.0.1:7545',
      accounts:['f6b033d199fcb41986da81f70749c6732d0f8b1d9de6984d079c2e9e99e51236']
    }
  }
};
