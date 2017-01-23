//Importing React components
import React from 'react';
import { hashHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Importing files
import * as actionCreators from '../../actions/index';
import InstrSettings from './instrumentation/Instrumentation';

const listStyle = {
  left: "465",
  height: "14",
}
const cardStyle = {
  height: "295",
}

class ConfigurationSettings extends React.Component {

  constructor(props) {
    super(props);
    this.handleGeneralTab = this.handleGeneralTab.bind(this);
    this.handleInstrumentationTab = this.handleInstrumentationTab.bind(this);
    this.handleAdvanceSettingTab = this.handleAdvanceSettingTab.bind(this);
    this.getProfileName = this.getProfileName.bind(this);
    this.state = { profileName: this.getProfileName(this.props.params.profileId) }
  }

  getTRModeDetail(props) {
    let trModeObj = { profileId: null, dcId: null, nodeType: null, topoId: null, tierId: null, serverId: null, instanceId: null };
    let pathname = props.location.pathname;

    if (pathname.startsWith("/profile/")) {
      trModeObj.nodeType = "profile";
      trModeObj.profileId = props.params.profileId;
    }
    else if (pathname.startsWith("/dcdetail/")) {
      trModeObj.nodeType = "topology";
      trModeObj.profileId = props.params.profileId;
      trModeObj.dcId = props.params.dcId;
      trModeObj.topoId = props.params.topoId;
    }
    else if (pathname.startsWith("/topology/")) {
      trModeObj.nodeType = "tier";
      trModeObj.profileId = props.params.profileId;
      trModeObj.topoId = props.params.topoId;
      trModeObj.tierId = props.params.tierId;
    }
    else if (pathname.startsWith("/tier/")) {
      trModeObj.nodeType = "server";
      trModeObj.profileId = props.params.profileId;
      trModeObj.tierId = props.params.tierId;
      trModeObj.serverId = props.params.serverId;
    }
    else if (pathname.startsWith("/server/")) {
      trModeObj.nodeType = "instance";
      trModeObj.profileId = props.params.profileId;
      trModeObj.serverId = props.params.serverId;
      trModeObj.instanceId = props.params.instanceId;
    }

    return trModeObj;
  }

  componentWillMount() {
    //set TRMode Details 
    this.props.setTRModeDetail(this.getTRModeDetail(this.props));
    this.props.getKeywordsData(this.props.params.profileId, this.loader)

    //nullifying tree state's
    let path = this.props.location.pathname;
    if (path.startsWith("/profile")) {
      this.props.emptyTreeState();
    }
  }

  getProfileName(profileId) {
    try {
      let profileData = this.props.homeData[1]
        .value
        .filter(function (obj) { return obj.id == profileId });
      if (profileData.length != 0) {
        return profileData[0].name;
      }
      else
        return null;
    }
    catch (ex) {
      console.error("error in getting profileId " + ex);
      return null;
    }

  }

  componentWillReceiveProps(nextProps) {
    //update TRMode detail, if the path has changed or TR Mode is toggled   
    if (this.props.props.location.pathname != nextProps.props.location.pathname) {
      this.props.setTRModeDetail(this.getTRModeDetail(nextProps));
    }
    if (this.props.props.trData != nextProps.props.trData) {
      this.props.setTRModeDetail(this.getTRModeDetail(nextProps));
    }

    if (this.props.params.profileId != nextProps.props.params.profileId) {
      this.setState({});
    }

  }

  loader() {
  }


  handleGeneralTab() {
    hashHistory.push(`${this.props.location.pathname}/generalsettings`);
  }

  handleInstrumentationTab() {
    hashHistory.push(`${this.props.location.pathname}/instrumentation`)
  }

  handleAdvanceSettingTab() {
    hashHistory.push(`${this.props.location.pathname}/advancesettings`)
  }

  render() {
    //disable the profile if its default i.e id = 1
    if (this.props.params.profileId == 1)
      this.props.disableProfile(true);
    else
      this.props.disableProfile(false);

    return (
      <div>
        <div style={{ color: '#FFF' }}><p>Profile Name : {this.state.profileName}</p></div>
        <Card style={cardStyle}>
          <List style={listStyle} >
            <ListItem
              primaryText=" General"
              secondaryText="Flowpath Capturing, HotSpot Capturing,  Capture Exception, Flow Path Header Capturing, Choose Instrumentation Profiles"
              onTouchTap={this.handleGeneralTab} />
            <Divider />
            <ListItem
              primaryText=" Instrumentation"
              secondaryText="Service Entry Point, Integration Point Detection, Transaction Configuration, Instrument Monitors, Error detection"
              onTouchTap={this.handleInstrumentationTab} />
            <Divider />
            <ListItem
              primaryText=" Advance Settings"
              secondaryText="Debug Level Capturing, Put Delay in Method, Backend Monitor, Monitors, Generate Exception in Method "
              onTouchTap={this.handleAdvanceSettingTab} />
            <Divider />
            <ListItem
              primaryText=" Product Integration"
              secondaryText="Cav NV Cookie" />
            <Divider />
          </List>
        </Card>
      </div>
    );
  }
}

//receiving data from state set by reducers
function mapStateToProps(state) {
  return {
    trData: state.initialData.trData,
    homeData: state.initialData.homeData
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationSettings);
