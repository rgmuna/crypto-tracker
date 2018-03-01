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
      },
      editing: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
    //add to firebase
    const transactionRef = firebase.database().ref(this.props.userInfo.uid).child(this.props.coinType);
    if(isNaN(this.state.addTransaction.price) || isNaN(this.state.addTransaction.rate)){
      alert('Please enter numbers only (no symbols or letters)')
    }
    else{
      const newItem = {
        date: this.state.addTransaction.date,
        purchase: this.state.addTransaction.price,
        rate: this.state.addTransaction.rate,
      }
      transactionRef.push(newItem);
    }
    //update State
    const addTransaction = {...this.state.addTransaction}
    addTransaction.date = '';
    addTransaction.price = '';
    addTransaction.rate = '';
    this.setState({addTransaction});
  }

  handleEditing(e){
    e.stopPropagation();
    this.setState(prevState => ({
      editing: !prevState.editing
    }));
  }

  handleRemove(e){
    const transactionRef = firebase.database().ref(this.props.userInfo.uid).child(this.props.coinType).child(e);
    transactionRef.remove();
  }

  render(){
    const firebaseData = this.props.coinResult;
    const transactionArray = [];
    const currRate = this.props.currRate;

    for(var action in firebaseData){
      let numCoins = firebaseData[action].purchase/firebaseData[action].rate;
      let newAction = (
        <Col xs={12} key={action}>
          <Col xs={4} sm={3} className="noXSPadding">
            <Col xs={12} className="transDetailContainer">
              {parseFloat(numCoins.toFixed(8))}
            </Col>
          </Col>
          <Col xs={4} sm={3} className="noXSPadding">
            <Col xs={12} className="transDetailContainer">
              ${firebaseData[action].purchase}
            </Col>
          </Col>

          <Col xs={4} sm={3} className="noXSPadding" xsHidden>
            <Col xs={12} className="transDetailContainer" >
              ${firebaseData[action].rate}
            </Col>
          </Col>

          <Col xs={4} sm={3} className="noXSPadding" smHidden mdHidden lgHidden>
            {this.state.editing ?
              <button className="removeBtn" onClick={()=>this.handleRemove(action)}>Remove</button>
              :
              <Col xs={12} className="transDetailContainer">
                ${firebaseData[action].rate}
              </Col>
            }
          </Col>

          <Col xs={4} sm={3} className="text-center" xsHidden>
            {this.state.editing ?
              <button className="removeBtn" onClick={()=>this.handleRemove(action)}>Remove</button>
              :
              <Col xs={12} className="transDetailContainer">
                {firebaseData[action].date}
              </Col>
          }
          </Col>
        </Col>
      );
      transactionArray.push(newAction);
    }

    return (
      <Col xs={12} className="text-right" style={{marginTop: '10px', padding: '0px'}}>

        {this.state.isToggleOn && transactionArray.length ?
          <span>
            <button onClick={this.handleEditing} className="editBtn">Edit</button>
          </span>
          :
          null
        }

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
                  # Coins
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
                <Col xs={12} className="subtitleContainer">
                  <Col xs={4} sm={3} className="transSubHeader">
                    Price
                  </Col>
                  <Col xs={4} sm={3} className="transSubHeader">
                    Rate
                  </Col>
                  <Col xs={4} sm={3} className="transSubHeader">
                    Date
                  </Col>
                </Col>
                <form>
                  <Col xs={4} sm={3} className="noXSPadding">
                    <Col xs={12} className="transDetailContainer">
                      <input className="coinInput" type="text" name="price" placeholder="ex. 300" onChange={this.handleChange} value={this.state.addTransaction.price} />
                    </Col>
                  </Col>
                  <Col xs={4} sm={3} className="noXSPadding">
                    <Col xs={12} className="transDetailContainer">
                      <input className="coinInput" type="text" name="rate" placeholder="ex. 100" onChange={this.handleChange} value={this.state.addTransaction.rate} />
                    </Col>
                  </Col>
                  <Col xs={4} sm={3} className="noXSPadding">
                    <Col xs={12} className="transDetailContainer">
                      <input className="coinInput" type="date" name="date" placeholder="ex. mm/dd/yyyy" onChange={this.handleChange} value={this.state.addTransaction.date} />
                    </Col>
                  </Col>
                  <Col xs={12} sm={3} className="noXSPadding text-center">
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
