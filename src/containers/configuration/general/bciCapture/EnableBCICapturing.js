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
import DialogEnableBCICapturing from 'material-ui/Dialog';

import * as validate from '../../../../actions/validateGeneralKeywords';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';
import * as actionCreators  from '../../../../actions/index';
import Checkbox from '../../../../components/CheckboxWrapper';
import {getKeywordsData,submitKeywordData}  from '../../../../actions/index';
import FormEnableBCICapturing from './Form_EnableBCICapturing';


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
    fontSize: '16px',
    padding: '8px'
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

class EnableBCICapturing extends React.Component {

  constructor(props) {
    super(props);
    console.log("in DCDetail.js--",this.props)
    console.log("------",validate) 
  //this.state ={enableBCIDebug:false}
  this.state = {openEnableBCICapturingDialog : false}
  this.state = {disableAdvancedSettingTab1 :!this.props.getAllKeywordData.BCICapturingCheckBox}
  this.state = {getAllKeywordData:this.props.getAllKeywordData}
  this.state = {enableBCICheckBox:false}
  this.state = {openSnackBar:false}
}


//this function is called first when component gets first loaded
componentWillMount() {
   // this.props.getKeywordsData(this.props.params.profileId);
   this.state = {openSnackBar:false}
 }
 componentWillReceiveProps(nextProps)
 {
  console.log("nextprops---",nextProps.getAllKeywordData.enableBCICheckBox)

  if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
    console.log("getAllKeywordData data cahnged")
    this.setState({getAllKeywordData : nextProps.getAllKeywordData,
     enableBCICheckBox : nextProps.getAllKeywordData.enableBCICheckBox
   });
  }
 
 //Not in use "BCICapturingCheckBox"
  if(this.props.getAllKeywordData.BCICapturingCheckBox != nextProps.getAllKeywordData.BCICapturingCheckBox)
    this.setState({disableAdvancedSettingTab1:!nextProps.getAllKeywordData.BCICapturingCheckBox})
}


handleDReqCheckboxChange(event,value){
}
  /*
  *  functions for enableBCICapturing Dialog
  */

  enableBCICapturingDialog(){
    this.setState({openEnableBCICapturingDialog:true});
  }

  handleEnableBCICapturingCheckboxChange(event,isInputChecked){

    if(isInputChecked === true)
    {
      //this.props.setDefValBCICapturingKeywords();
      this.setState({openSnackBar:true
      })
      this.submitForm(validate.setDefaultValuesBCICapturing(this.props.getAllKeywordData.data));
       //this.props.setDefValBCICapturingKeywords();
       this.props.enableBCICheckBoxStatus(true);
     }
     else{
      this.props.enableBCICheckBoxStatus(isInputChecked);
      this.setState({openCnfrmDisbleDialog:true})
    }
  }

  handleCancelEnableBCICapturing(){
    // this.props.toggleStateDialogEditTopo();
    this.setState({openEnableBCICapturingDialog:false});
  }


  handleSubmitEnableBCICapturing(){
    this.refs.enableBCICapturingForm.submit();
  }




/*
* cnfirmation dialog
*/
/*cnfrmEnableBCIDefVal(){
    console.log("ok button")
  // this.props.setDefValBCICapturingKeywords();
   //this.props.enableBCICheckBoxStatus(true);
   this.setState({ openCnfrmBCIDialog:false
   })
   
   
 }*/

 handleRequestClose(){
  console.log("handle close")
  this.setState({openSnackBar:false
  })
//  this.props.enableBCICheckBoxStatus(false);
}

/*
* Disable Dialog functions
*/
cnfrmDisableBCIVal(){
  console.log("disabledbcicapturing")
  this.submitForm(validate.disabledBCICapturing);
  this.props.enableBCICheckBoxStatus(false);
  this.setState({ openCnfrmDisbleDialog:false
  })
  
}

handleCancelDisableBCIVal(){
  this.setState({ openCnfrmDisbleDialog:false,
    enableBCICheckBox :true 
  })
}

submitForm(formData){


  let keywordData = Object.assign({},this.props.getAllKeywordData.data);

  console.log("keywordData--",keywordData)

    /*
    * final data is data that is fetched from server and its value is updated according to user input,
    * Final data object contains all the keywords  .
    */

    let finalFormData = _.forEach(formData,function(value,key){

      /* Here this  condition is for checkboxes whose values are boolean i.e true or false
      * As per backend code,values of checkboxes should be 1 or 0
      * so following code fulfills this requirement.
      */

      if(value === "true" ||  value === true){
        value = "1" ;
      }
      else if(value === "false" || value === false){
        value = "0" ;
      }
      keywordData[key]["value"] = String(value); 
    }) ;
   this.props.submitKeywordData(keywordData,this.props.profileId);
  
   //action for runtime change
   //triggerRunTimeChanges(trData,trModeDetail,formData);
   let keywordDataList = [];
   Object.keys(formData).forEach(function(key){
     keywordDataList.push(key + "=" + formData[key]); 
   })    
   triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 
   this.handleCancelEnableBCICapturing();
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
    onClick={this.cnfrmDisableBCIVal.bind(this)}
    />
    ]

    return (
      <div>

     <div className = "row"  style={{'paddingTop':10}}>
        <div className = "col-md-5" >
          
         <Checkbox
                  label ="Enable FlowPath Capturing "
                  value = "enableBCICapturing"
                  checked  = {this.state.enableBCICheckBox}
                  onCustomChange={this.handleEnableBCICapturingCheckboxChange.bind(this)}  />
                 <i style={{paddingLeft:40}}>Enable flowPath capturing by agent with default settings</i>
         </div>  
      <div  className = "col-md-2" >   
         <RaisedButton 
            disabled ={!this.state.enableBCICheckBox} 
            onClick ={this.enableBCICapturingDialog.bind(this)}
            style={{width:150}}
            backgroundColor="#18494F"
            disabledLabelColor="#000"
            labelColor="#FFF"
            label="Advance Settings" 
            labelStyle={{fontSize:12}}/> 
      </div>     
    </div>

    
    <DialogEnableBCICapturing
          style={{paddingTop:10}}
          title="FlowPath Capturing"
          actions={actions}
          modal={false}
          open={this.state.openEnableBCICapturingDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          titleStyle={styles.title}

    >

      <FormEnableBCICapturing ref="enableBCICapturingForm" onSubmit ={this.submitForm.bind(this) } />
      </DialogEnableBCICapturing>
  {/*<ConfirmDialog
          title="Are you sure want to enable the keywords with default Values?"
          actions={actionsBCIDefault}
          modal={false}
          open={this.state.openCnfrmBCIDialog}
          onRequestClose={this.handleClose}
        >
      </ConfirmDialog>*/}


         <Snackbar
          open={this.state.openSnackBar}
          message="BCI capturing keywords with default values is enabled now."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)} />

        <ConfirmDialog
          title="Are you sure want to disable the applied settings ?"
          actions={actionsBCIDisable}
          modal={false}
          open={this.state.openCnfrmDisbleDialog} >
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
  export default connect(mapStateToProps,mapDispatchToProps)(EnableBCICapturing);
