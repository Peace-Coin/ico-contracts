var PeaceCoinCrowdsaleToken = artifacts.require('PeaceCoinCrowdsaleToken.sol');
var PeaceCoinCrowdsale = artifacts.require('PeaceCoinCrowdsale.sol');
var PeaceCoinSavingsWallet = artifacts.require('PeaceCoinSavingsWallet.sol');
var RefundVault = artifacts.require('RefundVault.sol');

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
  const presaleInvestment = ether(1);

  const heartbeatTimeout = 3153600000000; // 1000 Year

  let token;
  let wallet;
  let crowdsale;
  let vault;

  await deployer.deploy(PeaceCoinCrowdsaleToken).then(function() {
    token = PeaceCoinCrowdsaleToken;
  });

  console.log('token address: ', token.address);

  await deployer
    .deploy(PeaceCoinSavingsWallet, heartbeatTimeout)
    .then(function() {
      wallet = PeaceCoinSavingsWallet;
    });

  console.log('wallet address: ', wallet.address);

  await deployer.deploy(RefundVault, wallet.address).then(function() {
    vault = RefundVault;
  });

  console.log(vault.address);

  await deployer
    .deploy(
      PeaceCoinCrowdsale,
      openingTime,
      closingTime,
      RATE.toNumber(),
      wallet.address,
      CAP.toNumber(),
      token.address,
      GOAL.toNumber(),
      presaleInvestment
    )
    .then(function() {
      crowdsale = PeaceCoinCrowdsale;
    });

  console.log(crowdsale.address);

  // Transfer Ownership from owner address to crowdsale address
  await deployer.then(function() {
    token
      .deployed()
      .then(instance => instance.transferOwnership(crowdsale.address));
  });

  await deployer.then(function() {
    vault
      .deployed()
      .then(instance => instance.transferOwnership(crowdsale.address));
  });
}
