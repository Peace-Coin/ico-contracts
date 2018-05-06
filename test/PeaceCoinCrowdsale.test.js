import ether from './helpers/ether';

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const PeaceCoinCrowdsale = artifacts.require("./PeaceCoinCrowdsale.sol");


contract('PeaceCoinCrowdsale', function ([owner, wallet, investor])  {
    const RATE = new BigNumber(10);

    console.log(owner);
    console.log(wallet);
    console.log(investor);

    it("should be test initialized message", async function(){
        return PeaceCoinCrowdsale.deployed().then(async function(instance) {
            return instance.getGreetings();
        }).then(function(data) {
            assert.equal(data, "test", "return should be test");
        });
    });

    

});

