import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';


import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

import FlatButton from 'material-ui/FlatButton';
import {hashHistory } from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { reduxForm } from 'redux-form';
import _ from "lodash";

import { Link } from 'react-router';
import {getKeywordsData,submitKeywordData}  from '../actions/index';
import ConfirmDialog from 'material-ui/Dialog';
import InstrProfiles from './InstrProfileMultiSelect';

import EnableBCICapturing from './EnableBCICapturing';
import EnableHotSpotCapturing from './EnableHotSpotCapturing';

const styles = {
  text: {
    fontSize:18,
    paddingLeft:6
  },
  toggle: {
      marginTop:30 ,
      paddingLeft:80
  },
  customWidth: {
      width: 200
    },
  toggleCustomFQM :{
     paddingLeft:-4
  },
  entryPointBlock:{
    paddingLeft:10,
    paddingTop:5
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

class GeneralKeywords extends React.Component {

  constructor(props) {
  super(props);
  console.log("in DCDetail.js--",this.props)
  
  this.state ={enableBCIDebug:false}
  this.state = {openEnableBCICapturingDialog : false}
   this.state = {openEnableHotSpotCapturingDialog : false}
   console.log("this.props.getAllKeywordData.BCICapturingCheckBox",this.props.getAllKeywordData.BCICapturingCheckBox)
  this.state = {disableAdvancedSettingTab1 :!this.props.getAllKeywordData.BCICapturingCheckBox}
  this.state = {disableAdvancedSettingTab2 :!this.props.getAllKeywordData.hotSpotCapturingCheckBox}
  this.state = {getAllKeywordData:this.props.getAllKeywordData}
 
  

    //this.enableBCICapturingDialog = this.enableBCICapturingDialog.bind(this);
  //this.handleCancelEnableBCICapturing = this.handleCancelEnableBCICapturing.bind(this);

  }

 
//this function is called first when component gets first loaded
  componentWillMount() {
    this.props.getKeywordsData(this.props.params.profileId);
  }

  componentWillReceiveProps(nextProps)
  {
    console.log("nextprops---",nextProps.getAllKeywordData.BCICapturingCheckBox)
    console.log("nextprops---",nextProps.getAllKeywordData.hotSpotCapturingCheckBox)
    if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
      console.log("getAllKeywordData data cahnged")
      this.setState({getAllKeywordData:nextProps.getAllKeywordData});
    }

    if(this.props.getAllKeywordData.BCICapturingCheckBox != nextProps.getAllKeywordData.BCICapturingCheckBox)
      this.setState({disableAdvancedSettingTab1:!nextProps.getAllKeywordData.BCICapturingCheckBox})


    if(this.props.getAllKeywordData.hotSpotCapturingCheckBox != nextProps.getAllKeywordData.hotSpotCapturingCheckBox)
      this.setState({disableAdvancedSettingTab2:!nextProps.getAllKeywordData.hotSpotCapturingCheckBox})

  }


   handleDReqCheckboxChange(event,value){
   console.log("event---",event)
   console.log("value---",value)
  }
  /*
  *  functions for enableBCICapturing Dialog
  */

  enableBCICapturingDialog(){
    
    this.setState({openEnableBCICapturingDialog:true});
    console.log("EnableBCICapturingDialog function callded---")
  }

  handleenableBCICapturingCheckboxChange(event,isInputChecked){
    console.log("isInputChecked---",isInputChecked)

    if(isInputChecked === true)
    {
      console.log("action trigegerd")
      //this.props.setDefValBCICapturingKeywords();
        this.setState({openCnfrmBCIDialog:true})
    }
    this.setState({disableAdvancedSettingTab1:!isInputChecked})
  }

   handleCancelEnableBCICapturing(){
    // this.props.toggleStateDialogEditTopo();
     this.setState({openEnableBCICapturingDialog:false});
  }
 

handleSubmitEnableBCICapturing(){
  console.log("handleSubmit---", this.refs)
  this.refs.enableBCICapturingForm.submit();
  this.handleCancelEnableBCICapturing();
  console.log("after closing the dialog----")
  }


/*
* functions for hotSpot capturing
*/
handleenableHotSpotCapturingCheckboxChange(event,isInputChecked){
  if(isInputChecked === true)
    {
      //console.log("action trigegerd")
    //  this.props.setDefValHotSpotCapturingKeywords();
    /*
    * opening cnfirm dialog 
    */
    this.setState({openCnfrmHotSpotDialog:true})
   
    }
    this.setState({disableAdvancedSettingTab2:!isInputChecked})
  }

enableHotSpotCapturingDialog(){
  this.setState({openEnableHotSpotCapturingDialog:true});
    console.log("EnableBCICapturingDialog function callded---")
}

 handleCancelEnableHotSpotCapturing(){
    // this.props.toggleStateDialogEditTopo();
     this.setState({openEnableHotSpotCapturingDialog:false});
  }
 

handleSubmitEnableHotSpotCapturing(){
  console.log("handleSubmit---", this.refs)
  this.refs.enableHotSpotCapturingForm.submit();
  this.handleCancelEnableHotSpotCapturing();
  console.log("after closing the dialog----")
  }


/*
* cnfirmation dialog
*/
cnfrmEnableBCIDefVal(){
   this.props.setDefValBCICapturingKeywords();
   this.handleCancelEnableBCIDefVal();
}
handleCancelEnableBCIDefVal(){
  this.setState({openCnfrmBCIDialog:false})
}

cnfrmEnableHotSpotDefVal(){
   this.props.setDefValHotSpotCapturingKeywords();
   this.handleCancelEnableHotSpotDefVal();
}

handleCancelEnableHotSpotDefVal(){
  this.setState({openCnfrmHotSpotDialog:false})
}

  submitForm(formData){
    console.log("submitForm----",formData)
   
    console.log("getAllKeywordData---",this.props.getAllKeywordData) ;
    console.log("data---general keywords--",formData)
    console.log("profileId--",this.props.params.profileId)

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
      console.log("value for boolean values---",value)
       keywordData[key]["value"] = String(value); 
      
    }) ;
    console.log("finalFormData---",keywordData)
    this.props.submitKeywordData(keywordData,this.props.params.profileId);     
}


  


  render() {
  
    return (
      <div>
      <EnableBCICapturing profileId = {this.props.params.profileId}/>
      <EnableHotSpotCapturing profileId = {this.props.params.profileId} />   
      <InstrProfiles handleSubmit = {this.submitForm.bind(this)}/>
      
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
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(GeneralKeywords);
