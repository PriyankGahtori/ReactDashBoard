/* This file is used for showing the instance screen 
*/

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
                "key"  : "id",
                "data" : ['Instance Name', 'Instance Description','instanceId'],
                "field": ['instanceName', 'instanceDesc','id']
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


class Instance extends React.Component {

  constructor(props) {
  super(props);
  console.log("in topology.js--",this.props)
  this.state = {treedata:this.props.treedata};
  this.updateNode = this.updateNode.bind(this);
  this.state ={openNewTopoDialog:false}
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.state = {instanceData:this.props.instanceData};
  this.onSelectRow=this.onSelectRow.bind(this);
  }

  onSelectRow(){
    console.log("onSelectRow----")
  }

  updateNode(e){
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
  }

   
  handleClick(){
    console.log("selecting row")
  }


  handleOpen(openTopoDialogType){
    //for editing form
    if(openTopoDialogType == "edit"){

      // gets the selected key of table
      let selectedRow= this.refs.instanceTable.refs.table.state.selectedRowKeys;
      
      if(selectedRow.length == 1)
      {
        let selectedRowData = this.props.instanceData.tableData
                                  .filter(function(value){
                                    return value._links.self.href === selectedRow[0].self.href
                                  });
        //action to dispatch selectRowData
        this.props.topoInitializeForm(selectedRowData[0],openTopoDialogType);
        this.props.toggleStateDialogNewTopo();
      }
      else{
        //toster notification: Only one row can be edited
      }

    }
    else if(openTopoDialogType == "add"){ //for adding new row
      console.log("adding form")
       this.props.topoInitializeForm(null,openTopoDialogType); //clears previous/initial values
       this.props.toggleStateDialogNewTopo(); //opens dialog box
    }
       
  }

  componentWillMount() {
         this.props.fetchInstanceTableData(this.props.routeParams.serverId);
  }

  componentWillReceiveProps(nextProps)
  {
    /*called when another tree node is selected and to trigger the action "fetchInstanceTableData"  
     * for new DC  selected.
     */
     console.log("nextProps---")
     if(this.props.routeParams.serverId!= nextProps.routeParams.serverId){
        console.log("nextProps.routeParams.serverId---",nextProps.routeParams.serverId)
        this.props.fetchInstanceTableData(nextProps.routeParams.serverId);
    }
  
    if(this.props.instanceData != nextProps.instanceData){
      this.setState({instanceData:nextProps.instanceData});
    }
}
  

  render() {
      
    return (
    <div>
       <Paper zDepth={2}>     
      <div className='row row-no-margin tableheader'>
          <div className="col-md-10">
              <h4>Instance Detail</h4>
          </div>
          <div className="col-md-2"  >
            <IconButton  onTouchTap={this.handleOpen.bind(this,"edit")}><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
            <IconButton onTouchTap={this.delRow}><FontIcon className="material-icons">delete</FontIcon></IconButton>
          </div>
       </div>

        <DataGrid data = {this.props.instanceData.tableData} 
                  pagination={false} 
                  ref="instanceTable" 
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
  console.log("instanceData--",state.instanceData)
  return {
    instanceData :state.instanceData,
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Instance);
