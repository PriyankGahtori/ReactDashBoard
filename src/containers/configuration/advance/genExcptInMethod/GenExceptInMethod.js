
//Importing react components
import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import {hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import { reduxForm } from 'redux-form';
import _ from "lodash";
import { Link } from 'react-router';
import ConfirmDialog from 'material-ui/Dialog';
import DialogGenExceptInMethod from 'material-ui/Dialog';

import * as validate from '../../../../actions/validateGeneralKeywords';
import * as constructValue from '../../../utils/keywordsValue.js' ;
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';
import * as actionCreators  from '../../../../actions/index';
import Checkbox from '../../../../components/CheckboxWrapper';
import {getKeywordsData,submitKeywordData}  from '../../../../actions/index';
import FormGenExcptInMethod from './Form_GenerateExceptionInMethod';
import * as  modifiedVal from './ModifyValue';


const styles = {
	text: {
		fontSize:18,
		paddingLeft:6
	},

	mainBlock:{
		paddingLeft:10,
		paddingBottom:20
	},
	row1:{
		paddingBottom:20
	},
	row2:{
		paddingTop : 40
	},
	title:{
		fontSize: 16,
		padding: 8
	}
};
/*
* data --- table column name
* key ---- acting as a primary key
* 
*/


const style = {
  //margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const NewButtonstyle = {
	margin: 0,
	top: 'auto',
	right: 20,
	bottom: 30,
	left: 'auto',
	position: 'fixed'

};

class GenExcptInMethod extends React.Component {

	constructor(props) {
		super(props);
  //this.state ={enableBCIDebug:false}
  this.state = {openEnableExcptCapturingDialog : false}
  this.state = {disableAdvancedSettingTab1 :!this.props.getAllKeywordData.BCICapturingCheckBox}
  this.state = {getAllKeywordData:this.props.getAllKeywordData}
  this.state = {enableExcptCheckBox:false,genExcptInMethod:false}
  this.state = {openSnackBar:false}
}


//this function is called first when component gets first loaded
componentWillMount() {
	this.state = {openSnackBar:false}
}
componentWillReceiveProps(nextProps)
{
	if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
		this.setState({getAllKeywordData : nextProps.getAllKeywordData,
			genExcptInMethod : nextProps.getAllKeywordData.genExcptInMethod
		});
	}

	if(this.props.getAllKeywordData.ExcptCapturingCheckBox != nextProps.getAllKeywordData.ExcptCapturingCheckBox)
		this.setState({disableAdvancedSettingTab1:!nextProps.getAllKeywordData.ExcptCapturingCheckBox})

}


  /*
  *  functions for enableBCICapturing Dialog
  */

  enableExcptCapturingDialog(){
  	this.setState({openEnableExcptCapturingDialog:true});
  }


  handleGenExcptInMethod(event,isInputChecked){
  	if(isInputChecked === true ){

      //this.props.setDefValBCICapturingKeywords();
      this.setState({openSnackBar:true,genExcptInMethod:true})
      var data = this.props.getAllKeywordData.data ;
      //this.submitForm(data);
       //this.props.setDefValBCICapturingKeywords();
       this.props.genExcptInMethod(true);
   }
   else{
   	this.setState({openCnfrmDisbleDialog:true})
   	 
   }
}

handleCancelGenExcptInMethod(){
	this.setState({openEnableExcptCapturingDialog:false});
}


handleSubmitGenExcptInMethod(){
	this.refs.enableGenExcptInMethod.submit();
}



handleRequestClose(){
	this.setState({openSnackBar:false
	})
}

/*
* Disable Dialog functions
*/
cnfrmDisableExcptVal(){
	var data = {'generateExceptionInMethod':'0'}
	this.submitForm(data);
	this.setState({ openCnfrmDisbleDialog:false
	})

}

handleCancelDisableExcptVal(){
	this.setState({ openCnfrmDisbleDialog:false,
		genExcptInMethod :true 
	})
}

submitForm(formData){
	let keywordData = Object.assign({},this.props.getAllKeywordData.data);

    /*
    * Here formData is handled to form value for keyowrd "genExcptInMethod"
    *  genExcptInMethod = Perc %20 fqm %20 ExceptionType %20 ExceptionName
    *  In fqm ,if string contains ';'.it has to be replaced with %3B
    */
    var genExcptInMethod=0
    var length = Object.keys(formData).length
    
    /* below check handles the case of disabling the keyword i.e
   	* when formData = {"genExcptInMethod":'0'}
   	* there is no need to call constructVal function
   	*/

   	if(length > 1){
   		genExcptInMethod = modifiedVal.constructVal(formData);
   		keywordData.generateExceptionInMethod["value"] = genExcptInMethod ;
   	}
   	else
   		keywordData.generateExceptionInMethod["value"] =  0 ;

   	this.props.submitKeywordData(keywordData,this.props.profileId);
   	
   //action for runtime change
   //triggerRunTimeChanges(trData,trModeDetail,formData);
   let keywordDataList = [];
   keywordDataList.push("generateExceptionInMethod"+ "=" + genExcptInMethod)
   /*Object.keys(formData).forEach(function(key){
   	keywordDataList.push(key + "=" + formData[key]); 
   })  */  
   triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 
   this.handleCancelGenExcptInMethod();
}


render() {
	const actions = [
	<FlatButton
	label="Cancel"
	primary={true}
	onTouchTap={this.handleCancelGenExcptInMethod.bind(this)}
	/>,
	<FlatButton
	label="Submit"
	primary={true}
	keyboardFocused={true}
	onClick={this.handleSubmitGenExcptInMethod.bind(this)}
	/>
	];




	const actionsDisable =[
	<FlatButton
	label="Cancel"
	primary={true}
	onTouchTap={this.handleCancelDisableExcptVal.bind(this)}
	/>,
	<FlatButton
	label="OK"
	primary={true}
	keyboardFocused={true}
	onClick={this.cnfrmDisableExcptVal.bind(this)}
	/>
	]

	return (
		<div style={{'paddingLeft':10,'paddingTop':10}}>

		<div className = "row"  >
		<div className = "col-md-5">
		<Checkbox
		value = "genExcptInMethod"
		label = "Generate Exception In Method"
		checked  = {this.state.genExcptInMethod}
		onCustomChange={this.handleGenExcptInMethod.bind(this)}/>
		<i style={{paddingLeft:40}}> Enable Exception generation in certain method</i>
		</div>
		<div>
		<FlatButton className = "col-md-4" 
					disabled ={!this.state.genExcptInMethod} 
					onClick ={this.enableExcptCapturingDialog.bind(this)} 
					label="Advanced Settings" />
		</div>
		</div>


		<DialogGenExceptInMethod
		title = "Generate Exception In Method"
		actions = {actions}
		modal = {false}
		open = {this.state.openEnableExcptCapturingDialog}
		onRequestClose = {this.handleClose}
		autoScrollBodyContent = {true}     
		titleStyle={styles.title}    
		>
		<FormGenExcptInMethod ref="enableGenExcptInMethod" onSubmit ={this.submitForm.bind(this) } />
		</DialogGenExceptInMethod>



		<Snackbar
		open={this.state.openSnackBar}
		message="Generate Exception In Method keywords with default values is enabled now."
		autoHideDuration={4000}
		onRequestClose={this.handleRequestClose.bind(this)}
		/>

		<ConfirmDialog
		title="Are you sure want to disable GenerateExceptionInMethod keyword ?"
		actions={actionsDisable}
		modal={false}
		open={this.state.openCnfrmDisbleDialog}
		>
		</ConfirmDialog>


		</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		getAllKeywordData :state.Keywords,
		trData : state.initialData.trData,
		trModeDetail: state.trModeDetail
	};
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
	//const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
	//return actionMap;
	return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(GenExcptInMethod);
