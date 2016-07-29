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
  this.state = {applicationdata:this.props.applicationdata}
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.applicationdata != nextProps.applicationdata)
      this.setState({applicationdata:nextProps.applicationdata});
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
          open={this.state.applicationdata.openNewAppDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
        >

         { /* As new updated form when passed to server or store must contain its primary key field 
           * i.e ._links to update the same row .So inserting property _links to data .
           * when condition this.state.applicationdata.openAppDialogType == "edit" satisfies
           */
        }
       
      <FormNewApp ref="newAppForm" onSubmit={data =>{
                              console.log("data----",data)
                               if(this.state.applicationdata.openAppDialogType == "edit"){
                                
                                data["id"] = this.state.applicationdata.appDetailInitializeForm.id;
                                console.log("data-aftr adding---",data)
                                console.log("openAppDialogType----",this.state.applicationdata.openAppDialogType)
                                this.props.addRowApplicationTable(data,this.state.applicationdata.openAppDialogType)
                              }
                              else{
                                console.log("on submit---in else or add condition--",this.state.openAppDialogType)
                                 this.props.addRowApplicationTable(data,this.state.applicationdata.openAppDialogType)
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
  console.log("state.applicationdata.initialValues",state.applicationdata.initialValues)
  return {
   applicationdata :state.applicationdata
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Dialog_DCDetail_NewDC);