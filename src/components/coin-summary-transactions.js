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
    return (
      <Col xs={12} className="text-center" style={{marginTop: '10px'}}>
        <Button bsClass="transactionBtn" onClick={this.handleClick} >
          {this.state.isToggleOn ?
            <i class="fas fa-chevron-circle-up"></i> :
            <i class="fas fa-chevron-circle-down"></i>
          }
        </Button>
        <br />
        <Panel id="collapsible-panel-example-1" expanded={this.state.isToggleOn} onToggle={()=>{}}>
          <Panel.Collapse>
            <Panel.Body>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </Col>
    )
  }


}

export default CoinSummaryTransactions;
