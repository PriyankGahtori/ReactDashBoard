//require('../styles/breadcrumb.css');
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
injectTapEventPlugin();

const headerStyle = {
	paddingRight: "0px",
    paddingLeft: "0px"
}
const iconStyles = {
 // marginRight: 24,
};
export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	open: false, 
    	headerClass : "col-md-12", 
    	drawerClass : "col-md-0"
       };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this); 
  }


  handleToggle(){ 
  	var headercss = this.state.headerClass === "col-md-10" ? "col-md-12" : "col-md-10" ;
  	var drawercss = this.state.drawerClass === "col-md-2" ? "col-md-0" : "col-md-2" ;

  	this.setState({
  		open: !this.state.open,
  		headerClass: headercss,
  		drawerClass: drawercss
  	});

  }
  handleClose(){ 
  	var headercss = this.state.headerClass === "col-md-10" ? "col-md-12" : "col-md-10" ;
  	var drawercss = this.state.drawerClass === "col-md-2" ? "col-md-0" : "col-md-2" ;
  	this.setState({open: false}); 
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
    	<div>
    	   <Drawer
	          docked={true}
	          width={220}
	          open={this.state.open}
	          onRequestChange={(open) => this.setState({open})}
	          className={this.state.drawerClass}	          
	        >
		       <AppBar 
		         iconElementLeft= {<IconButton></IconButton>}
		         iconElementRight={<IconButton onTouchTap={this.handleToggle}><NavigationClose /></IconButton>}
		         onRightIconButtonTouchTap={()=>this.handleToggle}		         
		       />

	          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
	          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
	       </Drawer>
	       
	       <div className={this.state.headerClass} style={headerStyle}>
	      	<AppBar
	    	title="Config GUI"
	    	onLeftIconButtonTouchTap={this.handleToggle}
	    	isInitiallyOpen={false}
	  		/>
		   
		      
		    <div className='container-fluid'>
		       <h1>Dashboard</h1> 
		       <ul className="breadcrumb">
					<li><FontIcon className="material-icons" style={iconStyles} color={red500}>home</FontIcon><Link to="/"><a href="#">Home</a></Link></li>
					<li><a href="#">Applications Detail</a></li>
					<li><a href="#">DC Config</a></li>
					<li><a href="#">Instrumentation</a></li>
					<li><a href="#">Service Entry Point</a></li>
				</ul>            
		  	   {this.props.children}
		    </div>
			   
		    </div>
	         
	     </div>
  	  </MuiThemeProvider>	
      
    );
  }
}