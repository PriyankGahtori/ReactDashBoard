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


var columns = {
                "key" : "_links",
                "data":['DCName', 'DCIP', 'DCPort', 'NDEIP','NDEPort','LINK'],
                "field":['dcName', 'dcIp', 'dcPort', 'ndeIp', 'ndePort','_links']
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
  console.log(this.props.routeParams.something)
  this.updateNode = this.updateNode.bind(this);
  this.delRow = this.delRow.bind(this);
  this.state ={openNewAppDialog:false}
  this.handleOpen = this.handleOpen.bind(this);
  this.state={headerBlockNoRowSelcted:"row Show"};
  this.state={headerBlockRowSelected:"row hidden"};
  }

  updateNode(e){
    console.log("table ref ",this.refs.table.refs.dcDetailTable.state.selectedRowKeys);
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
  }

  delRow(){
    var selectedRowKeys=[];
    console.log("del row function called")
    console.log("calling del method---table ref--",this.refs.dcDetailTable.refs.table.state.selectedRowKeys)
    let selectedRowKeysObj = this.refs.dcDetailTable.refs.table.state.selectedRowKeys;
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
  this.props.delDCTableRow(selectedRowKeys)
  }

  handleOpen(){
        this.props.toggleStateDialogNewDC();
        
  }

  componentWillMount() {
    this.props.fetchTreeData(this.props.routeParams.something)
    this.props.fetchDCTableData(this.props.routeParams.something)
  }

  componentWillReceiveProps(nextProps)
  {
    console.log("in componentWillReceiveProps--",nextProps.dcDetail)
    console.log("in componentWillReceiveProps--",this.props.dcDetail)
  	if(this.props.dcDetail.tableData != nextProps.dcDetail.tableData)
  		this.setState({dcDetail:nextProps.dcDetail.tableData});
  }

  onRowSelect(row, isSelected){
   console.log("Iam triggered...")
  }

  render() {
  /* var selectRow: {
        mode: "checkbox",  //checkbox for multi select, radio for single select.
        clickToSelect: true,   //click row will trigger a selection on that row.
        bgColor: "rgb(true238, 193, 213)" , //selected row background color
        onSelect:this.onRowSelect 

    };
   */
    return (
    <div>
      <div className="row">
      <RaisedButton label="Primary" primary={true} onClick={this.updateNode}/>
        <Paper zDepth={2}>
       <p>{this.state.headerBlockNoRowSelcted}</p>
       <div className ={this.state.headerBlockNoRowSelcted}  >
          <div className="col-md-9">
              <h3>DC Detail</h3>
          </div>

          <div className="col-md-3 "  >
              <IconButton><FontIcon className="material-icons pull-right">search</FontIcon></IconButton>
              <IconButton  onTouchTap={this.handleOpen}><FontIcon className="material-icons pull-right">edit_mode</FontIcon></IconButton>
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
        
        <DataGrid data = {this.props.dcDetail.tableData} 
                   pagination={false} 
                   ref="dcDetailTable" 
                   column = {columns} 
                  
        />

         </Paper>
      <RaisedButton label="Delete" primary={true} onClick={this.delRow}/>
      </div>
      <div>
         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen} >
            <AddIcon />
         </AddNewButton>
         <DialogNewDC />
      </div>
   </div>
    );
  }
}

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
