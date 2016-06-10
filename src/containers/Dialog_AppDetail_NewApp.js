import React from 'react';
import { connect } from 'react-redux';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DialogNewApp from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FormNewApp from './Form_ApplicationDetail_NewApp.js';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';



class Dialog_DCDetail_NewDC extends React.Component {
 
  constructor(props) {
  super(props);
  console.log("loading......", this.props)
  this.state = {openNewAppDialog:this.props.openNewAppDialog};
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.openNewAppDialog != nextProps.openNewAppDialog)
      this.setState({openNewAppDialog:nextProps.openNewAppDialog});
  }

  handleCancel(){
     this.props.toggleStateDialogNewApp();
  }
  
  handleSubmit(){
   this.refs.newDCForm.submit();
   console.log("aftr submitting")
   this.handleCancel();
   console.log("aftr closing the dialog----")

  }

    render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      <FlatButton
        label="Clear Values"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />
    ];
    return (
      <div>
      <DialogNewApp
          title="New Application Configuration"
          actions={actions}
          modal={false}
          open={this.state.openNewAppDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
        >
          <FormNewApp ref="newAppForm" onSubmit={data =>{alert(JSON.stringify(data))}}/>
      </DialogNewApp>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("dialogNewDC---",state.applicationdata.dialogNewpp)
  return {
   openNewAppDialog :state.applicationdata.dialogNewApp
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Dialog_DCDetail_NewDC);