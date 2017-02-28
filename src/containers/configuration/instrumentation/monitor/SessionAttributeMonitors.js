//Importing React components

import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import ConfirmDelDialog  from 'material-ui/Dialog'

//Importing files
import DialogSessionAttr from './Dialog_SessionAttrAdd';
import * as actionCreators  from '../../../../actions/index';
import DataGrid from '../../../../components/DCDetailTable';
import EnableMethodMonitor from './EnableMethodMonitor';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DialogAttrVal from './Dialog_AttrValues';
import Dialog_SessionAttrEdit from './Dialog_SessionAttrEdit';
export const fields = ['methodDisplayName', 'methodName', 'methodDesc']

var columns = {
                "key" : "sessAttrId",
                "data":['Name', 'Attribute Type','Values', 'ID'],
                "field":['attrName', 'attrType', 'values','sessAttrId']
              };          

const style = {
  
  //margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const NewButtonstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 30,
    left: 'auto',
    position: 'fixed',

};

const styles = {
  block: {
    maxWidth: 250,
    paddingBottom:5
  },
   toggle: {
      marginTop:30 ,
      paddingLeft:80
  },
  customWidth: {
      width: 200
    },
  checkbox: {
    marginBottom: 16,
    paddingTop:35
  },
   btSetBlock:{
    paddingLeft:10,
    paddingTop:5
  }
};

 class SessionAttributeMonitors extends React.Component {
  
  constructor(props) {
    super(props);
     this.state = {openSnack: false,
                   delDialog: false,
                  attrType :'all',
                  specificModeCSS:'hidden'
                }

    console.log("SessionAttributeMonitors method called",this.props)
  }

  componentWillMount() {
   // this.props.triggerLoader(true,null)
  // this.props.fetchSessionAttrMonitorData(this.props.profileId);
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.sessionAttrMonitor.tableData != nextProps.sessionAttrMonitor.tableData){
      this.setState({sessionAttrMonitor:nextProps.sessionAttrMonitor});
    }
  }

 handleChange(event,value){
     console.log("value---",value)
 	let css = value === 'specific' ? 'show' : 'hidden';
    console.log("css---",css)
  	this.setState({'specificModeCSS':css})
}

loader(){
 // var message = {'title': 'Method Monitors Loaded','msg':' '}
    this.props.triggerLoader(false,null)

}

  onToggle(row){

   
  }

  // Below Method is called when the user tries to delete the method monitor.
  delRow(){
    var selectedRow=[];
    selectedRow = this.refs.sessionAttrMonitorData.refs.table.state.selectedRowKeys;
    this.props.delSessionAttrRows(selectedRow);
    try{
         this.refs.sessionAttrMonitorData.refs.table.cleanSelected();
     }
     catch(e){
        console.error(" Exception Occured: FileName: Session Attribute,MethodName: delRow()",e)
     }
    this.handleClose();
   
 }
  
  handleDelConfirm(){
     var selectedRow=[];
     selectedRow = this.refs.sessionAttrMonitorData.refs.table.state.selectedRowKeys;
     if(selectedRow.length== 0)
      this.setState({openSnack: true,delDialog: false})
     else
       this.setState({openSnack:false,delDialog : true})
      
  }

  handleCancel(){
    this.props.toggleStateAddMethodMonitor();
  }

 handleCheck(event,value){
    console.log("inside handle check")
   
  };
  handleClose(){
        this.setState({delDialog:false})
  }


  handleEdit(){
  var selectedRow = [];
    selectedRow = this.refs.sessionAttrMonitorData.refs.table.state.selectedRowKeys;
      let selectedRowData = this.props.sessionAttrMonitor.tableData.filter(function (value) {
          return value.sessAttrId == selectedRow
        });
 if(selectedRow.length == 1){
   this.props.toggleEditSessionAttrForm();
   this.props.initializeSessionAttr(selectedRowData[0]);
 }
  }

 
 /* handleOpen(){
    this.props.toggleStateAddSessionAttrMonitor(); //opens dialog box
  //  this.props.disableSubmitButtonState();
   // this.props.methodMonitorInitializeForm(null,openMethodMonitorDialogType);
    this.props.clearValData();
  }*/
/*
 handleOpenEdit(openSessAttrMonDialog){

    //for editing form
    let selectedRow= this.refs.sessionAttrMonitorData.refs.table.state.selectedRowKeys;
    if(openSessAttrMonDialog == "edit"){
      // gets the selected key of table
      if(selectedRow.length == 1)
      {
           this.setState({openSnack: false})
           var selectedRowData = this.props.sessionAttrMonitor.tableData.filter(function(value){
            return value.errDetectionId == selectedRow
        })
         this.props.initializeSessionAttributeForm(selectedRowData[0],openSessAttrMonDialog);
         this.props.toggleStateAddSessionAttrMonitor(); //opens dialog box

      }
      else{
        //toster notification: Only one row can be edited
          this.setState({openSnack: true})
      }

    }
    else if(openSessAttrMonDialog == "add"){ //for adding new row
         this.props.initializeSessionAttributeForm(null,openSessAttrMonDialog);
          this.props.toggleStateAddSessionAttrMonitor(); //opens dialog box
    }
  }
  }*/
  
  
  handleHref(row){
    console.log("row---",row)
    this.props.toggleStateAttrValDialog(row.sessAttrId);

  }
  
  handleOpenEditNOTUSED(){
    console.log("handleOpenEdit method called--")
   /* let selectedRow = this.refs.appTable.refs.table.state.selectedRowKeys;
    if (selectedRow.length == 1) {

        this.setState({ openSnack: false })
        let selectedRowData = this.props.sessionAttrMonitor.tableData
          .filter(function (value) {
            return value.appId === selectedRow[0]
          });
        //action to dispatch selectedRowData to set initialValue to the fields in case of editing the row
        this.props.appDetailInitializeForm(selectedRowData[0], openAppDialogType);

        //called this act                                                                                                                                                                                             ion to toggle the state of opened FormDialog. 
        this.props.toggleStateDialogNewApp();
        try {
          this.refs.appTable.refs.table.state.cleanSelected();
        } catch (ex) {
          console.error("Exception in ApplicationDetail file-", ex)
        }
      }
      */
    
  }

/*  handleDel(){
    var selectedRow = [];
    let selectedRow = this.refs.sessionAttrMonitorData.refs.table.state.selectedRowKeys;
    console.log("selectedRow-",selectedRow)
    this.props.sessionAttrMonitor.tableData.forEach(function (value) {
    if (!(selectedRowKeys.indexOf(value.btMethodId) == -1))
        selectedRowData.push(value)
    });
    this.refs.appTable.refs.table.cleanSelected();
  
    console.log("selectedRowKeys--",selectedRowKeys)
    this.props.delSessAttrMon(selectedRowKeys,this.props.profileId);


  }*/

  render() {
   const actionsDel = [
      <FlatButton
        label="Cancel"
        primary={true}
       onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Delete"
        // // primary={true}
        keyboardFocused={true}
        disabled = {this.props.profileDisabled}
        onTouchTap={this.delRow.bind(this)}
    
      />,
    ];

    return (
    <div style ={{position:'relative',left:'10px',width:'1011px'}}>
     
          <div className="row row-no-margin tableheader">
             <div className="pull-right"  >
               <IconButton tooltip="Edit " onTouchTap={this.handleEdit.bind(this)}><FontIcon color="#FFF" className="material-icons">edit_mode</FontIcon></IconButton>           
              <IconButton tooltip="Delete" className="pull-right" onTouchTap={this.handleDelConfirm.bind(this)}><FontIcon color="#FFF" className="material-icons">delete</FontIcon></IconButton> 
            </div>

              <h4 style={{color:'#FFF',paddingLeft:'10px'}}>Session Attribute(s)</h4>
          </div>

           <DialogSessionAttr profileId ={this.props.profileId}/>

          <div className="pull-right"  >

 {/*  <IconButton tooltip="Edit " onTouchTap={this.handleOpenEdit.bind(this)}><FontIcon color="#FFF" className="material-icons">edit_mode</FontIcon></IconButton> */}
        { /* <IconButton  tooltip="Add" onTouchTap={this.handleOpen.bind(this)}><FontIcon   color="#FFF"  className="material-icons">playlist_add</FontIcon></IconButton>*/}
          </div>
        
        <DataGrid data = {this.props.sessionAttrMonitor.tableData} 
            pagination = {false} 
            ref        = "sessionAttrMonitorData" 
            column     = {columns}
            onClick    = {this.handleClick}
            onToggle   = {this.onToggle.bind(this)}
            onhref={this.handleHref.bind(this)}
             /> 


        <div>

       {/* <AddNewButton  style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this,'add')}>
            <AddIcon />
          </AddNewButton> */}

        
         <DialogAttrVal />
           <Dialog_SessionAttrEdit  />
          
        </div>
         <Snackbar
          open={this.state.openSnack}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
        />
       <ConfirmDelDialog
          title="Are you sure want to delete the Session Attribute(s)?"
          actions={actionsDel}
          modal={false}
          open={this.state.delDialog}
      
        />
      
    </div>
    );
  }
}


function mapStateToProps(state) {
  console.log("methodMonitor state -  ",state.sessionAttrMonitor)
  return {
      sessionAttrMonitor : state.sessionAttrMonitor,
      profileDisabled: state.profileDisabled.disabled
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SessionAttributeMonitors);
