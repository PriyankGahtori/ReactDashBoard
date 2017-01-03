//Importing React components
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
import DialogEnableMonitor from 'material-ui/Dialog';

//Importing files
import Checkbox from '../../../../components/CheckboxWrapper';
import * as actionCreators  from '../../../../actions/index';
import {getKeywordsData,submitKeywordData}  from '../../../../actions/index';
import FormEnableMonitors from './Form_EnableMonitors';
import * as validate from '../../../../actions/validateGeneralKeywords';


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

class EnableMonitors extends React.Component {

  constructor(props) {
    super(props);
    console.log("in props--",this.props)
    console.log("------",validate) 
    this.state = {openSnackBar:false}
    this.state = {enableMonitorsCheckBox:false}
  }


 //this function is called first when component gets first loaded
 componentWillMount() {
  this.state = {openSnackBar:false}
}


componentWillReceiveProps(nextProps)
{
  console.log("nextprops---",nextProps.getAllKeywordData.enableMonitorsCheckBox)

  if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
    this.setState({getAllKeywordData : nextProps.getAllKeywordData,
     enableMonitorsCheckBox : nextProps.getAllKeywordData.enableMonitorsCheckBox
   });
  }

  if(this.props.getAllKeywordData.enableMonitorsCheckBox != nextProps.getAllKeywordData.enableMonitorsCheckBox)
    this.setState({disableAdvancedSettingTab3:!nextProps.getAllKeywordData.enableMonitorsCheckBox})

}


handleDReqCheckboxChange(event,value){
 console.log("event---",event)
 console.log("value---",value)
}
  /*
  *  functions for enableBCICapturing Dialog
  */

  handleEnableMonitorsDialog(){
    this.setState({openEnableMonitorsDialog:true});
    console.log("handleEnableMonitorsDialog function callded---")
  }


  handleEnableMonitors(event,isInputChecked){
    console.log("isInputChecked--handleEnableMonitors CHECKBOX-",isInputChecked)
    
    if(isInputChecked === true)
    {
      console.log("action trigegerd opening Snackbar")
      this.setState({openSnackBar:true})
      this.submitForm(validate.setDefaultValuesBackendMonitor(this.props.getAllKeywordData.data));
//      this.props.enableMonitorsCheckBoxStatus(true);
    }
    else
    {
     // this.props.enableMonitorsCheckBoxStatus(isInputChecked);
      this.setState({openCnfrmDisbleDialog:true})
    }
  }

  handleCancel()
  {
   this.setState({openEnableMonitorsDialog:false});
 }
 

 handleSubmit(){
  console.log("handleSubmit---", this.refs)
  this.refs.monitorForm.submit();
  this.handleCancel();
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
 this.props.enableMonitorsCheckBoxStatus(false);
 this.setState({ openCnfrmDisbleDialog:false
 })

}

handleCancelDisableBackendMon(){
  this.setState({ openCnfrmDisbleDialog:false,
    EnableMonitorsCheckBox :true 
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

    <div className = "row" style={{'paddingTop':10}}>
      <div className = "col-md-5">
        <Checkbox
        value = "EnableMonitors"
        label = "Enable Monitors"
        checked  = {this.state.enableMonitorsCheckBox}
        onCustomChange={this.handleEnableMonitors.bind(this)} />
        <i  style={{paddingLeft:40}}>Enable/Disable ND graph monitors </i>
      </div>
    <div>
     <div  className = "col-md-2" >    
    <RaisedButton 
                disabled ={!this.state.enableMonitorsCheckBox} 
                 onClick ={this.handleEnableMonitorsDialog.bind(this)} 
                   style={{width:150}}
                backgroundColor="#18494F"
             disabledLabelColor="#000"
                     labelColor="#FFF"
                          label="Advance Settings" 
                     labelStyle={{fontSize:12}} />
      </div>
    </div>
    </div>

    
    <DialogEnableMonitor
    title="Enable Monitor"
    actions={actions}
    modal={false}
    open={this.state.openEnableMonitorsDialog}
    onRequestClose={this.handleClose}
    autoScrollBodyContent={true}  
    titleStyle={styles.title}       
    >
    <FormEnableMonitors ref="monitorForm" onSubmit ={this.submitForm.bind(this) } />
    </DialogEnableMonitor>

    <Snackbar
    open={this.state.openSnackBar}
    message="Monitor(s) with default values is enabled now."
    autoHideDuration={4000}
    onRequestClose={this.handleRequestClose.bind(this)}
    />

    <ConfirmDialog
    title="Are you sure want to disable the Monitor(s)?"
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
export default connect(mapStateToProps,mapDispatchToProps)(EnableMonitors);
