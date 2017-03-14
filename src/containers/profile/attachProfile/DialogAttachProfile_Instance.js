import React from 'react';
import { connect } from 'react-redux';
import DialogEditInstance from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';

import * as actionCreators  from '../../../actions/index';
import FormInstance from '../../instance/Form_Instance';


class DialogAttachProfile_Instance extends React.Component {
  constructor(props) {
  super(props);
  console.log("inside DialogNewTopo class")
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state ={instanceData:this.props.instanceData};
    

  
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.instanceData != nextProps.instanceData)
      this.setState({instanceData:nextProps.instanceData});
  }

  handleCancel(){
    // this.props.toggleStateDialogEditTopo();
    this.props.toggleStateDialogInstance();
  }
  
  handleSubmit(){
  this.refs.editInstanceForm.submit();
  this.handleCancel();
  console.log("after closing the dialog----")
  }

  submitForm(data){
    //here data conatins {"dctopoId",profileId}
    console.log("data---",data)
    this.props.attachProfToInstance(data)
  }
 
  render() {
    const { onSubmit } = this.props
  	const actions = [
      <FlatButton
        className="dialog-modal cancel"
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
      <DialogEditInstance
          className="dialog-modal"
          title="Attach Profile"
          actions={actions}
          modal={false}
          open={this.state.instanceData.openInstanceDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={false}
          refs="insidedialog"
        >
         { /* As new updated form when passed to server or store must contain its primary key field 
           * i.e ._links to update the same row .So inserting property _links to data .
           * when condition this.state.applicationdata.openAppDialogType == "edit" satisfies
           */
        }
        
      <FormInstance ref="editInstanceForm" onSubmit={this.submitForm.bind(this)}/>
      </DialogEditInstance>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  console.log("openNewTopoDialog--22222221111-",state.topologyData.openEditTopoDialog)
  console.log("DialogNewTopo---11111111122222",state.topologyData.topoInitializeForm)
  console.log("inside DialogNewTopo")
  return {
     instanceData :state.instanceData,
   serverData :state.serverData
  
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DialogAttachProfile_Instance);