pragma solidity ^0.4.21;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";


/**
 * @title SampleCrowdsaleToken
 * @dev Very simple ERC20 Token that can be minted.
 * It is meant to be used in a crowdsale contract.
 */
contract PeaceCoinCrowdsaleToken is MintableToken {

    string public constant name = "Peace Coin Crowdsale Token"; // solium-disable-line uppercase
    string public constant symbol = "PCE-Token"; // solium-disable-line uppercase
    uint8 public constant decimals = 18; // solium-disable-line uppercase

}
