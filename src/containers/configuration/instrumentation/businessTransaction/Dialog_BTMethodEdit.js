//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DialogBTMethod from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { reset } from 'redux-form';

//Importing files
import * as actionCreators  from '../../../../actions/index';
import FormBTMethodEdit from './Form_BTMethodEdit';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';

const styles = {
  title: {
    fontSize: 16,
    padding:8
  },
   dialog:{
    top:'-30px'
  }
}
class Dialog_BTMethod extends React.Component {
 
  constructor(props) {
  super(props);
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state={methodBT : this.props.methodBT};
//   this.submitForm =this.submitForm.bind(this);
  }

 submitForm(data){
   
   console.log("data after apending --->",data)
   console.log("methodBT-----",this.props.methodBT.editRuleTypes)
   data.rules = this.props.methodBT.editRuleTypes
   console.log("data----",data)
   this.props.updateBTMethod(data,this.props.initialData.btMethodId);
   this.handleCancel();
  

//    let keywordDataList = [];
//      keywordDataList.push("BTRuleConfig" + "=" + filePath); 
     
//    triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 
  }

   getProfileName(profileId)
  {
    let profileData = this.props.homeData[1]
                              .value
                              .filter(function(obj){return obj.id == profileId });  
    if(profileData.length != 0)
       return profileData[0].name;
    else
      return null;          
  }


  componentWillReceiveProps(nextProps)
  {

    if(this.props.methodBT != nextProps.methodBT)
      this.setState({methodBT:nextProps.methodBT});

    // if(nextProps.BTPattern.openBTPatternDialog == "edit")
    //   this.setState({title:"Edit BT Pattern"})
    // else
    //   this.setState({title:"ADD BT Pattern"})
  }

  handleCancel(){
    this.props.toggleStateMethodBTEdit();
  }
  
  handleSubmit(){
  this.refs.newBTMethodFormEdit.submit();
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
        disabled={this.props.profileDisabled}
        onClick={this.handleSubmit}
      />
    ];
    return (
      <div>
        <DialogBTMethod
          title="Edit BT Method"
          actions={actions}
          modal={false}
          open={this.state.methodBT.openBTMethodDialogEdit}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
          titleStyle={styles.title}
          style = {styles.dialog}
        >
         { /* As new updated form when passed to server or store must contain its primary key field 
           * i.e ._links to update the same row .So inserting property _links to data .
           * when condition this.state.applicationdata.openAppDialogType == "edit" satisfies
           */
        }

        <FormBTMethodEdit ref="newBTMethodFormEdit" onSubmit={this.submitForm.bind(this)}/>
      </DialogBTMethod>
      
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    methodBT : state.methodBT,
    trData : state.initialData.trData,
    trModeDetail: state.trModeDetail,
    homeData: state.initialData.homeData,
    ns_wdir: state.initialData.ns_wdir,
    initialData :state.methodBT.btMethodInitializeForm,
    profileDisabled: state.profileDisabled.disabled
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {

return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_BTMethod);