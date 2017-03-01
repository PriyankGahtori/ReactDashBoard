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
import FormSessionAttrEdit from './Form_SessionAttrEdit';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';

const styles = {
  title: {
    fontSize:16,
    padding: 8 
  },
   dialog:{
    top:'-70px',
  }

}
class Dialog_SessionAttrEdit extends React.Component {
 
  constructor(props) {
  super(props);
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state={sessionAttrMonitor : this.props.sessionAttrMonitor};
  this.submitForm =this.submitForm.bind(this);

  }


 submitForm(data){
   console.log("data-----",data)
     if(data.complete && data.specific){
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
    data['sessAttrId'] = this.state.sessionAttrMonitor.sessionAttrInitializeForm.sessAttrId;
   this.props.updateSpecificAttrMon(data);
   this.handleCancel();
  }

 

  componentWillReceiveProps(nextProps)
  {
      if(this.props.sessionAttrMonitor != nextProps.sessionAttrMonitor)
       this.setState({sessionAttrMonitor:nextProps.sessionAttrMonitor});
  }

  handleCancel(){
   this.props.toggleEditSessionAttrForm();
  }
  
  handleSubmit(){
    this.refs.editSessionAttrMonitorForm.submit();
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
        <DialogSessionAttr  className="dialog-modal"
          title="Edit Session Attribute"
          actions={actions}
          modal={false}
          open={this.state.sessionAttrMonitor.openEditSessAttrMonDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
          titleStyle={styles.title}
          style = {styles.dialog}
        >

        <FormSessionAttrEdit ref="editSessionAttrMonitorForm" onSubmit={this.submitForm.bind(this)}/>
      </DialogSessionAttr>
      
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    sessionAttrMonitor : state.sessionAttrMonitor,
  
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {

return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_SessionAttrEdit);