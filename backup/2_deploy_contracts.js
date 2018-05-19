var PeaceCoinCrowdsaleToken = artifacts.require('PeaceCoinCrowdsaleToken.sol');
var PeaceCoinCrowdsale = artifacts.require('PeaceCoinCrowdsale.sol');
var PeaceCoinSavingsWallet = artifacts.require('PeaceCoinSavingsWallet.sol');
var RefundVault = artifacts.require("RefundVault.sol");

module.exports = function(deployer, network, accounts) {
  //    return DeployTestCrowdSale(deployer, accounts);
  return liveDeploy(deployer, accounts);
};

function latestTime() {
  return web3.eth.getBlock('latest').timestamp;
}

function ether(n) {
  return new web3.BigNumber(web3.toWei(n, 'ether'));
}

const duration = {
  seconds: function(val) {
    return val;
  },
  minutes: function(val) {
    return val * this.seconds(60);
  },
  hours: function(val) {
    return val * this.minutes(60);
  },
  days: function(val) {
    return val * this.hours(24);
  },
  weeks: function(val) {
    return val * this.days(7);
  },
  years: function(val) {
    return val * this.days(365);
  }
};

async function liveDeploy(deployer, accounts) {
  const BigNumber = web3.BigNumber;
  const openingTime = latestTime() + duration.minutes(30);
  const closingTime = openingTime + duration.years(1);
  const RATE = new BigNumber(1); // 1: 1eth = 1Token
  const CAP = ether(5);
  const GOAL = ether(3);

  const heartbeatTimeout = 3153600000000; // 1000 Year

  let tokenAddress;
  let walletAddress;
  let crowdsaleAddress;

  await deployer.deploy(PeaceCoinCrowdsaleToken).then(function() {
    tokenAddress = PeaceCoinCrowdsaleToken.address;
    console.log(tokenAddress);
  });

  await deployer
    .deploy(PeaceCoinSavingsWallet, heartbeatTimeout)
    .then(function() {
      walletAddress = PeaceCoinSavingsWallet.address;
      console.log(walletAddress);
    });

  await deployer
    .deploy(RefundVault, walletAddress)
    .then(function () {
      walletAddress = walletAddress.address;
      console.log(walletAddress);
    });

  await deployer
    .deploy(
      PeaceCoinCrowdsale,
      openingTime,
      closingTime,
      RATE.toNumber(),
      walletAddress,
      CAP.toNumber(),
      tokenAddress,
      GOAL.toNumber()
    )
    .then(function(instance) {
      crowdsaleAddress = PeaceCoinCrowdsale.address;
      console.log(crowdsaleAddress);
    });
}

// Transfer Ownership from owner address to crowdsale address
// await this.token.transferOwnership(this.crowdsale.address);
// await this.vault.transferOwnership(this.crowdsale.address);
