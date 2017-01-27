//Importing React components
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

//Importing files
import * as actionCreators  from '../../../../actions/index';
import CheckBox from '../../../../components/CheckboxWrapper';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';

class EnableErrorDetection extends Component {
  
	constructor(props) {
  		super(props);
  		this.state = {
                    checked:this.props.initialValKeywords.BTErrorRules,
                    openSnackBar:false
                   };
 	}

 	componentWillReceiveProps(nextProps)
  	{
   	   //change the state of checkbox
       console.log("this.props--",this.props.initialValKeywords.BTErrorRules)
       console.log('nextprops--',nextProps.initialValKeywords.BTErrorRules)
	    if(this.props.initialValKeywords.BTErrorRules != nextProps.initialValKeywords.BTErrorRules){
	      this.setState({ checked: nextProps.initialValKeywords.BTErrorRules});
	    }

  	}

  	getProfileName(profileId)
  	{
  		try{
  			let profileData = this.props.homeData[1]
  			                      .value
  			                      .filter(function(obj){return obj.id == profileId });	
  			if(profileData.length != 0)
  			  return profileData[0].name;
  			else
  			  return null;    			
  		}
  		catch(ex)
  		{
  			console.error("error in getting profileId " + ex);
  			return null;
  		}

  	}

 	handleCheck(event,value){
 		//if value is false i.e keyword disabled, show confirmation box
 		//otherwise show snackbar, with message Keyword is ENABLED

 		//clone all the keywords and change NDEntryPointsFile as passed value
 		let keywordData = Object.assign({},this.props.getAllKeywordData.data);

 		if(value){
 		//enable the checkbox and keyword and show snackbar
 		   //this.setState({checked: true});
 		   keywordData.BTErrorRules.value = String(value);
       this.props.submitKeywordData(keywordData,this.props.trModeDetail.profileId);
       this.setState({ openSnackBar: true });

      //action for runtime change
      var filePath = this.props.ns_wdir + "/ndprof/conf/" + this.getProfileName(this.props.trModeDetail.profileId) + "/btErrorRule.err" ;
		  console.info("filePath", filePath);	      	  
		  let keywordDataList = [];
		    keywordDataList.push("BTErrorRules=" + filePath ); 
		  triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 

 		}
 		else{
 		//open confirmation box, for disabling keyword
 			this.setState({open: true});
 		}

 	}

 	//close the confirmation box and disable the checkbox
 	handleKeywordDisable(){
 		
     	this.setState({open: false });

     	let keywordData = Object.assign({},this.props.getAllKeywordData.data);
     	keywordData.BTErrorRules.value = "false";
     	this.props.submitKeywordData(keywordData,this.props.trModeDetail.profileId);

     	//runtime change disable keyword
     	let keywordDataList = [];
		    keywordDataList.push("BTErrorRules=NA"); 
		  triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 
    };

  handleClose(){
   	this.setState({open: false});
  };

  handleSnackbarClose(){
    this.setState({ openSnackBar: false});
  }



	render() {

		//for confirmation box
		const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onTouchTap={this.handleClose.bind(this)}
	      />,
	      <FlatButton
	        label="Ok"
	        primary={true}
	        keyboardFocused={true}
	        onTouchTap={this.handleKeywordDisable.bind(this)}
	      />,
	    ];


		return (
    <div  style={{paddingTop:10}}>
   
	   <div className = "col-md-1" style={{right:15}}>
				<CheckBox
	        iconStyle={{width:'medium',height:'15px'}}
          style={{border:'0.5px solid white'}}
          labelStyle={{color:'#FFF'}}
					onCustomChange={this.handleCheck.bind(this)}
					checked= {this.state.checked === 'true'}	/>
          </div>
      {/*  <i className = "col-md-5" style={{right:240,top:5}}>Enable Service Entry Points</i> */}
			
        <Dialog  
		          title="Are you sure you want to disable BT Error Rules ?"
		          actions={actions}
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose.bind(this)} />

        <Snackbar
          open={this.state.openSnackBar}
          message="BTErrorRules is Enabled"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose.bind(this)}
        />
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
    getAllKeywordData :state.Keywords,
    trData : state.initialData.trData,
    ns_wdir: state.initialData.ns_wdir,
    homeData: state.initialData.homeData,	
    trModeDetail: state.trModeDetail,
    initialValKeywords :state.Keywords.initializeKeywords
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(EnableErrorDetection);
