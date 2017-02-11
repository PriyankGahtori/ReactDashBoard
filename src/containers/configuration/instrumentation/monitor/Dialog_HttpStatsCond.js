//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DialogHttpStatsCond from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { reset } from 'redux-form';

//Importing files
import * as actionCreators  from '../../../../actions/index';
import FormHttpStatsCond from './Form_HttpStatsCondition';

const styles ={
  title:{
    fontSize:16,
    padding:8
  }
} 
class Dialog_HttpStatsCond extends React.Component {
 
  constructor(props) {
  super(props);
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state={httpStatsData : this.props.httpStatsData};
  this.submitForm =this.submitForm.bind(this);
 
  }

  componentWillMount() {
     console.log("inside mount")
  }

 submitForm(data){
  if(this.props.httpStatsData.openHttpStatsDialog == "edit"){
    data["hscid"] = this.props.httpStatsData.httpStatsFormInitialData.hscid
    this.props.editHttpStatsCond(data,this.props.profileId)
    this.handleCancel();
  }
  else if(this.props.httpStatsData.openHttpStatsDialog == "add"){
    this.props.addHttpStatsCond(data,this.props.profileId)
    this.handleCancel();
  }
}

  componentWillReceiveProps(nextProps)
  {
      if(this.props.httpStatsData != nextProps.httpStatsData)
        this.setState({httpStatsData:nextProps.httpStatsData});

        if(nextProps.httpStatsData.openHttpStatsDialog == "edit")
          this.setState({title: "Edit HTTP Stats Condition"})
        else 
          this.setState({title: "Add HTTP Stats Condition"}) 

  }

  handleCancel(){
    this.props.toggleStateAddHttpStatsCond();
  }
  
  handleSubmit(){
  this.refs.newHttpStatsCondForm.submit();
  
  }
 
  render() {
    const { onSubmit } = this.props
  	const actions = [
      <FlatButton className="dialog-modal cancel"
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.props.profileDisabled}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />
    ];
    return (
      <div>
        <DialogHttpStatsCond className="dialog-modal"
          title={this.state.title}
          actions={actions}
          modal={false}
          open={this.state.httpStatsData.openNewHttpStatsCondDialog}
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

        <FormHttpStatsCond ref="newHttpStatsCondForm" onSubmit={this.submitForm.bind(this)}/>
      </DialogHttpStatsCond>
      
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    httpStatsData :state.httpStatsData,
    profileDisabled: state.profileDisabled.disabled
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {

return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_HttpStatsCond);