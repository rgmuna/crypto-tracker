import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import CoinSummaryDetail from './coin-summary-detail';
import CoinSummaryTransactions from './coin-summary-transactions';
import FontAwesome from 'react-fontawesome';


const CoinSummary = (props) => {

  const coinType = props.coinType;

  return (
    <Col xs={12} className="coinItems">
      {/*header*/}
      <Col xs={12} className="summaryHeader">
        <Col xs={6}>
          {coinType.toUpperCase()} Summary
        </Col>
        <Col xs={6} className="summaryHeaderRate">
          1 {coinType.toUpperCase()} = ${props.currRate}
        </Col>
      </Col>
      {props.userIn ?
        <div>
          <CoinSummaryDetail coinResult={props.coinResult} currRate={props.currRate} />
          <CoinSummaryTransactions coinType={coinType} coinResult={props.coinResult} currRate={props.currRate} userInfo={props.userInfo}/>
        </div>
      :
        null
      }
  </Col>
  )
}

export default CoinSummary;
