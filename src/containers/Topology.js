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
  console.log("in topology.js--",this.props)
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
  
    handleHref(row)
  {
    console.log("in function handleHref-in Application-",row);
    hashHistory.push(`/configuration/${row.profileId}`)
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
   /* selectedRowKeysObj.forEach(
                          value =>{
                          selectedRowKeys.push(value.self.href)
                          }) */
    console.log("selectedRowKeys--",selectedRowKeys)

  /*var selectRowsValueForServer= this.props.dcDetail.tableData
                      .filter(value => selectedRowKeysForUI.indexOf(value.dcName)!= -1)
                      .map((value,index) => value._links.self.href)

  console.log("selectRowsValue--",selectRowsValueForServer)*/
  this.props.delTopoTableRow(selectedRowKeysObj)
  }

  handleClick(){
    console.log("selecting row")
  }

  handleOpenEdit(){
      console.log("editing the App form")

      // gets the selected key of table
      let selectedRow= this.refs.topoTable.refs.table.state.selectedRowKeys;
      
      if(selectedRow.length == 1)
      {
       console.log("selectedRow--in editing form--",selectedRow)
       let selectedRowData = this.props.topologyData.tableData
                                 .filter(function(value){
                                  console.log("value---in selectrow----",value)
                                  if(value.dcTopoId === selectedRow[0]){
                                    console.log("condition satisfied")
                                    // return value;
                                  }
                                  return value.dcTopoId === selectedRow[0]

                                }); 
         console.log("selectedRow--in editing form-gettimg whole object-",selectedRowData)        
        //action to dispatch selectRowData
        this.props.topoInitializeForm(selectedRowData,this.props.routeParams.dcId);
        this.props.toggleStateDialogEditTopo();
    
}
  }

  onToggle(row){
    console.log("ontoggle function --event triggered---",row)
    row.topoState = !row.topoState;
    console.log("aftr toggling--row.topoState-----",row.topoState)
    this.props.updateToggleStateTopology(row)
  }

  handleOpenAddDialog(){

   
    //for editing form
    console.log("adding form")
    this.props.topoInitializeForm(null,this.props.routeParams.dcId); //clears previous/initial values
    this.props.toggleStateDialogNewTopo(); //opens dialog box
  }

  componentWillMount() {
    
    /*
    * triggerring an action to fetch topology table data
    *   here node.id is dc_id  
    */
  
     this.props.fetchTopologyTableData(this.props.routeParams.dcId);
   
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
       <Paper zDepth={2}>     
      <div className='row row-no-margin tableheader'>
          <div className="col-md-10">
              <h4>Topology Detail</h4>
          </div>
          <div className="col-md-2"  >
           { /*<IconButton  onTouchTap={this.handleOpenEdit.bind(this)}><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
            <IconButton onTouchTap={this.delRow}><FontIcon className="material-icons">delete</FontIcon></IconButton>*/}
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
