//Importing React components
//require('../styles/breadcrumb.css');
require('../styles/custom.css');
require('../styles/iconStyle.css');
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import { Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Breadcrumbs from 'react-breadcrumbs';
import SettingsDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {hashHistory } from 'react-router';
import NDAgentStatusDialog from 'material-ui/Dialog';

//Importing files
import Tree from '../containers/tree/Tree';
import DropDownAppList from '../containers/DropDownAppList';
import Dialog_Setting from '../containers/settings/Dialog_Settings';
import TRToggle from '../containers/settings/TRToggle';
import Loader from '../containers/utils/Loader';
import NDAgentStatus from '../containers/actions/ndAgentStatus/NDAgentStatus';

injectTapEventPlugin();

const headerStyle = {
	  paddingRight : "1px",
    paddingLeft  : "1px",
    overflowX: 'hidden'
}
const appBarStyle = {
  backgroundColor: '#114147',
}
const iconStyles = {
 // marginRight: 24,
};

const customContentStyle = {
  width: '93%',
  maxWidth: 'none',
};

const title={
  backgroundImage:"url('../images/cavi_logo_new.png')",
  backgroundRepeat: "no-repeat",
  backgroundSize : "135px 20px",
  marginTop:"13px",
  height:"45px",
  fontSize:"16px"
}
  
export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	open: false, 
    	headerClass : "col-md-12", 
    	drawerClass : "col-md-0",
    	treeClass : "hidden",
       };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this); 
    this.settingScreen = this.settingScreen.bind(this);

  }

  componentWillMount() {
    console.log("current",this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    const routeChanged = nextProps.location !== this.props.location;
    
    //this.setState({ showBackButton: routeChanged })
    console.log("routechanged",routeChanged);
    console.log("current",this.props.location);
    console.log("next",nextProps.location);
    
    if(nextProps.location.pathname === "/" || nextProps.location.pathname === "/application" || nextProps.location.pathname === "/topology" || nextProps.location.pathname === "/profile" || nextProps.location.pathname === "/instrumnetat" )
    	this.setState({treeClass: "hide",
                    open: false, 
                    headerClass : "col-md-12", 
                    drawerClass : "col-md-0"
    });
    else
       this.setState({treeClass: "show",
                      open: true, 
                      headerClass : "col-md-10", 
                      drawerClass : "col-md-2"
     });		
  }

  handleToggle(){ 
     if(this.props.location.pathname === "/" || this.props.location.pathname === "/application" || this.props.location.pathname === "/topology" ){
          return ;      
  }

  	var headercss = this.state.headerClass === "col-md-10" ? "col-md-12" : "col-md-10" ;
  	var drawercss = this.state.drawerClass === "col-md-2" ? "col-md-0" : "col-md-2" ;

  	this.setState({
  		open: !this.state.open,
  		headerClass: headercss,
  		drawerClass: drawercss
  	});
  }
  settingScreen(){
  this.setState({settingOpen: true})
  }
  agentScreen(){
  this.setState({agentStatusOpen: true})
}

  homeScreen(){
    hashHistory.push(`/`)
  }
  handleClose(){ 
  	var headercss = this.state.headerClass === "col-md-10" ? "col-md-12" : "col-md-10" ;
  	var drawercss = this.state.drawerClass === "col-md-2" ? "col-md-0" : "col-md-2" ;
  	this.setState({open: false,settingOpen:false,agentStatusOpen:false}); 
  }

  render() {
      const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose} 
        style={{bottom:'15',right:'5'}}/>
    ];
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
    	<div>
       <SettingsDialog  
               title="Topology Migration"
             open={this.state.settingOpen}
             actions={actions} 
             contentStyle={{width: '550'}}>
             <Dialog_Setting closeDialog={this.handleClose}/>
        </SettingsDialog >

        <NDAgentStatusDialog  
            title="ND BCI Agent Status Information"
            open={this.state.agentStatusOpen}
            actions={actions} 
            contentStyle={customContentStyle}>
            <NDAgentStatus closeDialog={this.handleClose}/>
            </NDAgentStatusDialog >

    	   <Drawer
	          docked={true}
	          width={240}
	          open={this.state.open}
	          onRequestChange={(open) => this.setState({open})}
	          className={this.state.drawerClass}
	          style={{"backgroundColor":"#21252B"}}	          
	        >
		       <AppBar 
             style={{backgroundColor: '#114147', height:58}}   
		         iconElementLeft= {<IconButton></IconButton>}
		         iconElementRight={<IconButton onTouchTap={this.handleToggle}><NavigationClose /></IconButton>}
		         onRightIconButtonTouchTap={()=>this.handleToggle}	
		       />

            {/*<MenuItem><Link to="/testing">PKY</Link></MenuItem>*/}
            <DropDownAppList value = {this.props.params.appId}/>
	          <span className={this.state.treeClass}>
                <Tree /> 
              </span>
	       </Drawer>
	       
	       <div className={this.state.headerClass} style={headerStyle}>
	      <AppBar
	      style={appBarStyle}  	
        titleStyle={title}
        title='NDE CONFIGURATION'
	    	onLeftIconButtonTouchTap={this.handleToggle}
        iconStyleLeft={{paddingLeft:'18px'}}
	    	isInitiallyOpen={false}
        iconElementRight={<div><IconButton tooltip="ND Agent Status" onTouchTap={this.agentScreen.bind(this)}>
          <FontIcon color='#FFF' className="material-icons">people</FontIcon>
          </IconButton><IconButton tooltip="Home" onTouchTap={this.homeScreen.bind(this)}><FontIcon color='#FFF' className="material-icons">home</FontIcon></IconButton>
        <IconButton tooltip="Migrate Topology" onTouchTap={this.settingScreen}><FontIcon color='#FFF' className="material-icons" >assignment_returned</FontIcon></IconButton></div>}
	  		/>
		   
		      
		    <div className='container-fluid' style={{paddingLeft:'32px'}}>
          <div className="row">
		      {/* <div className="col-md-6"><h2>NetDiagnostics Configuration</h2></div> */}
           <div className="col-md-4"/>
           <div  className="col-md-2 pull-right"  style={{marginTop:'20px', marginBottom:'10px',paddingTop:'5px'}}><TRToggle /></div>
          </div>  
          <Breadcrumbs 
             routes={this.props.routes}
             params={this.props.params}
          />
           <Loader/>
         {/* <Toaster/>*/}

		       {/*<ul className="breadcrumb">
                                 <li><FontIcon className="material-icons" style={iconStyles} color={red500}>home</FontIcon><Link to="/"><a href="#">Home</a></Link></li>
                                 <li><a href="#">Applications Detail</a></li>
                                 <li><a href="#">DC Config</a></li>
                                 <li><a href="#">Instrumentation</a></li>
                                 <li><a href="#">Service Entry Point</a></li>
                               </ul>*/}            
		  	   {this.props.children}
		    </div>
			   
		    </div>
	         
	     </div>
  	  </MuiThemeProvider>	
      
    );
  }
}