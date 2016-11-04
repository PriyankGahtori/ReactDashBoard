import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

import FlatButton from 'material-ui/FlatButton';
import {hashHistory } from 'react-router';
import Checkbox from '../components/CheckboxWrapper';
import TextField from 'material-ui/TextField';
import { reduxForm } from 'redux-form';
import _ from "lodash";
import { Link } from 'react-router';
import {getKeywordsData,submitKeywordData}  from '../actions/index';
import FormEnableBackendMonitor from './Form_EnableBackendMonitor';
import ConfirmDialog from 'material-ui/Dialog';
import DialogEnableBackendMonitor from 'material-ui/Dialog';
import * as validate from '../actions/validateGeneralKeywords';


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

class EnableBackendMonitor extends React.Component {

  constructor(props) {
  super(props);
  console.log("in props--",this.props)
  console.log("------",validate) 
  this.state = {openSnackBar:false}
   this.state = {enableBackendMonitorCheckBox:false}
  }

 
//this function is called first when component gets first loaded
  componentWillMount() {
    this.state = {openSnackBar:false}
  }


  componentWillReceiveProps(nextProps)
  {
    console.log("nextprops---",nextProps.getAllKeywordData.enableBackendMonitorCheckBox)
    
    if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
      console.log("getAllKeywordData data cahnged")
      this.setState({getAllKeywordData : nextProps.getAllKeywordData,
                     enableBackendMonitorCheckBox : nextProps.getAllKeywordData.enableBackendMonitorCheckBox
      });
    }

    if(this.props.getAllKeywordData.enableBackendMonitorCheckBox != nextProps.getAllKeywordData.enableBackendMonitorCheckBox)
      this.setState({disableAdvancedSettingTab3:!nextProps.getAllKeywordData.enableBackendMonitorCheckBox})

  }


   handleDReqCheckboxChange(event,value){
   console.log("event---",event)
   console.log("value---",value)
  }
  /*
  *  functions for enableBCICapturing Dialog
  */

  handleEnableBackendMonitorDialog(){
    this.setState({openEnableBackendMonitorDialog:true});
    console.log("handleEnableBackendMonitorDialog function callded---")
  }


  handleEnableBackendMonitor(event,isInputChecked){
    console.log("isInputChecked--handleEnableBackendMonitor CHECKBOX-",isInputChecked)
    
    if(isInputChecked === true)
    {
      console.log("action trigegerd opening Snackbar")
       this.setState({openSnackBar:true})
       this.submitForm(validate.setDefaultValuesBackendMonitor(this.props.getAllKeywordData.data));
       this.props.enableBackendMonitorCheckBoxStatus(true);
    }
    else
    {
        this.props.enableBackendMonitorCheckBoxStatus(isInputChecked);
        this.setState({openCnfrmDisbleDialog:true})
   }
  }

   handleCancel()
   {
     this.setState({openEnableBackendMonitorDialog:false});
   }
 

handleSubmit(){
  console.log("handleSubmit---", this.refs)
  this.refs.backendMonitorForm.submit();
  this.handleCancel();
  console.log("after closing the dialog----")
  }


handleRequestClose(){
  console.log("handle close")
  this.setState({openSnackBar:false
  })
}

/*
* Disable Dialog functions
*/
handleConfirmDisableBackendMon(){
    
   this.submitForm(validate.disabledBackendMonitor);
   this.props.enableBackendMonitorCheckBoxStatus(false);
   this.setState({ openCnfrmDisbleDialog:false
   })
  
}

handleCancelDisableBackendMon(){
  this.setState({ openCnfrmDisbleDialog:false,
                  enableBackendMonitorCheckBox :true 
   })
}

  submitForm(formData){
    console.log("submitForm----",formData)
   
    console.log("getAllKeywordData---",this.props.getAllKeywordData) ;
    console.log("data---general keywords--",formData)
    console.log("profileId--",this.props.profileId)

    let keywordData = Object.assign({},this.props.getAllKeywordData.data);

    console.log("keywordData--",keywordData)
    
    /*
    * final data is data that is fetched from server and its value is updated according to user input,
    * Final data object contains all the keywords  .
    */

    let finalFormData = _.forEach(formData,function(value,key){
      if(value === "true" ||  value === true){
        value = "1" ;
      }
      else if(value === "false" || value === false){
        value = "0" ;
      }
      console.log("key---",key)
      console.log("value for boolean values---",value)
       keywordData[key]["value"] = String(value); 
      
    }) ;
    console.log("finalFormData---",keywordData)
    this.props.submitKeywordData(keywordData,this.props.profileId);     
}


  render() {
     const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit.bind(this)}
      />
    ];
    
    

  
const actionsBackendMonDisable =[
        <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelDisableBackendMon.bind(this)}
      />,
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleConfirmDisableBackendMon.bind(this)}
      />
];
  
    return (
      <div>

      <div className = "row" style={{'paddingLeft':14}}>
        <div className = "col-md-3">
         <Checkbox
                  value = "enableBackendMonitor"
                  label = "Enable Backend Monitor"
                  checked  = {this.state.enableBackendMonitorCheckBox}
                  onCustomChange={this.handleEnableBackendMonitor.bind(this)}
         />
        </div>
      <div>
    <FlatButton disabled ={!this.state.enableBackendMonitorCheckBox} onClick ={this.handleEnableBackendMonitorDialog.bind(this)} label="Advanced Settings" />
     </div>
    </div>

    
    <DialogEnableBackendMonitor
          title="Enable Backend Monitor"
          actions={actions}
          modal={false}
          open={this.state.openEnableBackendMonitorDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}         
    >
    <FormEnableBackendMonitor ref="backendMonitorForm" onSubmit ={this.submitForm.bind(this) } />
    </DialogEnableBackendMonitor>

         <Snackbar
          open={this.state.openSnackBar}
          message="Backend monitor with default values is enabled now."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />

        <ConfirmDialog
          title="Are you sure want to disable the Backend Monitor?"
          actions={actionsBackendMonDisable}
          modal={false}
          open={this.state.openCnfrmDisbleDialog}
        >
        </ConfirmDialog>

        
  </div>
    );
  }
}


function mapStateToProps(state) {
  console.log("generalKeywords---",state.Keywords)
  return {
    getAllKeywordData :state.Keywords
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(EnableBackendMonitor);
