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
import DialogEnableFpHeaderCapturing from 'material-ui/Dialog';

import * as validate from '../../../../actions/validateGeneralKeywords';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';
import * as actionCreators  from '../../../../actions/index';
import Checkbox from '../../../../components/CheckboxWrapper';
import {getKeywordsData,submitKeywordData}  from '../../../../actions/index';
import FormEnableFpCapturing from './Form_EnableFpCapturing';
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

class EnableFpHeaderCapturing extends React.Component {

  constructor(props) {
    super(props);
    console.log("in DCDetail.js--",this.props)
    console.log("------",validate) 
  //this.state ={enableBCIDebug:false}
  this.state = {openEnableFpHdrCapturingDialog : false}
  this.state = {disableAdvancedSettingTab1 :!this.props.getAllKeywordData.BCICapturingCheckBox}
  this.state = {getAllKeywordData:this.props.getAllKeywordData}
  this.state = {enableFpHdrChkBox:false}
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
     enableFpHdrChkBox : nextProps.getAllKeywordData.enableFpHdrChkBox
   });
  }

 //Not in use "BCICapturingCheckBox"
 if(this.props.getAllKeywordData.BCICapturingCheckBox != nextProps.getAllKeywordData.BCICapturingCheckBox)
  this.setState({disableAdvancedSettingTab1:!nextProps.getAllKeywordData.BCICapturingCheckBox})
}


  /*
  *  functions for enableBCICapturing Dialog
  */

  enableFpHdrCapturingDialog(){
    this.setState({openEnableFpHdrCapturingDialog:true});
  }

  handleEnableFpHdrCapturingCheckboxChange(event,isInputChecked){

    if(isInputChecked === true){
      this.setState({openSnackBar:true
      })
      this.submitForm(validate.setDefaultValuesFpHdrCapturing(this.props.getAllKeywordData.data));
     // this.props.enableFpHdrChkBoxStatus(true);
    }
    else{
      //this.props.enableFpHdrChkBoxStatus(isInputChecked);
      this.setState({openCnfrmDisbleDialog:true})
    }
  }

  handleCancelEnableFpHdrCapturing(){
    // this.props.toggleStateDialogEditTopo();
    this.setState({openEnableFpHdrCapturingDialog:false});
  }


  handleSubmitEnableBCICapturing(){
    this.refs.enableFpCapturingForm.submit();
  }




/*
* cnfirmation dialog
*/
/*cnfrmEnableBCIDefVal(){
    console.log("ok button")
  // this.props.setDefValBCICapturingKeywords();
   //this.props.enableFpHdrChkBoxStatus(true);
   this.setState({ openCnfrmBCIDialog:false
   })
   
   
 }*/

 handleRequestClose(){
  console.log("handle close")
  this.setState({openSnackBar:false
  })
//  this.props.enableFpHdrChkBoxStatus(false);
}

/*
* Disable Dialog functions
*/
cnfrmDisableFpVal(){
  console.log("disabledFpcapturing")
  this.submitForm(validate.disabledFpCapturing);
//  this.props.enableFpHdrChkBoxStatus(false);
  this.setState({ openCnfrmDisbleDialog:false
  })
  
}

handleCancelDisableBCIVal(){
  this.setState({ openCnfrmDisbleDialog:false,
    enableFpHdrChkBox :true 
  })
}

submitForm(formData){
  console.log("Fprmdata of enableFpHdrCapturing---",formData)
  console.log("deflyValu---",formData.enableCaptureHTTPReqFullFp)
  let keywordData = Object.assign({},this.props.getAllKeywordData.data);
 
  /*handle the case of enabling keyword wd default value
  * formData = { "captureHTTPReqFullFp" : data.captureHTTPReqFullFp.defaultValue,
                 "captureHTTPRespFullFp":data.captureHTTPRespFullFp.defaultValue
             }
  */
  if(formData.hasOwnProperty('enableCaptureHTTPReqFullFp')){
  var captureHttpFullReqFpVal = modifiedVal.constValCaptureHTTPReqFullFp(formData)
  console.log("captureHttpFullReqFpVal---",captureHttpFullReqFpVal)
  keywordData["captureHTTPReqFullFp"]["value"] = String(captureHttpFullReqFpVal); 
}
else{
  keywordData["captureHTTPReqFullFp"]["value"] = formData.captureHTTPReqFullFp;
}

  if(formData.hasOwnProperty('enableCaptureHTTPResFullFp')){
    var captureHttpFullRespFpVal = modifiedVal.constValCaptureHTTPResFullFp(formData)
    console.log("captureHttpFullRespFpVal---",captureHttpFullRespFpVal)
    keywordData["captureHTTPRespFullFp"]["value"] = String(captureHttpFullRespFpVal); 
}
else{
  keywordData["captureHTTPRespFullFp"]["value"] = formData.captureHTTPRespFullFp;
}



  console.log("keywordData--",keywordData)
  this.props.submitKeywordData(keywordData,this.props.profileId);

  //action for runtime change
  // triggerRunTimeChanges(trData,trModeDetail,formData);
   let keywordDataList = [];
   Object.keys(formData).forEach(function(key){
     keywordDataList.push(key + "=" + formData[key]); 
   })    
   triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 
   this.handleCancelEnableFpHdrCapturing();
 }


 render() {
   const actions = [
   <FlatButton
   label ="Cancel"
   primary ={true}
   onTouchTap ={this.handleCancelEnableFpHdrCapturing.bind(this)}
   />,
   <FlatButton
   label = "Submit"
   primary = {true}
   keyboardFocused = {true}
   onClick = {this.handleSubmitEnableBCICapturing.bind(this)}
   />
   ];



    {/*const actionsBCIDefault = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelEnableBCIDefVal.bind(this)}
      />,
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={this.cnfrmEnableBCIDefVal.bind(this)}
      />
    ];  */}

    const actionsBCIDisable =[
    <FlatButton
    label="Cancel"
    primary={true}
    onTouchTap={this.handleCancelDisableBCIVal.bind(this)}
    />,
    <FlatButton
    label="OK"
    primary={true}
    keyboardFocused={true}
    onClick={this.cnfrmDisableFpVal.bind(this)}
    />
    ]

    return (
      <div>

      <div className = "row">
      <div className = "col-md-3">
      <Checkbox
      value = "enableFpHeaderCapturing"
      label = "Enable FlowPath Header Capturing"
      checked  = {this.state.enableFpHdrChkBox}
      onCustomChange={this.handleEnableFpHdrCapturingCheckboxChange.bind(this)} />
      <i style={{paddingLeft:40}}>(Http request and response headers Capture Configuration) </i> 
      
      </div>
      <div>
      <FlatButton className="col-md-4"

       disabled ={!this.state.enableFpHdrChkBox} onClick ={this.enableFpHdrCapturingDialog.bind(this)} label="Advanced Settings" />
      </div>
      </div>


      <DialogEnableFpHeaderCapturing
      title="FlowPath Header Capturing"
      actions = {actions}
      autoScrollBodyContent = {true}  
      modal = {true}
      open = {this.state.openEnableFpHdrCapturingDialog}
      onRequestClose = {this.handleClose}
      >
      <FormEnableFpCapturing ref="enableFpCapturingForm" onSubmit ={this.submitForm.bind(this) } />
      </DialogEnableFpHeaderCapturing>

      <Snackbar
      open={this.state.openSnackBar}
      message="Fp Header capturing keywords with default values is enabled now."
      autoHideDuration={4000}
      onRequestClose={this.handleRequestClose.bind(this)}
      />

      <ConfirmDialog
      title="Are you sure want to disable the FP Capturing keywords ?"
      actions={actionsBCIDisable}
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
  export default connect(mapStateToProps,mapDispatchToProps)(EnableFpHeaderCapturing);
