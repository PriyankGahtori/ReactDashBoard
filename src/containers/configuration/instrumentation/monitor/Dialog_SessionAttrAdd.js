//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DialogSessionAttr from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { reset } from 'redux-form';

//Importing React components
import * as actionCreators  from '../../../../actions/index';
import FormSessionAttrMon from './Form_SessionAttrAdd';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';

const styles = {
  title: {
    fontSize:16,
    padding: 8 
  }

}
class Dialog_SessionAttrAdd extends React.Component {
 
  constructor(props) {
  super(props);
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state={sessionAttrMonitor : this.props.sessionAttrMonitor};
  this.submitForm =this.submitForm.bind(this);
  }

  componentWillMount() {
    
  }

 submitForm(data){
     console.log("data--",data)
     console.log("this.props--",this.props.sessionAttrMonitor.valData)
     if(data.complete == 'true' && data.specific == 'true'){
        data["attrMode"]=3
        data["attrType"] ='complete,specific'
     }
    else if(data.complete == true){
        data["attrMode"]=2
        data["attrType"] ='complete'
    }
    else{
        data["attrMode"]=1
        data["attrType"] ='specific'
    }
     console.log("data---",data)
     console.log("profileId--",this.props.profileId)
   this.props.addSpecificAttrMon(data,this.props.profileId);
   this.handleCancel();
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
      if(this.props.sessionAttrMonitor != nextProps.sessionAttrMonitor)
       this.setState({sessionAttrMonitor:nextProps.sessionAttrMonitor});
  }

  handleCancel(){
   this.props.toggleStateAddSessionAttrMonitor();
  }
  
  handleSubmit(){
    this.refs.newSessionAttrMonitorForm.submit();
  }
 
  render() {
    const { onSubmit } = this.props
  	const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        disabled = {this.props.sessionAttrMonitor.disabled}
        onClick={this.handleSubmit}
      />
    ];
    return (
      <div>
        <DialogSessionAttr
          title="Add Session Attribute"
          actions={actions}
          modal={false}
          open={this.state.sessionAttrMonitor.openNewSessAttrMonDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
          titleStyle={styles.title}
        >
         { /* As new updated form when passed to server or store must contain its primary key field 
           * i.e ._links to update the same row .So inserting property _links to data .
           * when condition this.state.applicationdata.openAppDialogType == "edit" satisfies
           */
        }

        <FormSessionAttrMon ref="newSessionAttrMonitorForm" onSubmit={this.submitForm.bind(this)}/>
      </DialogSessionAttr>
      
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    sessionAttrMonitor : state.sessionAttrMonitor,
    submitDisabled:state.sessionAttrMonitor.disabled,
    methodMonitor : state.methodMonitor,
    trData : state.initialData.trData,
    ns_wdir: state.initialData.ns_wdir,
    homeData: state.initialData.homeData, 
    trModeDetail: state.trModeDetail,
    profileDisabled: state.profileDisabled.disabled    

   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {

return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_SessionAttrAdd);