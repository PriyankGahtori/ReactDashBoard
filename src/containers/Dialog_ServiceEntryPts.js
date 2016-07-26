import React from 'react';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DialogNewEntryPts from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import { reset } from 'redux-form';
import FormNewServiceEntry from './Form_ServiceEntryPoints';



class Dialog_ServiceEntryPts extends React.Component {
 
  constructor(props) {
  super(props);
  console.log("onsubmit props", this.props.onSubmit)
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state ={ServiceEntryPoints:this.props.ServiceEntryPoints};
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.ServiceEntryPoints != nextProps.ServiceEntryPoints)
      this.setState({ServiceEntryPoints:nextProps.ServiceEntryPoints});
  }

  handleCancel(){
     this.props.toggleStateDialogNewServiceEntryPts();
  }
  
  handleSubmit(){
  this.refs.newServiceEntryPtsForm.submit();
  this.handleCancel();
  console.log("aftr closing the dialog----")
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
      <DialogNewEntryPts
          title="New Service Entry Points Configuration"
          actions={actions}
          modal={false}
          open={this.state.ServiceEntryPoints.openNewServiceEntryPtsDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
        >
         { /* As new updated form when passed to server or store must contain its primary key field 
           * i.e ._links to update the same row .So inserting property _links to data .
           * when condition this.state.applicationdata.openAppDialogType == "edit" satisfies
           */
        }
      <FormNewServiceEntry ref="newServiceEntryPtsForm" onSubmit={data =>{
                              console.log("data---serviceEtryForm-",JSON.stringify(data))
                               if(this.state.ServiceEntryPoints== "edit"){

                                data["_links"] = this.state.dcDetail.dcDetailInitializeForm._links;
                                console.log("data-aftr adding---",data)
                                console.log("openDCDialogType----",this.state.dcDetail.openDCDialogType)
                                console.log("in editing con in dialog--",this.state.dcDetail.appId)
                                this.props.addRowDCTable(data,this.state.dcDetail.openDCDialogType,this.state.dcDetail.appId)
                              }
                              else{
                                console.log("on submit---in else or add condition--",this.state.openDCDialogType)
                                this.props.fetchTreeData(this.state.dcDetail.appId)
                                this.props.addRowDCTable(data,this.state.dcDetail.openDCDialogType,this.state.dcDetail.appId)
                                console.log("in dialog aftr adding n updating tree")

                              }

      }}/>
      </DialogNewEntryPts>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  console.log("openNewDCDialog---",state.ServiceEntryPoints)
  return {
   ServiceEntryPoints :state.ServiceEntryPoints
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_ServiceEntryPts);