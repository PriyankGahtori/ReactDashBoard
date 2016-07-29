import React from 'react';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DialogNewDC from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FormNewDC from './Form_DCDetail_NewDC.js';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import { reset } from 'redux-form'



class Dialog_DCDetail_NewDC extends React.Component {
 
  constructor(props) {
  super(props);
  console.log("onsubmit props", this.props)
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state ={dcDetail:this.props.dcDetail};
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.dcDetail != nextProps.dcDetail)
      this.setState({dcDetail:nextProps.dcDetail});
  }

  handleCancel(){
     this.props.toggleStateDialogNewDC();
  }
  
  handleSubmit(){
  this.refs.newDCForm.submit();
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
      <DialogNewDC
          title="New Data Center Configuration"
          actions={actions}
          modal={false}
          open={this.state.dcDetail.openNewDCDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
        >
         { /* As new updated form when passed to server or store must contain its primary key field 
           * i.e ._links to update the same row .So inserting property _links to data .
           * when condition this.state.applicationdata.openAppDialogType == "edit" satisfies
           */
        }
      <FormNewDC ref="newDCForm" onSubmit={data =>{
                              console.log("data----",JSON.stringify(data))
                               if(this.state.dcDetail.openDCDialogType == "edit"){

                                data["id"] = this.state.dcDetail.dcDetailInitializeForm.id;
                                console.log("data-aftr adding---",data)
                                console.log("openDCDialogType----",this.state.dcDetail.openDCDialogType)
                                console.log("in editing con in dialog--",this.state.dcDetail.appId)
                                this.props.addRowDCTable(data,this.state.dcDetail.openDCDialogType,this.state.dcDetail.appId)
                                this.handleCancel();
                              }
                              else{
                                console.log("on submit---in else or add condition--",this.state.openDCDialogType)
                                this.props.fetchTreeData(this.state.dcDetail.appId)
                                this.props.addRowDCTable(data,this.state.dcDetail.openDCDialogType,this.state.dcDetail.appId)
                                this.handleCancel();
                                console.log("in dialog aftr adding n updating tree")

                              }

      }}/>
      </DialogNewDC>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  console.log("openNewDCDialog---",state.dcDetail.openNewDCDialog)
  console.log("dialogNewDC---",state.dcDetail.dcDetailInitializeForm)
  console.log("appId",state.dcDetail.appId)
  return {
   dcDetail :state.dcDetail
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_DCDetail_NewDC);