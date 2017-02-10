
//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NDAgentStatusDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SettingsDialog from 'material-ui/Dialog';

//Importing files
import  {activeData} from '../../actions/index';
import * as actionCreators  from '../../actions/index';
import CardComponent from '../../components/CardComponent'
import NDAgentStatus from '../actions/ndAgentStatus/NDAgentStatus';
import MigrateTopo from '../settings/Dialog_Settings';


const iconStyle = {
fontSize:'5em',
color:'#d8d8d8',
top:'0px',
right:'-20px',
margin:'0',
height:'auto',
width:'auto'
};

const listStyle = {  
  padding: '16px 30px 0px 0px',
  color: '#FFF',
  fontSize:'18px',
  lineHeight:'24px',
  float:'left'
};
const divStyle ={
  background:'rgba(22, 47, 80, 0.64)', 
  borderRadius: '8px', 
  marginLeft: '2.7em',
  marginBottom:'2em',
  minHeight: '111px',
 
}  

const customContentStyle = {
  width: '73%',
  maxWidth: 'none',
  padding:'0 !Important'
};

const divCenter = {
  textAlign: 'center'
};

 class Home extends React.Component {
 
  constructor(props) {
	 super(props);
   this.state = {homeData: this.props.homeData,
                  agentStatusOpen:false};
   this.loader = this.loader.bind(this);
    this.settingScreen = this.settingScreen.bind(this);
    this.handleCloseTopoDialog = this.handleCloseTopoDialog.bind(this) ;
    this.handleCloseNDAgent = this.handleCloseNDAgent.bind(this); 
   }

componentWillMount() {
  this.props.triggerLoader(true, null)
  this.props.fetchInitData(this.loader)

}

componentWillReceiveProps(nextProps){
 // this.props.fetchInitData(this.loader);
	if(this.props.homeData != nextProps.homeData)
		this.setState({homeData:nextProps.homeData});
}
 
 /*function to trigger event for closing loading progess bar 
  * called when request for fetching home data is sent
  */

  loader(){
   var message = {'title':'Home data loaded', 'msg' : ''};
   this.props.triggerLoader(false,message)
 }

 agentScreen(){
  this.setState({agentStatusOpen: true})
}

  handleCloseNDAgent(){
    this.setState({agentStatusOpen:false})
  }

 settingScreen(){
  this.setState({settingOpen: true})
  }

  handleCloseTopoDialog(){
    this.setState({settingOpen:false})
  }

  render() {
  	//At initial loading of GUI if homeData is null displays msg of  "Loading"
  	if (!this.props.homeData) {
      return <div>Loading........</div>;
    }

     const actions = [
      <FlatButton  className="dialog-modal cancel"
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseTopoDialog} 
        style={{bottom:'15',right:'5'}}/>
    ];

     const actionsNDAgent = [
      <FlatButton  className="dialog-modal cancel"
        label="Close"
        primary={true}
        onClick={this.handleCloseNDAgent} 
        style={{right:'5'}}/>
    ];

    return (
          <div>

            <div className="row" >
           {/*     <div className="col-md-2" style={divStyle}>
                  <ListItem style={listStyle} initiallyOpen={true} hoverColor='rgba(0,0,0,0.4)' primaryText="Discover Instrumentation Data" rightIcon={<i className="icon config-icon-discover" style={iconStyle} />}/>
                </div>
                <div className="col-md-2" style={divStyle}>
                  <ListItem style={listStyle} initiallyOpen={true} hoverColor='rgba(0,0,0,0.4)' primaryText="Manage Instrumentation Profile" rightIcon={<i className="icon config-icon-manage-profile" style={iconStyle} />}/>
                </div> */}
                <div className="col-md-2" style={divStyle}>
                  <ListItem style={listStyle} initiallyOpen={true} hoverColor='rgba(0,0,0,0.4)' onClick={this.agentScreen.bind(this)} primaryText="ND Agent Status" rightIcon={<i className="icon config-icon-agent" style={iconStyle} />}/>
                </div>
            {/*    <div className="col-md-2" style={divStyle}>
                  <ListItem style={listStyle} initiallyOpen={true} hoverColor='rgba(0,0,0,0.4)' primaryText="Manage Auto Discovery" rightIcon={<i className="icon config-icon-setting" style={iconStyle} />}/>
                </div> */}
                <div className="col-md-2" style={divStyle}>
                  <ListItem style={listStyle} initiallyOpen={true} hoverColor='rgba(0,0,0,0.4)' onTouchTap={this.settingScreen} primaryText="Import Topology" rightIcon={<i className="icon config-icon-setting2" style={iconStyle} />}/>
                </div>  
            </div>

            <NDAgentStatusDialog  className="dialog-modal"
            title="ND Agent Status Information"
            open={this.state.agentStatusOpen}
            actions={actionsNDAgent} 
            autoScrollBodyContent={true}
            contentStyle={customContentStyle}>
            <NDAgentStatus closeDialog={this.handleCloseNDAgent}/>
            </NDAgentStatusDialog >

              <SettingsDialog 
             title=""
             open={this.state.settingOpen}
             actions={actions} 
             contentStyle={{width: '550'}}>
             <MigrateTopo closeDialog={this.handleCloseTopoDialog}/>
        </SettingsDialog >

            <div className="row">       
        		{this.props.homeData.map((data, index) => (
                          
            	<CardComponent key={data.id} data={data}/>
            ))}   
            </div>

          </div>  
    );
  }
}

//receiving data from state set by reducers
function mapStateToProps(state) {
  return {
   list     : state.list,
   homeData : state.initialData.homeData,
  
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
 // const actionMap = { loadInitData: bindActionCreators(fetchInitData, dispatch) };
  return  bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);