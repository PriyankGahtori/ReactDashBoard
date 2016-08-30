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
    height: "365",
   }

export default class ConfigurationSettings extends React.Component {
  
  constructor(props) {
    super(props);
    console.log("this.props of configurationsetting---",this.props)
     this.configClicked = this.configClicked.bind(this);
    this.instrClicked = this.instrClicked.bind(this);
    }

  configClicked(){
    console.log(" in configClicked method--------------->")
  //  hashHistory.push("ConfigSettings");
   }

  instrClicked(){
    console.log("in instrClicked ----------->",this.props.params.profileId)
   // hashHistory.push("InstrSettings");
    hashHistory.push(`instrumentation/${this.props.params.profileId}`)
   }
  
  render() {
   return (
      <div> 
        <Card style={cardStyle}>
         <List style={listStyle} > 
          <div>
           <ListItem primaryText=" General" 
                     secondaryText="Configure Threshold  for slow and stalled Configuration. Configure when Diagnostics" 
                    onTouchTap={this.configClicked}/>
                    </div>
           <Divider/>
           <ListItem primaryText=" Instrumentation" 
                     secondaryText="Configure Threshold  for slow and stalled Configuration. Configure when Diagnostics" 
                      onTouchTap={this.instrClicked}/>
              <Divider/>
             <ListItem primaryText=" AutoSensor Settings" 
                     secondaryText="Configure Threshold  for slow and stalled Configuration. Configure when Diagnostics"
                      />
              <Divider/>
           <ListItem primaryText=" Slow Transaction Threshold" 
                     secondaryText="Configure Threshold  for slow and stalled Configuration. Configure when Diagnostics" 
                     />
              <Divider/>
           <ListItem primaryText=" Baselines" 
                     secondaryText="Configure Threshold  for slow and stalled Configuration. Configure when Diagnostics" 
                 />
    
        
         </List> 
      </Card>
     </div>
    );
  }
}
