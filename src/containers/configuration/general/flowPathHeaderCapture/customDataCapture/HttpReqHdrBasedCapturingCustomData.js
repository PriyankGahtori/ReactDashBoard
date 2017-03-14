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
import ConfirmDelDialog from 'material-ui/Dialog'

//Importing files
//import DialogSessionAttr from './Dialog_SessionAttrAdd';
import * as actionCreators from '../../../../../actions/index';
import DataGrid from '../../../../../components/DCDetailTable';
//import EnableMethodMonitor from './EnableMethodMonitor';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
//import DialogAttrVal from './Dialog_AttrValues';

import DialogHttpReqHdrEdit from './Dialog_HttpReqHdrEdit';
export const fields = ['methodDisplayName', 'methodName', 'methodDesc']

var columns = {
  "key": "httpReqHdrBasedId",
  "data": ['Name', 'Capture Mode', 'Rules', 'ID'],
  "field": ['headerName', 'dumpModeName', 'rulesHdrName', 'httpReqHdrBasedId']
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
    paddingBottom: 5
  },
  toggle: {
    marginTop: 30,
    paddingLeft: 80
  },
  customWidth: {
    width: 200
  },
  checkbox: {
    marginBottom: 16,
    paddingTop: 35
  },
  btSetBlock: {
    paddingLeft: 10,
    paddingTop: 5
  }
};

class HttpReqHdrBasedCapturingCustomData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openSnack: false,
      delDialog: false,
      attrType: 'all',
      specificModeCSS: 'hidden'
    }

    console.log("SessionAttributeMonitors method called", this.props)
  }

  componentWillMount() {
    this.props.fetchHttpReqHdrData(this.props.profileId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sessionAttrMonitor.tableData != nextProps.sessionAttrMonitor.tableData) {
      this.setState({ sessionAttrMonitor: nextProps.sessionAttrMonitor });
    }
  }

  handleChange(event, value) {
    console.log("value---", value)
    let css = value === 'specific' ? 'show' : 'hidden';
    console.log("css---", css)
    this.setState({ 'specificModeCSS': css })
  }

  loader() {
    // var message = {'title': 'Method Monitors Loaded','msg':' '}
    this.props.triggerLoader(false, null)

  }

  onToggle(row) {


  }

  // Below Method is called when the user tries to delete the HTTP Request Row.
  delRow() {
    var selectedRow = [];
    selectedRow = this.refs.httpRequestHeaderTable.refs.table.state.selectedRowKeys;
    this.props.delHttpReqRow(selectedRow);
    try {
      this.refs.httpRequestHeaderTable.refs.table.cleanSelected();
    }
    catch (e) {
      console.error(" Exception Occured: FileName: HttpReqHdrBasedCapturingCustomData,MethodName: delRow()", e)
    }
    this.handleClose();

  }

  handleDelConfirm() {
    var selectedRow = [];
    selectedRow = this.refs.httpRequestHeaderTable.refs.table.state.selectedRowKeys;
    if (selectedRow.length == 0)
      this.setState({ openSnack: true, delDialog: false })
    else
      this.setState({ openSnack: false, delDialog: true })

  }

  handleCancel() {
    this.props.toggleStateAddMethodMonitor();
  }

  handleCheck(event, value) {
    console.log("inside handle check")

  };
  handleClose() {
    this.setState({ delDialog: false })
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

  handleHref(row) {
    console.log("row---", row)
    this.props.toggleStateAttrValDialog(row.sessAttrId);

  }
  handleOpenEdit() {
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

  handleEdit(){
    console.log("handleEdit method called")
     var selectedRow = [];
     selectedRow = this.refs.httpRequestHeaderTable.refs.table.state.selectedRowKeys;
     let selectedRowData = this.props.httpReqHdrBasedCustomData.tableData.filter(function (value) {
          return value.httpReqHdrBasedId == selectedRow
        });
      
    console.log("selectedRowData--",selectedRowData)
    if(selectedRow.length == 1){
     // this.props.toggleEditSessionAttrForm();
      //this.props.initializeSessionAttr(selectedRowData[0]);
      this.props.toggleHttpReqHdrEditForm();
      this.props.initializeHttpReqHdr(selectedRowData[0]);
    }
 

  }

  handleDel() {
    let selectedRow = this.refs.appTable.refs.table.state.selectedRowKeys;
    console.log("selectedRow-", selectedRow)
    var selectedRowKeys = [];
    var selectedRowData = [];
    selectedRowKeys = this.refs.appTable.refs.table.state.selectedRowKeys;
    /* this.props.sessionAttrMonitor.tableData.forEach(function (value) {
     if (!(selectedRowKeys.indexOf(value.btMethodId) == -1))
         selectedRowData.push(value)
     });
     this.refs.appTable.refs.table.cleanSelected();
   
     console.log("selectedRowKeys--",selectedRowKeys)
     this.props.delSessAttrMon(selectedRowKeys,this.props.profileId);
     */

  }

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
        disabled={this.props.profileDisabled}
        onTouchTap={this.delRow.bind(this)}

        />,
    ];

    return (
     <div  style ={{position:'relative',width:'1011px','background':'#FFF',color: '#FFF'}}>
        <div  className='row row-no-margin tableheader' > 
        <div className = "pull-right">
          <IconButton tooltip="Edit " style={{padding:'5px' ,height:'auto'}} onTouchTap={this.handleEdit.bind(this)}><FontIcon color="#FFF" className="material-icons">edit_mode</FontIcon></IconButton>           
          <IconButton className="pull-right" style={{padding:'5px' ,height:'auto'}} tooltip="Delete" onTouchTap={this.handleDelConfirm.bind(this)}><FontIcon color='white' className="material-icons">delete</FontIcon></IconButton>
        </div>
          <h4 style={{color: '#FFF',paddingLeft: '10px'}}>Http Request Header</h4>
        </div>


        <DataGrid data={this.props.httpReqHdrBasedCustomData.tableData}
          pagination={false}
          ref="httpRequestHeaderTable"
          column={columns}
          onClick={this.handleClick}
           /> 

      
        <Snackbar
          open={this.state.openSnack}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
          />

        <ConfirmDelDialog
          title="Are you sure want to delete the  Http Request Header(s)? " 
          actions={actionsDel}
          modal={false}
          open={this.state.delDialog}

          />

          <DialogHttpReqHdrEdit/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log("methodMonitor state -  ", state.sessionAttrMonitor)
  return {
    sessionAttrMonitor: state.sessionAttrMonitor,
    profileDisabled: state.profileDisabled.disabled,
    httpReqHdrBasedCustomData:state.httpReqHdrBasedCustomData
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HttpReqHdrBasedCapturingCustomData);
