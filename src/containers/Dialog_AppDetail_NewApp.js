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
  this.state = {openAppDialogType:this.props.openAppDialogType}
  this.state = {initialValues: this.props.initialValues};
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.openNewAppDialog != nextProps.openNewAppDialog)
      this.setState({openNewAppDialog:nextProps.openNewAppDialog});

     if(this.props.initialValues != nextProps.initialValues)
      this.setState({initialValues:nextProps.initialValues});

    if(this.props.openAppDialogType != nextProps.openAppDialogType)
      this.setState({openAppDialogType:nextProps.openAppDialogType});
  }

  handleCancel(){
     this.props.toggleStateDialogNewApp();
  }
  
  handleSubmit(){
   this.refs.newAppForm.submit();
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
      <FormNewApp ref="newAppForm" onSubmit={data =>{
                              console.log("data----",JSON.stringify(data))
                               if(this.state.openAppDialogType == "edit"){
                                
                                data["_links"] = this.state.initialValues._links;
                                console.log("data-aftr adding---",JSON.stringify(data))
                                console.log("openAppDialogType----",this.state.openAppDialogType)
                                this.props.addRowApplicationTable(data,this.state.openAppDialogType)
                              }
                              else{
                                console.log("on submit---in else or add condition--",this.state.openAppDialogType)
                                 this.props.addRowApplicationTable(data,this.state.openAppDialogType)
                               }

      }}/>
      </DialogNewApp>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("dialogNewDC---",state.applicationdata.dialogNewpp)
  console.log("state.applicationdata.openAppDialogType",state.applicationdata.openAppDialogType)
  return {
   openNewAppDialog :state.applicationdata.dialogNewApp,
   initialValues    :state.applicationdata.appDetailInitializeForm,
   openAppDialogType:state.applicationdata.openAppDialogType


   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Dialog_DCDetail_NewDC);