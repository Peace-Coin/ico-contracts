pragma solidity ^0.4.21;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";


/**
 * @title Peace Coin Crowdsale Token
 * @dev Peace Coin ERC20 Token that can be minted.
 * It is meant to be used in a crowdsale contract.
 */
contract PeaceCoinCrowdsaleToken is MintableToken {

    string public constant name = "Peace Coin Crowdsale Token";
    string public constant symbol = "PCE";
    uint8 public constant decimals = 18;

}
