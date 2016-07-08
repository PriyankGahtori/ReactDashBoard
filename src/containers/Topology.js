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


var columns = {
                "key" : "dcTopoId",
                "data":['TopoName', 'TopoDesc','State','dcTopoId'],
                "field":['topoName', 'topoDesc','topoState','dcTopoId']
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



class Topology extends React.Component {

  constructor(props) {
  super(props);
  console.log("in topology.js--",this.props)
 this.state = {treedata:this.props.treedata};
  this.updateNode = this.updateNode.bind(this);
  this.delRow = this.delRow.bind(this);
  this.state ={openNewAppDialog:false}
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.state={headerBlockNoRowSelcted:"row Show"};
  this.state={headerBlockRowSelected:"row hidden"};
  this.state = {topologyData:this.props.topologyData};
  this.onSelectRow=this.onSelectRow.bind(this);
  }

  onSelectRow(){
    console.log("onSelectRow----")
  }

  updateNode(e){
    console.log("table ref ",this.refs.table.refs.dcDetailTable.state.selectedRowKeys);
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
  }

   delRow(){
      var selectedRowKeys=[];
      console.log("del row function called")
      console.log("calling del method---table ref--",this.refs.topoTable.refs.table.state.selectedRowKeys)
    let selectedRowKeysObj = this.refs.topoTable.refs.table.state.selectedRowKeys;
    console.log("href-----------",selectedRowKeysObj)
    selectedRowKeysObj.forEach(
                          value =>{
                          selectedRowKeys.push(value.self.href)
                          }) 
    console.log("selectedRowKeys--",selectedRowKeys)

  /*var selectRowsValueForServer= this.props.dcDetail.tableData
                      .filter(value => selectedRowKeysForUI.indexOf(value.dcName)!= -1)
                      .map((value,index) => value._links.self.href)

  console.log("selectRowsValue--",selectRowsValueForServer)*/
  this.props.delAppTableRow(selectedRowKeys)
  }

  handleClick(){
    console.log("selecting row")
  }

  handleOpen(openAppDialogType){

    console.log("in handleopen---",openAppDialogType)
    //for editing form
    if(openAppDialogType == "edit"){
      console.log("editing the App form")

      // gets the selected key of table
      let selectedRow= this.refs.topoTable.refs.table.state.selectedRowKeys;
      
      if(selectedRow.length == 1)
      {
        console.log("selectedRow----",selectedRow)
        let selectedRowData = this.props.appDetail.tableData
                                  .filter(function(value){
                                    return value._links.self.href === selectedRow[0].self.href
                                  });
        console.log("selectedRowData----",selectedRowData[0])

        //action to dispatch selectRowData
        this.props.appDetailInitializeForm(selectedRowData[0],openAppDialogType);
        
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

  componentWillMount() {
    
    /*
    * triggerring an action to fetch topology table data
    *   here node.id is dc_id  
    */
     console.log("in mount methos--",this.props.routeParams.dcId)
     console.log("in topology mount method---",Object.keys(this.state.topologyData.tableData).length)
     if(Object.keys(this.state.topologyData.tableData).length == 0){
          console.log("componentWillMount method called")
         this.props.fetchTopologyTableData(this.props.routeParams.dcId);
   }

   
  }

  componentWillReceiveProps(nextProps)
  {
    /*called when another tree node is selected and to trigger the action "fetchTopologyTableData"  
     * for new DC  selected.
     */
     console.log("nextProps---")
     if(this.props.routeParams.dcId!= nextProps.routeParams.dcId){
        console.log("nextProps.routeParams.dcId---",nextProps.routeParams.dcId)
        this.props.fetchTopologyTableData(nextProps.routeParams.dcId);
  }
  

    if(this.props.topologyData != nextProps.topologyData){
      this.setState({topologyData:nextProps.topologyData});
    }

  
  }

  render() {
      
    return (
    <div>
      <div className="row">
        <RaisedButton label="Primary" primary={true} onClick={this.updateNode}/>
         <Paper zDepth={2}>
        <p>{this.state.headerBlockNoRowSelcted}</p>
        <div className ={this.state.headerBlockNoRowSelcted}  >
          <div className="col-md-9">
            <h3>Topology Detail</h3>
          </div>

          <div className="col-md-3 "  >
              <IconButton><FontIcon className="material-icons pull-right">search</FontIcon></IconButton>
              <IconButton  onTouchTap={this.handleOpen.bind(this,"edit")}><FontIcon className="material-icons pull-right">edit_mode</FontIcon></IconButton>
          </div>
       </div>

      

        <DataGrid data = {this.props.topologyData.tableData} 
                  pagination={false} 
                  ref="topoTable" 
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
  console.log("appDetail---",state.topologyData.tableData)
  console.log("treeData--",state.treeData)
  return {
    topologyData :state.topologyData,
    treedata : state.treeData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Topology);
