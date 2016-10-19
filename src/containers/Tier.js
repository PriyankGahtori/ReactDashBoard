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
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import DialogAttachProfile from './DialogAttachProfile_Tier';
import {hashHistory } from 'react-router';

 
var columns = {
                "key"  : "tierId",
                "data" : [' Name', ' Description','Profile Name','Id'],
                "field": ['tierName', 'tierDesc','profLink','tierId']
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



class Tier extends React.Component {

  constructor(props) {
  super(props);
  console.log("in topology.js--",this.props)
  this.state = {treedata:this.props.treedata};
  this.updateNode = this.updateNode.bind(this);
  this.delRow = this.delRow.bind(this);
  this.state ={openNewTopoDialog:false}
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClick = this.handleClick.bind(this);
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

   handleHref(row)
  {
    console.log("in function handleHref-in Application-",row);
    hashHistory.push(`${this.props.location.pathname}/tier/${row.tierId}/configuration/${row.profileId}`)
  } 

  handleOpen(){

    
    //for editing form
    console.log("editing the App form")
      // gets the selected key of table
      let selectedRow= this.refs.tierTable.refs.table.state.selectedRowKeys;
      
      if(selectedRow.length == 1)
      {
        console.log("selectedRow----",selectedRow)
        let selectedRowData = this.props.tierData.tableData
                                  .filter(function(value){
                                    return value.tierId === selectedRow[0];
                                  });
        console.log("selectedRowData----",selectedRowData[0])

        //action to dispatch selectRowData
        this.props.tierInitializeForm(selectedRowData[0],this.props.params.topoId);
        this.props.toggleStateDialogTier();
        this.refs.tierTable.refs.table.cleanSelected(); 
             }
      else{
        //toster notification: Only one row can be edited
        this.setState({open: true});
      }       
  }

  componentWillMount() {
    
    /*
    * triggerring an action to fetch topology table data
    *   here node.id is dc_id  
    */
    console.log("tier component loaded---")
    console.log("in component will mount---",this.props.topologyData)
    var topoId = this.props.params.topoId;
    var topology = this.props.topologyData.tableData.filter(function(value){
                      return value.topoId === topoId ;
                  })
     console.log("in mount methos--",this.props.params.topoId)
    this.props.fetchTierTableData(this.props.params.topoId,topology[0]);
  

   
  }

  componentWillReceiveProps(nextProps)
  {
    /*called when another tree node is selected and to trigger the action "fetchTopologyTableData"  
     * for new DC  selected.
     */
     console.log("nextProps---")
     if(this.props.params.topoId!= nextProps.params.topoId){
     var topoId = nextProps.params.topoId;
      var topology = nextProps.topologyData.tableData.filter(function(value){
                      return value.topoId === topoId ;
                  })
     console.log("in mount methos--",nextProps.params.topoId)
    this.props.fetchTierTableData(nextProps.params.topoId,topology[0]);
  
  }

    if(this.props.tierData != nextProps.tierData){
      this.setState({tierData:nextProps.tierData});
    }

  
  }

  render() {
      
    return (
    <div>
       <Paper zDepth={2}>     
      <div className='row row-no-margin tableheader'>
          <div className="col-md-10">
              <h4>Tier Detail(s)</h4>
          </div>
          <div className="col-md-2"  >
            <IconButton tooltip='Edit Tier' onTouchTap={this.handleOpen.bind(this)}><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
          </div>
       </div>

        <DataGrid data = {this.props.tierData.tableData} 
                  pagination={false} 
                  ref = "tierTable" 
                  column = {columns}
                  onClick={this.handleClick}
                  onhref={this.handleHref.bind(this)}
         />
        </Paper>


      <Snackbar
          open={this.state.open}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />

    <DialogAttachProfile />
   </div>

    );
  }
}

function mapStateToProps(state) {
  console.log("appDetail---",state.tierData)
  return {
    tierData :state.tierData,
    topologyData :state.topologyData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Tier);
