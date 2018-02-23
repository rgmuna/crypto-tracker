import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import CoinSummaryDetail from './coin-summary-detail';
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

      {/*coin summary*/}

      <CoinSummaryDetail coinResult={props.coinResult} currRate={props.currRate} />


      {/*coin transactions*/}
      <Col xs={12}>
      </Col>

    </Col>
  )
}

export default CoinSummary;
