//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DialogErrorDetection from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { reset } from 'redux-form';

//Importing files
import * as actionCreators  from '../../../../actions/index';
import FormErrorDetection from './Form_ErrorDetection';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';


const styles = {
    title:{
      fontSize:16,
      padding: 8
    }
}

class Dialog_ErrorDetection extends React.Component {
 
  constructor(props) {
  super(props);
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.submitForm =this.submitForm.bind(this);
  this.state = {title:""}
  }

 submitForm(data){
   data['openErrorDetectionDialog'] = this.props.errorDetection.openErrorDetectionDialog;
   if(data.openErrorDetectionDialog == "edit"){
    data['errDetectionId'] = this.props.errorDetection.errorDetectionFormInitialData.errDetectionId
    this.props.editErrorDetection(data,this.props.profileId)
    this.handleCancel();
  }
  else if(data.openErrorDetectionDialog == "add"){
    this.props.addErrorDetection(data,this.props.profileId)
    this.handleCancel();
  }
   //action for runtime change
    var filePath = this.props.ns_wdir + "/ndprof/conf/" + this.getProfileName(this.props.trModeDetail.profileId) + "/btErrorRule.err" ;
    let keywordDataList = [];
        keywordDataList.push("BTErrorRules=" + filePath ); 
    triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 
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

  componentWillReceiveProps(nextProps)
  {
    if(this.props.errorDetection != nextProps.errorDetection){
        this.setState({errorDetection:nextProps.errorDetection});
       if(nextProps.errorDetection.openErrorDetectionDialog == "edit")
          this.setState({title: "Edit Error Detection"})
        else 
          this.setState({title: "Add Error Detection"}) 

     }
  }

  handleCancel(){
    this.props.toggleStateErrorDetection();
  }
  
  handleSubmit(){
  this.refs.newErrorDetectionForm.submit();
 
  }
 
  render() {
    const { onSubmit } = this.props
  	const actions = [
      <FlatButton className="dialog-modal cancel"
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        disabled = {this.props.profileDisabled}
        onClick={this.handleSubmit}
      />
    ];
    return (
      <div>
        <DialogErrorDetection className="dialog-modal"
          title= {this.state.title}
          actions={actions}
          modal={false}
          open={this.props.errorDetection.openNewErrorDetectionDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
          titleStyle={styles.title}
        >
       
        <FormErrorDetection ref="newErrorDetectionForm" onSubmit={this.submitForm.bind(this)}/>
        </DialogErrorDetection>
      
      </div>
    );
  }
} 

function mapStateToProps(state) {

  return {
    errorDetection : state.errorDetection ,
    trData : state.initialData.trData,
    trModeDetail: state.trModeDetail,
    homeData: state.initialData.homeData,
    ns_wdir: state.initialData.ns_wdir,
    profileDisabled: state.profileDisabled.disabled  
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_ErrorDetection);