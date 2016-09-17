import React from 'react';
import { connect } from 'react-redux';
import DialogEditServer from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FormServer from './Form_Server';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';



class DialogAttachProfile_Server extends React.Component {
  constructor(props) {
  super(props);
  console.log("inside DialogNewTopo class")
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state ={serverData:this.props.serverData};
    

  
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.serverData != nextProps.serverData)
      this.setState({serverData:nextProps.serverData});
  }

  handleCancel(){
    // this.props.toggleStateDialogEditTopo();
    this.props.toggleStateDialogServer();
  }
  
  handleSubmit(){
  this.refs.editServerForm.submit();
  this.handleCancel();
  console.log("after closing the dialog----")
  }

  submitForm(data){
    //here data conatins {"dctopoId",profileId}
    console.log("data---",data)
    this.props.attachProfToServer(data)
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
      <DialogEditServer
          title="Attach Profile"
          actions={actions}
          modal={false}
          open={this.state.serverData.openServerDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={false}
          refs="insidedialog"
        >
         { /* As new updated form when passed to server or store must contain its primary key field 
           * i.e ._links to update the same row .So inserting property _links to data .
           * when condition this.state.applicationdata.openAppDialogType == "edit" satisfies
           */
        }
        
      <FormServer ref="editServerForm" onSubmit={this.submitForm.bind(this)}/>
      </DialogEditServer>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  console.log("openNewTopoDialog--22222221111-",state.topologyData.openEditTopoDialog)
  console.log("DialogNewTopo---11111111122222",state.topologyData.topoInitializeForm)
  console.log("inside DialogNewTopo")
  return {
   serverData :state.serverData,
   tierData :state.tierData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DialogAttachProfile_Server);