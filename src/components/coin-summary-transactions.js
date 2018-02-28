import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


class CoinSummaryTransactions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isToggleOn: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render(){
    const firebaseData = this.props.coinResult;
    const transactionArray = [];
    const currRate = this.props.currRate;

    for(var action in firebaseData){
      let worth = firebaseData[action].purchase/firebaseData[action].rate * currRate;

      let newAction = (
        <Col xs={12} key={action}>
          <Col xs={4} sm={3} className="noXSPadding">
            <Col xs={12} className="transDetailContainer">
              ${parseFloat(worth.toFixed(2))}
            </Col>
          </Col>
          <Col xs={4} sm={3} className="noXSPadding">
            <Col xs={12} className="transDetailContainer">
              ${firebaseData[action].purchase}
            </Col>
          </Col>
          <Col xs={4} sm={3} className="noXSPadding">
            <Col xs={12} className="transDetailContainer">
              ${firebaseData[action].rate}
            </Col>
          </Col>
          <Col xs={4} sm={3} xsHidden>
            <Col xs={12} className="transDetailContainer">
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
              }).format(firebaseData[action].date)}
            </Col>
          </Col>
        </Col>
      );
      transactionArray.push(newAction);

    }




    console.log(this.props.coinResult);

    return (
      <Col xs={12} className="text-center" style={{marginTop: '10px'}}>
        <Button bsClass="transactionBtn" onClick={this.handleClick} >
          {this.state.isToggleOn ?
            <i className="fas fa-chevron-circle-up"></i> :
            <i className="fas fa-chevron-circle-down"></i>
          }
        </Button>
        <br />
        <Panel id="collapsible-panel-example-1" expanded={this.state.isToggleOn} onToggle={()=>{}}>
          <Panel.Collapse>
            <Panel.Body className="panelBodyCustom">
              <Col xs={12} className="transactionHeaders">
                <Col xs={4} sm={3}>
                  Worth
                </Col>
                <Col xs={4} sm={3}>
                  Purchase
                </Col>
                <Col xs={4} sm={3}>
                  Rate
                </Col>
                <Col xs={4} sm={3} xsHidden>
                  Date
                </Col>
              </Col>
              {transactionArray}
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </Col>
    )
  }


}

export default CoinSummaryTransactions;
