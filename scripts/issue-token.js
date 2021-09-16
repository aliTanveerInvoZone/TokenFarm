const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (callback) {
  let tokenFarm = await TokenFarm.deployed();
  await tokenFarm.issueToke();
  // Code goes here...
  console.log("Tokens issued!");
  callback();
};
