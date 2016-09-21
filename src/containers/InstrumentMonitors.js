import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {hashHistory } from 'react-router';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  block:{
    paddingBottom: 25,
  }
};

export default class InstrumentMonitors extends React.Component {

  constructor(props) {
    super(props);
    console.log("props of instrumentration---",this.props)
    this.handleChange = this.handleChange.bind(this);    
  }

  handleChange(value){
    console.log("value in handlechamge--",value)    
    let profileId = this.props.routeParams.profileId;
    let routeURL = `instrumentation/${profileId}/monitors/${value}`;
    hashHistory.push(routeURL);
  }

  render() {
    return (
      <div className ='container-fluid'>
      <div style ={styles.block}>
      <Tabs      
        onChange={this.handleChange}
      >
        <Tab label="Method monitors" value="methodmon" >
        
        </Tab>

        <Tab label="Exception Monitors" value="methodmon" >
          
        </Tab>

         <Tab label="HTTP stats monitors" value="methodmon">
          
        </Tab>

      </Tabs>
      </div>



      {this.props.children}

      </div>

    );
  }
}