pragma solidity ^0.4.21;

import "./Crowdsale.sol";
import "./MintableToken.sol";


/**
 * @title SampleCrowdsale
 * @dev This is an example of a fully fledged crowdsale.
 * The way to add new features to a base crowdsale is by multiple inheritance.
 * In this example we are providing following extensions:
 * CappedCrowdsale - sets a max boundary for raised funds
 * RefundableCrowdsale - set a min goal to be reached and returns funds if it's not met
 *
 * After adding multiple features it's good practice to run integration tests
 * to ensure that subcontracts works together as intended.
 */
contract TestCrowdsale is Crowdsale {

    function TestCrowdsale(
        uint256 _rate,
        address _wallet,
        MintableToken _token
    )
        public    
        Crowdsale(_rate, _wallet, _token)
    {
        //As goal needs to be met for a successful crowdsale
        //the value needs to less or equal than a cap which is limit for accepted funds
        //require(_goal <= _cap);
    }
}