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
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import ConfirmDelDialog  from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';

//Importing files
import * as actionCreators  from '../../../../actions/index';
import DataGrid from '../../../../components/DCDetailTable';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DialogReturnType from './customDataCapture/Dialog_ReturnType';
import DialogArgumentType from './customDataCapture/Dialog_ArgumentType';

var columns = {
                "key" : "methodBasedId",
                "data":['Fully Qualified Name', 'Return Type','Argument Type', 'ID'],
                "field":['fqm', 'returnTypeHref', 'argTypeHref','methodBasedId']
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

 class MethodBasedCapturingCustomData extends React.Component {
  
  constructor(props) {
    super(props);
     this.state = {openSnack: false,
                   delDialog: false,
                  attrType :'all',
                  specificModeCSS:'hidden',
                  showTable:'hidden'
                }

     this.handleMethodBasedCaptureCustomData = this.handleMethodBasedCaptureCustomData.bind(this);

    console.log("SessionAttributeMonitors method called",this.props)
  }

  componentWillMount() {
   // this.props.triggerLoader(true,null)
  // this.props.fetchSessionAttrMonitorData(this.props.profileId);
    this.props.fetchMethodBasedCustomData(this.props.profileId)
  }

  componentWillReceiveProps(nextProps)
  {
    
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
    selectedRow = this.refs.methodMonitorTable.refs.table.state.selectedRowKeys;
    this.props.delMethodMonitorRow(this.props.params.profileId,selectedRow);
    try{
         this.refs.methodMonitorTable.refs.table.cleanSelected();
     }
     catch(e){
        console.error(" Exception Occured: FileName: Method Monitors,MethodName: delRow()",e)
     }
    this.handleClose();
   
 }
  
  handleDelConfirm(){
     var selectedRow=[];
     selectedRow = this.refs.methodMonitorTable.refs.table.state.selectedRowKeys;
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
 
  handleOpen(){
    this.props.toggleStateAddSessionAttrMonitor(); //opens dialog box
  //  this.props.disableSubmitButtonState();
   // this.props.methodMonitorInitializeForm(null,openMethodMonitorDialogType);
    this.props.clearValData();
  }

 /* handleOpen(openSessAttrMonDialog){

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
  */
  
  handleHref(row){
    console.log("row---",row)
    this.props.toggleStateAttrValDialog(row.sessAttrId);

  }
  handleOpenEdit(){
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
  handleMethodBasedCaptureCustomData(evt,isInputChecked){
    console.log("handleMethodBasedCaptureCustomData method called")
    let showTableCss = isInputChecked ?'show':'hidden' ;
    this.setState({methodBasedCaptureCustomData:isInputChecked,
                  showTable:showTableCss
    })
  }


  handleDel(){
    let selectedRow = this.refs.appTable.refs.table.state.selectedRowKeys;
    console.log("selectedRow-",selectedRow)
    var selectedRowKeys = [];
    var selectedRowData = [];
    selectedRowKeys  = this.refs.appTable.refs.table.state.selectedRowKeys;
   /* this.props.sessionAttrMonitor.tableData.forEach(function (value) {
    if (!(selectedRowKeys.indexOf(value.btMethodId) == -1))
        selectedRowData.push(value)
    });
    this.refs.appTable.refs.table.cleanSelected();
  
    console.log("selectedRowKeys--",selectedRowKeys)
    this.props.delSessAttrMon(selectedRowKeys,this.props.profileId);
    */

  }

  handleHrefArgType(row){
    this.props.toggleArgumentTypeDialog(row); 
  }

  handleHrefReturnType(row){
    this.props.toggleReturnTypeDialog(row);  
  }

  render() {
   const actionsDel = [
      <FlatButton
        label="Cancel"
        primary={true}
       onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        // // primary={true}
        keyboardFocused={true}
        disabled = {this.props.profileDisabled}
        onTouchTap={this.delRow}
    
      />,
    ];

    return (
    <div style ={{position:'relative',left:'10px',width:'1011px','background':'#18493F'}}>
     
          <div className="row col-md-4">
               <Checkbox
                value = "Method Based Capture Custom Data"
                checked  = {this.state.methodBasedCaptureCustomData}
                label = "Method Based Capture Custom Data "
                onCheck={this.handleMethodBasedCaptureCustomData.bind(this)}
                labelStyle = {{width:200}}
      />
          </div>


       <div className = {`row col-md-10 ${this.state.showTable}`} >
       
        <DataGrid data = {this.props.methodBasedCustomData.tableData} 
            pagination = {false} 
            ref        = "sessionAttrMonitorData" 
            column     = {columns}
            onClick    = {this.handleClick}
            onToggle   = {this.onToggle.bind(this)}
            onhref={this.handleHref.bind(this)}
            onHrefArgType = {this.handleHrefArgType.bind(this)}
            onHrefReturnType = {this.handleHrefReturnType.bind(this)}
             /> 
          </div>

        <div>

       {/* <AddNewButton  style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this,'add')}>
            <AddIcon />
          </AddNewButton> */}

        
          
        </div>
         <Snackbar
          open={this.state.openSnack}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
        />
       <ConfirmDelDialog
          title="Are you sure want to delete the Method Monitor(s)?"
          actions={actionsDel}
          modal={false}
          open={this.state.delDialog}
      
        />

        <DialogReturnType/>
        <DialogArgumentType/>
      
    </div>
    );
  }
}


function mapStateToProps(state) {
  console.log("methodBasedCustomCapture state -  ",state.methodBasedCustomData)
  return {
      methodBasedCustomData: state.methodBasedCustomData,
      profileDisabled: state.profileDisabled.disabled
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MethodBasedCapturingCustomData);
