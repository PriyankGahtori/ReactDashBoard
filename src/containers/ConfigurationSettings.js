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

import * as actionCreators  from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

  const listStyle = {
     left: "465",
     height:"14",
  }
   const cardStyle = {
    height: "150",
   }

class ConfigurationSettings extends React.Component {
  
  constructor(props) {
    super(props);
    console.log("this.props of configurationsetting---",this.props)
    
    this.instrClicked = this.instrClicked.bind(this);
    this.handleGeneralkeywordTab = this.handleGeneralkeywordTab.bind(this);
    }

  getTRModeDetail(props)
  {
    let trModeObj = {profileId:null,dcId:null,nodeType:null,topoId:null,tierId:null,serverId:null,instanceId:null};
    let pathname = props.location.pathname;
      
    if(pathname.startsWith("/profile/"))
    {
      trModeObj.nodeType = "profile";
      trModeObj.profileId = props.params.profileId;  
    }
    else if(pathname.startsWith("/dcdetail/"))
    {
      trModeObj.nodeType = "topology";
      trModeObj.profileId = props.params.profileId;  
      trModeObj.dcId = props.params.dcId;
      trModeObj.topoId = props.params.topoId;
    }
    else if(pathname.startsWith("/topology/"))
    {
      trModeObj.nodeType = "tier";
      trModeObj.profileId = props.params.profileId;  
      trModeObj.topoId = props.params.topoId;
      trModeObj.tierId = props.params.tierId;
    }
    else if(pathname.startsWith("/tier/"))
    {
      trModeObj.nodeType = "server";
      trModeObj.profileId = props.params.profileId;  
      trModeObj.tierId = props.params.tierId;
      trModeObj.serverId = props.params.serverId;
    }
    else if(pathname.startsWith("/server/"))
    {
      trModeObj.nodeType = "instance";
      trModeObj.profileId = props.params.profileId;  
      trModeObj.serverId = props.params.serverId;
      trModeObj.instanceId = props.params.instanceId;
    }
   
    return trModeObj;
  }

  componentWillMount() 
  {
     //set TRMode Details 
      this.props.setTRModeDetail(this.getTRModeDetail(this.props));
  }

  componentWillReceiveProps(nextProps)
  {
    //update TRMode detail, if the path has changed or TR Mode is toggled   
    if(this.props.props.location.pathname != nextProps.props.location.pathname){
      this.props.setTRModeDetail(this.getTRModeDetail(nextProps));
    }
    if(this.props.props.trData != nextProps.props.trData){
      this.props.setTRModeDetail(this.getTRModeDetail(nextProps));
    }

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

//receiving data from state set by reducers
function mapStateToProps(state) {  
  return {  
   trData :state.initialData.trData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) { 
  return  bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ConfigurationSettings);
