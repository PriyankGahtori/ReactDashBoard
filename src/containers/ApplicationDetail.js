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
import DialogNewApplication from './Dialog_AppDetail_NewApp';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';


/*
* data --- table column name
* key ---- acting as a primary key
* 
*/

var columns = {
                "key" : "_links",
                "data":['AppName', 'AppDesc','UserName','LINK'],
                "field":['appName', 'appDesc', 'userName','_links']
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



class ApplicationDetail extends React.Component {

  constructor(props) {
  super(props);
  console.log("in DCDetail.js--",this.props)
  console.log(this.props.routeParams.something)

  this.delRow = this.delRow.bind(this);
  this.state ={openNewAppDialog:false} //
  this.handleOpen = this.handleOpen.bind(this);

  this.handleClick = this.handleClick.bind(this);
  this.state={headerBlockNoRowSelcted:"row Show"};
  this.state={headerBlockRowSelected:"row hidden"};
  }

 
 delRow(){
    var selectedRowKeys=[];
    console.log("del row function called")
    console.log("calling del method---table ref--",this.refs.appTable.refs.table.state.selectedRowKeys)
    let selectedRowKeysObj = this.refs.appTable.refs.table.state.selectedRowKeys;
    console.log("href-----------",selectedRowKeysObj)
    selectedRowKeysObj.map(
                          value =>{
                          selectedRowKeys.push(value.self.href)
                          }) 
    console.log("selectedRowKeys--",selectedRowKeys)
    this.props.delAppTableRow(selectedRowKeys)
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
                                    return value._links.self.href === selectedRow[0].self.href
                                  });
        console.log("selectedRowData----",selectedRowData[0])

        //action to dispatch selectedRowData to set initialValue to the fields in case of editing the row
        this.props.appDetailInitializeForm(selectedRowData[0],openAppDialogType);
       
       //called this action to toggle the state of opened FormDialog. 
        this.props.toggleStateDialogNewApp();
      }
      else{
       
        //toster notification: Only one row can be edited
        this.setState({open: true});
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
    console.log("in componentWillReceiveProps--",nextProps.appDetail)
     console.log("in componentWillReceiveProps--",this.props.appDetail)
    if(this.props.appDetail.tableData != nextProps.appDetail.tableData)
      this.setState({appDetail:nextProps.appDetail.tableData});
  }

  render() {
      
    return (
    <div>
      <div className="row">
        <Paper zDepth={2}>
        <p>{this.state.headerBlockNoRowSelcted}</p>
        <div className ={this.state.headerBlockNoRowSelcted}  >
          <div className="col-md-9">
            <h3>Application   Detail</h3>
          </div>

          <div className="col-md-3 "  >
              <IconButton><FontIcon className="material-icons pull-right">search</FontIcon></IconButton>
              <IconButton  onTouchTap={this.handleOpen.bind(this,"edit")}><FontIcon className="material-icons pull-right">edit_mode</FontIcon></IconButton>
          </div>
       </div>

       <p>{this.state.headerBlockRowSelected}</p>
       <div className ={this.state.headerBlockRowSelected}  >
          <div className="col-md-9">
              <h3>Items Selected</h3>
          </div>

          <div className="col-md-3 "  >
              <IconButton ><FontIcon className="material-icons pull-right">delete</FontIcon></IconButton>
          </div>
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
         />
        </Paper>
        <RaisedButton label="Delete" primary={true} onClick={this.delRow}/>
      </div>


      <div>
         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this,"add")} >
            <AddIcon />
         </AddNewButton>

         <DialogNewApplication />

      </div>

      <Snackbar
          open={this.state.open}
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
    appDetail :state.applicationdata
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ApplicationDetail);
