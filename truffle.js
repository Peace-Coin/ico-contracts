require('dotenv').config();
require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('truffle-hdwallet-provider');

// const infuraProvider = new HDWalletProvider(
//   'year fabric curtain garbage nasty tag quit idea cotton patient pet bone',
//   'https://rinkeby.infura.io/AUMpzXam2BRfzMQULuUe'
// );

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  // networks: {
  //           development: {
  //           host: "localhost",
  //           port: 8545,
  //           network_id: "*" // Match any network id
  //       }
  //   }
  networks: {
    rinkebyInfura: {
      provider: function() {
        return new HDWalletProvider(
          'year fabric curtain garbage nasty tag quit idea cotton patient pet bone',
          'https://rinkeby.infura.io/AUMpzXam2BRfzMQULuUe'
        );
      },
      network_id: 4,
      gas: 4698712
    },
    ganache: {
      host: 'localhost',
      port: 7545,
      network_id: '*' // Match any network id
    },
    rinkeby:{
      host: "localhost",
      port: 8545,
      network_id: 4,
      gas: 4700000
    }
  }
};
