import React, { Component } from 'react';
import * as actionCreators  from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';

class TRToggle extends Component {

	constructor(props) 
	{
	    super(props);
	    this.state = {
	      open: false,
	      message:"All Changes will be made online"
	    };
  	}

  	handleRequestClose()
  	{
  		this.setState({
	      open: false,
	    });
  	}

	handleToggle(evt,value)
	{
		//TR is running and want to make offline changes

		//action to change toggle button's state
		this.props.toggleTRState();

		//show the Snackbar 
		if(value == true)
		{
			this.setState({
		      open: true,
		      message: "All Changes will be made ONLINE"
		    });
		}
		else
		{
			this.setState({
		      open: true,
		      message: "All Changes will be made OFFLINE"
		    });
		}    

	}

	render() {
		return (
			<div>
				<Toggle 
				  label={`TR No: ${this.props.trNo == null ? 'NA': this.props.trNo}`}
				  //disabled={this.props.trNo != 'running'} 
				  defaultToggled={this.props.trData.switch}
				  onToggle={this.handleToggle.bind(this)}
				/>
				
				<Snackbar
		          open={this.state.open}
		          message={this.state.message}
		          action="close"
		          autoHideDuration={4000}
		          onRequestClose={this.handleRequestClose.bind(this)}
		          onActionTouchTap={this.handleRequestClose.bind(this)}
		          style={{'width':'100%'}}
		        />
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
export default connect(mapStateToProps,mapDispatchToProps)(TRToggle);
