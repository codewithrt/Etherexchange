require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.14",
  networks:{
    ganache:{
      url:'http://127.0.0.1:7545',
      accounts:['']
    }
  }
};
