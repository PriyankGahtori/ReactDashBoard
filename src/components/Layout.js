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
import Tree from '../containers/Tree';
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
    	drawerClass : "col-md-0",
    	treeClass : "hidden",
       };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this); 
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
    

    if(nextProps.location.pathname === "/")
    	this.setState({treeClass: "hide"});
    else
       this.setState({treeClass: "show"});		
    
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
	          style={{"backgroundColor":"#21252B"}}	          
	        >
		       <AppBar 
		         iconElementLeft= {<IconButton></IconButton>}
		         iconElementRight={<IconButton onTouchTap={this.handleToggle}><NavigationClose /></IconButton>}
		         onRightIconButtonTouchTap={()=>this.handleToggle}		         
		       />

	          <MenuItem>Menu Item</MenuItem>
	          <MenuItem>Menu Item 2</MenuItem>
            <MenuItem><Link to="/topology">PKY</Link></MenuItem>
	          <span className={this.state.treeClass}>
                <Tree /> 
              </span>
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