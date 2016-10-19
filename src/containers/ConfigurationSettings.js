import React from 'react';
import {hashHistory} from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import InstrSettings  from  '../containers/Instrumentation';

  const listStyle = {
     left: "465",
     height:"14",
  }
   const cardStyle = {
    height: "150",
   }

export default class ConfigurationSettings extends React.Component {
  
  constructor(props) {
    super(props);
    console.log("this.props of configurationsetting---",this.props)
    this.handleGeneralTab = this.handleGeneralTab.bind(this);
    this.handleInstrumentationTab = this.handleInstrumentationTab.bind(this);
    this.handleAdvanceSettingTab = this.handleAdvanceSettingTab.bind(this);
    }

  handleGeneralTab(){
    hashHistory.push(`${this.props.location.pathname}/generalsettings`);
   }

  handleInstrumentationTab(){
    hashHistory.push(`${this.props.location.pathname}/instrumentation`)
   }

  handleAdvanceSettingTab(){
    hashHistory.push(`${this.props.location.pathname}/advancesettings`)
   }
  
  render() {
   return (
      <div> 
        <Card style={cardStyle}>
         <List style={listStyle} > 
          <div>
             <ListItem 
              primaryText=" General" 
              secondaryText="Flowpath Capturing, HotSpot Capturing, Choose Instrumentation Profiles, Debug Level Capturing, Capture Exception" 
              onTouchTap={this.handleGeneralTab}/>
          </div>
           <Divider/>
             <ListItem 
              primaryText=" Instrumentation" 
              secondaryText="Service Entry Point, Integration Point Detection, Transaction Configuration, Instrument Monitors, Error detection" 
              onTouchTap={this.handleInstrumentationTab}/>
           <Divider/>
           <Divider/>
             <ListItem 
              primaryText=" Advance Settings" 
              secondaryText="Put Delay in Method, Backend Monitor " 
              onTouchTap={this.handleAdvanceSettingTab}/>
           <Divider/>
         </List> 
      </Card>
     </div>
    );
  }
}
