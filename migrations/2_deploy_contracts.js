var PeaceCoinCrowdsale = artifacts.require("./PeaceCoinCrowdsale.sol");
var PeaceCoinCrowdsaleToken = artifacts.require("./PeaceCoinCrowdsaleToken.sol");


module.exports = function(deployer, network, accounts) {
//    return DeployTestCrowdSale(deployer, accounts);
    return liveDeploy(deployer, accounts);
};

function latestTime () {
    return web3.eth.getBlock('latest').timestamp;
}

const duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
};

async function liveDeploy(deployer, accounts) {

    const BigNumber = web3.BigNumber;
    //const openingTime = latestTime() + duration.weeks(1);
    const openingTime = 1524698624;
    const closingTime = openingTime + duration.weeks(1);
    const rate = new BigNumber(1);  // 1: 1eth = 1Token
    const wallet = accounts[0];
    const cap = 30000000000000000000;
    const goal = 20000000000000000000;

    // deployer.deploy(
    //     PeaceCoinCrowdsaleToken).then( async() => {
    //         const instance = await PeaceCoinCrowdsaleToken.deployed();
    //     });

    // const token = PeaceCoinCrowdsaleToken.address;
    // console.log([openingTime, closingTime, rate.toNumber(), accounts[0]]);
  
    // return deployer.deploy(PeaceCoinCrowdsale, 
    //     rate, wallet, token).then( async() => {
    //         const crowdsale_instance = await PeaceCoinCrowdsale.deployed();
    //     });

    deployer.deploy(PeaceCoinCrowdsaleToken)
        .then( function() {
            const token = PeaceCoinCrowdsaleToken.address;
            console.log([openingTime, closingTime, rate.toNumber(), accounts[0]], token);
            return deployer.deploy(PeaceCoinCrowdsale, rate, wallet, token)
        });


}




