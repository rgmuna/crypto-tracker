import React from 'react';
import {Col} from 'react-bootstrap';
// import FontAwesome from 'react-fontawesome';


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
    let purchase = parseFloat(props.coinResult[transaction].purchase);
    let date = parseFloat(props.coinResult[transaction].date);
    let rate = parseFloat(props.coinResult[transaction].rate);

    let value = purchase/rate;
    let roundedValue = round(value, 8);

    coinSumObj.amountSpent += purchase;
    coinSumObj.numCoins += roundedValue;
  }

  coinSumObj.totalWorth = round((coinSumObj.numCoins * props.currRate), 8);

  const percentDiffCalc = (first, second) => {
    let diff = first - second;
    return (diff/first) * 100;
  }

  return (
    <Col xs={12} style={{padding: '0px'}}>
      <Col xs={6} sm={3} className="infoContainer">
        <Col xs={12} className="detailInfo">
          <Col xs={12}>
            <div className="subHeader"> Worth </div>
          </Col>
          <Col xs={12}>
            <div className="summaryResult"> ${round((coinSumObj.numCoins * props.currRate), 2)} </div>
          </Col>
        </Col>
      </Col>
      <Col xs={6} sm={3} className="infoContainer">
        <Col xs={12} className="detailInfo">
          <Col xs={12}>
            <div className="subHeader"> # Coins </div>
          </Col>
          <Col xs={12}>
            <div className="summaryResult"> {round(coinSumObj.numCoins, 8)} </div>
          </Col>
        </Col>
      </Col>
      <Col xs={6} sm={3}className="infoContainer">
        <Col xs={12} className="detailInfo">
          <Col xs={12}>
            <div className="subHeader"> Spent </div>
          </Col>
          <Col xs={12}>
            <div className="summaryResult"> ${coinSumObj.amountSpent} </div>
          </Col>
        </Col>
      </Col>
      <Col xs={6} sm={3} className="infoContainer">
        <Col xs={12} className="detailInfo">
          <Col xs={12}>
            <div className="subHeader"> % Diff </div>
          </Col>
          <Col xs={12}>
          <div className="summaryResult"> {round(percentDiffCalc(coinSumObj.totalWorth, coinSumObj.amountSpent), 1)}% </div>
          </Col>
        </Col>
      </Col>
    </Col>
  )
}

export default CoinSummaryDetail;
