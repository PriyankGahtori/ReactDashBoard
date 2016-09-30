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
import FormEnableBCICapturing from './Form_EnableBCICapturing';
import FormEnableHotSpotCapturing from './Form_EnableHotSpotCapturing';
import ConfirmDialog from 'material-ui/Dialog';
import DialogEnableBCICapturing from 'material-ui/Dialog';
import * as validate from '../actions/validateGeneralKeywords'


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

class enableBCICapturing extends React.Component {

  constructor(props) {
  super(props);
  console.log("in DCDetail.js--",this.props)
  console.log("------",validate) 
  this.state ={enableBCIDebug:false}
  this.state = {openEnableBCICapturingDialog : false}
  console.log("this.props.getAllKeywordData.BCICapturingCheckBox",this.props.getAllKeywordData.BCICapturingCheckBox)
  this.state = {disableAdvancedSettingTab1 :!this.props.getAllKeywordData.BCICapturingCheckBox}
  this.state = {getAllKeywordData:this.props.getAllKeywordData}
  this.state = {enableBCICheckBox:false}
  }

 
//this function is called first when component gets first loaded
 /* componentWillMount() {
    this.props.getKeywordsData(this.props.params.profileId);
  }
*/
  componentWillReceiveProps(nextProps)
  {
    console.log("nextprops---",nextProps.getAllKeywordData.enableBCICheckBox)
    if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
      console.log("getAllKeywordData data cahnged")
      this.setState({getAllKeywordData : nextProps.getAllKeywordData,
                     enableBCICheckBox : nextProps.getAllKeywordData.enableBCICheckBox
      });
    }

    if(this.props.getAllKeywordData.BCICapturingCheckBox != nextProps.getAllKeywordData.BCICapturingCheckBox)
      this.setState({disableAdvancedSettingTab1:!nextProps.getAllKeywordData.BCICapturingCheckBox})

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
        this.setState({openCnfrmBCIDialog:true
        })
    }
    else{
    this.setState({enableBCICheckBox :isInputChecked })
    this.props.enableBCICheckBoxStatus(isInputChecked);
    this.setState({openCnfrmDisbleDialog:true})
   }
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
* cnfirmation dialog
*/
cnfrmEnableBCIDefVal(){
    console.log("ok button")
   this.props.setDefValBCICapturingKeywords();
   this.props.enableBCICheckBoxStatus(true);
   this.setState({ openCnfrmBCIDialog:false
   })
   
   
}

handleCancelEnableBCIDefVal(){
  this.setState({openCnfrmBCIDialog:false
  })
  this.props.enableBCICheckBoxStatus(false);
}

/*
* Disable Dialog functions
*/
cnfrmDisableBCIVal(){
    
   this.submitForm(validate.disabledBCICapturing);
   this.props.enableBCICheckBoxStatus(false);
   this.setState({ openCnfrmDisbleDialog:false
   })
  
}

handleCancelDisableBCIVal(){
  this.setState({ openCnfrmDisbleDialog:false
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
        onTouchTap={this.handleCancelEnableBCICapturing.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmitEnableBCICapturing.bind(this)}
      />
    ];
    
    

    const actionsBCIDefault = [
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
    ];  

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
        onClick={this.cnfrmDisableBCIVal.bind(this)}
      />
]
  
    return (
      <div>

      <div className = "row">
        <div className = "col-md-3">
         <Checkbox
                  value = "enableBCICapturing"
                  label = "Enable BCI Capturing"
                  checked  = {this.state.enableBCICheckBox}
                  onCustomChange={this.handleenableBCICapturingCheckboxChange.bind(this)}
              />
          </div>
          <div>
    <FlatButton disabled ={!this.state.enableBCICheckBox} onClick ={this.enableBCICapturingDialog.bind(this)} label="Advanced Settings" />
     </div>
    </div>

    
    <DialogEnableBCICapturing
          title="Enable BCI Capturing"
          actions={actions}
          modal={false}
          open={this.state.openEnableBCICapturingDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}         
    >
      <FormEnableBCICapturing ref="enableBCICapturingForm" onSubmit ={this.submitForm.bind(this) } />
   </DialogEnableBCICapturing>
  <ConfirmDialog
          title="Are you sure want to enable the keywords with default Values?"
          actions={actionsBCIDefault}
          modal={false}
          open={this.state.openCnfrmBCIDialog}
          onRequestClose={this.handleClose}
        >
        </ConfirmDialog>

        <ConfirmDialog
          title="Are you sure want to disable the keywords ?"
          actions={actionsBCIDisable}
          modal={false}
          open={this.state.openCnfrmDisbleDialog}
          onRequestClose={this.handleClose}
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
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(enableBCICapturing);
