pragma solidity ^0.4.21;

import "./MintableToken.sol";


/**
 * @title SampleCrowdsaleToken
 * @dev Very simple ERC20 Token that can be minted.
 * It is meant to be used in a crowdsale contract.
 */
contract SampleCrowdsaleToken is MintableToken {

    string public constant name = "Sample Crowdsale Token"; // solium-disable-line uppercase
    string public constant symbol = "SCT"; // solium-disable-line uppercase
    uint8 public constant decimals = 18; // solium-disable-line uppercase

}

