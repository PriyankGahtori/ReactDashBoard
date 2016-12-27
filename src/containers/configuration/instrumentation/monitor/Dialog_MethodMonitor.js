//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DialogMethodMon from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { reset } from 'redux-form';

//Importing React components
import * as actionCreators  from '../../../../actions/index';
import FormMethodMonitor from './Form_MethodMonitor';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';

const styles = {
  title: {
    fontSize:16,
    padding: 8 
  }

}
class Dialog_MethodMonitor extends React.Component {
 
  constructor(props) {
  super(props);
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state={methodMonitor : this.props.methodMonitor};
  this.submitForm =this.submitForm.bind(this);
  }

  componentWillMount() {
  }

 submitForm(data){
   data["openMethodMonitorDialogType"] = this.props.methodMonitor.openMethodMonitorDialogType;
   if(this.props.methodMonitor.openMethodMonitorDialogType == 'edit'){
     data["methodId"] = this.props.methodMonitor.methodMonitorFormInitialData.methodId;
     this.props.insertMethodMonitorDetails(data,this.props.profileId)
     this.handleCancel();
    }
   else if(this.props.methodMonitor.openMethodMonitorDialogType == 'add'){
      this.props.insertMethodMonitorDetails(data,this.props.profileId)
      this.handleCancel();
    }
     //action for runtime change
      var filePath = this.props.ns_wdir + "/ndprof/conf/" + this.getProfileName(this.props.trModeDetail.profileId) + "/methodmonitors.mml"
      let keywordDataList = [];
        keywordDataList.push("ndMethodMonFile=" + filePath ); 
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
      if(this.props.methodMonitor != nextProps.methodMonitor)
      this.setState({methodMonitor:nextProps.methodMonitor});
     if(nextProps.methodMonitor.openMethodMonitorDialogType == 'edit')
        this.setState({title:"Edit Method Monitor"})
      else
        this.setState({title:"New Method Monitor"})

  }

  handleCancel(){
    this.props.toggleStateAddMethodMonitor();
  }
  
  handleSubmit(){
  this.refs.newMethodMonitorForm.submit();
  
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
        onClick={this.handleSubmit}
      />
    ];
    return (
      <div>
        <DialogMethodMon
          title={this.state.title}
          actions={actions}
          modal={false}
          open={this.state.methodMonitor.openNewMethodMonDialog}
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

        <FormMethodMonitor ref="newMethodMonitorForm" onSubmit={this.submitForm.bind(this)}/>
      </DialogMethodMon>
      
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    methodMonitor : state.methodMonitor,
    trData : state.initialData.trData,
    ns_wdir: state.initialData.ns_wdir,
    homeData: state.initialData.homeData, 
    trModeDetail: state.trModeDetail,
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {

return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_MethodMonitor);