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
  console.log("onsubmit props", this.props.onSubmit)
  this.state = {openNewDCDialog:this.props.openNewDCDialog};
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state = {initialValues: this.props.initialValues};
  this.state ={flagAddOREdit:this.props.flagAddOREdit};
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.openNewDCDialog != nextProps.openNewDCDialog)
      this.setState({openNewDCDialog:nextProps.openNewDCDialog});

    if(this.props.initialValues != nextProps.initialValues)
      this.setState({initialValues:nextProps.initialValues});

    if(this.props.flagAddOREdit != nextProps.flagAddOREdit)
      this.setState({flagAddOREdit:nextProps.flagAddOREdit});
  }

  handleCancel(){
     this.props.toggleStateDialogNewDC();
  }
  
  handleSubmit(){
  console.log("before submitting")
  this.refs.newDCForm.submit();
  console.log("aftr submitting")
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
        label="Clear Values"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
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
          open={this.state.openNewDCDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
        >
      <FormNewDC ref="newDCForm" onSubmit={data =>{
                                console.log("data----",JSON.stringify(data))
                            if(this.state.flagAddOREdit == "edit"){

                                data["_links"] = this.state.initialValues._links;
                                console.log("data-aftr adding---",JSON.stringify(data))
                                console.log("flagAddOREdit----",this.state.flagAddOREdit)
                                this.props.addRowDCTable(data,this.state.flagAddOREdit)
                              }
                              else{
                                console.log("on submit---in else or add condition--",this.state.flagAddOREdit)
                                 this.props.addRowDCTable(data,this.state.flagAddOREdit)
                              }

      }}/>
      </DialogNewDC>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  console.log("dialogNewDC---",state.dcDetail.dialogNewDC)
  console.log("dialogNewDC---",state.dcDetail.updateFormInitialValues)
  return {
   openNewDCDialog :state.dcDetail.dialogNewDC,
   initialValues   :state.dcDetail.updateFormInitialValues,
   flagAddOREdit   :state.dcDetail.flagAddOREdit
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_DCDetail_NewDC);