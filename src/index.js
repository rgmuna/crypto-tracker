import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import './index.css';
import CoinSummary from './components/coin-summary.js';
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
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChange(e) {
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
          let firebaseData = {...this.state.firebaseData}
          firebaseData.btc = result.btc;
          firebaseData.eth = result.eth;
          firebaseData.ltc = result.ltc;
          this.setState({firebaseData})
        });
      }
    });
  }
  render(){
    const coinItems = coinTypes.map((type) => {
      if(this.state.firebaseData[type] !== undefined){
        return (
          <Row key={type}>
            <CoinSummary coinType={type} currRate={this.state.coinCurr[type]} coinResult={this.state.firebaseData[type]} userInfo={this.state.user} />
          </Row>
        )
      }
    });

    const userProfile = this.state.user ?
      <div className='user-profile'>
        {this.state.user.displayName}
      </div>
      :
      <div></div>;
    ;

    return (
      <Grid>
        <Row className="header">
          <Col xs={12}>
            <i className="fas fa-chart-line"></i> CRYPTO TRACKER
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {userProfile}

          </Col>
          <div className="wrapper">
            {this.state.user ?
              <button onClick={this.logout}>Log Out</button>
              :
              <button onClick={this.login}>Log In</button>
            }
          </div>
        </Row>
        {this.state.user ? coinItems : <div>Login First!</div>}
      </Grid>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
