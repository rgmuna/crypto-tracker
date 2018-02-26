import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import './index.css';
import CoinSummary from './components/coin-summary.js';
import FontAwesome from 'react-fontawesome';


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
        btc: null,
        eth: null,
        ltc: null
      },
      test: 'test'
    }
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
      console.log(this.state);
    })
  }
  render(){
    const coinItems = coinTypes.map((type) => {
      return (
        <Row key={type}>

            <CoinSummary coinType={type} currRate={this.state.coinCurr[type]} coinResult={exampleFirebaseResult[type]} />

        </Row>
      )
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
