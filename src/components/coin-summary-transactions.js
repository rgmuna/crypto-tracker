import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import firebase, { auth, provider } from '../firebase.js'; // <--- add this line


class CoinSummaryTransactions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isToggleOn: false,
      addTransaction: {
        price: '',
        rate: '',
        date: ''
      }
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  handleChange(e) {
    e.preventDefault();
    const addTransaction = {...this.state.addTransaction}
    addTransaction[e.target.name] = e.target.value;
    this.setState({
      addTransaction
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const transactionRef = firebase.database().ref(this.props.userInfo.uid).child(this.props.coinType);

    const newItem = {
      date: this.state.addTransaction.date,
      purchase: this.state.addTransaction.price,
      rate: this.state.addTransaction.rate,
    }
    console.log(newItem);
    transactionRef.push(newItem);

    const addTransaction = {...this.state.addTransaction}
    addTransaction.date = '';
    addTransaction.price = '';
    addTransaction.rate = '';
    this.setState({addTransaction});
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

              <Col xs={12} className="submitContainer">
                <form>
                  <Col xs={4} sm={3} className="noXSPadding">
                    <Col xs={12} className="transDetailContainer">
                      <input className="coinInput" type="text" name="price" placeholder="Price" onChange={this.handleChange} value={this.state.addTransaction.price} />
                    </Col>
                  </Col>
                  <Col xs={4} sm={3} className="noXSPadding">
                    <Col xs={12} className="transDetailContainer">
                      <input className="coinInput" type="text" name="rate" placeholder="Rate" onChange={this.handleChange} value={this.state.addTransaction.rate} />
                    </Col>
                  </Col>
                  <Col xs={4} sm={3} xsHidden>
                    <Col xs={12} className="transDetailContainer">
                      <input className="coinInput" type="text" name="date" placeholder="Date" onChange={this.handleChange} value={this.state.addTransaction.date} />
                    </Col>
                  </Col>
                  <Col xs={4} sm={3} className="noXSPadding">
                    <a onClick={this.handleSubmit} href="">
                      <Col xs={12} className="transDetailContainer" id="submitBtn">
                         Add
                      </Col>
                    </a>
                  </Col>
                </form>
              </Col>

            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </Col>
    )
  }


}

export default CoinSummaryTransactions;
