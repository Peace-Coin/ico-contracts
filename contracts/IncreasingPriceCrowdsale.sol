pragma solidity ^0.4.21;

import "../validation/TimedCrowdsale.sol";
import "../../math/SafeMath.sol";


/**
 * @title IncreasingPriceCrowdsale
 * @dev Extension of Crowdsale contract that increases the price of tokens linearly in time.
 * Note that what should be provided to the constructor is the initial and final _rates_, that is,
 * the amount of tokens per wei contributed. Thus, the initial rate must be greater than the final rate.
 */
contract IncreasingPriceCrowdsale is TimedCrowdsale {
  using SafeMath for uint256;
  uint256 constant RATE_WEEK_1 = 2900;
  uint256 constant RATE_WEEK_2 = 2600;
  uint256 constant RATE_WEEK_3 = 2300;
  uint256 constant RATE_WEEK_4 = 2300;

  function getRate() constant returns (uint256) {
    uint256 currentRate = rate;

    // We decided using `now` alias of `block.timestamp` instead `block.number`
    // Because of same reason:
    // - https://github.com/OpenZeppelin/zeppelin-solidity/issues/350
    if (isPresale()) {
      // before 2017/09/01 02:00 UTC
      currentRate = RATE_WEEK_1;
    } else if (now <= icoStartTime.add(2 weeks)) {
      // before 2017/09/08 02:00 UTC
      currentRate = RATE_WEEK_2;
    } else if (now <= icoStartTime.add(3 weeks)) {
      // before 2017/09/15 02:00 UTC
      currentRate = RATE_WEEK_3;
    } else if (now <= icoStartTime.add(4 weeks)) {
      // before 2017/09/21 02:00 UTC
      currentRate = RATE_WEEK_4;
    }

    return currentRate;
  }





  /**
   * @dev Constructor, takes intial and final rates of tokens received per wei contributed.
   * @param _initialRate Number of tokens a buyer gets per wei at the start of the crowdsale
   * @param _finalRate Number of tokens a buyer gets per wei at the end of the crowdsale
   */
  function IncreasingPriceCrowdsale(uint256 _initialRate, uint256 _finalRate) public {
    require(_initialRate >= _finalRate);
    require(_finalRate > 0);
    initialRate = _initialRate;
    finalRate = _finalRate;
  }

  /**
   * @dev Returns the rate of tokens per wei at the present time.
   * Note that, as price _increases_ with time, the rate _decreases_.
   * @return The number of tokens a buyer gets per wei at a given time
   */
  function getCurrentRate() public view returns (uint256) {
    // solium-disable-next-line security/no-block-members
    uint256 elapsedTime = block.timestamp.sub(openingTime);
    uint256 timeRange = closingTime.sub(openingTime);
    uint256 rateRange = initialRate.sub(finalRate);
    return initialRate.sub(elapsedTime.mul(rateRange).div(timeRange));
  }

  /**
   * @dev Overrides parent method taking into account variable rate.
   * @param _weiAmount The value in wei to be converted into tokens
   * @return The number of tokens _weiAmount wei will buy at present time
   */
  function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256) {
    uint256 currentRate = getCurrentRate();
    return currentRate.mul(_weiAmount);
  }

}
