import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import './index.css';
import CoinSummary from './components/coin-summary.js';
import FontAwesome from 'react-fontawesome';
import firebase from './firebase.js'; // <--- add this line


//API CALL STAND INS -------------------------------------------
const exampleFirebaseResult={
  btc : {
    asdfasdf: {
      purchase: 100,
      date: 1518452607,
      rate: 10000
    },
    dfgfghjgh: {
      purchase: 100,
      date: 1516452607,
      rate: 12000
    }
  },
  eth: {
    qwerqewr: {
      purchase: 200,
      date: 1518452607,
      rate: 1000
    },
    tryutyu: {
      purchase: 200,
      date: 1516452607,
      rate: 900
    }
  },
  ltc: {
    zxcvzxcv: {
      purchase: 300,
      date: 1518452607,
      rate: 50
    },
    vbnmvbnm: {
      purchase: 300,
      date: 1516452607,
      rate: 100
    }
  }
}

const currRate = {
  btc: 8000,
  eth: 800,
  ltc: 130
}

//API CALL STAND INS -------------------------------------------


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
      }
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
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
      // console.log(this.state);
    })


    const itemsRef = firebase.database().ref('roqueData');
    itemsRef.on('value', (snapshot) => {
      let result = snapshot.val();
      // let newState = [];
      // for (let item in items) {
      //   newState.push({
      //     id: item,
      //     title: items[item].title,
      //     user: items[item].user
      //   });
      // }
      // this.setState({
      //   items: newState
      // });
      var firebaseData = {...this.state.firebaseData}
      firebaseData.btc = result.btc;
      firebaseData.eth = result.eth;
      firebaseData.ltc = result.ltc;
      this.setState({firebaseData})
      // this.setState({firebaseData.btc : result.btc})
      // console.log(snapshot.val())
    });

  }
  render(){
    const coinItems = coinTypes.map((type) => {
      // console.log(this.state.firebaseData[type]);
      if(this.state.firebaseData[type] !== undefined){
        return (
          <Row key={type}>
            <CoinSummary coinType={type} currRate={this.state.coinCurr[type]} coinResult={this.state.firebaseData[type]} />
          </Row>
        )
      }

    });

    return (
      <Grid>
        <Row className="header">
          <Col xs={12}>
            <i className="fas fa-chart-line"></i> CRYPTO TRACKER
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            Feb 20, 2018
          </Col>
        </Row>
        {coinItems}
      </Grid>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
