import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DataGrid from '../components/DCDetailTable';
import DialogNewDC from './Dialog_DCDetail_NewDC';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router';
import ConfirmDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


var columns = {
                "key" : "id",
                "data":['DC Name', 'DC IP', 'DC Port', 'NDE IP','NDE Port','LINK'],
                "field":['dcName', 'dcIp', 'dcPort', 'ndeIp', 'ndePort','id']
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


class DCDetail extends React.Component {

  constructor(props) {
  super(props);
  console.log("in DCDetail.js--",this.props)
  console.log("this.props.routeParams.appId",this.props.routeParams.appId)
  this.updateNode = this.updateNode.bind(this);
  this.delRow = this.delRow.bind(this);
  this.state ={openNewAppDialog:false, open:false, openSnack: false}
  this.state ={dcDetail:this.props.dcDetail}
  this.handleOpen = this.handleOpen.bind(this);
  this.handleRequestClose=this.handleRequestClose.bind(this);  
  this.handleConfirm = this.handleConfirm.bind(this);
  this.handleClose = this.handleClose.bind(this);
 // this.handleRequestClose = this.handleRequestClose.bind(this);
  
  }

  updateNode(e){
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
  }


 handleConfirm(){
    console.log("-------------")
    let selectedRow= this.refs.dcDetailTable.refs.table.state.selectedRowKeys;

    if(selectedRow.length == 1)
    {
      this.setState({open: true});
    }
  };

  handleClose(){
    this.setState({open: false});
  };

  delRow(){

    var selectedRowKeys=[]; //used for storing url with unique id for selected row
    console.log("calling del method---table ref--",this.refs.dcDetailTable.refs.table.state.selectedRowKeys)
     selectedRowKeys = this.refs.dcDetailTable.refs.table.state.selectedRowKeys; /// selectedRowKeysObj :=> primary key of selected row 
    console.log("selectedRowKeys----",selectedRowKeys)
   /* selectedRowKeysObj.map(
                          value =>{
                            console.log("value-----",value.id)
                          selectedRowKeys.push(value.id) 
                          }) */

    this.props.delDCTableRow(this.refs.dcDetailTable.refs.table.state.selectedRowKeys) 
    this.refs.dcDetailTable.refs.table.cleanSelected();
    this.handleClose();
  }
  
  /*
    * handleOpen(Flag)
    * Flag:(edit or Add)
    *    edit - when editing existing row
    *    add - for Adding new row
    *
  */
  handleOpen(openDCDialogType){
    console.log("in handleopen---",openDCDialogType)
    //for editing form
    if(openDCDialogType == "edit"){
      console.log("editing the form")

      // gets the selected key of table
      let selectedRow= this.refs.dcDetailTable.refs.table.state.selectedRowKeys;
      console.log("selectedRow-----",selectedRow)
      
      if(selectedRow.length == 1)
      {
        console.log("selectedRow----",selectedRow)
        let selectedRowData = this.props.dcDetail.tableData
                                  .filter(function(value){
                                    return value.id === selectedRow[0]
                                  });
        console.log("selectedRowData----",selectedRowData[0])

        //action to dispatch selectRowData
        this.props.dcDetailInitializeForm(selectedRowData[0],openDCDialogType,this.props.routeParams.appId);
        this.props.toggleStateDialogNewDC();
        this.refs.dcDetailTable.refs.table.cleanSelected();

      }
      else{
        //toster notification: Only one row can be edited
        this.setState({openSnack: true});
      }

    }
    else if(openDCDialogType == "add"){ //for adding new row
       this.props.dcDetailInitializeForm(null,openDCDialogType,this.props.routeParams.appId); //clears previous/initial values
       this.props.toggleStateDialogNewDC(); //opens dialog box
    }

  }

   handleRequestClose(){
    this.setState({
      openSnack: false,
    });
  };

  componentWillMount() {
      this.props.fetchTreeData(this.props.routeParams.appId)
      this.props.fetchDCTableData(this.props.routeParams.appId)
  
  }

  componentWillReceiveProps(nextProps)
  {
    console.log("in componentWillReceiveProps--",nextProps.dcDetail)
    console.log("in componentWillReceiveProps--",this.props.dcDetail)
  	if(this.props.dcDetail.tableData != nextProps.dcDetail.tableData)
    {
      console.log("dcDEtail data changed----")
  		this.setState({dcDetail:nextProps.dcDetail});
    }

    if(this.props.routeParams.appId != nextProps.routeParams.appId){
      console.log("appid changed--")
      this.props.fetchTreeData(nextProps.routeParams.appId)
      this.props.fetchDCTableData(nextProps.routeParams.appId)
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

    var selectRow: {
        mode: "checkbox",  //checkbox for multi select, radio for single select.
        clickToSelect: true,   //click row will trigger a selection on that row.
        bgColor: "rgb(true238, 193, 213)" , //selected row background color
       
    }
   return (
    <div>
      
      <Paper zDepth={2}>     
       
       <div className='row row-no-margin tableheader'>
          <div className="col-md-10">
              <h4>DC Detail</h4>
          </div>
        <div className="col-md-2"  >
          <IconButton  onTouchTap={this.handleOpen.bind(this,"edit")}><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
          <IconButton onTouchTap={this.handleConfirm}><FontIcon className="material-icons">delete</FontIcon></IconButton>
          <IconButton><Link to ="/Instrumentation"><FontIcon className="material-icons">power_settings_new</FontIcon></Link></IconButton>
        </div>
       </div>

       <div>
       <ConfirmDialog
          title="Are you sure want to delete the Data Center?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
         
        </ConfirmDialog>
      </div>

        {/* rendering Table component*/}
       
        <DataGrid data = {this.props.dcDetail.tableData} 
                   pagination={false} 
                   ref="dcDetailTable" 
                   column = {columns}                   
        />

      </Paper>
      
      <div>
         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this,"add")} >
            <AddIcon />
         </AddNewButton>
       
         <DialogNewDC />
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

//method to get data from store
function mapStateToProps(state) {
  console.log("state.dcDetail.tableData---",state.dcDetail.tableData)
  return {
    dcDetail :state.dcDetail
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(DCDetail);
