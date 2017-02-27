// Importing react Components
import React from 'react';
import { connect } from 'react-redux';
import DialogNewApp from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';

//Importing files
import FormNewApp from './Form_ApplicationDetail_NewApp.js';
import * as actionCreators  from '../../actions/index';

const styles = {
 title: { 
     fontSize: '16px',
     padding:'8px',

  }
}

class Dialog_AppDetail_NewApp extends React.Component {
 
  constructor(props) {
  super(props);
  console.log("this.props.applicationdata---",this.props.applicationdata)
  this.state = {applicationdata:this.props.applicationdata}
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit =this.handleSubmit.bind(this);
 }

  componentWillReceiveProps(nextProps)
  {
    console.log("this.state---",this.state)
    if(this.props.applicationdata != nextProps.applicationdata){
      this.setState({applicationdata:nextProps.applicationdata});
      if(nextProps.applicationdata.openAppDialogType === "edit")
        this.setState({title : "Edit Application"})
      else
        this.setState({title : "New Application"})
    }
  }


  handleCancel(){
     this.props.toggleStateDialogNewApp();
  }
  
  handleSubmit(){
    console.log("handleSubmit method called--",this.refs.newAppForm)
   this.refs.newAppForm.submit();
  }

  render() {
    const actions = [
      <FlatButton
      className="dialog-modal cancel"
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit} />
    ];
    return (
      <div>
      <DialogNewApp
          className="dialog-modal "
          title = {this.state.title}
          actions={actions}
          modal={false}
          open={this.state.applicationdata.openNewAppDialog != null?this.state.applicationdata.openNewAppDialog :false}
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
       
      <FormNewApp ref="newAppForm" onSubmit={data =>{
                               if(this.state.applicationdata.openAppDialogType == "edit"){
                                data["appId"]         = this.state.applicationdata.appDetailInitializeForm.appId;
                                data["dcTopoAssocId"] = this.state.applicationdata.appDetailInitializeForm.dcTopoAssocId;
                                this.props.addRowApplicationTable(data,this.state.applicationdata.openAppDialogType)
                                this.handleCancel();
                              }
                              else{
                                this.props.addRowApplicationTable(data,this.state.applicationdata.openAppDialogType)
                                this.handleCancel();
                               }

      }}/>
      </DialogNewApp>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
   applicationdata :state.applicationdata
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Dialog_AppDetail_NewApp);