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
import DialogAttachProfile from './DialogAttachProfile_Server';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';


var columns = {
                "key"  : "serverId",
                "data" : ['Server Name', 'Server Description','profileName','serverId'],
                "field": ['serverName', 'serverDesc','profLink','serverId']
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



class Server extends React.Component {

  constructor(props) {
  super(props);
  console.log("in topology.js--",this.props)
  this.state = {treedata:this.props.treedata};
  this.updateNode = this.updateNode.bind(this);
  this.delRow = this.delRow.bind(this);
  this.state ={openNewTopoDialog:false}
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClick = this.handleClick.bind(this);
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

  handleOpen(){
    //for editing form
    console.log("editing the server form")
      // gets the selected key of table
      let selectedRow= this.refs.serverTable.refs.table.state.selectedRowKeys;
      
      if(selectedRow.length == 1)
      {
        console.log("selectedRow----",selectedRow)
        let selectedRowData = this.props.serverData.tableData
                                  .filter(function(value){
                                    console.log("value.serverId ---",value.serverId)
                                    console.log("selectedRow[0].serverId---",selectedRow[0].serverId)
                                    console.log(value.serverId === selectedRow[0])
                                    console.log(value.serverId == selectedRow[0])
                                    return value.serverId === selectedRow[0];
                                  });
        console.log("selectedRowData----",selectedRowData[0])

        //action to dispatch selectRowData
        this.props.serverInitializeForm(selectedRowData[0],this.props.routeParams.tierId);
        this.props.toggleStateDialogServer();
         this.refs.serverTable.refs.table.cleanSelected();
      }
      else{
        //toster notification: Only one row can be edited
        this.setState({open: true});
      }       
       
  }

  componentWillMount() {
    
    /*
    * triggerring an action to fetch server table data
    *   here node.id is dc_id  
    */
    console.log("this.props.tierData.tableData---",this.props.tierData.tableData)
    var tierId = this.props.routeParams.tierId;
    console.log("tierId----",tierId)
    var tier = this.props.tierData.tableData.filter(function(value){
      console.log("value---",value)
      console.log("value.tierId === tierId---",value.tierId == tierId)
                      return value.tierId == tierId ;
                  })
    console.log("tier in server componet--",tier[0])
     this.props.fetchServerTableData(this.props.routeParams.tierId,tier[0]);
  }

  componentWillReceiveProps(nextProps)
  {
    /*called when another tree node is selected and to trigger the action "fetchTopologyTableData"  
     * for new DC  selected.
     */
     console.log("nextProps---")
     if(this.props.routeParams.tierId!= nextProps.routeParams.tierId){
      
      var tierId = nextProps.routeParams.tierId;
      console.log("nextProps.routeParams.tierId---",nextProps.routeParams.tierId)
      console.log("tierId----",tierId)
      var tier = nextProps.tierData.tableData.filter(function(value){
        console.log("value---",value)
        console.log("value.tierId === tierId---",value.tierId == tierId)
                      return value.tierId == tierId ;
                  })
    console.log("tier in server componet--",tier[0])
     this.props.fetchServerTableData(nextProps.routeParams.tierId,tier[0]);
    }
  

    if(this.props.serverData != nextProps.serverData){
      this.setState({serverData:nextProps.serverData});
    }
}
  

  render() {
      
    return (
    <div>
       <Paper zDepth={2}>     
      <div className='row row-no-margin tableheader'>
          <div className="col-md-10">
              <h4>Server Detail</h4>
          </div>
          <div className="col-md-2"  >
            <IconButton  onTouchTap={this.handleOpen.bind(this)}><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
            <IconButton onTouchTap={this.delRow}><FontIcon className="material-icons">delete</FontIcon></IconButton>
          </div>
       </div>

        <DataGrid data = {this.props.serverData.tableData} 
                  pagination={false} 
                  ref="serverTable" 
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
        
        <DialogAttachProfile/>
   </div>

    );
  }
}

function mapStateToProps(state) {
  console.log("serverData--",state.serverData)
  return {
    serverData :state.serverData,
    tierData:state.tierData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Server);
