import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


const CoinSummaryDetail = (props) => {

  const coinSumObj = {
    numCoins: 0,
    totalWorth: 0,
    amountSpent: 0,
  };

  //rounding function
  const round = (value, decimals) => {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

  //get total number of coins and how much their worth and store in object
  for(var transaction in props.coinResult){
    let trans = props.coinResult[transaction];
    let value = trans.purchase/trans.rate;
    let roundedValue = round(value, 8);

    coinSumObj.amountSpent += trans.purchase;
    coinSumObj.numCoins += roundedValue;
  }

  coinSumObj.totalWorth = round((coinSumObj.numCoins * props.currRate), 8);

  const percentDiffCalc = (first, second) => {
    let diff = first - second;
    return (diff/first) * 100;
  }


  return (
    <Col xs={12}>
      <Col xs={12}>
        <Col xs={3}>
          <div className="subHeader"> Worth </div>
        </Col>
        <Col xs={3}>
          <div className="subHeader"> # Coins </div>
        </Col>
        <Col xs={3}>
          <div className="subHeader"> Amount Spent </div>
        </Col>
        <Col xs={3}>
          <div className="subHeader"> % Difference </div>
        </Col>
      </Col>
      <Col xs={12}>
        <Col xs={3}>
          <div className="summaryResult"> {round((coinSumObj.numCoins * props.currRate), 2)} </div>
        </Col>
        <Col xs={3}>
          <div className="summaryResult"> {round(coinSumObj.numCoins, 8)} </div>
        </Col>
        <Col xs={3}>
          <div className="summaryResult"> {coinSumObj.amountSpent} </div>
        </Col>
        <Col xs={3}>
          <div className="summaryResult"> {round(percentDiffCalc(coinSumObj.totalWorth, coinSumObj.amountSpent), 1)}% </div>
        </Col>
      </Col>
    </Col>
  )
}

export default CoinSummaryDetail;