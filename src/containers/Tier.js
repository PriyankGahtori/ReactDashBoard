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


var columns = {
                "key"  : "tierId",
                "data" : ['Tier Name', 'Tier Desc','tierId'],
                "field": ['tierName', 'tierDesc','tierId']
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
  handleOpen(openTopoDialogType){

    console.log("in handleopen---",openTopoDialogType)
    //for editing form
    if(openTopoDialogType == "edit"){
      console.log("editing the App form")

      // gets the selected key of table
      let selectedRow= this.refs.topoTable.refs.table.state.selectedRowKeys;
      
      if(selectedRow.length == 1)
      {
        console.log("selectedRow----",selectedRow)
        let selectedRowData = this.props.topologyData.tableData
                                  .filter(function(value){
                                    return value._links.self.href === selectedRow[0].self.href
                                  });
        console.log("selectedRowData----",selectedRowData[0])

        //action to dispatch selectRowData
        this.props.topoInitializeForm(selectedRowData[0],openTopoDialogType);
        
        this.props.toggleStateDialogNewTopo();
      }
      else{
        //toster notification: Only one row can be edited
        this.setState({open: true});
      }

    }
    else if(openTopoDialogType == "add"){ //for adding new row
      console.log("adding form")
       this.props.topoInitializeForm(null,openTopoDialogType); //clears previous/initial values
       this.props.toggleStateDialogNewTopo(); //opens dialog box
    }
       
  }

  componentWillMount() {
    
    /*
    * triggerring an action to fetch topology table data
    *   here node.id is dc_id  
    */
     console.log("in mount methos--",this.props.routeParams.topoId)
   
         this.props.fetchTierTableData(this.props.routeParams.topoId);
  

   
  }

  componentWillReceiveProps(nextProps)
  {
    /*called when another tree node is selected and to trigger the action "fetchTopologyTableData"  
     * for new DC  selected.
     */
     console.log("nextProps---")
     if(this.props.routeParams.topoId!= nextProps.routeParams.topoId){
        console.log("nextProps.routeParams.dcId---",nextProps.routeParams.dcId)
        this.props.fetchTierTableData(nextProps.routeParams.topoId);
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
              <h4>Tier Detail</h4>
          </div>
          <div className="col-md-2"  >
            <IconButton  onTouchTap={this.handleOpen.bind(this,"edit")}><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
            <IconButton onTouchTap={this.delRow}><FontIcon className="material-icons">delete</FontIcon></IconButton>
          </div>
       </div>

        <DataGrid data = {this.props.tierData.tableData} 
                  pagination={false} 
                  ref="topoTable" 
                  column = {columns}
                  onClick={this.handleClick}
         />
        </Paper>


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
  console.log("appDetail---",state.tierData)
  return {
    tierData :state.tierData,
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Tier);
