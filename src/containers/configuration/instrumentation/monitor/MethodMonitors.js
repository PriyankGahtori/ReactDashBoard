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
import DialogMethodMon from './Dialog_MethodMonitor';
import * as actionCreators  from '../../../../actions/index';
import DataGrid from '../../../../components/DCDetailTable';
import EnableMethodMonitor from './EnableMethodMonitor';
export const fields = ['methodDisplayName', 'methodName', 'methodDesc']

var columns = {
                "key" : "methodId",
                "data":['Display Name', 'Method Name', 'Description','ID'],
                "field":['methodDisplayName', 'methodName', 'methodDesc', 'methodId']
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

 class MethodMonitors extends React.Component {
  
  constructor(props) {
    super(props);
     this.handleOpen=this.handleOpen.bind(this);
     this.loader = this.loader.bind(this);
     this.state = {openSnack: false, delDialog: false}
     this.delRow = this.delRow.bind(this);
     this.handleClose = this.handleClose.bind(this);

     
  }

  componentWillMount() {
    this.props.triggerLoader(true,null)
    this.props.fetchMethodMonitorTableData(this.props.params.profileId,this.loader);
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.methodMonitor.tableData != nextProps.methodMonitor.tableData){
      this.setState({methodMonitor:nextProps.methodMonitor});

    }
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
 
  handleOpen(openMethodMonitorDialogType){
    if(openMethodMonitorDialogType == 'edit'){
       let selectedRow= this.refs.methodMonitorTable.refs.table.state.selectedRowKeys;
       if(selectedRow.length == 1)
       {
            this.setState({openSnack:false})
           var selectedRowData = this.props.methodMonitor.tableData.filter(function(value){
           return value.methodId == selectedRow
           })
          this.props.methodMonitorInitializeForm(selectedRowData[0],openMethodMonitorDialogType);
          this.props.toggleStateAddMethodMonitor(); //opens dialog box
       }
       else{
           this.setState({openSnack: true})
           
       }
    }
    else if(openMethodMonitorDialogType == 'add'){
           this.props.toggleStateAddMethodMonitor(); //opens dialog box
          this.props.methodMonitorInitializeForm(null,openMethodMonitorDialogType);
    }
  }

  render() {
   const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
       onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.delRow}
    
      />,
    ];

    return (
    <div>
      <EnableMethodMonitor />
      <Paper zDepth={2} style={{background:'rgba(0,0,0,0.45)', color:'#FFF'}}>   
        <div className='row row-no-margin tableheader'>
        <div className="col-md-10">
              <h4>Method Monitor(s)</h4>
        </div>
     <IconButton tooltip ="Edit Method Monitor" style={{left:67,paddingTop:40}} onTouchTap={this.handleOpen.bind(this,"edit")}><FontIcon  color="#FFF"  className="material-icons">edit_mode</FontIcon></IconButton>

     <IconButton tooltip = "Delete Method Monitor" className = "pull-right" onTouchTap={this.handleDelConfirm.bind(this)}><FontIcon  color="#FFF"  className="material-icons">delete</FontIcon></IconButton>
   

     
        <DataGrid data = {this.props.methodMonitor.tableData} 
            pagination = {false} 
            ref        = "methodMonitorTable" 
            column     = {columns}
            onClick    = {this.handleClick}
            onToggle   = {this.onToggle.bind(this)} />

        <div>
         <AddNewButton  style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this,'add')}>
            <AddIcon />
         </AddNewButton>
         <DialogMethodMon profileId ={this.props.params.profileId}/>
          
        </div>
       </div>
         <Snackbar
          open={this.state.openSnack}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
        />
       <ConfirmDelDialog
          title="Are you sure want to delete the Method Monitor(s)?"
          actions={actions}
          modal={false}
          open={this.state.delDialog}
      
        />
       </Paper>
    </div>
    );
  }
}


function mapStateToProps(state) {
  console.log("methodMonitor state -  " + state.methodMonitor)
  return {
     methodMonitor : state.methodMonitor
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MethodMonitors);
