pragma solidity ^0.4.23;

import "zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";


/**
 * @title PeaceCoinCrowdsale powered by Zeppelin@1.9.0
 */
contract PeaceCoinCrowdsale is CappedCrowdsale, RefundableCrowdsale, MintedCrowdsale {

  function PeaceCoinCrowdsale(
    uint256 _openingTime,
    uint256 _closingTime,
    uint256 _rate,
    address _wallet,
    uint256 _cap,
    MintableToken _token,
    uint256 _goal
  )
    public
    Crowdsale(_rate, _wallet, _token)
    CappedCrowdsale(_cap)
    TimedCrowdsale(_openingTime, _closingTime)
    RefundableCrowdsale(_goal)
  {
    //the value has to be less or equal than a cap
    require(_goal <= _cap);
  }
}