//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DialogSessionAttr from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { reset } from 'redux-form';
import DataGrid from '../../../../components/DCDetailTable';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import AttrValComponent from './AttrValComponent';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper'
//Importing React components
import * as actionCreators  from '../../../../actions/index';
import FormSessionAttrMon from './Form_SessionAttrAdd';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';


var columns = {
                "key" : "specAttrValId",
                "data":['Name', 'Left Bound','Right Bound', 'ID'],
                "field":['valName', 'lb', 'rb','specAttrValId']
              };  


const styles = {
  title: {
    fontSize:16,
    padding: 8 
  }

}
class Dialog_AttrValues extends React.Component {
 
  constructor(props) {
super(props);
  console.log("this.props--inn Dialog_AttrValues--",this.props.sessionAttrMonitor)
  this.handleCancel = this.handleCancel.bind(this);
  this.state={sessionAttrMonitor : this.props.sessionAttrMonitor,
                changedValArr:[],
                addCompCSS:'hidden',
                errMsgCss: 'hidden',
                valName:'',
                lb:'',
                rb:'',

  };
  this.submitForm =this.submitForm.bind(this);
  
  }

  componentWillMount() {
    
  }

 submitForm(data){
     console.log("data--",data)
     console.log("this.props--",this.props.sessionAttrMonitor.valData)

     if(data.complete == 'true' && data.specific == 'true'){
        data["attrMode"]=3
        data["attrType"] ='complete,specific'
     }
    else if(data.complete == 'true'){
        data["attrMode"]=2
        data["attrType"] ='complete'
    }
    else{
        data["attrMode"]=1
        data["attrType"] ='specific'
    }
     console.log("data---",data)
     console.log("profileId--",this.props.profileId)
   this.props.addSpecificAttrMon(data,this.props.profileId);
   this.handleCancel();
  }

  getProfileName(profileId)
    {
      try{
        let profileData = this.props.homeData[1]
                              .value
                              .filter(function(obj){return obj.id == profileId });  
        if(profileData.length != 0)
          return profileData[0].name;
        else
          return null;          
      }
      catch(ex)
      {
        console.error("error in getting profileId " + ex);
        return null;
      }

    }

  componentWillReceiveProps(nextProps)
  {
      if(this.props.sessionAttrMonitor != nextProps.sessionAttrMonitor)
       this.setState({sessionAttrMonitor:nextProps.sessionAttrMonitor});
  }

  handleCancel(){
   this.setState({errMsgCss: 'hidden'})
  this.props.toggleStateAttrValDialog();
}



//for editing the values table
onAfterSaveCell(row, cellName, cellValue){
  console.log("in Dialog_Attr vcalues--",row)
  console.log("cellName--",cellName)
  console.log("cellVAlue--",cellValue)
  var that = this;

console.log("this.state.changedValArr--")
 var arrData = Object.assign([],this.state.changedValArr)
   //var arrData = this.state.changedValArr;
  
  if(arrData != null && arrData.length != 0){
    arrData.map(function(value){
      if(value.specAttrValId == row.specAttrValId){ //handling the case when 1 row is edited multiple times or same row but diff column
        console.log("in if condition")
        value[cellName] = cellValue;
      }
    else{
      console.log("in ekse con")
      arrData.push(row);
      }
    })
  }
  else{
    arrData.push(row);
  }
  console.log("arrData--",arrData)
  this.setState({changedValArr:arrData})
  console.log("this.state--",this.state.changedValArr)
}

onBeforeSaveCell(row, cellName, cellValue){
    console.log("onBeforeSaveCell method called in dialog_AttrValues")
  }

  handleSubmit(){
   this.props.updateAttrValueTypes(this.state.changedValArr,this.props.sessionAttrMonitor.attrRowId)
   this.handleCancel();
  }


  //For adding value Types

handleOpen(){
  console.log("row--adding method called-")
  this.setState({addCompCSS:'show'})  

}


onCustomValTypeChange(val,customValTypeName){
        this.setState({customValType:val,
                      customValTypeName:customValTypeName
        })
}
 
 valNameChange(value,id){
   console.log("value--",value)
   this.setState({valName:value})
 }

 lbChange(value,id){
    this.setState({lb:value})
}

rbChange(value,id){
    this.setState({rb:value})
}

addValType(){
  var value = { 
                'valName':this.state.valName,
                'lb':this.state.lb,
                'rb':this.state.rb,
                'type':this.state.customValType
  }
 
  if(this.state.valName == '' || this.state.lb == '' || this.state.rb == '' ){
       this.setState({errMsgCss:'show'})
    }
  else{
  this.props.addValueType(value,this.props.sessionAttrMonitor.attrRowId);
  this.setState({addCompCSS:'hidden',errMsgCss: 'hidden'})
  }
}


  render() {
    const { onSubmit } = this.props
  	const actions = [
      <FlatButton
        className="dialog-modal cancel"
	label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        disabled = {this.props.profileDisabled}
        onClick={this.handleSubmit.bind(this)}
      />
    ];
    const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    beforeSaveCell: this.onBeforeSaveCell.bind(this), // a hook for before saving cell
    afterSaveCell: this.onAfterSaveCell.bind(this)  // a hook for after saving cell
};
    return(
      <div >
        <DialogSessionAttr
	  className="dialog-modal"
          title="Attribute Values"
          actions={actions}
          modal={false}
          open={this.state.sessionAttrMonitor.openAttrValDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
          titleStyle={styles.title}
        >
        <Paper zDepth={2} style={{background:'rgba(0,0,0,0.80)', color:'#FFF'}}>  
          <div className="row row-no-margin tableheader">
          <IconButton   className="pull-right" tooltip="Add" onTouchTap={this.handleOpen.bind(this)}><FontIcon  color="#FFF"  className="material-icons">playlist_add</FontIcon></IconButton>
        </div>
      <DataGrid data = {this.props.sessionAttrMonitor.attrValues} 
          cellEdit ={ cellEditProp }
          pagination = {false} 
          ref        = "sessionAttrMonitorData" 
          column     = {columns}
          onClick    = {this.handleClick} /> 
          <div className =  {`col-md-7 ${this.state.errMsgCss}`}>
           <p style = {{color: 'red',paddingTop:20}}>Require Fields are empty</p>
          </div>
            </Paper>
          
        <div className = {`row ${this.state.addCompCSS}`}>
          <AttrValComponent value = {{}}  
                        valNameChange={this.valNameChange.bind(this)} 
                        lbChange = {this.lbChange.bind(this)} 
                        rbChange={this.rbChange.bind(this)}
                         onCustomValTypeChange = {this.onCustomValTypeChange.bind(this)}
                        
                         />
          <RaisedButton className ="pull-right"
          label="Save"
          backgroundColor = "#3a9e95" 
          onClick={this.addValType.bind(this)}
          style={{color:'#000',position:'relative',bottom:'45px',right:'82px'}}>
    
          </RaisedButton>
          </div>
      
      </DialogSessionAttr>
      
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    sessionAttrMonitor : state.sessionAttrMonitor,
    submitDisabled:state.sessionAttrMonitor.disabled,
    methodMonitor : state.methodMonitor,
    trData : state.initialData.trData,
    ns_wdir: state.initialData.ns_wdir,
    homeData: state.initialData.homeData, 
    trModeDetail: state.trModeDetail,
    profileDisabled: state.profileDisabled.disabled    

   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {

return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_AttrValues);
