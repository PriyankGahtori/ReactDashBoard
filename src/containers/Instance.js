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
import DialogNewInstance from './DialogAttachProfile_Instance';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import {hashHistory } from 'react-router';

var columns = {
                "key"  : "instanceId",
                "data" : [' Name', ' Description','Profile Name','Id'],
                "field": ['instanceName', 'instanceDesc','profLink','instanceId']
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

   handleHref(row)
  {
    console.log("in function handleHref-in Application-",row);
    hashHistory.push(`/configuration/${row.profileId}`)
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


  handleOpen(){
    //for editing form
    
  console.log("editing the instance form")
      // gets the selected key of table
      let selectedRow= this.refs.instanceTable.refs.table.state.selectedRowKeys;
      
      if(selectedRow.length == 1)
      {
        console.log("selectedRow----",selectedRow)
        let selectedRowData = this.props.instanceData.tableData
                                  .filter(function(value){
                                    console.log("value.instanceId ---",value.instanceId)
                                    console.log("selectedRow[0].instanceId---",selectedRow[0].instanceId)
                                    console.log(value.instanceId === selectedRow[0])
                                    console.log(value.instanceId == selectedRow[0])
                                    return value.instanceId === selectedRow[0];
                                  });
        console.log("selectedRowData----",selectedRowData[0])

        //action to dispatch selectRowData
        this.props.instanceInitializeForm(selectedRowData[0],this.props.routeParams.serverId);
        this.props.toggleStateDialogInstance();
         this.refs.instanceTable.refs.table.cleanSelected();
      }
      else{
        //toster notification: Only one row can be edited
        this.setState({open: true});
      }       
    
       
  }

  componentWillMount() {
    console.log("this.props.tierData.tableData---",this.props.serverData.tableData)
    var serverId = this.props.routeParams.serverId;
    console.log("serverId----",serverId)
    var server = this.props.serverData.tableData.filter(function(value){
      console.log("value---",value)
      console.log("value.serverId === serverId---",value.serverId == serverId)
                      return value.serverId == serverId ;
                  })
    console.log("tier in server componet--",server[0])
    this.props.fetchInstanceTableData(this.props.routeParams.serverId,server[0]);
  }

  componentWillReceiveProps(nextProps)
  {
    /*called when another tree node is selected and to trigger the action "fetchInstanceTableData"  
     * for new DC  selected.
     */
     console.log("nextProps---")
     if(this.props.routeParams.serverId!= nextProps.routeParams.serverId){

    var serverId = nextProps.routeParams.serverId;
    console.log("serverId--nextprops--",serverId)
    var server = nextProps.serverData.tableData.filter(function(value){
      console.log("value---",value)
      console.log("value.serverId === serverId---",value.serverId == serverId)
                      return value.serverId == serverId ;
                  })
    console.log("tier in server componet--",server[0])
    this.props.fetchInstanceTableData(nextProps.routeParams.serverId,server[0]);
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
            <IconButton  onTouchTap={this.handleOpen.bind(this)}><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
          //  <IconButton onTouchTap={this.delRow}><FontIcon className="material-icons">delete</FontIcon></IconButton>
          </div>
       </div>

        <DataGrid data = {this.props.instanceData.tableData} 
                  pagination={false} 
                  ref="instanceTable" 
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
        <DialogNewInstance/>
   </div>

    );
  }
}

function mapStateToProps(state) {
  console.log("instanceData--",state.instanceData)
  return {
    instanceData :state.instanceData,
    serverData:state.serverData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Instance);
