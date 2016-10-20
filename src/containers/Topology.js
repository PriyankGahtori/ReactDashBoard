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
import DialogNewTopology from './Dialog_Topo_NewTopo';
import DialogEditTopology from './Dialog_Topo_Edit';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import {hashHistory } from 'react-router';


var columns = {
                "key"  : "dcTopoId",
                "data" : [' Name', ' Description','State','Profile','dcTopoId'],
                "field": ['topoName', 'topoDesc','topoState','profLink','dcTopoId']
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
  this.state = {treedata:this.props.treedata};
  this.updateNode = this.updateNode.bind(this);
  this.delRow = this.delRow.bind(this);
  this.state ={openNewTopoDialog:false}
  this.handleOpenAddDialog = this.handleOpenAddDialog.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.state = {topologyData:this.props.topologyData};
  this.onSelectRow=this.onSelectRow.bind(this);
  }

  onSelectRow(){
    console.log("onSelectRow----")
  }
  
  handleHref(row){
    hashHistory.push(`${this.props.location.pathname}/topology/${row.topoId}/configuration/${row.profileId}`)
  } 


  updateNode(e){
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
  }

  delRow(){
    var selectedRowKeys=[];
    let selectedRowKeysObj = this.refs.topoTable.refs.table.state.selectedRowKeys;
    this.props.delTopoTableRow(selectedRowKeysObj)
  }

  handleClick(){
  }

  handleOpenEdit(){
      // gets the selected key of table
    let selectedRow= this.refs.topoTable.refs.table.state.selectedRowKeys;
    if(selectedRow.length == 1)
      {
       let selectedRowData = this.props.topologyData.tableData
                                 .filter(function(value){
                                  if(value.dcTopoId === selectedRow[0]){
                                    // return value;
                                  }
                                  return value.dcTopoId === selectedRow[0]
                                }); 
        //action to dispatch selectRowData
       this.props.topoInitializeForm(selectedRowData,this.props.params.dcId);
       this.props.toggleStateDialogEditTopo();
    }
  }

  onToggle(row){
    row.topoState = !row.topoState;
    this.props.updateToggleStateTopology(row)
  }

  handleOpenAddDialog(){
    this.props.topoInitializeForm(null,this.props.params.dcId); //clears previous/initial values
    this.props.toggleStateDialogNewTopo(); //opens dialog box
  }

  componentWillMount() {
    
    /*
    * triggerring an action to fetch topology table data
    *   here node.id is dc_id  
    */
  
     this.props.fetchTopologyTableData(this.props.params.dcId);
   
  }

  componentWillReceiveProps(nextProps)
  {
    /*called when another tree node is selected and to trigger the action "fetchTopologyTableData"  
     * for new DC  selected.
     */
   if(this.props.params.dcId!= nextProps.params.dcId){
        this.props.fetchTopologyTableData(nextProps.params.dcId);
    }
  
    if(this.props.topologyData != nextProps.topologyData){
      this.setState({topologyData:nextProps.topologyData});
    }
  }

  render() {
    return (
    <div>
       <Paper zDepth={2}>     
       <div className='row row-no-margin tableheader'>
          <div className="col-md-10">
              <h4>Topology Detail</h4>
          </div>

          <div className="col-md-2"  >
            <IconButton  onTouchTap={this.handleOpenEdit.bind(this)}><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
            { /*  <IconButton onTouchTap={this.delRow}><FontIcon className="material-icons">delete</FontIcon></IconButton>*/}
          </div>
       </div>

        <DataGrid data = {this.props.topologyData.tableData} 
                  pagination={false} 
                  ref="topoTable" 
                  column = {columns}
                  onClick={this.handleClick}
                  onhref={this.handleHref.bind(this)}
                  onToggle   = {this.onToggle.bind(this)}
         />
        </Paper>



      <div>
      { /*  <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpenAddDialog.bind(this)} >
            <AddIcon />
         </AddNewButton>*/}
         <DialogEditTopology/>
         <DialogNewTopology />
      </div>

      <Snackbar
          open={this.state.open}
          message="No row selected or multiple rows selected "         
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />

   </div>

    );
  }
}

function mapStateToProps(state) {
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
