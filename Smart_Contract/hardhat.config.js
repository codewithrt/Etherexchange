require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.14",
  networks:{
    ganache:{
      url:'http://127.0.0.1:7545',
      accounts:['816f065dc0f01ae8c67c916cc310b2524137432cd018eb20a1f01c8c192d3017']
    }
  }
};
