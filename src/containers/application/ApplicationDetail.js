// Importing react Components
import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import ConfirmDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {hashHistory } from 'react-router';

//Importing files
import DialogNewApplication from './Dialog_AppDetail_NewApp';
import DataGrid from '../../components/DCDetailTable';
import * as actionCreators  from '../../actions/index';

/*
* data --- table column name
* key ---- acting as a primary key
* 
*/

var columns = {
                "key" : "id",
                "data":['Name', 'Description','User Name','LINK'],
                "field":['appName', 'appDesc', 'userName','id']
              }; 

const style = {
  //margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const NewButtonstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 30,
    left: 'auto',
    position: 'fixed'

};
const toastrCss = {
  wordWrap : 'break-word' 
}


class ApplicationDetail extends React.Component {

  constructor(props) {
  super(props);
  console.log("in DCDetail.js--",this.props)
  
  this.delRow = this.delRow.bind(this);
  this.state ={openNewAppDialog:false} //
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.handleConfirm = this.handleConfirm.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.state = {open:false, openSnack:false};
  this.createConfFile = this.createConfFile.bind(this);
  this.loader = this.loader.bind(this);
  }

 
handleConfirm(){
    let selectedRow= this.refs.appTable.refs.table.state.selectedRowKeys;
    if(selectedRow.length == 1)
      this.setState({open: true});
  };

handleHref(row)
{
    hashHistory.push(`/application/${row.id}`)
 } 

createConfFile(){
  let selectedRow= this.refs.appTable.refs.table.state.selectedRowKeys;
   if(selectedRow.length == 1)
   {
    let selectedRowData = this.props.appDetail.tableData
                                     .filter(function(value){
                                     return value.id === selectedRow[0]
                                    });
    //triggering action to display Loader
    var message = {'title' :'Generating nd.conf' ,'msg':''};
    this.props.triggerLoader(true , message)
    this.props.createConfFile(selectedRowData[0].id,this.props.getAllKeywordData,this.loader);
    }
  }

handleClose(){
    this.setState({open: false});
  };

 delRow(){
    var selectedRowKeys=[];
    selectedRowKeys = this.refs.appTable.refs.table.state.selectedRowKeys;
    this.props.delAppTableRow(selectedRowKeys)
    this.refs.appTable.refs.table.cleanSelected();
    this.handleClose();
  }

  handleClick(){
    console.log("selecting row")
  }

/*
* flag "openAppDialogType" used to determine FormDialog to be opened will be for which functionality
* add OR edit
*/
  handleOpen(openAppDialogType){

    console.log("in handleopen---",openAppDialogType)
    //for editing form
    if(openAppDialogType == "edit"){
      console.log("editing the App form")

      // gets the selected key of table
      let selectedRow= this.refs.appTable.refs.table.state.selectedRowKeys;
      
      if(selectedRow.length == 1)
      {
        console.log("selectedRow----",selectedRow)
        
        let selectedRowData = this.props.appDetail.tableData
                                  .filter(function(value){
                                    return value.id === selectedRow[0]
                                  });
        console.log("selectedRowData----",selectedRowData[0])

        //action to dispatch selectedRowData to set initialValue to the fields in case of editing the row
        this.props.appDetailInitializeForm(selectedRowData[0],openAppDialogType);
       
       //called this act                                                                                                                                                                                             ion to toggle the state of opened FormDialog. 
        this.props.toggleStateDialogNewApp();
        this.refs.appTable.refs.table.state.cleanSelected();
      }
      else{
       
        //toster notification: Only one row can be edited
        this.setState({openSnack: true});
      }

    }
    else if(openAppDialogType == "add"){ //for adding new row
      console.log("adding form")
       this.props.appDetailInitializeForm(null,openAppDialogType); //clears previous/initial values
       this.props.toggleStateDialogNewApp(); //opens dialog box
    }
       
  }

//this function is called first when component gets first loaded
  componentWillMount() {
    this.props.fetchAppTableData();
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.appDetail.tableData != nextProps.appDetail.tableData)
      this.setState({appDetail:nextProps.appDetail.tableData});
  }

  /* function to trigger event for closing loader 
   * called when response for request of generating nd.conf is received
   */

  loader(path){
    var message = {'title':'Nd.conf generated at:', 'msg' :<p style={{wordWrap:'break-word'}}>{path}</p>}
    this.props.triggerLoader(false,message);
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
        <Paper zDepth={2}>     
       <div className='row row-no-margin tableheader'>
          <div className="col-md-10">
              <h4>Application Detail</h4>
          </div>

          <div className="col-md-2"  >
          <IconButton  tooltip="Create nd.conf " onTouchTap={this.createConfFile}><FontIcon className="material-icons">library_books</FontIcon></IconButton>
            <IconButton  tooltip="Edit Application" onTouchTap={this.handleOpen.bind(this,"edit")}><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
            <IconButton tooltip="Delete Application" onTouchTap={this.handleConfirm}><FontIcon className="material-icons">delete</FontIcon></IconButton>
          </div>
       </div>
          
       <div>
       <ConfirmDialog
          title="Are you sure want to delete the Application?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
         
        </ConfirmDialog>
      </div>
       
       
        {/* Rendering table component  ,
          * passing data (received from store) to the table component to be displayed at table 
         */  
       }
        <DataGrid data = {this.props.appDetail.tableData} 
                  pagination={false} 
                  ref="appTable" 
                  column = {columns}
                  onClick={this.handleClick}
                  onhref={this.handleHref.bind(this)}
         />
        </Paper>
       
      <div>
         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this,"add")} >
            <AddIcon />
         </AddNewButton>

         <DialogNewApplication />

      </div>

      <Snackbar
          open={this.state.openSnack}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />

   </div>

    );
  }
}

function mapStateToProps(state) {
  console.log("appDetail---",state.applicationdata.tableData)
  return {
    appDetail :state.applicationdata,
    getAllKeywordData :state.Keywords
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ApplicationDetail);