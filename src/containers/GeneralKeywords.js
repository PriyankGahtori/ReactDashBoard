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
import ConfirmDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {hashHistory } from 'react-router';
import Checkbox from '../components/CheckboxWrapper';
import TextField from 'material-ui/TextField';
import { reduxForm } from 'redux-form';
import _ from "lodash";

import {getKeywordsData,submitKeywordData}  from '../actions/index';

export const fields = ["bciInstrSessionPoct","logLevelOneFPMethod","enableBCIDebug","enableBCIError"];

const styles = {
  block: {
    maxWidth: 250,
    paddingBottom:5
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
  console.log(this.props.routeParams.something)
  this.state ={enableBCIDebug:false};
 
  }

 
//this function is called first when component gets first loaded
  componentWillMount() {

    this.props.getKeywordsData(this.props.params.profileId);
  }

  componentWillReceiveProps(nextProps)
  {
   
   
  }

   handleDReqCheckboxChange(event,value){
   console.log("event---",event)
   console.log("value---",value)
  }

  submit(data){
   
    console.log("getAllKeywordData---",this.props.getAllKeywordData) ;
    console.log("data---general keywords--",data)
    console.log("profileId--",this.props.params.profileId)

    let keywordData = Object.assign({},this.props.getAllKeywordData);
    
    let finalFormData = _.forEach(keywordData,function(obj,key){
      obj.value = data[key];
    }) ;

    console.log("finalFormData---",finalFormData)
    this.props.submitKeywordData(finalFormData,this.props.params.profileId);      
}

  render() {
        const {
      fields: {bciInstrSessionPoct,logLevelOneFPMethod,enableBCIDebug,enableBCIError},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;

    return (
   <form onSubmit ={handleSubmit(this.submit.bind(this)) }>
    <div style={styles.mainBlock} >
      <div className = "row">
      <div className = "col-md-4">
        <TextField
                  hintText="Hint Text"
                  floatingLabelText="bciInstrSessionPoct"
                  {...bciInstrSessionPoct}
                 
                />
        </div>

      <div className = "col-md-6">

     <TextField
                  hintText="Hint Text"
                  floatingLabelText="logLevelOneFPMethod"
                  {...logLevelOneFPMethod}
                 
                />
      </div>
      </div>

      

      <div className = "row" >
      <div className = "col-md-4">
   <TextField
                  hintText="Hint Text"
                  floatingLabelText="enableBCIDebug"
                  {...enableBCIDebug}
                 
                />
      </div>
      <div>
      </div>

      <div className = "col-md-6">
        <TextField
                  hintText="Hint Text"
                  floatingLabelText="enableBCIError"
                  {...enableBCIError}
                 
                />
      </div>
      </div>

     <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          
        </div>  

   </div>
    </form>  
    );
  }
}

export default reduxForm({
  form: 'globalBT',
  fields
},
  state => ({ // mapStateToProps
  initialValues : state.Keywords.initializeKeywords,
  getAllKeywordData :state.Keywords.data
}),
  { 
   getKeywordsData : getKeywordsData ,
   submitKeywordData : submitKeywordData
   
 } 
)(GeneralKeywords);
