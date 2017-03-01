//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { reset } from 'redux-form';

//Importing React components
import * as actionCreators  from '../../../../../actions/index';
import FormMethodBasedCaptureEdit from './Form_MethodBasedCaptureEdit';
import {triggerRunTimeChanges} from '../../../../../actions/runTimeChanges';

const styles = {
  title: {
    fontSize:16,
    padding: 8 
  },
  dialog:{
    top:'-70px',
  }

}
class Dialog_MethodBasedCaptureEdit extends React.Component {
 
  constructor(props) {
  super(props);
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state={methodBasedCustomData : this.props.methodBasedCustomData};
 // this.submitForm =this.submitForm.bind(this);

  }


 submitForm(data){
   console.log("data-----",data)
   this.props.updateMethodBasedCustomData(data,this.props.methodBasedCustomData.initializeForm.methodBasedId);
   this.handleCancel();
  }

 

  componentWillReceiveProps(nextProps)
  {
      if(this.props.methodBasedCustomData != nextProps.methodBasedCustomData)
       this.setState({methodBasedCustomData:nextProps.methodBasedCustomData});
  }

  handleCancel(){
    this.props.toggleMethodBasedCapturingEditForm();
  }
  
  handleSubmit(){
    console.log("handleSubmit method called---",this.refs.editMethodBasedCaptureForm)
    this.refs.editMethodBasedCaptureForm.submit();
  }
 
  render() {
    const { onSubmit } = this.props
  	const actions = [
      <FlatButton
        label="Cancel"
        className="dialog-modal cancel"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
       // disabled = {this.props.sessionAttrMonitor.disabled}
        onClick={this.handleSubmit}
      />
    ];
    return (
      <div>
        <Dialog
          className="dialog-modal"
          title="Edit Method Based Capturing Data "
          actions={actions}
          modal={false}
          open={this.state.methodBasedCustomData.openEditMethodBasedCaptureDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
          titleStyle={styles.title}
          style = {styles.dialog}
        >

        <FormMethodBasedCaptureEdit ref="editMethodBasedCaptureForm" onSubmit={this.submitForm.bind(this)}/>
      </Dialog>
      
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    httpReqHdrBasedCustomData:state.httpReqHdrBasedCustomData,
    methodBasedCustomData:state.methodBasedCustomData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {

return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_MethodBasedCaptureEdit);