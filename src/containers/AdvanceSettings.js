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

import PutDelayInMethod from './PutDelayInMethod'
import EnableBackendMonitor from './EnableBackendMonitor';

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

class AdvanceSettings extends React.Component {

  constructor(props) {
    super(props);
    console.log("props--",this.props)
    
    this.state ={enableBCIDebug:false}
    this.state = {openEnableBackendMonitorDialog : false}
    this.state = {getAllKeywordData:this.props.getAllKeywordData}
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

   /* if(this.props.getAllKeywordData.BCICapturingCheckBox != nextProps.getAllKeywordData.BCICapturingCheckBox)
      this.setState({disableAdvancedSettingTab1:!nextProps.getAllKeywordData.BCICapturingCheckBox})


    if(this.props.getAllKeywordData.hotSpotCapturingCheckBox != nextProps.getAllKeywordData.hotSpotCapturingCheckBox)
      this.setState({disableAdvancedSettingTab2:!nextProps.getAllKeywordData.hotSpotCapturingCheckBox})
*/
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
    this.props.submitKeywordData(keywordData,this.props.params.profileId,"instrProfile");  
}

  render() {
  
    return (
      <div>
        <PutDelayInMethod profileId = {this.props.params.profileId} />
        <EnableBackendMonitor profileId = {this.props.params.profileId} />
    </div>
    );
  }
}


function mapStateToProps(state) {
  console.log("AdvanceSettings---",state.Keywords)
  return {
    getAllKeywordData :state.Keywords
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(AdvanceSettings);
