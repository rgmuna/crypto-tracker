import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Modal } from 'react-bootstrap';
import './index.css';
import CoinSummary from './components/coin-summary.js';
import CoinTotal from './components/coin-total.js';
import FontAwesome from 'react-fontawesome';
import firebase, { auth, provider } from './firebase.js'; // <--- add this line

const coinTypes = ['btc', 'eth', 'ltc'];

class App extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      coinCurr : {
        btc: '',
        eth: '',
        ltc: ''
      },
      firebaseData: {
        btc: '',
        eth: '',
        ltc: ''
      },
      user: null,
      show: false
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  handleClose(e){
    // e.stopPropagation();
    this.setState(prevState => ({
       show: false
    }));
  }

  handleShow(e){
    e.stopPropagation();
    this.setState(prevState => ({
       show: true
    }));
  }
  componentDidMount(){
    fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      // console.log(data);
      let updatedRate = {
        btc: data.BTC.USD,
        eth: data.ETH.USD,
        ltc: data.LTC.USD
      };
      this.setState({coinCurr: updatedRate});
    })


    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        const itemsRef = firebase.database().ref(this.state.user.uid);
          itemsRef.on('value', (snapshot) => {
            let result = snapshot.val();
            if(result){
              let firebaseData = {...this.state.firebaseData}
              firebaseData.btc = result.btc;
              firebaseData.eth = result.eth;
              firebaseData.ltc = result.ltc;
              this.setState({firebaseData});
            }
            else{
              let firebaseData = {...this.state.firebaseData}
              firebaseData.btc = 0;
              firebaseData.eth = 0;
              firebaseData.ltc = 0;
              this.setState({firebaseData});
            }
          });
      }
    });
  }
  render(){
    const coinItems = coinTypes.map((type) => {
        return (
          <Row key={type}>
            <CoinSummary userIn={this.state.user} coinType={type} currRate={this.state.coinCurr[type]} coinResult={this.state.firebaseData[type]} userInfo={this.state.user} />
          </Row>
        )
    });

    const userProfile = this.state.user ?
      <div className="displayName">{this.state.user.displayName}</div>
      :
      null;



    return (
      <Grid style={{maxWidth: '800px'}}>
        <Row>
          <Col xs={12}>
            <div className="logContainer" style={{display: 'inline'}}>
              {userProfile}
              {this.state.user ?
                <a className="logBtn" onClick={this.logout}>Log Out</a>
                :
                <a className="logBtn" onClick={this.login}>Log In</a>
              }
            </div>
          </Col>
        </Row>
        <Row className="header">
          <Col xs={12}>
            <i className="fas fa-chart-line"></i> CRYPTO TRACKER
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="text-center" style={{marginBottom: '6px'}}>
            <a className="instructions" onClick={this.handleShow}>Instructions</a>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="text-center">
            {this.state.user ?
              <div className="headerItem">
                Total: <CoinTotal firebaseData={this.state.firebaseData} coinCurr={this.state.coinCurr}/>
              </div>
              :
              <div> Log in to get started! </div>
            }
          </Col>
        </Row>
        {coinItems}

        <Modal show={this.state.show} onHide={this.handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Instructions</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <ol>
            <li>
              Log in using your Gmail account.
            </li>
            <li>
              Your crypto coin worth will be initilized to zero. Click the drop down arrow for each coin to see the transaction section.
            </li>
            <li>
              In the transaction section, add your first transaction for that particular coin by typing in the price you paid, the rate you purchased the coin at and the date you made the puchase.
            </li>
            <li>
              Click "Add" and that transaction will be saved to the database under your user info.
            </li>
            <li>
              As you manually add your transactions, your info will be updated and saved for the next time you login.
            </li>
            <li>
              If you need to edit an entry, click the "Edit" button which will allow you to remove the entry. Then you can simply re-add it with the correct values.
            </li>
          </ol>
         </Modal.Body>
         <Modal.Footer>
           <button onClick={this.handleClose}>Close</button>
         </Modal.Footer>
       </Modal>
      </Grid>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
