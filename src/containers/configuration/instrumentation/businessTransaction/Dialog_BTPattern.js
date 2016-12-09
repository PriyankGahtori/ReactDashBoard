//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DialogBTPattern from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { reset } from 'redux-form';

//Importing files
import * as actionCreators  from '../../../../actions/index';
import FormBTPattern from './Form_BTPattern';


const styles = {
  title: {
    fontSize: 16,
    padding:8
  }
}
class Dialog_BTPattern extends React.Component {
 
  constructor(props) {
  super(props);
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state={BTPattern : this.props.BTPattern};
  this.submitForm =this.submitForm.bind(this);
  }

 submitForm(data){
   
   console.log("data after apending --->",data)
    if(this.props.BTPattern.openBTPatternDialog == "edit"){

       data["id"] = this.props.BTPattern.patternFormInitialData.id
       data["paramKeyValue"] = `${data.reqParamKey}=${data.reqParamValue}` 
       data["headerKeyValue"] = `${data.reqHeaderKey}=${data.reqHeaderValue}` 
       data['include'] = data.enabled ? 'include' : 'exclude';
       this.props.addBTPatternData(data,this.props.profileId,this.props.BTPattern.openBTPatternDialog)
       this.handleCancel();
  }
  else{
      data['include'] = data.enabled  ? 'include' : 'exclude';
      this.props.addBTPatternData(data,this.props.profileId,this.props.BTPattern.openBTPatternDialog)
      this.handleCancel();
  }
  }

  componentWillReceiveProps(nextProps)
  {

    if(this.props.BTPattern != nextProps.BTPattern)
      this.setState({BTPattern:nextProps.BTPattern});

    if(nextProps.BTPattern.openBTPatternDialog == "edit")
      this.setState({title:"Edit BT Pattern"})
    else
      this.setState({title:"ADD BT Pattern"})
  }

  handleCancel(){
    this.props.toggleStateAddBTPattern();
  }
  
  handleSubmit(){
  this.refs.newBTPatternForm.submit();
  
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
        <DialogBTPattern
          title={this.state.title}
          actions={actions}
          modal={false}
          open={this.state.BTPattern.openNewBTPatternDialog}
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

        <FormBTPattern ref="newBTPatternForm" onSubmit={this.submitForm.bind(this)}/>
      </DialogBTPattern>
      
      </div>
    );
  }
} 

function mapStateToProps(state) {
  console.log("BTPattern--data -----------",state.BTPattern)
  return {
    BTPattern : state.BTPattern
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {

return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_BTPattern);