//Importing React components
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
    paddingBottom: 2,
  },
tab:{
    backgroundColor: 'rgb(166, 197, 228)',
    fontSize:'12px',
    color: '#000'
  }
};

export default class ConfigureBT extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);    
  }

  handleChange(value){
    console.log("value in handlechamge--",value)    
    let currPath = `${this.props.location.pathname}`;
        currPath = currPath.substring(0, currPath.indexOf("bt")+2)
        console.log("currPath - ",currPath)
    let routeURL = `${currPath}/${value}`;
    hashHistory.push(routeURL);
  }

  render() {
    return (
      <div className ='container-fluid'>
      <div style ={styles.block}>
      <Tabs      
        onChange={this.handleChange}
      >
        <Tab style ={styles.tab} label="HTTP BT Configuration" value="" >
        </Tab>
        <Tab style ={styles.tab} label="Method BT Configuration" value="methodBT">
        </Tab>

      </Tabs>
      </div>
      {this.props.children}

      </div>

    );
  }
}