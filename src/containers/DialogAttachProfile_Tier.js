import React from 'react';
import { connect } from 'react-redux';
import DialogEditTopo from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FormTier from './Form_Tier';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';



class DialogAttachProfile_Tier extends React.Component {
  constructor(props) {
  super(props);
  console.log("inside DialogNewTopo class")
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state ={tierData:this.props.tierData};
    

  
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.tierData != nextProps.tierData)
      this.setState({tierData:nextProps.tierData});
  }

  handleCancel(){
    // this.props.toggleStateDialogEditTopo();
    this.props.toggleStateDialogTier();
  }
  
  handleSubmit(){
  this.refs.editTierForm.submit();
  this.handleCancel();
  console.log("after closing the dialog----")
  }

  submitForm(data){
    //here data conatins {"dctopoId",profileId}
    console.log("data---",data)
    this.props.attachProfToTier(data)
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
      <DialogEditTopo
          title="Attach Profile"
          actions={actions}
          modal={false}
          open={this.state.tierData.openTierDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={false}
          refs="insidedialog"
        >
         { /* As new updated form when passed to server or store must contain its primary key field 
           * i.e ._links to update the same row .So inserting property _links to data .
           * when condition this.state.applicationdata.openAppDialogType == "edit" satisfies
           */
        }
        
      <FormTier ref="editTierForm" onSubmit={this.submitForm.bind(this)}/>
      </DialogEditTopo>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  console.log("openNewTopoDialog--22222221111-",state.topologyData.openEditTopoDialog)
  console.log("DialogNewTopo---11111111122222",state.topologyData.topoInitializeForm)
  console.log("inside DialogNewTopo")
  return {
   topologyData :state.topologyData,
   tierData :state.tierData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DialogAttachProfile_Tier);