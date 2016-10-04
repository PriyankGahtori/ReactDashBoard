import React from 'react';
import {hashHistory} from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader, CardText} from 'material-ui/Card';
//import ConfigSettings from './GeneralSettings';
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
    
    this.instrClicked = this.instrClicked.bind(this);
    this.handleGeneralkeywordTab = this.handleGeneralkeywordTab.bind(this);
    }

  handleGeneralkeywordTab(){
    console.log(" in handleGeneralkeywordTab method--------------->")
    //hashHistory.push(`generalsettings/${this.props.params.profileId}`);
    hashHistory.push(`${this.props.location.pathname}/generalsettings`);
   }

  instrClicked(){
    console.log("in instrClicked ----------->",this.props.params.profileId)
   // hashHistory.push("InstrSettings");
    //hashHistory.push(`instrumentation/${this.props.params.profileId}`)
    hashHistory.push(`${this.props.location.pathname}/instrumentation`)
   }
  
  render() {
   return (
      <div> 
        <Card style={cardStyle}>
         <List style={listStyle} > 
          <div>
           <ListItem primaryText=" General" 
                     secondaryText="Enable BCI Capturing, Enable HotSpot Capturing, Choose Instrumentation Profiles." 
                    onTouchTap={this.handleGeneralkeywordTab}/>
                    </div>
           <Divider/>
           <ListItem primaryText=" Instrumentation" 
                     secondaryText=" Service Entry Point, Backend Detection, Transaction Configuration, Instrument Monitors." 
                      onTouchTap={this.instrClicked}/>
              <Divider/>
        
    
        
         </List> 
      </Card>
     </div>
    );
  }
}
